import type { MetadataRoute } from "next";

/*
 * Installed/pinned appearance. The icons are the supplied set in /public;
 * `theme_color` is the dusk ground the site opens on, so the browser chrome
 * matches the first viewport rather than flashing white in front of it.
 */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Build Bright Cleaning",
    short_name: "Build Bright",
    description:
      "Residential cleaning in Edmonton, Alberta. One vetted cleaner who learns your home and keeps it.",
    start_url: "/",
    display: "standalone",
    background_color: "#0e1726",
    theme_color: "#0e1726",
    icons: [
      { src: "/favicon-32.png", sizes: "32x32", type: "image/png" },
      { src: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png", purpose: "any" },
    ],
  };
}
