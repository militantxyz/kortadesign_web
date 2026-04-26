import { blogPosts } from "@/lib/korta-data";
import { SITE_TITLE, absoluteUrl, toIsoDateString } from "@/lib/seo";

function xmlEscape(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

export function GET() {
  const sortedPosts = [...blogPosts].sort((a, b) => {
    const aDate = new Date(a.date).getTime();
    const bDate = new Date(b.date).getTime();
    return bDate - aDate;
  });

  const itemsXml = sortedPosts
    .map((post) => {
      const url = absoluteUrl(`/${post.slug}`);
      const pubDate =
        toIsoDateString(post.date) ?? new Date().toISOString();

      return `<item>
  <title>${xmlEscape(post.title)}</title>
  <link>${xmlEscape(url)}</link>
  <guid>${xmlEscape(url)}</guid>
  <description>${xmlEscape(post.excerpt)}</description>
  <pubDate>${new Date(pubDate).toUTCString()}</pubDate>
</item>`;
    })
    .join("\n");

  const feed = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
<channel>
  <title>${xmlEscape(`${SITE_TITLE} Journal`)}</title>
  <link>${xmlEscape(absoluteUrl("/blog"))}</link>
  <description>${xmlEscape(
    "Design notes and guides for outdoor showers, stone wellness and open-air living."
  )}</description>
  <language>en-us</language>
  ${itemsXml}
</channel>
</rss>`;

  return new Response(feed, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
