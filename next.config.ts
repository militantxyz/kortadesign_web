import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    contentDispositionType: "inline",
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 60 * 60 * 24 * 14,
    qualities: [60, 70, 75, 82, 90],
  },
};

export default nextConfig;
