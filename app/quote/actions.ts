"use server";

import { cities, serviceBySlug } from "@/lib/content";

export type QuoteState = {
  status: "idle" | "error" | "sent";
  reference?: string;
  errors?: Record<string, string>;
  message?: string;
};

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE = /^[\d\s()+.-]{9,}$/;

/**
 * Stubbed submission. In production this hands off to whatever actually
 * receives the lead; today it validates the answers and returns a reference
 * so the whole flow, including its failure paths, is real.
 */
export async function submitQuote(
  _prev: QuoteState,
  formData: FormData,
): Promise<QuoteState> {
  const get = (k: string) => String(formData.get(k) ?? "").trim();

  const service = get("service");
  const beds = Number(get("bedrooms") || 0);
  const baths = Number(get("bathrooms") || 0);
  const city = get("city");
  const timing = get("timing");
  const name = get("name");
  const email = get("email");
  const phone = get("phone");

  const errors: Record<string, string> = {};

  if (!serviceBySlug(service)) errors.service = "Choose the service you need.";
  if (!beds || beds < 1) errors.bedrooms = "Tell us how many bedrooms, so we can quote the job.";
  if (!baths || baths < 1) errors.bathrooms = "Tell us how many bathrooms.";
  if (!cities.some((c) => c.slug === city)) errors.city = "Choose Calgary or Edmonton.";
  if (!timing) errors.timing = "Tell us roughly when you need this.";
  if (name.length < 2) errors.name = "Add the name we should ask for at the door.";
  if (!EMAIL.test(email)) errors.email = "Add an email we can send the quote to.";
  if (phone && !PHONE.test(phone)) errors.phone = "That phone number is missing a few digits.";

  if (Object.keys(errors).length > 0) {
    return {
      status: "error",
      errors,
      message: "A couple of things are missing. They are marked below.",
    };
  }

  // Simulated handoff latency so the pending state is a real state, not a flash.
  await new Promise((resolve) => setTimeout(resolve, 700));

  const reference = `BB-${city.slice(0, 3).toUpperCase()}-${Math.floor(1000 + Math.random() * 9000)}`;

  return { status: "sent", reference };
}
