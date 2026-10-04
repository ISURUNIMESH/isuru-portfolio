"use client";

import dynamic from "next/dynamic";
import { ThreeCanvas } from "./ThreeCanvas";
import { ParticleField } from "./ParticleField";
import { HeroDataObject } from "./HeroDataObject";

function HeroSceneInner() {
  return (
    <ThreeCanvas className="h-full w-full" camera={[0, 0.2, 6.4]}>
      <color attach="background" args={["#0B0F19"]} />
      <fog attach="fog" args={["#0B0F19", 7, 16]} />
      <ParticleField />
      <HeroDataObject />
    </ThreeCanvas>
  );
}

export const HeroScene = dynamic(() => Promise.resolve(HeroSceneInner), {
  ssr: false,
  loading: () => <div className="h-full w-full bg-[#0B0F19]" />,
});
