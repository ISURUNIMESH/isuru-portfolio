import type { Metadata } from "next";
import { ProjectArchive } from "@/components/sections/ProjectArchive";
import { ProjectExplorer } from "@/components/work/project-explorer";
import { projectService } from "@/lib/projects/project-service";

export const metadata: Metadata = {
  title: "Work",
};

export default function WorkPage() {
  const projects = projectService.getAllProjects();

  return (
    <>
      <ProjectArchive projects={projects} />
      <ProjectExplorer
        projects={projects}
        categories={projectService.getAllCategories()}
        technologies={projectService.getAllTechnologies()}
        statuses={projectService.getAllStatuses()}
      />
    </>
  );
}
