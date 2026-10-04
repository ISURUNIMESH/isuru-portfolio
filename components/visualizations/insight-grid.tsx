import type {
  CategoryDistribution,
  ProjectGraph,
  TechnologyUsage,
} from "@/lib/projects";
import { CategoryDistributionChart } from "./category-distribution";
import { SkillConstellation } from "./skill-constellation";
import { TechnologyRelationships } from "./technology-relationships";
import { TechnologyUsageChart } from "./technology-usage";

interface InsightGridProps {
  categoryDistribution: CategoryDistribution[];
  technologyUsage: TechnologyUsage[];
  relationships: ProjectGraph;
  constellation: ProjectGraph;
}

export function InsightGrid({
  categoryDistribution,
  technologyUsage,
  relationships,
  constellation,
}: InsightGridProps) {
  return (
    <section id="insights" className="border-b border-line">
      <div className="mx-auto max-w-7xl px-6 py-20">
        <p className="kicker">05 — Living visualizations</p>
        <h2 className="display mt-4 max-w-3xl text-4xl text-white sm:text-6xl">
          Charts that read the registry, not a spreadsheet.
        </h2>
        <div className="mt-12 grid gap-5 lg:grid-cols-2">
          <CategoryDistributionChart data={categoryDistribution} />
          <TechnologyUsageChart data={technologyUsage} />
          <TechnologyRelationships graph={relationships} />
          <SkillConstellation graph={constellation} />
        </div>
      </div>
    </section>
  );
}
