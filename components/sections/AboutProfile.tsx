"use client";

import { IdentityCore } from "@/components/three/IdentityCore";
import { profile } from "@/data/profile";
import { SectionReveal } from "@/components/ui/SectionReveal";

export function AboutProfile() {
  return (
    <div className="relative mx-auto max-w-7xl px-4 pt-24 pb-20 sm:px-6 sm:pt-28 sm:pb-24">
      <SectionReveal>
        <p className="kicker">A little introduction</p>
        <h1 className="display display-page mt-6 max-w-4xl text-text">
          Curious by nature,
          <span className="italic text-cyan"> thoughtful by design.</span>
        </h1>
        <p className="mt-6 max-w-xl text-base text-muted">{profile.signal}</p>
      </SectionReveal>

      <div className="mt-12 grid items-center gap-8 sm:mt-16 lg:grid-cols-[.85fr_1.15fr] lg:gap-12">
        <div className="panel overflow-hidden rounded-3xl bg-gradient-to-br from-[#1B2436] via-[#151C2C] to-[#101725] p-5 sm:p-8"><IdentityCore /></div>
        <div className="space-y-8 sm:space-y-10">
          <SectionReveal className="panel p-6 sm:p-8">
            <p className="kicker">Profile</p>
            <dl className="mt-6 space-y-5">
              <Row label="Name" value={profile.name} />
              <Row label="Roles" value={profile.roles.join(" · ")} />
              <Row label="Location" value={profile.location} />
            </dl>
            <p className="mt-8 max-w-md text-base leading-relaxed text-muted sm:text-lg">{profile.statement}</p>
          </SectionReveal>
          <SectionReveal delay={0.08} className="panel p-6 sm:p-8">
            <p className="kicker">Focus</p>
            <ul className="mt-6 flex flex-wrap gap-2">
              {profile.focus.map((item) => (
                <li key={item} className="rounded-full border border-line bg-[#1B2436] px-3 py-2 text-xs font-medium text-muted">{item}</li>
              ))}
            </ul>
          </SectionReveal>
          <SectionReveal delay={0.12} className="panel p-6 sm:p-8">
            <p className="kicker">Approach</p>
            <ol className="mt-6 space-y-3">
              {profile.approach.map((step, index) => (
                <li key={step} className="flex items-center gap-4">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#2B1F45] font-mono text-[11px] text-violet">{String(index + 1).padStart(2, "0")}</span>
                  <span className="text-base font-medium text-text sm:text-lg">{step}</span>
                </li>
              ))}
            </ol>
          </SectionReveal>
        </div>
      </div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-1 border-b border-line pb-4 sm:flex-row sm:items-baseline sm:justify-between">
      <dt className="font-mono text-[10px] tracking-[0.2em] text-muted uppercase">{label}</dt>
      <dd className="max-w-md text-base font-medium text-text sm:text-right sm:text-lg">{value}</dd>
    </div>
  );
}
