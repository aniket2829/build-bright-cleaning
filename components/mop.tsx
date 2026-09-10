/**
 * THE PASS — the hero's one authored moment.
 *
 * One string mop, actually working a floor that is actually dirty when you
 * arrive.
 *
 *   1. Dull, uneven marks rest along the floor line in the open right half.
 *   2. The mop enters from the left mid-pass and crosses, the headline, lede,
 *      buttons and footnote arriving in its wake (`.arrive`).
 *   3. Three unequal passes. Each wipes the marks it reaches — they smear a
 *      little in the direction of travel and lift out — and leaves a damp
 *      sheen behind that dries off over the next couple of seconds.
 *   4. Marks gone, last sheen dried, and from then on it works clean ground —
 *      which is the headline's claim, drawn.
 *
 * WHY A MOP IS EASIER TO MAKE HONEST THAN A BROOM. The broom this replaces
 * pivoted at the hand, so rotation threw the tips up an arc and every keyframe
 * needed a cosine term just to keep them on the floor. A string mop does not
 * have that problem: the head lies on the floor and the handle leans over it.
 * The swivel is the anchor — `.mop-handle` rotates about its own bottom edge,
 * which never moves — so floor contact is structural rather than compensated.
 * The head's own rotation is damped to about a twelfth of the handle's, which
 * is what the swivel does on a real mop.
 *
 * WHAT MAKES IT READ AS WORK RATHER THAN A LOOP:
 *   - Two joints. The rail carries the traverse in screen space, the handle
 *     carries the lean, and the head barely turns at all.
 *   - Strand lag. The strand group runs the same cycle 110ms behind the
 *     handle, so on every direction change the strands trail, catch up and
 *     overshoot. Nothing else fakes cloth.
 *   - Splay on load. Strands fan wide and flatten on the push, gather on the
 *     pull, and hang together in a bundle the moment they leave the floor.
 *   - Three unequal passes over one 11.4s cycle, each with its own reach and
 *     duration, advancing down the floor. The repeat is far harder to catch
 *     than one identical stroke on a loop.
 *   - A mop cleans on the return too, unlike a broom, so both directions of
 *     every pass wipe.
 *
 * The mark is drawn flat and exact: no shading, no perspective, no contact
 * shadow. What reads as material is that it deforms — 52 independent strands
 * in two depth layers that clump wet, lie down where they meet the floor, and
 * change shape across the pass. A
 * flat shape that only rotates reads as a sticker; a flat shape that bends
 * reads as a thing. Strand variation comes from a deterministic hash, so
 * server and client render the identical path list.
 *
 * Entirely CSS. No JavaScript at runtime, so there is no hydration flash and
 * no no-JS fallback to maintain: `both` fill leaves every element in its
 * finished state. Under prefers-reduced-motion the hero renders *finished* —
 * clean floor, no marks, no sheen, mop standing planted — because a frozen
 * frame of half-wiped floor reads as a defect, not as a still.
 */

/** Deterministic 0..1 from an integer. Same value on the server and the client. */
function noise(i: number) {
  const x = Math.sin(i * 127.1 + 311.7) * 43758.5453;
  return x - Math.floor(x);
}

const clamp01 = (n: number) => (n < 0 ? 0 : n > 1 ? 1 : n);

/* ---------------------------------------------------------------------------
   THE MARK
   --------------------------------------------------------------------------- */

const STRANDS = 52;
const CLUMPS = 8;
const BAND_Y = 26; // where the strands leave the band, in head viewBox units

/**
 * The silhouette is the whole argument. A broom's straw radiates from a narrow
 * ferrule, so it is a triangle standing on its point; a string mop's strands
 * leave a wide flat band, hang, then splay and *lie down* where they meet the
 * floor, so it is a squat bell with a ragged flat bottom. Three things enforce
 * that here and none of them is shading:
 *
 *   - Roots spread across the full width of the band, never converging.
 *   - A cubic whose first control point sits almost straight below the root
 *     and whose second is pulled out level with the tip, so every strand hangs
 *     before it flares and finishes horizontal, lying on the ground.
 *   - Two depth layers. The back half is dimmer and reaches shorter, drawn
 *     first, so the bundle has body rather than being a single sheet of lines.
 */
