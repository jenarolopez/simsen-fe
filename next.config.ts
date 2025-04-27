import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ['asset.cloudinary.com', 'res.cloudinary.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'asset.cloudinary.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
