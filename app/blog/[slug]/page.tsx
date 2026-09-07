import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container, PageHero } from "@/components/page-parts";
import { ArrowRight } from "@/components/icons";
import { posts, postBySlug } from "@/lib/content";

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata(props: PageProps<"/blog/[slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  const post = postBySlug(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.dek,
    openGraph: { type: "article", publishedTime: post.date, title: post.title, description: post.dek },
  };
}

export default async function PostPage(props: PageProps<"/blog/[slug]">) {
  const { slug } = await props.params;
  const post = postBySlug(slug);
  if (!post) notFound();

  const more = posts.filter((p) => p.slug !== post.slug).slice(0, 2);

  return (
    <>
      <PageHero
        eyebrowLink={{ href: "/blog", label: "Journal" }}
        title={post.title}
        lede={post.dek}
        meta={
          <p className="tnum text-[0.9375rem] text-frost-400">
            {post.tag} ·{" "}
            <time dateTime={post.date}>{post.displayDate}</time> · {post.minutes} minute read
          </p>
        }
      />

      <section className="warm-side bg-plaster-100 py-20 text-ink-700 sm:py-24">
        <Container>
          <article className="measure">
            {post.body.map((block, i) => (
              <div key={i}>
                {block.h && (
                  <h2 className="font-display mt-14 text-3xl leading-tight font-semibold text-ink-900 first:mt-0">
                    {block.h}
                  </h2>
                )}
                {block.p.map((para) => (
                  <p
                    key={para.slice(0, 28)}
                    className="mt-6 text-lg leading-relaxed text-ink-700"
                  >
                    {para}
                  </p>
                ))}
              </div>
            ))}
          </article>

          <div className="measure mt-16 border-t border-plaster-300 pt-10">
            <h2 className="font-display text-2xl leading-tight font-semibold text-ink-900">
              We do this for a living in Edmonton
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-ink-700">
              One cleaner who learns your home, a fixed price for the job, and the entryway done
              first. A few questions and about three minutes.
            </p>
            <Link
              href="/quote"
              className="group mt-7 inline-flex items-center gap-2.5 rounded-full bg-amber-500 px-7 py-3.5 font-medium text-ink-900 no-underline transition-colors duration-300 hover:bg-amber-400"
            >
              Get your quote
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
        </Container>
      </section>

      <section className="warm-side bg-plaster-50 pb-24 text-ink-700">
        <Container>
          <h2 className="font-display border-t border-plaster-300 pt-14 text-2xl leading-tight font-semibold text-ink-900">
            Read next
          </h2>
          <ul className="mt-8 grid gap-x-12 gap-y-8 md:grid-cols-2">
            {more.map((other) => (
              <li key={other.slug}>
                <Link href={`/blog/${other.slug}`} className="group block no-underline">
                  <p className="tnum text-[0.9375rem] text-ink-500">
                    {other.tag} · {other.minutes} min
                  </p>
                  <h3 className="font-display mt-2 text-2xl leading-tight font-semibold text-ink-900 transition-colors duration-300 group-hover:text-pine-800">
                    {other.title}
                  </h3>
                  <p className="mt-2 leading-relaxed text-ink-700">{other.dek}</p>
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </section>
    </>
  );
}
