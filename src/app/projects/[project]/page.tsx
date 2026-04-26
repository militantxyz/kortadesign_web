import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ProjectDetailPage } from "@/components/pages/projects-page";
import { JsonLd } from "@/components/seo/json-ld";
import { projectMap, projects } from "@/lib/projects-data";
import {
  buildBreadcrumbJsonLd,
  buildPageMetadata,
  buildProjectJsonLd,
  buildWebPageJsonLd,
} from "@/lib/seo";

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
    title: `${entry.name} Project Reference`,
    description: entry.description[0] ?? `${entry.name} by KORTA.`,
    path: `/projects/${entry.slug}`,
    imagePath: entry.heroImage,
    imageAlt: `${entry.name} project by KORTA`,
    keywords: [
      "project reference",
      "outdoor wellness project",
      entry.location.toLowerCase(),
    ],
  });
}

export default async function ProjectPage({ params }: PageProps) {
  const { project } = await params;
  const entry = projectMap.get(project);

  if (!entry) notFound();

  const projectJsonLd = buildProjectJsonLd(entry);
  const webPageJsonLd = buildWebPageJsonLd({
    name: `${entry.name} Project Reference | KORTA`,
    description: entry.description[0] ?? `${entry.name} by KORTA.`,
    path: `/projects/${entry.slug}`,
    imagePath: entry.heroImage,
  });
  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "Projects", path: "/projects" },
    { name: entry.name, path: `/projects/${entry.slug}` },
  ]);

  return (
    <>
      <JsonLd data={[projectJsonLd, webPageJsonLd, breadcrumbJsonLd]} />
      <ProjectDetailPage project={entry} />
    </>
  );
}
