"use client";

import React, { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { api } from "@/lib/api";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Plus, Edit2, Trash2 } from "lucide-react";
import toast from "react-hot-toast";

interface HostListing {
  id: number;
  title: string;
  city: string;
  state: string;
  price_per_night: number;
  status: string;
}

export default function HostDashboardPage() {
  const [listings, setListings] = useState<HostListing[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedListing, setExpandedListing] = useState<number | null>(null);
  const [listingBookings, setListingBookings] = useState<Record<number, any[]>>({});
  const { user, openAuthModal } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user === null) {
      const timer = setTimeout(() => {
        router.push("/");
        openAuthModal();
      }, 500);
      return () => clearTimeout(timer);
    }

    if (user) {
      fetchListings();
    }
  }, [user, router, openAuthModal]);

  const fetchListings = () => {
    setLoading(true);
    api.getHostListings()
      .then(setListings)
      .catch(console.error)
      .finally(() => setLoading(false));
  };

  const handleDelete = async (id: number) => {
    if (confirm("Are you sure you want to delete this listing?")) {
      try {
        await api.deleteListing(id);
        toast.success("Listing deleted");
        fetchListings();
      } catch (err) {
        console.error("Failed to delete listing", err);
        toast.error("Failed to delete listing.");
      }
    }
  };

  const handleToggleBookings = async (id: number) => {
    if (expandedListing === id) {
      setExpandedListing(null);
      return;
    }
    
    setExpandedListing(id);
    if (!listingBookings[id]) {
      try {
        const bookings = await api.getHostListingBookings(id);
        setListingBookings(prev => ({ ...prev, [id]: bookings }));
      } catch (err) {
        console.error("Failed to fetch bookings", err);
        toast.error("Failed to load bookings");
      }
    }
  };

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

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navbar activeTab="All" setActiveTab={() => {}} />
      
      <main className="flex-1 mx-auto w-full max-w-[1300px] px-6 md:px-10 xl:px-20 py-12">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-[32px] font-semibold text-ink">Host Dashboard</h1>
          <Link 
            href="/host/create"
            className="flex items-center gap-2 bg-[#E61E4D] text-white px-5 py-3 rounded-lg font-semibold hover:bg-[#D70466] transition"
          >
            <Plus className="w-5 h-5" />
            Create Listing
          </Link>
        </div>
        
        {listings.length === 0 ? (
          <div className="border-t border-hairline py-12 text-center">
            <h2 className="text-[22px] font-semibold text-ink mb-2">You don't have any listings yet.</h2>
            <p className="text-[16px] text-muted mb-6">Become a host and start earning today.</p>
          </div>
        ) : (
          <div className="bg-white border border-hairline rounded-xl overflow-hidden">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b border-hairline">
                  <th className="py-4 px-6 font-semibold text-ink">Title</th>
                  <th className="py-4 px-6 font-semibold text-ink">Location</th>
                  <th className="py-4 px-6 font-semibold text-ink">Price/Night</th>
                  <th className="py-4 px-6 font-semibold text-ink">Status</th>
                  <th className="py-4 px-6 font-semibold text-ink text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {listings.map(listing => (
                  <React.Fragment key={listing.id}>
                    <tr className="border-b border-hairline hover:bg-gray-50">
                      <td className="py-4 px-6 text-ink font-medium">{listing.title}</td>
                      <td className="py-4 px-6 text-muted">{listing.city}, {listing.state}</td>
                      <td className="py-4 px-6 text-ink">₹{listing.price_per_night}</td>
                      <td className="py-4 px-6">
                        <span className={`px-2 py-1 rounded-full text-[12px] font-medium ${
                          listing.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                        }`}>
                          {listing.status.charAt(0).toUpperCase() + listing.status.slice(1)}
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex justify-end gap-3 items-center">
                          <button 
                            onClick={() => handleToggleBookings(listing.id)}
                            className="text-xs font-semibold px-3 py-1.5 border border-hairline rounded hover:bg-gray-100 mr-2"
                          >
                            {expandedListing === listing.id ? 'Hide Bookings' : 'View Bookings'}
                          </button>
                          <Link href={`/host/create?edit=${listing.id}`} className="text-gray-500 hover:text-ink">
                            <Edit2 className="w-5 h-5" />
                          </Link>
                          <button onClick={() => handleDelete(listing.id)} className="text-gray-500 hover:text-red-500">
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                    {expandedListing === listing.id && (
                      <tr className="bg-gray-50 border-b border-hairline">
                        <td colSpan={5} className="p-6">
                          <h4 className="font-semibold text-ink mb-4">Reservations</h4>
                          {!listingBookings[listing.id] ? (
                            <div className="text-muted text-sm flex items-center gap-2">
                              <div className="w-4 h-4 rounded-full border-2 border-gray-300 border-t-ink animate-spin"></div>
                              Loading...
                            </div>
                          ) : listingBookings[listing.id].length === 0 ? (
                            <p className="text-sm text-muted">No bookings for this listing yet.</p>
                          ) : (
                            <div className="space-y-3">
                              {listingBookings[listing.id].map(b => (
                                <div key={b.id} className="flex justify-between items-center bg-white p-4 rounded border border-hairline">
                                  <div>
                                    <p className="font-medium text-ink">User #{b.user_id}</p>
                                    <p className="text-sm text-muted">{new Date(b.check_in).toLocaleDateString()} to {new Date(b.check_out).toLocaleDateString()} • {b.num_guests} Guests</p>
                                  </div>
                                  <div className="text-right">
                                    <p className="font-medium text-ink">₹{b.total_price}</p>
                                    <span className="text-xs text-green-700 bg-green-100 px-2 py-0.5 rounded-full capitalize">{b.status}</span>
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
