import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/seo";

/**
 * The whole site is meant to be crawled, so this file's real job is the
 * sitemap pointer: it is how a crawler arriving from a link, rather than from
 * Search Console, finds the full URL list.
 *
 * Nothing is disallowed, deliberately. The obvious candidate was /quote's
 * `?service=` variants, but robots.txt is the wrong tool for duplicates: a
 * blocked URL can still be indexed from its inbound links, as a bare URL with
 * no title or description, and blocking it guarantees Google never reads the
 * `rel="canonical"` that would have resolved the duplicate properly. The
 * canonical on /quote handles it, and is allowed to be seen.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: absoluteUrl("/sitemap.xml"),
    host: absoluteUrl("/"),
  };
}
