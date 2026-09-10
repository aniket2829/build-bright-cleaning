"use client";

import Script from "next/script";
import { usePathname, useSearchParams } from "next/navigation";
import { Suspense, useEffect } from "react";

/**
 * Google Analytics 4.
 *
 * Written directly against gtag.js rather than pulling in `@next/third-parties`
 * for one tag: it is a dependency the site would otherwise not carry, and the
 * one thing that package adds over a <Script> — re-sending a page_view on
 * client-side navigation — is the `PageViews` effect below.
 *
 * That effect matters. The App Router navigates without a document load, so a
 * plain gtag snippet records the landing page and then nothing: every visitor
 * looks like a one-page bounce, and /quote never appears as a destination.
 * `send_page_view: false` at config time hands pageview timing to the effect,
 * so each route is counted exactly once.
 *
 * The whole thing is gated on `NEXT_PUBLIC_GA_ID`. With no ID set — local
 * development, previews, anyone's fork — no script is requested at all, so
 * development traffic never lands in the production property.
 */

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: (...args: unknown[]) => void;
  }
}

function PageViews() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!GA_ID || typeof window.gtag !== "function") return;
    const query = searchParams.toString();
    window.gtag("event", "page_view", {
      page_path: query ? `${pathname}?${query}` : pathname,
      page_location: window.location.href,
      page_title: document.title,
    });
  }, [pathname, searchParams]);

  return null;
}

export function Analytics() {
  if (!GA_ID) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="afterInteractive"
      />
      <Script id="ga-init" strategy="afterInteractive">
        {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
window.gtag = gtag;
gtag('js', new Date());
gtag('config', '${GA_ID}', { send_page_view: false });`}
      </Script>
      {/* useSearchParams suspends during prerender; without this boundary the
          whole route would opt out of static rendering to accommodate a tag. */}
      <Suspense fallback={null}>
        <PageViews />
      </Suspense>
    </>
  );
}

/**
 * Report a conversion. Call this at the moment something actually happened —
 * a quote submitted, the phone number tapped — never on a page load, or the
 * number stops meaning anything.
 */
export function trackEvent(name: string, params?: Record<string, unknown>) {
  if (!GA_ID || typeof window === "undefined" || typeof window.gtag !== "function") {
    return;
  }
  window.gtag("event", name, params);
}
