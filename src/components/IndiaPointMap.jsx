import {
  MapContainer,
  TileLayer,
  CircleMarker,
  Popup,
} from "react-leaflet";

import "leaflet/dist/leaflet.css";

function IndiaPointMap({ records }) {
  if (!records || records.length === 0) {
    return (
      <div className="flex h-64 items-center justify-center bg-white">
        <p className="text-sm text-slate-500">
          No map data available.
        </p>
      </div>
    );
  }

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

        {records.map((record) => {
          const latitude = Number(record.data.latitude);
          const longitude = Number(record.data.longitude);
          const value = Number(record.data.value);

          if (
            Number.isNaN(latitude) ||
            Number.isNaN(longitude) ||
            Number.isNaN(value)
          ) {
            return null;
          }

          return (
            <CircleMarker
              key={record.id}
              center={[latitude, longitude]}
              radius={9}
              pathOptions={{
                fillOpacity: 0.75,
                weight: 2,
              }}
            >
              <Popup>
                <div className="min-w-[160px] p-1">
                  <p className="mb-2 text-sm font-semibold text-slate-900">
                    Dataset Value
                  </p>

                  <div className="space-y-1 text-xs text-slate-600">
                    <p>
                      <span className="font-medium text-slate-800">
                        Latitude:
                      </span>{" "}
                      {latitude}
                    </p>

                    <p>
                      <span className="font-medium text-slate-800">
                        Longitude:
                      </span>{" "}
                      {longitude}
                    </p>

                    <p>
                      <span className="font-medium text-slate-800">
                        Value:
                      </span>{" "}
                      {value}
                    </p>
                  </div>
                </div>
              </Popup>
            </CircleMarker>
          );
        })}
      </MapContainer>
    </div>
  );
}

export default IndiaPointMap;