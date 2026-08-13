import { Star } from "lucide-react";

export default function RatingDisplayCard({ rating, reviewsCount }: { rating: number; reviewsCount: number }) {
  return (
    <div className="flex flex-col items-center justify-center py-6 w-full max-w-sm mx-auto">
      {/* 
        This layout emulates the laurel wreath design with a large rating number in the center. 
        Using simple SVGs or icons as placeholders for laurels.
      */}
      <div className="flex items-center gap-6">
        <div className="text-muted w-12 h-24 flex items-center justify-center opacity-40 scale-x-[-1]">
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z" />
          </svg>
        </div>
        
        <div className="flex flex-col items-center">
          <span className="text-[64px] font-bold text-ink leading-none">{rating.toFixed(2)}</span>
        </div>

        <div className="text-muted w-12 h-24 flex items-center justify-center opacity-40">
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z" />
          </svg>
        </div>
      </div>
      
      <div className="mt-4 flex items-center gap-2">
        <span className="font-semibold text-ink text-[16px]">Guest favourite</span>
      </div>
      <div className="text-[14px] text-muted font-normal mt-1 text-center max-w-[200px]">
        One of the most loved homes on Airbnb based on ratings, reviews and reliability
      </div>
    </div>
  );
}
