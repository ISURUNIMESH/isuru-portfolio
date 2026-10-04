"use client";

import { useEffect, useId, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { profile } from "@/data/profile";
import { ArrowUpRight, Menu, X } from "lucide-react";

const links = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/work", label: "Work" },
  { href: "/explore", label: "Explore" },
  { href: "/playground", label: "Playground" },
  { href: "/contact", label: "Contact" },
];

export function Navigation() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const menuId = useId();
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    const media = window.matchMedia("(min-width: 1024px)");
    const closeOnDesktop = () => {
      if (media.matches) setOpen(false);
    };
    closeOnDesktop();
    media.addEventListener("change", closeOnDesktop);
    return () => media.removeEventListener("change", closeOnDesktop);
  }, []);

  useEffect(() => {
    if (!open) return;
    const html = document.documentElement;
    const previousBody = document.body.style.overflow;
    const previousHtml = html.style.overflow;
    document.body.style.overflow = "hidden";
    html.style.overflow = "hidden";
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previousBody;
      html.style.overflow = previousHtml;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <header className="fixed top-0 right-0 left-0 z-50">
      <div className="relative z-50 mx-auto mt-3 flex max-w-7xl items-center justify-between rounded-2xl border border-line bg-[#0F1522]/95 px-4 py-2.5 shadow-[0_8px_30px_rgba(0,0,0,.24)] backdrop-blur-xl sm:px-6" style={{ width: "calc(100% - 2rem)" }}>
        <Link
          href="/"
          className="flex min-h-11 items-center gap-3 focus-visible:text-cyan"
          onClick={() => setOpen(false)}
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#1B2436] font-mono text-[11px] font-semibold tracking-wide text-violet shadow-[inset_0_0_0_1px_rgba(167,139,250,.18)]">
            IN
          </span>
          <span className="text-sm font-semibold text-text">{profile.name}</span>
        </Link>
        <nav className="hidden items-center gap-6 lg:flex" aria-label="Primary">
          {links.map((item) => {
            const active =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`min-h-10 inline-flex items-center rounded-xl px-3 text-[13px] font-medium transition focus-visible:text-cyan ${
                  active ? "bg-[#1B2436] text-violet" : "text-muted hover:bg-[#151C2C] hover:text-white"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
        <button
          ref={toggleRef}
          type="button"
          className="flex min-h-11 min-w-11 items-center justify-center rounded-xl text-sm font-medium text-text transition hover:bg-[#1B2436] focus-visible:text-violet lg:hidden"
          aria-expanded={open}
          aria-controls={menuId}
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>
      <div
        id={menuId}
        inert={open ? undefined : true}
        aria-hidden={!open}
        className={`fixed inset-0 z-40 bg-[#0B0F19]/98 backdrop-blur-xl transition duration-200 ease-out lg:hidden ${
          open ? "visible opacity-100" : "invisible pointer-events-none opacity-0"
        }`}
      >
        <nav
          aria-label="Mobile"
          className="mx-auto flex h-full max-w-7xl flex-col justify-center gap-2 px-6 pt-20"
        >
          {links.map((item) => {
            const active =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={`display flex min-h-16 items-center justify-between rounded-2xl px-5 py-2 text-[clamp(2rem,9vw,3.5rem)] tracking-tight transition focus-visible:text-cyan ${
                  active ? "bg-[#151C2C] text-violet shadow-[0_8px_24px_rgba(0,0,0,.18)]" : "text-text hover:bg-[#151C2C]"
                }`}
                style={{ transitionDelay: "0ms" }}
              >
                {item.label}
                {active ? <ArrowUpRight size={22} strokeWidth={1.5} /> : null}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
