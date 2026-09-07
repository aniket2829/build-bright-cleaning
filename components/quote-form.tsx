"use client";

import Link from "next/link";
import { useActionState, useState } from "react";
import { submitQuote, type QuoteState } from "@/app/quote/actions";
import { cities, services } from "@/lib/content";
import { ArrowLeft, ArrowRight, Check, Clock } from "@/components/icons";

const STEPS = ["Service", "Your home", "When and where", "You"] as const;

const TIMINGS = [
  { value: "this-week", label: "This week" },
  { value: "next-two-weeks", label: "In the next two weeks" },
  { value: "this-month", label: "Sometime this month" },
  { value: "planning", label: "Just planning ahead" },
];

type Draft = {
  service: string;
  bedrooms: number;
  bathrooms: number;
  pets: string;
  extras: string[];
  city: string;
  timing: string;
  date: string;
  access: string;
  name: string;
  email: string;
  phone: string;
};

const EMPTY: Draft = {
  service: "",
  bedrooms: 0,
  bathrooms: 0,
  pets: "",
  extras: [],
  city: "",
  timing: "",
  date: "",
  access: "",
  name: "",
  email: "",
  phone: "",
};

export function QuoteForm({ initialService = "", initialCity = "" }) {
  const [draft, setDraft] = useState<Draft>({
    ...EMPTY,
    service: services.some((s) => s.slug === initialService) ? initialService : "",
    city: cities.some((c) => c.slug === initialCity) ? initialCity : "",
  });
  const [step, setStep] = useState(0);
  const [touched, setTouched] = useState<string[]>([]);
  const [state, formAction, pending] = useActionState<QuoteState, FormData>(submitQuote, {
    status: "idle",
  });

  const set = <K extends keyof Draft>(key: K, value: Draft[K]) =>
    setDraft((d) => ({ ...d, [key]: value }));

  const service = services.find((s) => s.slug === draft.service);
  const sent = state.status === "sent";

  const stepValid = (i: number) => {
    if (i === 0) return Boolean(draft.service);
    if (i === 1) return draft.bedrooms > 0 && draft.bathrooms > 0;
    if (i === 2) return Boolean(draft.city && draft.timing);
    return draft.name.trim().length > 1 && /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(draft.email);
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
  const ready = stepValid(0) && stepValid(1) && stepValid(2);

  const ladder: { label: string; done: boolean; active: boolean }[] = [
    { label: "Started", done: true, active: !ready && !sent },
    { label: "Ready to send", done: ready, active: ready && !sent },
    { label: "With us", done: sent, active: sent },
  ];

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
              <strong className="font-medium text-ink-900">{draft.email}</strong>{" "}
              {draft.city === "calgary" ? "the same working day" : "within one working day"} with a
              fixed price for the job.
            </p>

            <dl className="mt-10 border-t border-plaster-300">
              <Row term="Service" detail={service?.name ?? "Not given"} />
              <Row term="Home" detail={`${draft.bedrooms} bed · ${draft.bathrooms} bath`} />
              <Row
                term="Where"
                detail={cities.find((c) => c.slug === draft.city)?.name ?? "Not given"}
              />
              <Row
                term="Timing"
                detail={TIMINGS.find((t) => t.value === draft.timing)?.label ?? "Not given"}
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
              <input type="hidden" name="timing" value={draft.timing} />
              <input type="hidden" name="date" value={draft.date} />
              <input type="hidden" name="access" value={draft.access} />
              {step < 3 && (
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
                <div className="flex flex-col gap-10">
                  <Fieldset legend="Which city?">
                    <Segmented
                      name="city"
                      options={cities.map((c) => ({ value: c.slug, label: c.name }))}
                      value={draft.city}
                      onChange={(v) => set("city", v)}
                      wide
                    />
                  </Fieldset>

                  <Fieldset legend="When do you need it?">
                    <Segmented
                      name="timing"
                      options={TIMINGS}
                      value={draft.timing}
                      onChange={(v) => set("timing", v)}
                      stack
                    />
                  </Fieldset>

                  <Field
                    label="A preferred date, if you have one"
                    hint="Optional. Move cleans are booked at least a day before handover."
                    id="date"
                  >
                    <input
                      id="date"
                      type="date"
                      value={draft.date}
                      onChange={(e) => set("date", e.target.value)}
                      className="w-full rounded-xl border border-plaster-300 bg-plaster-50 px-4 py-3.5 text-ink-900 transition-colors duration-300 hover:border-ink-500"
                    />
                  </Field>

                  <Field
                    label="Anything we should know about getting in?"
                    hint="Optional. Lockbox codes, a gate, a dog who does not love the doorbell."
                    id="access"
                  >
                    <textarea
                      id="access"
                      rows={3}
                      value={draft.access}
                      onChange={(e) => set("access", e.target.value)}
                      className="w-full resize-y rounded-xl border border-plaster-300 bg-plaster-50 px-4 py-3.5 leading-relaxed text-ink-900 transition-colors duration-300 hover:border-ink-500"
                    />
                  </Field>
                </div>
              )}

              {step === 3 && (
                <div className="flex flex-col gap-8">
                  <Field label="Your name" id="name" error={state.errors?.name}>
                    <input
                      id="name"
                      name="name"
                      autoComplete="name"
                      value={draft.name}
                      onChange={(e) => set("name", e.target.value)}
                      className="w-full rounded-xl border border-plaster-300 bg-plaster-50 px-4 py-3.5 text-ink-900 transition-colors duration-300 hover:border-ink-500"
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
                      className="w-full rounded-xl border border-plaster-300 bg-plaster-50 px-4 py-3.5 text-ink-900 transition-colors duration-300 hover:border-ink-500"
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
                      className="w-full rounded-xl border border-plaster-300 bg-plaster-50 px-4 py-3.5 text-ink-900 transition-colors duration-300 hover:border-ink-500"
                    />
                  </Field>
                </div>
              )}

              {showStepError && (
                <p role="alert" className="mt-8 flex items-start gap-2.5 text-pine-800">
                  <span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-pine-600" />
                  {step === 0 && "Pick a service to carry on."}
                  {step === 1 && "We need bedrooms and bathrooms before we can quote anything."}
                  {step === 2 && "Choose a city and roughly when you need it."}
                  {step === 3 && "We need a name and an email that works."}
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
              term="Where"
              detail={cities.find((c) => c.slug === draft.city)?.name ?? "Not chosen yet"}
              quiet={!draft.city}
            />
            <Row
              term="When"
              detail={TIMINGS.find((t) => t.value === draft.timing)?.label ?? "Not chosen yet"}
              quiet={!draft.timing}
            />
          </dl>

          <div className="mt-6 border-t border-plaster-300 pt-6">
            {ready ? (
              <p className="text-[0.9375rem] leading-relaxed text-ink-500">
                That is everything we need. A person reads this and comes back with one number: a
                fixed price for the job, and the price you pay.
              </p>
            ) : (
              <p className="text-[0.9375rem] leading-relaxed text-ink-500">
                Tell us the service, the size of your home and roughly when. A person prices it by
                hand and comes back with one number.
              </p>
            )}
          </div>
        </div>
      </aside>
    </div>
  );
}

/* ------------------------------------------------------------------ parts */

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
      <dt className="text-[0.9375rem] text-ink-500">{term}</dt>
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
