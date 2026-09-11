import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        // Files in /public are served with `max-age=0` by default, so every
        // repeat visit pays a revalidation round-trip before the hero paints.
        // If you change one of these files, change its filename too.
        source: "/assets/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=86400, stale-while-revalidate=604800",
          },
        ],
      },
    ];
  },
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
