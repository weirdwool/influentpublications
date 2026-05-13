/**
 * Canonical site URL for metadata, sitemap, and robots.txt.
 * Override per deploy: set VITE_SITE_ORIGIN in `.env` (e.g. https://www.yourdomain.com)
 * and align `public/sitemap.xml` + `public/robots.txt` if paths differ.
 */
export const SEO_SITE_ORIGIN: string =
  typeof import.meta !== "undefined" && import.meta.env?.VITE_SITE_ORIGIN
    ? String(import.meta.env.VITE_SITE_ORIGIN).replace(/\/$/, "")
    : "https://influentpublications.com";

export const SITE_NAME = "Influent Publications";

/** Default description when a page does not override */
export const SITE_DEFAULT_DESCRIPTION =
  "Influent Publications is a boutique luxury media house—home to Influent Traveler, a seasonal travel magazine, and a curated family of titles for readers who value depth, craft, and beautifully told stories.";

export function pageTitle(segment: string): string {
  const s = segment.trim();
  if (!s || s === SITE_NAME) return SITE_NAME;
  return `${s} | ${SITE_NAME}`;
}

export function absoluteUrl(path: string): string {
  const p = path.startsWith("/") ? path : `/${path}`;
  return `${SEO_SITE_ORIGIN}${p}`;
}
