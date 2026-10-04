"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Project } from "@/lib/projects/project-schema";
import { getProjectHref } from "@/lib/projects/project-utils";

export function ProjectNavLink({
  project,
  index,
}: {
  project: Project;
  index?: number;
}) {
  const pathname = usePathname();
  const href = getProjectHref(project);
  const active = pathname === href;

  return (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      className={`project-nav-link ${active ? "is-active" : ""}`}
    >
      {index !== undefined ? (
        <span className="project-nav-index">
          {String(index + 1).padStart(2, "0")}
        </span>
      ) : null}
      <span className="project-nav-title">{project.title}</span>
      <span className="project-nav-arrow" aria-hidden>
        ↗
      </span>
    </Link>
  );
}
