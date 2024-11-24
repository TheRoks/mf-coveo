import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: process.env.OUTPUT as 'standalone' | 'export' || undefined,
  reactStrictMode: true,
};

export default nextConfig;
