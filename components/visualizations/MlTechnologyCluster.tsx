"use client";

import { useMemo, useState } from "react";
import type { TechnologyUsage } from "@/lib/projects";
import { useIsMobile } from "@/lib/motion-prefs";

const PREFERRED_ORBIT = [
  "Scikit-learn",
  "Python",
  "Pandas",
  "NumPy",
  "Jupyter",
  "Data Visualization",
  "SHAP",
  "Streamlit",
];

export function MlTechnologyCluster({ usage }: { usage: TechnologyUsage[] }) {
  const mobile = useIsMobile();
  const [active, setActive] = useState<string | null>("Machine Learning");

  const hub = usage.find((item) => item.technology === "Machine Learning");
  const orbit = useMemo(() => {
    const preferred = PREFERRED_ORBIT.filter((name) =>
      usage.some((item) => item.technology === name),
    );
    const extras = usage
      .map((item) => item.technology)
      .filter(
        (name) =>
          name !== "Machine Learning" && !preferred.includes(name),
      );
    return [...preferred, ...extras].slice(0, mobile ? 8 : 12);
  }, [usage, mobile]);

  if (usage.length === 0) return null;

  const selected =
    usage.find((item) => item.technology === active) ?? hub ?? usage[0];

  return (
    <section>
      <p className="kicker">Technology cluster</p>
      <h2 className="display display-section mt-3 text-white">
        Machine learning
        <span className="italic text-cyan"> cluster.</span>
      </h2>
      <p className="mt-3 max-w-xl text-sm text-muted">
        Only technologies that appear on real projects. Nothing is added for decoration.
      </p>

      <div
        className={`ml-cluster mt-10 ${mobile ? "is-stack" : ""}`}
        onMouseLeave={() => setActive(hub?.technology ?? null)}
      >
        {hub ? (
          <button
            type="button"
            className={`ml-cluster-hub ${active === hub.technology ? "is-active" : ""}`}
            onMouseEnter={() => setActive(hub.technology)}
            onFocus={() => setActive(hub.technology)}
            onClick={() => setActive(hub.technology)}
          >
            Machine Learning
            <span>{hub.count} projects</span>
          </button>
        ) : null}
        {orbit.map((name, index) => {
          const item = usage.find((entry) => entry.technology === name);
          if (!item) return null;
          const angle = (index / orbit.length) * Math.PI * 2 - Math.PI / 2;
          return (
            <button
              key={name}
              type="button"
              className={`ml-cluster-node ${active === name ? "is-active" : ""}`}
              style={
                mobile
                  ? undefined
                  : {
                      left: `${50 + Math.cos(angle) * 38}%`,
                      top: `${50 + Math.sin(angle) * 38}%`,
                    }
              }
              onMouseEnter={() => setActive(name)}
              onFocus={() => setActive(name)}
              onClick={() => setActive(name)}
            >
              {name}
            </button>
          );
        })}
      </div>

      {selected ? (
        <p className="mt-6 font-mono text-[11px] tracking-[0.16em] text-muted uppercase">
          {selected.technology} · {selected.count} project
          {selected.count === 1 ? "" : "s"} ·{" "}
          {selected.projects.join(" · ")}
        </p>
      ) : null}
    </section>
  );
}
