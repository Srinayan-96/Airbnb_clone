import { DetailedListing } from "@/lib/mock-data";
import { Search, ChevronLeft, Droplets, CheckCircle, Key, MessageSquare, Map, Tag } from "lucide-react";

export default function ReviewSection({ listing }: { listing: DetailedListing }) {
  const categories = [
    { label: "Cleanliness", score: listing.ratingBreakdown.cleanliness, icon: <Droplets className="w-8 h-8" strokeWidth={1.2} /> },
    { label: "Accuracy", score: listing.ratingBreakdown.accuracy, icon: <CheckCircle className="w-8 h-8" strokeWidth={1.2} /> },
    { label: "Check-in", score: listing.ratingBreakdown.checkIn, icon: <Key className="w-8 h-8" strokeWidth={1.2} /> },
    { label: "Communication", score: listing.ratingBreakdown.communication, icon: <MessageSquare className="w-8 h-8" strokeWidth={1.2} /> },
    { label: "Location", score: listing.ratingBreakdown.location, icon: <Map className="w-8 h-8" strokeWidth={1.2} /> },
    { label: "Value", score: listing.ratingBreakdown.value, icon: <Tag className="w-8 h-8" strokeWidth={1.2} /> }
  ];

  const pills = [
    { text: 'Cleanliness', count: 35, emoji: '🧼' },
    { text: 'Condition', count: 12, emoji: '🧾' },
    { text: 'Hospitality', count: 43, emoji: '🎁' },
    { text: 'Comfort', count: 15, emoji: '🛋️' },
    { text: 'Accuracy', count: 16, emoji: '✅' },
    { text: 'Amenities', count: 13, emoji: '🧽' },
    { text: 'Check-in', count: 7, emoji: '📱' },
  ];

  return (
    <div className="flex flex-col w-full pb-8">
      {/* Centered Header */}
      <div className="flex flex-col items-center justify-center text-center w-full mb-12 mt-6">
        <div className="flex items-center justify-center gap-6 mb-4">
           {/* Left Wreath */}
           <img 
             src="https://a0.muscache.com/pictures/ac25dbf5-19e4-44b2-a444-a9ce56721598.jpg" 
             alt="Wreath left" 
             className="w-[60px] h-[80px] object-contain mix-blend-multiply"
             onError={(e) => { e.currentTarget.style.display = 'none'; }}
           />
           <h2 className="text-[80px] font-bold tracking-tight text-ink leading-[0.8]">{listing.stats.rating > 0 ? listing.stats.rating.toFixed(2) : 'New'}</h2>
           {/* Right Wreath */}
           <img 
             src="https://a0.muscache.com/pictures/65bb2a6c-0bdf-42fc-8e1c-38ce046fae78.jpg" 
             alt="Wreath right" 
             className="w-[60px] h-[80px] object-contain mix-blend-multiply"
             onError={(e) => { e.currentTarget.style.display = 'none'; }}
           />
        </div>
        
        <h3 className="text-[20px] font-bold text-ink mb-1">Guest favourite</h3>
        <p className="text-[16px] text-muted max-w-[400px] mb-3 leading-[1.3]">
          This home is a guest favourite based on ratings, reviews and reliability
        </p>
        <p className="text-[14px] text-ink font-medium underline cursor-pointer">How reviews work</p>
      </div>

      {/* 7 Columns Layout */}
      <div className="hidden lg:flex items-start w-full overflow-x-auto no-scrollbar mb-10 pb-4 justify-between border-b border-hairline pb-8">
        {/* Overall Rating Col */}
        <div className="flex flex-col pr-8 border-r border-gray-300 min-w-[150px]">
          <span className="text-[14px] text-ink mb-2 font-medium">Overall rating</span>
          <div className="flex flex-col gap-[3px]">
            {[5, 4, 3, 2, 1].map((n, i) => (
              <div key={n} className="flex items-center gap-3 text-[11px] font-medium leading-none h-[14px]">
                <span className="w-1.5">{n}</span>
                <div className="w-[100px] h-[3px] bg-gray-200 rounded-full overflow-hidden">
                  <div className="h-full bg-ink" style={{ width: i === 0 ? '90%' : i === 1 ? '5%' : '0%' }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Categories Cols */}
        {categories.map((c, i) => (
          <div key={i} className={`flex flex-col pl-6 pr-6 min-w-[130px] ${i !== categories.length - 1 ? 'border-r border-gray-300' : ''}`}>
             <span className="text-[14px] text-ink font-medium mb-1">{c.label}</span>
             <span className="text-[16px] font-bold text-ink mb-4">{c.score.toFixed(1)}</span>
             {c.icon}
          </div>
        ))}
      </div>

      {/* Filter Pills */}
      <div className="flex items-center gap-3 overflow-x-auto no-scrollbar mb-8 pb-2">
        <button className="w-8 h-8 border border-gray-300 rounded-full flex items-center justify-center hover:shadow-md transition bg-white flex-shrink-0">
          <ChevronLeft className="w-4 h-4 text-ink" />
        </button>
        {pills.map(pill => (
          <button key={pill.text} className="flex items-center gap-2 px-4 py-[6px] border border-gray-300 rounded-full text-[13px] font-medium text-ink hover:border-black min-w-max transition bg-white shadow-[0_1px_2px_rgba(0,0,0,0.04)]">
            <span className="text-[16px]">{pill.emoji}</span>
            <span>{pill.text} <span className="text-muted ml-0.5 font-normal">{pill.count}</span></span>
          </button>
        ))}
      </div>

      {/* Reviews Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-10 mb-8">
        {listing.reviews.map(review => (
          <div key={review.id} className="flex flex-col">
            <div className="flex items-center gap-4 mb-3">
              <img src={review.avatar} alt={review.author} className="w-12 h-12 rounded-full object-cover" />
              <div className="flex flex-col">
                <span className="font-bold text-[16px]">{review.author}</span>
                <span className="text-[14px] text-muted">{review.tenure}</span>
              </div>
            </div>
            <div className="flex items-center gap-2 mb-3">
              <div className="flex items-center gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className={`text-[10px] ${i < review.rating ? 'text-black' : 'text-gray-300'}`}>★</span>
                ))}
              </div>
              <span className="text-[14px] text-muted font-medium">· {review.date}</span>
            </div>
            <p className="text-[16px] text-ink leading-[1.5]">{review.content}</p>
            {review.content.endsWith('…') && (
               <button className="text-[16px] font-semibold underline mt-2 text-left w-max">Show more</button>
            )}
          </div>
        ))}
      </div>

      <button className="border border-ink rounded-lg px-6 py-3 font-semibold text-[16px] w-max hover:bg-surface-soft transition">
        Show all {listing.stats.reviews} reviews
      </button>
    </div>
  );
}
