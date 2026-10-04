import Link from "next/link";
import type { Project } from "@/lib/projects/project-schema";
import { getProjectHref } from "@/lib/projects/project-utils";
import { ProjectMediaFrame } from "./project-media-frame";

export function ProjectCard({
  project,
  index,
}: {
  project: Project;
  index?: number;
}) {
  return (
    <Link
      href={getProjectHref(project)}
      className="group panel relative flex h-full flex-col overflow-hidden transition duration-200 hover:-translate-y-1 hover:border-[#C4B5FD] hover:shadow-[0_18px_44px_rgba(76,29,149,.12)]"
    >
      <ProjectMediaFrame
        project={project}
        role="thumbnail"
        variant="card"
        className="aspect-video w-full"
        sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
      />
      <div className="flex flex-1 flex-col gap-4 p-5 sm:p-6">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="font-mono text-[10px] tracking-[0.14em] text-muted uppercase">
              {index !== undefined ? String(index + 1).padStart(2, "0") : project.year}{" "}
              / {project.status}
            </p>
            <h3 className="mt-2 text-xl font-medium text-text transition group-hover:text-cyan sm:text-2xl">
              {project.title}
            </h3>
          </div>
          {project.featured ? (
            <span className="rounded-full bg-[#2B1F45] px-2.5 py-1 font-mono text-[10px] tracking-[0.12em] text-violet uppercase">
              Featured
            </span>
          ) : null}
        </div>
        <p className="line-clamp-3 text-sm leading-relaxed text-muted">
          {project.shortDescription}
        </p>
        <div className="mt-auto flex flex-wrap gap-2">
          {project.category.map((category) => (
            <span
              key={category}
              className="rounded-full bg-[#1B2436] px-2.5 py-1 font-mono text-[10px] tracking-[0.08em] text-muted uppercase"
            >
              {category}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}
