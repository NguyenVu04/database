import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["loollu56fcqxklcd.public.blob.vercel-storage.com", "via.placeholder.com"]
  },
  experimental: {
    serverActions: {
      bodySizeLimit: '4mb',
    },
  },
};

export default nextConfig;
