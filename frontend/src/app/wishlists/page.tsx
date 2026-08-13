"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { api, ListingCard as ListingCardType } from "@/lib/api";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { ListingCard } from "@/lib/api"; // Wait, the type is exported as ListingCard. The component is default export from @/components/ListingCard, wait let me check the import.
import ListingCardComponent from "@/components/ListingCard";

interface WishlistResponse {
  id: number;
  user_id: number;
  listing_id: number;
  created_at: string;
  listing: ListingCardType;
}

export default function WishlistsPage() {
  const [wishlists, setWishlists] = useState<WishlistResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const { user, openAuthModal } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user === null) {
      const timer = setTimeout(() => {
        router.push("/");
        openAuthModal();
      }, 500);
      return () => clearTimeout(timer);
    }

    if (user) {
      api.getWishlist()
        .then(setWishlists)
        .catch(console.error)
        .finally(() => setLoading(false));
    }
  }, [user, router, openAuthModal]);

  if (!user || loading) {
    return (
      <div className="min-h-screen bg-white">
        <Navbar activeTab="All" setActiveTab={() => {}} />
        <div className="flex h-[50vh] items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-300 border-t-ink"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navbar activeTab="All" setActiveTab={() => {}} />
      
      <main className="flex-1 mx-auto w-full max-w-[1300px] px-6 md:px-10 xl:px-20 py-12">
        <h1 className="text-[32px] font-semibold text-ink mb-8">Wishlists</h1>
        
        {wishlists.length === 0 ? (
          <div className="border-t border-hairline py-8">
            <h2 className="text-[22px] font-semibold text-ink mb-2">Create your first wishlist</h2>
            <p className="text-[16px] text-muted mb-6">As you search, click the heart icon to save your favourite places and Experiences to a wishlist.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-6 gap-y-10 pt-4">
            {wishlists.map(w => (
              <ListingCardComponent key={w.id} listing={w.listing} />
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
