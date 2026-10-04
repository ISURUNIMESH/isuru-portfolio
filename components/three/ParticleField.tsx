"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useIsMobile, usePointer } from "@/lib/motion-prefs";

export function ParticleField({ count }: { count?: number }) {
  const mobile = useIsMobile();
  const pointer = usePointer();
  const points = useRef<THREE.Points>(null);
  const amount = count ?? (mobile ? 72 : 380);

  const positions = useMemo(() => {
    const data = new Float32Array(amount * 3);
    for (let i = 0; i < amount; i += 1) {
      data[i * 3] = (Math.random() - 0.5) * 16;
      data[i * 3 + 1] = (Math.random() - 0.5) * 10;
      data[i * 3 + 2] = (Math.random() - 0.5) * 8;
    }
    return data;
  }, [amount]);

  useFrame((state) => {
    if (!points.current) return;
    const speed = mobile ? 0.008 : 0.015;
    points.current.rotation.y = state.clock.elapsedTime * speed + pointer.x * (mobile ? 0.05 : 0.12);
    points.current.rotation.x = pointer.y * (mobile ? 0.04 : 0.08);
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.018}
        color="#7C3AED"
        transparent
        opacity={0.38}
        depthWrite={false}
        sizeAttenuation
      />
    </points>
  );
}
