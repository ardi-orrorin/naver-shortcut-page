import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    qualities: [70],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "s.pstatic.net",
        pathname: "/**",
        port: ""
      }
    ]
  }
};

export default nextConfig;
