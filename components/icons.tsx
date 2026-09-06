/** Authored icon set. One 24px grid, 1.5 stroke, round caps and joins. */

type IconProps = { className?: string };

const base = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
  focusable: false,
};

export function ArrowRight({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M4 12h15" />
      <path d="M13 6l6 6-6 6" />
    </svg>
  );
}

export function ArrowLeft({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M20 12H5" />
      <path d="M11 18l-6-6 6-6" />
    </svg>
  );
}

export function Check({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M4.5 12.5l5 5L19.5 7" />
    </svg>
  );
}

export function Phone({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M6.2 3.5h3l1.4 4-2 1.4a12.5 12.5 0 006.5 6.5l1.4-2 4 1.4v3a2 2 0 01-2.2 2A16.8 16.8 0 014.2 5.7a2 2 0 012-2.2z" />
    </svg>
  );
}

export function Calendar({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <rect x="3.5" y="5.5" width="17" height="15" rx="2" />
      <path d="M3.5 10h17M8 3.5v4M16 3.5v4" />
    </svg>
  );
}

export function HomeIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M4 10.5L12 4l8 6.5" />
      <path d="M6 9.8V20h12V9.8" />
      <path d="M10 20v-5h4v5" />
    </svg>
  );
}

export function Chevron({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M6 9.5l6 6 6-6" />
    </svg>
  );
}

export function Star({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden focusable="false" className={className}>
      <path d="M12 3.5l2.6 5.6 6.1.8-4.5 4.2 1.2 6-5.4-3-5.4 3 1.2-6L3.3 9.9l6.1-.8z" />
    </svg>
  );
}

export function Clock({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7.5V12l3 2" />
    </svg>
  );
}

export function Key({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <circle cx="8" cy="12" r="4" />
      <path d="M12 12h8M17.5 12v3M20 12v2.5" />
    </svg>
  );
}

export function Mark({ className }: IconProps) {
  /* The wordmark glyph: a doorway with light crossing the threshold. */
  return (
    <svg viewBox="0 0 24 24" aria-hidden focusable="false" className={className}>
      <path d="M5 21V6.2a1 1 0 01.6-.92l6-2.6a1 1 0 011.4.92V21" fill="currentColor" opacity="0.28" />
      <path
        d="M5 21V6.2a1 1 0 01.6-.92l6-2.6a1 1 0 011.4.92V21"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path d="M13 21l6-4.6V21z" fill="currentColor" />
      <path d="M9.6 12.4v2.2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}
