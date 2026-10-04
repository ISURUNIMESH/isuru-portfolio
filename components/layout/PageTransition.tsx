"use client";

import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { pageTransition } from "@/lib/animations";
import { usePrefersReducedMotion } from "@/lib/motion-prefs";

export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const reduced = usePrefersReducedMotion();

  if (reduced) {
    return <div className="relative z-10 min-h-screen">{children}</div>;
  }

  return (
    <motion.div
      key={pathname}
      initial="initial"
      animate="enter"
      variants={pageTransition}
      className="relative z-10 min-h-screen"
    >
      {children}
    </motion.div>
  );
}
