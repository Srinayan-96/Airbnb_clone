"use client";

import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, useMap, useMapEvents } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { Plus, Minus } from "lucide-react";

export interface ListingPin {
  id: string;
  lat: number;
  lng: number;
  price: string;
}

interface LiveMapProps {
  pins: ListingPin[];
  hoveredListingId: string | null;
}

function MapController({ setMap, setIsLoading, pins }: { setMap: (map: L.Map) => void; setIsLoading: (l: boolean) => void; pins: ListingPin[] }) {
  const map = useMap();
  useEffect(() => {
    setMap(map);
  }, [map, setMap]);

  useEffect(() => {
    if (pins && pins.length > 0) {
      const bounds = L.latLngBounds(pins.map(p => [p.lat, p.lng]));
      map.fitBounds(bounds, { padding: [50, 50], maxZoom: 14 });
    }
  }, [pins, map]);

  useMapEvents({
    movestart: () => setIsLoading(true),
    moveend: () => {
      setTimeout(() => setIsLoading(false), 800);
    },
    zoomstart: () => setIsLoading(true),
    zoomend: () => {
      setTimeout(() => setIsLoading(false), 800);
    }
  });

  return null;
}

export default function LiveMap({ pins, hoveredListingId }: LiveMapProps) {
  const [map, setMap] = useState<L.Map | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  const handleZoomIn = () => map?.zoomIn();
  const handleZoomOut = () => map?.zoomOut();

  // Ludhiana approximate center from mock data coordinates
  const center: [number, number] = [30.9010, 75.8573];

  const createCustomIcon = (price: string, isActive: boolean) => {
    return L.divIcon({
      className: "custom-leaflet-marker bg-transparent border-none",
      html: `<div class="transition-all duration-200 font-semibold text-[14px] rounded-full px-3 py-1.5 shadow-md flex items-center justify-center 
        ${isActive ? 'bg-ink text-white scale-110' : 'bg-white text-ink border border-hairline hover:scale-105'}
      " style="min-width: max-content; z-index: ${isActive ? 999 : 1}; position: relative;">${price}</div>`,
      iconSize: [60, 30],
      iconAnchor: [30, 15],
    });
  };

  return (
    <div className="relative h-full w-full bg-[#E5E3DF] overflow-hidden">
      <MapContainer 
        center={center} 
        zoom={13} 
        scrollWheelZoom={true} 
        zoomControl={false}
        className="h-full w-full z-0"
      >
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
        />
        <MapController setMap={setMap} setIsLoading={setIsLoading} pins={pins} />
        
        {pins.map((pin) => (
          <Marker 
            key={pin.id} 
            position={[pin.lat, pin.lng]} 
            icon={createCustomIcon(pin.price, hoveredListingId === pin.id)}
            zIndexOffset={hoveredListingId === pin.id ? 1000 : 0}
          />
        ))}
      </MapContainer>

      {/* 3-dot loading pill */}
      {isLoading && (
        <div className="absolute top-6 left-1/2 -translate-x-1/2 z-10 bg-white rounded-full shadow-[var(--shadow-elevation)] px-5 py-2.5 flex items-center gap-1.5 transition-opacity duration-300">
          <div className="w-1.5 h-1.5 bg-ink rounded-full animate-bounce [animation-delay:-0.3s]" />
          <div className="w-1.5 h-1.5 bg-ink rounded-full animate-bounce [animation-delay:-0.15s]" />
          <div className="w-1.5 h-1.5 bg-ink rounded-full animate-bounce" />
        </div>
      )}

      {/* Custom Map Controls */}
      <div className="absolute right-6 top-6 z-10">
        <div className="flex flex-col overflow-hidden rounded-md bg-white shadow-[var(--shadow-elevation)]">
          <button onClick={handleZoomIn} className="flex h-10 w-10 items-center justify-center border-b border-hairline hover:bg-gray-50 transition-colors">
            <Plus className="h-5 w-5 text-ink" />
          </button>
          <button onClick={handleZoomOut} className="flex h-10 w-10 items-center justify-center hover:bg-gray-50 transition-colors">
            <Minus className="h-5 w-5 text-ink" />
          </button>
        </div>
      </div>
    </div>
  );
}
