import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");

const projects = [
  {
    slug: "gridguard-ai",
    title: "GridGuard AI",
    kicker: "Predictive maintenance",
    color: "#3ee0c5",
    accent: "#0b3d38",
    motif: "grid",
  },
  {
    slug: "ai-startup-cofounder",
    title: "AI Startup Cofounder",
    kicker: "Multi-agent research",
    color: "#8b7cff",
    accent: "#241b4d",
    motif: "agents",
  },
  {
    slug: "retailsense-ai",
    title: "RetailSense AI",
    kicker: "Demand forecasting",
    color: "#f0b429",
    accent: "#3d2c08",
    motif: "bars",
  },
  {
    slug: "fraud-detection-system",
    title: "Fraud Detection",
    kicker: "Risk scoring",
    color: "#ff6b6b",
    accent: "#3d1218",
    motif: "pulse",
  },
  {
    slug: "stress-prediction-xai",
    title: "Stress Prediction XAI",
    kicker: "Explainable models",
    color: "#5ad0ff",
    accent: "#0a3140",
    motif: "shap",
  },
  {
    slug: "predictive-analytics-suite",
    title: "Analytics Suite",
    kicker: "ML workbench",
    color: "#7cf29a",
    accent: "#12301c",
    motif: "scatter",
  },
  {
    slug: "buildmate-supplier-service",
    title: "BuildMate Supplier",
    kicker: "Service architecture",
    color: "#d4a373",
    accent: "#2c1d12",
    motif: "nodes",
  },
  {
    slug: "fuel-qr-website",
    title: "Fuel QR Website",
    kicker: "Station operations",
    color: "#ffa94d",
    accent: "#3b2208",
    motif: "scan",
  },
  {
    slug: "student-performance-ml",
    title: "Student Performance",
    kicker: "Score prediction",
    color: "#74c0fc",
    accent: "#0c2a44",
    motif: "trend",
  },
  {
    slug: "hospital-management",
    title: "Hospital Management",
    kicker: "Clinic operations",
    color: "#63e6be",
    accent: "#0d3329",
    motif: "cards",
  },
  {
    slug: "ipl-match-prediction",
    title: "IPL Match Prediction",
    kicker: "Sports analytics",
    color: "#ff922b",
    accent: "#3b1d06",
    motif: "radar",
  },
];

