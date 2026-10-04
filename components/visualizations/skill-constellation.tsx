import type { ProjectGraph } from "@/lib/projects";
import { layoutGraph } from "./graph-layout";

export function SkillConstellation({ graph }: { graph: ProjectGraph }) {
  const { nodes, links } = layoutGraph(graph, 640, 360, true);

  return (
    <div className="panel p-6">
      <p className="kicker">Skill constellation</p>
      <p className="mt-2 text-sm text-muted">
        Node size is usage. New technologies appear as soon as a project lists them.
      </p>
      <svg viewBox="0 0 640 360" className="mt-4 h-[280px] w-full">
        <circle cx="320" cy="180" r="120" fill="none" stroke="#7C3AED" strokeOpacity="0.12" />
        <circle cx="320" cy="180" r="70" fill="none" stroke="#7C3AED" strokeOpacity="0.08" />
        {links.map((link) => (
          <line
            key={`${link.source}-${link.target}`}
            x1={link.x1}
            y1={link.y1}
            x2={link.x2}
            y2={link.y2}
            stroke="#7C3AED"
            strokeOpacity="0.16"
          />
        ))}
        {nodes.map((node) => (
          <g key={node.id}>
            <circle
              cx={node.x}
              cy={node.y}
              r={5 + node.weight * 1.8}
              fill="#7C3AED"
              fillOpacity="0.18"
              stroke="#7C3AED"
            />
            <text
              x={node.x}
              y={node.y - 12 - node.weight}
              textAnchor="middle"
              fill="#0F172A"
              fontSize="9"
              fontFamily="IBM Plex Mono, ui-monospace, monospace"
            >
              {node.label}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
}
