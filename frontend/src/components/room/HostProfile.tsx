import { DetailedListing } from "@/lib/mock-data";
import { Medal, Star, Shield, Briefcase, Globe, PawPrint, CalendarX2, Key } from "lucide-react";

export default function HostProfile({ listing }: { listing: DetailedListing }) {
  return (
    <div className="flex flex-col w-full pb-8">
      <h2 className="text-[22px] font-bold text-ink mb-6">Meet your host</h2>

      <div className="flex flex-col xl:flex-row gap-8 xl:gap-24 mb-12">
        {/* Left Column (Card + Details) */}
        <div className="flex flex-col w-full md:w-[400px]">
          {/* Host Card */}
          <div className="flex flex-row items-center bg-white px-8 py-6 rounded-[24px] shadow-[0_6px_16px_rgba(0,0,0,0.12)] mb-8">
            {/* Left side (Avatar & Name) */}
            <div className="flex flex-col items-center flex-1 pr-6">
              <div className="relative mb-2">
                <img src={listing.host.avatar} alt={listing.host.name} className="w-[104px] h-[104px] rounded-full object-cover" />
                <div className="absolute bottom-1 -right-2 bg-[#E61E4D] text-white p-1.5 rounded-full border-2 border-white">
                  <Medal className="w-5 h-5" />
                </div>
              </div>
              <h3 className="text-[26px] font-bold text-ink leading-tight">{listing.host.name}</h3>
              <span className="text-[14px] text-muted">Host</span>
            </div>
            
            {/* Right side (Stats) */}
            <div className="flex flex-col flex-1 pl-6">
              <div className="flex flex-col py-3 border-b border-hairline">
                <span className="text-[22px] font-bold text-ink leading-tight">{listing.stats.reviews}</span>
                <span className="text-[10px] font-bold text-ink">Reviews</span>
              </div>
              <div className="flex flex-col py-3 border-b border-hairline">
                <div className="flex items-center gap-1">
                  <span className="text-[22px] font-bold text-ink leading-tight">{listing.stats.rating}</span>
                  <Star className="w-3.5 h-3.5 fill-current text-ink" />
                </div>
                <span className="text-[10px] font-bold text-ink">Rating</span>
              </div>
              <div className="flex flex-col pt-3">
                <span className="text-[22px] font-bold text-ink leading-tight">{listing.host.monthsHosting / 12 || 7}</span>
                <span className="text-[10px] font-bold text-ink">Years hosting</span>
              </div>
            </div>
          </div>

          {/* Host Info List */}
          <div className="flex flex-col gap-5 text-[16px] text-ink">
            <div className="flex items-center gap-4">
              <Briefcase className="w-6 h-6 stroke-[1.5]" />
              <span>My work: Art Classes , Pottery , Yoga</span>
            </div>
            <div className="flex items-center gap-4">
              <Globe className="w-6 h-6 stroke-[1.5]" />
              <span>Lives in Ludhiana, India</span>
            </div>
            <div className="flex items-center gap-4">
              <PawPrint className="w-6 h-6 stroke-[1.5]" />
              <span>Pets: 2 Dogs - Genie and Kajju .</span>
            </div>
          </div>
        </div>

        {/* Right Column (Details) */}
        <div className="flex flex-col flex-1 max-w-[500px]">
          <h4 className="font-bold text-[22px] text-ink mb-6">Host details</h4>
          <p className="text-[16px] text-ink mb-1">Response rate: 95%</p>
          <p className="text-[16px] text-ink mb-8">Responds within an hour</p>

          <button className="bg-[#F7F7F7] text-ink font-semibold text-[16px] px-6 py-3 rounded-lg w-max mb-10 hover:bg-gray-200 transition">
            Message host
          </button>
          
          <div className="flex items-start gap-4 border-t border-hairline pt-6">
            <Shield className="w-8 h-8 flex-shrink-0 text-[#E61E4D] stroke-[1]" />
            <p className="text-[12px] text-muted leading-tight">To help protect your payment, always use Airbnb to send money and communicate with hosts.</p>
          </div>
        </div>
      </div>
      
      <div className="w-full border-t border-hairline mb-8" />
      
      {/* Things to know */}
      <div className="flex flex-col">
        <h2 className="text-[22px] font-bold text-ink mb-6">Things to know</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          <div className="flex flex-col gap-2">
            <CalendarX2 className="w-6 h-6 stroke-[1.5] mb-2 text-ink" />
            <h4 className="font-bold text-[16px] text-ink">Cancellation policy</h4>
            <div className="flex flex-col text-[14px] text-muted leading-relaxed">
              <span className="mb-2">Partial refund: Get back every night that remains 24 hours after you cancel. No refund of the nights you've spent or the service fee.</span>
              <span>Review this host's full policy for details.</span>
            </div>
            <button className="font-semibold underline mt-2 text-[14px] text-left w-max">Learn more</button>
          </div>
          
          <div className="flex flex-col gap-2">
            <Key className="w-6 h-6 stroke-[1.5] mb-2 text-ink" />
            <h4 className="font-bold text-[16px] text-ink">House rules</h4>
            <div className="flex flex-col text-[14px] text-muted leading-relaxed">
              <span>Check-in: 11:00 am – 10:00 pm</span>
              <span>Checkout before 10:00 am</span>
              <span>2 guests maximum</span>
            </div>
            <button className="font-semibold underline mt-2 text-[14px] text-left w-max">Learn more</button>
          </div>

          <div className="flex flex-col gap-2">
            <Shield className="w-6 h-6 stroke-[1.5] mb-2 text-ink" />
            <h4 className="font-bold text-[16px] text-ink">Safety & property</h4>
            <div className="flex flex-col text-[14px] text-muted leading-relaxed">
              <span>Carbon monoxide alarm not reported</span>
              <span>Smoke alarm not reported</span>
            </div>
            <button className="font-semibold underline mt-2 text-[14px] text-left w-max">Learn more</button>
          </div>
          
        </div>
      </div>
    </div>
  );
}
