/**
 * Tightens remote image URLs where the CDN supports it (e.g. Unsplash).
 * Does not re-encode images locally — Vite does not process arbitrary external URLs.
 */
export function optimizedImageUrl(src: string, targetWidth = 1200): string {
  try {
    const u = new URL(src);
    if (u.hostname !== "images.unsplash.com") {
      return src;
    }
    u.searchParams.set("w", String(Math.min(targetWidth, 1920)));
    if (!u.searchParams.has("q")) {
      u.searchParams.set("q", "82");
    }
    u.searchParams.set("auto", "format");
    return u.toString();
  } catch {
    return src;
  }
}
