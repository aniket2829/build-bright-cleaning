import type { MetadataRoute } from "next";
import { cities, posts, services } from "@/lib/content";
import { absoluteUrl } from "@/lib/seo";

/**
 * Every indexable URL on the site, generated from the content rather than
 * listed by hand: add a service, a city or a post to `lib/content.ts` and it
 * appears here, in robots.txt's sitemap reference, and in Search Console,
 * without anyone remembering to.
 *
 * `priority` is a hint Google largely ignores between pages of one site; it is
 * set anyway because Bing still reads it, and it costs nothing. `lastModified`
 * is the honest signal — posts carry their own date, everything else carries
 * the build, because a static page's content genuinely changes when it is
 * rebuilt.
 *
 * Deliberately absent: /quote's `?service=` and `?city=` variants. They are
 * the same page with a pre-filled form and they canonicalise to /quote, so
 * listing them would nominate duplicates for indexing. They stay crawlable —
 * see app/robots.ts for why blocking them would be worse.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const built = new Date();

  const staticPages: MetadataRoute.Sitemap = (
    [
      { url: absoluteUrl("/"), changeFrequency: "weekly", priority: 1 },
      { url: absoluteUrl("/services"), changeFrequency: "monthly", priority: 0.9 },
      { url: absoluteUrl("/areas"), changeFrequency: "monthly", priority: 0.9 },
      { url: absoluteUrl("/quote"), changeFrequency: "monthly", priority: 0.9 },
      { url: absoluteUrl("/faq"), changeFrequency: "monthly", priority: 0.7 },
      { url: absoluteUrl("/about"), changeFrequency: "yearly", priority: 0.6 },
      { url: absoluteUrl("/reviews"), changeFrequency: "monthly", priority: 0.6 },
      { url: absoluteUrl("/blog"), changeFrequency: "weekly", priority: 0.6 },
    ] satisfies MetadataRoute.Sitemap
  ).map((page) => ({ ...page, lastModified: built }));

  return [
    ...staticPages,

    ...services.map((service) => ({
      url: absoluteUrl(`/services/${service.slug}`),
      lastModified: built,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),

    ...cities.map((city) => ({
      url: absoluteUrl(`/areas/${city.slug}`),
      lastModified: built,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),

    ...posts.map((post) => ({
      url: absoluteUrl(`/blog/${post.slug}`),
      lastModified: new Date(post.date),
      changeFrequency: "yearly" as const,
      priority: 0.5,
    })),
  ];
}
