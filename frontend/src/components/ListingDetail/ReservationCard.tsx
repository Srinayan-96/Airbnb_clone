"use client";

import { useState, useRef, useEffect } from "react";
import TextInput from "@/components/ui/TextInput";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface ReservationCardProps {
  pricePerNight: number;
  rating: number;
  reviewsCount: number;
}

export default function ReservationCard({ pricePerNight, rating, reviewsCount }: ReservationCardProps) {
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const [selectedDay, setSelectedDay] = useState<number | null>(15);
  const datePickerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (datePickerRef.current && !datePickerRef.current.contains(event.target as Node)) {
        setIsDatePickerOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="w-full bg-white rounded-md border border-hairline shadow-[var(--shadow-elevation)] p-6 sticky top-28">
      <div className="flex flex-col gap-6 relative">
        {/* Header: Price & Rating */}
        <div className="flex items-baseline justify-between">
          <div className="flex items-baseline gap-1">
            <span className="text-[22px] font-medium text-ink">₹{pricePerNight.toLocaleString()}</span>
            <span className="text-[16px] text-ink">night</span>
          </div>
          {reviewsCount > 0 && (
            <div className="flex items-center gap-1 text-[14px] text-ink font-medium">
              <span>★</span>
              <span>{rating.toFixed(2)}</span>
              <span className="text-muted font-normal">·</span>
              <span className="text-muted font-normal underline hover:text-ink cursor-pointer">
                {reviewsCount} reviews
              </span>
            </div>
          )}
        </div>

        {/* Form Inputs */}
        <div className="flex flex-col rounded-md border border-hairline relative" ref={datePickerRef}>
          <div className="flex w-full border-b border-hairline">
            <div className="w-1/2 border-r border-hairline" onClick={() => setIsDatePickerOpen(true)}>
              <TextInput
                label="CHECK-IN"
                placeholder="Add date"
                defaultValue={selectedDay ? `Aug ${selectedDay}, 2026` : ""}
                className="border-none h-[56px] focus-within:relative focus-within:z-10 focus-within:border-[2px] focus-within:border-ink rounded-none cursor-pointer"
                readOnly
              />
            </div>
            <div className="w-1/2" onClick={() => setIsDatePickerOpen(true)}>
              <TextInput
                label="CHECKOUT"
                placeholder="Add date"
                defaultValue={selectedDay ? `Aug ${selectedDay + 5}, 2026` : ""}
                className="border-none h-[56px] focus-within:relative focus-within:z-10 focus-within:border-[2px] focus-within:border-ink rounded-none cursor-pointer"
                readOnly
              />
            </div>
          </div>
          <div className="w-full">
            <TextInput
              label="GUESTS"
              defaultValue="1 guest"
              className="border-none h-[56px] focus-within:relative focus-within:z-10 focus-within:border-[2px] focus-within:border-ink rounded-none"
            />
          </div>

          {/* Date Picker Overlay */}
          {isDatePickerOpen && (
            <div className="absolute top-[115px] right-0 z-50 bg-white shadow-[var(--shadow-elevation)] rounded-md border border-hairline w-[320px] p-6">
              <div className="flex items-center justify-between mb-4">
                <button className="rounded-full p-2 hover:bg-surface-strong">
                  <ChevronLeft className="h-5 w-5 text-ink" />
                </button>
                <span className="font-semibold text-[16px] text-ink">August 2026</span>
                <button className="rounded-full p-2 hover:bg-surface-strong">
                  <ChevronRight className="h-5 w-5 text-ink" />
                </button>
              </div>
              <div className="grid grid-cols-7 text-center text-[12px] font-semibold text-muted mb-2">
                <div>S</div><div>M</div><div>T</div><div>W</div><div>T</div><div>F</div><div>S</div>
              </div>
              <div className="grid grid-cols-7 gap-y-1 text-center">
                <div /> <div /> <div /> <div /> <div /> <div />
                {[...Array(31)].map((_, i) => {
                  const day = i + 1;
                  const isSelected = selectedDay === day || selectedDay === day - 5;
                  const isBetween = selectedDay && day > selectedDay && day < selectedDay + 5;
                  
                  let cellClasses = "flex h-10 w-full items-center justify-center relative";
                  if (isBetween) {
                    cellClasses += " bg-surface-soft";
                  }
                  
                  return (
                    <div key={i} className={cellClasses}>
                      <button
                        onClick={() => setSelectedDay(day)}
                        className={`flex h-10 w-10 items-center justify-center text-[14px] z-10 ${
                          isSelected 
                            ? "bg-ink text-on-dark rounded-full font-semibold" 
                            : "bg-transparent text-ink hover:border hover:border-ink rounded-full"
                        }`}
                      >
                        {day}
                      </button>
                    </div>
                  );
                })}
              </div>
              
              <div className="flex justify-end mt-4">
                <button 
                  onClick={() => setIsDatePickerOpen(false)}
                  className="text-[14px] font-semibold text-ink underline"
                >
                  Close
                </button>
              </div>
            </div>
          )}
        </div>

        {/* CTA */}
        <button className="w-full py-3.5 bg-primary text-white text-[16px] font-bold rounded-md hover:brightness-95 transition-all">
          Reserve
        </button>

        <div className="text-center text-[14px] text-ink font-normal mt-2">
          You won't be charged yet
        </div>

        {/* Fee Breakdown */}
        <div className="flex flex-col gap-4 mt-2">
          <div className="flex justify-between text-[16px] text-ink">
            <span className="underline cursor-pointer">₹{pricePerNight.toLocaleString()} x 5 nights</span>
            <span>₹{(pricePerNight * 5).toLocaleString()}</span>
          </div>
          <div className="flex justify-between text-[16px] text-ink">
            <span className="underline cursor-pointer">Cleaning fee</span>
            <span>₹2,500</span>
          </div>
          <div className="flex justify-between text-[16px] text-ink">
            <span className="underline cursor-pointer">Airbnb service fee</span>
            <span>₹5,234</span>
          </div>
        </div>

        <div className="w-full h-[1px] bg-hairline my-2"></div>

        <div className="flex justify-between text-[16px] font-bold text-ink">
          <span>Total before taxes</span>
          <span>₹{(pricePerNight * 5 + 2500 + 5234).toLocaleString()}</span>
        </div>
      </div>
    </div>
  );
}
