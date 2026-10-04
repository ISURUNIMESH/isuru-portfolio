import type { Metadata } from "next";
import { DataExperience } from "@/components/sections/DataExperience";
import { projectService } from "@/lib/projects/project-service";

export const metadata: Metadata = {
  title: "Explore",
};

export default function ExplorePage() {
  const projects = projectService.getAllProjects();
  const usage = projectService.getTechnologyUsage();
  return <DataExperience projects={projects} usage={usage} />;
}
