"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";
import Image from "next/image";

export default function PromoModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const hasSeenPromo = localStorage.getItem("hasSeenPromoModal");
    if (!hasSeenPromo) {
      setIsOpen(true);
    }
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    localStorage.setItem("hasSeenPromoModal", "true");
  };

  if (!isMounted || !isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
      <div className="relative w-full max-w-[450px] rounded-2xl bg-white p-6 shadow-2xl animate-in zoom-in-95 duration-200">
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute right-3 top-3 z-10 rounded-full bg-white p-2 text-gray-800 shadow-md transition-colors hover:bg-gray-100"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="flex flex-col items-center text-center pt-2">
          {/* Placeholder Image for Promo */}
          <div className="relative mb-6 h-48 w-full overflow-hidden rounded-xl bg-gray-100">
            <Image
              src="https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=600&auto=format&fit=crop"
              alt="Promo illustration"
              fill
              className="object-cover"
            />
          </div>

          <h2 className="mb-2 text-2xl font-bold">Take 10% off your next stay</h2>
          <p className="mb-6 text-[var(--color-gray-dark)]">
            For new guests in selected countries only.{" "}
            <a href="#" className="underline font-semibold text-[var(--color-black-soft)]">
              Terms apply
            </a>
          </p>

          <button
            onClick={handleClose}
            className="w-full rounded-lg bg-gradient-to-r from-[var(--color-brand-gradient-start)] to-[var(--color-brand-gradient-end)] py-3 font-semibold text-white transition-opacity hover:opacity-90"
          >
            Log in to claim offer
          </button>
        </div>
      </div>
    </div>
  );
}
