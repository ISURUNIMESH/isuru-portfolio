import Link from "next/link";
import { projectService } from "@/lib/projects/project-service";

const nav = [
  { href: "/#work", label: "Work" },
  { href: "/#featured", label: "Featured" },
  { href: "/#explorer", label: "Explorer" },
  { href: "/#motion", label: "Data" },
];

export function SiteHeader() {
  const count = projectService.getAllProjects().length;

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-ink/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-baseline gap-3">
          <span className="font-mono text-[11px] tracking-[0.28em] text-cyan">
            KN / 26
          </span>
          <span className="text-sm font-medium text-white">Isuru Nimesh</span>
        </Link>
        <nav className="hidden items-center gap-7 md:flex">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="font-mono text-[11px] tracking-[0.18em] text-muted uppercase transition hover:text-white"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="font-mono text-[11px] tracking-[0.16em] text-muted uppercase">
          {String(count).padStart(2, "0")} projects
        </div>
      </div>
    </header>
  );
}
