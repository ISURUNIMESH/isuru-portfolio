import Link from "next/link";
import { ArrowUpRight, Github } from "lucide-react";
import type { Project } from "@/lib/projects";
import { ProjectCard } from "./project-card";
import { ProjectMediaFrame } from "./project-media-frame";

export function ProjectDetail({
  project,
  related,
}: {
  project: Project;
  related: Project[];
}) {
  const links = [
    project.githubUrl
      ? { href: project.githubUrl, label: "GitHub", icon: Github }
      : null,
    project.liveUrl
      ? { href: project.liveUrl, label: "Live demo", icon: ArrowUpRight }
      : null,
  ].filter(Boolean) as { href: string; label: string; icon: typeof Github }[];

  return (
    <article>
      <header className="border-b border-line">
        <div className="mx-auto max-w-7xl px-6 py-12">
          <Link
            href="/#explorer"
            className="font-mono text-[11px] tracking-[0.18em] text-muted uppercase hover:text-cyan"
          >
            ← Catalog
          </Link>
          <p className="kicker mt-8">
            {project.year} · {project.status} · {project.category.join(" / ")}
          </p>
          <h1 className="display mt-4 max-w-5xl text-5xl text-text sm:text-7xl">
            {project.title}
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">
            {project.shortDescription}
          </p>
          {links.length > 0 ? (
            <div className="mt-8 flex flex-wrap gap-3">
              {links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-line bg-[#1B2436] px-4 py-2 text-sm font-medium text-text transition hover:border-violet hover:text-violet"
                >
                  <link.icon size={16} />
                  {link.label}
                </a>
              ))}
            </div>
          ) : null}
        </div>
        <ProjectMediaFrame
          project={project}
          role="hero"
          variant="hero"
          className="h-[42vh] min-h-[280px] w-full md:h-[56vh]"
          sizes="100vw"
          priority
        />
      </header>

      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-16 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-10">
          <Narrative title="Problem" body={project.problem} />
          <Narrative title="Approach" body={project.approach} />
          <Narrative title="Outcome" body={project.outcome} />
        </div>
        <aside className="panel h-fit p-6">
          <p className="kicker">Stack</p>
          <div className="mt-5 flex flex-wrap gap-2">
            {project.technologies.map((technology) => (
              <span
                key={technology}
                className="rounded-full border border-line bg-[#1B2436] px-3 py-1.5 text-xs font-medium text-muted"
              >
                {technology}
              </span>
            ))}
          </div>
          <div className="hairline my-6" />
          <dl className="space-y-3 font-mono text-[12px] text-muted">
            <Row label="Year" value={String(project.year)} />
            <Row label="Status" value={project.status} />
            <Row label="Categories" value={project.category.join(", ")} />
            <Row
              label="Featured"
              value={project.featured ? "Yes" : "No"}
            />
          </dl>
        </aside>
      </div>

      {project.gallery && project.gallery.length > 0 ? (
        <section className="border-t border-line">
          <div className="mx-auto max-w-7xl px-6 py-16">
            <p className="kicker">Gallery</p>
            <div className="mt-8 grid gap-4 md:grid-cols-2">
              {project.gallery.map((src, index) => (
                <ProjectMediaFrame
                  key={src}
                  project={project}
                  src={src}
                  alt={`${project.title} gallery ${String(index + 1).padStart(2, "0")}`}
                  variant="gallery"
                  className="aspect-video w-full"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  fit="cover"
                  priority={false}
                />
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {related.length > 0 ? (
        <section className="border-t border-line">
          <div className="mx-auto max-w-7xl px-6 py-16">
            <p className="kicker">Adjacent signals</p>
            <h2 className="display mt-3 text-4xl text-text">Related projects</h2>
            <div className="mt-8 grid gap-5 md:grid-cols-3">
              {related.map((item, index) => (
                <ProjectCard key={item.id} project={item} index={index} />
              ))}
            </div>
          </div>
        </section>
      ) : null}
    </article>
  );
}

function Narrative({ title, body }: { title: string; body?: string }) {
  if (!body) return null;

  return (
    <section>
      <h2 className="kicker">{title}</h2>
      <p className="mt-4 max-w-2xl text-base leading-8 text-muted">{body}</p>
    </section>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-4">
      <dt className="uppercase tracking-[0.16em]">{label}</dt>
      <dd className="font-medium text-text">{value}</dd>
    </div>
  );
}
