"use client";

import type { Project } from "@/lib/projects/project-schema";
import { hasMlDetails } from "@/lib/projects/project-utils";
import { usePrefersReducedMotion } from "@/lib/motion-prefs";

export function MlSystemMap({ project }: { project: Project }) {
  const reduced = usePrefersReducedMotion();
  const details = project.mlDetails;
  if (!details || !hasMlDetails(project)) return null;

  const outputs = [
    details.result ? { label: "Insight", value: details.result } : null,
    ...(details.metrics ?? []).map((metric) => ({
      label: metric.name,
      value: metric.value,
    })),
  ].filter(Boolean) as Array<{ label: string; value: string }>;

  return (
    <section>
      <p className="kicker">ML system</p>
      <h2 className="display display-section mt-3 text-white">
        From data
        <span className="italic text-cyan"> to model.</span>
      </h2>
      <div className={`ml-system mt-10 ${reduced ? "is-static" : ""}`}>
        <Stage title="Dataset" body={details.dataset} />
        <Connector />
        <Stage title="Preprocessing" items={details.preprocessing} />
        <Connector />
        <Stage title="Feature space" items={details.features} />
        <Connector />
        <div className="ml-system-model">
          <p className="font-mono text-[10px] tracking-[0.2em] text-cyan uppercase">
            Model
          </p>
          <div className="mt-3 flex flex-wrap justify-center gap-2">
            {(details.models ?? []).map((model) => (
              <span
                key={model}
                className="border border-cyan/40 px-3 py-2 font-mono text-[11px] tracking-[0.12em] text-white uppercase"
              >
                {model}
              </span>
            ))}
          </div>
        </div>
        {outputs.length > 0 ? (
          <>
            <Connector />
            <div className="ml-system-outputs">
              {outputs.map((output) => (
                <div key={`${output.label}-${output.value}`} className="panel p-4">
                  <p className="font-mono text-[10px] tracking-[0.18em] text-cyan uppercase">
                    {output.label}
                  </p>
                  <p className="mt-2 text-sm text-muted">{output.value}</p>
                </div>
              ))}
            </div>
          </>
        ) : null}
      </div>
    </section>
  );
}

function Stage({
  title,
  body,
  items,
}: {
  title: string;
  body?: string;
  items?: string[];
}) {
  if (!body && (!items || items.length === 0)) return null;
  return (
    <div className="ml-system-stage">
      <p className="font-mono text-[10px] tracking-[0.2em] text-muted uppercase">
        {title}
      </p>
      {body ? <p className="mt-2 text-sm text-white">{body}</p> : null}
      {items && items.length > 0 ? (
        <ul className="mt-2 space-y-1 text-sm text-muted">
          {items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}

function Connector() {
  return <div className="ml-system-connector" aria-hidden />;
}
