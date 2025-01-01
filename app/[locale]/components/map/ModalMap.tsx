"use client";
import React, { useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css"; // Mapbox CSS

interface ModalMapProps {
  testMap: mapboxgl.Map | null;
  setTestMap: React.Dispatch<React.SetStateAction<mapboxgl.Map | null>>;
  setSelectedLocation: React.Dispatch<
    React.SetStateAction<{ lng: number; lat: number } | null>
  >;
}

const ModalMap: React.FC<ModalMapProps> = ({
  testMap,
  setTestMap,
  setSelectedLocation,
}) => {
  const [marker, setMarker] = useState<mapboxgl.Marker | null>(null);

  useEffect(() => {
    if (!process.env.NEXT_PUBLIC_MAP_ACCESS_TOKEN) {
      console.error("Mapbox access token is missing.");
      return;
    }
    mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAP_ACCESS_TOKEN;

    const mapInstance = new mapboxgl.Map({
      container: "map", // Container ID
      center: [12.4964, 41.9028], // Initial coordinates
      zoom: 9,
      style: "mapbox://styles/mapbox/streets-v11",
    });

    setTestMap(mapInstance);

    const initialMarker = new mapboxgl.Marker()
      .setLngLat([67.0671, 24.9665])
      .addTo(mapInstance);
    setMarker(initialMarker);

    // Update marker and selected location on map click
    mapInstance.on("click", (event) => {
      const { lng, lat } = event.lngLat;
      initialMarker.setLngLat([lng, lat]);
      setSelectedLocation({ lng, lat }); // Update parent state
    });

    return () => {
      mapInstance.remove();
    };
  }, [setTestMap, setSelectedLocation]);

  return (
    <div
      id="map"
      style={{
        height: "300px",
        width: "100%",
        borderRadius: "8px",
        overflow: "hidden",
      }}
    ></div>
  );
};

export default ModalMap;
