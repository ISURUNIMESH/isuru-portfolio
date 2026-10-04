# Isuru Nimesh — Portfolio

A Next.js portfolio where **project content is a single source of truth**.

Add a project once in `data/projects.ts`. Selected Work, Featured, Project Explorer, charts, technology relationships, statistics, and `/projects/[slug]` pages all update from that object.

## Add a project

1. Put images in `public/projects/<slug>/`:

```
public/projects/<slug>/cover.jpg
public/projects/<slug>/thumbnail.jpg
public/projects/<slug>/hero.jpg
public/projects/<slug>/gallery/01.jpg
```

2. Append one object to `data/projects.ts`. Image fields should be root-relative:

```
thumbnail: "/projects/<slug>/thumbnail.jpg"
coverImage: "/projects/<slug>/cover.jpg"
heroImage: "/projects/<slug>/hero.jpg"
```

Do not prefix paths with `public/`. Next.js serves that folder from `/`.

If a file is missing, the UI shows a designed fallback — never a broken image icon. Development logs a warning naming the missing file.

That is the entire workflow. Do not edit section components.

```ts
{
  id: "new-project",
  slug: "new-project",
  title: "New Project",
  shortDescription: "Brief description of the project.",
  category: ["AI", "Data Visualization"],
  technologies: ["Python", "React", "D3.js"],
  featured: true,
  year: 2026,
  problem: "The problem this project solves.",
  approach: "How the project was built.",
  outcome: "The result or impact.",
  githubUrl: "https://github.com/ISURUNIMESH/new-project",
  liveUrl: "",
  thumbnail: "/projects/new-project/thumbnail.jpg",
  coverImage: "/projects/new-project/cover.jpg",
  heroImage: "/projects/new-project/hero.jpg",
  gallery: [
    "/projects/new-project/gallery/01.jpg"
  ],
  status: "completed"
}
```

Invalid objects fail fast through Zod in `lib/projects/project-schema.ts`.

## Architecture

```
data/projects.ts                      ← content registry
lib/projects/project-schema.ts        ← Zod validation
lib/projects/project-images.ts        ← path conventions
lib/projects/validate-project-images.ts ← missing-file warnings
lib/projects/project-utils.ts         ← derived stats, graphs, filters
lib/projects/project-service.ts       ← repository (swap this for a CMS)
components/ui/ProjectImage.tsx        ← load / error / fallback
app/projects/[slug]/page.tsx          ← one template for every project
```

UI components import `projectService`, never `data/projects.ts`. Replacing the local file with Sanity, Contentful, or Supabase means changing the repository implementation only.

## Run

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).
