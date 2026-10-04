"use client";

import { usePathname } from "next/navigation";
import { Navigation } from "./Navigation";
import { PageTransition } from "./PageTransition";
import { SceneBackground } from "@/components/three/SceneBackground";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { usePrefersReducedMotion } from "@/lib/motion-prefs";

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const reduced = usePrefersReducedMotion();
  const heavy =
    pathname === "/" ||
    pathname === "/explore" ||
    pathname === "/contact" ||
    pathname === "/playground";

  return (
    <>
      {!reduced ? <CustomCursor /> : null}
      {!heavy && !reduced ? (
        <div className="pointer-events-none fixed inset-0 z-0 opacity-50">
          <SceneBackground />
        </div>
      ) : null}
      <Navigation />
      <PageTransition>{children}</PageTransition>
    </>
  );
}
