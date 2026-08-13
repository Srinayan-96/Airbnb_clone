"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRef, useState, useEffect } from "react";
import { ListingCard as ListingCardType } from "@/lib/api";
import ListingCard from "./ListingCard";

interface CardCarouselRowProps {
  title: string;
  subtitle?: string;
  showArrowInTitle?: boolean;
  listings: ListingCardType[];
}

export default function CardCarouselRow({
  title,
  subtitle,
  showArrowInTitle = true,
  listings,
}: CardCarouselRowProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(Math.ceil(scrollLeft + clientWidth) < scrollWidth);
    }
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener("resize", checkScroll);
    return () => window.removeEventListener("resize", checkScroll);
  }, [listings]);

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      // Approximate one card width + gap (220px + 16px)
      // Scroll by the exact width of the container so it snaps a full page of cards
      const scrollAmount = direction === "left" ? -scrollContainerRef.current.clientWidth : scrollContainerRef.current.clientWidth;
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <div className="group relative w-full mb-8 px-6 md:px-12">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h2 className="flex items-center gap-2 text-[28px] font-bold text-ink leading-[1.43]">
            {title}
            {showArrowInTitle && (
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition-colors ml-1">
                <ChevronRight className="h-4 w-4 text-black" />
              </div>
            )}
          </h2>
          {subtitle && (
            <p className="mt-1 text-[14px] text-muted">
              {subtitle}
            </p>
          )}
        </div>

        {/* Scroll Buttons (Always visible) */}
        <div className="hidden gap-2 md:flex">
          {canScrollLeft && (
            <button
              onClick={() => scroll("left")}
              className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-100 bg-gray-50/80 hover:bg-gray-100 transition-colors"
            >
              <ChevronLeft className="h-4 w-4 text-gray-500" />
            </button>
          )}
          {canScrollRight && (
            <button
              onClick={() => scroll("right")}
              className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-100 bg-gray-50/80 hover:bg-gray-100 transition-colors"
            >
              <ChevronRight className="h-4 w-4 text-gray-700" />
            </button>
          )}
        </div>
      </div>

      <div
        ref={scrollContainerRef}
        onScroll={checkScroll}
        className="flex gap-4 overflow-x-auto snap-x snap-mandatory hide-scrollbar pb-4"
      >
        {listings.map((listing) => (
          <div 
            key={listing.id} 
            className="shrink-0 snap-start w-[80vw] sm:w-[calc((100%-2rem)/3)] md:w-[calc((100%-3rem)/4)] lg:w-[calc((100%-4rem)/5)] xl:w-[calc((100%-5rem)/6)]"
          >
            <ListingCard listing={listing} />
          </div>
        ))}
      </div>
    </div>
  );
}
