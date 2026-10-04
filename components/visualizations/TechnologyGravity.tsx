import type { TechnologyUsage } from "@/lib/projects";

export function TechnologyGravity({ usage }: { usage: TechnologyUsage[] }) {
  const max = Math.max(...usage.map((item) => item.count), 1);

  return (
    <section>
      <p className="kicker">Visualization 02</p>
      <h2 className="display display-section mt-3 text-white">Technology gravity</h2>
      <p className="mt-3 max-w-xl text-sm text-muted">
        Mass is usage. Nothing here is drawn by hand.
      </p>
      <div className="mt-10 flex flex-wrap items-end gap-x-8 gap-y-10">
        {usage.map((item) => {
          const size = 18 + (item.count / max) * 72;
          return (
            <div key={item.technology} className="flex flex-col items-center gap-3">
              <span
                className="rounded-full bg-cyan"
                style={{
                  width: size,
                  height: size,
                  opacity: 0.35 + (item.count / max) * 0.6,
                }}
              />
              <p className="font-mono text-[10px] tracking-[0.14em] text-muted uppercase">
                {item.technology}
              </p>
              <p className="text-xs text-white">{item.count}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
