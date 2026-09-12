import type { NextConfig } from "next";

// Deployment assumption (per spec): Node-hosted Next.js, App Router.
// Do NOT add `output: "export"` — the form route handlers require the Node runtime.
// `standalone` produces the self-contained server the Dockerfile runs.
const nextConfig: NextConfig = {
  output: "standalone",
  images: {
    formats: ["image/avif", "image/webp"],
    // Showcase photography (case-study heroes and season imagery) requests
    // quality={90}; the optimizer only allows values listed here.
    qualities: [75, 90],
  },
  // Legacy service URLs: grounds maintenance and seasonal enhancements
  // were merged into the single Landscape & Maintenance service.
  async redirects() {
    return [
      {
        source: "/services/lawn-grounds-maintenance",
        destination: "/services/commercial-landscaping",
        permanent: true,
      },
      {
        source: "/services/seasonal-enhancements",
        destination: "/services/commercial-landscaping",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
