import { redirect } from "next/navigation";

interface LegacyProjectProps {
  params: Promise<{ slug: string }>;
}

export default async function LegacyProjectPage({ params }: LegacyProjectProps) {
  const { slug } = await params;
  redirect(`/work/${slug}`);
}
