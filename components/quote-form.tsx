"use client";

import Link from "next/link";
import { useActionState, useState } from "react";
import { submitQuote, type QuoteState } from "@/app/quote/actions";
import { cities, services } from "@/lib/content";
import { DatePicker } from "@/components/date-picker";
import { ArrowLeft, ArrowRight, Check, Clock } from "@/components/icons";

const STEPS = ["Service", "Your home", "Address", "Schedule", "You"] as const;

export const SCHEDULES = [
  { value: "one-time", label: "One time", note: "A single visit, priced on its own." },
];

export const TIME_SLOTS = [
  { value: "morning", label: "Morning", note: "8am – 12pm" },
  { value: "afternoon", label: "Afternoon", note: "12pm – 4pm" },
  { value: "evening", label: "Evening", note: "4pm – 7pm" },
];

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const POSTAL_RE = /^[A-Za-z]\d[A-Za-z][ -]?\d[A-Za-z]\d$/;

type Draft = {
  service: string;
  bedrooms: number;
  bathrooms: number;
  pets: string;
  extras: string[];
  address1: string;
  address2: string;
  addressCity: string;
  region: string;
  postal: string;
  city: string;
  schedule: string;
  date: string;
  timeSlot: string;
  access: string;
  name: string;
  email: string;
  phone: string;
};

// Only one coverage city today, so the quote is stamped with it rather than asked.
const ONLY_CITY = cities[0];

const EMPTY: Draft = {
  service: "",
  bedrooms: 0,
  bathrooms: 0,
  pets: "",
  extras: [],
  address1: "",
  address2: "",
  addressCity: ONLY_CITY?.name ?? "",
  region: "Alberta",
  postal: "",
  city: ONLY_CITY?.slug ?? "",
  schedule: "",
  date: "",
  timeSlot: "",
  access: "",
  name: "",
  email: "",
  phone: "",
};

