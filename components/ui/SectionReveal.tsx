"use client";

import { motion } from "framer-motion";
import { fadeUp } from "@/lib/animations";
import { usePrefersReducedMotion } from "@/lib/motion-prefs";

export function SectionReveal({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const reduced = usePrefersReducedMotion();
  if (reduced) return <div className={className}>{children}</div>;

  return (
    <motion.div
      className={className}
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-12%" }}
      transition={{ delay }}
    >
      {children}
    </motion.div>
  );
}
