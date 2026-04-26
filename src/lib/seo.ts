import type { Metadata } from "next";

import type { BlogPost, Product } from "@/lib/korta-data";
import type { Project } from "@/lib/projects-data";

export const DEFAULT_SITE_URL = "https://kortadesign.com";
export const SITE_NAME = "KORTA";
export const SITE_TITLE = "KORTA | Outdoor Wellness Design";
export const DEFAULT_DESCRIPTION =
  "KORTA creates timeless outdoor showers, kitchens, fire pieces and outdoor wellness objects in natural stone.";
export const DEFAULT_SHARE_IMAGE_PATH =
  "/assets/social/korta-baoli-dubai-marbella-share.jpg";
export const DEFAULT_SHARE_IMAGE_ALT =
  "KORTA Marbella outdoor shower in Baoli Dubai";
export const ORGANIZATION_LOGO_PATH = "/assets/uploads/2025/01/logo.b30c6336.svg";

const SOCIAL_PROFILES = [
  "https://www.facebook.com/kortadesign",
  "https://www.instagram.com/kortadesign/",
  "https://www.linkedin.com/company/korta-design?originalSubdomain=hr",
  "https://www.pinterest.com/kortadesign/",
];

export const DEFAULT_KEYWORDS = [
  "outdoor showers",
  "luxury outdoor shower",
  "stone outdoor shower",
  "outdoor wellness",
  "outdoor kitchen",
  "outdoor fireplace",
  "KORTA",
];

function normalizeSiteUrl(url: string) {
  const trimmed = url.trim();
  if (!trimmed) {
    return DEFAULT_SITE_URL;
  }

  const withProtocol = trimmed.startsWith("http")
    ? trimmed
    : `https://${trimmed}`;

  try {
    return new URL(withProtocol).toString().replace(/\/$/, "");
  } catch {
    return DEFAULT_SITE_URL;
  }
}

export const SITE_URL = normalizeSiteUrl(
  process.env.NEXT_PUBLIC_SITE_URL ?? DEFAULT_SITE_URL
);
export const METADATA_BASE = new URL(SITE_URL);

function normalizePath(path: string) {
  if (!path) {
    return "/";
  }

  return path.startsWith("/") ? path : `/${path}`;
}

export function absoluteUrl(path: string) {
  return new URL(normalizePath(path), SITE_URL).toString();
}

export function toIsoDateString(value?: string | Date) {
  if (!value) {
    return undefined;
  }

  const date = value instanceof Date ? value : new Date(value);
  if (Number.isNaN(date.getTime())) {
    return undefined;
  }

  return date.toISOString();
}

function uniqueKeywords(keywords: string[] = []) {
  return [...new Set([...DEFAULT_KEYWORDS, ...keywords])];
}

type PageMetadataOptions = {
  title: string;
  description: string;
  path: string;
  canonicalPath?: string;
  imagePath?: string;
  imageAlt?: string;
  keywords?: string[];
  noindex?: boolean;
  openGraphType?: "website" | "article";
};

