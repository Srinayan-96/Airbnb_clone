import Image from "next/image";

interface Review {
  id: string;
  authorName: string;
  authorLocation: string;
  authorAvatar: string;
  rating: number;
  date: string;
  text: string;
}

interface ReviewsCardProps {
  reviews: Review[];
}

export default function ReviewsCard({ reviews }: ReviewsCardProps) {
  // Taking only first 4 reviews for the 2-column grid excerpt
  const displayReviews = reviews.slice(0, 4);

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-24 gap-y-12">
        {displayReviews.map((review) => (
          <div key={review.id} className="flex flex-col gap-4">
            {/* Author Row */}
            <div className="flex items-center gap-4">
              <div className="relative w-12 h-12 rounded-full overflow-hidden bg-gray-200 shrink-0">
                <Image
                  src={review.authorAvatar}
                  alt={review.authorName}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-[16px] font-medium text-ink">{review.authorName}</span>
                <span className="text-[14px] text-muted">{review.authorLocation}</span>
              </div>
            </div>
            
            {/* Rating and Date */}
            <div className="flex items-center gap-2 text-[14px] text-ink">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-[12px]">
                    {i < review.rating ? "★" : "☆"}
                  </span>
                ))}
              </div>
              <span className="text-muted">·</span>
              <span className="text-ink font-medium">{review.date}</span>
            </div>
            
            {/* Review Text */}
            <p className="text-[16px] text-ink line-clamp-3 leading-relaxed">
              {review.text}
            </p>
            
            {/* Show more if truncated */}
            {review.text.length > 120 && (
              <button className="text-[16px] font-semibold text-ink underline text-left w-fit hover:opacity-80">
                Show more
              </button>
            )}
          </div>
        ))}
      </div>
      
      {reviews.length > 4 && (
        <div className="mt-10">
          <button className="px-6 py-3 border border-ink rounded-md text-[16px] font-semibold text-ink hover:bg-gray-50 transition-colors">
            Show all {reviews.length} reviews
          </button>
        </div>
      )}
    </div>
  );
}
