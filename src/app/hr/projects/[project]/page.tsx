import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ProjectDetailPage } from "@/components/pages/projects-page";
import { JsonLd } from "@/components/seo/json-ld";
import { projectMap, projects } from "@/lib/projects-data";
import { buildBreadcrumbJsonLd, buildPageMetadata, buildProjectJsonLd, buildWebPageJsonLd } from "@/lib/seo";

type PageProps = {
  params: Promise<{ project: string }>;
};

export function generateStaticParams() {
  return projects.map((project) => ({ project: project.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { project } = await params;
  const entry = projectMap.get(project);

  if (!entry) return {};

  return buildPageMetadata({
    title: `${entry.name} ${"referenca projekta"}`,
    description: entry.description[0] ?? `${entry.name} by KORTA.`,
    path: `/projects/${entry.slug}`,
    imagePath: entry.heroImage,
    imageAlt: `${entry.name} project by KORTA`,
    keywords: [
      "referenca projekta",
      "projekt vanjskog wellnessa",
      entry.location.toLowerCase(),
    ],
    locale: "hr",
  });
}

export default async function CroatianProjectPage({ params }: PageProps) {
  const { project } = await params;
  const entry = projectMap.get(project);

  if (!entry) notFound();

  const projectJsonLd = buildProjectJsonLd(entry, "hr");
  const webPageJsonLd = buildWebPageJsonLd({
    name: `${entry.name} Referenca projekta | KORTA`,
    description: entry.description[0] ?? `${entry.name} by KORTA.`,
    path: `/projects/${entry.slug}`,
    imagePath: entry.heroImage,
    locale: "hr",
  });
  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
    { name: "Početna", path: "/" },
    { name: "Projekti", path: "/projects" },
    { name: entry.name, path: `/projects/${entry.slug}` },
  ], "hr");

  return (
    <>
      <JsonLd data={[projectJsonLd, webPageJsonLd, breadcrumbJsonLd]} />
      <ProjectDetailPage locale="hr" project={entry} />
    </>
  );
}
