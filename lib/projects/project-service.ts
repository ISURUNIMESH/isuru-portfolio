import "server-only";

import { projectRecords } from "@/data/projects";
import {
  type Project,
  type ProjectStatus,
  validateProjects,
} from "./project-schema";
import {
  sanitizeProjectImages,
} from "./validate-project-images";
import {
  filterProjects,
  getAllCategories,
  getAllStatuses,
  getAllTechnologies,
  getCategoryDistribution,
  getFeaturedProjects,
  getProjectHref,
  getProjectStatistics,
  getProjectTechnologyGraph,
  getProjectsByCategory,
  getProjectsByTechnology,
  getRelatedProjects,
  getSkillConstellation,
  getTechnologyRelationships,
  getTechnologyUsage,
  sortProjects,
  type CategoryDistribution,
  type ProjectFilters,
  type ProjectGraph,
  type ProjectStatistics,
  type TechnologyUsage,
} from "./project-utils";

/**
 * Repository contract for project content.
 * Swap the local data source (data/projects.ts) with Sanity, Contentful,
 * Supabase, or a custom admin API by implementing this interface.
 */
export interface ProjectRepository {
  getAllProjects(): Project[];
  getProjectBySlug(slug: string): Project | undefined;
  getProjectById(id: string): Project | undefined;
  getFeaturedProjects(): Project[];
  getProjectsByCategory(category: string): Project[];
  getProjectsByTechnology(technology: string): Project[];
  getAllCategories(): string[];
  getAllTechnologies(): string[];
  getAllStatuses(): ProjectStatus[];
  getTechnologyUsage(): TechnologyUsage[];
  getCategoryDistribution(): CategoryDistribution[];
  getProjectStatistics(): ProjectStatistics;
  getTechnologyRelationships(): ProjectGraph;
  getProjectTechnologyGraph(): ProjectGraph;
  getSkillConstellation(): ProjectGraph;
  filterProjects(filters?: ProjectFilters): Project[];
  getRelatedProjects(slug: string, limit?: number): Project[];
  getProjectHref(project: Pick<Project, "slug">): string;
}

class LocalProjectRepository implements ProjectRepository {
  private readonly source: Project[];

  constructor(source: unknown) {
    this.source = sortProjects(validateProjects(source));
  }

  private catalog(): Project[] {
    return this.source.map(sanitizeProjectImages);
  }

  getAllProjects(): Project[] {
    return this.catalog();
  }

  getProjectBySlug(slug: string): Project | undefined {
    return this.catalog().find((project) => project.slug === slug);
  }

  getProjectById(id: string): Project | undefined {
    return this.catalog().find((project) => project.id === id);
  }

  getFeaturedProjects(): Project[] {
    return getFeaturedProjects(this.catalog());
  }

  getProjectsByCategory(category: string): Project[] {
    return getProjectsByCategory(this.catalog(), category);
  }

  getProjectsByTechnology(technology: string): Project[] {
    return getProjectsByTechnology(this.catalog(), technology);
  }

  getAllCategories(): string[] {
    return getAllCategories(this.catalog());
  }

  getAllTechnologies(): string[] {
    return getAllTechnologies(this.catalog());
  }

  getAllStatuses(): ProjectStatus[] {
    return getAllStatuses(this.catalog());
  }

  getTechnologyUsage(): TechnologyUsage[] {
    return getTechnologyUsage(this.catalog());
  }

  getCategoryDistribution(): CategoryDistribution[] {
    return getCategoryDistribution(this.catalog());
  }

  getProjectStatistics(): ProjectStatistics {
    return getProjectStatistics(this.catalog());
  }

  getTechnologyRelationships(): ProjectGraph {
    return getTechnologyRelationships(this.catalog());
  }

  getProjectTechnologyGraph(): ProjectGraph {
    return getProjectTechnologyGraph(this.catalog());
  }

  getSkillConstellation(): ProjectGraph {
    return getSkillConstellation(this.catalog());
  }

  filterProjects(filters: ProjectFilters = {}): Project[] {
    return filterProjects(this.catalog(), filters);
  }

  getRelatedProjects(slug: string, limit = 3): Project[] {
    return getRelatedProjects(this.catalog(), slug, limit);
  }

  getProjectHref(project: Pick<Project, "slug">): string {
    return getProjectHref(project);
  }
}

export const projectService: ProjectRepository = new LocalProjectRepository(
  projectRecords,
);

export function getAllProjectSlugs(): string[] {
  return projectService.getAllProjects().map((project) => project.slug);
}
