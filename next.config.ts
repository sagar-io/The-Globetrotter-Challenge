import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '3000',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'the-globetrotter-game.vercel.app',
        pathname: '/**',
      }
    ],
  },
};

export default nextConfig;
