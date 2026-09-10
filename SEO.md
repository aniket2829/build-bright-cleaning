# SEO

Two halves. The first is done and lives in the code. The second is account
work only the business owner can do, and it is the half that actually decides
whether this site ranks in Edmonton.

Read § 1 to know what shipped. Then do § 2 in order — the first item is not
optional and everything else fails without it.

---

## 1. What is in the code now

| Thing | Where | What it does |
|---|---|---|
| One source of truth for the domain | `lib/seo.ts` → `SITE_URL` | Every canonical, sitemap entry, OG tag and JSON-LD URL is built from it. Set once, in the environment. |
| Canonical URL on every page | `canonical()` in each `page.tsx` | Tells Google which URL is *the* URL, so `?utm_source=facebook` traffic credits the real page instead of splitting it. |
| `sitemap.xml` | `app/sitemap.ts` | Generated from `lib/content.ts`. Add a service, city or post and it appears automatically. |
| `robots.txt` | `app/robots.ts` | Allows everything and points at the sitemap. |
| Business structured data | `lib/seo.ts` → `businessJsonLd()` | `HouseCleaningService` with phone, email, hours, and all ten service-area municipalities. This is what local results read. |
| Per-page structured data | service / city / blog / FAQ pages | `Service`, `BlogPosting`, `FAQPage`, `BreadcrumbList`. |
| Share cards | `app/opengraph-image.tsx` | A generated 1200×630 card in the site's own colours, so links posted to Facebook, WhatsApp and iMessage look like a business. |
| Crawl directives | `app/layout.tsx` → `robots` | Includes `max-image-preview: large`, which is what permits a full-width image in a result rather than a thumbnail. |
| 404 excluded | `app/not-found.tsx` | `noindex`, so dead URLs never rank. |
| Google Analytics 4 | `components/analytics.tsx` | Loads only when `NEXT_PUBLIC_GA_ID` is set. Tracks client-side navigation, which a plain gtag snippet does not. |
| Quote conversion | `components/quote-form.tsx` | Fires `generate_lead` when the server accepts an enquiry — not when the button is clicked. |

### Two things deliberately left out

**No review or rating markup.** The twelve testimonials in `lib/content.ts`
are written, not collected. Star ratings in search results come from
`aggregateRating` markup, and publishing that for invented reviews is a
misrepresentation to Google that gets sites manually penalised, on top of being
untrue. Add it the day the reviews are real — see `REPLACE-BEFORE-LAUNCH.md` § 2.

**No `keywords` meta tag.** Google has ignored it since 2009. The words that
matter are in the headings, the copy and the page titles, where they already are.

---

## 2. Do these, in this order

### Step 1 — The domain is set. Confirm the redirect.

`lib/seo.ts` now defaults to **`https://buildbrightcleaning.ca`** — the apex,
not `www`. Every canonical, the sitemap, robots.txt and the share cards are
built from it, and because it is the default rather than an environment
variable, a deploy that forgets to set anything still emits correct URLs.

One thing is still yours to do, at the DNS or hosting layer:

**Make `www.buildbrightcleaning.ca` redirect (301) to `buildbrightcleaning.ca`.**
To a crawler the apex and the www subdomain are two different sites serving
identical content. Without the redirect your ranking signals split between the
two. Most hosts do this with one setting — on Vercel, add both domains and mark
the apex as primary.

To override the domain for a staging or preview deploy, set a `SITE_URL`
environment variable there. Never point a preview at the production domain: its
canonicals would tell Google the preview *is* the live site.

> **On the "public prefix" warning.** Hosts flag `NEXT_PUBLIC_*` variables
> because that prefix ships the value into the browser bundle. `SITE_URL` has
> no prefix on purpose — only server code reads it — so that warning should not
> appear for it. If your host offers a *Secret* / *Config* classification, this
> is **Config**: the domain is printed in every canonical tag anyway.
>
> Environment variables are read when the site is **built**, not on each
> request. After changing one you must **redeploy**, not just restart.

Also update Search Console and Analytics to the apex domain if you already
created either against a different one.

