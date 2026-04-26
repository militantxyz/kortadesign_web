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
import { JsonLd } from "@/components/seo/json-ld";
import { asset, blogMap, blogPosts, productMap, products } from "@/lib/korta-data";
import {
  buildBlogPostingJsonLd,
  buildBreadcrumbJsonLd,
  buildPageMetadata,
  buildProductJsonLd,
  buildWebPageJsonLd,
} from "@/lib/seo";

type StaticSlug =
  | "collections"
  | "our-story"
  | "projects"
  | "sustainability"
  | "blog"
  | "join"
  | "contact"
  | "store-locator"
  | "catalogues"
  | "legal"
  | "eu"
  | "hr";

type StaticPageSeo = {
  title: string;
  description: string;
  imagePath: string;
  keywords: string[];
  canonicalPath?: string;
  noindex?: boolean;
};

const staticPageSeoBySlug: Record<StaticSlug, StaticPageSeo> = {
  collections: {
    title: "Outdoor Relaxation Zones",
    description:
      "Explore KORTA's AQUA, FUOCO and ARIA collections of outdoor showers, kitchens, fireplaces and design objects.",
    imagePath: asset("2025/01/CAP-SPA-34-1024x819.jpg"),
    keywords: ["outdoor collections", "AQUA FUOCO ARIA", "outdoor design zones"],
  },
  "our-story": {
    title: "Our Story",
    description:
      "Discover KORTA's Mediterranean design philosophy and craftsmanship behind our natural stone outdoor wellness products.",
    imagePath: asset("2025/01/baoli231-min-scaled.jpg"),
    keywords: ["KORTA story", "outdoor lifestyle", "Mediterranean design"],
  },
  projects: {
    title: "Iconic Projects",
    description:
      "See KORTA references in luxury hospitality destinations, private villas and signature residences worldwide.",
    imagePath: asset("2025/01/baoli231-min-scaled.jpg"),
    keywords: ["project references", "hospitality design", "luxury villas"],
  },
  sustainability: {
    title: "Sustainability",
    description:
      "Learn how KORTA combines long-lasting natural materials, local sourcing and timeless design for sustainable outdoor wellness.",
    imagePath: asset("2025/02/pexels-jakkel-418831-min-2048x1365.jpg"),
    keywords: ["sustainable outdoor design", "natural stone", "eco-conscious luxury"],
  },
  blog: {
    title: "KORTA Journal",
    description:
      "Planning notes, guides and inspiration for outdoor showers, poolside wellness and open-air living.",
    imagePath: asset("2025/01/IMG_0180-scaled-1-1024x683.jpg"),
    keywords: ["outdoor shower blog", "wellness journal", "design guides"],
  },
  join: {
    title: "Careers",
    description:
      "Join KORTA and help create handcrafted outdoor wellness products with a focus on design and detail.",
    imagePath: asset("2025/01/DSC9012-scaled.jpg"),
    keywords: ["KORTA careers", "design jobs", "stone craftsmanship"],
  },
  contact: {
    title: "Contact",
    description:
      "Contact KORTA for product inquiries, project support and distributor opportunities.",
    imagePath: asset("2025/01/CAP-ACC-EXT-21-scaled.jpg"),
    keywords: ["contact KORTA", "outdoor shower inquiries", "project support"],
  },
  "store-locator": {
    title: "Store Locator",
    description:
      "Find KORTA distributors and showroom partners worldwide for products, consultations and project support.",
    imagePath: asset("2025/02/RoomService-CapJuluca7.jpg"),
    keywords: ["store locator", "KORTA distributors", "showroom partners"],
  },
  catalogues: {
    title: "Catalogues & Downloads",
    description:
      "Download the KORTA catalogue and product spec sheets for outdoor showers, kitchens and wellness pieces.",
    imagePath: asset("2025/01/CAP-SPA-20-scaled-e1737646269147.jpg"),
    keywords: ["product catalogue", "spec sheets", "KORTA downloads"],
  },
  legal: {
    title: "Legal Notices",
    description:
      "Legal notices and policy information for the KORTA website.",
    imagePath: asset("2025/01/CAP-ACC-EXT-21-scaled.jpg"),
    keywords: ["legal notices", "website policies", "KORTA legal"],
  },
  eu: {
    title: "EU Project Information",
    description:
      "Official information about KORTA GROUP's EU co-financed internationalization project.",
    imagePath: asset("2025/01/HR-Sufinancira-EUROPSKA-UNIJA_POS_POS-1024x271-1.png"),
    keywords: ["EU project", "ERDF", "KORTA GROUP"],
  },
  hr: {
    title: "Home",
    description:
      "Handmade outdoor showers, kitchens and wellness objects in natural stone for villas, resorts and architectural gardens.",
    imagePath: "/assets/social/korta-baoli-dubai-marbella-share.jpg",
    canonicalPath: "/",
    noindex: true,
    keywords: ["KORTA"],
  },
};

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return [
    ...products.map((product) => ({ slug: product.slug })),
    ...blogPosts.map((post) => ({ slug: post.slug })),
    ...Object.keys(staticPageSeoBySlug).map((slug) => ({ slug })),
  ];
}

