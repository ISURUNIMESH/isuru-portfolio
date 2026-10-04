import Link from "next/link";
import type { Project } from "@/lib/projects/project-schema";
import { getProjectHref } from "@/lib/projects/project-utils";

export function ProjectEcosystem({ projects }: { projects: Project[] }) {
  return (
    <section>
      <p className="kicker">Visualization 01</p>
      <h2 className="display display-section mt-3 text-white">Project ecosystem</h2>
      <p className="mt-3 max-w-xl text-sm text-muted">
        Each cluster is a project. The orbiting marks are its technologies.
      </p>
      <div className="mt-10 grid gap-6 md:grid-cols-2">
        {projects.map((project) => (
          <Link
            key={project.id}
            href={getProjectHref(project)}
            className="group relative min-h-[220px] overflow-hidden border border-line p-5 focus-visible:border-cyan sm:p-6"
          >
            <div
              className="absolute top-6 right-6 h-16 w-16 rounded-full opacity-40"
              style={{ background: project.color ?? "#7C3AED" }}
            />
            <p className="font-mono text-[10px] tracking-[0.18em] text-muted uppercase">
              {project.year}
            </p>
            <h3 className="mt-3 text-[clamp(1.25rem,4vw,1.6rem)] text-white transition group-hover:text-cyan group-focus-visible:text-cyan">
              {project.title}
              <span
                aria-hidden
                className="ml-2 inline-block text-cyan opacity-0 transition group-hover:opacity-100 group-focus-visible:opacity-100"
              >
                ↗
              </span>
            </h3>
            <div className="mt-8 flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="border border-line px-2 py-1 font-mono text-[10px] text-muted uppercase"
                >
                  {tech}
                </span>
              ))}
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
