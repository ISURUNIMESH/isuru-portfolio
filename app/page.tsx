import { Hero } from "@/components/sections/Hero";
import { ProjectIndex } from "@/components/sections/ProjectIndex";
import { projectService } from "@/lib/projects/project-service";

export default function HomePage() {
  const projects = projectService.getAllProjects();

  return (
    <>
      <Hero />
      <section className="relative z-10 border-t border-line">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[12rem_1fr] lg:items-start">
          <p className="font-mono text-[11px] tracking-[0.2em] text-muted uppercase">
            Project index
          </p>
          <ProjectIndex projects={projects} layout="grid" />
        </div>
      </section>
    </>
  );
}
