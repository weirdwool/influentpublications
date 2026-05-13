import {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type MouseEvent,
  type ReactElement,
} from "react";
import type { TravelerMagazine } from "../types/travelerLatest";
import {
  magazinesFromMagazinesJsonPayload,
  travelerMagazineCoverUrl,
} from "../utils/travelerMagazinesFromLatestJson";
import { FEED_URL } from "../data/feedEndpoint";

function displayIssueTitle(m: TravelerMagazine): string {
  const raw = m.title.trim();
  const shortened = raw.replace(/^\s*issue\s*[\d.]+\s*[-–—:]\s*/i, "").trim();
  return shortened || raw || "Issue";
}

function MagazineCoverCard({ m }: { m: TravelerMagazine }): ReactElement {
  const src = travelerMagazineCoverUrl(m);
  const label = displayIssueTitle(m);

  return (
    <a
      href={m.link}
      target="_blank"
      rel="noopener noreferrer"
      title={label}
      className="group flex w-[clamp(148px,36vw,200px)] shrink-0 flex-col"
    >
      <div className="flex-1 overflow-hidden border border-stone-300/60 bg-white shadow-sm ring-1 ring-stone-200/70 transition-shadow duration-300 group-hover:shadow-md">
        {src ? (
          <img
            src={src}
            alt={label}
            loading="lazy"
            decoding="async"
            className="block w-full"
          />
        ) : (
          <div className="aspect-[3/4] bg-stone-200" aria-hidden />
        )}
      </div>
      <p className="mt-auto pt-3 font-serif text-[0.8125rem] font-medium leading-snug tracking-tight text-stone-800 line-clamp-2 md:text-[0.84rem]">
        {label}
      </p>
      {m.issueNumber ? (
        <span className="mt-1 font-sans text-[0.62rem] font-semibold uppercase tracking-[0.2em] text-stone-500">
          No. {String(m.issueNumber).replace(/^#/u, "").trim()}
        </span>
      ) : null}
    </a>
  );
}

/** Horizontal cover rail sourced from [`magazines.json`](https://influenttraveler.com/magazines.json). */
export default function TravelerCoversRail(): ReactElement | null {
  const [magazines, setMagazines] = useState<TravelerMagazine[]>([]);
  const [phase, setPhase] = useState<"loading" | "done">("loading");

  useEffect(() => {
    let alive = true;
    setPhase("loading");

    async function load(): Promise<void> {
      const fetchJson = (url: string): Promise<unknown> =>
        fetch(url, { credentials: "omit" }).then((r) => {
          if (!r.ok) {
            throw new Error(`HTTP ${r.status}`);
          }
          return r.json() as Promise<unknown>;
        });

      let list: TravelerMagazine[] = [];

      try {
        const feed = await fetchJson(FEED_URL);
        const raw = (feed as Record<string, unknown>).traveler;
        const travelerData = raw && typeof raw === "object" ? (raw as Record<string, unknown>).magazines : undefined;
        list = magazinesFromMagazinesJsonPayload(travelerData ?? []);
      } catch {
        list = [];
      }

      if (!alive) return;
      setMagazines(list);
      setPhase("done");
    }

    load().catch(() => {
      if (!alive) return;
      setMagazines([]);
      setPhase("done");
    });

    return () => {
      alive = false;
    };
  }, []);

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
  }, [magazines.length, phase]);

  if (phase === "loading") {
    return (
      <div
        className="mt-12 md:mt-14 text-left"
        aria-busy="true"
        aria-label="Loading magazine covers"
      >
        <div className="h-[min(420px,45vw)] w-full animate-pulse rounded-sm bg-stone-200/80" />
      </div>
    );
  }

  if (phase === "done" && magazines.length === 0) {
    return null;
  }

  const { scrollLeft, scrollWidth, clientWidth } = scrollMetrics;
  const canScroll = scrollWidth > clientWidth + 1;
  const maxScroll = Math.max(1, scrollWidth - clientWidth);
  const thumbW = canScroll ? (clientWidth / scrollWidth) * 100 : 100;
  const thumbLeft = canScroll ? (scrollLeft / maxScroll) * (100 - thumbW) : 0;

  function onTrackPointerDown(e: MouseEvent<HTMLDivElement>): void {
    const el = stripRef.current;
    if (!el || !canScroll) return;
    const track = e.currentTarget;
    const rect = track.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const ratio = Math.min(1, Math.max(0, x / rect.width));
    el.scrollTo({ left: ratio * maxScroll, behavior: "smooth" });
  }

  return (
    <div className="relative left-1/2 mt-12 w-screen -translate-x-1/2 text-left md:mt-14">
      <div className="mx-auto mb-5 flex max-w-6xl flex-col gap-2 px-8 sm:flex-row sm:items-end sm:justify-between">
        <p className="font-sans text-[0.62rem] font-semibold uppercase tracking-[0.28em] text-stone-500">
          Magazine archive
        </p>
        <a
          href="https://influenttraveler.com/magazine.html"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block border-b border-stone-400 pb-0.5 font-sans text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-stone-600 transition-colors hover:border-stone-800 hover:text-stone-900"
        >
          All issues →
        </a>
      </div>
      <div
        ref={stripRef}
        className="covers-rail-scroll flex gap-5 scroll-smooth px-8 md:gap-6"
      >
        {magazines.map((m) => (
          <MagazineCoverCard key={`${m.link}|${travelerMagazineCoverUrl(m)}`} m={m} />
        ))}
      </div>
      {canScroll ? (
        <div
          role="presentation"
          aria-hidden
          className="mx-auto mt-8 h-[2px] w-full max-w-lg cursor-pointer rounded-full bg-stone-300/30"
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
