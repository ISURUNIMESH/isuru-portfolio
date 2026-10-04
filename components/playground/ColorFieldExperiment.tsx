"use client";

import { usePointer } from "@/lib/motion-prefs";

export function ColorFieldExperiment() {
  const pointer = usePointer();
  const x = (pointer.x + 0.5) * 100;
  const y = (pointer.y + 0.5) * 100;

  return (
    <div
      className="h-48 w-full sm:h-64"
      style={{
        background: `radial-gradient(420px 220px at ${x}% ${y}%, rgba(124,58,237,0.17), rgba(56,189,248,0.10) 45%, transparent 70%)`,
      }}
    />
  );
}
