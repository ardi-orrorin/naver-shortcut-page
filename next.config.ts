import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  outputFileTracingRoot: __dirname,
  outputFileTracingIncludes: {
    "/*": ["node_modules/sharp/**/*"]
  },
  images: {
    qualities: [30, 50, 70, 90, 100]
  }
};

export default nextConfig;
