"use client";

import { DetailedListing } from "@/lib/mock-data";
import { ChevronDown, Flag, Minus, Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useRef, useEffect } from "react";

export default function StickyBookingCard({ listing }: { listing: DetailedListing }) {
  const router = useRouter();

  const defaultCheckin = new Date();
  defaultCheckin.setDate(defaultCheckin.getDate() + 10);
  const defaultCheckout = new Date();
  defaultCheckout.setDate(defaultCheckout.getDate() + 12);

  const fmt = (d: Date) => d.toISOString().split("T")[0];
  const fmtDisplay = (d: Date) =>
    d.toLocaleDateString("en-US", { month: "numeric", day: "numeric", year: "numeric" });

  const [checkin, setCheckin] = useState(fmt(defaultCheckin));
  const [checkout, setCheckout] = useState(fmt(defaultCheckout));
  const [guests, setGuests] = useState(1);
  const [showGuests, setShowGuests] = useState(false);
  const guestRef = useRef<HTMLDivElement>(null);

  const maxGuests = listing.maxGuests ?? 10;

  const nights = (() => {
    const a = new Date(checkin);
    const b = new Date(checkout);
    const n = Math.round((b.getTime() - a.getTime()) / (1000 * 60 * 60 * 24));
    return n > 0 ? n : 1;
  })();

  // Parse price (backend returns string)
  const priceNum = parseFloat(listing.price.replace(/[^\d.]/g, "")) || 0;
  const subtotal = priceNum * nights;

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (guestRef.current && !guestRef.current.contains(e.target as Node)) {
        setShowGuests(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="flex flex-col w-full">
      {/* Top pill */}
      <div className="flex items-center justify-center border border-hairline rounded-xl px-4 py-2 w-max mb-6 shadow-sm bg-white self-end lg:self-start">
        <span className="text-[14px] font-semibold text-ink">🏷 Prices include all fees</span>
      </div>

      <div className="border border-hairline rounded-[16px] p-6 shadow-[0_6px_16px_rgba(0,0,0,0.12)] bg-white mb-6">
        <div className="flex items-baseline gap-1 mb-6">
          <span className="font-bold text-[22px] text-ink">{listing.price}</span>
          <span className="text-[16px] text-muted">{listing.priceLabel}</span>
        </div>

        {/* Date & Guest Picker */}
        <div className="flex flex-col border border-gray-400 rounded-[12px] mb-4">
          {/* Dates */}
          <div className="flex border-b border-gray-400">
            <div className="flex-1 flex flex-col p-3 border-r border-gray-400 rounded-tl-[12px]">
              <span className="text-[10px] font-bold text-ink tracking-wider uppercase">Check-in</span>
              <input
                type="date"
                value={checkin}
                min={fmt(new Date())}
                onChange={(e) => setCheckin(e.target.value)}
                className="text-[14px] text-ink bg-transparent outline-none cursor-pointer w-full"
              />
            </div>
            <div className="flex-1 flex flex-col p-3 rounded-tr-[12px]">
              <span className="text-[10px] font-bold text-ink tracking-wider uppercase">Checkout</span>
              <input
                type="date"
                value={checkout}
                min={checkin}
                onChange={(e) => setCheckout(e.target.value)}
                className="text-[14px] text-ink bg-transparent outline-none cursor-pointer w-full"
              />
            </div>
          </div>

          {/* Guests */}
          <div className="relative" ref={guestRef}>
            <div
              className="flex items-center justify-between p-3 cursor-pointer hover:bg-gray-50 rounded-b-[12px] transition"
              onClick={() => setShowGuests(!showGuests)}
            >
              <div className="flex flex-col">
                <span className="text-[10px] font-bold text-ink tracking-wider uppercase">Guests</span>
                <span className="text-[14px] text-ink">{guests} guest{guests > 1 ? "s" : ""}</span>
              </div>
              <ChevronDown className={`w-5 h-5 text-ink transition-transform ${showGuests ? "rotate-180" : ""}`} />
            </div>

            {showGuests && (
              <div className="absolute left-0 right-0 top-full mt-1 bg-white border border-gray-200 rounded-2xl shadow-xl z-20 p-4">
                <div className="flex items-center justify-between py-3">
                  <div>
                    <div className="font-semibold text-ink text-[15px]">Adults</div>
                    <div className="text-[13px] text-muted">Ages 13+</div>
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setGuests(g => Math.max(1, g - 1))}
                      disabled={guests <= 1}
                      className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:border-gray-600 transition disabled:opacity-30"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="w-4 text-center font-semibold text-ink">{guests}</span>
                    <button
                      onClick={() => setGuests(g => Math.min(maxGuests, g + 1))}
                      disabled={guests >= maxGuests}
                      className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:border-gray-600 transition disabled:opacity-30"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                </div>
                <button
                  onClick={() => setShowGuests(false)}
                  className="w-full text-right text-[14px] font-semibold underline text-ink mt-2"
                >
                  Close
                </button>
              </div>
            )}
          </div>
        </div>

        <button
          onClick={() => router.push(`/rooms/${listing.id}/book?checkin=${checkin}&checkout=${checkout}&guests=${guests}`)}
          className="w-full h-[48px] rounded-[8px] bg-gradient-to-r from-[#E61E4D] via-[#E31C5F] to-[#D70466] text-white font-bold text-[16px] hover:brightness-95 transition mb-4"
        >
          Reserve
        </button>
        <p className="text-center text-[14px] text-muted">You won't be charged yet</p>

        {/* Price breakdown preview */}
        {subtotal > 0 && (
          <div className="mt-4 pt-4 border-t border-hairline flex flex-col gap-2 text-[14px] text-ink">
            <div className="flex justify-between">
              <span className="underline">{listing.price} × {nights} night{nights > 1 ? "s" : ""}</span>
              <span>₹{Math.round(subtotal).toLocaleString("en-IN")}</span>
            </div>
          </div>
        )}
      </div>

      <button className="flex items-center justify-center gap-2 text-[14px] text-muted underline hover:text-ink transition mx-auto">
        <Flag className="w-4 h-4" />
        Report this listing
      </button>
    </div>
  );
}
