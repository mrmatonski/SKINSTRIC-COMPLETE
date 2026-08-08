import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Hide the Next.js "N" badge during `next dev`.
  // Production / wandag has no indicator.
  allowedDevOrigins: ["127.0.0.1", "localhost"],
  devIndicators: false,
};

export default nextConfig;
