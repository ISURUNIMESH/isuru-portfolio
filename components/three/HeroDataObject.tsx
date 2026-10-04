"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useIsMobile, usePointer } from "@/lib/motion-prefs";

function fibonacciSphere(count: number, radius: number) {
  const points: THREE.Vector3[] = [];
  const golden = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < count; i += 1) {
    const y = 1 - (i / (count - 1)) * 2;
    const r = Math.sqrt(1 - y * y);
    const theta = golden * i;
    points.push(new THREE.Vector3(Math.cos(theta) * r * radius, y * radius, Math.sin(theta) * r * radius));
  }
  return points;
}

export function HeroDataObject() {
  const group = useRef<THREE.Group>(null);
  const pointer = usePointer();
  const mobile = useIsMobile();
  const intro = useRef(0);
  const nodeCount = mobile ? 28 : 72;
  const linkDistance = mobile ? 1.25 : 1.05;

  const { positions, linePositions } = useMemo(() => {
    const nodes = fibonacciSphere(nodeCount, 1.7);
    const pos = new Float32Array(nodes.length * 3);
    nodes.forEach((node, i) => {
      pos[i * 3] = node.x;
      pos[i * 3 + 1] = node.y;
      pos[i * 3 + 2] = node.z;
    });

    const lines: number[] = [];
    for (let i = 0; i < nodes.length; i += 1) {
      for (let j = i + 1; j < nodes.length; j += 1) {
        if (nodes[i].distanceTo(nodes[j]) < linkDistance) {
          lines.push(
            nodes[i].x,
            nodes[i].y,
            nodes[i].z,
            nodes[j].x,
            nodes[j].y,
            nodes[j].z,
          );
        }
      }
    }

    return {
      positions: pos,
      linePositions: new Float32Array(lines),
    };
  }, [linkDistance, nodeCount]);

  useFrame((_, delta) => {
    intro.current = Math.min(1, intro.current + delta * 0.35);
    if (!group.current) return;
    const t = intro.current;
    group.current.scale.setScalar(0.15 + t * 0.85);
    group.current.rotation.y += (mobile ? 0.06 : 0.12) * delta + pointer.x * 0.01;
    group.current.rotation.x = THREE.MathUtils.lerp(
      group.current.rotation.x,
      pointer.y * (mobile ? 0.1 : 0.22),
      0.04,
    );
  });

  return (
    <group ref={group}>
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        </bufferGeometry>
        <pointsMaterial
          color="#8B5CF6"
          size={0.045}
          transparent
          opacity={0.9}
          depthWrite={false}
        />
      </points>
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[linePositions, 3]} />
        </bufferGeometry>
        <lineBasicMaterial color="#7C3AED" transparent opacity={0.28} />
      </lineSegments>
      {mobile ? null : (
        <mesh>
          <icosahedronGeometry args={[0.55, 0]} />
          <meshBasicMaterial color="#7C3AED" wireframe transparent opacity={0.18} />
        </mesh>
      )}
    </group>
  );
}
