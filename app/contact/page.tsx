import type { Metadata } from "next";
import { ContactExperience } from "@/components/sections/ContactExperience";

export const metadata: Metadata = {
  title: "Contact",
};

export default function ContactPage() {
  return <ContactExperience />;
}
