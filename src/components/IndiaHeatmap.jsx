import { useEffect, useState } from "react";
import {
  MapContainer,
  GeoJSON,
  TileLayer,
} from "react-leaflet";

import "leaflet/dist/leaflet.css";

import indiaGeoJSON from "../data/india.geojson.json";

function IndiaHeatmap({ records }) {
  const [geoData, setGeoData] = useState(null);

  useEffect(() => {
    setGeoData(indiaGeoJSON);
  }, []);

  if (!records || records.length === 0) {
    return (
      <div className="flex h-64 items-center justify-center bg-white">
        <p className="text-sm text-slate-500">
          No state-wise data available.
        </p>
      </div>
    );
  }

  if (!geoData) {
    return (
      <div className="flex h-64 items-center justify-center bg-white">
        <p className="text-sm text-slate-500">
          Loading India map...
        </p>
      </div>
    );
  }

  const stateValues = {};

  records.forEach((record) => {
    const state = record.data.state;
    const value = Number(record.data.value);

    if (state && !Number.isNaN(value)) {
      stateValues[state.trim().toLowerCase()] = value;
    }
  });

  const values = Object.values(stateValues);

  const minValue = Math.min(...values);
  const maxValue = Math.max(...values);

  const getColor = (value) => {
    if (value === undefined) {
      return "#f1f5f9";
    }

    if (maxValue === minValue) {
      return "#64748b";
    }

    const ratio =
      (value - minValue) / (maxValue - minValue);

    if (ratio >= 0.8) return "#0f172a";
    if (ratio >= 0.6) return "#334155";
    if (ratio >= 0.4) return "#64748b";
    if (ratio >= 0.2) return "#94a3b8";

    return "#cbd5e1";
  };

  const styleFeature = (feature) => {
    const stateName = feature.properties?.ST_NM;

    const value =
      stateValues[stateName?.trim().toLowerCase()];

    return {
      fillColor: getColor(value),
      weight: 1,
      color: "#ffffff",
      fillOpacity: 0.85,
    };
  };

  const onEachFeature = (feature, layer) => {
    const stateName = feature.properties?.ST_NM;

    const value =
      stateValues[stateName?.trim().toLowerCase()];

    layer.bindPopup(`
      <div style="min-width: 150px; padding: 4px;">
        <div style="font-weight: 600; color: #0f172a; margin-bottom: 6px;">
          ${stateName || "Unknown State"}
        </div>
        <div style="font-size: 13px; color: #475569;">
          <strong>Value:</strong>
          ${value !== undefined ? value : "No data"}
        </div>
      </div>
    `);

    layer.on({
      mouseover: (event) => {
        event.target.setStyle({
          weight: 2,
          color: "#0f172a",
          fillOpacity: 1,
        });

        event.target.bringToFront();
      },

      mouseout: (event) => {
        event.target.setStyle(styleFeature(feature));
      },
    });
  };

  return (
    <div className="h-[500px] w-full overflow-hidden bg-white">
      <MapContainer
        center={[22.5, 80]}
        zoom={5}
        scrollWheelZoom={true}
        className="h-full w-full"
      >
        <TileLayer
          attribution="&copy; OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <GeoJSON
          data={geoData}
          style={styleFeature}
          onEachFeature={onEachFeature}
        />
      </MapContainer>
    </div>
  );
}

export default IndiaHeatmap;