"use client";

import { useState } from "react";
import Link from "next/link";
import type { Project } from "@/lib/projects/project-schema";
import { getProjectHref, hasMlDetails } from "@/lib/projects/project-utils";
import { useIsMobile } from "@/lib/motion-prefs";

export function MlProjectEcosystem({ projects }: { projects: Project[] }) {
  const mlProjects = projects.filter(hasMlDetails);
  const [activeSlug, setActiveSlug] = useState(mlProjects[0]?.slug ?? null);
  const mobile = useIsMobile();
  const active = mlProjects.find((project) => project.slug === activeSlug);

  if (mlProjects.length === 0) return null;

  return (
    <section>
      <p className="kicker">Visualization 04</p>
      <h2 className="display display-section mt-3 text-white">
        ML project
        <span className="italic text-cyan"> ecosystem.</span>
      </h2>
      <p className="mt-3 max-w-xl text-sm text-muted">
        Each node is a project with a recorded ML system. Empty fields stay empty.
      </p>

      <div className="mt-10 grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
        <div className={`ml-eco-nodes ${mobile ? "is-stack" : ""}`}>
          {mlProjects.map((project) => {
            const selected = project.slug === activeSlug;
            return (
              <button
                key={project.id}
                type="button"
                className={`ml-eco-node ${selected ? "is-active" : ""}`}
                style={{ ["--node-color" as string]: project.color ?? "#7C3AED" }}
                onMouseEnter={() => setActiveSlug(project.slug)}
                onFocus={() => setActiveSlug(project.slug)}
                onClick={() => setActiveSlug(project.slug)}
              >
                <span className="ml-eco-dot" aria-hidden />
                <span>{project.title}</span>
              </button>
            );
          })}
        </div>

        {active?.mlDetails ? (
          <div className="panel p-6">
            <p className="kicker">{active.year}</p>
            <h3 className="mt-3 text-2xl text-white">{active.title}</h3>
            <Branch label="Dataset" value={active.mlDetails.dataset} />
            <Branch label="Features" value={active.mlDetails.features} />
            <Branch label="Model" value={active.mlDetails.models} />
            <Branch
              label="Evaluation"
              value={active.mlDetails.metrics?.map(
                (metric) => `${metric.name}: ${metric.value}`,
              )}
            />
            <Branch label="Result" value={active.mlDetails.result} />
            <div className="mt-6 flex flex-wrap gap-2">
              {active.technologies.slice(0, 6).map((tech) => (
                <span
                  key={tech}
                  className="border border-line px-2 py-1 font-mono text-[10px] tracking-[0.12em] text-muted uppercase"
                >
                  {tech}
                </span>
              ))}
            </div>
            <Link
              href={getProjectHref(active)}
              className="mt-6 inline-flex min-h-11 items-center font-mono text-[11px] tracking-[0.16em] text-cyan uppercase"
            >
              Open case study ↗
            </Link>
          </div>
        ) : null}
      </div>
    </section>
  );
}

function Branch({
  label,
  value,
}: {
  label: string;
  value?: string | string[];
}) {
  const items = Array.isArray(value) ? value : value ? [value] : [];
  if (items.length === 0) return null;
  return (
    <div className="mt-5 border-l border-cyan/40 pl-4">
      <p className="font-mono text-[10px] tracking-[0.18em] text-cyan uppercase">
        {label}
      </p>
      <ul className="mt-2 space-y-1 text-sm text-muted">
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
}
