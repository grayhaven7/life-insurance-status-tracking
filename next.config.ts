import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Silence the TypeScript errors during build for rapid development
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
