"use client";

import dynamic from "next/dynamic";
import type { Experiment } from "@/data/experiments";
import { experiments as catalog } from "@/data/experiments";

const registry = {
  ParticleField: dynamic(() =>
    import("@/components/playground/ParticleFieldExperiment").then(
      (mod) => mod.ParticleFieldExperiment,
    ),
  ),
  DataFlow: dynamic(() =>
    import("@/components/playground/DataFlowExperiment").then(
      (mod) => mod.DataFlowExperiment,
    ),
  ),
  ShapeLab: dynamic(() =>
    import("@/components/playground/ShapeLabExperiment").then(
      (mod) => mod.ShapeLabExperiment,
    ),
  ),
  ColorField: dynamic(() =>
    import("@/components/playground/ColorFieldExperiment").then(
      (mod) => mod.ColorFieldExperiment,
    ),
  ),
};

export function PlaygroundExperiments({
  experiments = catalog,
}: {
  experiments?: Experiment[];
}) {
  return (
    <div className="mx-auto max-w-7xl px-4 pt-24 pb-20 sm:px-6 sm:pt-28 sm:pb-24">
      <p className="kicker">Experiments</p>
      <h1 className="display display-page mt-5 text-text">
        Digital
        <span className="italic text-cyan"> playground.</span>
      </h1>
      <div className="mt-16 grid gap-6 md:grid-cols-2">
        {experiments.map((experiment) => {
          const Scene = registry[experiment.component];
          return (
            <article key={experiment.id} className="panel overflow-hidden rounded-2xl">
              <div className="border-b border-line bg-[#0F1522]">
                <Scene />
              </div>
              <div className="p-5 sm:p-6">
                <p className="font-mono text-[10px] tracking-[0.2em] text-cyan uppercase">
                  {experiment.kicker}
                </p>
                <h2 className="mt-2 text-2xl font-medium text-text">{experiment.title}</h2>
                <p className="mt-2 text-sm text-muted">{experiment.description}</p>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
