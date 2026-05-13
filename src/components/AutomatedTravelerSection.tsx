// @ts-nocheck — parked component, not imported; kept for future use
/**
 * Automated Influent Traveler home block: fetches latest-articles.json, magazine hero, post slider.
 * Swapped out of Home for the static spotlight layout; keep this file to restore the live feed later.
 */
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import type { TravelerFeedPost, TravelerMagazine } from "../types/travelerLatest";

const ENDPOINT = "https://influenttraveler.com/latest-articles.json";
const SITE_URL = "https://influenttraveler.com";
/** Matches API: latest posts count (slider) */
const MAX_POSTS = 6;

const FALLBACK_BG =
  "url('https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1600&q=80')";

const TRAVELER_EDITORIAL_INTRO =
  "Influent Traveler is our journal of place—destinations told with patience, photography, and depth. Each edition is edited as a collectible object: quiet luxury, sharp reporting, and the small details that turn a trip into a story.";

const TRAVELER_SEASONAL_LINE =
  "A quarterly cadence. We publish with the seasons—Spring, Summer, Autumn, Winter—ensuring our narrative remains as current as the changing landscape.";

function rawToMagazine(v: Record<string, unknown>): TravelerMagazine | null {
  if (typeof v.title !== "string" || typeof v.link !== "string") {
    return null;
  }
  const coverImage = typeof v.coverImage === "string" ? v.coverImage : undefined;
  const mainImage = typeof v.mainImage === "string" ? v.mainImage : undefined;
  const image = typeof v.image === "string" ? v.image : undefined;
  if (!coverImage && !mainImage && !image) {
    return null;
  }
  const issueRaw = v.issueNumber ?? v.issue ?? v.issue_number;
  return {
    title: v.title,
    link: v.link,
    ...(coverImage ? { coverImage } : {}),
    ...(mainImage ? { mainImage } : {}),
    ...(image ? { image } : {}),
    issueNumber: typeof issueRaw === "string" ? issueRaw : undefined,
    excerpt: typeof v.excerpt === "string" ? v.excerpt : undefined,
  };
}

/** Issue hero uses cover art only (+ legacy single `image`). Never the issue `mainImage`. */
function magazineHeroImage(m: TravelerMagazine): string {
  return m.coverImage ?? m.image ?? "";
}

/** Title for display when API sends "Issue 26 - Winter Magic" → "Winter Magic" */
function magazineDisplayTitle(m: TravelerMagazine): string {
  const raw = m.title.trim();
  const withoutPrefix = raw.replace(/^\s*issue\s*[\d.]+\s*[-–—:]\s*/i, "").trim();
  if (withoutPrefix && withoutPrefix !== raw) {
    return withoutPrefix;
  }
  return raw;
}

function rawToPost(v: Record<string, unknown>): TravelerFeedPost | null {
  if (
    typeof v.title !== "string" ||
    typeof v.link !== "string" ||
    typeof v.image !== "string"
  ) {
    return null;
  }
  return {
    title: v.title,
    link: v.link,
    image: v.image,
    excerpt: typeof v.excerpt === "string" ? v.excerpt : undefined,
    date: typeof v.date === "string" ? v.date : undefined,
    publishedAt: typeof v.publishedAt === "string" ? v.publishedAt : undefined,
  };
}