function MopHead({ className = "" }: { className?: string }) {
  const strands = Array.from({ length: STRANDS }, (_, i) => {
    const t = i / (STRANDS - 1);
    const jx = noise(i) - 0.5;
    const jy = noise(i + 97);
    const jz = noise(i + 211);
    const back = noise(i + 401) < 0.42;

    // Wet strands clump. Pulling each tip halfway to its clump's centre is
    // what separates a mop head from a fan of evenly spaced lines.
    const c = Math.min(CLUMPS - 1, Math.floor(t * CLUMPS));
    const centre = (c + 0.5) / CLUMPS;
    let u = t + (centre - t) * 0.5;
    if (back) u = 0.5 + (u - 0.5) * 0.86; // the back layer reaches shorter

    const x0 = 49 + t * 50 + jx * 1.8; // across the full width of the band
    const xe = 4 + u * 140 + jx * 4.5; // where it comes to rest on the floor
    // A ragged, roughly flat bottom: they all reach the same floor, and the
    // unevenness is wear, not a drawn curve.
    const tip = 80 + (0.5 - Math.abs(u - 0.5)) * 6 - jy * 9 - (back ? 4 : 0);

    // Hang first, flare late, finish level — the second control point is held
    // at the tip's own height so the last stretch of every strand is lying
    // down rather than pointing at the floor.
    const c1x = x0 + (xe - x0) * 0.06;
    const c1y = BAND_Y + (tip - BAND_Y) * 0.46;
    const c2x = xe - (xe - x0) * 0.3;
    const c2y = tip;

    return {
      key: `${i}`,
      back,
      d: `M${x0.toFixed(1)} ${BAND_Y} C${c1x.toFixed(1)} ${c1y.toFixed(1)} ${c2x.toFixed(1)} ${c2y.toFixed(1)} ${xe.toFixed(1)} ${tip.toFixed(1)}`,
      w: (1.9 + jz * 1.5 - (back ? 0.3 : 0)).toFixed(2),
      o: ((0.44 + Math.sin(u * Math.PI) * 0.3 + jx * 0.14) * (back ? 0.52 : 1)).toFixed(2),
    };
  });

  const ordered = [...strands.filter((s) => s.back), ...strands.filter((s) => !s.back)];

  return (
    <svg viewBox="0 0 148 92" aria-hidden focusable="false" className={className}>
      {/* The strands are their own group because they are the only part that
          deforms: the band and the swivel above them are rigid metal. */}
      <g className="mop-strands">
        {ordered.map((s) => (
          <path
            key={s.key}
            d={s.d}
            fill="none"
            stroke="var(--color-plaster-200)"
            strokeWidth={s.w}
            strokeLinecap="round"
            opacity={s.o}
          />
        ))}
      </g>

      {/* The wide flat band that clamps the bundle, and the two screws through
          it. Drawn over the roots, because it holds them. */}
      <path d="M47 12 L101 12 L99 28 L49 28 Z" fill="var(--color-frost-500)" />
      <path d="M48.2 20.4 L99.8 20.4 L99.5 23.2 L48.5 23.2 Z" fill="var(--color-frost-400)" />
      <g fill="var(--color-frost-400)">
        <circle cx="57" cy="16.6" r="1.7" />
        <circle cx="91" cy="16.6" r="1.7" />
      </g>

      {/* The swivel clevis the handle pins into. fill-rule punches the pin hole
          for real, so it reads as a hole on any ground. */}
      <path
        fillRule="evenodd"
        d="M66.4 0 L81.6 0 L81.6 13 L66.4 13 Z
           M74 6.4 a2.4 2.4 0 1 0 0.01 0 Z"
        fill="var(--color-frost-400)"
      />
    </svg>
  );
}

function MopHandle({ className = "" }: { className?: string }) {
  const knurl = [50, 60, 70];

  return (
    <svg viewBox="0 0 34 210" aria-hidden focusable="false" className={className}>
      {/* Ash shaft, tapering toward the hand, with the hole it hangs by. */}
      <path
        fillRule="evenodd"
        d="M13.2 4 L20.8 4 L22.4 190 L11.6 190 Z
           M17 12 a2.4 2.4 0 1 0 0.01 0 Z"
        fill="var(--color-plaster-300)"
      />
      {/* Moulded grip sleeve, and the knurling on it. */}
      <path d="M11.2 44 L22.8 44 L23 82 L11 82 Z" fill="var(--color-frost-500)" opacity="0.8" />
      <g stroke="var(--color-frost-400)" strokeWidth="0.9" strokeLinecap="round" opacity="0.55">
        {knurl.map((y) => (
          <path key={y} d={`M12.6 ${y} L21.4 ${y}`} />
        ))}
      </g>
      {/* Threaded collar down into the swivel. */}
      <path d="M11.4 186 L22.6 186 L23.6 206 L10.4 206 Z" fill="var(--color-frost-400)" />
      <path d="M10.9 195.4 L23.1 195.4 L23.2 198 L10.8 198 Z" fill="var(--color-frost-500)" />
    </svg>
  );
}

