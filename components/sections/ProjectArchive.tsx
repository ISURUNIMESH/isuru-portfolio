"use client";

import Link from "next/link";
import { useRef } from "react";
import type { Project } from "@/lib/projects/project-schema";
import { getProjectHref } from "@/lib/projects/project-utils";
import { ProjectMediaFrame } from "@/components/work/project-media-frame";
import { ProjectIndex } from "@/components/sections/ProjectIndex";
import { useIsMobile, usePointer, usePrefersReducedMotion } from "@/lib/motion-prefs";

export function ProjectArchive({ projects }: { projects: Project[] }) {
  const stage = useRef<HTMLDivElement>(null);
  const pointer = usePointer();
  const reduced = usePrefersReducedMotion();
  const mobile = useIsMobile();
  const spatial = !reduced && !mobile;

  return (
    <div className="relative px-4 pt-24 pb-20 sm:px-6 sm:pt-28 sm:pb-24">
      <div className="mx-auto max-w-7xl">
        <p className="kicker">A little about what I make</p>
        <h1 className="display-page display mt-5 max-w-4xl text-text">
          Thoughtful work,
          <span className="italic text-cyan"> made with care.</span>
        </h1>
        <p className="mt-5 max-w-xl text-base leading-7 text-muted">A collection of software, data, and machine learning projects. Pick a project to see how it came together.</p>
        <div className="mt-10">
          <ProjectIndex projects={projects} layout="grid" />
        </div>
      </div>
      <div
        ref={stage}
        className="perspective-stage mx-auto mt-12 max-w-7xl sm:mt-16"
        style={
          spatial
            ? {
                transform: `rotateX(${pointer.y * -6}deg) rotateY(${pointer.x * 8}deg)`,
              }
            : undefined
        }
      >
        <div className="grid gap-5 sm:gap-6 md:grid-cols-2 xl:grid-cols-3">
          {projects.map((project, index) => (
            <Link
              key={project.id}
              href={getProjectHref(project)}
              className="archive-panel group panel relative block overflow-hidden rounded-2xl"
              style={{
                transform: spatial ? `translateZ(${(index % 3) * 18}px)` : undefined,
              }}
            >
              <ProjectMediaFrame
                project={project}
                role="thumbnail"
                variant="card"
                className="aspect-video w-full"
                sizes="(max-width: 768px) 100vw, 33vw"
                priority={index < 3}
              />
              <div className="space-y-3 p-5 sm:p-6">
                <p className="font-mono text-[10px] tracking-[0.2em] text-muted uppercase">
                  {String(index + 1).padStart(2, "0")} / {project.year}
                </p>
                <h2 className="flex items-start justify-between gap-3 text-xl font-medium text-text sm:text-2xl">
                  <span className="transition group-hover:text-cyan group-focus-visible:text-cyan">
                    {project.title}
                  </span>
                  <span
                    aria-hidden
                    className="translate-x-1 text-cyan opacity-0 transition group-hover:translate-x-0 group-hover:opacity-100 group-focus-visible:opacity-100"
                  >
                    ↗
                  </span>
                </h2>
                <p className="font-mono text-[10px] tracking-[0.16em] text-muted uppercase">
                  {project.category.join(" · ")}
                </p>
                <p className="text-xs text-muted">
                  {project.technologies.slice(0, 4).join(" / ")}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
