"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { business } from "@/lib/content";
import { ArrowRight, Mark, Phone } from "@/components/icons";

const nav = [
  { href: "/services", label: "Services" },
  { href: "/pricing", label: "Pricing" },
  { href: "/areas", label: "Areas" },
  { href: "/reviews", label: "Reviews" },
  { href: "/about", label: "About" },
  { href: "/blog", label: "Journal" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [lifted, setLifted] = useState(false);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    const onScroll = () => setLifted(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={`sticky top-0 z-50 transition-colors duration-500 ${
        lifted ? "bg-dusk-900/92 backdrop-blur-md" : "bg-transparent"
      }`}
      style={{
        borderBottom: "1px solid",
        borderBottomColor: lifted
          ? "color-mix(in oklab, var(--color-dusk-600) calc(100% - var(--warmth) * 70%), var(--color-amber-500) calc(var(--warmth) * 70%))"
          : "transparent",
      }}
    >
      <div className="mx-auto flex h-18 max-w-[86rem] items-center gap-6 px-5 py-4 sm:px-8">
        <Link
          href="/"
          className="group flex items-center gap-2.5 text-frost-100 no-underline"
          aria-label={`${business.name} home`}
        >
          <Mark className="h-7 w-7 text-amber-500 transition-transform duration-500 group-hover:scale-110" />
          <span className="font-display text-[1.0625rem] leading-none font-semibold tracking-tight">
            Build&nbsp;Bright
          </span>
        </Link>

        <nav className="ml-auto hidden items-center gap-1 lg:flex" aria-label="Main">
          {nav.map((item) => {
            const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={`rounded-full px-3.5 py-2 text-[0.9375rem] no-underline transition-colors duration-300 ${
                  active
                    ? "bg-dusk-700 text-frost-100"
                    : "text-frost-400 hover:bg-dusk-800 hover:text-frost-100"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="ml-auto flex items-center gap-2 lg:ml-4">
          <a
            href={`tel:${business.phoneHref}`}
            className="hidden items-center gap-2 rounded-full px-3.5 py-2 text-[0.9375rem] text-frost-200 no-underline transition-colors duration-300 hover:text-amber-400 md:inline-flex"
          >
            <Phone className="h-4 w-4" />
            <span className="tnum">{business.phoneDisplay}</span>
          </a>
          <Link
            href="/quote"
            className="group hidden items-center gap-2 rounded-full bg-amber-500 px-5 py-2.5 text-[0.9375rem] font-medium text-ink-900 no-underline transition-colors duration-300 hover:bg-amber-400 sm:inline-flex"
          >
            Get a quote
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
          </Link>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-dusk-600 text-frost-200 transition-colors duration-300 hover:border-amber-500 hover:text-amber-400 lg:hidden"
          >
            <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden>
              {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 8h16M4 16h16" />}
            </svg>
          </button>
        </div>
      </div>

      <div
        id="mobile-nav"
        hidden={!open}
        className="border-t border-dusk-700 bg-dusk-900 lg:hidden"
      >
        <nav className="mx-auto flex max-w-[86rem] flex-col px-5 py-3 sm:px-8" aria-label="Main">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="border-b border-dusk-800 py-3.5 font-display text-xl text-frost-100 no-underline last:border-b-0"
            >
              {item.label}
            </Link>
          ))}
          <div className="mt-4 flex flex-col gap-2 pb-2">
            <Link
              href="/quote"
              className="flex items-center justify-center gap-2 rounded-full bg-amber-500 px-5 py-3 font-medium text-ink-900 no-underline"
            >
              Get a quote
              <ArrowRight className="h-4 w-4" />
            </Link>
            <a
              href={`tel:${business.phoneHref}`}
              className="flex items-center justify-center gap-2 rounded-full border border-dusk-600 px-5 py-3 text-frost-200 no-underline"
            >
              <Phone className="h-4 w-4" />
              <span className="tnum">{business.phoneDisplay}</span>
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
}
