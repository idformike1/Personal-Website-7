import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true, // Forces double-mount in dev to catch GSAP memory leaks
  compiler: {
    removeConsole: process.env.NODE_ENV === "production", // Strips logs in prod
  },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "picsum.photos" },
      { protocol: "https", hostname: "cdn.pixabay.com" },
    ],
  },
};

export default nextConfig;
