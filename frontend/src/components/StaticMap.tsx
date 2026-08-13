"use client";

import { useState } from "react";
import { Maximize2, Plus, Minus } from "lucide-react";
import Image from "next/image";

// Placeholder coordinates (percentages relative to the map container)
const MOCK_PINS = [
  { id: 1, price: "₹8,839", top: "35%", left: "40%" },
  { id: 2, price: "₹17,450", top: "25%", left: "55%" },
  { id: 3, price: "₹17,220", top: "42%", left: "50%", active: true },
  { id: 4, price: "₹13,354", top: "52%", left: "45%" },
  { id: 5, price: "₹11,595", top: "60%", left: "65%" },
  { id: 6, price: "₹15,490", top: "35%", left: "20%" },
  { id: 7, price: "₹15,700", top: "45%", left: "80%" },
];

export default function StaticMap() {
  const [zoom, setZoom] = useState(1);

  const handleZoomIn = () => setZoom(z => Math.min(3, z + 0.2));
  const handleZoomOut = () => setZoom(z => Math.max(1, z - 0.2));

  const handleWheel = (e: React.WheelEvent) => {
    if (e.deltaY < 0) {
      handleZoomIn();
    } else {
      handleZoomOut();
    }
  };

  return (
    <div 
      className="relative h-full w-full bg-[#E5E3DF] overflow-hidden"
      onWheel={handleWheel}
    >
      {/* Background Static Map Image (Scaled on scroll) */}
      <div 
        className="absolute inset-0 transition-transform duration-200 ease-out origin-center"
        style={{ transform: `scale(${zoom})` }}
      >
        <Image 
          src="https://images.unsplash.com/photo-1524661135-423995f22d0b?w=1000&q=80" 
          alt="Map background"
          fill
          className="object-cover opacity-60 mix-blend-multiply pointer-events-none"
        />
        <div className="absolute inset-0 bg-[#a3ccaa]/30 mix-blend-overlay pointer-events-none" />
      </div>
      
      {/* Price Pins */}
      {MOCK_PINS.map((pin) => (
        <div 
          key={pin.id}
          className={`absolute flex cursor-pointer items-center justify-center rounded-full px-3 py-[6px] text-[14px] font-bold shadow-md transition-transform hover:scale-110 ${
            pin.active 
              ? "bg-ink text-on-dark" 
              : "bg-white text-ink hover:z-10"
          }`}
          style={{ top: pin.top, left: pin.left, transform: "translate(-50%, -50%)" }}
        >
          {pin.price}
        </div>
      ))}

      {/* Map Controls */}
      <div className="absolute right-4 top-4 flex flex-col gap-2">
        <button className="flex h-10 w-10 items-center justify-center rounded-md bg-white shadow-md hover:bg-gray-50">
          <Maximize2 className="h-5 w-5 text-ink" />
        </button>
        <div className="flex flex-col overflow-hidden rounded-md bg-white shadow-md">
          <button onClick={handleZoomIn} className="flex h-10 w-10 items-center justify-center border-b border-hairline hover:bg-gray-50">
            <Plus className="h-5 w-5 text-ink" />
          </button>
          <button onClick={handleZoomOut} className="flex h-10 w-10 items-center justify-center hover:bg-gray-50">
            <Minus className="h-5 w-5 text-ink" />
          </button>
        </div>
      </div>

      {/* Watermarks & Links */}
      <div className="absolute bottom-1 left-1">
        <span className="text-[12px] font-bold text-gray-500 drop-shadow-sm">Google</span>
      </div>
      <div className="absolute bottom-1 right-2 flex items-center gap-2 text-[10px] text-gray-600 drop-shadow-sm">
        <a href="#" className="hover:underline">Keyboard shortcuts</a>
        <span>·</span>
        <span>Map Data ©2026</span>
        <span>·</span>
        <a href="#" className="hover:underline">Terms</a>
        <span>·</span>
        <a href="#" className="hover:underline">Report a map error</a>
        <div className="flex items-end gap-1 ml-2">
          <span>2 km</span>
          <div className="h-[1px] w-8 bg-gray-600 mb-1" />
        </div>
      </div>
    </div>
  );
}
