import Link from "next/link";
import { services } from "@/lib/content";
import { ArrowRight } from "@/components/icons";

const GRID = "grid grid-cols-1 items-baseline gap-x-8 gap-y-2 sm:grid-cols-[16rem_1fr_auto]";

/**
 * THE INDEX: one ruled list the whole site measures against.
 *
 * Every service sits on the same rule, in the same order, so the six are
 * comparable at a glance instead of sitting in six disconnected cards.
 * It carries no prices and no durations; the quote returns those.
 */
export function ServiceIndex({ tone = "dark" }: { tone?: "dark" | "warm" }) {
  const dark = tone === "dark";
  const rule = dark ? "border-dusk-600" : "border-plaster-300";
  const label = dark ? "text-frost-400" : "text-ink-500";
  const strong = dark ? "text-frost-100" : "text-ink-900";

  return (
    <div>
      <div className={`flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 border-b pb-3 ${rule}`}>
        <h3 className={`text-sm font-semibold tracking-wide uppercase ${strong}`}>
          What we do
        </h3>
        <p className={`text-sm ${label}`}>Every one quoted for your home</p>
      </div>

      <ul className="flex flex-col pt-2">
        {services.map((service) => (
          <li key={service.slug}>
            <Link href={`/services/${service.slug}`} className={`group border-b py-6 no-underline ${GRID} ${rule}`}>
              <span
                className={`font-display text-xl leading-tight font-semibold ${strong} transition-colors duration-300 ${
                  dark ? "group-hover:text-amber-400" : "group-hover:text-pine-800"
                }`}
              >
                {service.name}
              </span>

              <span className={`leading-relaxed ${label}`}>{service.dek}</span>

              <ArrowRight
                className={`hidden h-4 w-4 shrink-0 self-center ${label} transition-transform duration-300 group-hover:translate-x-1 sm:block`}
              />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
