/**
 * One place the site's public identity is written for machines.
 *
 * Everything needing an absolute URL — canonicals, the sitemap, robots.txt,
 * Open Graph, JSON-LD — reads `SITE_URL` from here, so the domain is set once
 * (in the environment) and never drifts between the <link rel="canonical"> a
 * crawler reads and the <loc> the sitemap handed it. Disagreement between
 * those two is the most common way a small site quietly de-indexes itself.
 */

import {
  business,
  serviceArea,
  services,
  type City,
  type Post,
  type Service,
} from "@/lib/content";

/**
 * The live origin: buildbrightcleaning.ca, apex rather than www.
 *
 * The real domain is the default rather than a placeholder, so a deploy that
 * forgets the environment variable still emits correct canonicals instead of
 * pointing the whole site at a domain that does not exist. `SITE_URL`
 * overrides it for staging and preview builds, which should not claim to be
 * the production URL.
 *
 * Whichever value is used must match the host that actually serves the site,
 * www included: the apex and the www subdomain are different origins to a
 * crawler, and one must redirect to the other.
 *
 * Deliberately *not* `NEXT_PUBLIC_`-prefixed. The value is no secret — the
 * domain is printed in every canonical tag — but nothing in the browser reads
 * it: this module is imported only by server components, `sitemap.ts` and
 * `robots.ts`. A public prefix would ship it into the client bundle for no
 * reason. Keep it server-side unless a client component genuinely needs it.
 */
export const SITE_URL = (
  process.env.SITE_URL || "https://buildbrightcleaning.ca"
).replace(/\/+$/, "");

/** A site-relative path ("/services/deep") as an absolute, canonical URL. */
export const absoluteUrl = (path = "/") =>
  path === "/" ? SITE_URL : `${SITE_URL}${path}`;

/**
 * Canonical metadata for a page. Relative is deliberate: Next resolves it
 * against `metadataBase`, so there is exactly one absolute-URL decision on the
 * site and it lives in the root layout.
 */
export const canonical = (path: string) => ({ alternates: { canonical: path } });

/**
 * The share card, for pages that declare their own `openGraph` block.
 *
 * Next's `opengraph-image` file convention only inherits down to routes that
 * say nothing about Open Graph; the moment a page sets an `openGraph` object
 * to fix its title, it replaces the parent's whole block and the image with
 * it. Service, city and post pages all do that, and would otherwise share as
 * a blank card — so they spread this in instead.
 */
export const OG_IMAGE = {
  url: "/opengraph-image",
  width: 1200,
  height: 630,
  alt: `${business.name} — house cleaning in ${business.region}`,
};

/**
 * The document title, in one place. The root layout's `title.template` and
 * the `name` of every page's `WebPage` node are both built from these, so the
 * <title> a crawler reads and the name the structured data gives the page are
 * the same string by construction.
 */
export const SITE_TITLE = `${business.name} · house cleaning in ${business.region}`;
export const TITLE_TEMPLATE = `%s · ${business.name}`;
export const SITE_DESCRIPTION =
  "Residential cleaning in Edmonton, Alberta. One vetted cleaner for deep, move-in/out, one-time and post-construction cleans, steam carpet cleaning and wall stain removal, quoted as a fixed price.";

/** A page's short title ("About") as the full <title> the template makes of it. */
export const documentTitle = (title: string) => TITLE_TEMPLATE.replace("%s", title);

/* --------------------------------------------------------------------------
   Breadcrumbs
   --------------------------------------------------------------------------
   One trail per page drives both the visible breadcrumb in <PageHero> and the
   `BreadcrumbList` in that page's JSON-LD, so the two cannot disagree. Google
   asks that the markup mirror the trail a visitor actually sees; writing it
   twice is how they drift.

   A trail is written without the home crumb, which `withHome` adds. The
   section crumbs live here rather than in each page so that "Services" is
   spelled once, whether it is the section's own last crumb or the middle of
   a service page's trail.
   -------------------------------------------------------------------------- */

