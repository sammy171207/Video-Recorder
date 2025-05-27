import type { NextConfig } from "next";

const nextConfig: NextConfig = {
<<<<<<< HEAD
  eslint:{
    ignoreDuringBuilds:true,

  },
  typescript:{
    ignoreBuildErrors:true
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'jsm-video-record.b-cdn.net',
        port: '',
        pathname: '/**'
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
        port: '',
        pathname: '/**'
      }
    ]
  }
=======
  /* config options here */
>>>>>>> 52f6f89 (Initial commit from Create Next App)
};

export default nextConfig;
