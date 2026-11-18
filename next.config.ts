import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  // Content files are read from disk on the server at build time only.
  // They are never bundled into client JavaScript.
  outputFileTracingIncludes: {
    "/**": ["./src/content/**/*"],
  },
  experimental: {
    optimizePackageImports: ["lucide-react", "motion"],
  },
};

export default nextConfig;
