import Link from "next/link";
import { projectService } from "@/lib/projects/project-service";

export function SiteFooter() {
  const stats = projectService.getProjectStatistics();

  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-6 py-10 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="kicker">Add once → update everywhere</p>
          <p className="mt-3 max-w-md text-sm text-muted">
            {stats.totalProjects} projects, {stats.uniqueCategories} categories,{" "}
            {stats.uniqueTechnologies} technologies — all derived from{" "}
            <code className="text-cyan">data/projects.ts</code>.
          </p>
        </div>
        <div className="flex gap-6 font-mono text-[11px] tracking-[0.16em] text-muted uppercase">
          <Link href="https://github.com/ISURUNIMESH" className="hover:text-white">
            GitHub
          </Link>
          <Link
            href="https://linkedin.com/in/isuru-nimesh-704706349"
            className="hover:text-white"
          >
            LinkedIn
          </Link>
          <Link href="/#explorer" className="hover:text-white">
            Catalog
          </Link>
        </div>
      </div>
    </footer>
  );
}
