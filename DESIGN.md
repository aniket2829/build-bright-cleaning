---
name: Build Bright Cleaning
description: A winter-dusk street that warms to lamplit plaster, with amber reserved for the one action.
colors:
  dusk-900: "#0a111c"
  dusk-800: "#0e1726"
  dusk-700: "#16233a"
  dusk-600: "#22334f"
  frost-100: "#e8eef7"
  frost-200: "#d6deea"
  frost-400: "#93a6c0"
  frost-500: "#6e86a8"
  amber-500: "#e8a33d"
  amber-400: "#f2bb6b"
  pine-800: "#23372e"
  pine-600: "#355644"
  plaster-50: "#f9f5ee"
  plaster-100: "#efe7da"
  plaster-200: "#e3d8c6"
  plaster-300: "#d2c4ac"
  ink-900: "#1a1710"
  ink-700: "#3b342a"
  ink-500: "#6b6153"
typography:
  display:
    fontFamily: "Vollkorn, Georgia, 'Times New Roman', serif"
    fontSize: "clamp(3.25rem, 6vw, 4.5rem)"
    fontWeight: 600
    lineHeight: 0.98
    letterSpacing: "-0.028em"
  headline:
    fontFamily: "Vollkorn, Georgia, 'Times New Roman', serif"
    fontSize: "clamp(2.25rem, 4vw, 3rem)"
    fontWeight: 600
    lineHeight: 1.04
    letterSpacing: "-0.028em"
  title:
    fontFamily: "Vollkorn, Georgia, 'Times New Roman', serif"
    fontSize: "1.5rem"
    fontWeight: 600
    lineHeight: 1.25
    letterSpacing: "normal"
  body:
    fontFamily: "Schibsted Grotesk, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 400
    lineHeight: 1.625
    letterSpacing: "normal"
  label:
    fontFamily: "Schibsted Grotesk, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 600
    lineHeight: 1.4
    letterSpacing: "0.025em"
  fine:
    fontFamily: "Schibsted Grotesk, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.9375rem"
    fontWeight: 400
    lineHeight: 1.625
    letterSpacing: "normal"
rounded:
  pill: "9999px"
  field: "0.75rem"
  panel: "1rem"
  focus: "2px"
spacing:
  gutter: "1.25rem"
  gutter-wide: "2rem"
  section: "5rem"
  section-wide: "7rem"
  stack: "1.75rem"
  rule-gap: "1.5rem"
components:
  button-primary:
    backgroundColor: "{colors.amber-500}"
    textColor: "{colors.ink-900}"
    typography: "{typography.body}"
    rounded: "{rounded.pill}"
    padding: "1rem 1.75rem"
  button-primary-hover:
    backgroundColor: "{colors.amber-400}"
    textColor: "{colors.ink-900}"
  button-primary-disabled:
    backgroundColor: "{colors.plaster-300}"
    textColor: "{colors.ink-500}"
  button-ghost-dusk:
    backgroundColor: "transparent"
    textColor: "{colors.frost-200}"
    rounded: "{rounded.pill}"
    padding: "1rem 1.75rem"
  button-ghost-warm:
    backgroundColor: "transparent"
    textColor: "{colors.ink-900}"
    rounded: "{rounded.pill}"
    padding: "1rem 1.75rem"
  input-text:
    backgroundColor: "{colors.plaster-50}"
    textColor: "{colors.ink-900}"
    rounded: "{rounded.field}"
    padding: "0.875rem 1rem"
    width: "100%"
  chip-option:
    backgroundColor: "transparent"
    textColor: "{colors.ink-700}"
    rounded: "{rounded.field}"
    padding: "0.875rem 1.25rem"
  chip-option-selected:
    backgroundColor: "{colors.ink-900}"
    textColor: "{colors.plaster-50}"
    rounded: "{rounded.field}"
    padding: "0.875rem 1.25rem"
  panel-warm:
    backgroundColor: "{colors.plaster-200}"
    textColor: "{colors.ink-700}"
    rounded: "{rounded.panel}"
    padding: "1.75rem"
  nav-link:
    backgroundColor: "transparent"
    textColor: "{colors.frost-400}"
    typography: "{typography.fine}"
    rounded: "{rounded.pill}"
    padding: "0.5rem 0.875rem"
  nav-link-active:
    backgroundColor: "{colors.dusk-700}"
    textColor: "{colors.frost-100}"
---

# Design System: Build Bright Cleaning

## Overview

