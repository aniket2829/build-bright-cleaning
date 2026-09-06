import type { Metadata } from "next";
import Link from "next/link";
import { Container, PageHero } from "@/components/page-parts";
import { ArrowRight } from "@/components/icons";
import { cities } from "@/lib/content";

export const metadata: Metadata = {
  title: "Where we clean",
  description:
    "Build Bright cleans homes across Calgary and Edmonton: the neighbourhoods we cover and how quickly a quote comes back in each city.",
};

export default function AreasPage() {
  return (
    <>
      <PageHero
        title="Two cities, and we say no to the rest."
        lede="We only take work where we can hold the same cleaner on the same schedule. That keeps the map small on purpose: Calgary and Edmonton, and nothing we cannot cover properly."
      />

      <section className="warm-side bg-plaster-100 pt-20 pb-24 text-ink-700 sm:pt-24">
        <Container>
          <ul className="border-t border-plaster-300">
            {cities.map((city) => (
              <li key={city.slug} className="border-b border-plaster-300 py-12">
                <div className="grid gap-x-12 gap-y-8 lg:grid-cols-[20rem_1fr]">
                  <div>
                    <h2 className="font-display display-tight text-4xl leading-tight font-semibold text-ink-900 sm:text-5xl">
                      <Link
                        href={`/areas/${city.slug}`}
                        className="no-underline transition-colors duration-300 hover:text-pine-800"
                      >
                        {city.name}
                      </Link>
                    </h2>
                    <p className="mt-3 text-[0.9375rem] text-ink-500">{city.note}</p>
                    <Link
                      href={`/areas/${city.slug}`}
                      className="group mt-6 inline-flex items-center gap-2 font-medium text-ink-900 decoration-plaster-300 underline-offset-4 transition-colors duration-300 hover:decoration-ink-900"
                    >
                      Cleaning in {city.name}
                      <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </Link>
                  </div>

                  <div>
                    <p className="measure text-lg leading-relaxed text-ink-900">{city.lede}</p>
                    <ul className="mt-7 flex flex-wrap gap-x-2 gap-y-2">
                      {city.neighbourhoods.map((hood) => (
                        <li
                          key={hood}
                          className="rounded-full border border-plaster-300 px-3.5 py-1.5 text-sm text-ink-700"
                        >
                          {hood}
                        </li>
                      ))}
                    </ul>
                    <p className="mt-5 text-[0.9375rem] text-ink-500">
                      Not on the list? If you are inside the city, ask anyway. The list is where
                      we work most, not a boundary.
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </Container>
      </section>
    </>
  );
}
