"use client";
import React, { useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { useSelector } from "react-redux";

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

  const mapAcessToken = "pk.eyJ1Ijoicm9sbiIsImEiOiJjbHUydnB1Y3EwYnFzMmlxZWc2NWFscDJvIn0.9TwHwnZcT6qB2OO6Q4OnFQ"

  const selector = useSelector((state: any) => state.location);

  const {lng , lat}= selector;



 

  useEffect(() => {
    if (!mapAcessToken) {
      console.error("Mapbox access token is missing.");
      return;
    }
    mapboxgl.accessToken = "pk.eyJ1Ijoicm9sbiIsImEiOiJjbHUydnB1Y3EwYnFzMmlxZWc2NWFscDJvIn0.9TwHwnZcT6qB2OO6Q4OnFQ";

    const mapInstance = new mapboxgl.Map({
      container: "map", // Container ID
      center: [selector.lng, selector.lat], // Initial coordinates
      zoom: 9,
      style: "mapbox://styles/mapbox/streets-v11",
    });

    setTestMap(mapInstance);

    if (marker) {
      marker.remove();
      return;
    }

    const initialMarker = new mapboxgl.Marker()
      .setLngLat([lng, lat])
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
