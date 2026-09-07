"use server";

import { headers } from "next/headers";
import { business, cities, serviceBySlug } from "@/lib/content";
import { MailNotConfiguredError, sendQuoteEnquiry } from "@/lib/mailer";
import { checkRateLimit, clientKey } from "@/lib/rate-limit";

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

const reference = (city: string) =>
  `BB-${city.slice(0, 3).toUpperCase()}-${Math.floor(1000 + Math.random() * 9000)}`;

/**
 * Validates the answers, then emails the enquiry to the business over Gmail
 * SMTP (`lib/mailer.ts`). The customer goes in Reply-To, so answering from the
 * inbox writes straight back to them.
 *
 * The destination is QUOTE_INBOX, falling back to `business.email`.
 *
 * This is a public POST endpoint that sends mail, so it is guarded before it
 * sends: a honeypot field no human can see, and a per-IP hourly cap. Neither
 * is a substitute for a real captcha if the form starts drawing bots.
 */
export async function submitQuote(
  _prev: QuoteState,
  formData: FormData,
): Promise<QuoteState> {
  const get = (k: string) => String(formData.get(k) ?? "").trim();

  // Honeypot: the field is hidden from people and off the tab order, so
  // anything in it came from something filling every input on the page.
  // Answer exactly as a success would, so a bot learns nothing from the reply.
  if (get("company")) {
    return { status: "sent", reference: reference(get("city") || "edm") };
  }

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

  const limit = checkRateLimit(clientKey(await headers()));
  if (!limit.ok) {
    return {
      status: "error",
      message: `That is a few requests in a short time. Try again in ${limit.retryAfterMinutes} minutes, or call us on ${business.phoneDisplay}.`,
    };
  }

  const ref = reference(city);

  try {
    await sendQuoteEnquiry({
      reference: ref,
      service: serviceBySlug(service)?.name ?? service,
      bedrooms: String(beds),
      bathrooms: String(baths),
      pets: get("pets"),
      extras: get("extras"),
      address: [address1, get("address2"), addressCity, get("region"), postal]
        .filter(Boolean)
        .join(", "),
      city: cities.find((c) => c.slug === city)?.name ?? city,
      schedule,
      date,
      timeSlot,
      access: get("access"),
      name,
      email,
      phone,
    });
  } catch (error) {
    // The enquiry is lost either way, so say so rather than showing a
    // confirmation for an email that never left. The detail stays in the
    // server log; the visitor gets the phone number, which still works.
    console.error("[quote] could not send enquiry", error);
    const message =
      error instanceof MailNotConfiguredError
        ? `We could not send that just now. Please call us on ${business.phoneDisplay} and we will take the details.`
        : `Something went wrong sending that. Please try again, or call us on ${business.phoneDisplay}.`;
    return { status: "error", message };
  }

  return { status: "sent", reference: ref };
}
