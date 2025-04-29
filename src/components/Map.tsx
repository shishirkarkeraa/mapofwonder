/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
"use client";

import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { type Dispatch, type SetStateAction } from "react";

interface Wonder {
  name: string;
  location: string;
  coordinates: [number, number];
  description: string;
}

interface MapProps {
  wonders: Wonder[];
  setActiveWonder: Dispatch<SetStateAction<number | null>>;
}

export default function Map({ wonders, setActiveWonder }: MapProps) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    // Fix Leaflet icon issues in Next.js
    delete (L.Icon.Default.prototype as any)._getIconUrl;
    
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: "/images/marker-icon-2x.png",
      iconUrl: "/images/marker-icon.png",
      shadowUrl: "/images/marker-shadow.png",
    });
    
    setReady(true);
  }, []);

  if (!ready) return null;

  return (
    <MapContainer
      center={[20, 0]}
      zoom={2}
      style={{ height: "100%", width: "100%" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      
      {wonders.map((wonder, index) => (
        <Marker
          key={wonder.name}
          position={wonder.coordinates}
          eventHandlers={{
            mouseover: () => setActiveWonder(index),
            mouseout: () => setActiveWonder(null),
          }}
        >
          <Popup>
            <div className="max-w-xs">
              <h3 className="text-lg font-bold text-gray-800">{wonder.name}</h3>
              <p className="text-gray-600">{wonder.location}</p>
              <p className="mt-2 text-gray-700">{wonder.description}</p>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
