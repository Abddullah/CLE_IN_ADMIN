// import { useState, useEffect, useRef } from 'react';
// import mapboxgl from 'mapbox-gl';
// import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
// import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';

// // Set your Mapbox token here
// mapboxgl.accessToken = 'ADD_YOUR_MAPBOX_ACCESS_TOKEN';

// interface Location {
//   lng: number;
//   lat: number;
// }

// const MapComponent: React.FC = () => {
//   const [location, setLocation] = useState<Location>({ lng: 12.4964, lat: 41.9028 }); // Default to Rome, Italy
//   const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
//   const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);
//   const mapContainer = useRef<HTMLDivElement | null>(null);
//   const modalMapContainer = useRef<HTMLDivElement | null>(null);
//   const modalMarker = useRef<mapboxgl.Marker | null>(null);
//   const [map, setMap] = useState<mapboxgl.Map | null>(null);
//   const [modalMap, setModalMap] = useState<mapboxgl.Map | null>(null);
//   const geocoderRef = useRef<MapboxGeocoder | null>(null); // Ref to hold geocoder instance

//   // Initialize the main map (fixed location map)
//   useEffect(() => {
//     if (mapContainer.current) {
//       const mapInstance = new mapboxgl.Map({
//         container: mapContainer.current,
//         style: 'mapbox://styles/mapbox/streets-v11',
//         center: [location.lng, location.lat],
//         zoom: 12,
//         attributionControl: false,
//         interactive: false, // Disable interactions on the main map
//       });

//       // Add marker for the default location (fixed)
//       new mapboxgl.Marker({
//         color: '#00BFFF',
//       })
//         .setLngLat([location.lng, location.lat])
//         .addTo(mapInstance);

//       setMap(mapInstance);

//       return () => {
//         mapInstance.remove();
//       };
//     }
//   }, [location]);

//   // Initialize the modal map (interactive map)
//   useEffect(() => {
//     if (isModalOpen && modalMapContainer.current) {
//       const modalMapInstance = new mapboxgl.Map({
//         container: modalMapContainer.current,
//         style: 'mapbox://styles/mapbox/streets-v11',
//         center: [location.lng, location.lat],
//         zoom: 12,
//         attributionControl: false,
//         interactive: true, // Enable interactions inside modal
//       });

//       // Add a draggable marker to the modal map
//       modalMarker.current = new mapboxgl.Marker({
//         color: '#00BFFF',
//         draggable: true,
//       })
//         .setLngLat([location.lng, location.lat])
//         .addTo(modalMapInstance);

//       modalMapInstance.flyTo({
//         center: [location.lng, location.lat],
//         essential: true,
//         zoom: 12,
//       });

//       modalMapInstance.on('click', (e) => {
//         const clickedLocation = e.lngLat;
//         setLocation({ lng: clickedLocation.lng, lat: clickedLocation.lat });
//         modalMarker.current?.setLngLat(clickedLocation); // Move marker to clicked location
//         setSelectedLocation({ lng: clickedLocation.lng, lat: clickedLocation.lat });
//       });

//       setModalMap(modalMapInstance);

//       return () => {
//         modalMapInstance.remove();
//       };
//     }
//   }, [isModalOpen, location]);

//   // Open and close modal
//   const openModal = () => setIsModalOpen(true);
//   const closeModal = () => setIsModalOpen(false);

//   // Handle saving the location from the modal
//   const handleLocationChange = () => {
//     if (selectedLocation) {
//       setLocation(selectedLocation); 
//       closeModal();
//       console.log(location);
      
//     }
//   };

//   // Create a Geocoder component to render in modal
//   const Geocoder = () => {
//     useEffect(() => {
//       if (modalMap && !geocoderRef.current && modalMapContainer.current) {
//         const geocoder = new MapboxGeocoder({
//           accessToken: mapboxgl.accessToken,
//           mapboxgl: mapboxgl,
//           placeholder: 'Search for a location...',
//         });
  
//         // Add geocoder to the modal map
//         modalMap.addControl(geocoder);
  
//         // Update location when a search result is found
//         geocoder.on('result', (event: any) => {
//           const newLocation = event.result.center;
//           setLocation({ lng: newLocation[0], lat: newLocation[1] });
//           setSelectedLocation({ lng: newLocation[0], lat: newLocation[1] });
//           modalMarker.current?.setLngLat([newLocation[0], newLocation[1]]);
//         });
  
