import type { Metadata } from "next";
import { Container, PageHero } from "@/components/page-parts";
import { QuoteForm } from "@/components/quote-form";
import { business } from "@/lib/content";

export const metadata: Metadata = {
  title: "Get a quote",
  description:
    "Four questions, about two minutes, and a fixed price for your home in Calgary or Edmonton. No account, no call required.",
};

export default async function QuotePage(props: PageProps<"/quote">) {
  const search = await props.searchParams;
  const initialService = typeof search.service === "string" ? search.service : "";
  const initialCity = typeof search.city === "string" ? search.city : "";

  return (
    <>
      <PageHero
        title="Four questions. About two minutes."
        lede="Enough to price the job properly, and not one field more. A person reads it and comes back with one number: the number you pay."
        meta={
          <p className="tnum text-[0.9375rem] text-frost-400">
            Would rather talk? Call {business.phoneDisplay} · {business.hours}
          </p>
        }
      />

      <section className="warm-side bg-plaster-100 pt-16 pb-24 text-ink-700 sm:pt-20">
        <Container>
          <QuoteForm initialService={initialService} initialCity={initialCity} />
        </Container>
      </section>
    </>
  );
}
