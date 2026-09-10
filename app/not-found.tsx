import type { Metadata } from "next";
import Link from "next/link";
import { Aperture } from "@/components/aperture";
import { Container, PageHero } from "@/components/page-parts";
import { ServiceIndex } from "@/components/service-index";
import { ArrowRight } from "@/components/icons";
import { serviceArea } from "@/lib/content";

/* Next serves this with a 404 status, which is the signal that actually
   matters; the noindex is belt-and-braces for the crawlers and scrapers that
   index a body they liked regardless of the status line. */
export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: true },
};

/**
 * The page a visitor with intent lands on when the URL is wrong.
 *
 * It answers the question they actually have — *what is here, then?* — rather
 * than apologising and pointing at the front door. The recovery is the Service
 * Index: the same ruled list the rest of the site measures against, so someone
 * who wanted a service page gets all six, comparable, one click away.
 *
 * It crosses dusk to plaster like every other page. DESIGN.md's Temperature
 * Rule lists the 404 among the dusk grounds, which was true of a 404 with
 * nothing below the fold; giving it an argument earns it the crossing, under
 * the same rule's governing clause — cross once, forwards, at the point of
 * action. The rule's example list is amended to match rather than the page
 * breaking it.
 */
export default function NotFound() {
  return (
    <>
      <PageHero
        title="Wrong door."
        lede="That page moved, was renamed, or was never built. The light is still on next door."
        meta={
          <>
            <p className="tnum text-[0.9375rem] text-frost-400">
              Error 404 — this address has no page on it
            </p>

            <div className="mt-7 flex flex-wrap items-center gap-3">
              <Link
                href="/"
                className="group inline-flex items-center gap-2.5 rounded-full bg-amber-500 px-7 py-4 text-lg font-medium text-ink-900 no-underline transition-colors duration-300 hover:bg-amber-400"
              >
                Back to the front
                <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
              <Link
                href="/quote"
                className="inline-flex items-center gap-2 rounded-full border border-dusk-600 px-7 py-4 text-lg text-frost-200 no-underline transition-colors duration-300 hover:border-frost-500 hover:text-frost-100"
              >
                Get a quote
              </Link>
            </div>
          </>
        }
      />

      {/* ------------------------------------- the crossing: dusk to plaster */}
      <section className="warm-side relative bg-plaster-100 pt-20 pb-24 text-ink-700 sm:pt-24">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 -top-24 h-24"
          style={{
            background:
              "linear-gradient(to bottom, transparent, color-mix(in oklab, var(--color-amber-500) 12%, transparent))",
          }}
        />

        <Container>
          <Aperture>
            <h2 className="font-display display-tight max-w-[16ch] text-4xl leading-[1.04] font-semibold text-ink-900 sm:text-5xl">
              Next door, then.
            </h2>
          </Aperture>

          {/* The Index carries its own uppercase "What we do" head as an h3,
              so the h2 above it keeps the heading order unbroken. */}
          <div className="mt-14">
            <ServiceIndex tone="warm" />
          </div>

          <div className="mt-20 border-t border-plaster-300 pt-12">
            <div className="grid gap-x-16 gap-y-8 lg:grid-cols-[1fr_20rem]">
              <div>
                <h2 className="font-display display-tight max-w-[18ch] text-3xl leading-tight font-semibold text-ink-900 sm:text-4xl">
                  Or you were looking for somewhere.
                </h2>
                <p className="measure mt-5 leading-relaxed text-ink-700">
                  Edmonton and the nine communities around it. The same six services and
                  the same terms in every one of them.
                </p>
                <Link
                  href="/areas"
                  className="group mt-7 inline-flex items-center gap-2 font-medium text-ink-900 no-underline decoration-plaster-300 underline-offset-4 transition-colors duration-300 hover:text-pine-800"
                >
                  Where we clean
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </div>

              <ul className="flex flex-wrap gap-x-2 gap-y-2 self-start lg:mt-2">
                {serviceArea.map((place) => (
                  <li
                    key={place}
                    className="rounded-full border border-plaster-300 px-3.5 py-1.5 text-sm text-ink-700"
                  >
                    {place}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
