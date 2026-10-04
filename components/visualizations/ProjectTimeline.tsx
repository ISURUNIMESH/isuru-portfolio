import type { Project } from "@/lib/projects/project-schema";
import { getProjectsByYear } from "@/lib/projects/project-utils";
import { ProjectNavLink } from "@/components/ui/ProjectNavLink";

export function ProjectTimeline({ projects }: { projects: Project[] }) {
  const years = getProjectsByYear(projects);

  return (
    <section>
      <p className="kicker">Visualization 03</p>
      <h2 className="display display-section mt-3 text-white">Project timeline</h2>
      <div className="mt-8 space-y-10 sm:mt-12 sm:space-y-12">
        {years.map((entry) => (
          <div key={entry.year} className="grid gap-4 md:grid-cols-[7rem_1fr] md:gap-6">
            <p className="display text-[clamp(1.8rem,6vw,2.4rem)] text-cyan">{entry.year}</p>
            <div className="border-l border-line pl-4 sm:pl-6">
              {entry.projects.map((project) => (
                <ProjectNavLink key={project.id} project={project} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
