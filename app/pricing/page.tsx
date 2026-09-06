import type { Metadata } from "next";
import Link from "next/link";
import { Container, PageHero } from "@/components/page-parts";
import { ArrowRight, Check } from "@/components/icons";
import { estimate, services } from "@/lib/content";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Fixed prices per job, starting at $149. See what a clean costs by home size in Calgary and Edmonton, what moves the number, and what never does.",
};

const SIZES = [
  { beds: 1, baths: 1, label: "1 bed" },
  { beds: 2, baths: 1, label: "2 bed" },
  { beds: 3, baths: 2, label: "3 bed" },
  { beds: 4, baths: 3, label: "4 bed" },
];

const moves = [
  "How many bedrooms and bathrooms there are",
  "Which service you booked, and how long it honestly takes",
  "Anything you added: inside the oven, interior windows, a second fridge",
  "Whether the home is occupied or empty",
];

const neverMoves = [
  "Whether you have pets",
  "How long the visit actually ran, if we estimated it wrong",
  "Which day of the week you booked",
  "Anything discovered mid-visit that we did not call you about first",
];

export default function PricingPage() {
  return (
    <>
      <PageHero
        title="The quote is the price."
        lede="We price the job, not the hour. That means the number you agree to is the number on the invoice, and if a clean takes longer than we estimated, that is our mistake to absorb rather than your bill to inherit."
      />

      <section className="warm-side bg-plaster-100 py-20 text-ink-700 sm:py-24">
        <Container>
          <h2 className="font-display display-tight max-w-[20ch] text-4xl leading-tight font-semibold text-ink-900 sm:text-5xl">
            What it costs, by the size of the house.
          </h2>
          <p className="measure mt-5 text-lg leading-relaxed text-ink-700">
            Illustrative ranges, not a rate card. They assume a home in ordinary condition with
            nothing added. Your quote returns one number for your house specifically.
          </p>

          <div className="mt-12 -mx-5 overflow-x-auto px-5 sm:mx-0 sm:px-0">
            <table className="w-full min-w-[40rem] border-collapse text-left">
              <caption className="sr-only">
                Illustrative price ranges by service and home size
              </caption>
              <thead>
                <tr className="border-b border-plaster-300">
                  <th scope="col" className="py-4 pr-6 text-sm font-semibold tracking-wide text-ink-900 uppercase">
                    Service
                  </th>
                  {SIZES.map((size) => (
                    <th
                      key={size.label}
                      scope="col"
                      className="py-4 pr-6 text-sm font-semibold tracking-wide text-ink-900 uppercase"
                    >
                      {size.label}
                      <span className="tnum ml-1.5 font-normal text-ink-500 normal-case">
                        {size.baths} bath
                      </span>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {services.map((service) => (
                  <tr key={service.slug} className="border-b border-plaster-300">
                    <th scope="row" className="py-5 pr-6 align-top">
                      <Link
                        href={`/services/${service.slug}`}
                        className="font-display text-xl leading-tight font-semibold text-ink-900 no-underline transition-colors duration-300 hover:text-pine-800"
                      >
                        {service.name}
                      </Link>
                      <span className="tnum mt-1 block text-sm font-normal text-ink-500">
                        {service.hours[0]}–{service.hours[1]} hours
                      </span>
                    </th>
                    {SIZES.map((size) => {
                      const priced = estimate(service.slug, size.beds, size.baths);
                      return (
                        <td key={size.label} className="tnum py-5 pr-6 align-top text-ink-900">
                          <span className="font-display text-lg font-semibold">
                            ${priced?.low}
                          </span>
                          <span className="block text-sm text-ink-500">to ${priced?.high}</span>
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <Link
            href="/quote"
            className="group mt-12 inline-flex items-center gap-2.5 rounded-full bg-amber-500 px-7 py-4 text-lg font-medium text-ink-900 no-underline transition-colors duration-300 hover:bg-amber-400"
          >
            Get the real number
            <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </Container>
      </section>

      <section className="warm-side bg-plaster-50 py-20 text-ink-700 sm:py-24">
        <Container>
          <div className="grid gap-x-16 gap-y-12 md:grid-cols-2">
            <div>
              <h2 className="font-display text-3xl leading-tight font-semibold text-ink-900">
                What moves the price
              </h2>
              <ul className="mt-7 flex flex-col gap-3.5">
                {moves.map((item) => (
                  <li key={item} className="flex items-start gap-3 leading-relaxed text-ink-900">
                    <Check className="mt-1 h-4 w-4 shrink-0 text-pine-600" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="font-display text-3xl leading-tight font-semibold text-ink-900">
                What never does
              </h2>
              <ul className="mt-7 flex flex-col gap-3.5">
                {neverMoves.map((item) => (
                  <li key={item} className="flex items-start gap-3 leading-relaxed text-ink-700">
                    <span aria-hidden className="mt-3 h-px w-4 shrink-0 bg-ink-500" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-16 border-t border-plaster-300 pt-10">
            <h2 className="font-display text-2xl leading-tight font-semibold text-ink-900">
              If it is not right, we come back
            </h2>
            <p className="measure mt-4 text-lg leading-relaxed text-ink-700">
              Tell us within 48 hours with a photo and your cleaner returns and redoes that area.
              Not the whole house, not a credit note, not a discount on the next visit. The actual
              thing, actually fixed.{" "}
              <Link
                href="/faq"
                className="font-medium text-ink-900 decoration-plaster-300 underline-offset-4 hover:decoration-ink-900"
              >
                More questions answered
              </Link>
              .
            </p>
          </div>
        </Container>
      </section>
    </>
  );
}