export type Crumb = { name: string; path: string };

export const HOME_CRUMB: Crumb = { name: "Home", path: "/" };

export const SECTIONS = {
  services: { name: "Services", path: "/services" },
  areas: { name: "Where we clean", path: "/areas" },
  reviews: { name: "Reviews", path: "/reviews" },
  about: { name: "About", path: "/about" },
  blog: { name: "Journal", path: "/blog" },
  faq: { name: "Questions", path: "/faq" },
  quote: { name: "Get a quote", path: "/quote" },
} as const satisfies Record<string, Crumb>;

export const withHome = (trail: readonly Crumb[]): Crumb[] => [HOME_CRUMB, ...trail];

/* --------------------------------------------------------------------------
   Structured data
   --------------------------------------------------------------------------
   Three rules hold across every builder below:

   1. Nothing is asserted here that the page does not also say in words.
      Rich results are withdrawn, and sites manually actioned, for structured
      data describing something the visitor cannot see.
   2. No `aggregateRating` and no `Review` markup anywhere, deliberately. The
      twelve testimonials in `lib/content.ts` are authored, not collected
      (REPLACE-BEFORE-LAUNCH § 2). Marking them up would state a falsehood to
      Google as well as to the reader. Add review markup the day the reviews
      are real and attributable, and not before.
   3. No `priceRange` and no `Offer.price`: the site names no figure anywhere,
      by product decision (§ 3).

   The builders return bare nodes with no `@context`. <JsonLd> wraps whatever
   it is given in a single `@graph` and states the context once, so a page's
   nodes are one connected graph that refers to itself by `@id` rather than
   five loose objects that each re-describe the business.
   -------------------------------------------------------------------------- */

/** Stable @id anchors, so every node refers to one business, not five. */
export const ID = {
  business: `${SITE_URL}/#business`,
  website: `${SITE_URL}/#website`,
  logo: `${SITE_URL}/#logo`,
  /** A page's own node, and its breadcrumb, hang off its canonical URL. */
  webpage: (path: string) => `${absoluteUrl(path)}#webpage`,
  breadcrumb: (path: string) => `${absoluteUrl(path)}#breadcrumb`,
} as const;

const areaServed = serviceArea.map((name) => ({
  "@type": "City" as const,
  name,
  address: {
    "@type": "PostalAddress" as const,
    addressLocality: name,
    addressRegion: "AB",
    addressCountry: "CA",
  },
}));

/**
 * The business itself, which is also the site's Organization.
 * `HouseCleaningService` is a LocalBusiness subtype, and LocalBusiness is an
 * Organization subtype, so this one node satisfies both Google's Organization
 * and LocalBusiness guidance. A second, separate `Organization` node would
 * describe the same company twice under two identities, which is exactly the
 * duplication the shared @id exists to prevent.
 *
 * There is no `streetAddress`: this is a service-area business working in the
 * customer's home, and inventing a storefront would break the name/address/
 * phone consistency local ranking is built on. Locality, region and country
 * are true, and are enough.
 *
 * `logo` is the square brand mark, not the wordmark: Google requires an
 * Organization logo of at least 112×112, which the 406×100 wordmark is not.
 *
 * No `sameAs` yet. It belongs here the day the Google Business Profile and
 * any social accounts exist — and not before, since a link to a profile that
 * does not exist is an unverifiable claim (SEO.md § 2).
 */
