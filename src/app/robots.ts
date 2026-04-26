import type { MetadataRoute } from "next";

import { SITE_URL, absoluteUrl } from "@/lib/seo";

const disallowedPaths = ["/api/"];
const host = new URL(SITE_URL).host;

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: disallowedPaths,
      },
      {
        userAgent: [
          "Googlebot",
          "Googlebot-Image",
          "Googlebot-News",
          "Google-Extended",
          "Bingbot",
          "Applebot",
        ],
        allow: "/",
        disallow: disallowedPaths,
      },
      {
        userAgent: [
          "GPTBot",
          "OAI-SearchBot",
          "ChatGPT-User",
          "PerplexityBot",
          "ClaudeBot",
          "anthropic-ai",
          "CCBot",
        ],
        allow: "/",
        disallow: disallowedPaths,
      },
    ],
    sitemap: [absoluteUrl("/sitemap.xml")],
    host,
  };
}
