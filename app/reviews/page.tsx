import type { Metadata } from "next";
import { Container, PageHero, Stars } from "@/components/page-parts";
import { reviews } from "@/lib/content";
import { JsonLd } from "@/components/json-ld";
import { breadcrumbJsonLd, canonical } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Reviews",
  description:
    "What Build Bright clients in Edmonton say about deep, move-out and post-construction cleans, carpet and wall work, and careful service.",
  ...canonical("/reviews"),
};

export default function ReviewsPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Reviews", path: "/reviews" }])} />

      <PageHero
        title="The reviews that matter say the same thing."
        lede="Not that the house was clean; everyone says that. That it was the same person, that the price held, and that they stopped tidying before the visit."
      />

      <section className="warm-side bg-plaster-100 pt-20 pb-24 text-ink-700 sm:pt-24">
        <Container>
          <ul className="grid gap-x-10 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
            {reviews.map((review) => (
              <li key={review.name} className="flex flex-col border-t border-plaster-300 pt-6">
                <Stars n={review.stars} />
                <blockquote className="font-display mt-5 flex-1 text-xl leading-snug text-ink-900">
                  “{review.quote}”
                </blockquote>
                <p className="mt-6 text-[0.9375rem] leading-relaxed text-ink-500">
                  <span className="font-medium text-ink-900">{review.name}</span>
                  <br />
                  {review.where}
                  <br />
                  {review.service} · {review.months}
                </p>
              </li>
            ))}
          </ul>

          <p className="measure mt-20 border-t border-plaster-300 pt-8 text-[0.9375rem] leading-relaxed text-ink-500">
            These testimonials were written for this demonstration site. They are not collected
            from customers, not verified, and not drawn from any review platform. Replace them with
            real, attributable reviews before this site is used commercially.
          </p>
        </Container>
      </section>
    </>
  );
}
