import type { Metadata } from "next";
import Link from "next/link";
import { Container, PageHero } from "@/components/page-parts";
import { ArrowRight } from "@/components/icons";
import { posts } from "@/lib/content";
import { JsonLd } from "@/components/json-ld";
import { breadcrumbJsonLd, canonical } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Journal",
  description:
    "Notes on keeping an Alberta house: winter entryways, what a deep clean actually includes, getting a damage deposit back, and the products that quietly ruin things.",
  ...canonical("/blog"),
};

export default function BlogPage() {
  const [lead, ...rest] = posts;

  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Journal", path: "/blog" }])} />

      <PageHero
        title="Notes on keeping a house in a place like this."
        lede="Written by the people doing the work. Mostly practical, occasionally opinionated about mops."
      />

      <section className="warm-side bg-plaster-100 pt-16 pb-24 text-ink-700 sm:pt-20">
        <Container>
          {lead && (
            <Link
              href={`/blog/${lead.slug}`}
              className="group block border-y border-plaster-300 py-12 no-underline"
            >
              <p className="tnum text-[0.9375rem] text-ink-500">
                {lead.tag} · {lead.displayDate} · {lead.minutes} min
              </p>
              <h2 className="font-display display-tight mt-4 max-w-[20ch] text-4xl leading-[1.05] font-semibold text-ink-900 transition-colors duration-300 group-hover:text-pine-800 sm:text-6xl">
                {lead.title}
              </h2>
              <p className="measure mt-6 text-xl leading-relaxed text-ink-700">{lead.dek}</p>
              <p className="mt-7 flex items-center gap-2 font-medium text-ink-900">
                Read it
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </p>
            </Link>
          )}

          <ul className="grid gap-x-12 gap-y-0 md:grid-cols-2">
            {rest.map((post) => (
              <li key={post.slug} className="border-b border-plaster-300">
                <Link href={`/blog/${post.slug}`} className="group block py-10 no-underline">
                  <p className="tnum text-[0.9375rem] text-ink-500">
                    {post.tag} · {post.displayDate} · {post.minutes} min
                  </p>
                  <h2 className="font-display mt-3 text-2xl leading-tight font-semibold text-ink-900 transition-colors duration-300 group-hover:text-pine-800">
                    {post.title}
                  </h2>
                  <p className="mt-3 leading-relaxed text-ink-700">{post.dek}</p>
                </Link>
              </li>
            ))}
          </ul>

          {posts.length === 0 && (
            <div className="border-y border-plaster-300 py-20 text-center">
              <h2 className="font-display text-3xl leading-tight font-semibold text-ink-900">
                Nothing written down yet.
              </h2>
              <p className="measure mx-auto mt-4 leading-relaxed text-ink-700">
                The first notes go up once we have something worth saying. In the meantime the{" "}
                <Link href="/faq" className="font-medium text-ink-900 underline-offset-4">
                  questions page
                </Link>{" "}
                covers most of it.
              </p>
            </div>
          )}
        </Container>
      </section>
    </>
  );
}
