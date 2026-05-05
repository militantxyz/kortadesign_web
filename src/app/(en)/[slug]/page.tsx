import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { BlogArticlePage } from "@/components/pages/blog-page";
import { ProductPage } from "@/components/pages/product-page";
import { JsonLd } from "@/components/seo/json-ld";
import { getDictionary } from "@/lib/i18n";
import { blogMap, blogPosts, getLocalizedProduct, productMap, products } from "@/lib/korta-data";
import { buildBlogPostingJsonLd, buildBreadcrumbJsonLd, buildPageMetadata, buildProductJsonLd, buildWebPageJsonLd } from "@/lib/seo";
import { isStaticSlug, renderStaticPage, staticPageImageBySlug, staticSlugs } from "@/lib/site-router";

type PageProps = {
  params: Promise<{ slug: string }>;
};

const dict = getDictionary("en");

export function generateStaticParams() {
  return [
    ...products.map((product) => ({ slug: product.slug })),
    ...blogPosts.map((post) => ({ slug: post.slug })),
    ...staticSlugs.map((slug) => ({ slug })),
  ];
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = productMap.get(slug);
  const blogPost = blogMap.get(slug);

  if (product) {
    const localizedProduct = getLocalizedProduct(product, "en");

    return buildPageMetadata({
      title: `${localizedProduct.title} ${localizedProduct.type}`,
      description: localizedProduct.description[0] ?? localizedProduct.type,
      path: `/${slug}`,
      imagePath: localizedProduct.heroImage,
      imageAlt: `${localizedProduct.title} by KORTA`,
      keywords: [
        localizedProduct.title.toLowerCase(),
        localizedProduct.type.toLowerCase(),
        localizedProduct.zone.toLowerCase(),
        "made to order",
      ],
      locale: "en",
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
      locale: "en",
    });
  }

  if (!isStaticSlug(slug)) {
    return {};
  }

  const seo = dict.seo.staticPageSeo[slug];

  return buildPageMetadata({
    title: seo.title,
    description: seo.description,
    path: `/${slug}`,
    imagePath: staticPageImageBySlug[slug],
    keywords: [...seo.keywords],
    locale: "en",
  });
}

export default async function SlugPage({ params }: PageProps) {
  const { slug } = await params;
  const product = productMap.get(slug);
  const blogPost = blogMap.get(slug);

  if (product) {
    const localizedProduct = getLocalizedProduct(product, "en");
    const productJsonLd = buildProductJsonLd(localizedProduct, "en");
    const webPageJsonLd = buildWebPageJsonLd({
      name: `${localizedProduct.title} ${localizedProduct.type} | KORTA`,
      description: localizedProduct.description[0] ?? localizedProduct.type,
      path: `/${slug}`,
      imagePath: localizedProduct.heroImage,
      locale: "en",
    });
    const breadcrumbJsonLd = buildBreadcrumbJsonLd([
      { name: "Home", path: "/" },
      { name: localizedProduct.title, path: `/${slug}` },
    ], "en");

    return (
      <>
        <JsonLd data={[productJsonLd, webPageJsonLd, breadcrumbJsonLd]} />
        <ProductPage locale="en" product={localizedProduct} />
      </>
    );
  }

  if (blogPost) {
    const blogJsonLd = buildBlogPostingJsonLd(blogPost, "en");
    const webPageJsonLd = buildWebPageJsonLd({
      name: `${blogPost.title} | KORTA Journal`,
      description: blogPost.excerpt,
      path: `/${slug}`,
      imagePath: blogPost.image,
      locale: "en",
    });
    const breadcrumbJsonLd = buildBreadcrumbJsonLd([
      { name: "Home", path: "/" },
      { name: "Blog", path: "/blog" },
      { name: blogPost.title, path: `/${slug}` },
    ], "en");

    return (
      <>
        <JsonLd data={[blogJsonLd, webPageJsonLd, breadcrumbJsonLd]} />
        <BlogArticlePage locale="en" post={blogPost} />
      </>
    );
  }

  if (!isStaticSlug(slug)) {
    notFound();
  }

  return renderStaticPage(slug, "en");
}
