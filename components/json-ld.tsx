/**
 * Structured data, rendered as a plain <script> in the server-rendered HTML.
 *
 * `next/script` is for executable JavaScript; JSON-LD is data, so a native tag
 * is the right element and it lands in the initial HTML where crawlers read it
 * without running anything.
 *
 * The nodes from `lib/seo.ts` carry no `@context` of their own. They are
 * wrapped here in one `@graph` under one context, so the nodes in a block are
 * a single connected graph joined by `@id`, and a node passed twice (the same
 * `@id`) is written once rather than appearing as a duplicate entity.
 *
 * The `<` escape is not decorative: JSON.stringify does not neutralise a
 * "</script>" sequence appearing inside any string it serialises, and content
 * here comes from lib/content.ts today but could come from a CMS tomorrow.
 */
export function JsonLd({ data }: { data: object | object[] }) {
  const seen = new Set<string>();
  const graph = [data].flat().filter((node) => {
    const id = (node as { "@id"?: unknown })["@id"];
    if (typeof id !== "string") return true;
    if (seen.has(id)) return false;
    seen.add(id);
    return true;
  });

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({ "@context": "https://schema.org", "@graph": graph }).replace(
          /</g,
          "\\u003c",
        ),
      }}
    />
  );
}
