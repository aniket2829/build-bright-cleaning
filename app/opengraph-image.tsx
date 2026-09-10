import { ImageResponse } from "next/og";
import { business } from "@/lib/content";

/**
 * The share card, for every page that does not override it.
 *
 * Generated rather than drawn so it cannot fall out of step with the business
 * name, and built from the site's own ground: dusk #0E1726, one amber rule at
 * the action colour, plaster type. Flat and unshaded, per the design contract
 * in the root layout.
 *
 * 1200×630 is the size Facebook, LinkedIn, Slack, iMessage and X all crop
 * from; anything smaller than 600×315 is dropped to a thumbnail.
 */
export const alt = `${business.name} — house cleaning in Edmonton`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#0E1726",
          padding: "72px 80px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div
            style={{
              width: 18,
              height: 18,
              backgroundColor: "#E8A33D",
              borderRadius: 999,
            }}
          />
          <div
            style={{
              fontSize: 30,
              color: "#C9D4E3",
              letterSpacing: 1.5,
              textTransform: "uppercase",
            }}
          >
            {business.name}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 82,
              lineHeight: 1.05,
              color: "#EFE7DA",
              fontWeight: 600,
              maxWidth: 900,
            }}
          >
            {business.tagline}
          </div>
          <div
            style={{
              marginTop: 34,
              width: 148,
              height: 5,
              backgroundColor: "#E8A33D",
            }}
          />
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            fontSize: 30,
            color: "#8FA2BA",
          }}
        >
          <div style={{ display: "flex" }}>
            House cleaning in {business.region} and the towns around it
          </div>
          <div style={{ display: "flex", color: "#C9D4E3" }}>
            {business.phoneDisplay}
          </div>
        </div>
      </div>
    ),
    size,
  );
}
