/**
 * THE SWEEP — the hero's one authored moment.
 *
 * Two beats. First a broom crosses the hero from the left and the headline,
 * lede, buttons and footnote arrive in its wake (the `.arrive` class in
 * globals.css, staggered by --d). Then it comes to rest in the open right half
 * and keeps sweeping there, joined by a second, smaller broom on a slower
 * cycle so the two never fall into step.
 *
 * Drawn flat and exact: a tapered handle, a ferrule, and a fan of individual
 * bristle strokes generated from one curve. No shading, no perspective, no
 * picture — the bristles splay and settle as the arc turns, which is the one
 * piece of secondary motion that separates a drawn broom from a rotated
 * rectangle.
 *
 * Entirely CSS. No JavaScript, so there is no hydration flash and no no-JS
 * fallback to maintain: `both` fill leaves every element in its finished
 * state. Under prefers-reduced-motion every animation is dropped and the
 * brooms simply stand where the pass would have left them.
 */

const BRISTLES = 24;

function BroomMark({ className = "" }: { className?: string }) {
  // Bristles leave the ferrule as a dense, near-parallel block and flare only
  // slightly. Radiating them from a single point makes a hand fan, not a broom.
  const bristles = Array.from({ length: BRISTLES }, (_, i) => {
    const t = i / (BRISTLES - 1);
    const x0 = 52 + t * 16; // spread across the ferrule, not from a point
    const xe = 41 + t * 38; // mild flare
    const len = 201 + Math.sin(t * Math.PI) * 7; // almost flat sweeping edge
    return {
      d: `M${x0.toFixed(1)} 152 Q${(x0 + (xe - x0) * 0.45).toFixed(1)} 180 ${xe.toFixed(
        1,
      )} ${len.toFixed(1)}`,
      o: 0.5 + Math.sin(t * Math.PI) * 0.35,
    };
  });

  return (
    <svg viewBox="0 0 120 232" aria-hidden focusable="false" className={className}>
      {/* handle, tapering toward the hand */}
      <path d="M57.5 6 L62.5 6 L65 141 L55 141 Z" fill="#8ea3c2" />
      <rect x="51" y="139" width="18" height="14" rx="2.5" fill="#c3d3e8" />
      <g className="broom-bristles">
        {bristles.map((b) => (
          <path
            key={b.d}
            d={b.d}
            fill="none"
            stroke="#7c93b4"
            strokeWidth="2.2"
            strokeLinecap="round"
            opacity={b.o.toFixed(2)}
          />
        ))}
        {/* the stitched band every broom head is bound with */}
        <rect x="47" y="168" width="26" height="3.5" rx="1.75" fill="#c3d3e8" opacity="0.85" />
      </g>
    </svg>
  );
}

export function Sweep() {
  return (
    <div aria-hidden className="broom-stage">
      <div className="broom broom--lead">
        <div className="broom-arc">
          <BroomMark className="broom-mark" />
          <span className="broom-trace" />
        </div>
      </div>
      <div className="broom broom--second">
        <div className="broom-arc broom-arc--slow">
          <BroomMark className="broom-mark" />
          <span className="broom-trace" />
        </div>
      </div>
    </div>
  );
}
