/**
 * Compatibility re-export.
 * Canonical location: lib/projects/project-utils.ts
 */
export {
  filterProjects,
  getAllCategories,
  getAllTechnologies,
  getCategoryDistribution,
  getFeaturedProjects,
  getProjectHref,
  getProjectStatistics,
  getProjectsByCategory,
  getProjectsByTechnology,
  getRelatedProjects,
  getTechnologyRelationships,
  getTechnologyUsage,
} from "./projects/project-utils";

export type {
  CategoryDistribution,
  ProjectFilters,
  ProjectGraph,
  ProjectStatistics,
  TechnologyUsage,
} from "./projects/project-utils";
