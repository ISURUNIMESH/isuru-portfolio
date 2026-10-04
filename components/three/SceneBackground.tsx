"use client";

import dynamic from "next/dynamic";
import { ThreeCanvas } from "./ThreeCanvas";
import { ParticleField } from "./ParticleField";
import { useIsMobile } from "@/lib/motion-prefs";

function AmbientInner() {
  const mobile = useIsMobile();
  return (
    <ThreeCanvas className="h-full w-full" camera={[0, 0, 8]}>
      <ParticleField count={mobile ? 48 : 160} />
    </ThreeCanvas>
  );
}

export const SceneBackground = dynamic(() => Promise.resolve(AmbientInner), {
  ssr: false,
  loading: () => null,
});
