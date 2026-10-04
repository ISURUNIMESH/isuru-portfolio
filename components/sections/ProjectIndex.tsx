"use client";

import type { Project } from "@/lib/projects/project-schema";
import { ProjectNavLink } from "@/components/ui/ProjectNavLink";

export function ProjectIndex({
  projects,
  label = "Project index",
  layout = "stack",
}: {
  projects: Project[];
  label?: string;
  layout?: "stack" | "grid";
}) {
  return (
    <nav
      aria-label={label}
      className={`project-index ${layout === "grid" ? "is-grid" : ""}`}
    >
      {projects.map((project, index) => (
        <ProjectNavLink key={project.id} project={project} index={index} />
      ))}
    </nav>
  );
}
