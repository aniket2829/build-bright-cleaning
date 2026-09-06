"use client";

import { useEffect } from "react";

/**
 * THE WARMING SCROLL: the site's one authored motion idea.
 *
 * `--warmth` runs 0 at the top of the document (the street) to 1 at the point
 * where the quote sits (inside). The header tint and the light bloom read it.
 * Under prefers-reduced-motion it is pinned to 1 once and no listener is
 * attached, so the warm end is simply where you already are.
 */
export function Warming() {
  useEffect(() => {
    const root = document.documentElement;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");

    if (reduced.matches) {
      root.style.setProperty("--warmth", "1");
      return;
    }

    let frame = 0;
    const update = () => {
      frame = 0;
      const travel = Math.max(1, document.body.scrollHeight - window.innerHeight);
      const progress = Math.min(1, Math.max(0, window.scrollY / travel));
      // Ease so the last third of the page carries most of the warmth.
      const warmth = Math.pow(progress, 0.72);
      root.style.setProperty("--warmth", warmth.toFixed(3));
    };

    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return null;
}
