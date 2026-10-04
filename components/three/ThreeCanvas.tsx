"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { Canvas } from "@react-three/fiber";
import { useIsMobile, usePageVisible, usePrefersReducedMotion } from "@/lib/motion-prefs";

interface ThreeCanvasProps {
  children: ReactNode;
  className?: string;
  camera?: [number, number, number];
  fov?: number;
}

export function ThreeCanvas({
  children,
  className = "",
  camera = [0, 0, 6.2],
  fov = 42,
}: ThreeCanvasProps) {
  const reduced = usePrefersReducedMotion();
  const mobile = useIsMobile();
  const visible = usePageVisible();
  const host = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(true);

  useEffect(() => {
    const node = host.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.08 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  if (reduced) return <div className={className} />;

  return (
    <div ref={host} className={`h-full w-full ${className}`}>
      <Canvas
        className="h-full w-full"
        style={{ touchAction: "pan-y" }}
        dpr={mobile ? [1, 1] : [1, 1.45]}
        gl={{
          antialias: false,
          alpha: true,
          powerPreference: mobile ? "low-power" : "high-performance",
        }}
        camera={{ position: camera, fov: mobile ? 48 : fov }}
        frameloop={visible && inView ? "always" : "never"}
      >
        {children}
      </Canvas>
    </div>
  );
}
