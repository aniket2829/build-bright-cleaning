import type { Metadata } from "next";
import Link from "next/link";
import { Container, PageHero, Prose } from "@/components/page-parts";
import { ArrowRight } from "@/components/icons";
import { business } from "@/lib/content";

export const metadata: Metadata = {
  title: "About",
  description:
    "Why Build Bright sends the same cleaner to the same home every visit, what that costs us to run, and what we deliberately do not do.",
};

const principles = [
  {
    title: "One cleaner per home, held as long as possible",
    body: "Scheduling around a person instead of a pool is harder and slower to grow. It is also the only version of this service that gets better over time instead of worse.",
  },
  {
    title: "Priced per job, never per hour",
    body: "An hourly rate makes speed the enemy of quality and hands the customer the risk of our own estimating. We would rather carry that ourselves.",
  },
  {
    title: "Small map, on purpose",
    body: "Two cities. We turn down work we cannot cover with the same person on the same schedule, which is a strange thing to advertise and the reason the rest of this works.",
  },
  {
    title: "Say it before, not after",
    body: "What a service does not include is written on its page. If we arrive and the job is bigger than described, you get a phone call before anything starts, not a larger invoice at the end.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        title="We built the version we wanted as customers."
        lede="Every one of us had the same experience of hiring a cleaning company: excellent for two months, then a different person each visit, then a slow decline nobody would name, then a cancellation."
      />

      <section className="warm-side bg-plaster-100 py-20 text-ink-700 sm:py-24">
        <Container>
          <div className="grid gap-x-16 gap-y-12 lg:grid-cols-[1fr_20rem]">
            <Prose>
              <p>
                The decline is not laziness. It is structural. The standard way to run a cleaning
                company is a pool: a job comes in, whoever is free takes it. On a spreadsheet that
                is the efficient answer, and for the first month or two it works fine.
              </p>
              <p>
                Then it stops working, because nothing accumulates. The person in your kitchen this
                week was not told that the dining table is a soft finish, or that the office is off
                limits on Thursdays, or where you keep the vacuum. So they guess, or they ask, or
                they do a slightly worse job than the person before them, and you either
                re-explain it every fortnight or quietly stop expecting much.
              </p>
              <p>
                We run the expensive version instead. You get one cleaner. They walk your house
                with you on the first visit and write down what matters. That sheet stays with your
                home. By the fourth visit they are finding things you never thought to ask for,
                and the same two hours buys visibly more than it did at the start.
              </p>
              <p>
                It costs us in scheduling, in sick cover, and in growth: we cannot take a client we
                cannot cover consistently, so we turn work away most weeks. We think that is the
                correct set of problems to have.
              </p>
            </Prose>

            <aside>
              <div className="rounded-2xl bg-plaster-200 p-7">
                <h2 className="font-display text-2xl leading-tight font-semibold text-ink-900">
                  Straight answers
                </h2>
                <p className="mt-3 leading-relaxed text-ink-700">
                  Call during {business.hours.toLowerCase()} and a person picks up. No queue, no
                  script.
                </p>
                <a
                  href={`tel:${business.phoneHref}`}
                  className="tnum font-display mt-5 block text-2xl font-semibold text-ink-900 decoration-plaster-300 underline-offset-4 hover:decoration-ink-900"
                >
                  {business.phoneDisplay}
                </a>
                <Link
                  href="/quote"
                  className="group mt-7 inline-flex w-full items-center justify-center gap-2.5 rounded-full bg-amber-500 px-6 py-3.5 font-medium text-ink-900 no-underline transition-colors duration-300 hover:bg-amber-400"
                >
                  Get a quote
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </div>
            </aside>
          </div>
        </Container>
      </section>

      <section className="warm-side bg-plaster-50 py-20 text-ink-700 sm:py-24">
        <Container>
          <h2 className="font-display display-tight max-w-[18ch] text-4xl leading-tight font-semibold text-ink-900 sm:text-5xl">
            Four rules we do not break
          </h2>
          <ol className="mt-14 border-t border-plaster-300">
            {principles.map((principle) => (
              <li
                key={principle.title}
                className="grid items-baseline gap-x-10 gap-y-2 border-b border-plaster-300 py-8 sm:grid-cols-[24rem_1fr]"
              >
                <h3 className="font-display text-2xl leading-tight font-semibold text-ink-900">
                  {principle.title}
                </h3>
                <p className="leading-relaxed text-ink-700">{principle.body}</p>
              </li>
            ))}
          </ol>

          <p className="measure mt-16 text-[0.9375rem] leading-relaxed text-ink-500">
            This is a demonstration site. Build Bright Cleaning is not a real company, and nothing
            on this page describes a real team, hiring process, or trading history.
          </p>
        </Container>
      </section>
    </>
  );
}
