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
        // Custom R2 domain (optional) — add your domain here
        protocol: 'https',
        hostname: '*.r2.dev',
      },
    ],
  },
};

export default nextConfig;
