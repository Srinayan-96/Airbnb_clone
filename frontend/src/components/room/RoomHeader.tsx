import { Share, Heart } from "lucide-react";
import { DetailedListing } from "@/lib/mock-data";

export default function RoomHeader({ listing }: { listing: DetailedListing }) {
  return (
    <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 pt-6 pb-6">
      <h1 className="text-[26px] font-bold text-ink leading-tight flex-1">{listing.title}</h1>
      <div className="flex items-center gap-4">
        <button className="flex items-center gap-2 hover:bg-surface-soft px-3 py-2 rounded-xl transition">
          <Share className="w-[18px] h-[18px]" />
          <span className="text-[14px] font-medium underline">Share</span>
        </button>
        <button className="flex items-center gap-2 hover:bg-surface-soft px-3 py-2 rounded-xl transition">
          <Heart className="w-[18px] h-[18px]" />
          <span className="text-[14px] font-medium underline">Save</span>
        </button>
      </div>
    </div>
  );
}
