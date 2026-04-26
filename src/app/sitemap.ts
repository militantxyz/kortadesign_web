import type { MetadataRoute } from "next";

import { blogPosts, products } from "@/lib/korta-data";
import { projects } from "@/lib/projects-data";
import { absoluteUrl } from "@/lib/seo";

const staticRoutes = [
  "/",
  "/collections",
  "/our-story",
  "/projects",
  "/sustainability",
  "/blog",
  "/join",
  "/contact",
  "/store-locator",
  "/catalogues",
  "/legal",
  "/eu",
] as const;

function parseDate(input: string) {
  const date = new Date(input);
  return Number.isNaN(date.getTime()) ? undefined : date;
}

const latestBlogDate =
  blogPosts
    .map((post) => parseDate(post.date))
    .filter((date): date is Date => Boolean(date))
    .sort((a, b) => b.getTime() - a.getTime())[0] ?? new Date();

export default function sitemap(): MetadataRoute.Sitemap {
  const staticEntries: MetadataRoute.Sitemap = staticRoutes.map((path) => ({
    url: absoluteUrl(path),
    lastModified: latestBlogDate,
    changeFrequency: path === "/" ? "weekly" : "monthly",
    priority: path === "/" ? 1 : path === "/collections" ? 0.95 : 0.8,
  }));

  const productEntries: MetadataRoute.Sitemap = products.map((product) => ({
    url: absoluteUrl(`/${product.slug}`),
    lastModified: latestBlogDate,
    changeFrequency: "weekly",
    priority: 0.88,
    images: [absoluteUrl(product.heroImage)],
  }));

  const blogEntries: MetadataRoute.Sitemap = blogPosts.map((post) => ({
    url: absoluteUrl(`/${post.slug}`),
    lastModified: parseDate(post.date) ?? latestBlogDate,
    changeFrequency: "monthly",
    priority: 0.72,
    images: [absoluteUrl(post.image)],
  }));

  const projectEntries: MetadataRoute.Sitemap = projects.map((project) => ({
    url: absoluteUrl(`/projects/${project.slug}`),
    lastModified: latestBlogDate,
    changeFrequency: "monthly",
    priority: 0.76,
    images: [absoluteUrl(project.heroImage)],
  }));

  return [...staticEntries, ...productEntries, ...blogEntries, ...projectEntries];
}
