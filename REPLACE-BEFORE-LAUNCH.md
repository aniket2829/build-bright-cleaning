# Replace before launch

Build Bright Cleaning is a demonstration build. Everything listed here was authored for the demo and describes no real company, person, or transaction. Nothing on this list is a claim you can currently stand behind.

Work top to bottom before this site is used commercially.

## 1. Company identity and contact

| What | Where | Note |
|---|---|---|
| Business name | `lib/content.ts` → `business.name` | Also in `app/layout.tsx` metadata and the footer wordmark. |
| Phone number | `lib/content.ts` → `business.phoneDisplay` / `phoneHref` | Set to **(825) 963-3038**. It appears in the header, footer, FAQ, About and quote pages. |
| Email | `lib/content.ts` → `business.email` | Set to **navneetlotey2000@gmail.com**. Quote enquiries are emailed here over Gmail SMTP — see § 6 for the credentials it needs. `QUOTE_INBOX` overrides it without touching code. |
| Coverage | `lib/content.ts` → `business.cities` and `cities` | **Edmonton only.** Calgary was removed from the coverage list, the city pages, the reviews and every page's copy. Adding a second city is a content change in `cities`; the home page grid and `/areas` already adapt. |
| Trading hours | `lib/content.ts` → `business.hours` | |
| Domain | `app/layout.tsx` → `metadataBase` | Currently `https://buildbright.example`. |
| Logo | `components/icons.tsx` → `Mark` | Authored SVG glyph (a doorway with light crossing the threshold). Replace or keep deliberately. |

## 2. Reviews

All twelve testimonials in `lib/content.ts` → `reviews` are written, not collected. Names, neighbourhoods, tenure and star ratings are invented.

Replace with real, attributable reviews, or delete `/reviews` and the home-page proof section entirely. A visible disclosure already sits at the foot of `/reviews`; remove it only once the reviews are genuine.

**Deliberately absent, and do not add without evidence:** any aggregate rating ("4.9 from 312 reviews"), any third-party platform name or badge, any review platform logo.

## 3. Prices

**There are none, by product decision.** The site names no figure anywhere: no starting-at prices, no rate card, no live estimate, and no visit durations. The `/pricing` page, the price scale and the quote form's estimate panel were all removed, and `services[].from`, `services[].hours`, `services[].cadence` and the `estimate()` helper no longer exist in `lib/content.ts`.

What the site does still promise, in copy, is the *pricing model*: a fixed price for the job rather than an hourly rate, quoted by a person after the form is submitted. That claim is on the home page, `/faq`, `/about` and every service page.

If you later want figures back, the honest place for them is a new `/pricing` page plus a `from` field on `Service`, both rebuilt deliberately — do not scatter numbers into the service pages. Whatever you add must be a real rate card, not an illustrative one, since nothing on the site currently labels any number as illustrative.

## 4. Claims the site deliberately does not make

These were left out because they become legally material the moment the site is live. Add them only when true and documented:

- Insurance and bonding
- Business licence or certification numbers
- Police / background-check specifics (the site says "vetted" and nothing more)
- Years in business, team size, number of clients
- Awards, memberships, accreditations
- Any guarantee beyond what you will actually honour, note the 48-hour re-clean promise appears on `/faq` and the home page and must be a real policy or be removed

## 5. Copy that asserts how you operate

The whole site is built on one claim: **the same cleaner, every visit.** It appears on every page. If your operating model is a rotating pool, this site is not merely off-brand, it is untrue, change the model or change the site.

The same applies to: fixed per-job pricing (not hourly), the two-day notice policy for skipping visits, the "we call before we start if the job is bigger" promise, and the one-rematch policy in `/faq`.

## 6. The quote form

`app/quote/actions.ts` validates the answers and emails the enquiry to `QUOTE_INBOX` (default: `business.email`) over Gmail SMTP, via `lib/mailer.ts`. The customer is set as `Reply-To`, so replying from the inbox writes back to them.

**It will not send until two secrets exist.** Copy `.env.example` to `.env.local` and fill in:

| Variable | What it is |
|---|---|
| `SMTP_USER` | The Gmail account the site sends *as*. Gmail rewrites `From` to this address, so it must own the app password. |
| `SMTP_PASSWORD` | A 16-character **Google App Password** — not the account password. Requires 2-Step Verification on the account: Google Account → Security → 2-Step Verification → App passwords. |
| `QUOTE_INBOX` | Optional. Where enquiries land; defaults to `business.email`. |

Run `npm run mail:check` to prove the login without sending anything, or `npm run mail:check -- --send` to post one test message. Until the secrets are set the form fails honestly: it shows the phone number instead of a false confirmation, and the reason is logged server-side.

**Known limits before real traffic:**

- **Gmail caps a free account at roughly 500 messages a day** and can throttle or lock an account it thinks is being used for bulk sending. For anything beyond light volume, move to a transactional sender (Resend, Postmark, SES) — only `lib/mailer.ts` changes.
- **Spam protection is a honeypot plus a per-IP cap of 5/hour** (`lib/rate-limit.ts`). The limiter is in-memory, so it holds for a single long-lived server but **not** for serverless or multi-instance deploys, where each instance counts separately and cold starts forget. Move the counter to Redis/Upstash, or limit at the CDN, if you deploy that way. Add a real captcha if bots find the form.
- **No enquiry is stored.** If the email fails to send, the enquiry is gone. A database or CRM write alongside the send is the fix.

The form now collects, and `submitQuote` now validates:

| Field | Notes |
|---|---|
| Service, bedrooms, bathrooms, pets, extras | As before. |
| `address1`, `address2`, `addressCity`, `region`, `postal` | Service address. `addressCity` defaults to Edmonton and `region` to Alberta; `postal` is validated against the Canadian format. |
| `schedule` | `one-time`. Required. |
| `date`, `timeSlot` | Both optional. The date comes from the themed picker in `components/date-picker.tsx` (past dates disabled, local `YYYY-MM-DD`); `timeSlot` is `morning`, `afternoon` or `evening`. |
| `access`, `name`, `email`, `phone` | As before. |

**The picked date and time are a preference, not a booking.** The form says so, and the confirmation says so. If you later make it a real booking, it needs availability behind it, or the promise stops being true.

## 7. Imagery

There is no photography anywhere in this build. No image generation was available, so the site's media language is authored light geometry (`components/doorway.tsx`) rather than photographs. This is a coherent, complete design decision, not a placeholder, but if you want real photography, these are the natural slots:

| Slot | File | Frame |
|---|---|---|
| Home hero | `app/page.tsx` (the `Doorway` layer) | ~16:10 desktop, ~4:5 mobile crop; a lit doorway or entryway at dusk |
| Service pages | `app/services/[slug]/page.tsx` | One room photograph per service, 3:2 |
| City pages | `app/areas/[city]/page.tsx` | One recognisable neighbourhood exterior, 3:2 |
| Blog | `app/blog/[slug]/page.tsx` | One lead image per post, 2:1 |

If you add photography, keep the dusk-to-plaster temperature logic: cold exteriors above, warm interiors below.

## 8. Legal pages that do not exist yet

No privacy policy, terms, or cookie notice has been written. Add them before collecting a single email address through the quote form.
