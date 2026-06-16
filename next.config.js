/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "carsoup.com",
      },
    ],
  },
};

module.exports = nextConfig;