Verify after deploying — both should show your real domain:

```
curl https://buildbrightcleaning.ca/robots.txt
curl -sI https://www.buildbrightcleaning.ca/     # expect 301 -> apex
curl -s https://buildbrightcleaning.ca/ | grep canonical
```

### Step 2 — Google Business Profile

**For a local cleaning company this outranks everything on this website.** The
map pack — the three businesses with pins above the normal results — is where
"house cleaning near me" is won, and entry to it is the Business Profile, not
the site.

1. Go to <https://business.google.com> and create a profile.
2. Choose **"I deliver goods and services to my customers"** and hide your
   address. You clean in customers' homes; listing a home address publishes it.
3. Set the service areas to the same ten in `lib/content.ts` → `serviceArea`.
4. Category: **House Cleaning Service**. Add "Cleaning Service" as secondary.
5. Name, phone and hours must match the site **character for character** —
   `(825) 963-3038`, `Mon–Sat, 7am–7pm MT`. Inconsistent details across the web
   are the most common reason a local business fails to rank.
6. Verify (postcard, phone or video — Google decides which).
7. Add the six services, and photographs of real completed work.
8. **Then ask every finished customer for a review.** Review count and recency
   are among the strongest map-pack factors. A steady trickle beats a burst.

### Step 3 — Google Search Console

This is where you learn what people actually type. It is free and it is the
only honest source for that.

1. <https://search.google.com/search-console> → Add property.
2. Choose **Domain** (not URL prefix) and add the TXT record your DNS provider
   asks for. It covers http, https, www and non-www in one property.
   - If you cannot edit DNS, use URL prefix instead and verify with the HTML
     tag: paste the content value into `GOOGLE_SITE_VERIFICATION` in your
     environment and redeploy. The tag is already wired in `app/layout.tsx`.
3. **Sitemaps** → submit `sitemap.xml`. It should read "Success" and list ~19 URLs.
4. **URL Inspection** → paste your home page → **Request indexing**. Do the same
   for `/services` and `/areas/edmonton`. This is the fastest way in.
5. Come back in two weeks. The **Performance** report then shows every query
   that showed your site, its position, and its click rate.

### Step 4 — Google Analytics 4

Search Console tells you how people arrive. Analytics tells you what they do
next. You want both.

**a. Create the property**

1. <https://analytics.google.com> → Admin (bottom left) → **Create** → Property.
2. Name it, set timezone to **(GMT-07:00) Edmonton** and currency to CAD.
   Timezone matters: get it wrong and "yesterday" is the wrong day forever.
3. Choose **Web** as the platform, enter your domain, name the stream.
4. Copy the **Measurement ID** at the top right. It looks like `G-ABC1234XYZ`.

**b. Wire it in**

```
NEXT_PUBLIC_GA_ID=G-ABC1234XYZ
```

Same place as `SITE_URL` — hosting environment variables — then **redeploy**.
Leave it unset locally: with no ID, no analytics script loads at all, so your
own development traffic never contaminates the numbers.

> **This one keeps the `NEXT_PUBLIC_` prefix, and your host will warn about it.
> Accept the warning.** The ID is read by a client component, so without the
> prefix it is undefined in the browser and analytics silently never loads. And
> it is not a secret: the measurement ID sits in the `googletagmanager.com`
> URL that every visitor's browser requests, on every GA-instrumented site on
> the internet. It identifies which property to write to; it grants no access
> to your data, which is protected by your Google account. If asked to classify
> it, it is **public config**, not a secret.
>
> The rule of thumb: a value is safe to prefix if you would not mind a visitor
> reading it in "View Source". Never prefix `SMTP_PASSWORD`.

**c. Prove it works**

Open your live site, then in GA4 go to **Reports → Realtime**. You should
appear within about thirty seconds. Click through to `/services` and `/faq` and
watch both appear in "Views by page title" — that confirms the route-change
tracking is working, which is the part a copy-pasted gtag snippet gets wrong.

**d. Mark the quote as a key event — do not skip this**

