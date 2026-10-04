import type { ProjectGraph } from "@/lib/projects";
import { layoutGraph } from "./graph-layout";

export function TechnologyRelationships({ graph }: { graph: ProjectGraph }) {
  const { nodes, links } = layoutGraph(graph, 640, 360);

  return (
    <div className="panel p-6">
      <p className="kicker">Technology relationships</p>
      <p className="mt-2 text-sm text-muted">
        An edge means two technologies shipped in the same project.
      </p>
      <svg viewBox="0 0 640 360" className="mt-4 h-[280px] w-full">
        {links.map((link) => (
          <line
            key={`${link.source}-${link.target}`}
            x1={link.x1}
            y1={link.y1}
            x2={link.x2}
            y2={link.y2}
            stroke="#8B5CF6"
            strokeOpacity={0.18 + Math.min(link.weight, 4) * 0.1}
            strokeWidth={0.8 + link.weight * 0.4}
          />
        ))}
        {nodes.map((node) => (
          <g key={node.id}>
            <circle
              cx={node.x}
              cy={node.y}
              r={6 + node.weight * 1.6}
              fill="#8B5CF6"
              fillOpacity="0.2"
              stroke="#8B5CF6"
            />
            <text
              x={node.x}
              y={node.y + 18 + node.weight}
              textAnchor="middle"
              fill="#64748B"
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
