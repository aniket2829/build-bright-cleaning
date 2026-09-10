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
   -------------------------------------------------------------------------- */

/** Stable @id anchors, so every node refers to one business, not five. */
export const ID = {
  business: `${SITE_URL}/#business`,
  website: `${SITE_URL}/#website`,
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
 * The business itself. `HouseCleaningService` is a LocalBusiness subtype, so
 * it is the most specific true type available and the one local queries match
 * against.
 *
 * There is no `streetAddress`: this is a service-area business working in the
 * customer's home, and inventing a storefront would break the name/address/
 * phone consistency local ranking is built on. Locality, region and country
 * are true, and are enough.
 */
export function businessJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "HouseCleaningService",
    "@id": ID.business,
    name: business.name,
    url: absoluteUrl("/"),
    telephone: business.phoneHref,
    email: business.email,
    image: absoluteUrl("/logo.png"),
    logo: absoluteUrl("/logo.png"),
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

/** The site as an entity, so sitelinks and the knowledge panel agree. */
export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": ID.website,
    url: absoluteUrl("/"),
    name: business.name,
    inLanguage: "en-CA",
    publisher: { "@id": ID.business },
  };
}

/**
 * Breadcrumbs. Google renders these in place of the raw URL, so a service page
 * reads "Build Bright › Services › Deep clean" rather than a path. Pass the
 * trail without the home crumb; it is added here.
 */
export function breadcrumbJsonLd(trail: { name: string; path: string }[]) {
  const items = [{ name: "Home", path: "/" }, ...trail];
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

/** One service, offered by the one business, across the whole service area. */
export function serviceJsonLd(service: Service) {
  return {
    "@context": "https://schema.org",
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
    "@context": "https://schema.org",
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
 * The FAQ page. This is the one rich result on the site Google still shows
 * widely, and it fires only when every question and answer in the markup is
 * visible on the page — which is why the accordion renders its answers into
 * the HTML rather than fetching them when opened.
 */
export function faqJsonLd(faqs: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: { "@type": "Answer", text: faq.a },
    })),
  };
}

/** A journal entry. `dateModified` mirrors publication until a post is edited. */
export function postJsonLd(post: Post) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": absoluteUrl(`/blog/${post.slug}#post`),
    headline: post.title,
    description: post.dek,
    datePublished: post.date,
    dateModified: post.date,
    inLanguage: "en-CA",
    url: absoluteUrl(`/blog/${post.slug}`),
    mainEntityOfPage: absoluteUrl(`/blog/${post.slug}`),
    author: { "@id": ID.business },
    publisher: { "@id": ID.business },
    keywords: post.tag,
  };
}
