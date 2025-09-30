import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  outputFileTracingRoot: __dirname,
  outputFileTracingIncludes: {
    "/*": ["node_modules/sharp/**/*"] // sharp 바이너리 강제 포함
  },
  images: {
    qualities: [70]
    // remotePatterns: [
    //   {
    //     protocol: "https",
    //     hostname: "s.pstatic.net",
    //     pathname: "/**",
    //     port: ""
    //   }
    // ]
  }
};

export default nextConfig;
