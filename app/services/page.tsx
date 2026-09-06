import type { Metadata } from "next";
import Link from "next/link";
import { Container, PageHero } from "@/components/page-parts";
import { Scale } from "@/components/scale";
import { ArrowRight } from "@/components/icons";
import { services } from "@/lib/content";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Recurring, deep, move-in/move-out and one-time house cleaning in Calgary and Edmonton: what each one covers, what it costs to start, and how long it takes.",
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        title="Four services. No packages, no tiers, no upsell script."
        lede="Every one is quoted as a fixed price for the job. Pick the one that matches the state of your house, and if you pick wrong we will tell you before we start rather than after."
      />

      <section className="warm-side bg-plaster-100 py-20 text-ink-700 sm:py-24">
        <Container>
          <Scale tone="warm" />
        </Container>
      </section>

      <section className="warm-side bg-plaster-50 pb-24 text-ink-700">
        <Container>
          <ul className="border-t border-plaster-300">
            {services.map((service) => (
              <li key={service.slug} className="border-b border-plaster-300">
                <div className="grid gap-x-12 gap-y-6 py-12 lg:grid-cols-[22rem_1fr]">
                  <div>
                    <h2 className="font-display display-tight text-3xl leading-tight font-semibold text-ink-900 sm:text-4xl">
                      <Link
                        href={`/services/${service.slug}`}
                        className="no-underline transition-colors duration-300 hover:text-pine-800"
                      >
                        {service.name}
                      </Link>
                    </h2>
                    <p className="tnum mt-3 text-[0.9375rem] text-ink-500">
                      From ${service.from} · {service.hours[0]}–{service.hours[1]} hours ·{" "}
                      {service.cadence}
                    </p>
                  </div>

                  <div>
                    <p className="measure text-lg leading-relaxed text-ink-900">{service.lede}</p>
                    <p className="measure mt-4 leading-relaxed text-ink-500">
                      <span className="font-medium text-ink-700">Best for:</span> {service.forWho}
                    </p>

                    <ul className="mt-7 flex flex-wrap gap-x-2 gap-y-2">
                      {service.rooms.map((room) => (
                        <li
                          key={room.room}
                          className="rounded-full border border-plaster-300 px-3.5 py-1.5 text-sm text-ink-700"
                        >
                          {room.room}
                          <span className="tnum ml-1.5 text-ink-500">{room.tasks.length}</span>
                        </li>
                      ))}
                    </ul>

                    <Link
                      href={`/services/${service.slug}`}
                      className="group mt-8 inline-flex items-center gap-2 font-medium text-ink-900 decoration-plaster-300 underline-offset-4 transition-colors duration-300 hover:decoration-ink-900"
                    >
                      Everything in a {service.shortName.toLowerCase()} clean
                      <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </Link>
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
