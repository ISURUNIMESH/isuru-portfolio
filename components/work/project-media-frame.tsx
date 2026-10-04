"use client";

import { ProjectImage } from "@/components/ui/ProjectImage";
import type { Project } from "@/lib/projects/project-schema";
import type { ProjectImageRole } from "@/lib/projects/project-images";

interface ProjectMediaFrameProps {
  project: Project;
  role?: ProjectImageRole;
  src?: string;
  alt?: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
  fit?: "cover" | "contain";
  variant?: "card" | "featured" | "hero" | "gallery";
}

export function ProjectMediaFrame({
  project,
  role = "cover",
  src,
  alt,
  className = "",
  sizes,
  priority,
  fit = "cover",
  variant = "card",
}: ProjectMediaFrameProps) {
  return (
    <div
      className={`project-frame project-frame-${variant} relative overflow-hidden ${className}`}
    >
      <ProjectImage
        project={project}
        role={role}
        src={src}
        alt={alt}
        sizes={sizes}
        priority={priority ?? (variant === "hero" || project.featured)}
        fit={fit}
        className="absolute inset-0 h-full w-full"
        showFallbackCta={variant !== "gallery"}
      />
      <div className="project-frame-veil pointer-events-none absolute inset-0" />
    </div>
  );
}
