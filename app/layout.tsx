import type { Metadata } from "next";
import { Schibsted_Grotesk, Vollkorn } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Warming } from "@/components/warming";

const vollkorn = Vollkorn({
  variable: "--font-vollkorn",
  subsets: ["latin"],
  display: "swap",
});

const schibsted = Schibsted_Grotesk({
  variable: "--font-schibsted",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://buildbright.example"),
  title: {
    default: "Build Bright Cleaning · house cleaning in Edmonton",
    template: "%s · Build Bright Cleaning",
  },
  description:
    "Residential cleaning in Edmonton, Alberta. One vetted cleaner who learns your home and keeps it: recurring, deep, move-in/out, one-time and post-construction cleans, steam carpet cleaning and wall stain removal, quoted as a fixed price.",
  openGraph: {
    title: "Build Bright Cleaning",
    description:
      "One cleaner. The same one. Every time. House cleaning in Edmonton.",
    type: "website",
    locale: "en_CA",
  },
  /* The supplied icon set in /public, declared explicitly rather than through
     the app/icon file convention: the artwork is the brand's, not generated
     here, so there is one place it lives and one place it is referenced. */
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-16.png", type: "image/png", sizes: "16x16" },
      { url: "/favicon-32.png", type: "image/png", sizes: "32x32" },
      { url: "/icon-512.png", type: "image/png", sizes: "512x512" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },
};

const CONTRACT = `<!--
THESIS: The site is the walk from a cold street into a warm, handled house; it refuses the aqua-bubbles-and-sparkles cleaning page and its muted-sage opposite.
OWN-WORLD: Winter-dusk ground (#0E1726) warming to plaster (#EFE7DA); lamp amber (#E8A33D) is the action colour and nothing else wears it; Vollkorn display over Schibsted Grotesk; one ruled index every service is listed on; the only drawn mark on the site is the hero broom, flat and exact, never shaded or perspectived.
STORY: A homeowner comparing three cleaners at 9pm learns that one vetted person keeps their home, sees exactly what each service covers, and asks for a quote.
FIRST VIEWPORT: Flat dusk ground. A broom crosses once from the left and the headline, lede, amber quote action and ruled footnote arrive staggered in its wake; it then settles into the open right half and keeps sweeping, joined by a smaller broom on a slower cycle. The left column is narrow, the hero short, so the same-cleaner argument arrives near the fold.
FORM: Threshold, candidate 1 of the grounded list, taken by the user over assigned candidate 6 (House Signage). Seed key bb01alpha.
FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance
-->`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en-CA"
      className={`${vollkorn.variable} ${schibsted.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-dusk-800">
        <div hidden dangerouslySetInnerHTML={{ __html: CONTRACT }} />

        <Warming />

        {/* the light you are walking toward, following --warmth across the whole document */}
        <div
          aria-hidden
          className="pointer-events-none fixed inset-x-0 bottom-0 -z-10 h-[70vh]"
          style={{
            opacity: "calc(0.25 + var(--warmth) * 0.75)",
            background:
              "radial-gradient(120% 100% at 50% 118%, color-mix(in oklab, var(--color-amber-500) 26%, transparent) 0%, color-mix(in oklab, var(--color-amber-500) 8%, transparent) 42%, transparent 72%)",
          }}
        />

        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-100 focus:rounded-full focus:bg-amber-500 focus:px-5 focus:py-3 focus:font-medium focus:text-ink-900"
        >
          Skip to content
        </a>

        <SiteHeader />
        <main id="main" className="flex-1">
          {children}
        </main>
        <SiteFooter />
      </body>
    </html>
  );
}
