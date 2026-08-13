import { DetailedListing } from "@/lib/mock-data";
import { Star, Medal, MapPin, CircleParking, ChevronRight, Lock, Wifi, Laptop, Car, ArrowUpDown, Disc, Snowflake, Grid, ShieldBan } from "lucide-react";

export default function RoomInfo({ listing }: { listing: DetailedListing }) {
  return (
    <div className="flex flex-col w-full pb-8">
      {/* Quick facts */}
      <div className="flex flex-col gap-1 mb-8">
        <h2 className="text-[22px] font-bold text-ink">{listing.subtitle}</h2>
        <p className="text-[16px] text-ink">{listing.details}</p>
      </div>

      {/* Guest favourite card */}
      {listing.isGuestFavorite && (
        <div className="flex flex-row items-center justify-between border border-hairline rounded-[16px] p-4 md:p-6 mb-8 shadow-sm">
          <div className="flex flex-col flex-1 border-r border-hairline pr-2 md:pr-4">
            <div className="flex items-center gap-2 mb-1">
              <span className="font-bold text-[16px] md:text-[18px]">Guest favourite</span>
            </div>
            <p className="text-[12px] md:text-[14px] text-muted leading-tight">One of the most loved homes on Airbnb, according to guests</p>
          </div>
          <div className="flex flex-col items-center justify-center flex-1 border-r border-hairline px-2 md:px-4">
            <span className="font-bold text-[20px] md:text-[24px]">{listing.stats.rating}</span>
            <div className="flex items-center gap-0.5 text-black">
              {[...Array(5)].map((_, i) => <Star key={i} className="w-2.5 h-2.5 md:w-3 md:h-3 fill-current" />)}
            </div>
          </div>
          <div className="flex flex-col items-center justify-center flex-1 pl-2 md:pl-4">
            <span className="font-bold text-[20px] md:text-[24px]">{listing.stats.reviews}</span>
            <span className="text-[12px] md:text-[14px] text-ink underline font-medium">Reviews</span>
          </div>
        </div>
      )}

      {/* Host Row */}
      <div className="flex items-center gap-4 mb-8">
        <div className="relative">
          <img src={listing.host.avatar} alt={listing.host.name} className="w-14 h-14 rounded-full object-cover" />
          {listing.host.isSuperhost && (
            <div className="absolute -bottom-1 -right-1 bg-[#E61E4D] text-white p-1 rounded-full border-2 border-white">
              <Medal className="w-3 h-3" />
            </div>
          )}
        </div>
        <div className="flex flex-col">
          <span className="font-bold text-[16px]">Hosted by {listing.host.name}</span>
          <span className="text-[14px] text-muted">Superhost · {listing.host.monthsHosting} months hosting</span>
        </div>
      </div>

      <div className="w-full border-t border-hairline my-8" />

      {/* Feature highlight list */}
      <div className="flex flex-col gap-6 mb-8">
        <div className="flex gap-4">
          <MapPin className="w-6 h-6 mt-1 flex-shrink-0" />
          <div className="flex flex-col">
            <span className="font-bold text-[16px]">Beautiful area</span>
            <span className="text-[14px] text-muted">Guests love this home's scenic location.</span>
          </div>
        </div>
        <div className="flex gap-4">
          <CircleParking className="w-6 h-6 mt-1 flex-shrink-0" />
          <div className="flex flex-col">
            <span className="font-bold text-[16px]">Park for free</span>
            <span className="text-[14px] text-muted">This is one of the few places in the area with free parking.</span>
          </div>
        </div>
        <div className="flex gap-4">
          <Medal className="w-6 h-6 mt-1 flex-shrink-0" />
          <div className="flex flex-col">
            <span className="font-bold text-[16px]">{listing.host.name} is a Superhost</span>
            <span className="text-[14px] text-muted">Superhosts are experienced, highly rated hosts.</span>
          </div>
        </div>
      </div>

      <div className="w-full border-t border-hairline my-8" />

      {/* Description */}
      <div className="flex flex-col mb-8 text-[16px] leading-[1.5] text-ink">
        <p className="mb-4">Designer-curated luxury 2BHK in Sector 19, one of Chandigarh's most sought-after neighbourhoods. Located on the second floor with lift access and a rare private porch entry, this home offers both privacy and convenience.</p>
        <p className="mb-4">Features a spacious living area with plush seating, curated décor, indoor plants, and a massage chair. Two well-appointed bedrooms with premium bedding and work desks make it ideal for families, workcations, and longer stays. <span className="text-muted">...</span></p>
        <button className="flex items-center gap-1 font-semibold underline mt-2 w-max">
          Show more <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      <div className="w-full border-t border-hairline my-8" />

      {/* Amenities */}
      <div className="flex flex-col mb-8">
        <h2 className="text-[22px] font-bold text-ink mb-6">What this place offers</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8 mb-8 text-[16px] text-ink">
          <div className="flex items-center gap-4">
            <Lock className="w-6 h-6" strokeWidth={1.5} />
            <span>Lock on bedroom door</span>
          </div>
          <div className="flex items-center gap-4">
            <Wifi className="w-6 h-6" strokeWidth={1.5} />
            <span>Wifi</span>
          </div>
          <div className="flex items-center gap-4">
            <Laptop className="w-6 h-6" strokeWidth={1.5} />
            <span>Dedicated workspace</span>
          </div>
          <div className="flex items-center gap-4">
            <Car className="w-6 h-6" strokeWidth={1.5} />
            <span>Free parking on premises</span>
          </div>
          <div className="flex items-center gap-4">
            <ArrowUpDown className="w-6 h-6" strokeWidth={1.5} />
            <span>Lift</span>
          </div>
          <div className="flex items-center gap-4">
            <Disc className="w-6 h-6" strokeWidth={1.5} />
            <span>Washing machine</span>
          </div>
          <div className="flex items-center gap-4">
            <Snowflake className="w-6 h-6" strokeWidth={1.5} />
            <span>Air conditioning</span>
          </div>
          <div className="flex items-center gap-4">
            <Grid className="w-6 h-6" strokeWidth={1.5} />
            <span>Patio or balcony</span>
          </div>
          <div className="flex items-center gap-4 text-muted">
            <ShieldBan className="w-6 h-6" strokeWidth={1.5} />
            <span className="line-through">Carbon monoxide alarm</span>
          </div>
          <div className="flex items-center gap-4 text-muted">
            <ShieldBan className="w-6 h-6" strokeWidth={1.5} />
            <span className="line-through">Smoke alarm</span>
          </div>
        </div>
        <button className="bg-[#F7F7F7] rounded-lg px-6 py-3 font-semibold text-[16px] text-ink w-max hover:bg-gray-200 transition">
          Show all 25 amenities
        </button>
      </div>
    </div>
  );
}
