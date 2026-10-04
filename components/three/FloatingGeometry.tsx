"use client";

export function FloatingGeometry() {
  return (
    <mesh>
      <octahedronGeometry args={[0.8, 0]} />
      <meshBasicMaterial color="#8B5CF6" wireframe transparent opacity={0.4} />
    </mesh>
  );
}
