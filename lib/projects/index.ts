export type { MLDetails, Project, ProjectStatus } from "./project-schema";
export { projectSchema, projectsSchema, validateProjects } from "./project-schema";

export {
  filterProjects,
  getAllCategories,
  getAllTechnologies,
  getCategoryDistribution,
  getFeaturedProjects,
  getProjectHref,
  getProjectStatistics,
  getProjectTechnologyGraph,
  getProjectsByCategory,
  getProjectsByTechnology,
  getRelatedProjects,
  getRelatedTechnologies,
  getProjectsByYear,
  getSkillConstellation,
  getTechnologyRelationships,
  getTechnologyUsage,
  getMlProjects,
  getMlTechnologyCluster,
  hasMlDetails,
  isMlProject,
  sortProjects,
} from "./project-utils";

export type {
  CategoryDistribution,
  GraphLink,
  GraphNode,
  ProjectFilters,
  ProjectGraph,
  ProjectStatistics,
  TechnologyUsage,
} from "./project-utils";

export {
  collectProjectImageRefs,
  defaultProjectImagePaths,
  getProjectImageSrc,
  isPublicImagePath,
} from "./project-images";

export type { ProjectImageRole, ProjectMedia } from "./project-images";
