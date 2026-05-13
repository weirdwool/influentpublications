import type { TravelerMagazine } from "../types/travelerLatest";

/** Same shapes as AutomatedTravelerSection / traveller JSON + optional flipbookUrl (preferred over link). */
function rawToMagazine(v: Record<string, unknown>): TravelerMagazine | null {
  const flipbookUrl =
    typeof v.flipbookUrl === "string" ? v.flipbookUrl.trim() : "";
  const linkRaw = typeof v.link === "string" ? v.link.trim() : "";
  /** Destination when user clicks a cover — flipbook wins when both exist */
  const link = flipbookUrl || linkRaw;

  if (typeof v.title !== "string" || !link) {
    return null;
  }
  const coverImage = typeof v.coverImage === "string" ? v.coverImage : undefined;
  const mainImage = typeof v.mainImage === "string" ? v.mainImage : undefined;
  const image = typeof v.image === "string" ? v.image : undefined;
  if (!coverImage && !mainImage && !image) {
    return null;
  }
  const issueRaw = v.issueNumber ?? v.issue ?? v.issue_number;
  const issueNumber =
    typeof issueRaw === "string"
      ? issueRaw
      : typeof issueRaw === "number"
        ? String(issueRaw)
        : undefined;
  return {
    title: v.title,
    link,
    ...(coverImage ? { coverImage } : {}),
    ...(mainImage ? { mainImage } : {}),
    ...(image ? { image } : {}),
    ...(issueNumber !== undefined ? { issueNumber } : {}),
    excerpt: typeof v.excerpt === "string" ? v.excerpt : undefined,
  };
}

export function travelerMagazineCoverUrl(m: TravelerMagazine): string {
  return m.coverImage ?? m.image ?? "";
}

function dedupeMagazines(collected: TravelerMagazine[]): TravelerMagazine[] {
  const seen = new Set<string>();
  return collected.filter((m) => {
    const key = `${m.link}|${travelerMagazineCoverUrl(m)}`;
    if (seen.has(key)) {
      return false;
    }
    seen.add(key);
    return true;
  });
}

const MAGAZINE_ARRAY_KEYS = [
  "magazines",
  "pastIssues",
  "issues",
  "archivedMagazines",
  "allMagazines",
  "items",
  "results",
] as const;

/**
 * Dedicated list from [`magazines.json`](https://influenttraveler.com/magazines.json):
 * root JSON array `[{ title, link, coverImage?, ... }]`, or an object with one of those array keys.
 */
export function magazinesFromMagazinesJsonPayload(json: unknown): TravelerMagazine[] {
  const collected: TravelerMagazine[] = [];

  if (Array.isArray(json)) {
    for (const row of json) {
      if (row && typeof row === "object") {
        const m = rawToMagazine(row as Record<string, unknown>);
        if (m) {
          collected.push(m);
        }
      }
    }
    return dedupeMagazines(collected);
  }

  if (!json || typeof json !== "object") {
    return [];
  }

  const o = json as Record<string, unknown>;

  for (const key of MAGAZINE_ARRAY_KEYS) {
    const arr = o[key];
    if (!Array.isArray(arr) || arr.length === 0) {
      continue;
    }
    for (const row of arr) {
      if (row && typeof row === "object") {
        const m = rawToMagazine(row as Record<string, unknown>);
        if (m) {
          collected.push(m);
        }
      }
    }
    if (collected.length > 0) {
      break;
    }
  }

  return dedupeMagazines(collected);
}

const LATEST_ARTICLES_ARRAY_KEYS = MAGAZINE_ARRAY_KEYS.filter(
  (k) => k !== "items" && k !== "results",
);

/**
 * Backup source: `latest-articles.json` — nested `magazines` / `latestMagazine`, never `posts` keys here.
 */
export function magazinesFromTravelerLatestJson(json: unknown): TravelerMagazine[] {
  if (!json || typeof json !== "object") {
    return [];
  }

  const o = json as Record<string, unknown>;
  const collected: TravelerMagazine[] = [];

  for (const key of LATEST_ARTICLES_ARRAY_KEYS) {
    const arr = o[key];
    if (!Array.isArray(arr) || arr.length === 0) {
      continue;
    }
    for (const row of arr) {
      if (row && typeof row === "object") {
        const m = rawToMagazine(row as Record<string, unknown>);
        if (m) {
          collected.push(m);
        }
      }
    }
    if (collected.length > 0) {
      return dedupeMagazines(collected);
    }
  }

  const lone =
    (o.latestMagazine ?? o.magazine ?? o.latestIssue ?? o.issue) ?? null;
  if (lone && typeof lone === "object") {
    const m = rawToMagazine(lone as Record<string, unknown>);
    if (m) {
      return [m];
    }
  }

  return [];
}
