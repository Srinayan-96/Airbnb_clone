"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import { WhereDropdown, WhenDropdown, WhoDropdown, ServiceTypeDropdown } from "./SearchDropdowns";

interface SearchBarProps {
  variant: "large" | "condensed";
  contextVariant?: "home" | "search";
  activeTab: "All" | "Homes" | "Experiences" | "Services";
  onExpand?: () => void;
}

export default function SearchBar({ variant, contextVariant = "home", activeTab, onExpand }: SearchBarProps) {
  // activeSegment tracks which part of the large search bar is open: "where", "when", "who", "type"
  const [activeSegment, setActiveSegment] = useState<string | null>(null);
  const [searchLocation, setSearchLocation] = useState("Anywhere");
  const [searchWhen, setSearchWhen] = useState("Any week");
  const [searchGuests, setSearchGuests] = useState("Add guests");
  const searchBarRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const handleSearchClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    const params = new URLSearchParams();
    params.set("tab", activeTab);
    if (searchLocation && searchLocation !== "Anywhere" && searchLocation !== "Search destinations" && searchLocation !== "Search by city or landmark") {
      params.set("location", searchLocation);
    }
    if (searchWhen && searchWhen !== "Any week" && searchWhen !== "Add dates") {
      params.set("checkIn", searchWhen);
    }
    if (searchGuests && searchGuests !== "Add guests") {
      // Very simple extraction of number for guests if it's something like "2 guests"
      const num = parseInt(searchGuests);
      if (!isNaN(num)) params.set("guests", num.toString());
      else params.set("guests", searchGuests);
    }
    router.push(`/search?${params.toString()}`);
  };

  // Close dropdowns when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchBarRef.current && !searchBarRef.current.contains(event.target as Node)) {
        setActiveSegment(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSegmentClick = (segment: string) => {
    if (variant === "condensed" && onExpand) {
      onExpand();
      // setTimeout to allow the expansion to render before setting active segment
      setTimeout(() => setActiveSegment(segment), 50);
    } else {
      setActiveSegment(segment);
    }
  };

  // Determine what segments to show based on active tab
  const showWho = activeTab !== "Services";
  const showType = activeTab === "Services";
  const wherePlaceholder = activeTab === "Experiences" ? "Search by city or landmark" : "Search destinations";

  let condensedWhere = "Anywhere";
  let condensedWhen = "Anytime";
  
  if (contextVariant === "search") {
    condensedWhere = activeTab === "Homes" ? "Homes nearby" : "Nearby";
    condensedWhen = activeTab === "Homes" ? "Any week" : "Add dates";
  }

  if (variant === "condensed") {
    return (
      <div 
        onClick={() => handleSegmentClick("where")}
        className="flex cursor-pointer items-center gap-4 rounded-full border border-hairline bg-canvas py-2 pl-6 pr-2 shadow-[var(--shadow-elevation)] transition-shadow hover:shadow-md"
      >
        <div className="flex items-center gap-4 text-[14px] font-medium text-ink">
          <span>{condensedWhere}</span>
          <div className="h-6 w-[1px] bg-hairline" />
          <span>{condensedWhen}</span>
          <div className="h-6 w-[1px] bg-hairline" />
          <span className="text-muted">Add guests</span>
        </div>
        <button 
          onClick={handleSearchClick}
          className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-white hover:bg-primary/90 transition-colors"
        >
          <Search className="h-4 w-4" />
        </button>
      </div>
    );
  }

  // Large Variant
  return (
    <div className="relative mx-auto w-full max-w-[850px]" ref={searchBarRef}>
      <div
        className={`relative flex items-center rounded-full border border-[#dddddd] bg-white shadow-[var(--shadow-elevation)] transition-colors duration-200 ${
          activeSegment ? "bg-white" : ""
        }`}
      >
        {/* Where Segment */}
        <div
          onClick={() => handleSegmentClick("where")}
          className={`flex-1 cursor-pointer rounded-full px-8 py-4 transition-colors ${
            activeSegment === "where" ? "bg-white shadow-[var(--shadow-elevation)]" : "hover:bg-[#f7f7f7]"
          }`}
        >
          <div className="text-[14px] font-medium text-ink">Where</div>
          <div className={`truncate text-[16px] ${activeSegment === "where" ? "text-ink" : "text-muted"}`}>
            {searchLocation !== "Anywhere" ? searchLocation : wherePlaceholder}
          </div>
        </div>

        <div className="h-8 w-[1px] bg-hairline" />

        {/* When Segment */}
        <div
          onClick={() => handleSegmentClick("when")}
          className={`flex-1 cursor-pointer rounded-full px-8 py-4 transition-colors ${
            activeSegment === "when" ? "bg-white shadow-[var(--shadow-elevation)]" : "hover:bg-surface-soft"
          }`}
        >
          <div className="text-[14px] font-medium text-ink">When</div>
          <div className={`truncate text-[16px] ${activeSegment === "when" ? "text-ink" : "text-muted"}`}>
            {searchWhen !== "Any week" ? searchWhen : "Add dates"}
          </div>
        </div>

        <div className="h-8 w-[1px] bg-hairline" />

        {/* Who or Type Segment */}
        <div
          onClick={() => handleSegmentClick(showWho ? "who" : "type")}
          className={`flex flex-1 cursor-pointer items-center justify-between rounded-full pl-8 pr-2 py-2 transition-colors ${
            activeSegment === (showWho ? "who" : "type") ? "bg-white shadow-[var(--shadow-elevation)]" : "hover:bg-surface-soft"
          }`}
        >
          <div className="flex flex-col justify-center py-2">
             <div className="text-[14px] font-medium text-ink">
                {showWho ? "Who" : "Type of service"}
             </div>
             <div className={`truncate text-[16px] ${activeSegment === (showWho ? "who" : "type") ? "text-ink" : "text-muted"}`}>
                {searchGuests !== "Add guests" ? searchGuests : (showWho ? "Add guests" : "Add service")}
             </div>
          </div>
          
          <button 
            onClick={handleSearchClick}
            className={`flex items-center gap-2 rounded-full bg-primary text-on-primary transition-all hover:bg-primary/90 ${
               activeSegment ? "px-6 py-3" : "h-12 w-12 justify-center"
            }`}
          >
            <Search className="h-5 w-5" />
            {activeSegment && <span className="font-semibold text-[16px]">Search</span>}
          </button>
        </div>
      </div>

      {/* Dropdowns */}
      {activeSegment === "where" && (
        <div className="absolute left-0 top-[110%] z-40 rounded-3xl bg-white shadow-[var(--shadow-elevation)] border border-hairline">
          <WhereDropdown variant={activeTab === "Experiences" ? "experiences" : "default"} onSelect={(val) => { setSearchLocation(val); setActiveSegment("when"); }} />
        </div>
      )}
      {activeSegment === "when" && (
        <div className="absolute left-1/2 top-[110%] z-40 -translate-x-1/2 rounded-3xl bg-white shadow-[var(--shadow-elevation)] border border-hairline">
          <WhenDropdown variant={activeTab === "Services" ? "quick" : "default"} onSelect={(val) => { setSearchWhen(val); setActiveSegment(showWho ? "who" : "type"); }} />
        </div>
      )}
      {activeSegment === "who" && (
        <div className="absolute right-0 top-[110%] z-40 rounded-3xl bg-white shadow-[var(--shadow-elevation)] border border-hairline">
          <WhoDropdown showPets={activeTab !== "Experiences"} onChange={(val) => setSearchGuests(val)} />
        </div>
      )}
      {activeSegment === "type" && (
        <div className="absolute right-0 top-[110%] z-40 rounded-3xl bg-white shadow-[var(--shadow-elevation)] border border-hairline">
          <ServiceTypeDropdown onSelect={(val) => setSearchGuests(val)} />
        </div>
      )}
    </div>
  );
}
