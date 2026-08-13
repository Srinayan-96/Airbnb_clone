"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { Menu, User, HelpCircle, Globe } from "lucide-react";
import SearchBar from "./SearchBar";
import LanguageModal from "./LanguageModal";
import FilterBar from "./FilterBar";
import { useAuth } from "@/contexts/AuthContext";
import { usePathname, useRouter } from "next/navigation";

export type TabType = "All" | "Homes" | "Experiences" | "Services";

interface NavbarProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  variant?: "home" | "search";
}

export default function Navbar({ activeTab, setActiveTab, variant = "home" }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isLanguageModalOpen, setIsLanguageModalOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const { user, openAuthModal, logout } = useAuth();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsUserMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (variant === "search") return;
    
    const handleScroll = () => {
      if (window.scrollY > 80) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
        setIsSearchExpanded(false); // collapse on scroll back up
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [variant]);

  const TABS: { id: TabType; label: string; icon: string }[] = [
    { id: "All", label: "All", icon: "https://cdn-icons-png.flaticon.com/512/826/826070.png" }, // Globe PNG
    { id: "Homes", label: "Homes", icon: "https://cdn-icons-png.flaticon.com/512/3069/3069004.png" }, // Home PNG
    { id: "Experiences", label: "Experiences", icon: "https://cdn-icons-png.flaticon.com/512/3125/3125713.png" }, // Balloon PNG
    { id: "Services", label: "Services", icon: "https://cdn-icons-png.flaticon.com/512/483/483256.png" }, // Cloche/Bell PNG
  ];

  const showCondensed = variant === "search" ? !isSearchExpanded : (isScrolled && !isSearchExpanded);
  const isFixed = variant === "search" || isScrolled;

  return (
    <>
      {/* Spacer to prevent layout jump when navbar becomes fixed */}
      {isFixed && (
        <div className={variant === "search" && activeTab === "Homes" ? "h-[152px]" : "h-[80px]"} />
      )}
      
      <header
        className={`w-full transition-all duration-300 z-50 bg-white ${
          variant === "home" ? "border-b border-hairline" : ""
        } ${
          isFixed 
            ? "fixed top-0 left-0 right-0" 
            : "relative"
        }`}
      >
        <div className={`mx-auto flex w-full max-w-[1920px] items-center justify-between px-6 md:px-10 xl:px-20 h-[80px]`}>
          {/* Left: Logo */}
          <Link href="/" className="flex flex-1 items-center justify-start min-w-[150px]">
            <img 
              src="https://upload.wikimedia.org/wikipedia/commons/6/69/Airbnb_Logo_B%C3%A9lo.svg" 
              alt="Airbnb" 
              className="h-[32px] object-contain cursor-pointer"
            />
          </Link>

          {/* Center: Tabs or Condensed Search */}
          <div className="flex flex-1 justify-center transition-all duration-300">
            {showCondensed ? (
              <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
                <SearchBar 
                  variant="condensed" 
                  contextVariant={variant}
                  activeTab={activeTab} 
                  onExpand={() => setIsSearchExpanded(true)} 
                />
              </div>
            ) : (
              <div className="flex gap-8 text-muted animate-in fade-in duration-300">
                {TABS.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => {
                      if (pathname === "/") {
                        setActiveTab(tab.id);
                      } else {
                        router.push(`/?tab=${tab.id}`);
                      }
                    }}
                    className={`group flex items-center gap-2 transition-colors relative pb-3 pt-1 ${
                      activeTab === tab.id ? "text-ink font-semibold" : "text-muted hover:text-ink hover:bg-gray-100 rounded-full px-4"
                    }`}
                  >
                    <img src={tab.icon} alt={tab.label} className="w-5 h-5 object-contain opacity-80" />
                    <span className={`text-[16px] ${activeTab === tab.id ? "font-semibold" : "font-medium"}`}>{tab.label}</span>
                    {["Experiences", "Services"].includes(tab.id) && (
                      <span className="absolute -top-1 -right-6 rounded-full bg-canvas px-[6px] py-[2px] text-[8px] font-bold uppercase tracking-[0.32px] text-ink border border-hairline">
                        New
                      </span>
                    )}
                    <div
                      className={`absolute -bottom-[20px] left-0 h-[2px] w-full transition-all ${
                        activeTab === tab.id ? "bg-ink" : "bg-transparent"
                      }`}
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right: User actions */}
          <div className="flex flex-1 items-center justify-end gap-2 min-w-[150px] relative" ref={menuRef}>
            <Link href="/host" className="hidden rounded-full px-4 py-2 text-[15px] font-semibold transition-colors hover:bg-gray-50 lg:block text-black">
              Become a host
            </Link>
            <button 
              onClick={() => setIsLanguageModalOpen(true)}
              className="flex h-[42px] w-[42px] items-center justify-center rounded-full bg-gray-100 transition-colors hover:bg-gray-200"
            >
              <Globe className="h-5 w-5 text-gray-800" />
            </button>
            <button 
              onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
              className="flex h-[42px] min-w-[76px] items-center justify-between rounded-full border border-gray-300 bg-white px-3 transition-colors hover:shadow-md ml-1 gap-2"
            >
              <Menu className="h-4 w-4 text-gray-800" />
              {user ? (
                <img 
                  src={user.avatar_url || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=150"} 
                  className="w-7 h-7 rounded-full object-cover" 
                  alt={user.full_name}
                />
              ) : (
                <div className="bg-gray-500 text-white rounded-full p-1 flex items-center justify-center">
                  <User className="h-5 w-5" />
                </div>
              )}
            </button>

            {/* User Dropdown Menu */}
            {isUserMenuOpen && (
              <div className="absolute right-0 top-14 w-[240px] rounded-2xl bg-white py-2 shadow-[0_4px_20px_rgba(0,0,0,0.15)] border border-gray-200 z-50 text-[14px]">
                {user ? (
                  <>
                    <div className="cursor-pointer px-4 py-3 font-semibold text-gray-800 hover:bg-gray-50">Messages</div>
                    <div className="cursor-pointer px-4 py-3 font-semibold text-gray-800 hover:bg-gray-50">Notifications</div>
                    <Link href="/trips" className="cursor-pointer block px-4 py-3 font-semibold text-gray-800 hover:bg-gray-50">Trips</Link>
                    <Link href="/wishlists" className="cursor-pointer block px-4 py-3 font-semibold text-gray-800 hover:bg-gray-50">Wishlists</Link>
                    <div className="my-1 h-[1px] bg-gray-200" />
                    <div className="cursor-pointer px-4 py-3 text-gray-800 hover:bg-gray-50">Host an experience</div>
                    <Link href="/host" className="cursor-pointer block px-4 py-3 text-gray-800 hover:bg-gray-50">Manage listings</Link>
                    <div className="cursor-pointer px-4 py-3 text-gray-800 hover:bg-gray-50">Account</div>
                    <div className="my-1 h-[1px] bg-gray-200" />
                    <div className="cursor-pointer px-4 py-3 text-gray-800 hover:bg-gray-50">Help Centre</div>
                    <div 
                      className="cursor-pointer px-4 py-3 text-gray-800 hover:bg-gray-50"
                      onClick={() => { logout(); setIsUserMenuOpen(false); }}
                    >
                      Log out
                    </div>
                  </>
                ) : (
                  <>
                    <div 
                      className="cursor-pointer px-4 py-3 font-semibold text-gray-800 hover:bg-gray-50"
                      onClick={() => { openAuthModal(); setIsUserMenuOpen(false); }}
                    >
                      Log in
                    </div>
                    <div 
                      className="cursor-pointer px-4 py-3 text-gray-800 hover:bg-gray-50"
                      onClick={() => { openAuthModal(); setIsUserMenuOpen(false); }}
                    >
                      Sign up
                    </div>
                    <div className="my-1 h-[1px] bg-gray-200" />
                    <Link href="/host" className="cursor-pointer block px-4 py-3 text-gray-800 hover:bg-gray-50">Airbnb your home</Link>
                    <div className="cursor-pointer px-4 py-3 text-gray-800 hover:bg-gray-50">Host an experience</div>
                    <div className="cursor-pointer px-4 py-3 text-gray-800 hover:bg-gray-50">Help Centre</div>
                  </>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Search Bar (Expanded state) */}
        {!showCondensed && (
          <div className="w-full pb-6 px-6 pt-2 transition-all duration-300 animate-in fade-in slide-in-from-top-4">
            <SearchBar variant="large" contextVariant={variant} activeTab={activeTab} />
          </div>
        )}

      </header>
      
      {/* Overlay when search is expanded while scrolled */}
      {isSearchExpanded && isFixed && (
        <div 
          className="fixed inset-0 z-40 bg-black/25"
          onClick={() => setIsSearchExpanded(false)}
        />
      )}

      {/* Language Modal */}
      <LanguageModal 
        isOpen={isLanguageModalOpen}
        onClose={() => setIsLanguageModalOpen(false)}
      />
    </>
  );
}
