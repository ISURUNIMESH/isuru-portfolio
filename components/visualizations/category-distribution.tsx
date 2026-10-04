import type { CategoryDistribution } from "@/lib/projects";

export function CategoryDistributionChart({
  data,
}: {
  data: CategoryDistribution[];
}) {
  const max = Math.max(...data.map((item) => item.count), 1);
  const total = data.reduce((sum, item) => sum + item.count, 0) || 1;
  let cursor = 0;
  const palette = ["#7C3AED", "#8B5CF6", "#F472B6", "#F472B6", "#38BDF8", "#8B5CF6"];

  return (
    <div className="panel p-6">
      <p className="kicker">Category distribution</p>
      <p className="mt-2 text-sm text-muted">
        Built with a reduce over project.category — never hardcoded.
      </p>
      <svg viewBox="0 0 320 180" className="mx-auto mt-6 h-44 w-full max-w-sm">
        {data.map((item, index) => {
          const slice = (item.count / total) * Math.PI * 2;
          const start = cursor;
          const end = cursor + slice;
          cursor = end;
          return (
            <path
              key={item.category}
              d={arc(160, 90, 68, start, end)}
              fill={palette[index % palette.length]}
              fillOpacity="0.85"
            />
          );
        })}
        <circle cx="160" cy="90" r="38" fill="#0F172A" />
        <text
          x="160"
          y="86"
          textAnchor="middle"
          fill="#0F172A"
          fontSize="18"
          fontFamily="Instrument Serif, Georgia, serif"
        >
          {data.length}
        </text>
        <text
          x="160"
          y="104"
          textAnchor="middle"
          fill="#64748B"
          fontSize="9"
          fontFamily="IBM Plex Mono, ui-monospace, monospace"
        >
          CATEGORIES
        </text>
      </svg>
      <ul className="mt-4 space-y-2">
        {data.map((item, index) => (
          <li key={item.category} className="flex items-center gap-3 text-sm">
            <span
              className="h-2 w-2"
              style={{ background: palette[index % palette.length] }}
            />
            <span className="flex-1 text-muted">{item.category}</span>
            <span className="font-mono text-white">{item.count}</span>
            <span className="w-24">
              <span
                className="block h-1 bg-cyan"
                style={{ width: `${(item.count / max) * 100}%` }}
              />
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function arc(cx: number, cy: number, r: number, start: number, end: number) {
  const x1 = cx + r * Math.cos(start - Math.PI / 2);
  const y1 = cy + r * Math.sin(start - Math.PI / 2);
  const x2 = cx + r * Math.cos(end - Math.PI / 2);
  const y2 = cy + r * Math.sin(end - Math.PI / 2);
  const large = end - start > Math.PI ? 1 : 0;
  return `M ${cx} ${cy} L ${x1} ${y1} A ${r} ${r} 0 ${large} 1 ${x2} ${y2} Z`;
}