The form already sends `generate_lead` when an enquiry is accepted. GA4 will
not treat it as a conversion until you say so.

1. Admin → **Data display → Events**. Wait until `generate_lead` appears in the
   list (up to 24 hours after the first real submission).
2. Toggle **"Mark as key event"**.

From then on, GA4 can tell you which pages and which sources produce actual
enquiries, rather than which produce visits. That distinction is the whole
value of the tool.

**e. Link Search Console to Analytics**

Admin → **Product links → Search Console links** → Link.

This puts the search queries into your Analytics reports, so you can see one
chain end to end: query typed → page landed on → quote submitted. Neither tool
shows you that alone.

**f. What to actually look at, monthly**

Ignore most of the interface. Four numbers matter:

| Question | Where |
|---|---|
| How many enquiries, and from where? | Reports → Acquisition → Traffic acquisition, with `generate_lead` as the key event |
| Which pages bring people in? | Reports → Engagement → Landing page |
| What are people searching to find me? | Search Console → Performance → Queries |
| Where do people give up in the form? | Realtime, and the drop between `/quote` views and `generate_lead` count |

If `/services/deep` brings traffic that never quotes, the page is attracting
the wrong reader or failing to convince. That is a content problem the numbers
found for you.

**g. Privacy**

GA4 sets cookies. Alberta's PIPA and Canada's PIPEDA expect a privacy policy
saying what you collect. `REPLACE-BEFORE-LAUNCH.md` § 8 already flags that no
privacy policy exists — analytics makes writing one a requirement, not a
nicety. Consent banners are not legally mandatory in Canada the way they are in
the EU, but the policy page is.

---

## 3. Ranking: what actually moves the needle here

In rough order of return for a local cleaning business:

1. **Google Business Profile with real reviews.** § 2, step 2. Nothing on this
   list comes close.
2. **Consistent name, address and phone everywhere** — the site, the Business
   Profile, Yelp, Facebook, YellowPages. Same format each time.
3. **A page per city you actually serve.** Right now the site sells to ten
   municipalities but has one city page, `/areas/edmonton`. Someone searching
   "house cleaning St. Albert" has nothing specific to find.

   **Do this properly or not at all.** Adding a `City` entry to
   `lib/content.ts` generates the page, the sitemap entry and the schema
   automatically — but nine near-identical pages with the town name swapped is
   *doorway pages*, which Google explicitly penalises. Each new city page needs
   genuinely local substance: the neighbourhoods you really work in, what the
   housing stock there is like, how the drive affects scheduling. One real
   St. Albert page beats nine templated ones.
4. **Keep writing the journal.** Five posts is a start, not a programme. Posts
   answering real questions ("how much does a move-out clean cost in Edmonton",
   "what does a landlord actually check") bring people who are about to buy.
   One good post a month compounds.
5. **Get linked to.** Local business directories, the Edmonton Chamber of
   Commerce, a supplier's or partner's site, local Facebook groups. Never buy
   links; it is the fastest way to a manual penalty.
6. **Stay fast.** The site is statically generated with no images and no
   third-party scripts beyond the analytics tag, which is already most of the
   battle. Run <https://pagespeed.web.dev> after launch and keep it green.

## 4. Verify the technical work after launch

| Check | Tool |
|---|---|
| Structured data valid | <https://search.google.com/test/rich-results> |
| Share card renders | <https://www.opengraph.xyz> |
| Sitemap reachable and correct domain | <https://buildbrightcleaning.ca/sitemap.xml> |
| Speed and Core Web Vitals | <https://pagespeed.web.dev> |
| Indexing status, weekly for the first month | Search Console → Pages |

---

## 5. Honest expectations

A new domain does not rank quickly. Indexing takes days to weeks; competing for
"house cleaning Edmonton" against companies with hundreds of reviews takes
months. The Business Profile is the one lever that can produce enquiries in
weeks rather than quarters, which is why it is step 2 and not an afterthought.

Anyone promising a top ranking on a schedule is selling something. What this
setup guarantees is that nothing technical is standing in the way — every page
is crawlable, correctly described, and honestly marked up.
