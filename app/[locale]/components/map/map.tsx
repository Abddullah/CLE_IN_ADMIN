import { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import mapboxgl from "mapbox-gl";
import { setLocation } from "../../../[locale]/config/Redux/reducers/locationSlice";
import Dropdown from "./SearchResultsModal";
import ModalMap from "./ModalMap";
import { useSelector } from "react-redux";

mapboxgl.accessToken = "pk.eyJ1Ijoicm9sbiIsImEiOiJjbHUydnB1Y3EwYnFzMmlxZWc2NWFscDJvIn0.9TwHwnZcT6qB2OO6Q4OnFQ";

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
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(
    null
  );
  const mapContainer = useRef<HTMLDivElement | null>(null);
  const mapContainerModal = useRef<HTMLDivElement | null>(null);
  const [map, setMap] = useState<mapboxgl.Map | null>(null);
  const [marker, setMarker] = useState<mapboxgl.Marker | null>(null);
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [error, setError] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [testMap, setTestMap] = useState<mapboxgl.Map | null>(null);
  const [testMarker, setTestMarker] = useState<mapboxgl.Marker | null>(null);

  const selector = useSelector((state: any) => state.location);
  const { lng, lat } = selector;

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

    // Add marker to the initial location
    const initialMarker = new mapboxgl.Marker()
      .setLngLat([location.lng, location.lat])
      .addTo(mapInstance);

    setMap(mapInstance);
    setMarker(initialMarker);

    return () => {
      mapInstance.remove();
    };
  }, [location]); // Re-run effect whenever 'location' changes

  useEffect(() => {
    if (!mapContainerModal.current || !isModalOpen) return;

    const mapInstance = new mapboxgl.Map({
      container: mapContainerModal.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [location.lng, location.lat],
      zoom: 12,
    });

    setMap(mapInstance);

    // Reset the marker each time modal is opened, or re-attach the existing one
    if (marker) {
      marker.setLngLat([location.lng, location.lat]);
    } else {
      const newMarker = new mapboxgl.Marker()
        .setLngLat([location.lng, location.lat])
        .addTo(mapInstance);
      setMarker(newMarker); // Set the marker in the state
    }

    return () => mapInstance.remove();
  }, [isModalOpen, location, marker]);

  const handleLocationChange = () => {
    if (selectedLocation) {
      // Redux mein location update karna
      dispatch(setLocation(selectedLocation));

      // Main map ko update karna
      setLocationState(selectedLocation);
      setIsModalOpen(false); // Modal ko close karna
    }
  };

  const handleSearch = async (query: string) => {
    if (query) {
      try {
        const response = await fetch(
          `https://api.mapbox.com/geocoding/v5/mapbox.places/${query}.json?access_token=pk.eyJ1Ijoicm9sbiIsImEiOiJjbHUydnB1Y3EwYnFzMmlxZWc2NWFscDJvIn0.9TwHwnZcT6qB2OO6Q4OnFQ`
        );
        const data = await response.json();

        if (data.features && data.features.length > 0) {
          setSearchResults(data.features);
          setError("");
          setShowDropdown(true);
        } else {
          setSearchResults([]);
          setError("No results found.");
          setShowDropdown(true);
        }
      } catch (err) {
        setError("Error fetching data. Please try again.");
        setShowDropdown(true);
      }
    } else {
      setSearchResults([]);
      setShowDropdown(false);
    }
  };

  const handleSelect = (selectedItem: string) => {
    const selectedFeature = searchResults.find(
      (result: any) => result.place_name === selectedItem
    );

    if (selectedFeature) {
      const { center } = selectedFeature;
      const newLocation = { lng: center[0], lat: center[1] };

      setLocationState(newLocation);
      setSelectedLocation(newLocation);
      dispatch(setLocation(newLocation));

      // For the main map (map)
      if (map) {
        map.flyTo({
          center: [newLocation.lng, newLocation.lat],
          essential: true,
          speed: 0.4,
          curve: 1,
        });

        // Update the marker if it exists, else create one and add it to the map
        if (marker) {
          marker.setLngLat([newLocation.lng, newLocation.lat]); // Update the position of the existing marker
        } else {
          const newMarker = new mapboxgl.Marker({ color: "blue" })
            .setLngLat([newLocation.lng, newLocation.lat])
            .addTo(map);
          setMarker(newMarker); // Set the marker in the state
        }
      }

      // For the test map (testMap) — this is only if you want another map with a marker
      if (testMap) {
        testMap.flyTo({
          center: [newLocation.lng, newLocation.lat],
          essential: true,
          speed: 2.1,
          curve: 1,
        });
      }

      setShowDropdown(false);
    }
  };

  return (
    <div className="items-center grid w-full gap-1.5">
      {/* Main Map */}
      <div
        ref={mapContainer}
        className="w-full h-60 rounded-lg shadow-lg relative overflow-hidden mb-4"
      >
        <div
          className="absolute top-2 right-4 underline text-black font-semibold cursor-pointer z-20"
          onClick={() => setIsModalOpen(true)}
        >
          <p className="text-lg"> Change Location</p>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-xl">
            <div className="p-4 border-b flex justify-between gap-8">
              <div className="w-full relative">
                <input
                  type="text"
                  onChange={(e) => handleSearch(e.target.value)}
                  placeholder="Search Location..."
                  className="border border-gray-300 p-3 rounded-lg w-full text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <Dropdown
                  visible={showDropdown}
                  items={searchResults}
                  error={error}
                  onSelect={handleSelect}
                />
              </div>
              <button
                className="text-gray-600 hover:text-gray-900 text-2xl"
                onClick={() => setIsModalOpen(false)}
              >
                &times;
              </button>
            </div>

            {/* Pass setSelectedLocation to ModalMap */}
            <ModalMap
              testMap={testMap}
              setTestMap={setTestMap}
              setSelectedLocation={setSelectedLocation}
            />

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
