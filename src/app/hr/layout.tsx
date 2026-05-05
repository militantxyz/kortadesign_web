import type { Metadata } from "next";

import { SiteShell } from "@/components/site-shell";
import { rootFontClassName } from "@/lib/fonts";
import { buildRootMetadata } from "@/lib/seo";
import "../globals.css";

export const metadata: Metadata = buildRootMetadata("hr");

export default function CroatianLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      data-scroll-behavior="smooth"
      lang="hr"
      className={rootFontClassName}
    >
      <body className="min-h-full">
        <SiteShell locale="hr">{children}</SiteShell>
      </body>
    </html>
  );
}