export function businessJsonLd() {
  return {
    "@type": "HouseCleaningService",
    "@id": ID.business,
    name: business.name,
    url: absoluteUrl("/"),
    telephone: business.phoneHref,
    email: business.email,
    image: absoluteUrl("/logo.png"),
    logo: {
      "@type": "ImageObject",
      "@id": ID.logo,
      url: absoluteUrl("/icon-512.png"),
      contentUrl: absoluteUrl("/icon-512.png"),
      width: 512,
      height: 512,
      caption: business.name,
    },
    description:
      "Residential cleaning in Edmonton, Alberta. One vetted cleaner for deep, move-in/out, one-time and post-construction cleans, steam carpet cleaning and wall stain removal, quoted as a fixed price for the job.",
    slogan: business.tagline,
    address: {
      "@type": "PostalAddress",
      addressLocality: business.region,
      addressRegion: "AB",
      addressCountry: "CA",
    },
    areaServed,
    /* The phone and hours printed in the header, footer and quote page, as a
       machine reads them. */
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer service",
      telephone: business.phoneHref,
      email: business.email,
      areaServed: "CA-AB",
      availableLanguage: "en",
      hoursAvailable: business.hoursSpec.map((spec) => ({
        "@type": "OpeningHoursSpecification",
        dayOfWeek: spec.days.map((day) => `https://schema.org/${day}`),
        opens: spec.opens,
        closes: spec.closes,
      })),
    },
    openingHoursSpecification: business.hoursSpec.map((spec) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: spec.days.map((day) => `https://schema.org/${day}`),
      opens: spec.opens,
      closes: spec.closes,
    })),
    knowsLanguage: "en-CA",
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Residential cleaning services",
      itemListElement: services.map((service) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: service.name,
          description: service.dek,
          url: absoluteUrl(`/services/${service.slug}`),
        },
      })),
    },
  };
}

/**
 * The site as an entity, so sitelinks and the knowledge panel agree. No
 * `potentialAction` SearchAction: the site has no search, and declaring one
 * would advertise a feature that is not there.
 */
export function websiteJsonLd() {
  return {
    "@type": "WebSite",
    "@id": ID.website,
    url: absoluteUrl("/"),
    name: business.name,
    description: SITE_DESCRIPTION,
    inLanguage: "en-CA",
    publisher: { "@id": ID.business },
  };
}

/**
 * Breadcrumbs. Google renders these in place of the raw URL, so a service page
 * reads "Build Bright › Services › Deep clean" rather than a path. Pass the
 * trail without the home crumb; it is added here. `path` is the page the trail
 * belongs to, and anchors the list's @id.
 */
