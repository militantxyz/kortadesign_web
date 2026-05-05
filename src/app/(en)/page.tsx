import type { Metadata } from "next";

import { HomePage } from "@/components/pages/home-page";
import { JsonLd } from "@/components/seo/json-ld";
import { getDictionary } from "@/lib/i18n";
import {
  buildBreadcrumbJsonLd,
  buildPageMetadata,
  buildWebPageJsonLd,
} from "@/lib/seo";

const dict = getDictionary("en");

export const metadata: Metadata = buildPageMetadata({
  title: dict.seo.homeTitle,
  description: dict.seo.homeDescription,
  path: "/",
  imagePath: "/assets/social/korta-baoli-dubai-marbella-share.jpg",
  imageAlt: "KORTA outdoor wellness collection",
  keywords: [
    "outdoor wellness design",
    "luxury outdoor living",
    "stone outdoor design",
  ],
  locale: "en",
});

export default function Home() {
  const webPageJsonLd = buildWebPageJsonLd({
    name: "KORTA Outdoor Wellness Design",
    description: dict.seo.homeDescription,
    path: "/",
    imagePath: "/assets/social/korta-baoli-dubai-marbella-share.jpg",
    locale: "en",
  });

  const breadcrumbJsonLd = buildBreadcrumbJsonLd([{ name: "Home", path: "/" }], "en");

  return (
    <>
      <JsonLd data={[webPageJsonLd, breadcrumbJsonLd]} />
      <HomePage locale="en" />
    </>
  );
}
