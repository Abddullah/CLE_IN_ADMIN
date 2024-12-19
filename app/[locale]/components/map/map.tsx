import { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import mapboxgl from "mapbox-gl";
import { setLocation } from "../../../[locale]/config/Redux/reducers/locationSlice";

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAP_ACCESS_TOKEN as string;

interface Location {
  lng: number;
  lat: number;
}

const MapComponent: React.FC = () => {
  const dispatch = useDispatch();
  const [location, setLocationState] = useState<Location>({
    lng: 12.4964,
    lat: 41.9028,
  }); // Default center (Rome)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);
  const mapContainer = useRef<HTMLDivElement | null>(null);
  const mapContainerModal = useRef<HTMLDivElement | null>(null); // New reference for modal
  const mainMarker = useRef<mapboxgl.Marker | null>(null); // Marker reference
  const [map, setMap] = useState<mapboxgl.Map | null>(null);

  useEffect(() => {
    if (!mapContainer.current) return;

    // Initialize main map instance
    const mapInstance = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [location.lng, location.lat], // Fixed center at Rome
      zoom: 12,
      interactive: false,
    });

    setMap(mapInstance);

    // Click handler to add marker and update location on map click
    mapInstance.on("click", (e) => {
      const clickedLocation = e.lngLat;
      setSelectedLocation({
        lng: clickedLocation.lng,
        lat: clickedLocation.lat,
      });

      
      

      // Add marker on click smoothly
      if (mainMarker.current) {
        mainMarker.current.remove(); // Remove previous marker
      }

      // Add new marker
      mainMarker.current = new mapboxgl.Marker({ color: "red", scale: 0.8 })
        .setLngLat([clickedLocation.lng, clickedLocation.lat])
        .addTo(mapInstance);

      // Animate the marker to make it pop
      mainMarker.current
        .getElement()
        .animate(
          [
            { transform: "scale(0)" },
            { transform: "scale(1.5)" },
            { transform: "scale(1)" },
          ],
          {
            duration: 500,
            easing: "ease-in-out",
          }
        );

      // Smoothly move map to new location with animation
      mapInstance.flyTo({
        center: [clickedLocation.lng, clickedLocation.lat],
        speed: 0.6,
        curve: 1,
        essential: true,
      });
    });

    return () => {
      mapInstance.remove();
    };
  }, [location]); // Re-run effect whenever 'location' changes

  useEffect(() => {
    if (!map || !selectedLocation) return;

    // Update marker position based on selected location
    if (mainMarker.current) {
      mainMarker.current.setLngLat([selectedLocation.lng, selectedLocation.lat]);
    }

    map.flyTo({
      center: [selectedLocation.lng, selectedLocation.lat],
      essential: true,
      speed: 0.4,
      curve: 1,
    });
  }, [selectedLocation, map]);

  useEffect(() => {
    if (!mapContainerModal.current || !isModalOpen) return;

    const mapInstance = new mapboxgl.Map({
      container: mapContainerModal.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [location.lng, location.lat],
      zoom: 12,
    });

    setMap(mapInstance);

    mapInstance.on("click", (e) => {
      const clickedLocation = e.lngLat;
      setSelectedLocation({
        lng: clickedLocation.lng,
        lat: clickedLocation.lat,
      });

      console.log(clickedLocation);
      

      // Remove old marker if exists
      if (mainMarker.current) {
        mainMarker.current.remove();
      }

      // Add new marker
      mainMarker.current = new mapboxgl.Marker({ color: "blue", scale: 0.6 })
        .setLngLat([clickedLocation.lng, clickedLocation.lat])
        .addTo(mapInstance);
    });

    return () => mapInstance.remove();
  }, [isModalOpen, location]);

  const handleLocationChange = () => {
    if (selectedLocation) {
      setLocationState(selectedLocation);
      dispatch(setLocation(selectedLocation));
      setIsModalOpen(false); // Close the modal
    }
  };

  return (
    <div className="items-center grid w-full gap-1.5">
      <div
        ref={mapContainer}
        className="w-full h-60 rounded-lg shadow-lg relative overflow-hidden mb-4"
      >
        <div
          className="absolute top-2 right-4 underline text-black font-semibold cursor-pointer"
          onClick={() => setIsModalOpen(true)}
        >
          Change Location
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-xl">
            <div className="p-4 border-b flex justify-between">
              <h2 className="text-xl font-semibold">Select a Location</h2>
              <button
                className="text-gray-600 hover:text-gray-900 text-2xl"
                onClick={() => setIsModalOpen(false)}
              >
                &times;
              </button>
            </div>
            <div className="w-full h-72 relative overflow-hidden" ref={mapContainerModal} />
            {selectedLocation && (
              <div className="p-4 bg-gray-100">
                <p className="text-lg font-semibold">Selected Location:</p>
                <p>Latitude: {selectedLocation.lat}</p>
                <p>Longitude: {selectedLocation.lng}</p>
              </div>
            )}
            <div className="p-4 bg-gray-50 border-t flex justify-end space-x-4">
              <button
                className="px-6 py-3 bg-gray-400 text-white rounded-full"
                onClick={() => setIsModalOpen(false)}
              >
                Cancel
              </button>
              <button
                className="px-6 py-3 bg-blue-500 text-white rounded-full"
                onClick={handleLocationChange}
              >
                Save Location
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MapComponent;
