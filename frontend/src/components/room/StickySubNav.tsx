import { useEffect, useState } from "react";
import { DetailedListing } from "@/lib/mock-data";

export default function StickySubNav({ listing }: { listing: DetailedListing }) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show when scrolling past the gallery (approx 600px)
      if (window.scrollY > 600) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed top-0 left-0 w-full bg-canvas z-50 border-b border-hairline shadow-[0_1px_2px_rgba(0,0,0,0.08)] animate-in fade-in slide-in-from-top-4 duration-300">
      <div className="mx-auto w-full max-w-[1120px] px-6 md:px-20 h-[80px] flex items-center justify-between">
        <div className="flex items-center gap-6 text-[14px] md:text-[16px] font-medium text-ink">
          <a href="#photos" className="hover:underline">Photos</a>
          <a href="#amenities" className="hover:underline">Amenities</a>
          <a href="#reviews" className="hover:underline">Reviews</a>
          <a href="#location" className="hover:underline">Location</a>
        </div>
        <div className="hidden md:flex items-center gap-4">
          <div className="flex flex-col text-right">
            <div className="flex items-baseline justify-end gap-1">
              <span className="font-bold text-[16px]">{listing.price}</span>
              <span className="text-[14px] text-muted">{listing.priceLabel}</span>
            </div>
            <div className="flex items-center justify-end gap-1 text-[13px] text-muted">
              <span className="text-black">★</span> {listing.stats.rating} · {listing.stats.reviews} reviews
            </div>
          </div>
          <button 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="h-[48px] px-8 rounded-full bg-gradient-to-r from-[#E61E4D] via-[#E31C5F] to-[#D70466] text-white font-bold text-[16px] hover:brightness-95 transition"
          >
            Reserve
          </button>
        </div>
      </div>
    </div>
  );
}
