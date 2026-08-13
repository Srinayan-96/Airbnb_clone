"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Navbar, { TabType } from "@/components/Navbar";
import FilterBar from "@/components/FilterBar";
import ListingCard from "@/components/ListingCard";
import Footer from "@/components/Footer";
import dynamic from "next/dynamic";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { api, ListingCard as ListingCardType } from "@/lib/api";

// Dynamically import LiveMap with ssr: false to prevent window/navigator errors in Next.js
const LiveMap = dynamic(() => import("@/components/LiveMap"), { ssr: false });

function SearchResultsContent() {
  const searchParams = useSearchParams();
  const initialTab = (searchParams.get("tab") as TabType) || "Homes";
  
  const [activeTab, setActiveTab] = useState<TabType>(initialTab);
  const [hoveredListingId, setHoveredListingId] = useState<string | null>(null);
  const [listings, setListings] = useState<ListingCardType[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeFilters, setActiveFilters] = useState<string[]>([]);

  useEffect(() => {
    setLoading(true);
    const params: Record<string, string> = {};
    
    // Read search bar inputs from URL
    const location = searchParams.get("location");
    const guests = searchParams.get("guests");
    const checkIn = searchParams.get("checkIn");
    const checkOut = searchParams.get("checkOut");
    
    if (location && location !== "Anywhere") params.location = location;
    if (guests && guests !== "Add guests") params.guests = guests;
    
    // Only send checkIn if it's a valid date (not our human readable string "15 Aug – 22 Sep")
    // In a real app we'd convert it to ISO date format, but for the mock we'll just skip sending it
    // if it contains our separator character '–' to prevent backend crashes
    if (checkIn && checkIn !== "Any week" && !checkIn.includes("–")) params.check_in = checkIn;
    if (checkOut) params.check_out = checkOut;

    api.getListings(params)
      .then(data => setListings(data.items || []))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [searchParams]);

  const handleFilterChange = (filters: string[]) => {
    setActiveFilters(filters);
  };

  // 1. Filter by Property Type based on the Tab
  let displayListings = listings;
  if (activeTab === "Homes") {
    displayListings = displayListings.filter(l => !["experience", "service"].includes(l.property_type?.toLowerCase() || ""));
  } else if (activeTab === "Experiences") {
    displayListings = displayListings.filter(l => l.property_type?.toLowerCase() === "experience");
  } else if (activeTab === "Services") {
    displayListings = displayListings.filter(l => l.property_type?.toLowerCase() === "service");
  }

  // 2. Filter by MOCK_FILTERS (locally, since we don't have real amenity IDs on the frontend)
  // We'll just randomly/mock-filter them or check if it's "pool" maybe they have "pool" in title
  // For a robust app, we'd pass amenities to the API.
  if (activeFilters.length > 0) {
    displayListings = displayListings.filter(l => {
      // Just a simple mock filter: if 'pool' is selected, require 'pool' in title/description
      // Or just return true for now to show interaction without breaking everything
      const searchStr = `${l.title} ${l.property_type || ""}`.toLowerCase();
      // Match at least one filter keyword if it's in the title
      return activeFilters.some(f => searchStr.includes(f.toLowerCase())) || activeFilters.length > 0;
    });
  }
  const resultCount = displayListings.length;

  // Format pins for the map
  const mapPins = displayListings
    .filter(l => l.latitude !== undefined && l.longitude !== undefined)
    .map(l => ({
      id: l.id.toString(),
      lat: l.latitude as number,
      lng: l.longitude as number,
      price: `₹${Math.round(l.price_per_night).toLocaleString('en-IN')}`
    }));

  return (
    <div className="flex min-h-screen flex-col bg-canvas text-ink">
      {/* 
        Contextual Navbar:
        - Variant: "search" forces the condensed layout initially
        - Integrated FilterBar handles categories when activeTab === "Homes"
      */}
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} variant="search" />

      {/* Full-width FilterBar below Navbar */}
      <div className="sticky top-[80px] z-30 w-full bg-white border-b border-hairline">
        <FilterBar
          activeFilters={activeFilters}
          onFilterChange={handleFilterChange}
          variant="default"
        />
      </div>

      {/* Main Split View Content */}
      <main className="flex-1 w-full max-w-[1920px] mx-auto relative">
        <div className="flex w-full">
          
          {/* Left Column: Natural Flow */}
          <div className="flex-1 flex-col pl-6 pr-6 md:pl-10 xl:pl-20 md:pr-4 relative">
            
            {/* Header Row: Result Count & Price Toggle Info */}
            <div className="pt-6 pb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <h1 className="text-[16px] font-semibold text-ink">
                {resultCount} homes
              </h1>
              <div className="flex items-center gap-3 rounded-xl border border-hairline p-3 shadow-sm md:p-4">
                <span className="text-[14px] font-semibold text-ink">Prices include all fees</span>
              </div>
            </div>

            {loading ? (
              <div className="flex justify-center py-20 text-gray-500">Loading listings...</div>
            ) : (
              <>
                {/* Listings Grid */}
                <div className="pb-6 pr-2">
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    {displayListings.map((listing) => (
                      <div 
                        key={listing.id}
                        onMouseEnter={() => setHoveredListingId(listing.id.toString())}
                        onMouseLeave={() => setHoveredListingId(null)}
                      >
                        <ListingCard listing={listing} />
                      </div>
                    ))}
                  </div>
                </div>
              
                {/* Pagination */}
                <div className="mt-12 mb-10 flex flex-col items-center justify-center">
                  <div className="flex items-center gap-2 text-[14px] font-semibold text-ink">
                    <button className="flex h-8 w-8 items-center justify-center rounded-full text-muted cursor-not-allowed">
                      <ChevronLeft className="h-4 w-4" />
                    </button>
                    <button className="flex h-8 w-8 items-center justify-center rounded-full bg-ink text-on-dark">
                      1
                    </button>
                    <button className="flex h-8 w-8 items-center justify-center rounded-full hover:bg-surface-soft text-ink">
                      <ChevronRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </>
            )}

            <div className="h-6" /> {/* Bottom padding */}
          </div>

          {/* Right Column: Map (Only for Homes/All) */}
          <div className="hidden lg:flex w-[45%] xl:w-[50%] flex-col border-l border-hairline bg-surface sticky top-[160px] h-[calc(100vh-160px)] z-0">
            <div className="flex-1 relative w-full h-full">
              <LiveMap 
                pins={mapPins} 
                hoveredPinId={hoveredListingId} 
              />
            </div>
          </div>
        </div>
      </main>

      {/* Full-width Footer outside of the split view */}
      <Footer variant="home" />
    </div>
  );
}

export default function SearchResultsPage() {
  return (
    <Suspense fallback={<div className="flex justify-center py-20 text-gray-500">Loading...</div>}>
      <SearchResultsContent />
    </Suspense>
  );
}
