import { Grid } from "lucide-react";

export default function PhotoGallery({ images }: { images: string[] }) {
  if (!images || images.length === 0) return null;

  return (
    <div className="relative w-full h-[300px] sm:h-[400px] md:h-[480px] group mb-8">
      <div className={`grid ${images.length >= 5 ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1'} gap-2 h-full rounded-2xl overflow-hidden`}>
        {/* Left main image */}
        <div className="w-full h-full relative cursor-pointer overflow-hidden">
          <img src={images[0]} alt="Hero" className="w-full h-full object-cover hover:scale-105 transition duration-300" />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition duration-300 pointer-events-none" />
        </div>
        
        {/* Right 2x2 grid (only if we have 5+ images) */}
        {images.length >= 5 && (
          <div className="hidden md:grid grid-cols-2 grid-rows-2 gap-2 h-full">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="w-full h-full relative cursor-pointer overflow-hidden">
                <img src={images[i]} alt={`Gallery ${i}`} className="w-full h-full object-cover hover:scale-105 transition duration-300" />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition duration-300 pointer-events-none" />
              </div>
            ))}
          </div>
        )}
      </div>
      
      {/* Show all photos button */}
      <button className="absolute bottom-6 right-6 bg-white border border-black/80 text-ink rounded-lg px-4 py-1.5 shadow-sm hover:bg-gray-100 transition flex items-center gap-2 z-10 font-semibold text-[14px]">
        <Grid className="w-4 h-4" />
        Show all photos
      </button>
    </div>
  );
}
