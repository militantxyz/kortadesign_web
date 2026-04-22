import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { BlogArticlePage, BlogPage } from "@/components/pages/blog-page";
import { CataloguesPage } from "@/components/pages/catalogues-page";
import { CollectionsPage } from "@/components/pages/collections-page";
import { ContactPage } from "@/components/pages/contact-page";
import { EuPage } from "@/components/pages/eu-page";
import { HrPage } from "@/components/pages/hr-page";
import { JoinPage } from "@/components/pages/join-page";
import { LegalPage } from "@/components/pages/legal-page";
import { ProductPage } from "@/components/pages/product-page";
import { ProjectsPage } from "@/components/pages/projects-page";
import { StoreLocatorPage } from "@/components/pages/store-locator-page";
import { StoryPage } from "@/components/pages/story-page";
import { SustainabilityPage } from "@/components/pages/sustainability-page";
import { blogMap, blogPosts, productMap, products } from "@/lib/korta-data";

const staticTitles: Record<string, string> = {
  collections: "Collections",
  "our-story": "Our Story",
  projects: "Projects",
  sustainability: "Sustainability",
  blog: "Blog",
  join: "Join",
  contact: "Contact",
  "store-locator": "Store Locator",
  catalogues: "Catalogues",
  legal: "Legal Notices",
  eu: "EU",
  hr: "Home",
};

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return [
    ...products.map((product) => ({ slug: product.slug })),
    ...blogPosts.map((post) => ({ slug: post.slug })),
    ...Object.keys(staticTitles).map((slug) => ({ slug })),
  ];
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = productMap.get(slug);
  const blogPost = blogMap.get(slug);
  const title = product?.title ?? blogPost?.title ?? staticTitles[slug];

  if (!title) return {};

  return {
    title: `${title} - KORTA`,
    description:
      product?.description[0] ??
      blogPost?.excerpt ??
      "KORTA creates timeless outdoor wellness products in natural stone.",
  };
}

export default async function SlugPage({ params }: PageProps) {
  const { slug } = await params;
  const product = productMap.get(slug);
  const blogPost = blogMap.get(slug);

  if (product) return <ProductPage product={product} />;
  if (blogPost) return <BlogArticlePage post={blogPost} />;

  switch (slug) {
    case "collections":
      return <CollectionsPage />;
    case "our-story":
      return <StoryPage />;
    case "projects":
      return <ProjectsPage />;
    case "sustainability":
      return <SustainabilityPage />;
    case "blog":
      return <BlogPage />;
    case "join":
      return <JoinPage />;
    case "contact":
      return <ContactPage />;
    case "store-locator":
      return <StoreLocatorPage />;
    case "catalogues":
      return <CataloguesPage />;
    case "legal":
      return <LegalPage />;
    case "eu":
      return <EuPage />;
    case "hr":
      return <HrPage />;
    default:
      notFound();
  }
}
