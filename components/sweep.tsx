/**
 * THE SWEEP — the hero's one authored moment.
 *
 * One broom, actually sweeping a floor that is actually dirty when you arrive.
 *
 *   1. Dust rests scattered along an implied floor line in the open right half.
 *   2. The broom enters from the left mid-stroke and crosses, the headline,
 *      lede, buttons and footnote arriving in its wake (`.arrive`). Dust it
 *      passes is pushed along ahead of the head.
 *   3. It plants, then drives the head across the floor in a working stroke —
 *      lean into the push, lift, carry back over the ground already done. The
 *      dust it has been pushing gathers into a pile at the end of the stroke.
 *   4. The pile disperses; the next two strokes catch the last few stragglers.
 *      From then on it works clean ground — which is the headline's claim,
 *      drawn.
 *
 * The motion is a floor sweep, not a mark rocking in place: the head travels
 * roughly a quarter of the open half each stroke, because the body pivots at
 * the hand (`transform-origin: 50% 5%`) so rotation throws the head much
 * further than the hand moves. Every mote is timed to when the tips actually
 * reach its x, computed below from the very same easing curves the stylesheet
 * animates on — so dust never vanishes with the broom somewhere else.
 *
 * The broom is a corn broom: tapered ash handle with a hanging hole, a metal
 * ferrule, two wire bindings, a stitched band, and a head of individual straw
 * strands that flare wide and end on an uneven, worn edge. Flat vector fills
 * throughout — no gradient, no tonal shading, no contact shadow — so the
 * world's flat-and-exact material holds. Strand-by-strand variation is drawn
 * geometry, not lighting: it comes from a deterministic hash so server and
 * client render the identical path list.
 *
 * Entirely CSS. No JavaScript at runtime, so there is no hydration flash and
 * no no-JS fallback to maintain: `both` fill leaves every element in its
 * finished state. Under prefers-reduced-motion the hero renders *finished* —
 * clean floor, no dust at all, broom standing planted — because a frozen frame
 * of settled dust reads as a defect, not as a still.
 */

const STRANDS = 34;

/** Deterministic 0..1 from an integer. Same value on the server and the client. */
function noise(i: number) {
  const x = Math.sin(i * 127.1 + 311.7) * 43758.5453;
  return x - Math.floor(x);
}

const clamp01 = (n: number) => (n < 0 ? 0 : n > 1 ? 1 : n);

function BroomMark({ className = "" }: { className?: string }) {
  // A corn broom's head leaves the ferrule as a bound bundle and flares to
  // roughly two and a half times that width at the sweeping edge. Radiating
  // the strands from a single point makes a hand fan; keeping them near
  // parallel makes a paintbrush. The flare is what reads as a broom.
  const strands = Array.from({ length: STRANDS }, (_, i) => {
    const t = i / (STRANDS - 1);
    const jx = noise(i) - 0.5;
    const jy = noise(i + 97);

    const x0 = 51 + t * 18 + jx * 1.4; // across the bound bundle
    const xe = 33 + t * 54 + jx * 3.4; // the flared sweeping edge
    // Worn flat, not a perfect line: shallow convex cut plus per-strand wear.
    const tip = 223 - (t - 0.5) * (t - 0.5) * 30 - jy * 7;
    // Strands bend outward late, so the bundle stays tight under the binding.
    const cx = x0 + (xe - x0) * 0.38;

    return {
      d: `M${x0.toFixed(1)} 150 Q${cx.toFixed(1)} 186 ${xe.toFixed(1)} ${tip.toFixed(1)}`,
      w: (1.5 + jy * 1.2).toFixed(2),
      o: (0.46 + Math.sin(t * Math.PI) * 0.34 + jx * 0.14).toFixed(2),
    };
  });

  // The wire stitching every corn broom head is bound with, drawn as ticks
  // rather than a solid rule so it reads as thread crossing the strands.
  const stitches = Array.from({ length: 13 }, (_, i) => 40 + i * 3.35);

  return (
    <svg viewBox="0 0 120 232" aria-hidden focusable="false" className={className}>
      {/* Ash handle, tapering toward the hand, with the hole it hangs by.
          fill-rule punches the hole for real, so it works on any ground. */}
      <path
        fillRule="evenodd"
        d="M56.4 4 L63.6 4 L65.4 138 L54.6 138 Z
           M60 11.5 a2.5 2.5 0 1 0 0.01 0 Z"
        fill="var(--color-plaster-300)"
      />
      {/* Metal ferrule: the collar that clamps the head to the handle. */}
      <path d="M52.2 131 L67.8 131 L70 151 L50 151 Z" fill="var(--color-frost-500)" />
      <path d="M50.6 145 L69.4 145 L69.7 147.6 L50.3 147.6 Z" fill="var(--color-frost-400)" />

      <g className="broom-bristles">
        {strands.map((s) => (
          <path
            key={s.d}
            d={s.d}
            fill="none"
            stroke="var(--color-plaster-200)"
            strokeWidth={s.w}
            strokeLinecap="round"
            opacity={s.o}
          />
        ))}
        {/* Two wire bindings and the stitched band below them. */}
        <path d="M45.5 161 L74.5 161" stroke="var(--color-frost-500)" strokeWidth="2.1" strokeLinecap="round" />
        <path d="M42 174 L78 174" stroke="var(--color-frost-500)" strokeWidth="1.8" strokeLinecap="round" />
        <g stroke="var(--color-plaster-300)" strokeWidth="1.1" strokeLinecap="round" opacity="0.9">
          {stitches.map((x) => (
            <path key={x} d={`M${x.toFixed(1)} 189 L${(x + 1.7).toFixed(1)} 194`} />
          ))}
        </g>
      </g>
    </svg>
  );
}

