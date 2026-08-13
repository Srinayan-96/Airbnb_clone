"use client";

import { useState, useEffect } from "react";
import { X, Tag } from "lucide-react"; // Approximation of the price tag icon

interface PricesIncludeModalProps {
  onDismissed: () => void;
}

export default function PricesIncludeModal({ onDismissed }: PricesIncludeModalProps) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Only show if the user hasn't seen it before
    const hasSeenModal = localStorage.getItem("hasSeenPriceModal");
    if (!hasSeenModal) {
      setIsOpen(true);
    }
  }, []);

  const handleDismiss = () => {
    localStorage.setItem("hasSeenPriceModal", "true");
    setIsOpen(false);
    onDismissed();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50">
      <div className="absolute inset-0" onClick={handleDismiss} />
      <div className="relative flex w-[480px] max-w-[90vw] flex-col items-center rounded-2xl bg-canvas p-8 shadow-2xl animate-in zoom-in-95 duration-200">
        
        <button 
          onClick={handleDismiss}
          className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full hover:bg-surface-soft transition-colors"
        >
          <X className="h-5 w-5 text-ink" />
        </button>

        <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-brand/10 shadow-[0_4px_12px_rgba(255,56,92,0.3)]">
          {/* Mocking the 3D price tag with a Lucide icon and brand color */}
          <Tag className="h-8 w-8 text-brand fill-brand" />
        </div>

        <h2 className="mb-8 text-center text-[22px] font-bold leading-tight text-ink">
          Now you'll see one price for your trip, all fees included.
        </h2>

        <button 
          onClick={handleDismiss}
          className="w-full rounded-lg bg-ink py-3.5 text-[16px] font-semibold text-on-dark transition-colors hover:bg-black"
        >
          Got it
        </button>
      </div>
    </div>
  );
}
