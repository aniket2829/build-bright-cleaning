import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container, PageHero, Prose, Stars } from "@/components/page-parts";
import { Scale } from "@/components/scale";
import { ArrowRight } from "@/components/icons";
import { cities, cityBySlug, reviews } from "@/lib/content";

export function generateStaticParams() {
  return cities.map((c) => ({ city: c.slug }));
}

export async function generateMetadata(props: PageProps<"/areas/[city]">): Promise<Metadata> {
  const { city: slug } = await props.params;
  const city = cityBySlug(slug);
  if (!city) return {};
  return {
    title: `House cleaning in ${city.name}`,
    description: `${city.lede} Recurring, deep, move-in/out and one-time cleans across ${city.name}, quoted as a fixed price.`,
  };
}

export default async function CityPage(props: PageProps<"/areas/[city]">) {
  const { city: slug } = await props.params;
  const city = cityBySlug(slug);
  if (!city) notFound();

  const local = reviews.filter((r) => r.where.endsWith(city.name)).slice(0, 3);

  return (
    <>
      <PageHero
        eyebrowLink={{ href: "/areas", label: "All areas" }}
        title={`House cleaning in ${city.name}`}
        lede={city.lede}
        meta={
          <p className="tnum inline-flex items-center gap-2 rounded-full border border-dusk-600 px-4 py-2 text-[0.9375rem] text-frost-200">
            {city.note}
          </p>
        }
      />

      <section className="warm-side bg-plaster-100 py-20 text-ink-700 sm:py-24">
        <Container>
          <div className="grid gap-x-16 gap-y-12 lg:grid-cols-[1fr_20rem]">
            <div>
              <h2 className="font-display display-tight max-w-[20ch] text-3xl leading-tight font-semibold text-ink-900 sm:text-4xl">
                What {city.name} does to a house
              </h2>
              <div className="mt-7">
                <Prose>
                  {city.body.map((para) => (
                    <p key={para.slice(0, 28)}>{para}</p>
                  ))}
                </Prose>
              </div>
            </div>

            <aside>
              <h2 className="text-sm font-semibold tracking-wide text-ink-900 uppercase">
                Neighbourhoods we work in
              </h2>
              <ul className="mt-5 flex flex-wrap gap-x-2 gap-y-2">
                {city.neighbourhoods.map((hood) => (
                  <li
                    key={hood}
                    className="rounded-full border border-plaster-300 px-3.5 py-1.5 text-sm text-ink-700"
                  >
                    {hood}
                  </li>
                ))}
              </ul>
              <Link
                href={`/quote?city=${city.slug}`}
                className="group mt-8 inline-flex w-full items-center justify-center gap-2.5 rounded-full bg-amber-500 px-6 py-3.5 font-medium text-ink-900 no-underline transition-colors duration-300 hover:bg-amber-400"
              >
                Quote a {city.name} home
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </aside>
          </div>
        </Container>
      </section>

      <section className="warm-side bg-plaster-50 py-20 text-ink-700 sm:py-24">
        <Container>
          <h2 className="font-display display-tight text-3xl leading-tight font-semibold text-ink-900 sm:text-4xl">
            What a clean costs in {city.name}
          </h2>
          <p className="measure mt-5 leading-relaxed text-ink-700">
            The same prices in both cities. We do not charge more for the harder winter.
          </p>
          <div className="mt-12">
            <Scale tone="warm" />
          </div>
        </Container>
      </section>

      {local.length > 0 && (
        <section className="warm-side bg-plaster-100 py-20 text-ink-700 sm:py-24">
          <Container>
            <h2 className="font-display display-tight text-3xl leading-tight font-semibold text-ink-900 sm:text-4xl">
              {city.name} clients
            </h2>
            <ul className="mt-12 grid gap-x-10 gap-y-12 md:grid-cols-3">
              {local.map((review) => (
                <li key={review.name} className="border-t border-plaster-300 pt-6">
                  <Stars n={review.stars} />
                  <blockquote className="font-display mt-5 text-xl leading-snug text-ink-900">
                    “{review.quote}”
                  </blockquote>
                  <p className="mt-5 text-[0.9375rem] text-ink-500">
                    <span className="font-medium text-ink-900">{review.name}</span> · {review.where}
                  </p>
                </li>
              ))}
            </ul>
          </Container>
        </section>
      )}
    </>
  );
}
