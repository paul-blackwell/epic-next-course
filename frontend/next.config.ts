import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '1337',
        pathname: '/uploads/**/*',
      },
    ],
  },
  experimental: {
    serverActions: {
      bodySizeLimit: '5mb', // Default is '1mb'
    },
  },
};

export default nextConfig;
