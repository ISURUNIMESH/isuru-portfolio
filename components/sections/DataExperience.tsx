"use client";

import { useMemo, useState } from "react";
import dynamic from "next/dynamic";
import type { Project } from "@/lib/projects/project-schema";
import type { TechnologyUsage } from "@/lib/projects";
import {
  getMlTechnologyCluster,
  getProjectsByTechnology,
  getRelatedTechnologies,
} from "@/lib/projects/project-utils";
import { ThreeCanvas } from "@/components/three/ThreeCanvas";
import { TechnologyUniverse } from "@/components/three/TechnologyUniverse";
import { ProjectEcosystem } from "@/components/visualizations/ProjectEcosystem";
import { TechnologyGravity } from "@/components/visualizations/TechnologyGravity";
import { ProjectTimeline } from "@/components/visualizations/ProjectTimeline";
import { MlWorkflow } from "@/components/visualizations/MlWorkflow";
import { MlTechnologyCluster } from "@/components/visualizations/MlTechnologyCluster";
import { MlProjectEcosystem } from "@/components/visualizations/MlProjectEcosystem";
import { SectionReveal } from "@/components/ui/SectionReveal";
import { ProjectIndex } from "@/components/sections/ProjectIndex";
import { useIsMobile, usePrefersReducedMotion } from "@/lib/motion-prefs";

const UniverseScene = dynamic(
  () =>
    Promise.resolve(function UniverseScene({
      usage,
      active,
      onSelect,
      highlight,
    }: {
      usage: TechnologyUsage[];
      active: string | null;
      onSelect: (value: string | null) => void;
      highlight?: Set<string>;
    }) {
      return (
        <ThreeCanvas className="h-full w-full" camera={[0, 0, 7.2]}>
          <TechnologyUniverse
            usage={usage}
            active={active}
            onSelect={onSelect}
            highlight={highlight}
          />
        </ThreeCanvas>
      );
    }),
  { ssr: false },
);

export function DataExperience({
  projects,
  usage,
}: {
  projects: Project[];
  usage: TechnologyUsage[];
}) {
  const [active, setActive] = useState<string | null>(null);
  const reduced = usePrefersReducedMotion();
  const mobile = useIsMobile();
  const relatedProjects = useMemo(
    () => (active ? getProjectsByTechnology(projects, active) : []),
    [active, projects],
  );
  const relatedTech = useMemo(
    () => (active ? getRelatedTechnologies(projects, active) : []),
    [active, projects],
  );
  const mlCluster = useMemo(
    () => getMlTechnologyCluster(projects),
    [projects],
  );
  const mlTechNames = useMemo(
    () => new Set(mlCluster.map((item) => item.technology)),
    [mlCluster],
  );

  return (
    <div className="pt-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <p className="kicker">Technology universe</p>
        <h1 className="display display-page mt-5 text-text">
          Explore
          <span className="italic text-cyan"> the system.</span>
        </h1>
        <p className="mt-4 max-w-xl text-sm text-muted">
          Data → insight → model → experience.
        </p>
      </div>
      <div
        className={`relative mt-10 min-h-[280px] ${
          mobile ? "h-[52vh]" : "h-[70vh] min-h-[420px]"
        }`}
      >
        {reduced ? (
          <div className="flex h-full flex-wrap content-center justify-center gap-3 px-4 sm:px-6">
            {usage.map((item) => (
              <button
                key={item.technology}
                type="button"
                onClick={() => setActive(item.technology)}
                className="min-h-11 rounded-full border border-line bg-[#151C2C] px-4 py-2 text-xs font-medium text-text transition hover:border-violet hover:bg-[#1B2436] hover:text-violet"
              >
                {item.technology}
              </button>
            ))}
          </div>
        ) : (
          <UniverseScene
            usage={usage}
            active={active}
            onSelect={setActive}
            highlight={mlTechNames}
          />
        )}
        {active ? (
            <aside className="panel absolute inset-x-4 bottom-4 max-h-[55%] max-w-sm overflow-y-auto p-5 sm:inset-x-auto sm:right-6 sm:bottom-6">
            <p className="kicker">{active}</p>
            <p className="mt-3 text-sm text-muted">
              {relatedProjects.length} related project
              {relatedProjects.length === 1 ? "" : "s"}
            </p>
            <div className="mt-4">
              <ProjectIndex projects={relatedProjects} label="Related projects" />
            </div>
            {relatedTech.length > 0 ? (
              <p className="mt-4 font-mono text-[10px] tracking-[0.14em] text-muted uppercase">
                Also with {relatedTech.slice(0, 5).map((item) => item.technology).join(" · ")}
              </p>
            ) : null}
          </aside>
        ) : (
          <p className="absolute bottom-6 left-4 font-mono text-[11px] tracking-[0.16em] text-muted uppercase sm:left-6">
            {mobile ? "Tap a node" : "Click a node"}
          </p>
        )}
      </div>
      <div className="mx-auto max-w-7xl space-y-16 px-4 py-16 sm:space-y-24 sm:px-6 sm:py-24">
        <SectionReveal>
          <MlTechnologyCluster usage={mlCluster} />
        </SectionReveal>
        <SectionReveal>
          <MlWorkflow />
        </SectionReveal>
        <SectionReveal>
          <MlProjectEcosystem projects={projects} />
        </SectionReveal>
        <SectionReveal>
          <ProjectEcosystem projects={projects} />
        </SectionReveal>
        <SectionReveal>
          <TechnologyGravity usage={usage} />
        </SectionReveal>
        <SectionReveal>
          <ProjectTimeline projects={projects} />
        </SectionReveal>
      </div>
    </div>
  );
}