/* ---------------------------------------------------------------------------
   WHERE THE HEAD IS, AND WHEN.

   These mirror the stroke keyframes in globals.css. They exist so the dust can
   be timed to the broom instead of guessed at: change a stroke timing there
   and the matching constant here, and every mote re-times with it.

   The x figures are the bristle tips in percent of the hero width, read off
   the composed transforms at the desktop broom size (the stage is hidden below
   768px, so there is only the one size to hold).
   --------------------------------------------------------------------------- */

const ENTER_MS = 1200; // .broom--lead / broom-enter
const STROKE_MS = 4200; // .broom-arc / broom-stroke, one full cycle
const STROKE_START = 1200; // its delay: the moment the entrance hands over
const DRIVE_END = 0.42; // the keyframe where the working stroke finishes

const EASE_ENTER = [0.16, 1, 0.3, 1] as const; // --ease-threshold
const EASE_DRIVE = [0.38, 0, 0.22, 1] as const; // the push: commit, then settle

const HEAD_ENTER_FROM = 48; // where the tips clear the text column on entry
const HEAD_PLANT = 62.5; // where the entrance sets them down
const HEAD_DRIVE_TO = 74; // the far end of every working stroke
const PILE_X = 75.5; // just past it, so no stroke ploughs through the pile

/**
 * Inverse of a CSS cubic-bezier easing: given a progress value, the fraction of
 * the duration that produces it. Bisection on the curve parameter — 40 steps is
 * far past the precision a millisecond delay can carry, and this runs once at
 * module load, never in the browser.
 */
function easingInverse([x1, y1, x2, y2]: readonly number[]) {
  const axis = (a: number, b: number) => (t: number) =>
    3 * (1 - t) * (1 - t) * t * a + 3 * (1 - t) * t * t * b + t * t * t;
  const X = axis(x1, x2);
  const Y = axis(y1, y2);
  return (progress: number) => {
    let lo = 0;
    let hi = 1;
    for (let i = 0; i < 40; i++) {
      const mid = (lo + hi) / 2;
      if (Y(mid) < progress) lo = mid;
      else hi = mid;
    }
    return X((lo + hi) / 2);
  };
}

const timeOfEnter = easingInverse(EASE_ENTER);
const timeOfDrive = easingInverse(EASE_DRIVE);

/** When the bristle tips first reach `x`, on the given working stroke. */
function headReaches(x: number, stroke = 0) {
  if (stroke === 0 && x <= HEAD_PLANT) {
    const u = (x - HEAD_ENTER_FROM) / (HEAD_PLANT - HEAD_ENTER_FROM);
    return ENTER_MS * timeOfEnter(clamp01(u));
  }
  const u = (x - HEAD_PLANT) / (HEAD_DRIVE_TO - HEAD_PLANT);
  return (
    STROKE_START + stroke * STROKE_MS + STROKE_MS * DRIVE_END * timeOfDrive(clamp01(u))
  );
}

/** The moment the first stroke finishes, which is when the pile is complete. */
const PILE_COMPLETE = headReaches(HEAD_DRIVE_TO, 0);

/* ---------------------------------------------------------------------------
   THE DUST
   --------------------------------------------------------------------------- */

