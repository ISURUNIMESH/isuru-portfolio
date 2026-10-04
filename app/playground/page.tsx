import type { Metadata } from "next";
import { PlaygroundExperiments } from "@/components/sections/PlaygroundExperiments";
import { experiments } from "@/data/experiments";

export const metadata: Metadata = {
  title: "Playground",
};

export default function PlaygroundPage() {
  return <PlaygroundExperiments experiments={experiments} />;
}
