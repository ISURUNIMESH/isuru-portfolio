import Link from "next/link";
import { profile } from "@/data/profile";

export function Footer() {
  return (
    <footer className="relative z-20 mt-16 border-t border-line bg-[#080C14]">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-8 sm:px-6 sm:py-10 md:flex-row md:items-end md:justify-between">
        <p className="display text-[clamp(1.6rem,6vw,1.9rem)] text-text">
          {profile.firstName}
          <span className="italic text-cyan"> {profile.lastName}</span>
        </p>
        <div className="flex flex-wrap gap-x-6 gap-y-3 font-mono text-[11px] tracking-[0.16em] text-muted uppercase">
          <Link href="/work" className="inline-flex min-h-11 items-center hover:text-cyan focus-visible:text-cyan">
            Archive
          </Link>
          <Link href={profile.github} className="inline-flex min-h-11 items-center hover:text-cyan focus-visible:text-cyan">
            GitHub
          </Link>
          <Link href={profile.linkedin} className="inline-flex min-h-11 items-center hover:text-cyan focus-visible:text-cyan">
            LinkedIn
          </Link>
          <Link href="/contact" className="inline-flex min-h-11 items-center hover:text-cyan focus-visible:text-cyan">
            Contact
          </Link>
        </div>
      </div>
    </footer>
  );
}
