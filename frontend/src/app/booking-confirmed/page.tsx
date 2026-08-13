"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { Suspense } from "react";
import Link from "next/link";
import { CheckCircle2 } from "lucide-react";

function ConfirmationContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const nights = searchParams.get("nights") || "2";
  const total = searchParams.get("total") || "0";

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-6 text-center">
      {/* Success Animation */}
      <div className="relative mb-8">
        <div className="w-24 h-24 bg-green-50 rounded-full flex items-center justify-center animate-in zoom-in duration-500">
          <CheckCircle2 className="w-14 h-14 text-green-500" strokeWidth={1.5} />
        </div>
        <div className="absolute -top-2 -right-2 w-8 h-8 bg-[#E61E4D] rounded-full flex items-center justify-center text-white text-lg">
          🎉
        </div>
      </div>

      <h1 className="text-[32px] font-bold text-ink mb-3">Booking Confirmed!</h1>
      <p className="text-[16px] text-muted max-w-[400px] mb-2">
        Your request has been submitted. You'll receive a confirmation once the host approves your stay.
      </p>
      <p className="text-[15px] text-ink font-semibold mb-10">
        {nights} night{parseInt(nights) > 1 ? "s" : ""} · Total ₹{parseInt(total).toLocaleString("en-IN")}
      </p>

      <div className="flex gap-4">
        <Link
          href="/"
          className="px-6 py-3 bg-[#E61E4D] text-white font-bold rounded-xl hover:bg-[#D70466] transition"
        >
          Explore more
        </Link>
        <Link
          href="/"
          className="px-6 py-3 border border-gray-300 text-ink font-semibold rounded-xl hover:bg-gray-50 transition"
        >
          View my trips
        </Link>
      </div>
    </div>
  );
}

export default function BookingConfirmedPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <ConfirmationContent />
    </Suspense>
  );
}
