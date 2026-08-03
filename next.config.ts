import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/ghost-ai",
        destination: "/fusional-canvas",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