export function buildPageMetadata({
  title,
  description,
  path,
  canonicalPath,
  imagePath = DEFAULT_SHARE_IMAGE_PATH,
  imageAlt,
  keywords = [],
  noindex = false,
  openGraphType = "website",
}: PageMetadataOptions): Metadata {
  const normalizedPath = normalizePath(path);
  const normalizedCanonical = normalizePath(canonicalPath ?? path);
  const resolvedImageAlt = imageAlt ?? title;

  return {
    title,
    description,
    keywords: uniqueKeywords(keywords),
    alternates: {
      canonical: normalizedCanonical,
    },
    openGraph: {
      type: openGraphType,
      siteName: SITE_NAME,
      locale: "en_US",
      url: normalizedPath,
      title,
      description,
      images: [
        {
          url: imagePath,
          alt: resolvedImageAlt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [
        {
          url: imagePath,
          alt: resolvedImageAlt,
        },
      ],
    },
    robots: noindex
      ? {
          index: false,
          follow: true,
          googleBot: {
            index: false,
            follow: true,
          },
        }
      : undefined,
  };
}

export function buildRootMetadata(): Metadata {
  const googleVerification =
    process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION ??
    process.env.GOOGLE_SITE_VERIFICATION;
  const bingVerification =
    process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION ??
    process.env.BING_SITE_VERIFICATION;

  const verification: Metadata["verification"] = {};
  if (googleVerification) {
    verification.google = googleVerification;
  }
  if (bingVerification) {
    verification.other = {
      "msvalidate.01": bingVerification,
    };
  }

  return {
    metadataBase: METADATA_BASE,
    applicationName: SITE_NAME,
    title: {
      default: SITE_TITLE,
      template: "%s | KORTA",
    },
    description: DEFAULT_DESCRIPTION,
    keywords: DEFAULT_KEYWORDS,
    alternates: {
      canonical: "/",
      types: {
        "application/rss+xml": "/feed.xml",
      },
    },
    formatDetection: {
      address: false,
      email: false,
      telephone: false,
    },
    category: "Outdoor Wellness Design",
    creator: SITE_NAME,
    publisher: SITE_NAME,
    openGraph: {
      type: "website",
      siteName: SITE_NAME,
      locale: "en_US",
      url: "/",
      title: SITE_TITLE,
      description: DEFAULT_DESCRIPTION,
      images: [
        {
          url: DEFAULT_SHARE_IMAGE_PATH,
          width: 1200,
          height: 812,
          alt: DEFAULT_SHARE_IMAGE_ALT,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: SITE_TITLE,
      description: DEFAULT_DESCRIPTION,
      images: [
        {
          url: DEFAULT_SHARE_IMAGE_PATH,
          alt: DEFAULT_SHARE_IMAGE_ALT,
        },
      ],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
    ...(Object.keys(verification).length ? { verification } : {}),
  };
}

type JsonLdNode = Record<string, unknown>;

export function stringifyJsonLd(data: JsonLdNode | JsonLdNode[]) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export function buildOrganizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    url: SITE_URL,
    logo: absoluteUrl(ORGANIZATION_LOGO_PATH),
    sameAs: SOCIAL_PROFILES,
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "customer support",
        email: "info@kortadesign.com",
        telephone: "+38552743776",
        availableLanguage: ["en", "hr"],
      },
    ],
  };
}

export function buildWebSiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_URL,
    inLanguage: "en",
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
    },
  };
}

type WebPageJsonLdOptions = {
  name: string;
  description: string;
  path: string;
  imagePath?: string;
};

export function buildWebPageJsonLd({
  name,
  description,
  path,
  imagePath,
}: WebPageJsonLdOptions) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name,
    description,
    url: absoluteUrl(path),
    ...(imagePath ? { primaryImageOfPage: absoluteUrl(imagePath) } : {}),
    isPartOf: {
      "@type": "WebSite",
      name: SITE_NAME,
      url: SITE_URL,
    },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
    },
  };
}

type BreadcrumbItem = {
  name: string;
  path: string;
};

export function buildBreadcrumbJsonLd(items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function buildProductJsonLd(product: Product) {
  const images = [product.heroImage, product.cardImage, ...product.gallery]
    .map((image) => absoluteUrl(image))
    .filter((value, index, array) => array.indexOf(value) === index);

  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: `${product.title} by ${SITE_NAME}`,
    category: product.type,
    description: product.description.join(" "),
    image: images,
    brand: {
      "@type": "Brand",
      name: SITE_NAME,
    },
    manufacturer: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
    },
    material: product.materials.map(
      (material) => `${material.title}: ${material.items.join(", ")}`
    ),
    additionalProperty: [
      {
        "@type": "PropertyValue",
        name: "Collection Zone",
        value: product.zone,
      },
    ],
    url: absoluteUrl(`/${product.slug}`),
  };
}

export function buildBlogPostingJsonLd(post: BlogPost) {
  const publishedDate = toIsoDateString(post.date);

  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    image: [absoluteUrl(post.image)],
    url: absoluteUrl(`/${post.slug}`),
    ...(publishedDate ? { datePublished: publishedDate, dateModified: publishedDate } : {}),
    author: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
    },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      logo: {
        "@type": "ImageObject",
        url: absoluteUrl(ORGANIZATION_LOGO_PATH),
      },
    },
    mainEntityOfPage: absoluteUrl(`/${post.slug}`),
    articleSection: "Outdoor wellness",
  };
}

export function buildProjectJsonLd(project: Project) {
  const images = [project.heroImage, ...project.gallery]
    .map((image) => absoluteUrl(image))
    .filter((value, index, array) => array.indexOf(value) === index);

  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: `${project.name} Project Reference`,
    description: project.description[0] ?? `${project.name} reference project by KORTA.`,
    image: images,
    url: absoluteUrl(`/projects/${project.slug}`),
    creator: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
    },
    locationCreated: {
      "@type": "Place",
      name: project.location,
    },
    ...(project.externalHref ? { sameAs: project.externalHref } : {}),
  };
}