/** Supports { latestMagazine, latestPosts }, legacy keys, or a flat array (first = issue, rest = posts). */
function parseTravelerJson(json: unknown): {
  magazine: TravelerMagazine | null;
  posts: TravelerFeedPost[];
} {
  if (Array.isArray(json)) {
    if (json.length === 0) return { magazine: null, posts: [] };
    const first = json[0];
    if (!first || typeof first !== "object") return { magazine: null, posts: [] };
    const magazine = rawToMagazine(first as Record<string, unknown>);
    if (!magazine) return { magazine: null, posts: [] };
    const posts = json
      .slice(1)
      .map((r) =>
        r && typeof r === "object" ? rawToPost(r as Record<string, unknown>) : null
      )
      .filter(Boolean) as TravelerFeedPost[];
    return { magazine, posts: posts.slice(0, MAX_POSTS) };
  }

  if (!json || typeof json !== "object") {
    return { magazine: null, posts: [] };
  }

  const o = json as Record<string, unknown>;

  const magRaw = o.latestMagazine ?? o.magazine ?? o.latestIssue ?? o.issue;
  let magazine: TravelerMagazine | null = null;
  if (magRaw && typeof magRaw === "object") {
    magazine = rawToMagazine(magRaw as Record<string, unknown>);
  }

  const listKeys = ["latestPosts", "posts", "articles", "items", "data"] as const;
  let rawList: unknown[] = [];
  for (const key of listKeys) {
    const arr = o[key];
    if (Array.isArray(arr)) {
      rawList = arr;
      break;
    }
  }

  const posts = rawList
    .map((r) =>
      r && typeof r === "object" ? rawToPost(r as Record<string, unknown>) : null
    )
    .filter(Boolean) as TravelerFeedPost[];

  if (magazine) {
    return { magazine, posts: posts.slice(0, MAX_POSTS) };
  }

  if (rawList.length > 0) {
    const firstRow = rawList[0];
    if (firstRow && typeof firstRow === "object") {
      const m = rawToMagazine(firstRow as Record<string, unknown>);
      if (m) {
        const rest = rawList
          .slice(1)
          .map((r) =>
            r && typeof r === "object" ? rawToPost(r as Record<string, unknown>) : null
          )
          .filter(Boolean) as TravelerFeedPost[];
        return { magazine: m, posts: rest.slice(0, MAX_POSTS) };
      }
    }
  }

  return { magazine: null, posts: posts.slice(0, MAX_POSTS) };
}

