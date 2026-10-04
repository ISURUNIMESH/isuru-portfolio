export interface Experiment {
  id: string;
  title: string;
  kicker: string;
  description: string;
  component: "ParticleField" | "DataFlow" | "ShapeLab" | "ColorField";
}

export const experiments: Experiment[] = [
  {
    id: "particle-field",
    title: "Particle Field",
    kicker: "01",
    description: "Pointer gravity bends a quiet field of points.",
    component: "ParticleField",
  },
  {
    id: "data-flow",
    title: "Data Flow",
    kicker: "02",
    description: "Signals travel between nodes and settle into a circuit.",
    component: "DataFlow",
  },
  {
    id: "shape-lab",
    title: "Shape Lab",
    kicker: "03",
    description: "A low-poly body tilts with the cursor, never spinning out.",
    component: "ShapeLab",
  },
  {
    id: "color-field",
    title: "Color Field",
    kicker: "04",
    description: "A slow chromatic wash that follows the pointer like weather.",
    component: "ColorField",
  },
];
