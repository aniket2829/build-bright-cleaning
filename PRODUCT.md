# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Next.js 16.3.4 (App Router) + React 19 + TypeScript + Tailwind CSS v4, from an otherwise untouched `create-next-app` scaffold. Established by the existing codebase, not chosen in this interview. No deploy target recorded.

## Users

Primary user: a homeowner or renter in Edmonton looking to hire a residential cleaning service. They arrive with a specific job in mind, a recurring clean they no longer want to do themselves, a deep clean before or after an event, or a move-in/move-out clean tied to a hard date, and they are comparison-shopping two or three local companies in one sitting. They need to judge trustworthiness (someone will be in their home, often unattended) and get a price before committing.

## Product Purpose

A marketing website for Build Bright Cleaning, a residential cleaning company serving Edmonton, Alberta. The site exists to convert a visitor into a quote request. Success is a submitted quote form with enough job detail (service type, home size, service address, cleaning schedule, preferred date and time, contact) to price and follow up on.

## Positioning

**The same cleaner, every visit.** One vetted person is matched to a home and keeps it, learning it over about four visits, rather than a rotating pool sending whoever is free. Confirmed by the user in the shape interview and built as the structural spine of the site. Two supporting commitments were confirmed alongside it and are load-bearing in the copy: the quote is a fixed price for the job rather than an hourly rate, and anything not right is re-cleaned within 48 hours.

`https://rightchoicecleaning.ca` (house cleaning, Alberta) was given as a category reference for business type and market only, never as a positioning, content, or visual mandate.

Still undecided, and not to be invented: any claim about insurance, bonding, licensing, certification, years in business, or team size.

## Operating Context

Visitors are comparison-shopping local cleaning companies, frequently on a phone, often under time pressure from a move or an event date. Home size, service type, city, and preferred date are the variables that determine a price, so a quote request is only useful if it captures them. Trust signals matter disproportionately because the service involves access to the customer's home.

## Capabilities and Constraints

- Single conversion path: **request a quote**. A quote form is the primary call to action across the site.
- Services offered: recurring house cleaning, deep cleaning, move-in/move-out cleaning, one-time cleans, post-construction cleaning, steam carpet cleaning, and wall stain removal. Residential only; no commercial offering. (Post-construction, steam carpet and wall stain removal were added by the user after the shape interview, which had recorded the first four and no post-construction work.)
- Service area: Edmonton only.
- Confirmed since the shape interview: a phone number is offered as a secondary path beside the form; a journal (blog) is part of the site.
- **No figures anywhere.** The user later directed that all pricing and all visit durations be removed from the site. There are no starting-at prices, no rate card, no live estimate, no hour ranges and no cadence lines; `/pricing` was deleted. The site still states the pricing *model* (a fixed price for the job, never hourly) and routes every cost question to the quote form, where a person prices it by hand.
- Still undecided: the quote-form submission backend (currently a validating stub), online booking/scheduling (deliberately absent), any CMS behind the journal, and legal pages.

## Brand Commitments

Name: **Build Bright Cleaning**. No logo, colors, typography, voice guide, or other identity constraint exists yet, the codebase is a stock Next.js scaffold and carries no incumbent visual system worth preserving. Nothing is binding; the visual world is fully open.

## Evidence on Hand

**None is real.** There are no genuine photos, reviews, ratings, credentials, insurance or licensing documents, case studies, or customer data.

This is a demo/portfolio build, and the user has explicitly authorized invented content: use realistic dummy imagery and reviews, **not** visible placeholders (no lorem ipsum, no gray boxes, no "Your Review Here"). Fabricated content must read as finished, plausible copy for this business. It must never be presented to the user as real, and it must not include claims that would be legally material if the site went live unchanged, specific insurance policies, license or certification numbers, named third-party review platforms with fabricated ratings, or awards. Everything invented is stand-in content to be swapped before any real launch.

## Product Principles

1. **The quote is the product.** Every section either earns the quote request or removes a reason to hesitate. Anything doing neither is cut.
2. **Trust before persuasion.** The visitor is deciding who to let into their home. Reassurance is a structural requirement, not decorative.
3. **Answer the price question honestly.** Visitors leave when cost is unknowable. Since the site names no figures, it must be unambiguous about *how* it prices — fixed per job, quoted by a person, nothing added afterwards — and move the visitor to the quote form as directly as possible. Being silent on price is a decision the site has to carry well, not hide.
4. **Local, not generic.** Edmonton is stated plainly. Nothing should read as an interchangeable national franchise template.
5. **Invent nothing verifiable.** Dummy content stays in the realm of the plausible and non-material; it never becomes a checkable claim.

## Accessibility & Inclusion

No product-specific requirement established beyond the standard bar: the site is phone-first for many visitors and the quote form must be operable by keyboard and screen reader.
