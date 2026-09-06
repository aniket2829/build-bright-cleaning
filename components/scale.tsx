import Link from "next/link";
import { services } from "@/lib/content";
import { ArrowRight } from "@/components/icons";

const AXIS_MAX = 400;
const TICKS = [0, 100, 200, 300, 400];

const GRID = "grid grid-cols-1 items-center gap-x-6 gap-y-3 sm:grid-cols-[12.5rem_1fr_7.5rem]";

/**
 * THE SCALE: one ruled axis the whole site measures against.
 *
 * Every service is drawn on the same $0–$400 graticule, so the four are
 * comparable at a glance instead of sitting in four disconnected cards.
 * Figures are illustrative starting prices for a one-bedroom home.
 */
export function Scale({ tone = "dark" }: { tone?: "dark" | "warm" }) {
  const dark = tone === "dark";
  const rule = dark ? "border-dusk-600" : "border-plaster-300";
  const faint = dark ? "bg-dusk-600" : "bg-plaster-300";
  const label = dark ? "text-frost-400" : "text-ink-500";
  const strong = dark ? "text-frost-100" : "text-ink-900";
  const fill = dark ? "bg-frost-500" : "bg-ink-500";

  return (
    <div>
      <div className={`flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 border-b pb-3 ${rule}`}>
        <h3 className={`text-sm font-semibold tracking-wide uppercase ${strong}`}>
          Starting price
        </h3>
        <p className={`text-sm ${label}`}>One-bedroom home · illustrative</p>
      </div>

      <ul className="flex flex-col pt-2">
        {services.map((service) => {
          const pct = (service.from / AXIS_MAX) * 100;
          return (
            <li key={service.slug}>
              <Link href={`/services/${service.slug}`} className={`group border-b py-6 no-underline ${GRID} ${rule}`}>
                <div>
                  <span
                    className={`font-display text-xl leading-tight font-semibold ${strong} transition-colors duration-300 ${
                      dark ? "group-hover:text-amber-400" : "group-hover:text-pine-800"
                    }`}
                  >
                    {service.name}
                  </span>
                  <span className={`tnum mt-1 block text-sm ${label}`}>
                    {service.hours[0]}–{service.hours[1]} hours
                  </span>
                </div>

                <div className="relative h-6">
                  {TICKS.map((t) => (
                    <span
                      key={t}
                      aria-hidden
                      className={`absolute top-0 bottom-0 hidden w-px sm:block ${faint} opacity-45`}
                      style={{ left: `${(t / AXIS_MAX) * 100}%` }}
                    />
                  ))}
                  <span className={`absolute top-1/2 left-0 h-px w-full -translate-y-1/2 ${faint}`} />
                  <span
                    className={`absolute top-1/2 left-0 h-0.5 -translate-y-1/2 transition-colors duration-500 ${fill} group-hover:bg-amber-500`}
                    style={{ width: `${pct}%` }}
                  />
                  <span
                    className="absolute top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-amber-500 transition-transform duration-300 group-hover:scale-125"
                    style={{ left: `${pct}%` }}
                  />
                </div>

                <div className="flex items-center justify-start gap-2 sm:justify-end">
                  <span className={`tnum font-display text-2xl leading-none font-semibold ${strong}`}>
                    ${service.from}
                  </span>
                  <ArrowRight
                    className={`h-4 w-4 shrink-0 ${label} transition-transform duration-300 group-hover:translate-x-1`}
                  />
                </div>
              </Link>
            </li>
          );
        })}
      </ul>

      <div className={`${GRID} pt-3`} aria-hidden>
        <div className="hidden sm:block" />
        <div className="relative hidden h-4 sm:block">
          {TICKS.map((t) => (
            <span
              key={t}
              className={`tnum absolute top-0 text-xs ${label} ${
                t === 0 ? "left-0" : t === AXIS_MAX ? "right-0" : "-translate-x-1/2"
              }`}
              style={t === 0 || t === AXIS_MAX ? undefined : { left: `${(t / AXIS_MAX) * 100}%` }}
            >
              ${t}
            </span>
          ))}
        </div>
        <div className="hidden sm:block" />
      </div>
    </div>
  );
}
