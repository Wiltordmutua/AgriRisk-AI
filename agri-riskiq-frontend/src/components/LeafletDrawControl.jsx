import { useEffect } from "react";
import { useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet-draw";
import "leaflet-draw/dist/leaflet.draw.css";

export default function LeafletDrawControl({ onCreated }) {
  const map = useMap();

  useEffect(() => {
    if (!map) return;

    // Create a feature group for drawn items
    const drawnItems = new L.FeatureGroup();
    map.addLayer(drawnItems);

    // Initialize the draw control
    const drawControl = new L.Control.Draw({
      position: "topright",
      draw: {
        rectangle: {
          shapeOptions: {
            color: "#2e7d32",
            fillOpacity: 0.3,
          },
        },
        polygon: {
          shapeOptions: {
            color: "#2e7d32",
            fillOpacity: 0.3,
          },
        },
        circle: {
          shapeOptions: {
            color: "#2e7d32",
            fillOpacity: 0.3,
          },
        },
        marker: false,
        polyline: false,
        circlemarker: false,
      },
      edit: {
        featureGroup: drawnItems,
        remove: true,
      },
    });

    map.addControl(drawControl);

    // Handle draw created event
    map.on(L.Draw.Event.CREATED, (e) => {
      const layer = e.layer;
      drawnItems.addLayer(layer);
      
      if (onCreated) {
        onCreated(e);
      }
    });

    // Cleanup
    return () => {
      map.removeControl(drawControl);
      map.removeLayer(drawnItems);
    };
  }, [map, onCreated]);

  return null;
}
