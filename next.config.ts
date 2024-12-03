import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'api.origamid.online',
        port: '',
        pathname: '/imagens/**',
      },
    ],
  },
};




export default nextConfig;
