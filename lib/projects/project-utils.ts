import type { Project, ProjectStatus } from "./project-schema";

export interface TechnologyUsage {
  technology: string;
  count: number;
  projects: string[];
}

export interface CategoryDistribution {
  category: string;
  count: number;
  projects: string[];
}

export interface ProjectStatistics {
  totalProjects: number;
  featuredCount: number;
  uniqueCategories: number;
  uniqueTechnologies: number;
  statusCounts: Record<ProjectStatus, number>;
  yearRange: { min: number; max: number } | null;
  averageTechnologiesPerProject: number;
}

export interface GraphNode {
  id: string;
  label: string;
  type: "project" | "technology" | "category";
  weight: number;
  color?: string;
  slug?: string;
}

export interface GraphLink {
  source: string;
  target: string;
  weight: number;
}

export interface ProjectGraph {
  nodes: GraphNode[];
  links: GraphLink[];
}

export interface ProjectFilters {
  query?: string;
  category?: string | null;
  technology?: string | null;
  status?: ProjectStatus | null;
  featured?: boolean;
}

function normalize(value: string): string {
  return value.trim().toLowerCase();
}

export function getFeaturedProjects(projects: Project[]): Project[] {
  return projects
    .filter((project) => project.featured)
    .sort((a, b) => b.year - a.year || a.title.localeCompare(b.title));
}

export function getProjectsByCategory(
  projects: Project[],
  category: string,
): Project[] {
  const needle = normalize(category);
  return projects.filter((project) =>
    project.category.some((item) => normalize(item) === needle),
  );
}

export function getProjectsByTechnology(
  projects: Project[],
  technology: string,
): Project[] {
  const needle = normalize(technology);
  return projects.filter((project) =>
    project.technologies.some((item) => normalize(item) === needle),
  );
}

export function getAllCategories(projects: Project[]): string[] {
  return [
    ...new Set(projects.flatMap((project) => project.category)),
  ].sort((a, b) => a.localeCompare(b));
}

export function getAllTechnologies(projects: Project[]): string[] {
  return [
    ...new Set(projects.flatMap((project) => project.technologies)),
  ].sort((a, b) => a.localeCompare(b));
}

export function getAllStatuses(projects: Project[]): ProjectStatus[] {
  return [
    ...new Set(projects.map((project) => project.status)),
  ] as ProjectStatus[];
}

export function getCategoryDistribution(
  projects: Project[],
): CategoryDistribution[] {
  const map = new Map<string, CategoryDistribution>();

  for (const project of projects) {
    for (const category of project.category) {
      const current = map.get(category) ?? {
        category,
        count: 0,
        projects: [],
      };
      current.count += 1;
      current.projects.push(project.slug);
      map.set(category, current);
    }
  }

  return [...map.values()].sort(
    (a, b) => b.count - a.count || a.category.localeCompare(b.category),
  );
}

export function getTechnologyUsage(projects: Project[]): TechnologyUsage[] {
  const map = new Map<string, TechnologyUsage>();

  for (const project of projects) {
    for (const technology of project.technologies) {
      const current = map.get(technology) ?? {
        technology,
        count: 0,
        projects: [],
      };
      current.count += 1;
      current.projects.push(project.slug);
      map.set(technology, current);
    }
  }

  return [...map.values()].sort(
    (a, b) => b.count - a.count || a.technology.localeCompare(b.technology),
  );
}

export function getProjectStatistics(projects: Project[]): ProjectStatistics {
  const statusCounts: Record<ProjectStatus, number> = {
    completed: 0,
    "in-progress": 0,
    experimental: 0,
  };

  for (const project of projects) {
    statusCounts[project.status] += 1;
  }

  const years = projects.map((project) => project.year);
  const techTotal = projects.reduce(
    (sum, project) => sum + project.technologies.length,
    0,
  );

  return {
    totalProjects: projects.length,
    featuredCount: projects.filter((project) => project.featured).length,
    uniqueCategories: getAllCategories(projects).length,
    uniqueTechnologies: getAllTechnologies(projects).length,
    statusCounts,
    yearRange: years.length
      ? { min: Math.min(...years), max: Math.max(...years) }
      : null,
    averageTechnologiesPerProject: projects.length
      ? Number((techTotal / projects.length).toFixed(1))
      : 0,
  };
}

export function getTechnologyRelationships(projects: Project[]): ProjectGraph {
  const usage = getTechnologyUsage(projects);
  const nodes: GraphNode[] = usage.map((item) => ({
    id: `tech:${item.technology}`,
    label: item.technology,
    type: "technology",
    weight: item.count,
  }));

  const linkMap = new Map<string, GraphLink>();

  for (const project of projects) {
    const uniqueTechs = [...new Set(project.technologies)];
    for (let i = 0; i < uniqueTechs.length; i += 1) {
      for (let j = i + 1; j < uniqueTechs.length; j += 1) {
        const pair = [uniqueTechs[i], uniqueTechs[j]].sort((a, b) =>
          a.localeCompare(b),
        );
        const key = pair.join("||");
        const current = linkMap.get(key) ?? {
          source: `tech:${pair[0]}`,
          target: `tech:${pair[1]}`,
          weight: 0,
        };
        current.weight += 1;
        linkMap.set(key, current);
      }
    }
  }

  return { nodes, links: [...linkMap.values()] };
}

