"use client";

import { useMemo, useState } from "react";
import type { Project, ProjectStatus } from "@/lib/projects/project-schema";
import { filterProjects } from "@/lib/projects/project-utils";
import { ProjectCard } from "./project-card";
import { Search, SlidersHorizontal } from "lucide-react";

interface ProjectExplorerProps {
  projects: Project[];
  categories: string[];
  technologies: string[];
  statuses: ProjectStatus[];
}

export function ProjectExplorer({
  projects,
  categories,
  technologies,
  statuses,
}: ProjectExplorerProps) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<string | null>(null);
  const [technology, setTechnology] = useState<string | null>(null);
  const [status, setStatus] = useState<ProjectStatus | null>(null);

  const visible = useMemo(
    () =>
      filterProjects(projects, {
        query,
        category,
        technology,
        status,
      }),
    [projects, query, category, technology, status],
  );

  return (
    <section id="explorer" className="border-b border-line">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20">
        <p className="kicker">Find something interesting</p>
        <h2 className="display display-section mt-4 text-text">
          Explore the collection.
        </h2>
        <p className="mt-3 max-w-xl text-sm leading-6 text-muted sm:text-base">
          Filter by Machine Learning, Data Science, or any tag extracted from the registry.
        </p>

        <div className="panel mt-8 p-4 sm:p-6">
          <label className="mb-2 flex items-center gap-2 px-2 text-xs font-medium text-muted" htmlFor="project-search"><Search size={15} /> Search projects</label>
          <input
            id="project-search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search title, problem, technology..."
            className="w-full rounded-xl border border-line bg-[#101725] px-4 py-3 text-sm text-text outline-none transition placeholder:text-muted/80 focus:border-violet focus:ring-4 focus:ring-[#8B5CF626]"
          />
          <div className="hairline" />
          <div className="mt-4 flex items-center gap-2 text-xs font-medium text-muted"><SlidersHorizontal size={14} /> Refine results</div>
          <FilterRow
            label="Category"
            options={categories}
            value={category}
            onChange={setCategory}
          />
          <FilterRow
            label="Technology"
            options={technologies}
            value={technology}
            onChange={setTechnology}
          />
          <FilterRow
            label="Status"
            options={statuses}
            value={status}
            onChange={(next) => setStatus(next as ProjectStatus | null)}
          />
        </div>

        <p className="mt-6 font-mono text-[11px] tracking-[0.16em] text-muted uppercase">
          {String(visible.length).padStart(2, "0")} / {String(projects.length).padStart(2, "0")} visible
        </p>

        {visible.length === 0 ? (
          <p className="mt-10 text-sm text-muted">
            No projects match those filters. Clear a chip or add a new project
            object to the registry.
          </p>
        ) : (
          <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {visible.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

function FilterRow({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: string[];
  value: string | null;
  onChange: (value: string | null) => void;
}) {
  return (
    <div className="flex flex-col gap-3 border-t border-line py-4 sm:flex-row sm:items-start">
      <p className="w-28 shrink-0 pt-1 text-xs font-medium text-muted">
        {label}
      </p>
      <div className="flex flex-wrap gap-2">
        <Chip active={value === null} onClick={() => onChange(null)}>
          All
        </Chip>
        {options.map((option) => (
          <Chip
            key={option}
            active={value === option}
            onClick={() => onChange(value === option ? null : option)}
          >
            {option}
          </Chip>
        ))}
      </div>
    </div>
  );
}

function Chip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`min-h-11 border px-3 py-1 font-mono text-[10px] tracking-[0.14em] uppercase transition ${
        active
          ? "border-cyan bg-cyan text-white shadow-sm"
          : "border-line bg-[#151C2C] text-muted hover:border-violet hover:bg-[#1B2436] hover:text-white"
      }`}
    >
      {children}
    </button>
  );
}
