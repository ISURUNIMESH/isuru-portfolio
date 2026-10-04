"use client";

export function ProjectOrb({ color = "#7C3AED" }: { color?: string }) {
  return (
    <mesh>
      <sphereGeometry args={[0.35, 16, 16]} />
      <meshBasicMaterial color={color} transparent opacity={0.8} />
    </mesh>
  );
}
