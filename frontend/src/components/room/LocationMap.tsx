import { DetailedListing } from "@/lib/mock-data";

export default function LocationMap({ listing }: { listing: DetailedListing }) {
  return (
    <div className="flex flex-col w-full pb-8">
      <h2 className="text-[22px] font-bold text-ink mb-6">Where you'll be</h2>
      <p className="text-[16px] text-ink mb-6">{listing.location}</p>
      
      {/* Map Container */}
      <div className="w-full h-[400px] md:h-[480px] bg-gray-200 rounded-2xl relative overflow-hidden mb-6 border border-hairline">
        {/* Placeholder image simulating Google Maps for Sector 19 Chandigarh */}
        <img src="https://images.unsplash.com/photo-1524661135-423995f22d0b?w=1200&auto=format&fit=crop" alt="Map" className="w-full h-full object-cover opacity-70" />
        
        {/* Exact location pin */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center z-10">
           <div className="w-14 h-14 bg-[#E61E4D]/30 rounded-full flex items-center justify-center">
             <div className="w-8 h-8 bg-[#E61E4D] rounded-full border-2 border-white shadow-md flex items-center justify-center">
                <div className="w-2.5 h-2.5 bg-white rounded-full" />
             </div>
           </div>
        </div>

        {/* POI Labels - Chandigarh specific */}
        <div className="absolute top-[20%] left-[30%] bg-white/90 px-3 py-1.5 rounded-full shadow-sm text-[12px] font-bold text-ink border border-gray-200">
          Sector 17 Plaza
        </div>
        <div className="absolute top-[40%] right-[25%] bg-white/90 px-3 py-1.5 rounded-full shadow-sm text-[12px] font-bold text-ink border border-gray-200">
          Sukhna Lake
        </div>
        <div className="absolute bottom-[30%] left-[40%] bg-white/90 px-3 py-1.5 rounded-full shadow-sm text-[12px] font-bold text-ink border border-gray-200">
          Elante Mall
        </div>
      </div>
      
      <div className="flex flex-col gap-4 text-[16px] leading-[1.5] text-ink max-w-[800px]">
        <p>Sector 19 is one of the most central and well-connected neighbourhoods in Chandigarh. It's incredibly safe, leafy, and peaceful, yet just minutes away from the city's main attractions.</p>
        <button className="flex items-center font-semibold underline mt-2 text-left w-max">Show more</button>
      </div>
    </div>
  );
}
