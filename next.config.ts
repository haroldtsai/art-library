import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        // Cloudflare R2 public bucket — update hostname after R2 setup
        protocol: 'https',
        hostname: '*.r2.cloudflarestorage.com',
      },
      {
        protocol: 'https',
        hostname: 'pub-bebe97f227cf4bb689ed500f67508e13.r2.dev',
      },
    ],
  },
};

export default nextConfig;
