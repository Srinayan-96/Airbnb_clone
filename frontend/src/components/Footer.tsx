import { Globe } from "lucide-react";
import { FaFacebook, FaInstagram } from "react-icons/fa";

interface FooterProps {
  variant?: "home" | "search";
}

export default function Footer({ variant = "home" }: FooterProps) {
  return (
    <footer className="w-full bg-[#F7F7F7] text-[14px] text-ink">
      <div className={`mx-auto w-full max-w-[1920px] py-[48px] ${variant === "home" ? "px-6 md:px-10 xl:px-20" : ""}`}>
        {/* Top Section (3 Columns) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h3 className="text-[16px] font-medium mb-4">Support</h3>
          <ul className="flex flex-col gap-3">
            <li><a href="#" className="hover:underline">Help Centre</a></li>
            <li><a href="#" className="hover:underline">Get help with a safety issue</a></li>
            <li><a href="#" className="hover:underline">AirCover</a></li>
            <li><a href="#" className="hover:underline">Anti-discrimination</a></li>
            <li><a href="#" className="hover:underline">Disability support</a></li>
            <li><a href="#" className="hover:underline">Cancellation options</a></li>
            <li><a href="#" className="hover:underline">Report neighbourhood concern</a></li>
          </ul>
        </div>
        
        <div>
          <h3 className="text-[16px] font-medium mb-4">Hosting</h3>
          <ul className="flex flex-col gap-3">
            <li><a href="#" className="hover:underline">Airbnb your home</a></li>
            <li><a href="#" className="hover:underline">Airbnb your experience</a></li>
            <li><a href="#" className="hover:underline">Airbnb your service</a></li>
            <li><a href="#" className="hover:underline">AirCover for Hosts</a></li>
            <li><a href="#" className="hover:underline">Hosting resources</a></li>
            <li><a href="#" className="hover:underline">Community forum</a></li>
            <li><a href="#" className="hover:underline">Hosting responsibly</a></li>
            <li><a href="#" className="hover:underline">Join a free hosting class</a></li>
            <li><a href="#" className="hover:underline">Find a co-host</a></li>
            <li><a href="#" className="hover:underline">Refer a host</a></li>
          </ul>
        </div>

        <div>
          <h3 className="text-[16px] font-medium mb-4">Airbnb</h3>
          <ul className="flex flex-col gap-3">
            <li><a href="#" className="hover:underline">2026 Summer Release</a></li>
            <li><a href="#" className="hover:underline">Newsroom</a></li>
            <li><a href="#" className="hover:underline">Careers</a></li>
            <li><a href="#" className="hover:underline">Investors</a></li>
            <li><a href="#" className="hover:underline">Airbnb.org emergency stays</a></li>
          </ul>
        </div>
      </div>
      </div>

      <div className="w-full border-t border-hairline">
        <div className={`mx-auto w-full max-w-[1920px] py-6 ${variant === "home" ? "px-6 md:px-10 xl:px-20" : ""}`}>
          {/* Bottom Section */}
          <div className="flex flex-col xl:flex-row justify-between items-center gap-4">
            <div className="flex flex-wrap items-center justify-center xl:justify-start gap-2 text-center xl:text-left text-[13px] text-muted">
              <span>© 2026 Airbnb, Inc.</span>
              <span className="hidden md:inline">·</span>
              <a href="#" className="hover:underline">Privacy</a>
              <span className="hidden md:inline">·</span>
              <a href="#" className="hover:underline">Terms</a>
              <span className="hidden md:inline">·</span>
              <a href="#" className="hover:underline">Company details</a>
            </div>

            <div className="flex items-center gap-6 font-medium text-[13px] text-muted">
              <div className="flex items-center gap-4">
                <button className="flex items-center gap-2 hover:underline font-semibold">
                  <Globe className="h-[18px] w-[18px]" />
                  English (IN)
                </button>
                <span className="font-semibold cursor-pointer hover:underline">₹ INR</span>
              </div>
              <div className="flex items-center gap-4">
                <a href="#" className="hover:text-black"><FaFacebook className="h-5 w-5" /></a>
                <a href="#" className="hover:text-black">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16" className="w-[18px] h-[18px]">
                    <path d="M12.6.75h2.454l-5.36 6.142L16 15.25h-4.937l-3.867-5.07-4.425 5.07H.316l5.733-6.57L0 .75h5.063l3.495 4.633L12.601.75Zm-.86 13.028h1.36L4.323 2.145H2.865l8.875 11.633Z"/>
                  </svg>
                </a>
                <a href="#" className="hover:text-black"><FaInstagram className="h-[22px] w-[22px]" /></a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
