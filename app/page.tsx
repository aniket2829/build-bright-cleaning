import Link from "next/link";
import { Aperture } from "@/components/aperture";
import { Container, Stars } from "@/components/page-parts";
import { ServiceIndex } from "@/components/service-index";
import { Sweep } from "@/components/sweep";
import { ArrowRight, Check, Key, Clock } from "@/components/icons";
import { business, cities, reviews } from "@/lib/content";

const steps = [
  {
    title: "Tell us about the house",
    body: "A few questions and about three minutes. Rooms, address, how often and when. No account, no call required.",
  },
  {
    title: "We send one number",
    body: "A person reads it and comes back with a fixed price for the job, not an hourly rate that grows while you watch.",
  },
  {
    title: "You meet your cleaner",
    body: "The first visit is the long one. They walk the house with you and write down what matters. After that, it is the same person on the same day.",
  },
];

const promises = [
  {
    icon: Key,
    title: "The same person, every visit",
    body: "You are matched with one cleaner who keeps your home. If they are away we tell you first, and send the same named substitute each time, so at most two people ever learn your house.",
  },
  {
    icon: Check,
    title: "The quote is the price",
    body: "Priced per job, not per hour. If we estimated wrong, that is ours to absorb. Nothing is ever added to an invoice after the fact.",
  },
  {
    icon: Clock,
    title: "Fixed within 48 hours",
    body: "Something not right? Send a photo within two days and your cleaner comes back and redoes that area. Not a credit note. The actual thing.",
  },
];

