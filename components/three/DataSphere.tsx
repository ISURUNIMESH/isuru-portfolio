"use client";

export function DataSphere() {
  return (
    <mesh>
      <icosahedronGeometry args={[1, 1]} />
      <meshBasicMaterial color="#7C3AED" wireframe transparent opacity={0.25} />
    </mesh>
  );
}
