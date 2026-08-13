import { ChevronLeft, ChevronRight, Keyboard } from "lucide-react";

export default function AvailabilityCalendar() {
  return (
    <div className="w-full pb-8">
      <h2 className="text-[22px] font-bold text-ink mb-1">2 nights in Chandigarh</h2>
      <p className="text-[14px] text-muted mb-6">14 Aug 2026 - 16 Aug 2026</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-4">
        {/* Month 1 */}
        <div className="flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <button className="p-2 hover:bg-surface-soft rounded-full transition">
              <ChevronLeft className="w-5 h-5 text-ink" />
            </button>
            <span className="font-bold text-[16px] text-ink">August 2026</span>
            <div className="w-9 md:hidden" /> {/* Spacer */}
          </div>
          <div className="grid grid-cols-7 text-center mb-2">
            {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(d => (
              <span key={d} className="text-[12px] font-medium text-muted">{d}</span>
            ))}
          </div>
          <div className="grid grid-cols-7 text-center text-[14px] font-medium text-ink gap-y-1">
            {/* Empty slots for August 2026 (starts on Saturday) */}
            {[...Array(6)].map((_, i) => <div key={`e-${i}`} className="w-10 h-10" />)}
            {/* Days 1-13 */}
            {[...Array(13)].map((_, i) => (
               <div key={i+1} className="w-10 h-10 flex items-center justify-center mx-auto rounded-full hover:border border-black cursor-pointer">{i+1}</div>
            ))}
            {/* Selected range 14-16 */}
            <div className="w-10 h-10 flex items-center justify-center mx-auto rounded-full bg-black text-white cursor-pointer relative z-10">14</div>
            <div className="w-10 h-10 flex items-center justify-center mx-auto bg-gray-100 cursor-pointer relative -mx-2">15</div>
            <div className="w-10 h-10 flex items-center justify-center mx-auto rounded-full bg-black text-white cursor-pointer relative z-10">16</div>
            {/* Remaining days 17-31 */}
            {[...Array(15)].map((_, i) => (
               <div key={i+17} className="w-10 h-10 flex items-center justify-center mx-auto rounded-full hover:border border-black cursor-pointer">{i+17}</div>
            ))}
          </div>
        </div>

        {/* Month 2 */}
        <div className="hidden md:flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <div className="w-9" /> {/* Spacer */}
            <span className="font-bold text-[16px] text-ink">September 2026</span>
            <button className="p-2 hover:bg-surface-soft rounded-full transition">
              <ChevronRight className="w-5 h-5 text-ink" />
            </button>
          </div>
          <div className="grid grid-cols-7 text-center mb-2">
            {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(d => (
              <span key={d} className="text-[12px] font-medium text-muted">{d}</span>
            ))}
          </div>
          <div className="grid grid-cols-7 text-center text-[14px] font-medium text-ink gap-y-1">
            {/* Sept starts on Tuesday */}
            {[...Array(2)].map((_, i) => <div key={`e2-${i}`} className="w-10 h-10" />)}
            {[...Array(30)].map((_, i) => (
               <div key={i+1} className="w-10 h-10 flex items-center justify-center mx-auto rounded-full hover:border border-black cursor-pointer">{i+1}</div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between mt-2">
        <button className="p-2 hover:bg-gray-100 rounded-full">
          <Keyboard className="w-5 h-5" />
        </button>
        <button className="font-semibold underline text-[14px]">Clear dates</button>
      </div>
    </div>
  );
}