export function getProjectTechnologyGraph(projects: Project[]): ProjectGraph {
  const nodes: GraphNode[] = [
    ...projects.map((project) => ({
      id: `project:${project.slug}`,
      label: project.title,
      type: "project" as const,
      weight: project.technologies.length,
      color: project.color,
      slug: project.slug,
    })),
    ...getTechnologyUsage(projects).map((item) => ({
      id: `tech:${item.technology}`,
      label: item.technology,
      type: "technology" as const,
      weight: item.count,
    })),
  ];

  const links: GraphLink[] = projects.flatMap((project) =>
    project.technologies.map((technology) => ({
      source: `project:${project.slug}`,
      target: `tech:${technology}`,
      weight: 1,
    })),
  );

  return { nodes, links };
}

export function getSkillConstellation(projects: Project[]): ProjectGraph {
  return getTechnologyRelationships(projects);
}

export function filterProjects(
  projects: Project[],
  filters: ProjectFilters = {},
): Project[] {
  const query = filters.query?.trim().toLowerCase() ?? "";

  return projects.filter((project) => {
    if (filters.featured && !project.featured) return false;
    if (filters.status && project.status !== filters.status) return false;
    if (
      filters.category &&
      !project.category.some(
        (item) => normalize(item) === normalize(filters.category!),
      )
    ) {
      return false;
    }
    if (
      filters.technology &&
      !project.technologies.some(
        (item) => normalize(item) === normalize(filters.technology!),
      )
    ) {
      return false;
    }
    if (!query) return true;

    const haystack = [
      project.title,
      project.shortDescription,
      project.problem,
      project.approach,
      project.outcome,
      project.mlDetails?.dataset,
      project.mlDetails?.result,
      ...(project.mlDetails?.preprocessing ?? []),
      ...(project.mlDetails?.features ?? []),
      ...(project.mlDetails?.models ?? []),
      ...(project.mlDetails?.metrics?.map((item) => `${item.name} ${item.value}`) ?? []),
      ...project.category,
      ...project.technologies,
    ]
      .filter(Boolean)
      .join(" ")
      .toLowerCase();

    return haystack.includes(query);
  });
}

export function getRelatedProjects(
  projects: Project[],
  slug: string,
  limit = 3,
): Project[] {
  const current = projects.find((project) => project.slug === slug);
  if (!current) return [];

  return projects
    .filter((project) => project.slug !== slug)
    .map((project) => {
      const sharedCategories = project.category.filter((category) =>
        current.category.includes(category),
      ).length;
      const sharedTechnologies = project.technologies.filter((technology) =>
        current.technologies.includes(technology),
      ).length;

      return {
        project,
        score: sharedCategories * 2 + sharedTechnologies,
      };
    })
    .filter((item) => item.score > 0)
    .sort(
      (a, b) =>
        b.score - a.score || b.project.year - a.project.year,
    )
    .slice(0, limit)
    .map((item) => item.project);
}

export function getRelatedTechnologies(
  projects: Project[],
  technology: string,
): Array<{ technology: string; count: number }> {
  const counts = new Map<string, number>();

  for (const project of getProjectsByTechnology(projects, technology)) {
    for (const item of project.technologies) {
      if (item === technology) continue;
      counts.set(item, (counts.get(item) ?? 0) + 1);
    }
  }

  return [...counts.entries()]
    .map(([name, count]) => ({ technology: name, count }))
    .sort((a, b) => b.count - a.count || a.technology.localeCompare(b.technology));
}

export function getProjectsByYear(projects: Project[]): Array<{
  year: number;
  projects: Project[];
}> {
  const map = new Map<number, Project[]>();
  for (const project of projects) {
    const list = map.get(project.year) ?? [];
    list.push(project);
    map.set(project.year, list);
  }
  return [...map.entries()]
    .sort((a, b) => a[0] - b[0])
    .map(([year, items]) => ({ year, projects: items }));
}

const ML_CATEGORY_KEYS = ["machine learning", "ai", "data science"];

export function isMlProject(project: Project): boolean {
  return (
    project.category.some((item) => ML_CATEGORY_KEYS.includes(normalize(item))) ||
    project.technologies.some((item) => normalize(item) === "machine learning") ||
    Boolean(project.mlDetails)
  );
}

export function getMlProjects(projects: Project[]): Project[] {
  return projects.filter(isMlProject);
}

export function hasMlDetails(project: Project): boolean {
  const details = project.mlDetails;
  if (!details) return false;
  return Boolean(
    details.dataset ||
      details.result ||
      details.preprocessing?.length ||
      details.features?.length ||
      details.models?.length ||
      details.metrics?.length,
  );
}

export function getMlTechnologyCluster(projects: Project[]): TechnologyUsage[] {
  return getTechnologyUsage(getMlProjects(projects));
}

export function getProjectHref(project: Pick<Project, "slug">): string {
  return `/work/${project.slug}`;
}

export function sortProjects(projects: Project[]): Project[] {
  return [...projects].sort(
    (a, b) =>
      Number(b.featured) - Number(a.featured) ||
      b.year - a.year ||
      a.title.localeCompare(b.title),
  );
}
