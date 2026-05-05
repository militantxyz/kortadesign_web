import { BlogPage } from "@/components/pages/blog-page";
import { CataloguesPage } from "@/components/pages/catalogues-page";
import { CollectionsPage } from "@/components/pages/collections-page";
import { ContactPage } from "@/components/pages/contact-page";
import { EuPage } from "@/components/pages/eu-page";
import { JoinPage } from "@/components/pages/join-page";
import { LegalPage } from "@/components/pages/legal-page";
import { ProjectsPage } from "@/components/pages/projects-page";
import { StoreLocatorPage } from "@/components/pages/store-locator-page";
import { StoryPage } from "@/components/pages/story-page";
import { SustainabilityPage } from "@/components/pages/sustainability-page";
import type { Locale } from "@/lib/i18n";
import { asset } from "@/lib/korta-data";

export const staticSlugs = [
  "collections",
  "our-story",
  "projects",
  "sustainability",
  "blog",
  "join",
  "contact",
  "store-locator",
  "catalogues",
  "legal",
  "eu",
] as const;

export type StaticSlug = (typeof staticSlugs)[number];

export function isStaticSlug(slug: string): slug is StaticSlug {
  return staticSlugs.includes(slug as StaticSlug);
}

export function renderStaticPage(slug: StaticSlug, locale: Locale) {
  switch (slug) {
    case "collections":
      return <CollectionsPage locale={locale} />;
    case "our-story":
      return <StoryPage locale={locale} />;
    case "projects":
      return <ProjectsPage locale={locale} />;
    case "sustainability":
      return <SustainabilityPage locale={locale} />;
    case "blog":
      return <BlogPage locale={locale} />;
    case "join":
      return <JoinPage locale={locale} />;
    case "contact":
      return <ContactPage locale={locale} />;
    case "store-locator":
      return <StoreLocatorPage locale={locale} />;
    case "catalogues":
      return <CataloguesPage locale={locale} />;
    case "legal":
      return <LegalPage locale={locale} />;
    case "eu":
      return <EuPage />;
    default:
      return null;
  }
}

export const staticPageImageBySlug: Record<StaticSlug, string> = {
  collections: asset("2025/01/CAP-SPA-34-1024x819.jpg"),
  "our-story": asset("2025/01/baoli231-min-scaled.jpg"),
  projects: asset("2025/01/baoli231-min-scaled.jpg"),
  sustainability: asset("2025/02/pexels-jakkel-418831-min-2048x1365.jpg"),
  blog: asset("2025/01/IMG_0180-scaled-1-1024x683.jpg"),
  join: asset("2025/01/DSC9012-scaled.jpg"),
  contact: asset("2025/01/CAP-ACC-EXT-21-scaled.jpg"),
  "store-locator": asset("2025/02/RoomService-CapJuluca7.jpg"),
  catalogues: asset("2025/01/CAP-SPA-20-scaled-e1737646269147.jpg"),
  legal: asset("2025/01/CAP-ACC-EXT-21-scaled.jpg"),
  eu: asset("2025/01/HR-Sufinancira-EUROPSKA-UNIJA_POS_POS-1024x271-1.png"),
};
