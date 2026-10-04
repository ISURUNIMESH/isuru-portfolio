import type { ProjectGraph } from "@/lib/projects";

export interface LaidOutLink {
  source: string;
  target: string;
  weight: number;
  x1: number;
  y1: number;
  x2: number;
  y2: number;
}

export interface LaidOutNode {
  id: string;
  label: string;
  weight: number;
  x: number;
  y: number;
}

export function layoutGraph(
  graph: ProjectGraph,
  width: number,
  height: number,
  radial = false,
) {
  const cx = width / 2;
  const cy = height / 2;
  const maxWeight = Math.max(...graph.nodes.map((node) => node.weight), 1);

  const nodes: LaidOutNode[] = graph.nodes.map((node, index) => {
    const angle = (index / Math.max(graph.nodes.length, 1)) * Math.PI * 2 - Math.PI / 2;
    const ring = radial
      ? 70 + (1 - node.weight / maxWeight) * 110
      : 90 + (index % 3) * 28;
    return {
      id: node.id,
      label: node.label,
      weight: node.weight,
      x: cx + Math.cos(angle) * ring,
      y: cy + Math.sin(angle) * (radial ? ring * 0.72 : ring * 0.78),
    };
  });

  const byId = new Map(nodes.map((node) => [node.id, node]));
  const links: LaidOutLink[] = graph.links
    .map((link) => {
      const source = byId.get(link.source);
      const target = byId.get(link.target);
      if (!source || !target) return null;
      return {
        ...link,
        x1: source.x,
        y1: source.y,
        x2: target.x,
        y2: target.y,
      };
    })
    .filter((link): link is LaidOutLink => link !== null);

  return { nodes, links };
}