function formatPostDate(item: TravelerFeedPost): string | null {
  const raw = item.date ?? item.publishedAt;
  if (!raw) return null;
  const d = new Date(raw);
  if (Number.isNaN(d.getTime())) return raw;
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

/** Uniform card for horizontal slider — fixed image aspect so all tiles match. */
function TravelerPostCard({ post }: { post: TravelerFeedPost }): React.ReactElement {
  const dateStr = formatPostDate(post);

  return (
    <a
      href={post.link}
      target="_blank"
      rel="noopener noreferrer"
      className="flex shrink-0 flex-col w-[min(280px,78vw)] bg-white border border-stone-100"
    >
      <div className="relative w-full overflow-hidden aspect-[4/3] bg-stone-100">
        <img
          src={post.image}
          alt={post.title}
          loading="lazy"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover"
        />
      </div>
      <div className="p-5 flex flex-col gap-2 flex-1 min-h-[7rem]">
        <h3 className="font-serif text-base font-medium leading-snug tracking-tight text-stone-900 line-clamp-3">
          {post.title}
        </h3>
        {post.excerpt ? (
          <p className="text-xs text-stone-500 leading-relaxed line-clamp-2">{post.excerpt}</p>
        ) : null}
        {dateStr ? <div className="mt-auto text-xs text-stone-500">{dateStr}</div> : null}
      </div>
    </a>
  );
}

interface AutomatedTravelerSectionProps {
  siteLabel?: string;
  siteUrl?: string;
}

function TravelerPostsStrip({ posts }: { posts: TravelerFeedPost[] }): React.ReactElement {
  const stripRef = useRef<HTMLDivElement>(null);
  const [scrollMetrics, setScrollMetrics] = useState({
    scrollLeft: 0,
    scrollWidth: 0,
    clientWidth: 0,
  });

  const syncScrollMetrics = (): void => {
    const el = stripRef.current;
    if (!el) return;
    setScrollMetrics({
      scrollLeft: el.scrollLeft,
      scrollWidth: el.scrollWidth,
      clientWidth: el.clientWidth,
    });
  };

  useLayoutEffect(() => {
    syncScrollMetrics();
    const el = stripRef.current;
    if (!el) return;
    el.addEventListener("scroll", syncScrollMetrics, { passive: true });
    const ro = new ResizeObserver(syncScrollMetrics);
    ro.observe(el);
    return () => {
      el.removeEventListener("scroll", syncScrollMetrics);
      ro.disconnect();
    };
  }, [posts.length]);

  const { scrollLeft, scrollWidth, clientWidth } = scrollMetrics;
  const canScroll = scrollWidth > clientWidth + 1;
  const maxScroll = Math.max(1, scrollWidth - clientWidth);
  const thumbW = canScroll ? (clientWidth / scrollWidth) * 100 : 100;
  const thumbLeft = canScroll ? (scrollLeft / maxScroll) * (100 - thumbW) : 0;

  function onTrackPointerDown(e: React.MouseEvent<HTMLDivElement>): void {
    const el = stripRef.current;
    if (!el || !canScroll) return;
    const track = e.currentTarget;
    const rect = track.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const ratio = Math.min(1, Math.max(0, x / rect.width));
    el.scrollTo({ left: ratio * maxScroll, behavior: "smooth" });
  }

  return (
    <div className="-mx-2 px-2 md:-mx-0 md:px-0">
      <div
        ref={stripRef}
        className="traveler-strip-scroll flex gap-4 md:gap-5 scroll-smooth px-4 md:px-3 lg:px-0"
      >
        {posts.map((post) => (
          <TravelerPostCard key={post.link} post={post} />
        ))}
      </div>
      {canScroll ? (
        <div
          role="presentation"
          aria-hidden
          className="mx-auto mt-10 h-[2px] w-full max-w-lg cursor-pointer rounded-full bg-stone-300/30"
          onMouseDown={onTrackPointerDown}
        >
          <div
            className="pointer-events-none h-full rounded-full bg-stone-500/50"
            style={{
              width: `${thumbW}%`,
              marginLeft: `${thumbLeft}%`,
            }}
          />
        </div>
      ) : null}
    </div>
  );
}

function TravelerVisitFallback({
  siteUrl,
  siteLabel,
}: {
  siteUrl: string;
  siteLabel: string;
}): React.ReactElement {
  return (
    <div
      className="relative overflow-hidden border border-stone-100 min-h-[280px]"
      style={{
        backgroundImage: FALLBACK_BG,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-stone-900/80" />
      <div className="relative px-8 py-16 md:py-20 md:px-14 text-center max-w-2xl mx-auto flex flex-col items-center justify-center min-h-[280px]">
        <p className="font-sans text-[0.65rem] font-bold uppercase tracking-[0.35em] text-stone-300 mb-4">
          Influent Publications
        </p>
        <h3 className="font-logo text-3xl md:text-4xl font-medium text-white tracking-tight mb-4">
          {siteLabel}
        </h3>
        <p className="text-stone-300 text-sm leading-relaxed mb-8 font-light max-w-md">
          We could not load the latest stories. Explore refined travel and long-form storytelling on
          our dedicated site.
        </p>
        <a
          href={siteUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block px-10 py-4 font-sans text-xs font-bold uppercase tracking-[0.2em] bg-white text-stone-900 border border-white hover:bg-transparent hover:text-white transition-colors"
        >
          Visit Influent Traveler
        </a>
      </div>
    </div>
  );
}

export default function AutomatedTravelerSection({
  siteLabel = "Influent Traveler",
  siteUrl = SITE_URL,
}: AutomatedTravelerSectionProps): React.ReactElement {
  const [loading, setLoading] = useState(true);
  const [latestMagazine, setLatestMagazine] = useState<TravelerMagazine | null>(null);
  const [latestPosts, setLatestPosts] = useState<TravelerFeedPost[]>([]);
  const [showFallback, setShowFallback] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setLoading(true);
      setShowFallback(false);
      try {
        const res = await fetch(ENDPOINT);
        if (!res.ok) throw new Error(String(res.status));
        const json: unknown = await res.json();
        if (cancelled) return;

        // With { latestMagazine, latestPosts }: hero = magazine object only; slider = latestPosts only (never the issue).
        let { magazine: mag, posts: feed } = parseTravelerJson(json);

        // Legacy: flat array or missing magazine — first row as issue, rest as posts.
        if (!mag && feed.length > 0) {
          const first = feed[0];
          mag = {
            title: first.title,
            link: first.link,
            image: first.image,
            issueNumber: undefined,
            excerpt: undefined,
          };
          feed = feed.slice(1, 1 + MAX_POSTS);
        } else {
          feed = feed.slice(0, MAX_POSTS);
        }

        if (!mag) {
          setShowFallback(true);
          setLatestMagazine(null);
          setLatestPosts([]);
        } else {
          setLatestMagazine(mag);
          setLatestPosts(feed);
        }
      } catch {
        if (!cancelled) {
          setShowFallback(true);
          setLatestMagazine(null);
          setLatestPosts([]);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    void load();
    return () => {
      cancelled = true;
    };
  }, []);

  if (loading) {
    return (
      <div className="space-y-16">
        <div className="rounded-lg border border-stone-800 bg-[#0c0b0a] animate-pulse">
          <div className="grid grid-cols-1 lg:grid-cols-[0.95fr_1.1fr] min-h-[300px]">
            <div className="bg-stone-800/80 min-h-[260px] lg:min-h-[360px]" />
            <div className="p-8 lg:p-12 flex flex-col justify-center gap-4 border-t lg:border-t-0 lg:border-l border-stone-800">
              <div className="h-3 bg-stone-700 w-40" />
              <div className="h-4 bg-stone-800 w-full max-w-md" />
              <div className="h-4 bg-stone-800 w-full max-w-sm" />
              <div className="h-px bg-stone-700 w-12 my-2" />
              <div className="h-10 bg-stone-700 w-4/5 max-w-md" />
              <div className="h-11 bg-stone-700 w-48 mt-2" />
            </div>
          </div>
        </div>
        <div className="flex gap-4 md:gap-5 overflow-hidden pb-1 px-4 md:px-3 lg:px-0">
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <div
              key={i}
              className="flex shrink-0 flex-col w-[min(280px,78vw)] border border-stone-100 bg-white animate-pulse snap-start overflow-hidden"
            >
              <div className="aspect-[4/3] bg-stone-300" />
              <div className="p-5 space-y-2 min-h-[7rem]">
                <div className="h-4 bg-stone-200 w-4/5" />
                <div className="h-3 bg-stone-200 w-full" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (showFallback || !latestMagazine) {
    return <TravelerVisitFallback siteUrl={siteUrl} siteLabel={siteLabel} />;
  }

  return (
    <div className="space-y-16">
      <section
        aria-labelledby="automated-traveler-issue-heading"
        className="relative overflow-hidden rounded-lg border border-stone-800 bg-[#0c0b0a] shadow-[0_18px_36px_-16px_rgba(0,0,0,0.22)]"
      >
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.45]"
          style={{
            background:
              "radial-gradient(ellipse 85% 70% at 20% 40%, rgba(120,113,108,0.14), transparent 55%), radial-gradient(ellipse 60% 50% at 100% 0%, rgba(255,255,255,0.04), transparent 45%)",
          }}
        />
        <div className="relative grid grid-cols-1 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.1fr)]">
          <a
            href={latestMagazine.link}
            target="_blank"
            rel="noopener noreferrer"
            className="flex min-h-[300px] items-center justify-center px-8 py-14 sm:py-16 lg:min-h-[420px] lg:px-10 lg:py-16"
          >
            <img
              src={magazineHeroImage(latestMagazine)}
              alt={latestMagazine.title}
              fetchPriority="high"
              decoding="async"
              className="!size-auto max-h-[min(68vh,520px)] max-w-[min(100%,280px)] sm:max-w-[300px] lg:max-h-[min(72vh,580px)] lg:max-w-[min(100%,340px)] !object-contain"
            />
          </a>

          <div className="flex flex-col justify-center border-t border-stone-800/90 px-8 py-12 sm:px-10 sm:py-14 lg:border-l lg:border-t-0 lg:px-14 lg:py-16">
            <p className="font-sans text-[0.62rem] font-semibold uppercase tracking-[0.28em] text-stone-500">
              {siteLabel}
            </p>
            <p className="font-logo mt-4 text-3xl font-medium leading-[1.15] tracking-tight text-stone-100 sm:text-4xl">
              The magazine
            </p>

            <div className="mt-6 space-y-4 text-sm leading-relaxed text-stone-400">
              <p className="max-w-xl">{TRAVELER_EDITORIAL_INTRO}</p>
              <p className="max-w-xl text-stone-500">{TRAVELER_SEASONAL_LINE}</p>
            </div>

            <div className="my-10 h-px max-w-[3.5rem] bg-gradient-to-r from-stone-500/80 to-transparent" />

            <p className="font-sans text-[0.62rem] font-semibold uppercase tracking-[0.26em] text-stone-500">
              Latest issue
              {latestMagazine.issueNumber ? (
                <span className="text-stone-600"> - {latestMagazine.issueNumber}</span>
              ) : null}
            </p>
            <h3
              id="automated-traveler-issue-heading"
              className="mt-3 font-serif text-2xl font-medium leading-snug tracking-tight text-stone-100 sm:text-[1.75rem]"
            >
              {magazineDisplayTitle(latestMagazine)}
            </h3>
            {latestMagazine.excerpt ? (
              <p className="mt-5 max-w-xl text-sm leading-relaxed text-stone-500">
                {latestMagazine.excerpt}
              </p>
            ) : null}

            <div className="mt-10">
              <a
                href={latestMagazine.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center bg-stone-100 px-8 py-3.5 font-sans text-xs font-semibold uppercase tracking-[0.18em] text-stone-950 transition-colors hover:bg-white"
              >
                Read this issue
              </a>
            </div>
          </div>
        </div>
      </section>

      {latestPosts.length > 0 ? <TravelerPostsStrip posts={latestPosts} /> : null}
    </div>
  );
}
