"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { profile } from "@/data/profile";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { ThreeCanvas } from "@/components/three/ThreeCanvas";
import { ContactField } from "@/components/three/ContactField";
import { usePrefersReducedMotion } from "@/lib/motion-prefs";

const ContactScene = dynamic(
  () =>
    Promise.resolve(function ContactScene({ connected }: { connected: number }) {
      return (
        <ThreeCanvas className="h-full w-full" camera={[0, 0, 6.5]}>
          <ContactField connected={connected} />
        </ThreeCanvas>
      );
    }),
  { ssr: false },
);

export function ContactExperience() {
  const reduced = usePrefersReducedMotion();
  const [connected, setConnected] = useState(0.08);

  useEffect(() => {
    const onScroll = () => {
      const max = Math.max(document.body.scrollHeight - window.innerHeight, 1);
      setConnected(0.08 + (window.scrollY / max) * 0.92);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="relative min-h-[82svh] overflow-x-clip pt-24 sm:pt-28">
      <div className="absolute inset-x-0 top-28 bottom-0 z-0 opacity-50">
        {reduced ? null : <ContactScene connected={connected} />}
      </div>
      <div className="relative z-10 mx-auto flex min-h-[72svh] max-w-7xl flex-col justify-center px-4 py-14 sm:px-6 sm:py-20">
        <div className="panel max-w-4xl rounded-3xl p-6 sm:p-10 lg:p-12">
        <p className="kicker">Say hello</p>
        <h1 className="display display-page mt-5 max-w-4xl text-text">
          Let&apos;s build
          <span className="italic text-cyan"> something </span>
          worth exploring.
        </h1>
        <div className="mt-10 flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:flex-wrap sm:gap-4">
          <MagneticButton href={profile.github} external>
            GitHub
          </MagneticButton>
          <MagneticButton href={profile.linkedin} external>
            LinkedIn
          </MagneticButton>
          {profile.email ? (
            <MagneticButton href={`mailto:${profile.email}`}>Email</MagneticButton>
          ) : null}
        </div>
        </div>
      </div>
    </div>
  );
}
