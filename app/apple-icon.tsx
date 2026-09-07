import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

/*
 * The same doorway glyph as app/icon.svg, rendered to PNG because Apple touch
 * icons cannot be SVG. iOS applies its own corner mask, so this one is
 * full-bleed: a rounded rect drawn here would be rounded twice.
 *
 * Satori (behind ImageResponse) does not render inline SVG children, so the
 * glyph is handed over as an <img> data URI. Colours are literal for the same
 * reason as in app/icon.svg: there is no CSS context to inherit from.
 */
const AMBER = "#e8a33d";
const DUSK = "#0a111c";

const glyph = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
  <path d="M5 21V6.2a1 1 0 01.6-.92l6-2.6a1 1 0 011.4.92V21" fill="${AMBER}" fill-opacity="0.28"/>
  <path d="M5 21V6.2a1 1 0 01.6-.92l6-2.6a1 1 0 011.4.92V21" fill="none" stroke="${AMBER}" stroke-width="1.5" stroke-linejoin="round"/>
  <path d="M13 21l6-4.6V21z" fill="${AMBER}"/>
  <path d="M9.6 12.4v2.2" fill="none" stroke="${AMBER}" stroke-width="1.6" stroke-linecap="round"/>
</svg>`;

const glyphSrc = `data:image/svg+xml;base64,${Buffer.from(glyph).toString("base64")}`;

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: DUSK,
        }}
      >
        {/* iOS masks this to a squircle, so the glyph stays clear of the corners. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={glyphSrc} alt="" width={122} height={122} />
      </div>
    ),
    size,
  );
}