function getStaticPagePath(slug: StaticSlug) {
  return slug === "hr" ? "/" : `/${slug}`;
}

function renderStaticPage(slug: StaticSlug) {
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

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = productMap.get(slug);
  const blogPost = blogMap.get(slug);

  if (product) {
    return buildPageMetadata({
      title: `${product.title} ${product.type}`,
      description: product.description[0] ?? product.type,
      path: `/${slug}`,
      imagePath: product.heroImage,
      imageAlt: `${product.title} by KORTA`,
      keywords: [
        product.title.toLowerCase(),
        product.type.toLowerCase(),
        product.zone.toLowerCase(),
        "made to order",
      ],
    });
  }

  if (blogPost) {
    return buildPageMetadata({
      title: blogPost.title,
      description: blogPost.excerpt,
      path: `/${slug}`,
      imagePath: blogPost.image,
      imageAlt: blogPost.title,
      openGraphType: "article",
      keywords: ["outdoor shower guide", "outdoor wellness journal", "KORTA blog"],
    });
  }

  const staticPage = staticPageSeoBySlug[slug as StaticSlug];
  if (!staticPage) {
    return {};
  }

  return buildPageMetadata({
    title: staticPage.title,
    description: staticPage.description,
    path: getStaticPagePath(slug as StaticSlug),
    canonicalPath: staticPage.canonicalPath,
    imagePath: staticPage.imagePath,
    keywords: [...staticPage.keywords],
    noindex: staticPage.noindex,
  });
}

export default async function SlugPage({ params }: PageProps) {
  const { slug } = await params;
  const product = productMap.get(slug);
  const blogPost = blogMap.get(slug);

  if (product) {
    const productJsonLd = buildProductJsonLd(product);
    const breadcrumbJsonLd = buildBreadcrumbJsonLd([
      { name: "Home", path: "/" },
      { name: "Collections", path: "/collections" },
      { name: product.title, path: `/${product.slug}` },
    ]);
    const webPageJsonLd = buildWebPageJsonLd({
      name: `${product.title} ${product.type} | KORTA`,
      description: product.description[0] ?? product.type,
      path: `/${product.slug}`,
      imagePath: product.heroImage,
    });

    return (
      <>
        <JsonLd data={[productJsonLd, webPageJsonLd, breadcrumbJsonLd]} />
        <ProductPage product={product} />
      </>
    );
  }

  if (blogPost) {
    const blogPostingJsonLd = buildBlogPostingJsonLd(blogPost);
    const breadcrumbJsonLd = buildBreadcrumbJsonLd([
      { name: "Home", path: "/" },
      { name: "Blog", path: "/blog" },
      { name: blogPost.title, path: `/${blogPost.slug}` },
    ]);
    const webPageJsonLd = buildWebPageJsonLd({
      name: `${blogPost.title} | KORTA Journal`,
      description: blogPost.excerpt,
      path: `/${blogPost.slug}`,
      imagePath: blogPost.image,
    });

    return (
      <>
        <JsonLd data={[blogPostingJsonLd, webPageJsonLd, breadcrumbJsonLd]} />
        <BlogArticlePage post={blogPost} />
      </>
    );
  }

  const staticPage = staticPageSeoBySlug[slug as StaticSlug];
  if (!staticPage) {
    notFound();
  }

  const staticSlug = slug as StaticSlug;
  const staticPath = getStaticPagePath(staticSlug);
  const breadcrumbJsonLd =
    staticSlug === "hr"
      ? buildBreadcrumbJsonLd([{ name: "Home", path: "/" }])
      : buildBreadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: staticPage.title, path: staticPath },
        ]);
  const webPageJsonLd = buildWebPageJsonLd({
    name: `${staticPage.title} | KORTA`,
    description: staticPage.description,
    path: staticPath,
    imagePath: staticPage.imagePath,
  });

  return (
    <>
      <JsonLd data={[webPageJsonLd, breadcrumbJsonLd]} />
      {renderStaticPage(staticSlug)}
    </>
  );
}
