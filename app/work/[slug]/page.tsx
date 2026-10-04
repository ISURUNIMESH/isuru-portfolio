import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProjectCaseStudy } from "@/components/sections/ProjectCaseStudy";
import { getAllProjectSlugs, projectService } from "@/lib/projects/project-service";

interface WorkSlugProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getAllProjectSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: WorkSlugProps): Promise<Metadata> {
  const { slug } = await params;
  const project = projectService.getProjectBySlug(slug);
  if (!project) return { title: "Project not found" };
  return { title: project.title, description: project.shortDescription };
}

export default async function WorkSlugPage({ params }: WorkSlugProps) {
  const { slug } = await params;
  const project = projectService.getProjectBySlug(slug);
  if (!project) notFound();

  const all = projectService.getAllProjects();
  const index = all.findIndex((item) => item.slug === project.slug);
  const related = projectService.getRelatedProjects(project.slug);

  return <ProjectCaseStudy project={project} related={related} index={Math.max(index, 0)} />;
}
