"use server";

import { business, cities, serviceBySlug } from "@/lib/content";

export type QuoteState = {
  status: "idle" | "error" | "sent";
  reference?: string;
  errors?: Record<string, string>;
  message?: string;
};

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE = /^[\d\s()+.-]{9,}$/;
const POSTAL = /^[A-Za-z]\d[A-Za-z][ -]?\d[A-Za-z]\d$/;

const SCHEDULES = ["one-time"];
const TIME_SLOTS = ["morning", "afternoon", "evening"];

/**
 * Stubbed submission. In production this hands off to whatever actually
 * receives the lead; today it validates the answers and returns a reference
 * so the whole flow, including its failure paths, is real.
 *
 * The destination for real submissions is `business.email`
 * (see REPLACE-BEFORE-LAUNCH.md § 6).
 */
export async function submitQuote(
  _prev: QuoteState,
  formData: FormData,
): Promise<QuoteState> {
  const get = (k: string) => String(formData.get(k) ?? "").trim();

  const service = get("service");
  const beds = Number(get("bedrooms") || 0);
  const baths = Number(get("bathrooms") || 0);
  const address1 = get("address1");
  const addressCity = get("addressCity");
  const postal = get("postal");
  const city = get("city");
  const schedule = get("schedule");
  const date = get("date");
  const timeSlot = get("timeSlot");
  const name = get("name");
  const email = get("email");
  const phone = get("phone");

  const errors: Record<string, string> = {};

  if (!serviceBySlug(service)) errors.service = "Choose the service you need.";
  if (!beds || beds < 1) errors.bedrooms = "Tell us how many bedrooms, so we can quote the job.";
  if (!baths || baths < 1) errors.bathrooms = "Tell us how many bathrooms.";
  if (address1.length < 3) errors.address1 = "Add the street address we should clean.";
  if (addressCity.length < 2) errors.addressCity = "Add the city or town.";
  if (!POSTAL.test(postal)) errors.postal = "Add a postal code, like T5K 2M6.";
  if (!cities.some((c) => c.slug === city))
    errors.city = `We currently clean in ${business.cities.join(" and ")} only.`;
  if (!SCHEDULES.includes(schedule)) errors.schedule = "Choose how often you would like us.";
  if (date && Number.isNaN(new Date(date).getTime())) errors.date = "That date did not read properly.";
  if (timeSlot && !TIME_SLOTS.includes(timeSlot))
    errors.timeSlot = "Pick morning, afternoon or evening.";
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