**Creative North Star: "The Threshold"**

The site is the walk from a cold street into a warm, handled house. Every page starts outside on a flat winter-dusk ground (`dusk-800`, #0e1726) with frost-blue text, and crosses at some point into lamplit plaster (`plaster-100`/`plaster-50`) with brown-black ink. Amber is the lamp: it is the colour of the one action the site wants, and of the light bleeding into the room around it. The palette is a temperature scale, not a swatch set, and a section's ground colour is a statement about where in the walk the reader is standing.

The material is flat. There is not a single `box-shadow` in the build. Depth is made entirely by ground temperature, hairline rules, and two soft radial glows that carry no edge. Structure is drawn with 1px borders in the ground's own ramp (`dusk-700`/`dusk-600` outside, `plaster-300` inside) — lists sit on ruled lines rather than in cards, and the few real panels are flat tonal steps (`plaster-200` on `plaster-50`), never lifted ones.

The two rejected worlds are on the record: the aqua-bubbles-and-sparkles cleaning page, and its muted-sage wellness opposite. Nothing here is teal, mint, or sage; nothing sparkles; there is no photography anywhere, and the only drawn marks in the system are the hero broom (`components/sweep.tsx`) and the doorway wordmark glyph (`Mark` in `components/icons.tsx`), both flat, exact, and never shaded or perspectived.

**Key Characteristics:**
- One temperature axis: dusk outside, plaster inside, amber as the light between them.
- Zero shadows. Hairline rules and ground steps do all the structural work.
- A serif display (Vollkorn) over a grotesque text face (Schibsted Grotesk), display always semibold and optically tightened.
- Numbers are tabular everywhere they are compared (`.tnum`).
- Full-bleed ruled lists instead of cards; pill controls; 12px-radius fields; 16px-radius panels.
- Motion is narrative and scarce: three named devices, all switched off under `prefers-reduced-motion`.

## Colors

A temperature ramp with a single accent: cold blue-black outside, warm off-white inside, one lamp amber, and a dark winter-yard green used only for quiet emphasis on the warm side.

### Primary
- **Lamp Amber** (`amber-500`): the action colour. Primary buttons, the focus ring, the browser accent and caret, the selection highlight on the dusk side, the wordmark glyph in the header, the completed rungs of the quote ladder, and the light in the bloom and broom trace. It is the only saturated colour in the system.
- **Lamp Amber Lifted** (`amber-400`): the hover state of every amber button, and the only form in which amber carries text — as link/hover text on the dusk ground, never on plaster.

### Secondary
- **Winter Yard** (`pine-800`, with `pine-600` for its lighter mark): warm-side quiet emphasis only — step numerals in the "three steps" ordinal list, the hover colour of warm-side headings and Service Index rows, the checkmarks in room lists, and inline form/validation errors. It is deliberately not a second accent; it never appears on the dusk ground and never on a control.

### Neutral — outside (dusk)
- **Winter Dusk** (`dusk-800`): the document ground; the colour of the street.
- **Dusk Deep** (`dusk-900`): the lifted sticky header (at 92% with a blur), the mobile nav sheet, and the scrollbar track.
- **Dusk Rule** (`dusk-700` / `dusk-600`): section-dividing hairlines and the border of ghost buttons and icon buttons; `dusk-700` is also the active nav pill fill.
- **Frost** (`frost-100` headings, `frost-200` body, `frost-400` secondary/meta, `frost-500` hairline fills and scrollbar thumb hover): the cold light on the dusk side. Text on dusk is never white.

### Neutral — inside (plaster)
- **Plaster** (`plaster-100` the main warm ground, `plaster-50` the lighter warm ground used for proof/reading bands and input fills, `plaster-200` the one panel fill, `plaster-300` every warm hairline, unselected mark, and disabled fill).
- **Ink** (`ink-900` headings and emphasis, `ink-700` body, `ink-500` meta, hints and placeholders): the warm side's text ramp. Text on plaster is never black.

Four ramp steps are declared in `app/globals.css` and currently unused — `dusk-950`, `pine-900`, `amber-600`, `amber-300`. They are reserve, not vocabulary; don't reach for them to invent a new role.

### Named Rules

**The Temperature Rule.** A section's ground says where the reader is in the walk. Dusk grounds are the street: hero, page heroes, the 404, anything before the argument lands. Plaster grounds are inside: how-it-works, proof, service detail, forms, long-form reading, and the whole footer. Cross once per page, forwards, and never alternate back and forth.

**The Warm-Side Rule.** Any element painted on plaster must carry the `.warm-side` class on its section (or an ancestor). That class is not cosmetic: it flips `color-scheme` to light and re-tints the scrollbar and `::selection` so the browser's own surfaces stay legible against the warm ground. A plaster section without `.warm-side` is a bug, not a variant. See `app/globals.css` and every `warm-side` section in `app/`.

**The Amber-Never-Speaks-On-Plaster Rule.** Amber on plaster fails contrast. On the warm side amber is only ever a fill sitting behind `ink-900` text (buttons, the confirmation disc, ladder dots). It never becomes a text, link, or hover colour there. Amber text (`amber-400`) is legal only on the dusk ground.

**The One Lamp Rule.** Amber is the action colour and the light. Nothing decorative may be amber, and no second accent may be introduced: if something needs to stand out on the warm side, it gets `ink-900` weight or `pine-800`, not a new hue.

*(Recorded divergence from the direction contract: the contract says amber wears nothing but the action. In the build amber also carries the focus ring, the caret and browser accent, the dusk-side selection highlight, the header wordmark glyph, and the ambient bloom and broom trace. Those are all "the lamp" rather than "an action" — that is the system as built, and it is the boundary to hold.)*

## Typography

**Display Font:** Vollkorn (fallback Georgia, "Times New Roman", serif), loaded via `next/font/google` as `--font-vollkorn`
**Body Font:** Schibsted Grotesk (fallback ui-sans-serif, system-ui, sans-serif), loaded as `--font-schibsted`

**Character:** A warm, slightly bookish serif doing all the talking, over a plain modern grotesque doing all the explaining. The serif is always semibold (600) and never light or italic-as-decoration; the pairing reads as a considered letter rather than a brochure.

### Hierarchy
- **Display** (600, `3.25rem`/`0.98` rising to `4.5rem` at `sm`): the home hero headline only. Always `.display-tight` (-0.028em, `text-wrap: balance`).
- **Page headline** (600, `3rem` → `3.75rem` → `4.5rem` across `sm`/`lg`, leading `1.02`, max `18ch`): the `PageHero` h1 on every interior route.
- **Section headline** (600, `2.25rem` → `3rem` at `sm`, leading `1.04`, capped at 14–20ch): every `h2`. Always `.display-tight`.
- **Title** (600, `1.5rem`, leading `1.25`): card, list-item, accordion and panel headings; also the Service Index's service names at `1.25rem`.
- **Lede** (400, `1.25rem` → `1.5rem` at `sm`, leading relaxed): the paragraph directly under an h1.
- **Body** (400, `1.125rem`, leading relaxed, `.measure` = 68ch): the reading paragraph, set by `Prose` on the warm side.
- **Fine** (400, `0.9375rem`): meta lines, nav links, footer links, hints, attributions. The system's most common small size — `text-sm` (0.875rem) is reserved for labels and the footer's legal line.
- **Label** (600, `0.875rem`, `tracking-wide`, uppercase): the only uppercase in the system. Used for column heads and panel titles — the Service Index's "What we do", the city page's "Neighbourhoods we work in", footer column titles, the quote summary's "Your request". Four places, and it should stay that few.

### Named Rules

**The Serif-For-Claims Rule.** Vollkorn carries claims, names, and numbers-as-figures (headlines, checklist counts, step numerals, pull quotes). Schibsted Grotesk carries explanation, navigation and controls. A serif button or a grotesque h2 is off-system.

**The Tabular Rule.** Any number a reader might compare or scan — phone numbers, trading hours, checklist and room counts, step ordinals, reference codes — carries `.tnum`. Figures that align in a column but jitter between rows are the defect this rule exists to prevent.

**The Measure Rule.** Running prose is capped by `.measure` (68ch); headlines are capped in `ch` on the element (`max-w-[14ch]` to `max-w-[20ch]`) so they break where the sense breaks. No paragraph runs the full 86rem container.

## Layout

One container, one rhythm. `Container` (`components/page-parts.tsx`) is `max-width: 86rem` with `1.25rem` gutters rising to `2rem` at `sm`; nothing on the site opts out of it. The header shares the same measure at a fixed `4.5rem` height.

Vertical rhythm is sectional: `5rem` top and bottom, opening to `6rem`–`7rem` at `sm`. Interior pages open with `PageHero` (`3.5rem` top, `5rem` bottom, `5rem`/`7rem` at `sm`). Within a section the stack is `mt-5`/`mt-7` under a heading, `mt-14`/`mt-16` before the section's content block, `mt-10`/`mt-12` before its closing action.

The grid is content-shaped rather than a fixed column system. The recurring forms are: a three-up ruled list (`sm:grid-cols-3`, `gap-x-10 gap-y-12`, each item opening with a top rule); a two-up warm split; a reading-plus-aside split (`lg:grid-cols-[1fr_23rem]` on the quote, with the aside sticky at `top-28`); and the Service Index's three-track row (`sm:grid-cols-[16rem_1fr_auto]`) which collapses to a single stacked column below `sm`.

Breakpoints in use are Tailwind's `sm` (640px), `md` (768px), and `lg` (1024px). Two behavioural cutoffs matter: navigation collapses to the sheet menu below `lg`, and the hero brooms are hidden entirely below `768px` (a full-width mobile text column leaves no gutter to sweep, and a broom cropped to a sliver of handle is worse than none). Wide tables scroll inside their own bleed-and-restore wrapper (`-mx-5 overflow-x-auto px-5 sm:mx-0`) rather than shrinking type.

The hero is deliberately short: a `36rem` text column with `3.5rem`–`7rem` of vertical padding, so the same-cleaner argument arrives near the fold.

## Elevation & Depth

**There are no shadows in this system.** Not one `box-shadow` exists in `app/` or `components/`. Depth is temperature and rule: a surface reads as forward because it is warmer or lighter than what surrounds it, and as separate because a 1px hairline says so.

Three devices carry all the atmosphere, and all three are edgeless light rather than cast shadow:

- **The bloom** (`app/layout.tsx`): a fixed, `70vh`, bottom-anchored radial of `amber-500` mixed to 26% → 8% → transparent, sitting at `-z-10` behind the whole document. Its opacity is `calc(0.25 + var(--warmth) * 0.75)` — it is the lamp getting closer as you scroll.
- **The page-hero glow** (`PageHero`): a smaller radial of amber at 14%, offset to 68% across, behind every interior h1.
- **The crossing wash** (home, above the first plaster section): a 6rem linear gradient from transparent to amber-at-12%, painted immediately above the warm section so the temperature change has a threshold rather than a seam.

The single lifted element is the sticky header, and it lifts by material, not by shadow: past 12px of scroll it takes `dusk-900` at 92% opacity with `backdrop-blur-md` and grows a bottom border.

### Named Rules

**The No-Shadow Rule.** Surfaces are flat. If something needs to separate, give it a hairline in the ground's own ramp (`dusk-700`/`dusk-600`, or `plaster-300`) or step the ground one tone (`plaster-50` → `plaster-200`). Adding a shadow anywhere breaks the world's flat-and-exact material.

**The Warming Border Rule.** The header's bottom border is not a static colour: it is `color-mix` between `dusk-600` and `amber-500`, weighted by `--warmth`, so the top rule of the page literally warms as the reader descends. `--warmth` is written to `:root` by `components/warming.tsx` (eased `progress^0.72`, so the last third of the page carries most of the change) and is pinned to `1` with no listener attached under `prefers-reduced-motion`. Any new element that wants to respond to depth-in-the-walk should read `--warmth` rather than invent its own scroll listener.

## Shapes

Three radii and no more. **Pill** (`9999px`) for anything you press or a state you are in: buttons, nav links, chips, icon buttons, the step-progress buttons, the Scale's price dot, the ladder dots. **Field** (`0.75rem`) for things you type into or choose from: inputs, textareas, the date field, segmented options. **Panel** (`1rem`) for the two flat aside panels (`plaster-200`, `1.75rem` padding). The focus ring rounds at `2px`.

Everything else is square and ruled. Lists, tables, accordions and comparison rows have no radius at all — they are hairline-separated bands running the full width of the container. That contrast is the form language: soft where you act, straight where you read.

Borders are always 1px and always drawn from the ground's own ramp. The icon language matches: one 24px grid, 1.5 stroke, round caps and joins, `fill="none"`, `stroke="currentColor"` (`components/icons.tsx`). The two exceptions to stroke-only drawing are the `Mark` wordmark glyph, which uses filled paths at 0.28 opacity for the doorway's interior, and the broom, which uses flat fills for the handle and ferrule.

## Components

### Buttons
- **Shape:** fully pill (`9999px`), no border on the primary.
- **Primary:** amber fill (`amber-500`) with ink text (`ink-900`), `1rem 1.75rem`, medium weight, `1.125rem`. Always carries a trailing `ArrowRight` at `1.25rem`. Identical on both grounds — it is the one element that does not change with temperature.
- **Hover / Focus:** background to `amber-400` over 300ms; the arrow translates 1 (or 0.5 in compact contexts) via `group-hover`. Focus is the global ring: 2px `amber-500`, 3px offset.
- **Disabled (submit, pending):** `plaster-300` fill with `ink-500` text and a spinning `Clock` icon.
- **Ghost:** transparent with a 1px border from the ground ramp — `dusk-600` → hover `frost-500` on dusk, `plaster-300` → hover `ink-900` on plaster. Same pill and same padding as primary, so a pair sits on one baseline.
- **Compact (header, in-panel):** `0.625rem 1.25rem` at `0.9375rem`.

### Chips / Segmented options
- **Style:** field radius (`0.75rem`), 1px `plaster-300`, `ink-700` text, transparent fill. Extras chips are pills instead of field-radius.
- **Selected:** inverted — `ink-900` fill with `plaster-50` text, and a `Check` icon appears in the chip variant. Unselected hover moves the border to `ink-500`.
- The real radio/checkbox is `sr-only` inside the label; the visible chip is the control, so the label must stay the click target.

### Cards / Containers
- There are almost no cards. The system's default container is a **ruled band**: a top or bottom 1px hairline, `1.5rem` of padding above the content, no background, no radius.
- The one true panel: `plaster-200` fill, `1rem` radius, `1.75rem` padding, no border, no shadow. Used for the quote summary aside and the "Best for" / "Straight answers" asides.

### Inputs / Fields
- **Style:** `plaster-50` fill, 1px `plaster-300`, `0.75rem` radius, `0.875rem 1rem` padding, full width, `ink-900` text. Warm side only — the form never appears on dusk.
- **Hover:** border to `ink-500`. **Focus:** the global amber ring.
- **Labels** sit above in medium `ink-900`; hints below the label in `0.9375rem` `ink-500`; placeholders are `ink-500` at full opacity.
- **Error:** `pine-800` text under the field with `role="alert"`; step-level errors add a small `pine-600` dot. Errors are never red — the winter-yard green is the system's alarm colour.

### Navigation
- Sticky, transparent at the top of the page, taking `dusk-900/92` + `backdrop-blur-md` and its warming border past 12px of scroll (500ms colour transition).
- Links are `0.9375rem` `frost-400` pills; hover fills `dusk-800` and lifts text to `frost-100`; the active route (exact or prefix match) fills `dusk-700` with `frost-100` and carries `aria-current="page"`.
- The wordmark is the `Mark` glyph in `amber-500` (scaling 110% on hover) beside "Build Bright" in display semibold at `1.0625rem`.
- Below `lg`: a round bordered icon button toggles a full-width `dusk-900` sheet of display-serif links at `1.25rem`, each on a `dusk-800` hairline, with the amber quote button and the phone number pinned at its foot. Body scroll locks while open.
- The footer is the inverse: the same navigation content on `plaster-100`, in four link columns under uppercase labels, opening with a full-width quote CTA band.

### The Service Index (signature)
`components/service-index.tsx` — one ruled list that all seven services sit on, in one order, so they are comparable at a glance instead of sitting in seven disconnected cards. Each row is a link: the service name in display serif on the left, its dek in the muted label colour in the middle, an arrow on the right that translates 4px on hover. It has a `tone` prop (`dark` | `warm`) that swaps the entire ramp — rules, labels and hover colour — so the same component works on both sides of the threshold. It carries no prices and no durations, by product decision: the site names no figure anywhere, and the quote form is the only route to one. Any new service comparison belongs on this list, not in a new card grid.

### Rooms (signature)
`components/rooms.tsx` — a single-open accordion, warm side only, first row open on arrival so the pattern is legible before anyone touches it. Closed rows hold as quiet `ink-500` lines with an item count and a chevron; the open row resolves to `ink-900` and reveals a two-column task list with `pine-600` checkmarks. Full `aria-expanded`/`aria-controls` wiring; clicking the open row closes it.

### Quote form (signature)
`components/quote-form.tsx` — four steps (Service / Your home / When and where / You) with a pill step-rail whose current step inverts to `ink-900`; completed steps are re-clickable, future steps disabled. Every answer travels as a hidden input regardless of the step it was given on. Beside it sits the sticky summary panel with the named **state ladder** — Started / Ready to send / With us — drawn as three dots on a connecting line that fill `amber-500` as they complete, above a definition list of the answers so far. It shows no figure: there is no live estimate, because the site quotes no numbers. Validation is per-step and only speaks after a failed advance.

### Motion inventory

Three named devices, and no fourth. All are defined in `app/globals.css` and all are dropped entirely under `prefers-reduced-motion` (which also clamps every transition to `0.01ms`).

- **The Sweep** (`components/sweep.tsx`, `.broom-*`): the hero's authored moment, pure CSS with no JavaScript, so there is no hydration flash and `both` fill leaves every element in its finished state. Beat one — a broom crosses from the left over 1200ms on `--ease-threshold` while the headline, lede, buttons and footnote arrive behind it (`.arrive`, 720ms, staggered by a per-element `--d` of 230/370/500/620ms). Beat two — it settles into the open right half and keeps sweeping on a 5600ms arc, joined at 1250ms by a smaller, 75%-opacity broom on a 7400ms cycle so the two never fall into step. The bristles splay and settle on the same cycle; a soft amber `broom-trace` marks the ground it just passed over. Hidden below 768px. The mark itself is drawn flat and exact — a tapered handle, a ferrule, and 24 individual bristle strokes generated from one curve — never shaded, never in perspective.
- **The Aperture** (`components/aperture.tsx`, `@keyframes aperture-open`): arrival by widening light rather than a fade — 1100ms on `--ease-threshold`, from `clip-path: inset(0 42% 0 42%)` with a 10px blur to fully open. Content already on screen at mount opens without arming, so nothing flashes.
- **The Warming Scroll** (`components/warming.tsx`): the `--warmth` root property, described under Elevation & Depth.

Everything else is a state transition: 300ms on colour and transform for controls and links, 400–500ms for the chevron, the header material, and the ladder's dots and connectors. The house easing is `--ease-threshold` (`cubic-bezier(0.16, 1, 0.3, 1)`) for arrivals; state changes use the default ease.

## Do's and Don'ts

### Do:
- **Do** start a page outside on `dusk-800` and cross once into `plaster-100`/`plaster-50` at the point of action. One crossing, forwards.
- **Do** put `.warm-side` on every plaster section, so selection, caret and scrollbar flip with the ground.
- **Do** reserve `amber-500` for the action and the light. On plaster it may only sit behind `ink-900` text.
- **Do** separate with 1px hairlines from the ground's own ramp (`dusk-700`/`dusk-600`, `plaster-300`) or by stepping the ground one tone.
- **Do** set every comparable number in `.tnum` and every running paragraph in `.measure`.
- **Do** cap headlines in `ch` (14–20ch) and keep `.display-tight` on every Vollkorn headline.
- **Do** read `--warmth` when a new element should respond to depth-in-the-walk, rather than adding a second scroll listener.
- **Do** draw new icons on the existing 24px grid at 1.5 stroke with `currentColor`, round caps and joins.
- **Do** reach for `Container`, `PageHero`, `Prose`, `Stars`, `ServiceIndex`, `Rooms` and `Aperture` before writing a new layout primitive.
- **Do** gate every animation behind `prefers-reduced-motion` and leave the finished composition visible when it is off — the `Aperture` renders visible and only arms itself once JS confirms motion is wanted.

### Don't:
- **Don't** add a `box-shadow`. There are none, and the flat material is the world.
- **Don't** put amber text, an amber link, or an amber hover on the plaster ground — it fails contrast.
- **Don't** introduce a second accent hue. `pine-800`/`pine-600` are warm-side emphasis and the error colour, not a second brand colour, and they never appear on dusk.
- **Don't** use pure white or pure black for text. Dusk-side text is `frost-100`/`frost-200`/`frost-400`; warm-side text is `ink-900`/`ink-700`/`ink-500`.
- **Don't** turn a ruled list into a bordered card. Radius belongs to controls, fields and the two plaster panels; reading structure stays square and ruled.
- **Don't** apply `Aperture` as a blanket entrance on every section — it is for threshold moments only (the promise, the service index, the quote entry).
- **Don't** add photography, gradients with visible edges, sparkles, bubbles, or a teal/mint/sage tint. The media language is authored flat SVG.
- **Don't** add uppercase type outside the five column-head and panel-title contexts already using it.
- **Don't** use red for errors; the system's alarm colour is `pine-800`.
- **Don't** invent a new radius. Pill, `0.75rem`, `1rem`.
