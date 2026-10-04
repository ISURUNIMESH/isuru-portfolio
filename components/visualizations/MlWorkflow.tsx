"use client";

import { useState } from "react";
import { useIsMobile, usePrefersReducedMotion } from "@/lib/motion-prefs";

const stages = [
  {
    id: "data",
    title: "Data",
    body: "Collect and inspect the raw signals a model will learn from.",
  },
  {
    id: "preprocessing",
    title: "Preprocessing",
    body: "Clean, balance, and shape records so training is actually possible.",
  },
  {
    id: "features",
    title: "Feature engineering",
    body: "Turn messy fields into the representations a model can use.",
  },
  {
    id: "training",
    title: "Model training",
    body: "Train machine learning models using prepared datasets and selected features.",
  },
  {
    id: "evaluation",
    title: "Evaluation",
    body: "Check whether the model generalizes — not just whether it fit the training set.",
  },
  {
    id: "prediction",
    title: "Prediction",
    body: "Ship the result as a score, explanation, or interactive experience.",
  },
] as const;

export function MlWorkflow() {
  const [active, setActive] = useState<(typeof stages)[number]["id"]>("training");
  const reduced = usePrefersReducedMotion();
  const mobile = useIsMobile();
  const current = stages.find((stage) => stage.id === active) ?? stages[0];
  const particleCount = reduced ? 0 : mobile ? 4 : 8;

  return (
    <section>
      <p className="kicker">Machine learning system</p>
      <h2 className="display display-page mt-3 text-white">
        Machine
        <br />
        <span className="italic text-cyan">learning</span>
        <br />
        system.
      </h2>
      <p className="mt-4 max-w-xl text-sm text-muted">
        Data → insight → model → experience. Hover a stage to inspect the pipeline.
      </p>

      <div className="mt-10 grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
        <ol className="ml-flow relative">
          {!reduced
            ? Array.from({ length: particleCount }, (_, index) => (
                <span
                  key={index}
                  className="ml-flow-particle"
                  style={{ animationDelay: `${index * 0.7}s` }}
                  aria-hidden
                />
              ))
            : null}
          {stages.map((stage, index) => {
            const selected = stage.id === active;
            return (
              <li key={stage.id}>
                <button
                  type="button"
                  onMouseEnter={() => setActive(stage.id)}
                  onFocus={() => setActive(stage.id)}
                  onClick={() => setActive(stage.id)}
                  className={`ml-flow-stage ${selected ? "is-active" : ""}`}
                  aria-pressed={selected}
                >
                  <span className="font-mono text-[10px] tracking-[0.2em] text-muted">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="display text-[clamp(1.35rem,4vw,2rem)] text-white">
                    {stage.title}
                  </span>
                </button>
              </li>
            );
          })}
        </ol>
        <aside className="panel min-h-[180px] p-6">
          <p className="kicker">{current.title}</p>
          <p className="mt-4 text-base leading-7 text-muted">{current.body}</p>
        </aside>
      </div>
    </section>
  );
}
