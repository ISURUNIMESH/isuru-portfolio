import type { ProjectStatistics } from "@/lib/projects";

export function Hero({ statistics }: { statistics: ProjectStatistics }) {
  const metrics = [
    { label: "Projects", value: statistics.totalProjects },
    { label: "Featured", value: statistics.featuredCount },
    { label: "Categories", value: statistics.uniqueCategories },
    { label: "Technologies", value: statistics.uniqueTechnologies },
  ];

  return (
    <section className="relative overflow-hidden border-b border-line">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-20 lg:grid-cols-[1.3fr_0.7fr] lg:py-28">
        <div>
          <p className="kicker">Python · Data Science · Applied AI</p>
          <h1 className="display mt-6 max-w-4xl text-5xl text-text sm:text-7xl lg:text-[6.4rem]">
            Systems that turn
            <span className="italic text-cyan"> noisy signals </span>
            into decisions.
          </h1>
          <p className="mt-8 max-w-xl text-lg leading-relaxed text-muted">
            I&apos;m K. G. Isuru Nimesh. I build predictive, explainable, and
            operational AI — from transformer health monitoring to multi-agent
            research systems.
          </p>
        </div>
        <aside className="panel grid grid-cols-2 self-end">
          {metrics.map((metric, index) => (
            <div
              key={metric.label}
              className={`p-5 ${index % 2 === 0 ? "border-r border-line" : ""} ${
                index < 2 ? "border-b border-line" : ""
              } ${""}`}
            >
              <p className="font-mono text-[10px] tracking-[0.2em] text-muted uppercase">
                {metric.label}
              </p>
              <p className="display mt-3 text-4xl text-text">
                {String(metric.value).padStart(2, "0")}
              </p>
            </div>
          ))}
        </aside>
      </div>
    </section>
  );
}
