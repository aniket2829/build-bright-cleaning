"use client";

import { useMemo, useState } from "react";
import { ArrowLeft, ArrowRight } from "@/components/icons";

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

/** Local-date key. Never use toISOString here; it shifts the day in MT. */
const key = (d: Date) =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;

const parse = (value: string) => {
  const [y, m, d] = value.split("-").map(Number);
  if (!y || !m || !d) return null;
  const date = new Date(y, m - 1, d);
  return Number.isNaN(date.getTime()) ? null : date;
};

const startOfToday = () => {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  return d;
};

export function DatePicker({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) {
  const today = useMemo(startOfToday, []);
  const selected = parse(value);

  // The visible month follows the selection when there is one, otherwise today.
  const [cursor, setCursor] = useState(() => {
    const base = selected ?? today;
    return new Date(base.getFullYear(), base.getMonth(), 1);
  });

  const year = cursor.getFullYear();
  const month = cursor.getMonth();
  const firstWeekday = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  // A month is reachable only forward from the one containing today.
  const atFirstMonth =
    year === today.getFullYear() && month === today.getMonth();

  const shift = (by: number) => setCursor(new Date(year, month + by, 1));

  const cells: (number | null)[] = [
    ...Array.from({ length: firstWeekday }, () => null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];

  return (
    <div className="max-w-md rounded-2xl border border-plaster-300 bg-plaster-50 p-4 sm:p-5">
      <div className="flex items-center justify-between gap-3">
        <p className="font-display text-xl font-semibold text-ink-900">
          {MONTHS[month]} <span className="tnum text-ink-500">{year}</span>
        </p>
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => shift(-1)}
            disabled={atFirstMonth}
            aria-label="Previous month"
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-plaster-300 text-ink-900 transition-colors duration-300 hover:border-ink-900 disabled:cursor-not-allowed disabled:border-plaster-200 disabled:text-ink-500/40 disabled:hover:border-plaster-200"
          >
            <ArrowLeft className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => shift(1)}
            aria-label="Next month"
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-plaster-300 text-ink-900 transition-colors duration-300 hover:border-ink-900"
          >
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="mt-5 grid grid-cols-7 gap-1" aria-hidden>
        {DAYS.map((day) => (
          <span
            key={day}
            className="pb-1 text-center text-xs font-medium tracking-wide text-ink-500 uppercase"
          >
            {day.slice(0, 1)}
          </span>
        ))}
      </div>

      <div className="mt-1 grid grid-cols-7 gap-1">
        {cells.map((day, i) => {
          if (day === null) return <span key={`pad-${i}`} />;

          const date = new Date(year, month, day);
          const iso = key(date);
          const past = date < today;
          const isToday = iso === key(today);
          const on = iso === value;

          return (
            <button
              key={iso}
              type="button"
              disabled={past}
              onClick={() => onChange(on ? "" : iso)}
              aria-pressed={on}
              aria-label={`${day} ${MONTHS[month]} ${year}${past ? ", unavailable" : ""}`}
              className={`tnum relative flex aspect-square items-center justify-center rounded-lg text-[0.9375rem] transition-colors duration-200 ${
                on
                  ? "bg-ink-900 font-semibold text-plaster-50"
                  : past
                    ? "cursor-not-allowed text-ink-500/35"
                    : "text-ink-700 hover:bg-plaster-200 hover:text-ink-900"
              }`}
            >
              {day}
              {isToday && !on && (
                <span
                  aria-hidden
                  className="absolute bottom-1.5 h-1 w-1 rounded-full bg-amber-500"
                />
              )}
            </button>
          );
        })}
      </div>

      <p className="mt-4 border-t border-plaster-300 pt-3 text-[0.9375rem] text-ink-500">
        {selected ? (
          <>
            <span className="font-medium text-ink-900">
              {DAYS[selected.getDay()]}, {selected.getDate()} {MONTHS[selected.getMonth()]}{" "}
              <span className="tnum">{selected.getFullYear()}</span>
            </span>{" "}
            · tap again to clear
          </>
        ) : (
          "No date chosen yet. Optional, and we will confirm it with you either way."
        )}
      </p>
    </div>
  );
}
