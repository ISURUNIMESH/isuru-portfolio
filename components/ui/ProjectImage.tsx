"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import type { Project } from "@/lib/projects/project-schema";
import { getProjectHref } from "@/lib/projects/project-utils";
import { getProjectImageSrc, type ProjectImageRole } from "@/lib/projects/project-images";

type ObjectFit = "cover" | "contain";

interface ProjectImageProps {
  project: Project;
  role?: ProjectImageRole;
  src?: string;
  alt?: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
  fit?: ObjectFit;
  showFallbackCta?: boolean;
}

export function ProjectImage({
  project,
  role = "cover",
  src,
  alt,
  className = "",
  sizes = "(max-width: 768px) 100vw, 50vw",
  priority = false,
  fit = "cover",
  showFallbackCta = true,
}: ProjectImageProps) {
  const resolved = (src ?? getProjectImageSrc(project, role))?.trim() || undefined;
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);
  const showImage = Boolean(resolved) && !failed;
  const label = alt ?? `${project.title} project preview`;

  return (
    <div className={`project-image-shell relative overflow-hidden bg-ink-2 ${className}`}>
      <div
        className={`project-image-skeleton absolute inset-0 ${
          showImage && loaded ? "opacity-0" : "opacity-100"
        }`}
        aria-hidden
      >
        <div className="project-image-sheen absolute inset-0" />
        <p className="absolute inset-x-4 top-1/2 -translate-y-1/2 text-center font-display text-xl text-white/25 sm:inset-x-6 sm:text-2xl">
          {project.title}
        </p>
      </div>

      {showImage ? (
        <Image
          src={resolved!}
          alt={label}
          fill
          sizes={sizes}
          priority={priority}
          className={`project-image-media ${
            fit === "contain" ? "object-contain" : "object-cover"
          } ${loaded ? "is-loaded" : ""}`}
          onLoad={() => setLoaded(true)}
          onError={() => {
            setFailed(true);
            if (process.env.NODE_ENV === "development") {
              console.warn(
                `[project-images] Failed to load visual for "${project.title}": ${resolved}`,
              );
            }
          }}
        />
      ) : (
        <ProjectImageFallback
          project={project}
          showCta={showFallbackCta}
        />
      )}
    </div>
  );
}

function ProjectImageFallback({
  project,
  showCta,
}: {
  project: Project;
  showCta: boolean;
}) {
  const href = getProjectHref(project);
  const color = project.color ?? "#7C3AED";

  return (
    <div
      className="absolute inset-0 flex flex-col justify-between p-6"
      style={{
        background: `radial-gradient(1200px 400px at 10% 0%, ${color}22, transparent 45%), #151C2C`,
      }}
    >
      <p className="font-mono text-[10px] tracking-[0.28em] text-cyan uppercase">
        Project visual
      </p>
      <div>
        <h3 className="display text-3xl text-white sm:text-4xl">{project.title}</h3>
        {showCta ? (
          <span className="mt-4 inline-flex font-mono text-[11px] tracking-[0.18em] text-cyan uppercase">
            View case study →
          </span>
        ) : (
          <Link
            href={href}
            className="mt-4 inline-flex font-mono text-[11px] tracking-[0.18em] text-cyan uppercase"
          >
            View case study →
          </Link>
        )}
      </div>
    </div>
  );
}
