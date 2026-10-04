"use client";

import { useMemo } from "react";
import type {
  CategoryDistribution,
  ProjectStatistics,
  TechnologyUsage,
} from "@/lib/projects";

interface DataInMotionProps {
  statistics: ProjectStatistics;
  categoryDistribution: CategoryDistribution[];
  technologyUsage: TechnologyUsage[];
}

export function DataInMotion({
  statistics,
  categoryDistribution,
  technologyUsage,
}: DataInMotionProps) {
  const nodes = useMemo(() => {
    const topCategories = categoryDistribution.slice(0, 5);
    const width = 800;
    const height = 320;
    return topCategories.map((item, index) => {
      const t = topCategories.length === 1 ? 0.5 : index / (topCategories.length - 1);
      return {
        ...item,
        x: 80 + t * (width - 160),
        y: 70 + Math.sin(index * 1.4) * 48 + height / 3,
        r: 16 + item.count * 6,
      };
    });
  }, [categoryDistribution]);

  const topTech = technologyUsage[0];

  return (
    <section id="motion" className="border-b border-line">
      <div className="mx-auto max-w-7xl px-6 py-20">
        <p className="kicker">04 — Data in motion</p>
        <h2 className="display mt-4 max-w-3xl text-4xl text-white sm:text-6xl">
          Counts that move when the catalog grows.
        </h2>
        <div className="mt-12 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="grid grid-cols-2 gap-3">
            <Stat label="Total" value={statistics.totalProjects} />
            <Stat label="Featured" value={statistics.featuredCount} />
            <Stat label="Completed" value={statistics.statusCounts.completed} />
            <Stat
              label="In flight"
              value={
                statistics.statusCounts["in-progress"] +
                statistics.statusCounts.experimental
              }
            />
            <Stat label="Avg stack" value={statistics.averageTechnologiesPerProject} />
            <Stat
              label="Top tech"
              value={topTech ? topTech.count : 0}
              hint={topTech?.technology}
            />
          </div>
          <div className="panel overflow-hidden">
            <svg viewBox="0 0 800 320" className="h-[320px] w-full">
              {nodes.map((node, index) => {
                const next = nodes[index + 1];
                if (!next) return null;
                return (
                  <g key={`${node.category}-${next.category}`}>
                    <path
                      d={`M${node.x} ${node.y} C ${node.x + 80} ${node.y - 70}, ${next.x - 80} ${next.y + 70}, ${next.x} ${next.y}`}
                      fill="none"
                      stroke="#7C3AED"
                      strokeOpacity="0.35"
                      strokeWidth="1.4"
                    >
                      <animate
                        attributeName="stroke-dasharray"
                        values="0 320; 80 240; 0 320"
                        dur={`${4 + index}s`}
                        repeatCount="indefinite"
                      />
                    </path>
                  </g>
                );
              })}
              {nodes.map((node) => (
                <g key={node.category}>
                  <circle
                    cx={node.x}
                    cy={node.y}
                    r={node.r}
                    fill="#7C3AED"
                    fillOpacity="0.12"
                    stroke="#7C3AED"
                  />
                  <text
                    x={node.x}
                    y={node.y - node.r - 12}
                    textAnchor="middle"
                    fill="#0F172A"
                    fontSize="12"
                    fontFamily="IBM Plex Mono, ui-monospace, monospace"
                  >
                    {node.category}
                  </text>
                  <text
                    x={node.x}
                    y={node.y + 4}
                    textAnchor="middle"
                    fill="#7C3AED"
                    fontSize="13"
                    fontFamily="IBM Plex Mono, ui-monospace, monospace"
                  >
                    {node.count}
                  </text>
                </g>
              ))}
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}

function Stat({
  label,
  value,
  hint,
}: {
  label: string;
  value: number;
  hint?: string;
}) {
  return (
    <div className="panel p-5">
      <p className="font-mono text-[10px] tracking-[0.2em] text-muted uppercase">
        {label}
      </p>
      <p className="display mt-2 text-4xl text-white">
        {typeof value === "number" && value < 10 && Number.isInteger(value)
          ? String(value).padStart(2, "0")
          : value}
      </p>
      {hint ? <p className="mt-2 text-xs text-cyan">{hint}</p> : null}
    </div>
  );
}
