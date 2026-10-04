"use client";

import { useMemo, useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import type { TechnologyUsage } from "@/lib/projects";
import { useIsMobile, usePointer } from "@/lib/motion-prefs";

interface TechnologyUniverseProps {
  usage: TechnologyUsage[];
  onSelect?: (technology: string | null) => void;
  active?: string | null;
  highlight?: Set<string>;
}

export function TechnologyUniverse({
  usage,
  onSelect,
  active,
  highlight,
}: TechnologyUniverseProps) {
  const group = useRef<THREE.Group>(null);
  const pointer = usePointer();
  const mobile = useIsMobile();
  const max = Math.max(...usage.map((item) => item.count), 1);

  const nodes = useMemo(
    () =>
      usage.map((item, index) => {
        const phi = Math.acos(-1 + (2 * index) / usage.length);
        const theta = Math.sqrt(usage.length * Math.PI) * phi;
        const radius = mobile ? 2.1 : 2.4;
        return {
          ...item,
          position: [
            radius * Math.cos(theta) * Math.sin(phi),
            radius * Math.sin(theta) * Math.sin(phi),
            radius * Math.cos(phi),
          ] as [number, number, number],
          scale: 0.08 + (item.count / max) * (mobile ? 0.16 : 0.22),
        };
      }),
    [usage, max, mobile],
  );

  useFrame((_, delta) => {
    if (!group.current) return;
    group.current.rotation.y += delta * (mobile ? 0.04 : 0.08) + pointer.x * 0.01;
    group.current.rotation.x = THREE.MathUtils.lerp(
      group.current.rotation.x,
      pointer.y * (mobile ? 0.08 : 0.18),
      0.04,
    );
  });

  return (
    <group ref={group}>
      {nodes.map((node) => (
        <TechNode
          key={node.technology}
          node={node}
          active={active === node.technology}
          onSelect={onSelect}
          mobile={mobile}
          highlighted={highlight?.has(node.technology) ?? false}
        />
      ))}
    </group>
  );
}

function TechNode({
  node,
  active,
  onSelect,
  mobile,
  highlighted,
}: {
  node: {
    technology: string;
    position: [number, number, number];
    scale: number;
  };
  active: boolean;
  onSelect?: (technology: string | null) => void;
  mobile: boolean;
  highlighted: boolean;
}) {
  const [hovered, setHovered] = useState(false);
  const segments = mobile ? 8 : 12;
  const mlHub = node.technology === "Machine Learning";

  return (
    <mesh
      position={node.position}
      scale={active || hovered ? node.scale * 1.35 : node.scale * (mlHub ? 1.2 : 1)}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      onClick={() => onSelect?.(node.technology)}
    >
      <sphereGeometry args={[1, segments, segments]} />
      <meshBasicMaterial
        color={active || hovered || highlighted ? "#7C3AED" : "#8B5CF6"}
        transparent
        opacity={active || mlHub ? 0.95 : highlighted ? 0.82 : 0.7}
      />
    </mesh>
  );
}
