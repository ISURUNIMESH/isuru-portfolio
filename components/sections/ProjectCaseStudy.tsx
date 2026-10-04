"use client";

import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight, Github } from "lucide-react";
import type { Project } from "@/lib/projects/project-schema";
import { ProjectMediaFrame } from "@/components/work/project-media-frame";
import { SectionReveal } from "@/components/ui/SectionReveal";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { ProjectIndex } from "@/components/sections/ProjectIndex";
import { MlSystemMap } from "@/components/visualizations/MlSystemMap";
import { useIsMobile, usePrefersReducedMotion } from "@/lib/motion-prefs";

export function ProjectCaseStudy({
  project,
  related,
  index,
}: {
  project: Project;
  related: Project[];
  index: number;
}) {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 0.2], [0, 40]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 1.04]);
  const mobile = useIsMobile();
  const reduced = usePrefersReducedMotion();
  const heroMotion = !mobile && !reduced;

  return (
    <article className="overflow-x-clip pt-24 sm:pt-28">
      <header className="mx-auto max-w-7xl px-4 sm:px-6">
        <Link
          href="/work"
          className="inline-flex min-h-11 items-center font-mono text-[11px] tracking-[0.18em] text-muted uppercase hover:text-cyan"
        >
          ← Archive
        </Link>
        <p className="kicker mt-8 sm:mt-10">
          Project {String(index + 1).padStart(2, "0")} · {project.year}
        </p>
        <h1 className="display display-page mt-4 max-w-5xl text-text">
          {project.title}
        </h1>
        <p className="mt-6 max-w-2xl text-base leading-7 text-muted sm:text-lg">
          {project.shortDescription}
        </p>
      </header>

      <motion.div
        style={heroMotion ? { y, scale } : undefined}
        className="mt-8 overflow-hidden sm:mt-12"
      >
        <ProjectMediaFrame
          project={project}
          role="hero"
          variant="hero"
          className="h-[38vh] min-h-[220px] w-full sm:h-[48vh] md:h-[62vh]"
          sizes="100vw"
          priority
        />
      </motion.div>

      <div className="mx-auto max-w-4xl space-y-8 px-4 py-12 sm:space-y-10 sm:px-6 sm:py-20">
        <StudyBlock index="01" title="Overview" body={project.shortDescription} />
        <StudyBlock index="02" title="The problem" body={project.problem} sparse />
        <StudyBlock index="03" title="The approach" body={project.approach} connect />
        {project.mlDetails ? <MlSystemMap project={project} /> : null}
        <section>
          <p className="kicker">04 / The system</p>
          <h2 className="display display-section mt-3 text-text">
            A stack that earns its place.
          </h2>
          <div className="mt-8 flex flex-wrap gap-2 sm:gap-3">
            {project.technologies.map((tech) => (
              <span
                key={tech}
                className="rounded-full border border-line bg-[#1B2436] px-3 py-2 text-xs font-medium text-muted"
              >
                {tech}
              </span>
            ))}
          </div>
        </section>
        <section>
          <p className="kicker">05 / Technology</p>
          <p className="mt-4 max-w-2xl text-muted">
            {project.technologies.join(" · ")} — extracted from the project record, not a
            separate stack list.
          </p>
        </section>
        <StudyBlock index="06" title="Outcome" body={project.outcome} />
        <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          {project.githubUrl ? (
            <MagneticButton href={project.githubUrl} external>
              <span className="inline-flex items-center gap-2">
                <Github size={14} /> GitHub
              </span>
            </MagneticButton>
          ) : null}
          {project.liveUrl ? (
            <MagneticButton href={project.liveUrl} external>
              <span className="inline-flex items-center gap-2">
                Live demo <ArrowUpRight size={14} />
              </span>
            </MagneticButton>
          ) : null}
        </div>
      </div>

      {project.gallery && project.gallery.length > 0 ? (
        <section className="border-t border-line">
          <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16">
            <p className="kicker">Stills</p>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {project.gallery.map((src, galleryIndex) => (
                <ProjectMediaFrame
                  key={src}
                  project={project}
                  src={src}
                  alt={`${project.title} gallery ${String(galleryIndex + 1).padStart(2, "0")}`}
                  variant="gallery"
                  className="aspect-video w-full"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {related.length > 0 ? (
        <section className="border-t border-line">
          <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16">
            <p className="kicker">Adjacent signals</p>
            <div className="mt-8">
              <ProjectIndex projects={related} label="Related projects" />
            </div>
          </div>
        </section>
      ) : null}
    </article>
  );
}

function StudyBlock({
  index,
  title,
  body,
  sparse,
  connect,
}: {
  index: string;
  title: string;
  body?: string;
  sparse?: boolean;
  connect?: boolean;
}) {
  if (!body) return null;
  return (
    <SectionReveal className={sparse ? "max-w-xl" : ""}>
      <p className="kicker">
        {index} / {title}
      </p>
      {connect ? <div className="mt-4 h-px w-24 bg-cyan/50" /> : null}
      <p className="mt-5 text-base leading-7 text-muted sm:text-lg sm:leading-8">{body}</p>
    </SectionReveal>
  );
}
