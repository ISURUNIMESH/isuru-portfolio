"use client";

import { useIsMobile, usePointer } from "@/lib/motion-prefs";

export function ParticleFieldExperiment() {
  const pointer = usePointer();
  const mobile = useIsMobile();
  const dots = Array.from({ length: mobile ? 24 : 48 });

  return (
    <div className="relative h-48 overflow-hidden sm:h-64">
      {dots.map((_, index) => {
        const cols = mobile ? 6 : 8;
        const col = index % cols;
        const row = Math.floor(index / cols);
        const x = col * 12 + pointer.x * (mobile ? 8 : 18);
        const y = row * 14 + pointer.y * (mobile ? 6 : 14);
        return (
          <span
            key={index}
            className="absolute h-1 w-1 rounded-full bg-cyan"
            style={{
              left: `${12 + x}%`,
              top: `${18 + y}%`,
              opacity: 0.35 + ((index % 5) / 10),
            }}
          />
        );
      })}
    </div>
  );
}
