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

const dict = getDictionary("hr");

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
    const localizedProduct = getLocalizedProduct(product, "hr");

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
        "izrađuje se po narudžbi",
      ],
      locale: "hr",
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
      keywords: ["vodič za vanjski tuš", "journal vanjskog wellnessa", "KORTA blog"],
      locale: "hr",
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
    locale: "hr",
  });
}

export default async function CroatianSlugPage({ params }: PageProps) {
  const { slug } = await params;
  const product = productMap.get(slug);
  const blogPost = blogMap.get(slug);

  if (product) {
    const localizedProduct = getLocalizedProduct(product, "hr");
    const productJsonLd = buildProductJsonLd(localizedProduct, "hr");
    const webPageJsonLd = buildWebPageJsonLd({
      name: `${localizedProduct.title} ${localizedProduct.type} | KORTA`,
      description: localizedProduct.description[0] ?? localizedProduct.type,
      path: `/${slug}`,
      imagePath: localizedProduct.heroImage,
      locale: "hr",
    });
    const breadcrumbJsonLd = buildBreadcrumbJsonLd([
      { name: "Početna", path: "/" },
      { name: localizedProduct.title, path: `/${slug}` },
    ], "hr");

    return (
      <>
        <JsonLd data={[productJsonLd, webPageJsonLd, breadcrumbJsonLd]} />
        <ProductPage locale="hr" product={localizedProduct} />
      </>
    );
  }

  if (blogPost) {
    const blogJsonLd = buildBlogPostingJsonLd(blogPost, "hr");
    const webPageJsonLd = buildWebPageJsonLd({
      name: `${blogPost.title} | KORTA Journal`,
      description: blogPost.excerpt,
      path: `/${slug}`,
      imagePath: blogPost.image,
      locale: "hr",
    });
    const breadcrumbJsonLd = buildBreadcrumbJsonLd([
      { name: "Početna", path: "/" },
      { name: "Blog", path: "/blog" },
      { name: blogPost.title, path: `/${slug}` },
    ], "hr");

    return (
      <>
        <JsonLd data={[blogJsonLd, webPageJsonLd, breadcrumbJsonLd]} />
        <BlogArticlePage locale="hr" post={blogPost} />
      </>
    );
  }

  if (!isStaticSlug(slug)) {
    notFound();
  }

  return renderStaticPage(slug, "hr");
}
