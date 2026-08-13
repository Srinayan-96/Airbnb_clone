"use client";

import { useState, useEffect, use } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import { ChevronLeft, Star, Minus, Plus, X, Loader2 } from "lucide-react";
import { api, ListingDetail } from "@/lib/api";
import { useAuth } from "@/contexts/AuthContext";

function calcNights(checkin: string, checkout: string): number {
  const a = new Date(checkin);
  const b = new Date(checkout);
  const diff = Math.round((b.getTime() - a.getTime()) / (1000 * 60 * 60 * 24));
  return diff > 0 ? diff : 1;
}

function fmtDate(dateStr: string): string {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
}

export default function BookPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const resolvedParams = use(params);
  const { user, isLoading: authLoading, openAuthModal } = useAuth();

  const [listing, setListing] = useState<ListingDetail | null>(null);
  const [step, setStep] = useState(1);
  const [isBooking, setIsBooking] = useState(false);

  // Date & Guests from URL params or defaults
  const [checkin, setCheckin] = useState(searchParams.get("checkin") || "");
  const [checkout, setCheckout] = useState(searchParams.get("checkout") || "");
  const [guests, setGuests] = useState(parseInt(searchParams.get("guests") || "1", 10));

  // Fake Card State
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [zip, setZip] = useState("");

  useEffect(() => {
    api.getListingById(resolvedParams.id)
      .then(setListing)
      .catch(console.error);
  }, [resolvedParams.id]);

  // Set default dates if none given
  useEffect(() => {
    if (!checkin) {
      const d = new Date();
      d.setDate(d.getDate() + 10);
      setCheckin(d.toISOString().split("T")[0]);
    }
    if (!checkout) {
      const d = new Date();
      d.setDate(d.getDate() + 12);
      setCheckout(d.toISOString().split("T")[0]);
    }
  }, []);

  useEffect(() => {
    if (!authLoading && user && step === 1) {
      setStep(2);
    } else if (!authLoading && !user && step > 1) {
      setStep(1);
    }
  }, [user, authLoading, step]);

  if (!listing) return (
    <div className="min-h-screen flex items-center justify-center">
      <Loader2 className="w-8 h-8 animate-spin text-[#E61E4D]" />
    </div>
  );

  // Parse prices — backend returns strings/decimals
  const pricePerNight = parseFloat(listing.price_per_night as unknown as string) || 0;
  const cleaningFee = parseFloat(listing.cleaning_fee as unknown as string) || 0;
  // service_fee_percent and tax_percent are stored as fractions (0.05 = 5%)
  const nights = checkin && checkout ? calcNights(checkin, checkout) : 1;
  const subtotal = pricePerNight * nights;
  const serviceFee = Math.round(subtotal * (listing.service_fee_percent ?? 0.05));
  const taxes = Math.round(subtotal * (listing.tax_percent ?? 0.12));
  const total = subtotal + serviceFee + taxes + cleaningFee;
  const maxGuests = listing.max_guests || 10;
  const overallRating = listing.rating?.overall ?? null;

  const handleBook = async () => {
    setIsBooking(true);
    try {
      await api.createBooking({
        listing_id: listing.id,
        check_in: checkin,
        check_out: checkout,
        num_guests: guests,
      });
      router.push(`/booking-confirmed?listing=${listing.id}&nights=${nights}&total=${Math.round(total)}`);
      toast.success("Booking confirmed!");
    } catch (err: any) {
      toast.error("Error creating booking: " + err.message);
    } finally {
      setIsBooking(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="h-20 w-full flex items-center px-6 md:px-20 border-b border-hairline sticky top-0 bg-white z-10">
        <div
          onClick={() => router.back()}
          className="w-8 h-8 rounded-full hover:bg-surface-soft flex items-center justify-center cursor-pointer transition"
        >
          <ChevronLeft className="w-5 h-5 text-ink" />
        </div>
      </header>

      <main className="mx-auto w-full max-w-[1120px] px-6 md:px-20 pt-12 pb-24">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-24">

          {/* Left Column: Steps */}
          <div className="flex-1 max-w-[550px]">
            <h1 className="text-[32px] font-bold text-ink mb-10 leading-tight">Request to book</h1>

            <div className="flex flex-col gap-6">

              {/* Step 1: Log in */}
              <div className={`border rounded-[16px] overflow-hidden transition-all duration-300 ${step === 1 ? "border-gray-400 shadow-md" : "border-hairline"}`}>
                <div
                  onClick={() => !user && setStep(1)}
                  className={`flex items-center justify-between p-6 ${!user ? "cursor-pointer hover:bg-gray-50" : ""} transition`}
                >
                  <h2 className="text-[18px] font-bold text-ink">1. Log in or sign up</h2>
                  {step > 1 && user && (
                    <span className="text-[14px] font-semibold text-ink">✓ {user.full_name}</span>
                  )}
                </div>
                {step === 1 && !user && (
                  <div className="px-6 pb-6 pt-2 flex flex-col gap-3">
                    <p className="text-[14px] text-muted">You need an account to book this place.</p>
                    <button
                      onClick={openAuthModal}
                      className="w-full bg-[#E61E4D] text-white font-bold text-[15px] py-3 rounded-lg hover:bg-[#D70466] transition"
                    >
                      Log in or sign up
                    </button>
                  </div>
                )}
              </div>

              {/* Step 2: Payment */}
              <div className={`border rounded-[16px] overflow-hidden transition-all duration-300 ${step === 2 ? "border-gray-400 shadow-md" : "border-hairline opacity-50"}`}>
                <div
                  onClick={() => user && step !== 2 && setStep(2)}
                  className={`flex items-center justify-between p-6 ${user && step !== 2 ? "cursor-pointer hover:bg-gray-50" : ""} transition`}
                >
                  <h2 className="text-[18px] font-bold text-ink">2. Add a payment method</h2>
                  {step === 2 && (
                    <button
                      disabled={!cardNumber || !expiry || !cvv || !zip}
                      onClick={(e) => { e.stopPropagation(); setStep(3); }}
                      className={`bg-[#E61E4D] text-white font-bold text-[14px] px-6 py-3 rounded-lg transition ${!cardNumber || !expiry || !cvv || !zip ? "opacity-50 cursor-not-allowed" : "hover:bg-[#D70466]"}`}
                    >
                      Continue
                    </button>
                  )}
                  {step > 2 && <span className="text-[14px] font-semibold text-ink underline cursor-pointer">Edit</span>}
                </div>
                {step === 2 && (
                  <div className="px-6 pb-6 pt-2">
                    <p className="text-[13px] text-muted mb-4">Enter your payment details (simulated — no real charge).</p>

                    {/* Card form */}
                    <div className="flex flex-col border border-gray-300 rounded-xl overflow-hidden bg-white shadow-sm">
                      {/* Card Number */}
                      <div className="relative border-b border-gray-300 px-4 py-3">
                        <label className="block text-[11px] font-semibold text-gray-500 uppercase tracking-wide mb-1">Card number</label>
                        <input
                          type="text"
                          placeholder="1234 5678 9012 3456"
                          maxLength={19}
                          value={cardNumber}
                          onChange={(e) => {
                            const v = e.target.value.replace(/\D/g, "").slice(0, 16);
                            setCardNumber(v.replace(/(.{4})/g, "$1 ").trim());
                          }}
                          className="w-full text-[15px] text-ink outline-none bg-transparent placeholder-gray-300"
                        />
                      </div>
                      <div className="flex">
                        <div className="relative w-1/2 border-r border-gray-300 px-4 py-3">
                          <label className="block text-[11px] font-semibold text-gray-500 uppercase tracking-wide mb-1">Expiration</label>
                          <input
                            type="text"
                            placeholder="MM / YY"
                            maxLength={7}
                            value={expiry}
                            onChange={(e) => {
                              let v = e.target.value.replace(/\D/g, "").slice(0, 4);
                              if (v.length > 2) v = v.slice(0, 2) + " / " + v.slice(2);
                              setExpiry(v);
                            }}
                            className="w-full text-[15px] text-ink outline-none bg-transparent placeholder-gray-300"
                          />
                        </div>
                        <div className="relative w-1/2 px-4 py-3">
                          <label className="block text-[11px] font-semibold text-gray-500 uppercase tracking-wide mb-1">CVV</label>
                          <input
                            type="text"
                            placeholder="•••"
                            maxLength={4}
                            value={cvv}
                            onChange={(e) => setCvv(e.target.value.replace(/\D/g, "").slice(0, 4))}
                            className="w-full text-[15px] text-ink outline-none bg-transparent placeholder-gray-300"
                          />
                        </div>
                      </div>
                      <div className="border-t border-gray-300 px-4 py-3">
                        <label className="block text-[11px] font-semibold text-gray-500 uppercase tracking-wide mb-1">ZIP / Postal code</label>
                        <input
                          type="text"
                          placeholder="110001"
                          value={zip}
                          onChange={(e) => setZip(e.target.value.replace(/\D/g, "").slice(0, 10))}
                          className="w-full text-[15px] text-ink outline-none bg-transparent placeholder-gray-300"
                        />
                      </div>
                    </div>

                    <div className="flex items-center gap-3 mt-4 p-3 bg-gray-50 rounded-lg">
                      <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" alt="PayPal" className="h-5 opacity-60" />
                      <img src="https://cdn-icons-png.flaticon.com/512/349/349228.png" alt="Visa" className="h-5 opacity-60" />
                      <img src="https://cdn-icons-png.flaticon.com/512/349/349221.png" alt="MasterCard" className="h-5 opacity-60" />
                      <span className="text-[12px] text-muted ml-auto">🔒 Secured by Airbnb</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Step 3: Review */}
              <div className={`border rounded-[16px] overflow-hidden transition-all duration-300 ${step === 3 ? "border-gray-400 shadow-md" : "border-hairline opacity-50"}`}>
                <div
                  onClick={() => user && step >= 3 && setStep(3)}
                  className={`flex items-center justify-between p-6 ${user && step >= 3 ? "cursor-pointer hover:bg-gray-50" : ""} transition`}
                >
                  <h2 className="text-[18px] font-bold text-ink">3. Review your request</h2>
                  {step === 3 && (
                    <button
                      disabled={isBooking}
                      onClick={(e) => { e.stopPropagation(); handleBook(); }}
                      className={`bg-gradient-to-r from-[#E61E4D] via-[#E31C5F] to-[#D70466] text-white font-bold text-[14px] px-6 py-3 rounded-lg hover:brightness-95 transition flex items-center gap-2 ${isBooking ? "opacity-70 cursor-not-allowed" : ""}`}
                    >
                      {isBooking && <Loader2 className="w-4 h-4 animate-spin" />}
                      {isBooking ? "Confirming..." : "Request to book"}
                    </button>
                  )}
                </div>
                {step === 3 && (
                  <div className="px-6 pb-6 pt-2 text-[14px] text-muted">
                    <p>By selecting the button above, I agree to the <span className="underline text-ink cursor-pointer">House Rules</span>, <span className="underline text-ink cursor-pointer">Safety Disclosures</span>, and <span className="underline text-ink cursor-pointer">Airbnb's Terms of Service</span>.</p>
                    <p className="mt-2">Total: <strong className="text-ink">₹{Math.round(total).toLocaleString("en-IN")}</strong> for {nights} night{nights > 1 ? "s" : ""}, {guests} guest{guests > 1 ? "s" : ""}.</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Column: Order Summary */}
          <div className="hidden lg:block relative w-[400px] flex-shrink-0">
            <div className="sticky top-[100px] border border-hairline rounded-[24px] p-6 shadow-sm bg-white">

              {/* Listing Thumbnail & Title */}
              <div className="flex gap-4 pb-6 border-b border-hairline mb-6">
                <img src={listing.photos[0]?.url} alt="Thumbnail" className="w-[124px] h-[106px] rounded-xl object-cover flex-shrink-0" />
                <div className="flex flex-col justify-between min-w-0">
                  <div>
                    <h3 className="text-[12px] text-muted mb-1">{listing.property_type} in {listing.city}</h3>
                    <h2 className="text-[14px] font-medium text-ink leading-tight line-clamp-2">{listing.title}</h2>
                  </div>
                  <div className="flex items-center gap-1 text-[12px] font-semibold text-ink">
                    <Star className="w-3 h-3 fill-current" />
                    <span>
                      {overallRating ? `${overallRating.toFixed(2)} · ${listing.review_count} reviews` : 'New'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Free Cancellation */}
              <div className="pb-6 border-b border-hairline mb-6">
                <h3 className="font-bold text-[16px] text-ink mb-1">Free cancellation</h3>
                <p className="text-[14px] text-muted">Cancel before check-in for a full refund. <span className="underline font-semibold cursor-pointer text-ink">Full policy</span></p>
              </div>

              {/* Dates & Guests */}
              <div className="flex flex-col gap-4 pb-6 border-b border-hairline mb-6">
                <div className="flex justify-between items-start">
                  <div className="flex flex-col">
                    <span className="font-bold text-[16px] text-ink">Dates</span>
                    <span className="text-[14px] text-ink">
                      {checkin && checkout ? `${fmtDate(checkin)} – ${fmtDate(checkout)}` : "Flexible"}
                    </span>
                  </div>
                  <button className="text-[14px] font-semibold underline text-ink hover:text-gray-600 transition">Change</button>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex flex-col">
                    <span className="font-bold text-[16px] text-ink">Guests</span>
                    <span className="text-[14px] text-muted">{guests} adult{guests > 1 ? "s" : ""}</span>
                  </div>
                  {/* Inline guest stepper */}
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setGuests(g => Math.max(1, g - 1))}
                      disabled={guests <= 1}
                      className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:border-gray-600 transition disabled:opacity-30 disabled:cursor-not-allowed"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="text-[15px] font-semibold text-ink w-4 text-center">{guests}</span>
                    <button
                      onClick={() => setGuests(g => Math.min(maxGuests, g + 1))}
                      disabled={guests >= maxGuests}
                      className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:border-gray-600 transition disabled:opacity-30 disabled:cursor-not-allowed"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Price Breakdown */}
              <h3 className="font-bold text-[22px] text-ink mb-4">Price details</h3>
              <div className="flex flex-col gap-3 text-[16px] text-ink mb-6 pb-6 border-b border-hairline">
                <div className="flex justify-between">
                  <span className="underline">₹{Math.round(pricePerNight).toLocaleString("en-IN")} × {nights} night{nights > 1 ? "s" : ""}</span>
                  <span>₹{Math.round(subtotal).toLocaleString("en-IN")}</span>
                </div>
                {cleaningFee > 0 && (
                  <div className="flex justify-between">
                    <span className="underline">Cleaning fee</span>
                    <span>₹{Math.round(cleaningFee).toLocaleString("en-IN")}</span>
                  </div>
                )}
                {serviceFee > 0 && (
                  <div className="flex justify-between">
                    <span className="underline">Airbnb service fee</span>
                    <span>₹{Math.round(serviceFee).toLocaleString("en-IN")}</span>
                  </div>
                )}
                {taxes > 0 && (
                  <div className="flex justify-between">
                    <span className="underline">Taxes</span>
                    <span>₹{Math.round(taxes).toLocaleString("en-IN")}</span>
                  </div>
                )}
              </div>

              <div className="flex justify-between font-bold text-[16px] text-ink">
                <span>Total (INR)</span>
                <span>₹{Math.round(total).toLocaleString("en-IN")}</span>
              </div>

            </div>
          </div>

        </div>
      </main>
    </div>
  );
}
