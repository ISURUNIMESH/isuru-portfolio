import type { Project } from "@/lib/projects";
import { ProjectCard } from "./project-card";

export function SelectedWork({ projects }: { projects: Project[] }) {
  return (
    <section id="work" className="border-b border-line">
      <div className="mx-auto max-w-7xl px-6 py-20">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="kicker">01 — Selected work</p>
            <h2 className="display display-section mt-4 text-text">
              The catalog, not a highlight reel.
            </h2>
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-muted">
            Generated from the project registry. Add an object to
            data/projects.ts and this grid grows on the next build.
          </p>
        </div>
        <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
