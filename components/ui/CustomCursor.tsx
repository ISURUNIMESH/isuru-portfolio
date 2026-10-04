"use client";

import { useEffect, useState } from "react";
import { useIsMobile } from "@/lib/motion-prefs";

export function CustomCursor() {
  const mobile = useIsMobile();
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (mobile) return;
    const move = (event: PointerEvent) => {
      setPos({ x: event.clientX, y: event.clientY });
      const target = event.target as HTMLElement | null;
      setActive(Boolean(target?.closest("a, button")));
    };
    window.addEventListener("pointermove", move, { passive: true });
    return () => window.removeEventListener("pointermove", move);
  }, [mobile]);

  if (mobile) return null;

  return (
    <div
      className="pointer-events-none fixed top-0 left-0 z-[90] hidden mix-blend-difference md:block"
      style={{ transform: `translate3d(${pos.x}px, ${pos.y}px, 0)` }}
    >
      <div
        className={`-translate-x-1/2 -translate-y-1/2 rounded-full border border-[#8B5CF6] transition-all duration-200 ${
          active ? "h-10 w-10 bg-white/10" : "h-3 w-3 bg-white"
        }`}
      />
    </div>
  );
}
