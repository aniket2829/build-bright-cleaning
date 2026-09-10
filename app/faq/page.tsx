import type { Metadata } from "next";
import Link from "next/link";
import { Container, PageHero } from "@/components/page-parts";
import { Chevron } from "@/components/icons";
import { business, faqs } from "@/lib/content";
import { JsonLd } from "@/components/json-ld";
import { breadcrumbJsonLd, canonical, faqJsonLd } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Questions",
  description:
    "How the same-cleaner arrangement works, what happens if something is not right, how pricing and access work, and what to do about pets, keys and skipped visits.",
  ...canonical("/faq"),
};

export default function FaqPage() {
  const groups = [...new Set(faqs.map((f) => f.group))];

  return (
    <>
      {/* Every question below is rendered into the HTML by the accordion, open
          or shut, which is the condition FAQ rich results require. */}
      <JsonLd
        data={[
          faqJsonLd(faqs),
          breadcrumbJsonLd([{ name: "Questions", path: "/faq" }]),
        ]}
      />

      <PageHero
        title="Questions people actually ask."
        lede="Mostly about the cleaner, the money, and what happens when something goes wrong. If yours is not here, phone us. A person answers."
      />

      <section className="warm-side bg-plaster-100 pt-20 pb-24 text-ink-700 sm:pt-24">
        <Container>
          <div className="flex flex-col gap-16">
            {groups.map((group) => (
              <div key={group} className="grid gap-x-12 gap-y-6 lg:grid-cols-[16rem_1fr]">
                <h2 className="font-display text-3xl leading-tight font-semibold text-ink-900">
                  {group}
                </h2>

                <div className="border-t border-plaster-300">
                  {faqs
                    .filter((f) => f.group === group)
                    .map((faq) => (
                      <details key={faq.q} className="group border-b border-plaster-300">
                        <summary className="flex cursor-pointer list-none items-baseline gap-4 py-5 text-ink-900 marker:hidden">
                          <span className="font-display flex-1 text-xl leading-snug font-semibold">
                            {faq.q}
                          </span>
                          <Chevron className="h-5 w-5 shrink-0 text-ink-500 transition-transform duration-400 group-open:rotate-180" />
                        </summary>
                        <p className="measure pb-6 leading-relaxed text-ink-700">{faq.a}</p>
                      </details>
                    ))}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-20 border-t border-plaster-300 pt-10">
            <h2 className="font-display text-2xl leading-tight font-semibold text-ink-900">
              Still not answered
            </h2>
            <p className="measure mt-4 text-lg leading-relaxed text-ink-700">
              Call{" "}
              <a
                href={`tel:${business.phoneHref}`}
                className="tnum font-medium text-ink-900 decoration-plaster-300 underline-offset-4 hover:decoration-ink-900"
              >
                {business.phoneDisplay}
              </a>{" "}
              during {business.hours.toLowerCase()}, or{" "}
              <Link
                href="/quote"
                className="font-medium text-ink-900 decoration-plaster-300 underline-offset-4 hover:decoration-ink-900"
              >
                start a quote
              </Link>{" "}
              and put the question in the access notes. We read those before we price anything.
            </p>
          </div>
        </Container>
      </section>
    </>
  );
}
