import path from "path";

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Avoid picking a parent lockfile outside this project (local monorepo noise)
  outputFileTracingRoot: path.join(__dirname),
  typescript: {
    // Keep typecheck on; do not ignore build errors
    ignoreBuildErrors: false,
  },
};

export default nextConfig;
