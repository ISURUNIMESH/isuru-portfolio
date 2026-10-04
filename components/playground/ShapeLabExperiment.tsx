"use client";

import { usePointer } from "@/lib/motion-prefs";

export function ShapeLabExperiment() {
  const pointer = usePointer();

  return (
    <div className="flex h-48 items-center justify-center overflow-hidden sm:h-64">
      <div
        className="h-28 w-28 border border-cyan"
        style={{
          transform: `rotateX(${pointer.y * -18}deg) rotateY(${pointer.x * 22}deg)`,
        }}
      />
    </div>
  );
}