export default function Home() {
  const featured = [reviews[0], reviews[3], reviews[6]];

  return (
    <>
      {/* ------------------------------------------------------------- hero */}
      <section className="relative overflow-hidden">
        <Sweep />

        <Container className="relative">
          <div className="max-w-[36rem] pt-14 pb-16 sm:pt-20 sm:pb-20 lg:pt-28 lg:pb-24">
            <h1 style={{ "--d": "230ms" } as React.CSSProperties} className="arrive font-display display-tight text-[3.25rem] leading-[0.98] font-semibold text-frost-100 sm:text-7xl">
              Come home to it already&nbsp;done.
            </h1>
            <p style={{ "--d": "370ms" } as React.CSSProperties} className="arrive mt-8 text-xl leading-relaxed text-frost-200 sm:text-2xl">
              House cleaning in Edmonton, kept by one vetted cleaner who learns your
              home. Not a different crew every visit.
            </p>

            <div style={{ "--d": "500ms" } as React.CSSProperties} className="arrive mt-11 flex flex-wrap items-center gap-3">
              <Link
                href="/quote"
                className="group inline-flex items-center gap-2.5 rounded-full bg-amber-500 px-7 py-4 text-lg font-medium text-ink-900 no-underline transition-colors duration-300 hover:bg-amber-400"
              >
                Get your quote
                <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
              <Link
                href="/services"
                className="inline-flex items-center gap-2 rounded-full border border-dusk-600 px-7 py-4 text-lg text-frost-200 no-underline transition-colors duration-300 hover:border-frost-500 hover:text-frost-100"
              >
                See what is included
              </Link>
            </div>

            <p style={{ "--d": "620ms" } as React.CSSProperties} className="arrive mt-10 border-t border-dusk-700 pt-6 text-[0.9375rem] text-frost-200">
              Quoted per job, never per hour · {business.hours}
            </p>
          </div>
        </Container>
      </section>

      {/* ---------------------------------------------------------- promise */}
      <section className="border-t border-dusk-700 py-20 sm:py-28">
        <Container>
          <Aperture>
            <h2 className="font-display display-tight max-w-[20ch] text-4xl leading-[1.04] font-semibold text-frost-100 sm:text-5xl">
              Most cleaning companies send whoever is free. That is the problem.
            </h2>
            <p className="measure mt-7 text-lg leading-relaxed text-frost-200">
              A rotating crew starts from zero every visit. Where the vacuum lives, which room is
              off limits, that the dining table takes no spray at all: none of it survives to the
              next visit, so you re-explain it, or you stop and quietly watch the standard slide.
              One person learns your house in about four visits. After that the same visit buys
              noticeably more.
            </p>
          </Aperture>

          <ul className="mt-16 grid gap-x-10 gap-y-12 sm:grid-cols-3">
            {promises.map(({ icon: Icon, title, body }) => (
              <li key={title} className="border-t border-dusk-600 pt-6">
                <Icon className="h-6 w-6 text-frost-400" />
                <h3 className="font-display mt-5 text-2xl leading-tight font-semibold text-frost-100">
                  {title}
                </h3>
                <p className="mt-3 leading-relaxed text-frost-400">{body}</p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* ------------------------------------------------------------ index */}
      <section className="py-20 sm:py-24">
        <Container>
          <Aperture>
            <h2 className="font-display display-tight max-w-[16ch] text-4xl leading-[1.04] font-semibold text-frost-100 sm:text-5xl">
              Six services, one list.
            </h2>
            <p className="measure mt-6 text-lg leading-relaxed text-frost-400">
              Everything we do, written out plainly so you can find the one that matches the state
              of your house. Tell us which, and the quote comes back with the number for your home.
            </p>
          </Aperture>
          <div className="mt-14">
            <ServiceIndex />
          </div>
          <Link
            href="/services"
            className="mt-10 inline-flex items-center gap-2 text-frost-200 decoration-dusk-600 underline-offset-4 transition-colors duration-300 hover:text-amber-400 hover:decoration-amber-400"
          >
            What each one includes
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Container>
      </section>

      {/* ------------------------------------- the crossing: dusk to plaster */}
      <section className="warm-side relative bg-plaster-100 py-20 text-ink-700 sm:py-28">
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
            <h2 className="font-display display-tight max-w-[14ch] text-4xl leading-[1.04] font-semibold text-ink-900 sm:text-5xl">
              Three steps, and none of them is a phone tree.
            </h2>
          </Aperture>

          <ol className="mt-14 border-t border-plaster-300">
            {steps.map((step, i) => (
              <li
                key={step.title}
                className="grid grid-cols-[2.5rem_1fr] items-baseline gap-x-5 gap-y-2 border-b border-plaster-300 py-8 sm:grid-cols-[4rem_18rem_1fr] sm:gap-x-10"
              >
                <span className="tnum font-display text-2xl leading-none font-semibold text-pine-800">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="font-display text-2xl leading-tight font-semibold text-ink-900">
                  {step.title}
                </h3>
                <p className="col-start-2 leading-relaxed text-ink-700 sm:col-start-3">
                  {step.body}
                </p>
              </li>
            ))}
          </ol>

          <div className="mt-12 flex flex-wrap items-center gap-3">
            <Link
              href="/quote"
              className="group inline-flex items-center gap-2.5 rounded-full bg-amber-500 px-7 py-4 text-lg font-medium text-ink-900 no-underline transition-colors duration-300 hover:bg-amber-400"
            >
              Start the three minutes
              <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
            <a
              href={`tel:${business.phoneHref}`}
              className="tnum inline-flex items-center gap-2 rounded-full border border-plaster-300 px-7 py-4 text-lg text-ink-900 no-underline transition-colors duration-300 hover:border-ink-900"
            >
              Or call {business.phoneDisplay}
            </a>
          </div>
        </Container>
      </section>

      {/* ------------------------------------------------------------ proof */}
      <section className="warm-side bg-plaster-50 py-20 text-ink-700 sm:py-28">
        <Container>
          <div className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-3">
            <h2 className="font-display display-tight max-w-[18ch] text-4xl leading-[1.04] font-semibold text-ink-900 sm:text-5xl">
              People who stopped tidying before we arrive.
            </h2>
            <Link
              href="/reviews"
              className="inline-flex items-center gap-2 text-ink-900 decoration-plaster-300 underline-offset-4 transition-colors duration-300 hover:decoration-ink-900"
            >
              All reviews
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <ul className="mt-14 grid gap-x-10 gap-y-12 md:grid-cols-3">
            {featured.map((review) => (
              <li key={review.name} className="border-t border-plaster-300 pt-6">
                <Stars n={review.stars} />
                <blockquote className="font-display mt-5 text-xl leading-snug text-ink-900">
                  “{review.quote}”
                </blockquote>
                <p className="mt-5 text-[0.9375rem] text-ink-500">
                  <span className="font-medium text-ink-900">{review.name}</span> · {review.where}
                  <br />
                  {review.service} · {review.months}
                </p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* ----------------------------------------------------------- cities */}
      <section className="warm-side bg-plaster-50 pb-20 text-ink-700 sm:pb-28">
        <Container>
          <div
            className={`grid gap-x-10 gap-y-10 border-t border-plaster-300 pt-14 ${
              cities.length > 1 ? "md:grid-cols-2" : ""
            }`}
          >
            {cities.map((city) => (
              <Link
                key={city.slug}
                href={`/areas/${city.slug}`}
                className="group block no-underline"
              >
                <h2 className="font-display text-3xl leading-tight font-semibold text-ink-900 transition-colors duration-300 group-hover:text-pine-800">
                  {city.name}
                </h2>
                <p className="measure mt-3 leading-relaxed text-ink-700">{city.lede}</p>
                <p className="mt-4 flex items-center gap-2 text-[0.9375rem] font-medium text-ink-900">
                  {city.neighbourhoods.length}+ neighbourhoods
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </p>
              </Link>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
