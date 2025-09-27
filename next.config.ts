import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // 간단: 고정 도메인
    domains: ["google.com"],

    // 정교: 패턴
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
