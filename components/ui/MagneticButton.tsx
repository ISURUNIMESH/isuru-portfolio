"use client";

import Link from "next/link";
import { useRef } from "react";
import { useIsMobile } from "@/lib/motion-prefs";

interface MagneticButtonProps {
  href: string;
  children: React.ReactNode;
  external?: boolean;
}

export function MagneticButton({ href, children, external }: MagneticButtonProps) {
  const ref = useRef<HTMLAnchorElement>(null);
  const mobile = useIsMobile();

  const onMove = (event: React.MouseEvent<HTMLAnchorElement>) => {
    if (mobile) return;
    const node = ref.current;
    if (!node) return;
    const box = node.getBoundingClientRect();
    const x = event.clientX - box.left - box.width / 2;
    const y = event.clientY - box.top - box.height / 2;
    node.style.transform = `translate(${x * 0.18}px, ${y * 0.18}px)`;
  };

  const onLeave = () => {
    if (ref.current) ref.current.style.transform = "translate(0, 0)";
  };

  return (
    <Link
      ref={ref}
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noreferrer" : undefined}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className="inline-flex min-h-12 w-full items-center justify-center rounded-xl border border-[#7C3AED] bg-gradient-to-r from-[#7C3AED] to-[#8B5CF6] px-5 py-3 text-sm font-semibold text-white shadow-[0_8px_20px_rgba(124,58,237,.22)] transition duration-200 hover:-translate-y-0.5 hover:from-[#6D28D9] hover:to-[#7C3AED] hover:shadow-[0_12px_24px_rgba(124,58,237,.3)] focus-visible:border-[#8B5CF6] focus-visible:text-white sm:w-auto"
    >
      {children}
    </Link>
  );
}
