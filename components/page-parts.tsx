import Link from "next/link";
import { Star } from "@/components/icons";

export function Container({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`mx-auto w-full max-w-[86rem] px-5 sm:px-8 ${className}`}>{children}</div>
  );
}

/** The dusk band every interior page opens in: outside, before the door. */
export function PageHero({
  eyebrowLink,
  title,
  lede,
  meta,
}: {
  eyebrowLink?: { href: string; label: string };
  title: string;
  lede?: string;
  meta?: React.ReactNode;
}) {
  return (
    <section className="relative overflow-hidden pt-14 pb-20 sm:pt-20 sm:pb-28">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 -top-40 h-96 opacity-70"
        style={{
          background:
            "radial-gradient(60% 100% at 68% 100%, color-mix(in oklab, var(--color-amber-500) 14%, transparent), transparent 70%)",
        }}
      />
      <Container className="relative">
        {eyebrowLink && (
          <Link
            href={eyebrowLink.href}
            className="inline-block text-[0.9375rem] text-frost-400 decoration-dusk-600 underline-offset-4 transition-colors duration-300 hover:text-amber-400 hover:decoration-amber-400"
          >
            ← {eyebrowLink.label}
          </Link>
        )}
        <h1
          className={`font-display display-tight max-w-[18ch] text-5xl leading-[1.02] font-semibold text-frost-100 sm:text-6xl lg:text-7xl ${
            eyebrowLink ? "mt-6" : ""
          }`}
        >
          {title}
        </h1>
        {lede && (
          <p className="measure mt-7 text-xl leading-relaxed text-frost-200 sm:text-2xl">{lede}</p>
        )}
        {meta && <div className="mt-9">{meta}</div>}
      </Container>
    </section>
  );
}

export function Stars({ n, className = "" }: { n: number; className?: string }) {
  return (
    <span className={`inline-flex items-center gap-0.5 ${className}`}>
      <span className="sr-only">{n} out of 5</span>
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          className={`h-3.5 w-3.5 ${i <= n ? "text-ink-900" : "text-plaster-300"}`}
        />
      ))}
    </span>
  );
}

/** Long-form reading, warm side. */
export function Prose({ children }: { children: React.ReactNode }) {
  return <div className="measure flex flex-col gap-6 text-lg leading-relaxed text-ink-700">{children}</div>;
}