export function QuoteForm({ initialService = "", initialCity = "" }) {
  const [draft, setDraft] = useState<Draft>({
    ...EMPTY,
    service: services.some((s) => s.slug === initialService) ? initialService : "",
    city: cities.some((c) => c.slug === initialCity) ? initialCity : EMPTY.city,
  });
  const [step, setStep] = useState(0);
  const [touched, setTouched] = useState<string[]>([]);
  const [state, formAction, pending] = useActionState<QuoteState, FormData>(submitQuote, {
    status: "idle",
  });

  const set = <K extends keyof Draft>(key: K, value: Draft[K]) =>
    setDraft((d) => ({ ...d, [key]: value }));

  const service = services.find((s) => s.slug === draft.service);
  const schedule = SCHEDULES.find((s) => s.value === draft.schedule);
  const slot = TIME_SLOTS.find((t) => t.value === draft.timeSlot);
  const sent = state.status === "sent";

  const stepValid = (i: number) => {
    if (i === 0) return Boolean(draft.service);
    if (i === 1) return draft.bedrooms > 0 && draft.bathrooms > 0;
    if (i === 2)
      return (
        draft.address1.trim().length > 2 &&
        draft.addressCity.trim().length > 1 &&
        POSTAL_RE.test(draft.postal.trim())
      );
    if (i === 3) return Boolean(draft.schedule);
    return draft.name.trim().length > 1 && EMAIL_RE.test(draft.email);
  };

  const next = () => {
    if (!stepValid(step)) {
      setTouched((t) => [...new Set([...t, `step-${step}`])]);
      return;
    }
    setStep((s) => Math.min(STEPS.length - 1, s + 1));
  };

  const showStepError = touched.includes(`step-${step}`) && !stepValid(step);

  /* ---------------------------------------------------------------- ladder */
  const ready = stepValid(0) && stepValid(1) && stepValid(2) && stepValid(3);

  const ladder: { label: string; done: boolean; active: boolean }[] = [
    { label: "Started", done: true, active: !ready && !sent },
    { label: "Ready to send", done: ready, active: ready && !sent },
    { label: "With us", done: sent, active: sent },
  ];

  // The city and region are pre-filled, so an address only counts once the street is given.
  const addressLine = draft.address1.trim()
    ? [draft.address1.trim(), draft.addressCity.trim(), draft.postal.trim()]
        .filter(Boolean)
        .join(", ")
    : "";

  // The cadence has its own row, so this one carries only the appointment itself.
  const whenLine = [draft.date ? longDate(draft.date) : null, slot?.label]
    .filter(Boolean)
    .join(" · ");

  return (
    <div className="grid gap-12 lg:grid-cols-[1fr_23rem] lg:gap-16">
      {/* ------------------------------------------------------------- form */}
      <div>
        {sent ? (
          <div>
            <span className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-amber-500 text-ink-900">
              <Check className="h-7 w-7" />
            </span>
            <h2 className="font-display display-tight mt-7 text-4xl leading-[1.05] font-semibold text-ink-900 sm:text-5xl">
              That is with us, {draft.name.split(" ")[0]}.
            </h2>
            <p className="measure mt-5 text-lg leading-relaxed text-ink-700">
              Your reference is{" "}
              <strong className="tnum font-semibold text-ink-900">{state.reference}</strong>. A
              real person reads this, not an autoresponder, and comes back to{" "}
              <strong className="font-medium text-ink-900">{draft.email}</strong> within one
              working day with a fixed price for the job.
            </p>

            <dl className="mt-10 border-t border-plaster-300">
              <Row term="Service" detail={service?.name ?? "Not given"} />
              <Row term="Home" detail={`${draft.bedrooms} bed · ${draft.bathrooms} bath`} />
              <Row term="Address" detail={addressLine || "Not given"} />
              <Row term="Schedule" detail={schedule?.label ?? "Not given"} />
              <Row
                term="Appointment"
                detail={
                  draft.date
                    ? `${longDate(draft.date)}${slot ? ` · ${slot.label}` : ""}`
                    : slot
                      ? `${slot.label}, date to confirm`
                      : "We will suggest times"
                }
              />
            </dl>

            <p className="mt-10 text-ink-700">
              While you wait:{" "}
              <Link href="/faq" className="font-medium text-ink-900 decoration-plaster-300 underline-offset-4 hover:decoration-ink-900">
                what happens on the first visit
              </Link>
              .
            </p>
          </div>
        ) : (
          <>
            <ol className="flex flex-wrap items-center gap-x-2 gap-y-2 border-b border-plaster-300 pb-5">
              {STEPS.map((label, i) => {
                const done = i < step;
                const current = i === step;
                return (
                  <li key={label} className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => i <= step && setStep(i)}
                      disabled={i > step}
                      aria-current={current ? "step" : undefined}
                      className={`flex items-center gap-2 rounded-full px-3 py-1.5 text-[0.9375rem] transition-colors duration-300 ${
                        current
                          ? "bg-ink-900 text-plaster-50"
                          : done
                            ? "text-ink-900 hover:bg-plaster-200"
                            : "text-ink-500"
                      } disabled:cursor-default`}
                    >
                      <span className="tnum text-xs opacity-70">{i + 1}</span>
                      {label}
                    </button>
                    {i < STEPS.length - 1 && (
                      <span aria-hidden className="h-px w-4 bg-plaster-300" />
                    )}
                  </li>
                );
              })}
            </ol>

            <form action={formAction} className="pt-10">
              {/* every answer travels with the submit, whatever step it was given on */}
              <input type="hidden" name="service" value={draft.service} />
              <input type="hidden" name="bedrooms" value={draft.bedrooms || ""} />
              <input type="hidden" name="bathrooms" value={draft.bathrooms || ""} />
              <input type="hidden" name="pets" value={draft.pets} />
              <input type="hidden" name="extras" value={draft.extras.join(", ")} />
              <input type="hidden" name="city" value={draft.city} />
              <input type="hidden" name="schedule" value={draft.schedule} />
              <input type="hidden" name="date" value={draft.date} />
              <input type="hidden" name="timeSlot" value={draft.timeSlot} />
              {step !== 2 && (
                <>
                  <input type="hidden" name="address1" value={draft.address1} />
                  <input type="hidden" name="address2" value={draft.address2} />
                  <input type="hidden" name="addressCity" value={draft.addressCity} />
                  <input type="hidden" name="region" value={draft.region} />
                  <input type="hidden" name="postal" value={draft.postal} />
                </>
              )}
              {step !== 3 && <input type="hidden" name="access" value={draft.access} />}
              {step < 4 && (
                <>
                  <input type="hidden" name="name" value={draft.name} />
                  <input type="hidden" name="email" value={draft.email} />
                  <input type="hidden" name="phone" value={draft.phone} />
                </>
              )}

              {step === 0 && (
                <Fieldset
                  legend="What do you need done?"
                  hint="You can change this later; it only sets the starting point."
                >
                  <ul className="border-t border-plaster-300">
                    {services.map((s) => {
                      const on = draft.service === s.slug;
                      return (
                        <li key={s.slug} className="border-b border-plaster-300">
                          <label
                            className={`flex cursor-pointer items-baseline gap-4 py-5 transition-colors duration-300 ${
                              on ? "text-ink-900" : "text-ink-700 hover:text-ink-900"
                            }`}
                          >
                            <input
                              type="radio"
                              name="service-choice"
                              value={s.slug}
                              checked={on}
                              onChange={() => set("service", s.slug)}
                              className="sr-only"
                            />
                            <span
                              aria-hidden
                              className={`mt-1.5 h-4 w-4 shrink-0 rounded-full border transition-colors duration-300 ${
                                on ? "border-amber-500 bg-amber-500" : "border-plaster-300"
                              }`}
                            />
                            <span className="flex-1">
                              <span className="font-display block text-xl leading-tight font-semibold">
                                {s.name}
                              </span>
                              <span className="mt-1 block text-[0.9375rem] leading-relaxed text-ink-500">
                                {s.dek}
                              </span>
                            </span>
                          </label>
                        </li>
                      );
                    })}
                  </ul>
                </Fieldset>
              )}

              {step === 1 && (
                <div className="flex flex-col gap-10">
                  <Fieldset legend="How many bedrooms?" hint="Count rooms used as bedrooms, including a den if it has a door.">
                    <Segmented
                      name="bedrooms"
                      options={[1, 2, 3, 4, 5].map((n) => ({
                        value: String(n),
                        label: n === 5 ? "5+" : String(n),
                      }))}
                      value={String(draft.bedrooms || "")}
                      onChange={(v) => set("bedrooms", Number(v))}
                    />
                  </Fieldset>

                  <Fieldset legend="How many bathrooms?" hint="A powder room counts as one.">
                    <Segmented
                      name="bathrooms"
                      options={[1, 2, 3, 4].map((n) => ({
                        value: String(n),
                        label: n === 4 ? "4+" : String(n),
                      }))}
                      value={String(draft.bathrooms || "")}
                      onChange={(v) => set("bathrooms", Number(v))}
                    />
                  </Fieldset>

                  <Fieldset legend="Any pets at home?" hint="It does not change the price. It changes the plan.">
                    <Segmented
                      name="pets"
                      options={[
                        { value: "none", label: "No pets" },
                        { value: "dog", label: "Dog" },
                        { value: "cat", label: "Cat" },
                        { value: "both", label: "Both" },
                      ]}
                      value={draft.pets}
                      onChange={(v) => set("pets", v)}
                    />
                  </Fieldset>

                  {service && service.extras.length > 0 && (
                    <Fieldset legend="Anything to add?" hint="Optional. Included in the quote.">
                      <div className="flex flex-wrap gap-2">
                        {service.extras.map((extra) => {
                          const on = draft.extras.includes(extra);
                          return (
                            <label
                              key={extra}
                              className={`inline-flex cursor-pointer items-center gap-2 rounded-full border px-4 py-2.5 text-[0.9375rem] transition-colors duration-300 ${
                                on
                                  ? "border-ink-900 bg-ink-900 text-plaster-50"
                                  : "border-plaster-300 text-ink-700 hover:border-ink-500"
                              }`}
                            >
                              <input
                                type="checkbox"
                                checked={on}
                                onChange={() =>
                                  set(
                                    "extras",
                                    on
                                      ? draft.extras.filter((e) => e !== extra)
                                      : [...draft.extras, extra],
                                  )
                                }
                                className="sr-only"
                              />
                              {on && <Check className="h-3.5 w-3.5" />}
                              {extra}
                            </label>
                          );
                        })}
                      </div>
                    </Fieldset>
                  )}
                </div>
              )}

              {step === 2 && (
                <Fieldset
                  legend="Service address"
                  hint={`Where the clean happens. We work in ${ONLY_CITY?.name ?? "Edmonton"} and nowhere else, so the postcode is how we check we can cover you.`}
                >
                  <div className="flex flex-col gap-6">
                    <Field label="Address line 1" id="address1" error={state.errors?.address1}>
                      <input
                        id="address1"
                        name="address1"
                        autoComplete="address-line1"
                        placeholder="Street 1"
                        value={draft.address1}
                        onChange={(e) => set("address1", e.target.value)}
                        className={inputClass}
                      />
                    </Field>

                    <Field label="Address line 2" hint="Optional. Unit, buzzer, or building." id="address2">
                      <input
                        id="address2"
                        name="address2"
                        autoComplete="address-line2"
                        placeholder="Street 2"
                        value={draft.address2}
                        onChange={(e) => set("address2", e.target.value)}
                        className={inputClass}
                      />
                    </Field>

                    <div className="grid gap-6 sm:grid-cols-2">
                      <Field label="City / Town" id="addressCity" error={state.errors?.addressCity}>
                        <input
                          id="addressCity"
                          name="addressCity"
                          autoComplete="address-level2"
                          placeholder="City"
                          value={draft.addressCity}
                          onChange={(e) => set("addressCity", e.target.value)}
                          className={inputClass}
                        />
                      </Field>

                      <Field label="State / Region" id="region">
                        <input
                          id="region"
                          name="region"
                          autoComplete="address-level1"
                          placeholder="State"
                          value={draft.region}
                          onChange={(e) => set("region", e.target.value)}
                          className={inputClass}
                        />
                      </Field>
                    </div>

                    <Field
                      label="ZIP / Postal code"
                      hint="Alberta postcodes look like T5K 2M6."
                      id="postal"
                      error={state.errors?.postal}
                    >
                      <input
                        id="postal"
                        name="postal"
                        autoComplete="postal-code"
                        placeholder="ZIP / Postal code"
                        value={draft.postal}
                        onChange={(e) => set("postal", e.target.value.toUpperCase())}
                        className={`${inputClass} tnum sm:max-w-56`}
                      />
                    </Field>
                  </div>
                </Fieldset>
              )}

              {step === 3 && (
                <div className="flex flex-col gap-10">
                  <Fieldset
                    legend="Choose your cleaning schedule"
                    hint="Choose the date that suits you. We will confirm the nearest available appointment."
                  >
                    <div className="flex flex-col gap-2">
                      {SCHEDULES.map((option) => {
                        const on = draft.schedule === option.value;
                        return (
                          <label
                            key={option.value}
                            className={`flex cursor-pointer items-baseline gap-3.5 rounded-xl border px-5 py-3.5 transition-colors duration-300 ${
                              on
                                ? "border-ink-900 bg-ink-900 text-plaster-50"
                                : "border-plaster-300 text-ink-700 hover:border-ink-500"
                            }`}
                          >
                            <input
                              type="radio"
                              name="schedule-choice"
                              value={option.value}
                              checked={on}
                              onChange={() => set("schedule", option.value)}
                              className="sr-only"
                            />
                            <span
                              aria-hidden
                              className={`mt-1.5 h-3 w-3 shrink-0 rounded-full transition-colors duration-300 ${
                                on ? "bg-amber-500" : "border border-plaster-300"
                              }`}
                            />
                            <span className="flex-1">
                              <span className="block font-medium">{option.label}</span>
                              <span
                                className={`mt-0.5 block text-[0.9375rem] ${
                                  on ? "text-plaster-300" : "text-ink-500"
                                }`}
                              >
                                {option.note}
                              </span>
                            </span>
                          </label>
                        );
                      })}
                    </div>
                  </Fieldset>

                  <Fieldset
                    legend="Pick a date and time for the appointment"
                    hint="Optional, and not a confirmed booking. It tells us what you are aiming for; we come back with the nearest slot we can actually hold."
                  >
                    <div className="flex flex-col gap-6">
                      <DatePicker value={draft.date} onChange={(v) => set("date", v)} />

                      <div>
                        <p className="font-medium text-ink-900">Time of day</p>
                        <div className="mt-3 grid gap-2 sm:grid-cols-3">
                          {TIME_SLOTS.map((option) => {
                            const on = draft.timeSlot === option.value;
                            return (
                              <label
                                key={option.value}
                                className={`cursor-pointer rounded-xl border px-5 py-3.5 transition-colors duration-300 ${
                                  on
                                    ? "border-ink-900 bg-ink-900 text-plaster-50"
                                    : "border-plaster-300 text-ink-700 hover:border-ink-500"
                                }`}
                              >
                                <input
                                  type="radio"
                                  name="time-slot-choice"
                                  value={option.value}
                                  checked={on}
                                  onChange={() => set("timeSlot", on ? "" : option.value)}
                                  className="sr-only"
                                />
                                <span className="block font-medium">{option.label}</span>
                                <span
                                  className={`tnum mt-0.5 block text-[0.9375rem] ${
                                    on ? "text-plaster-300" : "text-ink-500"
                                  }`}
                                >
                                  {option.note}
                                </span>
                              </label>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </Fieldset>

                  <Field
                    label="Anything we should know about getting in?"
                    hint="Optional. Lockbox codes, a gate, a dog who does not love the doorbell."
                    id="access"
                  >
                    <textarea
                      id="access"
                      name="access"
                      rows={3}
                      value={draft.access}
                      onChange={(e) => set("access", e.target.value)}
                      className={`${inputClass} resize-y leading-relaxed`}
                    />
                  </Field>
                </div>
              )}

              {step === 4 && (
                <div className="flex flex-col gap-8">
                  <Field label="Your name" id="name" error={state.errors?.name}>
                    <input
                      id="name"
                      name="name"
                      autoComplete="name"
                      value={draft.name}
                      onChange={(e) => set("name", e.target.value)}
                      className={inputClass}
                    />
                  </Field>
                  <Field
                    label="Email"
                    hint="Where the quote goes."
                    id="email"
                    error={state.errors?.email}
                  >
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      value={draft.email}
                      onChange={(e) => set("email", e.target.value)}
                      className={inputClass}
                    />
                  </Field>
                  <Field
                    label="Phone"
                    hint="Optional, and only used if the email bounces."
                    id="phone"
                    error={state.errors?.phone}
                  >
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      autoComplete="tel"
                      value={draft.phone}
                      onChange={(e) => set("phone", e.target.value)}
                      className={inputClass}
                    />
                  </Field>
                </div>
              )}

              {showStepError && (
                <p role="alert" className="mt-8 flex items-start gap-2.5 text-pine-800">
                  <span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-pine-600" />
                  {step === 0 && "Pick a service to carry on."}
                  {step === 1 && "We need bedrooms and bathrooms before we can quote anything."}
                  {step === 2 &&
                    "We need the street, the city and a postcode we can recognise before we can quote."}
                  {step === 3 && "Choose how often you would like us."}
                  {step === 4 && "We need a name and an email that works."}
                </p>
              )}

              {state.status === "error" && state.message && (
                <p role="alert" className="mt-8 text-pine-800">
                  {state.message}
                </p>
              )}

              <div className="mt-12 flex items-center gap-3 border-t border-plaster-300 pt-8">
                {step > 0 && (
                  <button
                    type="button"
                    onClick={() => setStep((s) => s - 1)}
                    className="inline-flex items-center gap-2 rounded-full border border-plaster-300 px-5 py-3.5 font-medium text-ink-900 transition-colors duration-300 hover:border-ink-900"
                  >
                    <ArrowLeft className="h-4 w-4" />
                    Back
                  </button>
                )}

                {step < STEPS.length - 1 ? (
                  <button
                    type="button"
                    onClick={next}
                    className="group inline-flex items-center gap-2.5 rounded-full bg-amber-500 px-7 py-3.5 font-medium text-ink-900 transition-colors duration-300 hover:bg-amber-400"
                  >
                    Continue
                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={pending}
                    className="group inline-flex items-center gap-2.5 rounded-full bg-amber-500 px-7 py-3.5 font-medium text-ink-900 transition-colors duration-300 hover:bg-amber-400 disabled:cursor-wait disabled:bg-plaster-300 disabled:text-ink-500"
                  >
                    {pending ? (
                      <>
                        <Clock className="h-4 w-4 animate-spin" />
                        Sending it over
                      </>
                    ) : (
                      <>
                        Send my quote request
                        <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                      </>
                    )}
                  </button>
                )}
              </div>
            </form>
          </>
        )}
      </div>

      {/* ---------------------------------------------------------- summary */}
      <aside className="lg:sticky lg:top-28 lg:self-start">
        <div className="rounded-2xl bg-plaster-200 p-7">
          <h2 className="text-sm font-semibold tracking-wide text-ink-900 uppercase">
            Your request
          </h2>

          <ol className="mt-6 flex flex-col gap-0">
            {ladder.map((rung, i) => (
              <li key={rung.label} className="flex items-center gap-3">
                <span className="flex flex-col items-center self-stretch">
                  <span
                    className={`h-3 w-3 shrink-0 rounded-full transition-colors duration-500 ${
                      rung.done ? "bg-amber-500" : "bg-plaster-300"
                    }`}
                  />
                  {i < ladder.length - 1 && (
                    <span
                      className={`w-px flex-1 transition-colors duration-500 ${
                        ladder[i + 1].done ? "bg-amber-500" : "bg-plaster-300"
                      }`}
                    />
                  )}
                </span>
                <span
                  className={`py-1.5 text-[0.9375rem] ${
                    rung.done ? "font-medium text-ink-900" : "text-ink-500"
                  }`}
                >
                  {rung.label}
                  {rung.label === "Ready to send" && !ready && (
                    <span className="text-ink-500">, once we have your details</span>
                  )}
                </span>
              </li>
            ))}
          </ol>

          <dl className="mt-7 border-t border-plaster-300 pt-2">
            <Row term="Service" detail={service?.name ?? "Not chosen yet"} quiet={!service} />
            <Row
              term="Home"
              detail={
                draft.bedrooms && draft.bathrooms
                  ? `${draft.bedrooms} bed · ${draft.bathrooms} bath`
                  : "Not chosen yet"
              }
              quiet={!draft.bedrooms}
            />
            <Row
              term="Address"
              detail={addressLine || "Not given yet"}
              quiet={!draft.address1.trim()}
            />
            <Row
              term="Schedule"
              detail={schedule?.label ?? "Not chosen yet"}
              quiet={!schedule}
            />
            <Row term="When" detail={whenLine || "Not chosen yet"} quiet={!whenLine} />
          </dl>

          <div className="mt-6 border-t border-plaster-300 pt-6">
            {ready ? (
              <p className="text-[0.9375rem] leading-relaxed text-ink-500">
                That is everything we need. A person reads this and comes back with one number: a
                fixed price for the job, and the price you pay.
              </p>
            ) : (
              <p className="text-[0.9375rem] leading-relaxed text-ink-500">
                Tell us the service, the size of your home, where it is and how often. A person
                prices it by hand and comes back with one number.
              </p>
            )}
          </div>
        </div>
      </aside>
    </div>
  );
}

/* ------------------------------------------------------------------ parts */

const inputClass =
  "w-full rounded-xl border border-plaster-300 bg-plaster-50 px-4 py-3.5 text-ink-900 transition-colors duration-300 placeholder:text-ink-500/50 hover:border-ink-500";

/** "3 September 2026", built from the local Y-M-D key rather than a parsed UTC instant. */
function longDate(value: string) {
  const [y, m, d] = value.split("-").map(Number);
  if (!y || !m || !d) return value;
  return new Date(y, m - 1, d).toLocaleDateString("en-CA", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function Row({
  term,
  detail,
  note,
  quiet,
}: {
  term: string;
  detail: string;
  note?: string;
  quiet?: boolean;
}) {
  return (
    <div className="flex items-baseline justify-between gap-6 border-b border-plaster-300 py-3.5 last:border-b-0">
      <dt className="shrink-0 text-[0.9375rem] text-ink-500">{term}</dt>
      <dd className={`text-right text-[0.9375rem] ${quiet ? "text-ink-500" : "font-medium text-ink-900"}`}>
        {detail}
        {note && <span className="mt-1 block text-sm font-normal text-ink-500">{note}</span>}
      </dd>
    </div>
  );
}

function Fieldset({
  legend,
  hint,
  children,
}: {
  legend: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <fieldset>
      <legend className="font-display display-tight text-3xl leading-tight font-semibold text-ink-900">
        {legend}
      </legend>
      {hint && <p className="measure mt-2 text-ink-500">{hint}</p>}
      <div className="mt-6">{children}</div>
    </fieldset>
  );
}

function Field({
  label,
  hint,
  id,
  error,
  children,
}: {
  label: string;
  hint?: string;
  id: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="block font-medium text-ink-900">
        {label}
      </label>
      {hint && <p className="mt-1 text-[0.9375rem] text-ink-500">{hint}</p>}
      <div className="mt-3">{children}</div>
      {error && (
        <p role="alert" className="mt-2 text-[0.9375rem] text-pine-800">
          {error}
        </p>
      )}
    </div>
  );
}

function Segmented({
  name,
  options,
  value,
  onChange,
  wide,
  stack,
}: {
  name: string;
  options: { value: string; label: string }[];
  value: string;
  onChange: (v: string) => void;
  wide?: boolean;
  stack?: boolean;
}) {
  return (
    <div className={stack ? "flex flex-col gap-2" : "flex flex-wrap gap-2"}>
      {options.map((o) => {
        const on = value === o.value;
        return (
          <label
            key={o.value}
            className={`cursor-pointer rounded-xl border text-center transition-colors duration-300 ${
              stack ? "px-5 py-3.5 text-left" : wide ? "px-8 py-3.5" : "min-w-16 px-5 py-3.5"
            } ${
              on
                ? "border-ink-900 bg-ink-900 text-plaster-50"
                : "border-plaster-300 text-ink-700 hover:border-ink-500"
            }`}
          >
            <input
              type="radio"
              name={`${name}-choice`}
              value={o.value}
              checked={on}
              onChange={() => onChange(o.value)}
              className="sr-only"
            />
            <span className={name === "bedrooms" || name === "bathrooms" ? "tnum" : ""}>
              {o.label}
            </span>
          </label>
        );
      })}
    </div>
  );
}