/* ---------------------------------------------------------------------------
   WHERE THE HEAD IS, AND WHEN.

   These mirror the pass keyframes in globals.css. They exist so the floor can
   be timed to the mop instead of guessed at: change a timing there and change
   the matching entry here, and every mark and every wet patch re-times with
   it. `p` is the percentage of the cycle, which is the literal keyframe
   selector in the stylesheet; `x` is the head in percent of the hero width;
   `ease` is the curve running from that point to the next.
   --------------------------------------------------------------------------- */

const ENTER_MS = 1200; // .mop--lead / mop-enter
const CYCLE_MS = 11400; // one full three-pass cycle
const CYCLE_START = 1200; // its delay: the moment the entrance hands over

const EASE_ENTER = [0.16, 1, 0.3, 1] as const; // --ease-threshold
const EASE_WIND = [0.3, 0, 0.5, 1] as const; // the small wind-back
const EASE_DRIVE = [0.36, 0, 0.2, 1] as const; // the push out: commit, then settle
const EASE_TURN = [0.42, 0, 0.28, 1] as const; // the pull back
const EASE_LIFT = [0.4, 0, 0.5, 1] as const;
const EASE_SET = [0.34, 0, 0.24, 1] as const;

// The entrance spans -14% to 0 of the hero on the rail, so the head crosses
// from 40% to 54%. It is still fading in over the first stretch of that — it
// only becomes visible around 48%, which is where the text column ends, and no
// mark is placed below 49.5%.
const ENTER_FROM_X = 40;
const HEAD_HOME = 54; // where the entrance sets it down

type Leg = {
  p: number;
  x: number;
  ease?: readonly number[];
  /** Carried back above the ground, so this leg cleans nothing. */
  lifted?: boolean;
};

const PATH: Leg[] = [
  { p: 0, x: 54, ease: EASE_WIND }, // planted
  { p: 3.684, x: 52, ease: EASE_DRIVE }, // wound back
  { p: 16.491, x: 72, ease: EASE_TURN }, // pass one, out
  { p: 26.491, x: 58, ease: EASE_DRIVE }, // pass one, back
  { p: 39.825, x: 78.5, ease: EASE_TURN }, // pass two, out
  { p: 50.175, x: 64, ease: EASE_DRIVE }, // pass two, back
  { p: 62.632, x: 82, ease: EASE_TURN }, // pass three, out
  { p: 72.807, x: 69, ease: EASE_LIFT, lifted: true }, // pass three, back
  { p: 89.474, x: 52, ease: EASE_SET }, // carried back over ground already done
  { p: 100, x: 54 }, // set down for the next cycle
];

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
const legInverse = new Map(PATH.filter((l) => l.ease).map((l) => [l.p, easingInverse(l.ease!)]));

/**
 * When the head first touches `x`, and which way it is travelling when it
 * does. The entrance is checked before the cycle because it is the earliest
 * thing on the floor, and legs are walked in order so the first pass to reach
 * a point is the one that owns it — which is why the wet trail extends
 * rightward across the whole cycle instead of blinking on every return.
 */
function contactAt(x: number): { t: number; dir: number } {
  if (x >= ENTER_FROM_X && x <= HEAD_HOME) {
    const u = (x - ENTER_FROM_X) / (HEAD_HOME - ENTER_FROM_X);
    return { t: ENTER_MS * timeOfEnter(clamp01(u)), dir: 1 };
  }
  for (let i = 0; i < PATH.length - 1; i++) {
    const a = PATH[i];
    const b = PATH[i + 1];
    if (a.lifted) continue;
    if (x < Math.min(a.x, b.x) || x > Math.max(a.x, b.x)) continue;
    const u = (x - a.x) / (b.x - a.x);
    const t = legInverse.get(a.p)!(clamp01(u));
    return {
      t: CYCLE_START + ((a.p + (b.p - a.p) * t) / 100) * CYCLE_MS,
      dir: b.x > a.x ? 1 : -1,
    };
  }
  return { t: CYCLE_START, dir: 1 };
}

/* ---------------------------------------------------------------------------
   THE FLOOR — what the passes are for.

   Marks lie along the floor line and lift when the head reaches them. Wet
   patches are the other half of the same event: the sheen the head leaves
   behind, which dries off a couple of seconds later. Both are placed in
   percent of the hero and offset from --floor in px, so tuning --floor moves
   the whole scene together.
   --------------------------------------------------------------------------- */

