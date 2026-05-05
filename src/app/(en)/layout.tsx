import type { Metadata } from "next";

import { SiteShell } from "@/components/site-shell";
import { rootFontClassName } from "@/lib/fonts";
import { buildRootMetadata } from "@/lib/seo";
import "../globals.css";

export const metadata: Metadata = buildRootMetadata("en");

export default function EnglishLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      data-scroll-behavior="smooth"
      lang="en"
      className={rootFontClassName}
    >
      <body className="min-h-full">
        <SiteShell locale="en">{children}</SiteShell>
      </body>
    </html>
  );
}
