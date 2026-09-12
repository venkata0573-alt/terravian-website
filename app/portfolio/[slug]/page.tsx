import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { projectBySlug, projects } from "@/content/projects";
import { PROPERTY_TYPE_LABELS } from "@/types/project";
import { demoMetadata } from "@/lib/metadata";
import { CaseStudy } from "@/components/portfolio/CaseStudy";

/**
 * Project detail route — thin shell around the reusable premium case-study
 * template (components/portfolio/CaseStudy.tsx). All six current projects
 * are demonstrations: noindex, nofollow, excluded from the sitemap.
 * CreativeWork schema is intentionally omitted — page content does not
 * support real claims yet.
 */
export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = projectBySlug(slug);
  if (!project) return {};
  return demoMetadata({
    path: `/portfolio/${project.slug}`,
    title: project.title,
    description: `${project.title} — ${PROPERTY_TYPE_LABELS[project.propertyType]} project from the Terravian portfolio.`,
  });
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = projectBySlug(slug);
  if (!project) notFound();

  const related = project.relatedProjectSlugs
    .map(projectBySlug)
    .filter((p): p is NonNullable<typeof p> => Boolean(p));

  return <CaseStudy project={project} related={related} />;
}
