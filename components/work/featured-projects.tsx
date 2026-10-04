import Link from "next/link";
import type { Project } from "@/lib/projects/project-schema";
import { getProjectHref } from "@/lib/projects/project-utils";
import { ProjectMediaFrame } from "./project-media-frame";

export function FeaturedProjects({ projects }: { projects: Project[] }) {
  if (projects.length === 0) return null;

  return (
    <section id="featured" className="border-b border-line">
      <div className="mx-auto max-w-7xl px-6 py-20">
        <p className="kicker">02 — Featured</p>
        <h2 className="display display-section mt-4 max-w-3xl text-text">
          Flagship systems, selected by data.
        </h2>
        <p className="mt-4 max-w-xl text-sm text-muted">
          Anything with <code className="text-cyan">featured: true</code> lands
          here. No extra component edits.
        </p>
        <div className="mt-12 space-y-6">
          {projects.map((project, index) => (
            <Link
              key={project.id}
              href={getProjectHref(project)}
              className="group panel grid overflow-hidden md:grid-cols-[1.15fr_0.85fr]"
            >
              <ProjectMediaFrame
                project={project}
                role="cover"
                variant="featured"
                className="aspect-video w-full md:aspect-auto md:min-h-[340px] md:h-full"
                sizes="(max-width: 768px) 100vw, 55vw"
                priority={index === 0}
              />
              <div className="flex flex-col justify-between p-7">
                <div>
                  <p className="font-mono text-[10px] tracking-[0.22em] text-muted uppercase">
                    {String(index + 1).padStart(2, "0")} / {project.year}
                  </p>
                  <h3 className="display mt-3 text-4xl text-text group-hover:text-cyan">
                    {project.title}
                  </h3>
                  <p className="mt-4 text-sm leading-relaxed text-muted">
                    {project.shortDescription}
                  </p>
                </div>
                <div className="mt-8 flex flex-wrap gap-2">
                  {project.technologies.slice(0, 6).map((technology) => (
                    <span
                      key={technology}
                      className="border border-line px-2 py-1 font-mono text-[10px] tracking-[0.12em] text-muted uppercase"
                    >
                      {technology}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
