"use client";

import { useState } from "react";

const CATEGORIES = [
  { id: "amazing-pools", label: "Amazing pools", icon: "https://cdn-icons-png.flaticon.com/512/3135/3135768.png" },
  { id: "beachfront", label: "Beachfront", icon: "https://cdn-icons-png.flaticon.com/512/826/826070.png" },
  { id: "cabins", label: "Cabins", icon: "https://cdn-icons-png.flaticon.com/512/3069/3069004.png" },
  { id: "omg", label: "OMG!", icon: "https://cdn-icons-png.flaticon.com/512/3125/3125713.png" },
  { id: "trending", label: "Trending", icon: "https://cdn-icons-png.flaticon.com/512/483/483256.png" },
  { id: "national-parks", label: "National parks", icon: "https://cdn-icons-png.flaticon.com/512/3069/3069004.png" },
  { id: "lakefront", label: "Lakefront", icon: "https://cdn-icons-png.flaticon.com/512/826/826070.png" },
  { id: "mansions", label: "Mansions", icon: "https://cdn-icons-png.flaticon.com/512/3135/3135768.png" },
  { id: "tiny-homes", label: "Tiny homes", icon: "https://cdn-icons-png.flaticon.com/512/3069/3069004.png" },
  { id: "castles", label: "Castles", icon: "https://cdn-icons-png.flaticon.com/512/3125/3125713.png" },
  { id: "camping", label: "Camping", icon: "https://cdn-icons-png.flaticon.com/512/826/826070.png" },
  { id: "vineyards", label: "Vineyards", icon: "https://cdn-icons-png.flaticon.com/512/483/483256.png" },
];

export default function CategoryStrip() {
  const [activeCat, setActiveCat] = useState("amazing-pools");

  return (
    <div className="w-full bg-canvas border-b border-hairline sticky top-0 z-40 bg-white">
      <div className="mx-auto w-full max-w-[1920px] px-6 md:px-10 xl:px-20">
        <div className="flex gap-8 overflow-x-auto hide-scrollbar pt-4 items-center">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCat(cat.id)}
              className={`group flex flex-col items-center gap-2 min-w-max transition-colors relative pb-3 ${
                activeCat === cat.id ? "text-ink opacity-100" : "text-muted opacity-70 hover:text-ink hover:opacity-100"
              }`}
            >
              <img src={cat.icon} alt={cat.label} className="w-6 h-6 object-contain filter grayscale group-hover:grayscale-0 transition-all opacity-80" />
              <span className="text-[14px] font-medium">{cat.label}</span>
              <div
                className={`absolute bottom-0 left-0 h-[2px] w-full transition-all ${
                  activeCat === cat.id ? "bg-ink" : "bg-transparent group-hover:bg-hairline"
                }`}
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
