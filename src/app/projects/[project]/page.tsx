import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ProjectDetailPage } from "@/components/pages/projects-page";
import { projectMap, projects } from "@/lib/projects-data";

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

  return {
    title: `${entry.name} - KORTA`,
    description: entry.description[0] ?? `${entry.name} by KORTA.`,
  };
}

export default async function ProjectPage({ params }: PageProps) {
  const { project } = await params;
  const entry = projectMap.get(project);

  if (!entry) notFound();

  return <ProjectDetailPage project={entry} />;
}
