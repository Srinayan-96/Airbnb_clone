"use client";

import { useState } from "react";
import { inspirationData } from "@/lib/mock-data";
import { ChevronDown } from "lucide-react";

const TABS = [
  "Popular",
  "Arts & culture",
  "Beach",
  "Mountains",
  "Outdoors",
  "Things to do",
];

export default function InspirationGrid() {
  const [activeTab, setActiveTab] = useState("Popular");

  return (
    <div className="w-full bg-[#F7F7F7] pt-12 pb-6 border-b border-[#DDDDDD]">
      <div className="mx-auto w-full max-w-[1920px] px-6 md:px-10 xl:px-20">
        <h2 className="mb-6 text-[22px] font-semibold text-[#222222]">Inspiration for future getaways</h2>

        {/* Tabs */}
        <div className="mb-8 flex gap-6 border-b border-[#DDDDDD] overflow-x-auto hide-scrollbar">
          {TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`whitespace-nowrap pb-3 text-sm font-medium transition-colors ${
                activeTab === tab
                  ? "border-b-2 border-black text-black"
                  : "text-gray-500 hover:text-black"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-y-6 gap-x-4">
          {inspirationData.map((item) => (
            <div key={item.id} className="cursor-pointer group">
              <div className="text-[14px] font-medium text-[#222222]">
                {item.city}
              </div>
              <div className="text-[14px] text-[#717171]">
                {item.category}
              </div>
            </div>
          ))}
          
          {/* Show More link as a grid item */}
          <div className="flex items-center gap-2 cursor-pointer group mt-1">
            <span className="text-[14px] font-medium text-[#222222]">
              Show more
            </span>
            <ChevronDown className="h-4 w-4 text-[#222222]" />
          </div>
        </div>
      </div>
    </div>
  );
}
