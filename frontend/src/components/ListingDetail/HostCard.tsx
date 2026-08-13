import Image from "next/image";

interface HostCardProps {
  name: string;
  avatar: string;
  joinedDate: string;
  isSuperhost: boolean;
  reviewsCount: number;
  rating: number;
  responseRate: string;
  responseTime: string;
  bio?: string;
}

export default function HostCard({
  name,
  avatar,
  joinedDate,
  isSuperhost,
  reviewsCount,
  rating,
  responseRate,
  responseTime,
  bio,
}: HostCardProps) {
  return (
    <div className="w-full flex flex-col gap-6 p-6 rounded-md bg-[#f0efe9]">
      <div className="flex items-center gap-6">
        <div className="relative w-[104px] h-[104px] rounded-full overflow-hidden bg-gray-200 shrink-0">
          <Image
            src={avatar}
            alt={name}
            fill
            className="object-cover"
          />
          {isSuperhost && (
            <div className="absolute bottom-1 right-1 bg-primary text-white rounded-full p-1 border-2 border-white">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
              </svg>
            </div>
          )}
        </div>
        
        <div className="flex flex-col">
          <h2 className="text-[28px] font-bold text-ink leading-tight">Hosted by {name}</h2>
          <span className="text-[14px] text-muted">Joined in {joinedDate}</span>
        </div>
      </div>
      
      <div className="flex gap-6 text-ink text-[14px]">
        <div className="flex flex-col">
          <span className="font-bold text-[18px]">{reviewsCount}</span>
          <span className="text-[12px] text-muted font-medium uppercase tracking-wider">Reviews</span>
        </div>
        <div className="w-[1px] h-full bg-hairline"></div>
        <div className="flex flex-col">
          <span className="font-bold text-[18px] flex items-center gap-1">
            {rating} <span className="text-[14px]">★</span>
          </span>
          <span className="text-[12px] text-muted font-medium uppercase tracking-wider">Rating</span>
        </div>
      </div>
      
      {bio && (
        <div className="text-[16px] text-ink leading-relaxed">
          {bio}
        </div>
      )}
      
      <div className="flex flex-col gap-2 mt-2">
        {isSuperhost && (
          <div className="text-[16px] text-ink">
            <span className="font-semibold">{name} is a Superhost.</span> Superhosts are experienced, highly rated hosts who are committed to providing great stays for guests.
          </div>
        )}
      </div>
      
      <div className="mt-4">
        <h3 className="text-[16px] font-semibold text-ink mb-2">Host details</h3>
        <ul className="flex flex-col gap-2 text-[16px] text-ink">
          <li>Response rate: {responseRate}</li>
          <li>Responds within {responseTime}</li>
        </ul>
      </div>
      
      <div className="mt-2">
        <button className="px-6 py-3 border border-ink rounded-md text-[16px] font-semibold text-ink bg-white hover:bg-gray-50 transition-colors w-fit">
          Contact Host
        </button>
      </div>
    </div>
  );
}
