import Image from "next/image";
import Link from "next/link";
import { Heart, Trophy } from "lucide-react";
import { api, ListingCard as ListingCardType } from "@/lib/api";
import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";

export default function ListingCard({ listing, initialWishlisted = false }: { listing: ListingCardType; initialWishlisted?: boolean }) {
  const [isWishlisted, setIsWishlisted] = useState(initialWishlisted);
  const { user } = useAuth();
  const [isHovered, setIsHovered] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const images = listing.cover_photo_url ? [listing.cover_photo_url] : ["https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800"];

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isHovered && images.length > 1) {
      interval = setInterval(() => {
        setCurrentImageIndex((prev) => (prev + 1) % images.length);
      }, 1000);
    } else {
      setCurrentImageIndex(0);
    }
    return () => clearInterval(interval);
  }, [isHovered, images.length]);

  return (
    <Link 
      href={`/rooms/${listing.id}`} 
      target="_blank" 
      rel="noopener noreferrer" 
      className="group relative flex flex-col gap-2 w-full flex-none block"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative aspect-square overflow-hidden rounded-[16px]">
        <Image
          src={images[currentImageIndex]}
          alt={listing.title || "Listing image"}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
        
        {/* Wishlist Button */}
        <button
          onClick={async (e) => {
            e.preventDefault();
            e.stopPropagation();
            if (!user) return; // Need to be logged in
            
            const newState = !isWishlisted;
            setIsWishlisted(newState);
            
            try {
              if (newState) {
                await api.addToWishlist(listing.id);
              } else {
                await api.removeFromWishlist(listing.id);
              }
            } catch (err) {
              setIsWishlisted(!newState); // Revert on failure
            }
          }}
          className="absolute right-3 top-3 z-10 p-1"
        >
          <Heart
            className={`h-6 w-6 transition-colors ${
              isWishlisted
                ? "fill-[#E61E4D] text-[#E61E4D]"
                : "fill-black/40 text-white stroke-[1.5]"
            }`}
          />
        </button>

        {listing.is_guest_favourite && (
          <div className="absolute left-3 top-3 flex items-center justify-center bg-white/95 rounded-full px-3 py-1 text-[13px] font-semibold text-ink shadow-[0_1px_2px_rgba(0,0,0,0.1)] z-10">
            Guest favourite
          </div>
        )}

        {/* Carousel Dots */}
        {images.length > 1 && (
          <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 items-center gap-[4px] z-10">
            {images.slice(0, 5).map((_, i) => (
              <div 
                key={i} 
                className={`rounded-full transition-all duration-300 ${
                  i === currentImageIndex % 5
                    ? "h-[6px] w-[6px] bg-white opacity-100"
                    : "h-[5px] w-[5px] bg-white/60 opacity-60"
                }`} 
              />
            ))}
          </div>
        )}
      </div>

      <div className="flex flex-col w-full mt-1">
        <h3 className="font-semibold text-[15px] text-ink line-clamp-1">
          {listing.city}, {listing.state}
        </h3>
        <div className="text-[14px] text-muted line-clamp-1 mt-0.5">
          {listing.title}
        </div>
        <div className="text-[14px] text-muted line-clamp-1 flex items-center mt-1">
          <span className="font-semibold text-ink">₹{Math.round(listing.price_per_night).toLocaleString('en-IN')}</span>
          <span className="ml-1">night</span>
          {listing.rating > 0 && <span className="mx-1">·</span>}
          {listing.rating > 0 && <span>★ {listing.rating.toFixed(2)}</span>}
        </div>
      </div>
    </Link>
  );
}
