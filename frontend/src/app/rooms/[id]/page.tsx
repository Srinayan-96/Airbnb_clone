"use client";

import { getDetailedListing, DetailedListing } from "@/lib/mock-data";
import { api } from "@/lib/api";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import StickySubNav from "@/components/room/StickySubNav";
import RoomHeader from "@/components/room/RoomHeader";
import PhotoGallery from "@/components/room/PhotoGallery";
import RoomInfo from "@/components/room/RoomInfo";
import StickyBookingCard from "@/components/room/StickyBookingCard";
import AvailabilityCalendar from "@/components/room/AvailabilityCalendar";
import ReviewSection from "@/components/room/ReviewSection";
import LocationMap from "@/components/room/LocationMap";
import HostProfile from "@/components/room/HostProfile";
import { ChevronRight } from "lucide-react";
import { use, useEffect, useState } from "react";

export default function RoomPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const [listing, setListing] = useState<DetailedListing | null>(null);

  useEffect(() => {
    api.getListingById(resolvedParams.id).then(data => {
      // Map API ListingDetail to Frontend DetailedListing
      const mapped: DetailedListing = {
        id: data.id.toString(),
        title: data.title,
        subtitle: `${data.city}, ${data.state}, ${data.country}`,
        dates: "",
        price: `₹${data.price_per_night}`,
        priceLabel: " night",
        rating: data.rating?.overall || 0,
        reviewCount: data.review_count,
        imageUrl: data.photos[0]?.url || "",
        images: data.photos.sort((a, b) => a.position - b.position).map(p => p.url),
        badge: data.is_guest_favourite ? "Guest favourite" : undefined,
        isGuestFavorite: data.is_guest_favourite,
        lat: data.latitude,
        lng: data.longitude,
        location: `${data.city}, ${data.state}`,
        host: {
          name: data.host.full_name,
          avatar: data.host.avatar_url || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150",
          isSuperhost: data.host.is_superhost,
          monthsHosting: 12,
          school: data.city,
          work: "Hosting",
          bio: "Welcome to my space!",
          responseRate: "100%",
          responseTime: "Responds within an hour"
        },
        coHosts: [],
        stats: {
          reviews: data.review_count,
          rating: data.rating?.overall || 0
        },
        ratingBreakdown: {
          cleanliness: data.rating?.cleanliness || 5.0,
          accuracy: data.rating?.accuracy || 5.0,
          checkIn: data.rating?.checkin || 5.0,
          communication: data.rating?.communication || 5.0,
          location: data.rating?.location || 5.0,
          value: data.rating?.value || 5.0
        },
        reviews: [],
        maxGuests: data.max_guests,
        bedrooms: data.bedrooms,
        beds: data.beds,
        baths: data.bathrooms,
        description: data.description,
        amenities: data.amenities.map(a => a.name),
        cleaningFee: parseFloat(data.cleaning_fee as unknown as string) || 0,
        // service_fee_percent is stored as a fraction (0.05 = 5%)
        serviceFee: Math.round(parseFloat(data.price_per_night as unknown as string) * (data.service_fee_percent || 0.05))
      };
      setListing(mapped);
    }).catch(console.error);
  }, [resolvedParams.id]);

  if (!listing) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;

  return (
    <div className="min-h-screen bg-white">
      {/* 1. Global Navbar at the top only */}
      <Navbar activeTab="All" setActiveTab={() => {}} />

      {/* 2. Secondary Sticky Nav (replaces Navbar on scroll) */}
      <StickySubNav listing={listing} />

      {/* Main Content Container */}
      <main className="mx-auto w-full max-w-[1120px] px-6 md:px-20 pt-6">
        
        {/* Section 1: Hero */}
        <RoomHeader listing={listing} />
        <div id="photos">
          <PhotoGallery images={listing.images || []} />
        </div>

        {/* 2-Column Layout for Info & Booking */}
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-24">
          {/* Left Column */}
          <div className="flex-1 w-full max-w-[650px]" id="amenities">
            <RoomInfo listing={listing} />
          </div>

          {/* Right Column: Sticky Booking Card */}
          <div className="hidden lg:block relative w-[320px] xl:w-[360px] flex-shrink-0">
            <div className="sticky top-[100px]">
              <StickyBookingCard listing={listing} />
            </div>
          </div>
        </div>

        {/* Section 3: Availability Calendar */}
        <div className="w-full border-t border-hairline my-8" />
        <div id="availability">
          <AvailabilityCalendar />
        </div>

        {/* Section 4: Reviews */}
        <div className="w-full border-t border-hairline my-8" />
        <div id="reviews">
          <ReviewSection listing={listing} />
        </div>

        {/* Section 5: Location Map */}
        <div className="w-full border-t border-hairline my-8" />
        <div id="location">
          <LocationMap listing={listing} />
        </div>

        {/* Section 6: Host Profile */}
        <div className="w-full border-t border-hairline my-8" />
        <div id="host">
          <HostProfile listing={listing} />
        </div>
      </main>

      {/* Global Footer */}
      <div className="border-t border-hairline mt-12">
        <Footer variant="home" />
      </div>
    </div>
  );
}
