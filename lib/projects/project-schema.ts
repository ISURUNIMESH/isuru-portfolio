import { z } from "zod";

export const projectStatusSchema = z.enum([
  "completed",
  "in-progress",
  "experimental",
]);

const kebabCase = z
  .string()
  .min(1)
  .regex(
    /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
    "Must be kebab-case (lowercase letters, numbers, and hyphens).",
  );

const optionalUrl = z
  .string()
  .refine(
    (value) => value === "" || /^https?:\/\//.test(value),
    "Must be a valid http(s) URL, or an empty string.",
  )
  .optional();

const publicImagePath = z
  .string()
  .trim()
  .refine(
    (value) =>
      value === "" ||
      (/^\/projects\/[a-z0-9]+(?:-[a-z0-9]+)*\/.+\.(jpg|jpeg|png|webp|avif|svg)$/i.test(
        value,
      ) &&
        !value.startsWith("/public/") &&
        !value.startsWith("public/")),
    "Image paths must be root-relative, e.g. /projects/my-project/cover.jpg",
  );

const optionalPublicImagePath = publicImagePath.optional();

export const projectSchema = z.object({
  id: kebabCase,
  slug: kebabCase,
  title: z.string().min(1, "title is required."),
  shortDescription: z
    .string()
    .min(12, "shortDescription must be at least 12 characters."),
  category: z
    .array(z.string().min(1))
    .min(1, "At least one category is required."),
  technologies: z
    .array(z.string().min(1))
    .min(1, "At least one technology is required."),
  featured: z.boolean(),
  year: z.number().int().min(2000).max(2100),
  status: projectStatusSchema,

  problem: z.string().min(1).optional(),
  approach: z.string().min(1).optional(),
  outcome: z.string().min(1).optional(),
  githubUrl: optionalUrl,
  liveUrl: optionalUrl,
  thumbnail: optionalPublicImagePath,
  coverImage: optionalPublicImagePath,
  heroImage: optionalPublicImagePath,
  image: optionalPublicImagePath,
  gallery: z.array(publicImagePath).optional(),
  color: z.string().min(1).optional(),
  accent: z.string().min(1).optional(),
  mlDetails: z
    .object({
      dataset: z.string().min(1).optional(),
      preprocessing: z.array(z.string().min(1)).optional(),
      features: z.array(z.string().min(1)).optional(),
      models: z.array(z.string().min(1)).optional(),
      metrics: z
        .array(
          z.object({
            name: z.string().min(1),
            value: z.string().min(1),
          }),
        )
        .optional(),
      result: z.string().min(1).optional(),
    })
    .optional(),
});

export const projectsSchema = z
  .array(projectSchema)
  .min(1, "The projects array cannot be empty.")
  .superRefine((projects, ctx) => {
    const ids = new Map<string, number>();
    const slugs = new Map<string, number>();

    projects.forEach((project, index) => {
      const existingId = ids.get(project.id);
      if (existingId !== undefined) {
        ctx.addIssue({
          code: "custom",
          message: `Duplicate project id "${project.id}" at indexes ${existingId} and ${index}.`,
          path: [index, "id"],
        });
      } else {
        ids.set(project.id, index);
      }

      const existingSlug = slugs.get(project.slug);
      if (existingSlug !== undefined) {
        ctx.addIssue({
          code: "custom",
          message: `Duplicate project slug "${project.slug}" at indexes ${existingSlug} and ${index}.`,
          path: [index, "slug"],
        });
      } else {
        slugs.set(project.slug, index);
      }

      const imageFields: Array<[string, string | undefined]> = [
        ["thumbnail", project.thumbnail],
        ["coverImage", project.coverImage],
        ["heroImage", project.heroImage],
        ["image", project.image],
        ...(project.gallery ?? []).map(
          (item, galleryIndex) =>
            [`gallery.${galleryIndex}`, item] as [string, string | undefined],
        ),
      ];

      for (const [field, value] of imageFields) {
        if (!value) continue;
        const folder = value.match(/^\/projects\/([^/]+)\//)?.[1];
        if (folder && folder !== project.slug) {
          ctx.addIssue({
            code: "custom",
            message: `${field} folder "${folder}" must match slug "${project.slug}".`,
            path: [index, field],
          });
        }
      }
    });
  });

export type ProjectStatus = z.infer<typeof projectStatusSchema>;
export type Project = z.infer<typeof projectSchema>;
export type MLDetails = NonNullable<Project["mlDetails"]>;

function formatZodIssues(error: z.ZodError): string {
  return error.issues
    .map((issue) => {
      const path = issue.path.length ? issue.path.join(".") : "(root)";
      return `  • [${path}] ${issue.message}`;
    })
    .join("\n");
}

export function validateProjects(input: unknown): Project[] {
  const result = projectsSchema.safeParse(input);

  if (!result.success) {
    throw new Error(
      [
        "Invalid project data in data/projects.ts.",
        "Fix the issues below — the portfolio cannot load until every project object is valid.",
        formatZodIssues(result.error),
      ].join("\n"),
    );
  }

  return result.data;
}