function esc(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

function motifMarkup(motif, color, width, height) {
  if (motif === "grid") {
    return Array.from({ length: 8 }, (_, row) =>
      Array.from({ length: 12 }, (_, col) => {
        const x = 80 + col * ((width - 160) / 11);
        const y = 90 + row * ((height - 180) / 7);
        const lit = (row + col) % 3 === 0;
        return `<rect x="${x}" y="${y}" width="18" height="18" fill="${color}" fill-opacity="${lit ? 0.55 : 0.12}"/>`;
      }).join(""),
    ).join("");
  }

  if (motif === "agents") {
    return `<circle cx="${width * 0.5}" cy="${height * 0.42}" r="18" fill="${color}"/>
      <circle cx="${width * 0.28}" cy="${height * 0.62}" r="12" fill="${color}" fill-opacity="0.7"/>
      <circle cx="${width * 0.72}" cy="${height * 0.58}" r="12" fill="${color}" fill-opacity="0.7"/>
      <circle cx="${width * 0.42}" cy="${height * 0.28}" r="10" fill="${color}" fill-opacity="0.45"/>
      <circle cx="${width * 0.68}" cy="${height * 0.3}" r="10" fill="${color}" fill-opacity="0.45"/>
      <path d="M${width * 0.5} ${height * 0.42} L${width * 0.28} ${height * 0.62} M${width * 0.5} ${height * 0.42} L${width * 0.72} ${height * 0.58} M${width * 0.5} ${height * 0.42} L${width * 0.42} ${height * 0.28} M${width * 0.5} ${height * 0.42} L${width * 0.68} ${height * 0.3}" stroke="${color}" stroke-width="1.4" fill="none"/>`;
  }

  if (motif === "bars") {
    const bars = [0.35, 0.55, 0.42, 0.78, 0.5, 0.66, 0.4, 0.9, 0.58, 0.72];
    return bars
      .map((h, i) => {
        const w = (width - 200) / bars.length - 12;
        const x = 100 + i * (w + 12);
        const bh = h * (height * 0.45);
        return `<rect x="${x}" y="${height - 90 - bh}" width="${w}" height="${bh}" fill="${color}" fill-opacity="${0.35 + h * 0.5}"/>`;
      })
      .join("");
  }

  if (motif === "pulse") {
    return `<path d="M60 ${height * 0.55} L180 ${height * 0.55} L220 ${height * 0.28} L270 ${height * 0.72} L320 ${height * 0.4} L380 ${height * 0.55} L${width - 80} ${height * 0.55}" fill="none" stroke="${color}" stroke-width="3"/>
      <circle cx="270" cy="${height * 0.72}" r="8" fill="${color}"/>`;
  }

  if (motif === "shap") {
    const rows = [0.82, 0.64, 0.5, 0.38, 0.24];
    return rows
      .map((w, i) => {
        const y = 110 + i * 48;
        return `<rect x="${width * 0.18}" y="${y}" width="${width * 0.55 * w}" height="22" fill="${color}" fill-opacity="${0.85 - i * 0.12}"/>`;
      })
      .join("");
  }

  if (motif === "scatter") {
    return Array.from({ length: 28 }, (_, i) => {
      const x = 120 + ((i * 97) % (width - 240));
      const y = 110 + ((i * 53) % (height - 220));
      return `<circle cx="${x}" cy="${y}" r="${4 + (i % 5)}" fill="${color}" fill-opacity="${0.25 + (i % 4) * 0.15}"/>`;
    }).join("");
  }

  if (motif === "nodes") {
    return `<rect x="140" y="140" width="220" height="90" fill="none" stroke="${color}" />
      <rect x="${width - 420}" y="220" width="220" height="90" fill="none" stroke="${color}" />
      <rect x="${width / 2 - 110}" y="${height - 200}" width="220" height="90" fill="none" stroke="${color}" />
      <path d="M250 230 L${width - 310} 265 M${width - 310} 310 L${width / 2} ${height - 200}" stroke="${color}" fill="none"/>`;
  }

  if (motif === "scan") {
    return `<rect x="${width / 2 - 90}" y="${height / 2 - 90}" width="180" height="180" fill="none" stroke="${color}" stroke-width="3"/>
      <path d="M${width / 2 - 90} ${height / 2 - 40} H${width / 2 + 90}" stroke="${color}" stroke-width="2">
        <animate attributeName="d" values="M${width / 2 - 90} ${height / 2 - 70} H${width / 2 + 90};M${width / 2 - 90} ${height / 2 + 70} H${width / 2 + 90};M${width / 2 - 90} ${height / 2 - 70} H${width / 2 + 90}" dur="3s" repeatCount="indefinite"/>
      </path>`;
  }

  if (motif === "trend") {
    return `<path d="M80 ${height * 0.7} C 220 ${height * 0.72}, 280 ${height * 0.4}, 420 ${height * 0.38} S 640 ${height * 0.22}, ${width - 80} ${height * 0.18}" fill="none" stroke="${color}" stroke-width="3"/>
      <circle cx="${width - 80}" cy="${height * 0.18}" r="8" fill="${color}"/>`;
  }

  if (motif === "cards") {
    return `<rect x="120" y="130" width="280" height="170" fill="${color}" fill-opacity="0.16" stroke="${color}"/>
      <rect x="430" y="170" width="280" height="170" fill="${color}" fill-opacity="0.1" stroke="${color}"/>
      <rect x="740" y="150" width="280" height="170" fill="${color}" fill-opacity="0.2" stroke="${color}"/>`;
  }

  return `<circle cx="${width * 0.5}" cy="${height * 0.5}" r="90" fill="none" stroke="${color}"/>
    <circle cx="${width * 0.5}" cy="${height * 0.5}" r="140" fill="none" stroke="${color}" stroke-opacity="0.4"/>
    <path d="M${width * 0.5} ${height * 0.5} L${width * 0.5 + 90} ${height * 0.5 - 40}" stroke="${color}"/>`;
}

function plateSvg({
  width,
  height,
  title,
  kicker,
  color,
  accent,
  motif,
  variant,
}) {
  const label =
    variant === "hero" ? "CASE STUDY" : variant === "thumb" ? "PROJECT FILE" : "SYSTEM PREVIEW";
  const shift = variant === "gallery-2" ? 80 : variant === "gallery-3" ? -40 : 0;

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="glow" cx="20%" cy="10%">
      <stop offset="0%" stop-color="${color}" stop-opacity="0.55"/>
      <stop offset="55%" stop-color="${accent}" stop-opacity="1"/>
    </radialGradient>
    <pattern id="grid" width="48" height="48" patternUnits="userSpaceOnUse">
      <path d="M48 0 H0 V48" fill="none" stroke="${color}" stroke-opacity="0.08"/>
    </pattern>
  </defs>
  <rect width="${width}" height="${height}" fill="url(#glow)"/>
  <rect width="${width}" height="${height}" fill="url(#grid)"/>
  <g transform="translate(${shift},0)">
    ${motifMarkup(motif, color, width, height)}
  </g>
  <rect x="48" y="40" width="220" height="28" fill="none" stroke="${color}" stroke-opacity="0.5"/>
  <text x="60" y="59" fill="${color}" font-size="12" font-family="IBM Plex Mono, ui-monospace, monospace" letter-spacing="3">${label}</text>
  <text x="48" y="${height - 78}" fill="#f4f7fb" font-size="${Math.round(height * 0.07)}" font-family="Georgia, serif">${esc(title)}</text>
  <text x="48" y="${height - 44}" fill="${color}" font-size="18" font-family="IBM Plex Mono, ui-monospace, monospace">${esc(kicker)}</text>
  <circle cx="${width - 70}" cy="58" r="10" fill="${color}"/>
</svg>`;
}

const outputs = [
  { file: "cover.jpg", width: 1600, height: 1000, variant: "cover" },
  { file: "thumbnail.jpg", width: 1200, height: 750, variant: "thumb" },
  { file: "hero.jpg", width: 1920, height: 1080, variant: "hero" },
  { file: path.join("gallery", "01.jpg"), width: 1600, height: 1000, variant: "gallery-1" },
  { file: path.join("gallery", "02.jpg"), width: 1600, height: 1000, variant: "gallery-2" },
  { file: path.join("gallery", "03.jpg"), width: 1600, height: 1000, variant: "gallery-3" },
];

async function render(project, output) {
  const svg = plateSvg({
    width: output.width,
    height: output.height,
    title: project.title,
    kicker: project.kicker,
    color: project.color,
    accent: project.accent,
    motif: project.motif,
    variant: output.variant,
  });

  const dest = path.join(root, "public", "projects", project.slug, output.file);
  await mkdir(path.dirname(dest), { recursive: true });
  await sharp(Buffer.from(svg)).jpeg({ quality: 88, mozjpeg: true }).toFile(dest);
}

async function main() {
  for (const project of projects) {
    for (const output of outputs) {
      await render(project, output);
    }
    console.log(`wrote visuals for ${project.slug}`);
  }

  await writeFile(
    path.join(root, "public", "projects", "README.txt"),
    [
      "Project image convention",
      "",
      "public/projects/<slug>/cover.jpg",
      "public/projects/<slug>/thumbnail.jpg",
      "public/projects/<slug>/hero.jpg",
      "public/projects/<slug>/gallery/01.jpg",
      "",
      "Reference these as /projects/<slug>/cover.jpg in data/projects.ts.",
      "Replace any generated plate with a real screenshot — same filename, no code changes.",
      "",
    ].join("\n"),
  );
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
