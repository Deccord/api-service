import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    serverMinification: false,
  },
  server: {
    port: 3001,
  },
};

export default nextConfig;
