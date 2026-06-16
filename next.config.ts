import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "carsoup.com",
      },
    ],
  },
};

export default nextConfig;
