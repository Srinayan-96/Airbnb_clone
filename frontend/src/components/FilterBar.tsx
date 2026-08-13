"use client";

import { useState } from "react";
import { SlidersHorizontal, Wifi, Coffee, Car, Sun, Wind, Waves, Dog, Zap, Droplet } from "lucide-react"; // Note: approximating icons, some may be generic

const MOCK_FILTERS = [
  { id: "wifi", label: "Wifi", icon: Wifi },
  { id: "kitchen", label: "Kitchen", icon: Coffee }, // Approximating Kitchen with Coffee for now
  { id: "parking", label: "Free parking", icon: Car },
  { id: "breakfast", label: "Breakfast", icon: Coffee },
  { id: "ac", label: "Air conditioning", icon: Wind },
  { id: "washing", label: "Washing machine", icon: Droplet },
  { id: "pets", label: "Allows pets", icon: Dog },
  { id: "pool", label: "Pool", icon: Waves },
  { id: "hottub", label: "Hot tub", icon: Sun },
];

interface FilterBarProps {
  onFilterChange?: (activeFilters: string[]) => void;
  activeFilters?: string[];
  variant?: string;
}

export default function FilterBar({ onFilterChange }: FilterBarProps = {}) {
  const [selectedFilters, setSelectedFilters] = useState<Record<string, boolean>>({});
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);

  const toggleFilter = (id: string) => {
    const isNowSelected = !selectedFilters[id];
    const newFilters = { ...selectedFilters, [id]: isNowSelected };
    setSelectedFilters(newFilters);
    
    if (onFilterChange) {
      const active = Object.keys(newFilters).filter(k => newFilters[k]);
      onFilterChange(active);
    }
  };

  return (
    <>
      <div className="w-full bg-canvas border-b border-hairline py-3">
        <div className="mx-auto flex w-[fit-content] max-w-full items-center gap-3 px-6">
          
          {/* Main Filters Button */}
          <button 
            onClick={() => setIsFilterModalOpen(true)}
            className="flex items-center gap-2 rounded-full border border-hairline bg-canvas px-3 py-1.5 hover:bg-surface-soft transition-colors flex-shrink-0 shadow-sm"
          >
            <SlidersHorizontal className="h-3.5 w-3.5" />
            <span className="text-[13px] font-medium text-ink">Filters</span>
          </button>
          
          <div className="h-8 w-[1px] bg-hairline flex-shrink-0 mx-2" />

          {/* Scrollable Filter Pills */}
          <div className="flex flex-1 items-center gap-3 overflow-x-auto hide-scrollbar pb-1">
            {MOCK_FILTERS.map((filter) => {
              const Icon = filter.icon;
              const isSelected = selectedFilters[filter.id];
              return (
                <button
                  key={filter.id}
                  onClick={() => toggleFilter(filter.id)}
                  className={`flex items-center gap-2 rounded-full border px-3 py-1.5 text-[13px] transition-colors whitespace-nowrap flex-shrink-0 ${
                    isSelected 
                      ? "border-ink bg-surface-strong text-ink" 
                      : "border-hairline bg-canvas text-ink hover:border-ink hover:bg-surface-soft"
                  }`}
                >
                  <Icon className="h-3.5 w-3.5 text-muted" />
                  <span>{filter.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Minimal Filter Modal Shell */}
      {isFilterModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50">
          <div className="absolute inset-0" onClick={() => setIsFilterModalOpen(false)} />
          <div className="relative flex h-[80vh] w-full max-w-[780px] flex-col rounded-xl bg-canvas shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between border-b border-hairline p-6">
              <button onClick={() => setIsFilterModalOpen(false)} className="rounded-full p-2 hover:bg-surface-soft transition-colors">
                <span className="font-bold">✕</span>
              </button>
              <h2 className="text-[16px] font-bold text-ink">Filters</h2>
              <div className="w-8" />
            </div>
            
            <div className="flex-1 overflow-y-auto p-6 flex items-center justify-center">
              <p className="text-muted text-[15px]">More filters coming soon (Phase 2)...</p>
            </div>
            
            <div className="border-t border-hairline p-4 flex justify-between items-center">
              <button 
                onClick={() => {
                  setSelectedFilters({});
                  if (onFilterChange) onFilterChange([]);
                }}
                className="text-[16px] font-semibold underline hover:bg-surface-soft px-4 py-2 rounded-lg transition-colors"
              >
                Clear all
              </button>
              <button 
                onClick={() => setIsFilterModalOpen(false)}
                className="rounded-lg bg-ink px-6 py-3 text-[16px] font-semibold text-on-dark hover:bg-black transition-colors"
              >
                Show {Math.max(10, 207 - Object.keys(selectedFilters).filter(k => selectedFilters[k]).length * 15)} homes
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
