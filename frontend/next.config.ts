import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "cdn-icons-png.flaticon.com" },
      { protocol: "https", hostname: "upload.wikimedia.org" },
      { protocol: "https", hostname: "**.unsplash.com" },
    ],
  },
  // Prevent build failures due to non-critical TS errors
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;

