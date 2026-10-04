"use client";

export function DataFlowExperiment() {
  return (
    <svg viewBox="0 0 400 180" className="h-48 w-full sm:h-64">
      {[0, 1, 2].map((lane) => (
        <g key={lane}>
          <circle cx="40" cy={40 + lane * 50} r="6" fill="#8B5CF6" />
          <circle cx="360" cy={40 + lane * 50} r="6" fill="#7C3AED" />
          <path
            d={`M46 ${40 + lane * 50} C 160 ${10 + lane * 50}, 240 ${70 + lane * 50}, 354 ${40 + lane * 50}`}
            fill="none"
            stroke="#7C3AED"
            strokeOpacity="0.4"
          >
            <animate
              attributeName="stroke-dasharray"
              values="0 320; 80 240; 0 320"
              dur={`${3 + lane}s`}
              repeatCount="indefinite"
            />
          </path>
        </g>
      ))}
    </svg>
  );
}
