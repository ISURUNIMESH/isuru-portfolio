import type { TechnologyUsage } from "@/lib/projects";

export function TechnologyUsageChart({ data }: { data: TechnologyUsage[] }) {
  const max = Math.max(...data.map((item) => item.count), 1);
  const rows = data.slice(0, 12);

  return (
    <div className="panel p-6">
      <p className="kicker">Technology usage</p>
      <p className="mt-2 text-sm text-muted">
        Frequency is counted across every project.technologies array.
      </p>
      <div className="mt-6 space-y-3">
        {rows.map((item) => (
          <div key={item.technology} className="grid grid-cols-[7.5rem_1fr_2rem] items-center gap-3">
            <p className="truncate font-mono text-[11px] text-muted">{item.technology}</p>
            <div className="h-2 bg-white/5">
              <div
                className="h-2 bg-violet"
                style={{ width: `${(item.count / max) * 100}%` }}
              />
            </div>
            <p className="text-right font-mono text-[11px] text-white">{item.count}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
