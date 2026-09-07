"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

/**
 * ARRIVAL: content crosses a widening aperture of light instead of fading in.
 *
 * Used only at threshold moments (the promise, the service index, the quote entry),
 * never as a blanket entrance on every section. Renders visible by default and
 * only arms itself once JS confirms motion is wanted, so no-JS and
 * reduced-motion readers get the finished composition immediately.
 */
export function Aperture({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [state, setState] = useState<"idle" | "armed" | "open">("idle");

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const rect = node.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.92) {
      // Already on screen at mount: open it without arming, no flash.
      setState("open");
      return;
    }

    setState("armed");
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setState("open");
            observer.disconnect();
          }
        }
      },
      { rootMargin: "0px 0px -12% 0px" },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`aperture ${className}`}
      data-armed={state === "armed" ? "true" : undefined}
      data-open={state === "open" ? "true" : undefined}
      style={delay ? { animationDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  );
}
