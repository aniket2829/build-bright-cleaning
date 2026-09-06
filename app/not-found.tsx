import Link from "next/link";
import { Container } from "@/components/page-parts";
import { ArrowRight } from "@/components/icons";

export default function NotFound() {
  return (
    <section className="relative">

      <Container className="relative">
        <div className="max-w-[34rem] py-24 sm:py-32">
          <p className="tnum text-frost-400">404</p>
          <h1 className="font-display display-tight mt-4 text-5xl leading-[1.02] font-semibold text-frost-100 sm:text-6xl">
            Wrong door.
          </h1>
          <p className="mt-7 text-xl leading-relaxed text-frost-200">
            This page is not here: moved, renamed, or never built. The light is still on next
            door.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-3">
            <Link
              href="/"
              className="group inline-flex items-center gap-2.5 rounded-full bg-amber-500 px-7 py-4 text-lg font-medium text-ink-900 no-underline transition-colors duration-300 hover:bg-amber-400"
            >
              Back to the front
              <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
            <Link
              href="/services"
              className="inline-flex items-center gap-2 rounded-full border border-dusk-600 px-7 py-4 text-lg text-frost-200 no-underline transition-colors duration-300 hover:border-frost-500 hover:text-frost-100"
            >
              See the services
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