const MARK_COUNT = 15;

const MARKS = Array.from({ length: MARK_COUNT }, (_, i) => {
  // Stratified rather than randomly scattered: one mark per slice of the floor
  // the mop actually works, jittered inside its own slice. Pure random leaves
  // holes and clumps, and a floor with a bare third of it does not read as
  // dirty — it reads as a few specks. The open right half only, because left
  // of ~46% is the text column and a smudge behind the lede is noise.
  const x = 51.5 + ((i + 0.16 + noise(i * 3 + 11) * 0.68) / MARK_COUNT) * 30.5;
  const { t, dir } = contactAt(x);
  // `d` is depth: 0 at the back of the floor band, 1 at the front. Near marks
  // are bigger and a touch brighter, far ones smaller and dimmer, which is
  // what turns a scatter into a plane you are looking across.
  const d = noise(i + 43);
  const r = [
    62 + noise(i + 71) * 24,
    44 + noise(i + 89) * 30,
    56 + noise(i + 113) * 26,
    38 + noise(i + 149) * 32,
  ];

  return {
    key: `mark-${i}`,
    x,
    dy: -9 + d * 19,
    w: 27 + noise(i + 167) * 31 + d * 12,
    h: 5 + d * 3.8,
    o: 0.34 + d * 0.24,
    radius: `${r[0].toFixed(0)}% ${r[1].toFixed(0)}% ${r[2].toFixed(0)}% ${r[3].toFixed(0)}% / 100% 100% 0% 0%`,
    delay: t,
    // A wiped mark smears a few px the way the head was going, then lifts.
    smear: dir * (3 + noise(i + 191) * 4),
    // A mark is a soft stain with a little loose grit sitting in it, in the
    // same language as everything else on this floor. One smooth blob reads as
    // a spot of light rather than as dirt.
    specks: Array.from({ length: 5 }, (_, k) => {
      const s = noise(i * 7 + k + 251);
      return {
        left: `${(10 + s * 80).toFixed(0)}%`,
        top: `${(26 + noise(i * 7 + k + 283) * 60).toFixed(0)}%`,
        width: `${(1.6 + noise(i * 7 + k + 311) * 2).toFixed(2)}px`,
        opacity: 0.42 + noise(i * 7 + k + 349) * 0.34,
      };
    }),
  };
});

/**
 * The sheen the head leaves behind. Evenly spaced so the trail is continuous,
 * and each fires on the first pass that covers it — so the wet band grows
 * rightward across the cycle and dries behind itself.
 */
const WET = Array.from({ length: 18 }, (_, i) => {
  const x = 50 + (i / 17) * 32;
  const { t } = contactAt(x);
  return {
    key: `wet-${i}`,
    x,
    w: 3.4 + noise(i + 401) * 1.4,
    o: 0.3 + noise(i + 433) * 0.18,
    delay: t,
  };
});

export function Mop() {
  return (
    <div aria-hidden className="mop-stage">
      <div className="floor">
        {MARKS.map((m) => (
          <span
            key={m.key}
            className="floor-mark"
            style={
              {
                left: `${m.x.toFixed(2)}%`,
                top: `calc(var(--floor) + ${m.dy.toFixed(1)}px)`,
                width: `${m.w.toFixed(1)}px`,
                height: `${m.h.toFixed(1)}px`,
                borderRadius: m.radius,
                "--smear": `${m.smear.toFixed(1)}px`,
                animationDelay: `${Math.round(m.delay)}ms`,
              } as React.CSSProperties
            }
          >
            <i className="floor-stain" style={{ opacity: m.o }} />
            {m.specks.map((s) => (
              <i key={s.left + s.top} className="floor-speck" style={s} />
            ))}
          </span>
        ))}

        {WET.map((w) => (
          <span
            key={w.key}
            className="floor-wet"
            style={
              {
                left: `${w.x.toFixed(2)}%`,
                width: `${w.w.toFixed(2)}%`,
                "--wo": w.o.toFixed(2),
                animationDelay: `${Math.round(w.delay)}ms`,
              } as React.CSSProperties
            }
          />
        ))}
      </div>

      {/* A full-width rail, so the traverse can be written in percent of the
          hero rather than of the mop — the same trick the floor uses, and what
          lets the whole scene stay in CSS with nothing measured at runtime. */}
      <div className="mop mop--lead">
        <div className="mop-rail">
          <div className="mop-carry">
            <span className="mop-wet" />
            <MopHead className="mop-head" />
            <MopHandle className="mop-handle" />
          </div>
        </div>
      </div>
    </div>
  );
}
