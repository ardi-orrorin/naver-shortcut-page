import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  outputFileTracingRoot: __dirname,
  outputFileTracingIncludes: {
    "/*": ["node_modules/sharp/**/*"]
  },

  images: {
    qualities: [30, 40, 50, 60, 70, 80, 90, 100],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "openweathermap.org",
        port: "",
        pathname: "/**",
        search: ""
      }
    ]
  }
};

export default nextConfig;
