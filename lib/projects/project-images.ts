import type { Project } from "./project-schema";

export const PROJECT_IMAGE_EXTENSIONS = [
  "jpg",
  "jpeg",
  "png",
  "webp",
  "avif",
  "svg",
] as const;

export type ProjectImageRole = "thumbnail" | "cover" | "hero" | "gallery";

export interface ProjectImageRef {
  role: ProjectImageRole;
  path: string;
  label: string;
}

export interface ProjectMedia {
  thumbnail: string | null;
  coverImage: string | null;
  heroImage: string | null;
  gallery: string[];
}

const IMAGE_PATH_PATTERN = new RegExp(
  `^/projects/([a-z0-9]+(?:-[a-z0-9]+)*)/.+\\.(${PROJECT_IMAGE_EXTENSIONS.join("|")})$`,
  "i",
);

export function defaultProjectImagePaths(slug: string) {
  const root = `/projects/${slug}`;
  return {
    thumbnail: `${root}/thumbnail.jpg`,
    coverImage: `${root}/cover.jpg`,
    heroImage: `${root}/hero.jpg`,
    gallery: [`${root}/gallery/01.jpg`, `${root}/gallery/02.jpg`, `${root}/gallery/03.jpg`],
  };
}

export function isPublicImagePath(value: string): boolean {
  return IMAGE_PATH_PATTERN.test(value.trim());
}

export function slugFromImagePath(value: string): string | null {
  const match = value.trim().match(IMAGE_PATH_PATTERN);
  return match ? match[1] : null;
}

export function collectProjectImageRefs(project: Project): ProjectImageRef[] {
  const refs: ProjectImageRef[] = [];

  if (project.thumbnail) {
    refs.push({ role: "thumbnail", path: project.thumbnail, label: "thumbnail" });
  }
  if (project.coverImage) {
    refs.push({ role: "cover", path: project.coverImage, label: "coverImage" });
  }
  if (project.image && project.image !== project.coverImage) {
    refs.push({ role: "cover", path: project.image, label: "image" });
  }
  if (project.heroImage) {
    refs.push({ role: "hero", path: project.heroImage, label: "heroImage" });
  }
  for (const [index, path] of (project.gallery ?? []).entries()) {
    refs.push({ role: "gallery", path, label: `gallery[${index}]` });
  }

  return refs;
}

export function getProjectImageSrc(
  project: Project,
  role: ProjectImageRole,
): string | undefined {
  if (role === "thumbnail") {
    return (
      emptyToUndefined(project.thumbnail) ||
      emptyToUndefined(project.coverImage) ||
      emptyToUndefined(project.image) ||
      emptyToUndefined(project.heroImage)
    );
  }

  if (role === "hero") {
    return (
      emptyToUndefined(project.heroImage) ||
      emptyToUndefined(project.coverImage) ||
      emptyToUndefined(project.image) ||
      emptyToUndefined(project.thumbnail)
    );
  }

  return (
    emptyToUndefined(project.coverImage) ||
    emptyToUndefined(project.image) ||
    emptyToUndefined(project.heroImage) ||
    emptyToUndefined(project.thumbnail)
  );
}

function emptyToUndefined(value?: string): string | undefined {
  const trimmed = value?.trim();
  return trimmed ? trimmed : undefined;
}