//         geocoderRef.current = geocoder;
  
//         return () => {
//           if (modalMap && geocoderRef.current) {
//             modalMap.removeControl(geocoderRef.current);
//             geocoderRef.current = null;
//           }
//         };
//       }
//     }, [modalMap]);
  
//     return <div id="geocoder" className="w-full max-w-xs mx-auto mb-4" />;
//   };
  

//   return (
//     <div className="items-center grid w-full gap-1.5">
//       {/* Fixed Map */}
//       <div
//         ref={mapContainer}
//         className="w-full mt-4 object-cover h-60 sm:h-60 md:h-60 lg:h-60 rounded-lg shadow-lg relative overflow-hidden mb-4"
//       >
//         {/* Change Location Text */}
//         <div className="absolute top-2 right-4 underline text-black font-semibold text-lg cursor-pointer" onClick={openModal}>
//           Change Location
//         </div>
//       </div>

//       {/* Modal for Location Selection */}
//       {isModalOpen && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 sm:p-6">
//           <div className="bg-white rounded-lg shadow-lg w-full max-w-xl overflow-hidden">
//             <div className="flex justify-between items-center p-4 sm:p-6 border-b">
//               <h2 className="text-lg sm:text-xl font-semibold text-gray-700">Select a Location</h2>
//               <button
//                 className="text-gray-600 hover:text-gray-900 text-2xl"
//                 onClick={closeModal}
//               >
//                 &times;
//               </button>
//             </div>

//             {/* Geocoder (Search Bar) */}
//             <Geocoder />

//             {/* Modal Map */}
//             <div
//               ref={modalMapContainer}
//               className="w-full h-32 sm:h-48 md:h-56 lg:h-72 xl:h-80 2xl:h-96 relative overflow-hidden"
//             />

//             <div className="p-4 sm:p-6 bg-gray-50 flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0 sm:space-x-4 border-t">
//               <button
//                 className="px-6 py-3 bg-gray-400 text-white rounded-full hover:bg-gray-500 transition duration-300 w-full sm:w-auto"
//                 onClick={closeModal}
//               >
//                 Cancel
//               </button>
//               <button
//                 className="px-6 py-3 bg-[#00BFFF] text-white rounded-full hover:bg-[#00A2D8] transition duration-300 w-full sm:w-auto"
//                 onClick={handleLocationChange}
//               >
//                 Save Location
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default MapComponent;







import { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import mapboxgl from "mapbox-gl";
import { setLocation } from "../../[locale]/config/Redux/reducers/locationSlice";

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
    });

    setMap(mapInstance);

    // Click handler to add marker and update location on map click
    mapInstance.on("click", (e) => {
      const clickedLocation = e.lngLat;
      setSelectedLocation({ lng: clickedLocation.lng, lat: clickedLocation.lat });

      // Add marker on click smoothly
      if (mainMarker.current) {
        mainMarker.current.remove(); // Remove previous marker
      }

      mainMarker.current = new mapboxgl.Marker({ color: "red", scale: 0.8 })
        .setLngLat([clickedLocation.lng, clickedLocation.lat])
        .addTo(mapInstance);

      // Animate the marker to make it pop
      mainMarker.current.getElement().animate(
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
  }, []); // Initialize map once, when component mounts

  useEffect(() => {
    if (!map || !selectedLocation) return;

    // Update marker location whenever location state changes
    if (mainMarker.current) {
      mainMarker.current.setLngLat([selectedLocation.lng, selectedLocation.lat]); // Move marker to the new location
    }

    // Update map center and move to the selected location smoothly
    map.flyTo({
      center: [selectedLocation.lng, selectedLocation.lat],
      essential: true,
      speed: 0.6,
      curve: 1,
    });
  }, [selectedLocation, map]);

  const handleLocationChange = () => {
    if (selectedLocation) {
      setLocationState(selectedLocation); // Update the main map marker
      dispatch(setLocation(selectedLocation));
      setIsModalOpen(false);
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
            <div className="w-full h-72 relative overflow-hidden" />
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
