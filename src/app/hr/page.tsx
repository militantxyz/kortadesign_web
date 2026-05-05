import type { Metadata } from "next";

import { HomePage } from "@/components/pages/home-page";
import { JsonLd } from "@/components/seo/json-ld";
import { getDictionary } from "@/lib/i18n";
import {
  buildBreadcrumbJsonLd,
  buildPageMetadata,
  buildWebPageJsonLd,
} from "@/lib/seo";

const dict = getDictionary("hr");

export const metadata: Metadata = buildPageMetadata({
  title: dict.seo.homeTitle,
  description: dict.seo.homeDescription,
  path: "/",
  imagePath: "/assets/social/korta-baoli-dubai-marbella-share.jpg",
  imageAlt: "KORTA outdoor wellness collection",
  keywords: [
    "dizajn vanjskog wellnessa",
    "luksuzni život na otvorenom",
    "kameni vanjski dizajn",
  ],
  locale: "hr",
});

export default function CroatianHome() {
  const webPageJsonLd = buildWebPageJsonLd({
    name: "KORTA Dizajn vanjskog wellnessa",
    description: dict.seo.homeDescription,
    path: "/",
    imagePath: "/assets/social/korta-baoli-dubai-marbella-share.jpg",
    locale: "hr",
  });

  const breadcrumbJsonLd = buildBreadcrumbJsonLd([{ name: "Početna", path: "/" }], "hr");

  return (
    <>
      <JsonLd data={[webPageJsonLd, breadcrumbJsonLd]} />
      <HomePage locale="hr" />
    </>
  );
}
