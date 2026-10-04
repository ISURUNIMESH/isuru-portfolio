"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useIsMobile, usePointer } from "@/lib/motion-prefs";

export function ContactField({ connected }: { connected: number }) {
  const group = useRef<THREE.Group>(null);
  const pointer = usePointer();
  const mobile = useIsMobile();
  const count = mobile ? 28 : 56;
  const torusSegments = mobile ? 32 : 64;

  const positions = useMemo(() => {
    const data = new Float32Array(count * 3);
    for (let i = 0; i < count; i += 1) {
      const t = (i / count) * Math.PI * 2;
      data[i * 3] = Math.cos(t) * 1.85;
      data[i * 3 + 1] = Math.sin(t * 2) * 0.7;
      data[i * 3 + 2] = Math.sin(t) * 1.85;
    }
    return data;
  }, [count]);

  useFrame((_, delta) => {
    if (!group.current) return;
    group.current.rotation.y += delta * (mobile ? 0.05 : 0.1) + pointer.x * 0.015;
    group.current.rotation.x = THREE.MathUtils.lerp(
      group.current.rotation.x,
      pointer.y * (mobile ? 0.08 : 0.15),
      0.04,
    );
    group.current.scale.setScalar(0.65 + connected * 0.45);
  });

  return (
    <group ref={group}>
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        </bufferGeometry>
        <pointsMaterial color="#7C3AED" size={mobile ? 0.07 : 0.055} transparent opacity={0.8} />
      </points>
      {mobile ? null : (
        <mesh>
          <torusGeometry args={[1.85, 0.01, 8, torusSegments]} />
          <meshBasicMaterial color="#8B5CF6" transparent opacity={0.2 + connected * 0.4} />
        </mesh>
      )}
    </group>
  );
}
