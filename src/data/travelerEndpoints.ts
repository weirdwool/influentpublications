/**
 * Influent Traveler JSON endpoints for the publications hub.
 *
 * **Production:** `magazines.json` must include CORS — same as `latest-articles.json`, e.g. Apache:
 * `Header set Access-Control-Allow-Origin "*"` on that file (or directory). Without it the browser
 * blocks fetch and the hub falls back to a single issue from `latest-articles.json`.
 *
 * **Development:** Vite proxies `/traveler-api/*` → `https://influenttraveler.com/*` so local dev works
 * without traveller CORS changes.
 */
export const TRAVELER_MAGAZINES_JSON_URL =
  import.meta.env.DEV
    ? "/traveler-api/magazines.json"
    : "https://influenttraveler.com/magazines.json";

export const TRAVELER_LATEST_ARTICLES_JSON_URL =
  "https://influenttraveler.com/latest-articles.json";
