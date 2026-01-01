import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* image config option here */
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'github.com',
      },
    ],
  },
};

export default nextConfig;
