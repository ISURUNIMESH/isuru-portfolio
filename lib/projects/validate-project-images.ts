import "server-only";

import type { Project } from "./project-schema";
import {
  collectProjectImageRefs,
  isPublicImagePath,
  slugFromImagePath,
} from "./project-images";

// Resolve Node built-ins at runtime so Next's Edge instrumentation bundle does
// not try to resolve filesystem modules that are only used on the Node server.
const nodeFs = process.getBuiltinModule("fs") as typeof import("fs");
const nodePath = process.getBuiltinModule("path") as typeof import("path");

export interface ProjectImageIssue {
  projectTitle: string;
  slug: string;
  messages: string[];
}

export function publicPathToDisk(publicPath: string): string {
  const relative = publicPath.replace(/^\/+/, "");
  return nodePath.join(process.cwd(), "public", relative);
}

export function publicAssetExists(publicPath: string): boolean {
  if (!publicPath) return false;
  return nodeFs.existsSync(publicPathToDisk(publicPath));
}

export function firstExistingAsset(candidates: Array<string | undefined>): string | null {
  for (const candidate of candidates) {
    const value = candidate?.trim();
    if (value && publicAssetExists(value)) return value;
  }
  return null;
}

export function inspectProjectImages(projects: Project[]): ProjectImageIssue[] {
  const issues: ProjectImageIssue[] = [];

  for (const project of projects) {
    const messages: string[] = [];
    const refs = collectProjectImageRefs(project);

    if (refs.length === 0) {
      messages.push("No thumbnail, coverImage, heroImage, or gallery paths are defined.");
    }

    for (const ref of refs) {
      if (ref.path.startsWith("public/")) {
        messages.push(
          `${ref.label} starts with "public/". Use a root-relative path such as /projects/${project.slug}/cover.jpg`,
        );
        continue;
      }

      if (!ref.path.startsWith("/")) {
        messages.push(`${ref.label} must begin with "/". Received: ${ref.path}`);
        continue;
      }

      if (!isPublicImagePath(ref.path)) {
        messages.push(
          `${ref.label} is not a valid local project image path: ${ref.path}`,
        );
        continue;
      }

      const folderSlug = slugFromImagePath(ref.path);
      if (folderSlug && folderSlug !== project.slug) {
        messages.push(
          `${ref.label} folder "${folderSlug}" does not match project slug "${project.slug}": ${ref.path}`,
        );
      }

      if (!publicAssetExists(ref.path)) {
        messages.push(ref.path);
      }
    }

    if (messages.length > 0) {
      issues.push({
        projectTitle: project.title,
        slug: project.slug,
        messages,
      });
    }
  }

  return issues;
}

export function formatProjectImageWarnings(issues: ProjectImageIssue[]): string {
  if (issues.length === 0) return "";

  return issues
    .map((issue) =>
      [
        "WARNING",
        "",
        `Project "${issue.projectTitle}"`,
        "",
        "Missing:",
        "",
        ...issue.messages.map((message) => message),
      ].join("\n"),
    )
    .join("\n\n");
}

export function logProjectImageWarnings(projects: Project[]): void {
  if (process.env.NODE_ENV !== "development") return;

  const issues = inspectProjectImages(projects);
  if (issues.length === 0) return;

  console.warn(
    [
      "\n[project-images] Some project visuals are missing or misconfigured.",
      "The UI will show the designed fallback — never a broken image icon.",
      formatProjectImageWarnings(issues),
      "",
    ].join("\n"),
  );
}

export function sanitizeProjectImages(project: Project): Project {
  const defaults = {
    thumbnail: `/projects/${project.slug}/thumbnail.jpg`,
    coverImage: `/projects/${project.slug}/cover.jpg`,
    heroImage: `/projects/${project.slug}/hero.jpg`,
  };

  const coverImage = firstExistingAsset([
    project.coverImage,
    project.image,
    defaults.coverImage,
    project.heroImage,
    project.thumbnail,
  ]);
  const heroImage = firstExistingAsset([
    project.heroImage,
    defaults.heroImage,
    coverImage ?? undefined,
    project.coverImage,
    project.thumbnail,
  ]);
  const thumbnail = firstExistingAsset([
    project.thumbnail,
    defaults.thumbnail,
    coverImage ?? undefined,
    heroImage ?? undefined,
  ]);

  return {
    ...project,
    thumbnail: thumbnail ?? undefined,
    coverImage: coverImage ?? undefined,
    heroImage: heroImage ?? undefined,
    image: coverImage ?? undefined,
    gallery: (project.gallery ?? []).filter((item) => publicAssetExists(item)),
  };
}