function mote(i: number, x: number) {
  // `d` is depth: 0 at the back of the floor band, 1 at the front. Near motes
  // are larger and brighter, far ones smaller and dimmer, which is what turns
  // a scatter of dots into a plane you are looking across rather than specks
  // hanging in the dark. No shading is involved — it is size and count.
  const d = noise(i + 43);
  return {
    x,
    y: 52 + d * 12,
    s: 2.1 + d * 2.3 + noise(i + 71) * 0.7,
    o: 0.36 + d * 0.3 + noise(i + 131) * 0.16,
    dy: -3 - noise(i + 173) * 11, // swept dust rolls forward and lifts a little
  };
}

const FIELD = Array.from({ length: 26 }, (_, i) => {
  // The open right half only: left of ~46% is the text column, and dust
  // drifting behind the lede is noise, not a floor.
  const x = HEAD_ENTER_FROM + noise(i + 11) * (HEAD_DRIVE_TO - 1 - HEAD_ENTER_FROM);
  const delay = headReaches(x);
  return {
    ...mote(i, x),
    delay,
    // Each mote travels for exactly as long as the head still has to go, so it
    // is pushed along in front of the bristles and lands as the stroke ends
    // rather than sliding to the pile on its own schedule.
    dur: Math.max(380, PILE_COMPLETE - delay),
    // A little spread, so they scatter into the pile instead of stacking on
    // one pixel.
    jitter: (noise(i + 233) - 0.5) * 2.6,
  };
});

/** The few the pass misses, caught by the second and third working strokes. */
const STRAGGLERS = Array.from({ length: 5 }, (_, i) => {
  const x = HEAD_PLANT + 1 + noise(i + 307) * (HEAD_DRIVE_TO - 2 - HEAD_PLANT);
  const stroke = i < 3 ? 1 : 2;
  return {
    ...mote(i + 307, x),
    delay: headReaches(x, stroke),
    dur: 780,
    jitter: 0,
  };
});

/**
 * The pile is not one shape. A single smooth mound reads as a spot of light,
 * so it is a soft low mound with individual grit sitting on it, in the same
 * language as the motes that arrived to make it. Grit fills the mound's own
 * silhouette: nothing sits above the profile at that x.
 */
const PILE_GRIT = Array.from({ length: 16 }, (_, i) => {
  const u = noise(i + 601);
  const profile = Math.sin(u * Math.PI); // 0 at the edges, 1 at the crown
  return {
    left: `${(u * 100).toFixed(1)}%`,
    top: `${(100 - noise(i + 631) * profile * 88).toFixed(1)}%`,
    width: `${(1.5 + noise(i + 659) * 1.6).toFixed(2)}px`,
    opacity: 0.4 + noise(i + 691) * 0.45,
  };
});

type Mote = (typeof FIELD)[number];

/**
 * Each mote is a full-width, zero-height rail carrying one dot at `--x`, so a
 * translateX in percent resolves against the hero rather than against the 3px
 * dot — which is what lets every mote travel to one shared pile position with
 * nothing measured at runtime.
 */
function moteStyle(m: Mote, toPile: boolean) {
  const dx = toPile ? PILE_X + m.jitter - m.x : 3 + m.s;
  return {
    "--x": `${m.x.toFixed(2)}%`,
    "--y": `${m.y.toFixed(2)}%`,
    "--s": `${m.s.toFixed(2)}px`,
    "--o": m.o.toFixed(2),
    "--dx": `${dx.toFixed(2)}%`,
    "--dy": `${m.dy.toFixed(1)}px`,
    "--dur": `${Math.round(m.dur)}ms`,
    animationDelay: `${Math.round(m.delay)}ms`,
  } as React.CSSProperties;
}

export function Sweep() {
  return (
    <div aria-hidden className="broom-stage">
      <div className="dust-field">
        {FIELD.map((m) => (
          <span key={m.x} className="dust-mote" style={moteStyle(m, true)} />
        ))}
        {STRAGGLERS.map((m) => (
          <span key={`late-${m.x}`} className="dust-mote dust-mote--late" style={moteStyle(m, false)} />
        ))}
      </div>

      {/* what the strokes gather, and then disperse */}
      <div className="dust-pile">
        <span className="dust-pile-mound" />
        {PILE_GRIT.map((g) => (
          <span key={g.left + g.top} className="dust-grit" style={g} />
        ))}
      </div>

      <div className="broom broom--lead">
        <div className="broom-arc">
          <BroomMark className="broom-mark" />
          <span className="broom-trace" />
        </div>
      </div>
    </div>
  );
}
