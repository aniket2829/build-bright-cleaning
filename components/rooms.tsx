"use client";

import { useId, useState } from "react";
import { Check, Chevron } from "@/components/icons";

/**
 * FOCUS RESOLVES: the room you are looking at resolves into its full task
 * list in place, while the others hold as quiet lines. Single-open accordion,
 * fully keyboard operable, first room open on arrival so the pattern is
 * legible before anyone touches it.
 */
export function Rooms({ rooms }: { rooms: { room: string; tasks: string[] }[] }) {
  const [open, setOpen] = useState(0);
  const id = useId();

  return (
    <ul className="border-t border-plaster-300">
      {rooms.map((room, i) => {
        const isOpen = open === i;
        return (
          <li key={room.room} className="border-b border-plaster-300">
            <h3>
              <button
                type="button"
                onClick={() => setOpen(isOpen ? -1 : i)}
                aria-expanded={isOpen}
                aria-controls={`${id}-${i}`}
                className={`group flex w-full items-baseline gap-4 py-5 text-left transition-colors duration-300 ${
                  isOpen ? "text-ink-900" : "text-ink-500 hover:text-ink-900"
                }`}
              >
                <span className="font-display flex-1 text-2xl leading-tight font-semibold">
                  {room.room}
                </span>
                <span className="shrink-0 text-sm text-ink-500 tnum">
                  {room.tasks.length} items
                </span>
                <Chevron
                  className={`h-5 w-5 shrink-0 text-ink-500 transition-transform duration-400 ${
                    isOpen ? "rotate-180" : ""
                  }`}
                />
              </button>
            </h3>
            <div id={`${id}-${i}`} hidden={!isOpen}>
              <ul className="grid gap-x-10 gap-y-3 pb-7 sm:grid-cols-2">
                {room.tasks.map((task) => (
                  <li key={task} className="flex items-start gap-3 text-ink-700">
                    <Check className="mt-1 h-4 w-4 shrink-0 text-pine-600" />
                    <span className="leading-relaxed">{task}</span>
                  </li>
                ))}
              </ul>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
