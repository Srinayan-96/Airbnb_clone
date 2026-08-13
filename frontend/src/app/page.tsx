"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Navbar, { TabType } from "@/components/Navbar";
import PromoModal from "@/components/PromoModal";
import CardCarouselRow from "@/components/CardCarouselRow";
import InspirationGrid from "@/components/InspirationGrid";
import Footer from "@/components/Footer";
import { api, ListingCard } from "@/lib/api";

function HomeContent() {
  const searchParams = useSearchParams();
  const initialTab = (searchParams.get("tab") as TabType) || "All";
  const [activeTab, setActiveTab] = useState<TabType>(initialTab);
  const [listings, setListings] = useState<ListingCard[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.getListings()
      .then((data) => {
        setListings(data.items || []);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const homes = listings.filter(l => !['experience', 'service'].includes(l.property_type?.toLowerCase() || ''));
  const experiences = listings.filter(l => l.property_type?.toLowerCase() === 'experience');
  const services = listings.filter(l => l.property_type?.toLowerCase() === 'service');

  const getActiveListings = () => {
    if (activeTab === "Experiences") return experiences;
    if (activeTab === "Services") return services;
    return homes;
  };

  const activeListings = getActiveListings();
  const guestFavorites = activeListings.filter(l => l.is_guest_favourite);

  return (
    <main className="min-h-screen bg-white">
      <PromoModal />
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

      <div className="mx-auto w-full max-w-[1300px] py-[64px]">
        {loading ? (
          <div className="flex justify-center py-20 text-gray-500">Loading listings...</div>
        ) : (
          <>
            {(activeTab === "All" || activeTab === "Homes") && (
              <div className="animate-in fade-in duration-500 pt-8">
                <CardCarouselRow
                  title="Popular homes in India"
                  listings={homes}
                />
                {guestFavorites.length > 0 && (
                  <CardCarouselRow
                    title="Guest favourites in your area"
                    listings={guestFavorites}
                  />
                )}
                <CardCarouselRow
                  title="Discover more places to stay"
                  listings={[...homes].reverse()}
                />
              </div>
            )}

            {activeTab === "Experiences" && (
              <div className="animate-in fade-in duration-500 pt-8">
                <CardCarouselRow
                  title="Top Experiences for you"
                  listings={[...experiences].reverse()}
                />
                <CardCarouselRow
                  title="Trending this week"
                  listings={experiences}
                />
              </div>
            )}

            {activeTab === "Services" && (
              <div className="animate-in fade-in duration-500 pt-8">
                <CardCarouselRow
                  title="Popular Services"
                  listings={services}
                />
                <CardCarouselRow
                  title="Highly Rated"
                  listings={[...services].reverse()}
                />
              </div>
            )}
          </>
        )}
      </div>

      <InspirationGrid />
      <Footer />
    </main>
  );
}

export default function Home() {
  return (
    <Suspense fallback={<div className="flex justify-center py-20 text-gray-500">Loading...</div>}>
      <HomeContent />
    </Suspense>
  );
}
