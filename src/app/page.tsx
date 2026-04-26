import type { Metadata } from "next";

import { HomePage } from "@/components/pages/home-page";
import { JsonLd } from "@/components/seo/json-ld";
import {
  buildBreadcrumbJsonLd,
  buildPageMetadata,
  buildWebPageJsonLd,
} from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Outdoor Wellness Design",
  description:
    "Handmade outdoor showers, kitchens and wellness objects in natural stone for villas, resorts and architectural gardens.",
  path: "/",
  imagePath: "/assets/social/korta-baoli-dubai-marbella-share.jpg",
  imageAlt: "KORTA outdoor wellness collection",
  keywords: [
    "outdoor wellness design",
    "luxury outdoor living",
    "stone outdoor design",
  ],
});

export default function Home() {
  const webPageJsonLd = buildWebPageJsonLd({
    name: "KORTA Outdoor Wellness Design",
    description:
      "Handmade outdoor showers, kitchens and wellness objects in natural stone for villas, resorts and architectural gardens.",
    path: "/",
    imagePath: "/assets/social/korta-baoli-dubai-marbella-share.jpg",
  });

  const breadcrumbJsonLd = buildBreadcrumbJsonLd([{ name: "Home", path: "/" }]);

  return (
    <>
      <JsonLd data={[webPageJsonLd, breadcrumbJsonLd]} />
      <HomePage />
    </>
  );
}