export function breadcrumbJsonLd(path: string, trail: readonly Crumb[]) {
  return {
    "@type": "BreadcrumbList",
    "@id": ID.breadcrumb(path),
    itemListElement: withHome(trail).map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

/** The schema.org page types this site honestly has. */
export type PageType = "WebPage" | "AboutPage" | "CollectionPage" | "ContactPage" | "FAQPage";

type Node = { "@id": string } & Record<string, unknown>;

/**
 * Everything one page says about itself: its `WebPage` node, its breadcrumb,
 * and the thing the page is about. Every page on the site renders exactly one
 * of these, so there is one page node per URL and nothing is described twice.
 *
 * - `title` is the page's short title, exactly as passed to `metadata.title`;
 *   the page node's `name` is the full <title> the template makes of it. The
 *   home page passes `SITE_TITLE` and `home: true`, since it is the untemplated
 *   default.
 * - `trail` is the visible breadcrumb, without Home. Omitted only on the home
 *   page, where a one-item list says nothing and Google ignores it.
 * - `mainEntity` is a node with its own @id (a `Service`, a `BlogPosting`),
 *   emitted into the same graph and referenced from the page.
 * - `faqs` makes the page itself an `FAQPage`, whose main entity is its
 *   questions. Pass only what is rendered on that page, in full.
 */
export function pageJsonLd({
  path,
  title,
  description,
  type = "WebPage",
  trail,
  mainEntity,
  faqs,
  home = false,
}: {
  path: string;
  title: string;
  description: string;
  type?: PageType;
  trail?: readonly Crumb[];
  mainEntity?: Node;
  faqs?: readonly { q: string; a: string }[];
  home?: boolean;
}) {
  const page: Record<string, unknown> = {
    "@type": faqs ? "FAQPage" : type,
    "@id": ID.webpage(path),
    url: absoluteUrl(path),
    name: home ? title : documentTitle(title),
    description,
    inLanguage: "en-CA",
    isPartOf: { "@id": ID.website },
    publisher: { "@id": ID.business },
  };

  /* The home and about pages are about the business; every other page is
     about its own subject, carried by `mainEntity`. */
  if (home || type === "AboutPage") page.about = { "@id": ID.business };
  if (trail?.length) page.breadcrumb = { "@id": ID.breadcrumb(path) };
  if (mainEntity) page.mainEntity = { "@id": mainEntity["@id"] };
  if (faqs) page.mainEntity = faqQuestions(faqs);

  return [
    page,
    ...(trail?.length ? [breadcrumbJsonLd(path, trail)] : []),
    ...(mainEntity ? [mainEntity] : []),
  ];
}

/**
 * The questions of an `FAQPage`. Every answer must be in the HTML of the page
 * carrying the markup, open or shut, which is why the /faq accordion is a
 * native <details> rendered on the server rather than fetched on open.
 *
 * Expectations, honestly: since August 2023 Google shows FAQ rich results
 * only for well-known government and health sites. The markup is still valid,
 * still read, and still how the page states its questions to Bing and to AI
 * answer engines; it will not, on its own, produce the expandable result.
 */
export function faqQuestions(faqs: readonly { q: string; a: string }[]) {
  return faqs.map((faq) => ({
    "@type": "Question",
    name: faq.q,
    acceptedAnswer: { "@type": "Answer", text: faq.a },
  }));
}

/** One service, offered by the one business, across the whole service area. */
export function serviceJsonLd(service: Service) {
  return {
    "@type": "Service",
    "@id": absoluteUrl(`/services/${service.slug}#service`),
    name: service.name,
    serviceType: service.name,
    description: service.lede,
    url: absoluteUrl(`/services/${service.slug}`),
    provider: { "@id": ID.business },
    areaServed,
    /* The room-by-room checklist is the page's substance, so it is what the
       markup describes: each room a named part of the service. */
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: `${service.name} checklist`,
      itemListElement: service.rooms.map((room) => ({
        "@type": "OfferCatalog",
        name: room.room,
        itemListElement: room.tasks.map((task) => ({
          "@type": "Offer",
          itemOffered: { "@type": "Service", name: task },
        })),
      })),
    },
  };
}

/** A city page: the same business, scoped to one place. */
export function cityJsonLd(city: City) {
  return {
    "@type": "Service",
    "@id": absoluteUrl(`/areas/${city.slug}#service`),
    name: `House cleaning in ${city.name}`,
    serviceType: "House cleaning",
    description: city.lede,
    url: absoluteUrl(`/areas/${city.slug}`),
    provider: { "@id": ID.business },
    areaServed: {
      "@type": "City",
      name: city.name,
      address: {
        "@type": "PostalAddress",
        addressLocality: city.name,
        addressRegion: "AB",
        addressCountry: "CA",
      },
      containsPlace: city.neighbourhoods.map((name) => ({
        "@type": "Place",
        name,
      })),
    },
  };
}

/**
 * A journal entry. `dateModified` mirrors publication until a post is edited.
 * `mainEntityOfPage` points at the page node rather than repeating its URL,
 * closing the loop the page's own `mainEntity` opens.
 */
export function postJsonLd(post: Post) {
  return {
    "@type": "BlogPosting",
    "@id": absoluteUrl(`/blog/${post.slug}#post`),
    headline: post.title,
    description: post.dek,
    datePublished: post.date,
    dateModified: post.date,
    inLanguage: "en-CA",
    url: absoluteUrl(`/blog/${post.slug}`),
    mainEntityOfPage: { "@id": ID.webpage(`/blog/${post.slug}`) },
    author: { "@id": ID.business },
    publisher: { "@id": ID.business },
    keywords: post.tag,
  };
}
