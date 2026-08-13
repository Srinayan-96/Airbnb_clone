"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { api, BookingResponse } from "@/lib/api";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function TripsPage() {
  const [bookings, setBookings] = useState<BookingResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const { user, openAuthModal } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user === null) {
      // User is not logged in, but let's wait a bit to be sure
      const timer = setTimeout(() => {
        router.push("/");
        openAuthModal();
      }, 500);
      return () => clearTimeout(timer);
    }

    if (user) {
      api.getMyTrips()
        .then(setBookings)
        .catch(console.error)
        .finally(() => setLoading(false));
    }
  }, [user, router, openAuthModal]);

  if (!user || loading) {
    return (
      <div className="min-h-screen bg-white">
        <Navbar activeTab="All" setActiveTab={() => {}} />
        <div className="flex h-[50vh] items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-300 border-t-ink"></div>
        </div>
      </div>
    );
  }

  const upcomingTrips = bookings.filter(b => b.is_upcoming);
  const pastTrips = bookings.filter(b => b.is_past);

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navbar activeTab="All" setActiveTab={() => {}} />
      
      <main className="flex-1 mx-auto w-full max-w-[1300px] px-6 md:px-10 xl:px-20 py-12">
        <h1 className="text-[32px] font-semibold text-ink mb-8">Trips</h1>
        
        {bookings.length === 0 ? (
          <div className="border-t border-hairline py-8">
            <h2 className="text-[22px] font-semibold text-ink mb-2">No trips booked... yet!</h2>
            <p className="text-[16px] text-muted mb-6">Time to dust off your bags and start planning your next adventure</p>
            <Link 
              href="/"
              className="inline-block px-6 py-3 border border-ink text-ink font-semibold rounded-lg hover:bg-gray-50 transition"
            >
              Start searching
            </Link>
          </div>
        ) : (
          <div className="space-y-12">
            {upcomingTrips.length > 0 && (
              <section>
                <h2 className="text-[22px] font-semibold text-ink mb-6">Upcoming trips</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {upcomingTrips.map(trip => (
                    <TripCard key={trip.id} trip={trip} />
                  ))}
                </div>
              </section>
            )}

            {pastTrips.length > 0 && (
              <section>
                <h2 className="text-[22px] font-semibold text-ink mb-6">Where you've been</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {pastTrips.map(trip => (
                    <TripCard key={trip.id} trip={trip} />
                  ))}
                </div>
              </section>
            )}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}

function TripCard({ trip }: { trip: BookingResponse }) {
  const listing = trip.listing;
  const startDate = new Date(trip.check_in);
  const endDate = new Date(trip.check_out);
  
  const formatter = new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric' });
  const endFormatter = new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  const dateString = `${formatter.format(startDate)} - ${endFormatter.format(endDate)}`;

  return (
    <Link href={`/rooms/${trip.listing_id}`} className="group block h-full">
      <div className="flex flex-col h-full rounded-2xl overflow-hidden border border-hairline bg-white hover:shadow-md transition">
        <div className="aspect-[4/3] w-full overflow-hidden bg-gray-200">
          <img 
            src={listing?.cover_photo_url || "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&q=80&w=800"} 
            alt={listing?.title || "Listing"} 
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
        <div className="p-4 flex flex-col flex-1">
          <div className="flex justify-between items-start mb-2">
            <h3 className="font-semibold text-[16px] text-ink line-clamp-1">{listing?.city || "Unknown Location"}</h3>
          </div>
          <p className="text-[14px] text-muted mb-1 line-clamp-1">{listing?.title || "Listing unavailable"}</p>
          <p className="text-[14px] text-muted mb-4">{dateString}</p>
          
          <div className="mt-auto pt-4 border-t border-hairline flex items-center justify-between">
            <div>
              <p className="text-[14px] font-medium text-ink">Total</p>
              <p className="text-[14px] text-muted">₹{trip.total_price.toLocaleString()}</p>
            </div>
            <div className={`px-3 py-1 rounded-full text-[12px] font-medium ${
              trip.status === 'confirmed' ? 'bg-green-100 text-green-800' :
              trip.status === 'cancelled' ? 'bg-red-100 text-red-800' :
              'bg-gray-100 text-gray-800'
            }`}>
              {trip.status.charAt(0).toUpperCase() + trip.status.slice(1)}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
