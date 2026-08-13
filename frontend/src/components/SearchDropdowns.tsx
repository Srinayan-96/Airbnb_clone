"use client";

import { useState } from "react";
import { Send, MapPin, TreePine, Umbrella, Mountain, ChevronLeft, ChevronRight, Minus, Plus, Search, Scissors, Heart, Utensils, Zap, Camera, Key } from "lucide-react";
import { suggestedDestinations, serviceCategories } from "@/lib/mock-data";

// --- WHERE DROPDOWN ---
export function WhereDropdown({ variant = "default", onSelect }: { variant?: "default" | "experiences", onSelect?: (val: string) => void }) {
  const getIcon = (type: string) => {
    switch (type) {
      case "nearby": return <Send className="h-5 w-5 text-blue-500" strokeWidth={1.5} />;
      case "tree": return <TreePine className="h-5 w-5 text-green-600" strokeWidth={1.5} />;
      case "beach": return <Umbrella className="h-5 w-5 text-orange-500" strokeWidth={1.5} />;
      case "mountain": return <Mountain className="h-5 w-5 text-blue-600" strokeWidth={1.5} />;
      default: return <MapPin className="h-5 w-5 text-red-400" strokeWidth={1.5} />;
    }
  };

  const getBgColor = (type: string) => {
    switch (type) {
      case "nearby": return "bg-surface-strong";
      case "tree": return "bg-green-50";
      case "beach": return "bg-orange-50";
      case "mountain": return "bg-blue-50";
      default: return "bg-surface-strong";
    }
  };

  const expDestinations = [
    { id: "1", name: "North Goa", subtitle: "Goa", iconType: "nearby" },
    { id: "2", name: "Gurugram", subtitle: "Haryana", iconType: "mountain" },
    { id: "3", name: "Gurgaon District", subtitle: "Haryana", iconType: "tree" },
  ];

  const destinations = variant === "experiences" ? expDestinations : suggestedDestinations;

  return (
    <div className="w-[420px] p-8">
      <h4 className="mb-4 text-[13px] font-bold text-ink">
        {variant === "experiences" ? "Recent searches" : "Suggested destinations"}
      </h4>
      <div className="max-h-[400px] overflow-y-auto pr-2 custom-scrollbar -ml-2">
        <ul className="flex flex-col gap-1">
          {destinations.map((dest) => (
            <li
              key={dest.id}
              onClick={() => onSelect?.(dest.name)}
              className="flex cursor-pointer items-center gap-4 rounded-[14px] p-3 transition-colors hover:bg-surface-strong"
            >
              <div className={`flex h-12 w-12 items-center justify-center rounded-[14px] shrink-0 ${getBgColor(dest.iconType)}`}>
                {getIcon(dest.iconType)}
              </div>
              <div className="flex flex-col truncate">
                <span className="font-semibold text-[16px] truncate text-ink">{dest.name}</span>
                <span className="text-[14px] text-muted truncate mt-0.5">{dest.subtitle}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

// --- WHEN DROPDOWN ---
export function WhenDropdown({ variant = "default", onSelect }: { variant?: "default" | "quick", onSelect?: (val: string) => void }) {
  const [mode, setMode] = useState<"Dates" | "Flexible">("Dates");
  const [flexDuration, setFlexDuration] = useState("Weekend");
  const [startDate, setStartDate] = useState<{ month: number, day: number } | null>({ month: 8, day: 15 });
  const [endDate, setEndDate] = useState<{ month: number, day: number } | null>(null);

  const handleDayClick = (month: number, day: number) => {
    if (!startDate || (startDate && endDate)) {
      setStartDate({ month, day });
      setEndDate(null);
    } else {
      if (month < startDate.month || (month === startDate.month && day < startDate.day)) {
        setStartDate({ month, day });
        setEndDate(null);
      } else {
        setEndDate({ month, day });
        const mNames = ["", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        onSelect?.(`${startDate.day} ${mNames[startDate.month]} – ${day} ${mNames[month]}`);
      }
    }
  };

  const isSelected = (m: number, d: number) => {
    return (startDate?.month === m && startDate?.day === d) || (endDate?.month === m && endDate?.day === d);
  };
  const isInRange = (m: number, d: number) => {
    if (!startDate || !endDate) return false;
    const v = m * 100 + d, s = startDate.month * 100 + startDate.day, e = endDate.month * 100 + endDate.day;
    return v > s && v < e;
  };

  if (variant === "quick") {
    return (
      <div className="flex w-[700px] p-8">
        <div className="flex-1 border-r border-hairline pr-8">
           <h3 className="mb-4 text-[16px] font-bold text-ink">Quick dates</h3>
           <div className="flex flex-col gap-3">
             <button className="flex w-full items-center justify-between rounded-xl border border-hairline p-4 hover:border-ink">
                <span className="font-semibold text-ink text-[15px]">Today</span>
                <span className="text-muted text-[13px]">13 Aug</span>
             </button>
             <button className="flex w-full items-center justify-between rounded-xl border border-hairline p-4 hover:border-ink">
                <span className="font-semibold text-ink text-[15px]">Tomorrow</span>
                <span className="text-muted text-[13px]">14 Aug</span>
             </button>
             <button className="flex w-full items-center justify-between rounded-xl border border-hairline p-4 hover:border-ink">
                <span className="font-semibold text-ink text-[15px]">This weekend</span>
                <span className="text-muted text-[13px]">15-17 Aug</span>
             </button>
           </div>
        </div>
        <div className="flex-1 pl-8">
           <div className="mb-4 flex items-center justify-between px-2">
              <button className="rounded-full p-2 hover:bg-surface-strong">
                <ChevronLeft className="h-5 w-5 text-ink" />
              </button>
              <span className="font-semibold text-[16px] text-ink">August 2026</span>
              <button className="rounded-full p-2 hover:bg-surface-strong">
                <ChevronRight className="h-5 w-5 text-ink" />
              </button>
           </div>
           <div className="grid grid-cols-7 text-center text-[12px] font-semibold text-muted">
              <div>S</div><div>M</div><div>T</div><div>W</div><div>T</div><div>F</div><div>S</div>
           </div>
           <div className="mt-2 grid grid-cols-7 gap-y-2 text-center">
              <div /> <div /> <div /> <div /> <div /> <div />
              {[...Array(31)].map((_, i) => (
                <div key={i} className="flex h-10 w-full items-center justify-center">
                  <button className={`flex h-10 w-10 items-center justify-center text-[14px] rounded-full hover:border hover:border-ink ${i === 12 ? "bg-ink text-on-dark font-bold" : "text-ink"}`}>
                    {i + 1}
                  </button>
                </div>
              ))}
           </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-[800px] p-8 flex flex-col items-center">
      {/* Top Toggle */}
      <div className="mb-8 flex rounded-full bg-surface-strong p-1">
        <button
          onClick={() => setMode("Dates")}
          className={`rounded-full px-6 py-2 text-[14px] font-semibold transition-colors ${
            mode === "Dates" ? "bg-white shadow-[var(--shadow-elevation)] text-ink" : "hover:bg-gray-200 text-ink"
          }`}
        >
          Dates
        </button>
        <button
          onClick={() => setMode("Flexible")}
          className={`rounded-full px-6 py-2 text-[14px] font-semibold transition-colors ${
            mode === "Flexible" ? "bg-white shadow-[var(--shadow-elevation)] text-ink" : "hover:bg-gray-200 text-ink"
          }`}
        >
          Flexible
        </button>
      </div>

      {mode === "Dates" ? (
        <div className="w-full">
          <div className="flex w-full justify-between gap-8">
            {/* Calendar 1 */}
            <div className="flex-1">
              <div className="mb-4 flex items-center justify-between px-2">
                <button className="rounded-full p-2 hover:bg-surface-strong">
                  <ChevronLeft className="h-5 w-5 text-ink" />
                </button>
                <span className="font-semibold text-[16px] text-ink">August 2026</span>
                <div className="w-9" />
              </div>
              <div className="grid grid-cols-7 text-center text-[12px] font-semibold text-muted">
                <div>S</div><div>M</div><div>T</div><div>W</div><div>T</div><div>F</div><div>S</div>
              </div>
              <div className="mt-2 grid grid-cols-7 gap-y-2 text-center">
                <div /> <div /> <div /> <div /> <div /> <div />
                {[...Array(31)].map((_, i) => {
                  const day = i + 1;
                  const selected = isSelected(8, day);
                  const inRange = isInRange(8, day);
                  return (
                    <div key={i} className={`flex h-10 w-full items-center justify-center ${inRange ? "bg-surface-soft" : ""}`}>
                      <button
                        onClick={() => handleDayClick(8, day)}
                        className={`flex h-10 w-10 items-center justify-center text-[14px] ${
                          selected 
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
            </div>

            {/* Calendar 2 */}
            <div className="flex-1">
              <div className="mb-4 flex items-center justify-between px-2">
                <div className="w-9" />
                <span className="font-semibold text-[16px] text-ink">September 2026</span>
                <button className="rounded-full p-2 hover:bg-surface-strong">
                  <ChevronRight className="h-5 w-5 text-ink" />
                </button>
              </div>
              <div className="grid grid-cols-7 text-center text-[12px] font-semibold text-muted">
                <div>S</div><div>M</div><div>T</div><div>W</div><div>T</div><div>F</div><div>S</div>
              </div>
              <div className="mt-2 grid grid-cols-7 gap-y-2 text-center">
                <div /> <div />
                {[...Array(30)].map((_, i) => {
                  const day = i + 1;
                  const selected = isSelected(9, day);
                  const inRange = isInRange(9, day);
                  return (
                    <div key={i} className={`flex h-10 w-full items-center justify-center ${inRange ? "bg-surface-soft" : ""}`}>
                      <button
                        onClick={() => handleDayClick(9, day)}
                        className={`flex h-10 w-10 items-center justify-center text-[14px] ${
                          selected 
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
            </div>
          </div>

          <div className="mt-8 flex gap-2">
            {["Exact dates", "± 1 day", "± 2 days", "± 3 days", "± 7 days", "± 14 days"].map(
              (label, i) => (
                <button
                  key={label}
                  onClick={() => onSelect?.(label)}
                  className={`rounded-full px-4 py-2 text-[14px] border ${
                    i === 0 ? "border-ink font-semibold bg-surface-soft text-ink" : "border-hairline text-ink hover:border-ink"
                  }`}
                >
                  {label}
                </button>
              )
            )}
          </div>
        </div>
      ) : (
        <div className="flex w-full flex-col items-center pt-4">
          <h3 className="mb-6 text-[18px] font-bold text-ink">How long would you like to stay?</h3>
          <div className="mb-10 flex gap-4">
            {["Weekend", "Week", "Month"].map((len) => (
              <button
                key={len}
                onClick={() => setFlexDuration(len)}
                className={`rounded-full px-6 py-2 text-[14px] border ${
                  flexDuration === len ? "border-ink font-semibold bg-surface-soft text-ink" : "border-hairline text-ink hover:border-ink"
                }`}
              >
                {len}
              </button>
            ))}
          </div>

          <h3 className="mb-6 text-[18px] font-bold text-ink">When do you want to go?</h3>
          <div className="flex w-full items-center gap-4 px-4 relative">
             <div className="flex w-full gap-4 overflow-hidden">
                {["August", "September", "October", "November", "December", "January"].map((month) => (
                  <div key={month} onClick={() => onSelect?.(`${month} ${month === "January" ? "2027" : "2026"}`)} className="flex h-32 w-32 flex-col items-center justify-center gap-2 rounded-[14px] border border-hairline hover:border-ink cursor-pointer bg-white">
                    <CalendarIcon />
                    <div className="text-[14px] font-semibold text-ink">{month}</div>
                    <div className="text-[12px] text-muted">
                      {month === "January" ? "2027" : "2026"}
                    </div>
                  </div>
                ))}
             </div>
             <button className="absolute -right-4 flex h-8 w-8 items-center justify-center rounded-full border border-hairline bg-white shadow-[var(--shadow-elevation)] hover:scale-105 transition-transform">
                <ChevronRight className="h-4 w-4 text-ink" />
             </button>
          </div>
        </div>
      )}
    </div>
  );
}

function CalendarIcon() {
  return (
    <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="presentation" focusable="false" style={{ display: 'block', height: '32px', width: '32px', fill: 'currentcolor' }} className="text-muted">
      <path d="M25 4h-2V1a1 1 0 1 0-2 0v3H11V1a1 1 0 1 0-2 0v3H7a3 3 0 0 0-3 3v21a3 3 0 0 0 3 3h18a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3zM7 6h2v3a1 1 0 1 0 2 0V6h10v3a1 1 0 1 0 2 0V6h2a1 1 0 0 1 1 1v5H4V7a1 1 0 0 1 1-1zm18 24H7a1 1 0 0 1-1-1V14h20v15a1 1 0 0 1-1 1z"></path>
    </svg>
  );
}

// --- WHO DROPDOWN ---
export function WhoDropdown({ showPets = true, onChange }: { showPets?: boolean, onChange?: (guests: string) => void }) {
  const [adults, setAdults] = useState(0);
  const [children, setChildren] = useState(0);
  const [infants, setInfants] = useState(0);
  const [pets, setPets] = useState(0);

  const handleUpdate = (type: string, val: number) => {
    let newA = adults, newC = children, newI = infants, newP = pets;
    if (type === 'adults') { newA = val; setAdults(val); }
    if (type === 'children') { newC = val; setChildren(val); }
    if (type === 'infants') { newI = val; setInfants(val); }
    if (type === 'pets') { newP = val; setPets(val); }

    const totalGuests = newA + newC;
    let label = totalGuests > 0 ? `${totalGuests} guest${totalGuests > 1 ? 's' : ''}` : '';
    if (newI > 0) label += `, ${newI} infant${newI > 1 ? 's' : ''}`;
    if (newP > 0) label += `, ${newP} pet${newP > 1 ? 's' : ''}`;

    if (label === '') label = "Add guests";
    onChange?.(label);
  };

  return (
    <div className="w-[400px] p-6">
      <div className="flex flex-col">
        <StepperRow title="Adults" subtitle="Ages 13 or above" count={adults} onChange={(v) => handleUpdate('adults', v)} />
        <div className="my-4 border-b border-hairline" />
        <StepperRow title="Children" subtitle="Ages 2–12" count={children} onChange={(v) => handleUpdate('children', v)} />
        <div className="my-4 border-b border-hairline" />
        <StepperRow title="Infants" subtitle="Under 2" count={infants} onChange={(v) => handleUpdate('infants', v)} />
        {showPets && (
          <>
            <div className="my-4 border-b border-hairline" />
            <StepperRow title="Pets" subtitle="Bringing a service animal?" subtitleUnderline count={pets} onChange={(v) => handleUpdate('pets', v)} />
          </>
        )}
      </div>
    </div>
  );
}

function StepperRow({ title, subtitle, subtitleUnderline = false, count, onChange }: { title: string, subtitle: string, subtitleUnderline?: boolean, count: number, onChange: (val: number) => void }) {
  return (
    <div className="flex items-center justify-between">
      <div>
        <div className="font-semibold text-[16px] text-ink">{title}</div>
        <div className={`text-[14px] text-muted ${subtitleUnderline ? "underline cursor-pointer hover:text-ink" : ""}`}>
          {subtitle}
        </div>
      </div>
      <div className="flex items-center gap-4">
        <button
          onClick={() => onChange(Math.max(0, count - 1))}
          disabled={count === 0}
          className="flex h-8 w-8 items-center justify-center rounded-full border border-border-strong text-muted disabled:border-hairline disabled:text-hairline hover:border-ink hover:text-ink"
        >
          <Minus className="h-4 w-4" />
        </button>
        <span className="w-4 text-center text-[16px] text-ink">{count}</span>
        <button
          onClick={() => onChange(count + 1)}
          className="flex h-8 w-8 items-center justify-center rounded-full border border-border-strong text-muted hover:border-ink hover:text-ink"
        >
          <Plus className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}

// --- SERVICE TYPE DROPDOWN ---
export function ServiceTypeDropdown({ onSelect }: { onSelect?: (type: string) => void }) {
  const serviceCategories = [
    { id: "photography", name: "Photography", icon: "Camera" },
    { id: "chefs", name: "Chefs", icon: "Utensils" },
    { id: "massage", name: "Massage", icon: "Heart" },
    { id: "meals", name: "Prepared meals", icon: "Utensils" },
    { id: "training", name: "Training", icon: "Zap" },
    { id: "makeup", name: "Make-up", icon: "Scissors" },
    { id: "hair", name: "Hair", icon: "Scissors" },
    { id: "spa", name: "Spa treatments", icon: "Heart" },
    { id: "catering", name: "Catering", icon: "Utensils" },
  ];

  const serviceIconsMap: Record<string, any> = {
    Camera, Utensils, Heart, Zap, Scissors
  };

  return (
    <div className="w-[600px] p-8">
      <div className="grid grid-cols-3 gap-3">
        {serviceCategories.map((cat) => {
          const Icon = serviceIconsMap[cat.icon as keyof typeof serviceIconsMap];
          return (
            <button
              key={cat.id}
              onClick={() => onSelect?.(cat.name)}
              className="flex flex-col items-center justify-center gap-2 rounded-xl border border-hairline p-4 transition-colors hover:border-ink hover:bg-surface-soft"
            >
              <Icon className="h-5 w-5 text-ink shrink-0" />
              <span className="font-semibold text-[14px] text-ink">{cat.name}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
