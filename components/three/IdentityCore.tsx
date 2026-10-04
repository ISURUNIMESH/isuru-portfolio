"use client";

import { profile } from "@/data/profile";

export function IdentityCore() {
  return (
    <div className="identity-core relative mx-auto aspect-square w-full max-w-md">
      <div className="absolute inset-[18%] rounded-full border border-line" />
      <div className="absolute inset-[32%] rounded-full border border-cyan/30" />
      <div className="absolute inset-0 animate-[orbit_28s_linear_infinite]">
        {profile.cores.map((core, index) => {
          const angle = (360 / profile.cores.length) * index;
          return (
            <span
              key={core}
              className="absolute top-1/2 left-1/2 font-mono text-[11px] tracking-[0.2em] text-cyan uppercase"
              style={{
                transform: `rotate(${angle}deg) translate(42%) rotate(-${angle}deg)`,
              }}
            >
              {core}
            </span>
          );
        })}
      </div>
      <div className="absolute inset-0 flex items-center justify-center">
        <p className="display text-center text-[clamp(1.6rem,7vw,2.25rem)] text-text">
          {profile.firstName}
          <br />
          <span className="italic text-cyan">{profile.lastName}</span>
        </p>
      </div>
    </div>
  );
}
