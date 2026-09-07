import Image from "next/image";
import Link from "next/link";
import { business, cities, services } from "@/lib/content";
import { ArrowRight, Phone } from "@/components/icons";

export function SiteFooter() {
  return (
    <footer className="warm-side bg-plaster-100 text-ink-700">
      <div className="mx-auto max-w-[86rem] px-5 py-16 sm:px-8 sm:py-24">
        <div className="flex flex-col gap-10 border-b border-plaster-300 pb-14 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="font-display display-tight max-w-[16ch] text-4xl leading-[1.05] font-semibold text-ink-900 sm:text-5xl">
              Get a real number for your home.
            </h2>
            <p className="measure mt-4 text-lg leading-relaxed text-ink-700">
              A few questions, about three minutes. We come back with a price for the job, not an
              hourly rate that moves.
            </p>
          </div>
          <Link
            href="/quote"
            className="group inline-flex shrink-0 items-center gap-2.5 rounded-full bg-amber-500 px-7 py-4 text-lg font-medium text-ink-900 no-underline transition-colors duration-300 hover:bg-amber-400"
          >
            Get your quote
            <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-x-8 gap-y-12 pt-14 md:grid-cols-4 lg:grid-cols-5">
          <div className="col-span-2 lg:col-span-1">
            {/* The warm side is the one ground the supplied lockup was drawn
                for, so the footer carries it whole — badge, wordmark and
                tagline — rather than the header's cropped badge. */}
            <Image
              src="/logo.png"
              alt={business.name}
              width={406}
              height={100}
              className="h-auto w-[15rem] max-w-full"
            />
            <p className="mt-4 max-w-[30ch] text-[0.9375rem] leading-relaxed text-ink-500">
              Residential cleaning in Edmonton. One cleaner, the same one, every time.
            </p>
            <a
              href={`tel:${business.phoneHref}`}
              className="mt-5 inline-flex items-center gap-2 text-[0.9375rem] font-medium text-ink-900 decoration-plaster-300 underline-offset-4 hover:decoration-ink-900"
            >
              <Phone className="h-4 w-4" />
              <span className="tnum">{business.phoneDisplay}</span>
            </a>
            <p className="mt-1.5 text-sm text-ink-500">{business.hours}</p>
          </div>

          <FooterCol title="Services">
            {services.map((s) => (
              <FooterLink key={s.slug} href={`/services/${s.slug}`}>
                {s.name}
              </FooterLink>
            ))}
          </FooterCol>

          <FooterCol title="Where we clean">
            {cities.map((c) => (
              <FooterLink key={c.slug} href={`/areas/${c.slug}`}>
                {c.name}
              </FooterLink>
            ))}
            <FooterLink href="/areas">All areas</FooterLink>
          </FooterCol>

          <FooterCol title="Company">
            <FooterLink href="/about">About</FooterLink>
            <FooterLink href="/reviews">Reviews</FooterLink>
            <FooterLink href="/faq">Questions</FooterLink>
            <FooterLink href="/blog">Journal</FooterLink>
          </FooterCol>

          <FooterCol title="Start">
            <FooterLink href="/quote">Get a quote</FooterLink>
            <FooterLink href="/services/recurring">Book recurring</FooterLink>
            <FooterLink href="/services/move-in-out">Book a move clean</FooterLink>
          </FooterCol>
        </div>

        <div className="mt-16 flex flex-col gap-3 border-t border-plaster-300 pt-8 text-sm text-ink-500 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {business.name}. Edmonton, Alberta.
          </p>
          <p className="max-w-[52ch] sm:text-right">
            Demonstration site. Company details, reviews and contact information are written for
            this build and describe no real business.
          </p>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="text-sm font-semibold tracking-wide text-ink-900 uppercase">{title}</h3>
      <ul className="mt-4 flex flex-col gap-2.5">{children}</ul>
    </div>
  );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <li>
      <Link
        href={href}
        className="text-[0.9375rem] text-ink-700 decoration-plaster-300 underline-offset-4 transition-colors duration-300 hover:text-ink-900 hover:decoration-ink-900"
      >
        {children}
      </Link>
    </li>
  );
}
