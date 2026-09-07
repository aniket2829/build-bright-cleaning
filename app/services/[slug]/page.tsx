import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container, PageHero, Prose } from "@/components/page-parts";
import { Rooms } from "@/components/rooms";
import { ArrowRight, Check } from "@/components/icons";
import { services, serviceBySlug } from "@/lib/content";

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata(props: PageProps<"/services/[slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  const service = serviceBySlug(slug);
  if (!service) return {};
  return {
    title: service.name,
    description: `${service.lede} Residential cleaning in Edmonton, Alberta.`,
  };
}

export default async function ServicePage(props: PageProps<"/services/[slug]">) {
  const { slug } = await props.params;
  const service = serviceBySlug(slug);
  if (!service) notFound();

  const others = services.filter((s) => s.slug !== service.slug);
  const taskCount = service.rooms.reduce((n, r) => n + r.tasks.length, 0);

  return (
    <>
      <PageHero
        eyebrowLink={{ href: "/services", label: "All services" }}
        title={service.name}
        lede={service.lede}
        meta={
          <dl className="flex flex-wrap gap-x-12 gap-y-6 border-t border-dusk-600 pt-7">
            <div>
              <dt className="text-sm text-frost-400">Checklist</dt>
              <dd className="tnum font-display mt-1 text-3xl leading-none font-semibold text-frost-100">
                {taskCount} items
              </dd>
            </div>
            <div>
              <dt className="text-sm text-frost-400">Rooms covered</dt>
              <dd className="tnum font-display mt-1 text-3xl leading-none font-semibold text-frost-100">
                {service.rooms.length}
              </dd>
            </div>
            <div>
              <dt className="text-sm text-frost-400">Quoted as</dt>
              <dd className="font-display mt-1 text-xl leading-tight font-semibold text-frost-100">
                A fixed price for the job
              </dd>
            </div>
          </dl>
        }
      />

      <section className="warm-side bg-plaster-100 py-20 text-ink-700 sm:py-24">
        <Container>
          <div className="grid gap-x-16 gap-y-12 lg:grid-cols-[1fr_20rem]">
            <Prose>
              {service.body.map((para) => (
                <p key={para.slice(0, 28)}>{para}</p>
              ))}
            </Prose>

            <aside className="lg:pt-2">
              <div className="rounded-2xl bg-plaster-200 p-7">
                <h2 className="font-display text-2xl leading-tight font-semibold text-ink-900">
                  Best for
                </h2>
                <p className="mt-3 leading-relaxed text-ink-700">{service.forWho}</p>
                <Link
                  href={`/quote?service=${service.slug}`}
                  className="group mt-7 inline-flex w-full items-center justify-center gap-2.5 rounded-full bg-amber-500 px-6 py-3.5 font-medium text-ink-900 no-underline transition-colors duration-300 hover:bg-amber-400"
                >
                  Quote this job
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
                <p className="mt-3 text-center text-sm text-ink-500">
                  The form opens on {service.shortName.toLowerCase()}.
                </p>
              </div>
            </aside>
          </div>
        </Container>
      </section>

      <section className="warm-side bg-plaster-50 py-20 text-ink-700 sm:py-24">
        <Container>
          <div className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-2">
            <h2 className="font-display display-tight text-4xl leading-tight font-semibold text-ink-900 sm:text-5xl">
              Room by room
            </h2>
            <p className="tnum text-ink-500">{taskCount} items, written down</p>
          </div>
          <p className="measure mt-5 text-lg leading-relaxed text-ink-700">
            Open a room to see exactly what is done in it. This is the list your cleaner works to,
            not a summary of one.
          </p>
          <div className="mt-12">
            <Rooms rooms={service.rooms} />
          </div>
        </Container>
      </section>

      <section className="warm-side bg-plaster-100 py-20 text-ink-700 sm:py-24">
        <Container>
          <div className="grid gap-x-16 gap-y-12 md:grid-cols-2">
            <div>
              <h2 className="font-display text-3xl leading-tight font-semibold text-ink-900">
                Add anything from this list
              </h2>
              <p className="mt-3 leading-relaxed text-ink-500">Priced with your quote, not after.</p>
              <ul className="mt-7 flex flex-col gap-3">
                {service.extras.map((extra) => (
                  <li key={extra} className="flex items-start gap-3 text-ink-900">
                    <Check className="mt-1 h-4 w-4 shrink-0 text-pine-600" />
                    {extra}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="font-display text-3xl leading-tight font-semibold text-ink-900">
                What this one does not cover
              </h2>
              <p className="mt-3 leading-relaxed text-ink-500">
                Said here rather than discovered on the day.
              </p>
              <ul className="mt-7 flex flex-col gap-3">
                {service.notIncluded.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-ink-700">
                    <span
                      aria-hidden
                      className="mt-2.5 h-px w-4 shrink-0 bg-ink-500"
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </section>

      <section className="warm-side bg-plaster-50 pb-24 text-ink-700">
        <Container>
          <h2 className="font-display border-t border-plaster-300 pt-14 text-2xl leading-tight font-semibold text-ink-900">
            Maybe you want a different one
          </h2>
          <ul className="mt-8 grid gap-x-10 gap-y-8 sm:grid-cols-3">
            {others.map((other) => (
              <li key={other.slug}>
                <Link href={`/services/${other.slug}`} className="group block no-underline">
                  <h3 className="font-display text-xl leading-tight font-semibold text-ink-900 transition-colors duration-300 group-hover:text-pine-800">
                    {other.name}
                  </h3>
                  <p className="mt-2 leading-relaxed text-ink-500">{other.dek}</p>
                  <p className="mt-3 flex items-center gap-2 text-[0.9375rem] font-medium text-ink-900">
                    See what it covers
                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </section>
    </>
  );
}
