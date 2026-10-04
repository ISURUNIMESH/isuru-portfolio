"use client";

import { motion } from "framer-motion";
import { HeroScene } from "@/components/three/HeroScene";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { profile } from "@/data/profile";
import { usePrefersReducedMotion } from "@/lib/motion-prefs";

export function Hero() {
  const reduced = usePrefersReducedMotion();

  return (
    <section className="relative min-h-[88svh] overflow-hidden pt-20 sm:min-h-[92svh]">
      <div className="absolute inset-0 z-0 opacity-70">
        {reduced ? <div className="h-full w-full bg-[#0B0F19]" /> : <HeroScene />}
      </div>
      <div className="pointer-events-none absolute -right-16 top-28 h-64 w-64 rounded-full bg-violet/15 blur-3xl sm:right-[8%] sm:top-36 sm:h-80 sm:w-80" />
      <div className="pointer-events-none absolute -left-20 bottom-12 h-56 w-56 rounded-full bg-sky/10 blur-3xl sm:left-[12%]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[34rem] bg-[radial-gradient(ellipse_at_72%_36%,rgba(139,92,246,.12),transparent_58%),radial-gradient(ellipse_at_25%_70%,rgba(56,189,248,.07),transparent_46%)]" />
      <div className="relative z-10 mx-auto flex min-h-[82svh] max-w-7xl flex-col justify-center px-4 pb-12 pt-28 sm:px-6 sm:pb-16 sm:pt-32">
        <motion.p
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
          className="mb-7 h-2.5 w-2.5 rounded-full bg-cyan shadow-[0_0_0_7px_rgba(124,58,237,.12)]"
        />
        <motion.h1 className="display text-text">
          <motion.span
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="display-hero block"
          >
            {profile.firstName.toUpperCase()}
          </motion.span>
          <motion.span
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="display-hero block italic text-cyan"
          >
            {profile.lastName.toUpperCase()}
          </motion.span>
        </motion.h1>
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="mt-7 flex max-w-2xl flex-col gap-4"
        >
          <p className="text-sm font-medium tracking-wide text-text sm:text-base">
            {profile.role}
          </p>
          <p className="text-xs font-medium tracking-wide text-cyan sm:text-sm">
            {profile.roles.slice(1).join(" · ")}
          </p>
          <p className="max-w-xl text-base leading-7 text-muted sm:text-lg">{profile.signal}</p>
          <div className="mt-4 flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:flex-wrap">
            <MagneticButton href="/work">View my work</MagneticButton>
            <MagneticButton href="/explore">Explore projects</MagneticButton>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
