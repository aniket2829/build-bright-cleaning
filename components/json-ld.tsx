/**
 * Structured data, rendered as a plain <script> in the server-rendered HTML.
 *
 * `next/script` is for executable JavaScript; JSON-LD is data, so a native tag
 * is the right element and it lands in the initial HTML where crawlers read it
 * without running anything.
 *
 * The `<` escape is not decorative: JSON.stringify does not neutralise a
 * "</script>" sequence appearing inside any string it serialises, and content
 * here comes from lib/content.ts today but could come from a CMS tomorrow.
 */
export function JsonLd({ data }: { data: object | object[] }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}
