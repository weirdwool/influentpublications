import {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type MouseEvent,
  type ReactElement,
} from "react";
import {
  GLAMOUR_COVERS_JSON_URL,
  GLAMOUR_COVERS_BASE,
} from "../data/glamourEndpoints";

interface GlamourCover {
  title: string;
  issue?: number;
  tag: string;
  thumb: string;
  full: string;
}

interface CoversPayload {
  basePath: string;
  covers: GlamourCover[];
}

function CoverCard({ c }: { c: GlamourCover }): ReactElement {
  const src = `${GLAMOUR_COVERS_BASE}${c.thumb}`;
  return (
    <a
      href={`${GLAMOUR_COVERS_BASE}${c.full}`}
      target="_blank"
      rel="noopener noreferrer"
      title={c.title}
      className="group flex w-[clamp(132px,30vw,175px)] shrink-0 flex-col"
    >
      <div className="flex-1 overflow-hidden border border-stone-300/60 bg-white shadow-sm ring-1 ring-stone-200/70 transition-shadow duration-300 group-hover:shadow-md">
        <img
          src={src}
          alt={c.title}
          loading="lazy"
          decoding="async"
          className="block w-full"
        />
      </div>
      <p className="mt-auto pt-3 font-serif text-[0.8125rem] font-medium leading-snug tracking-tight text-stone-800 line-clamp-2 md:text-[0.84rem]">
        {c.title}
      </p>
      {c.issue ? (
        <span className="mt-1 font-sans text-[0.62rem] font-semibold uppercase tracking-[0.2em] text-stone-500">
          No. {c.issue}
        </span>
      ) : null}
    </a>
  );
}

export default function GlamourCoversRail(): ReactElement | null {
  const [covers, setCovers] = useState<GlamourCover[]>([]);
  const [phase, setPhase] = useState<"loading" | "done">("loading");

  useEffect(() => {
    let alive = true;
    setPhase("loading");

    fetch(GLAMOUR_COVERS_JSON_URL, { credentials: "omit" })
      .then((r) => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        return r.json() as Promise<CoversPayload>;
      })
      .then((data) => {
        if (!alive) return;
        setCovers(data.covers ?? []);
        setPhase("done");
      })
      .catch(() => {
        if (!alive) return;
        setCovers([]);
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
  }, [covers.length, phase]);

  if (phase === "loading") {
    return (
      <div
        className="mt-12 text-left md:mt-14"
        aria-busy="true"
        aria-label="Loading covers"
      >
        <div className="h-[min(380px,42vw)] w-full animate-pulse rounded-sm bg-stone-200/80" />
      </div>
    );
  }

  if (phase === "done" && covers.length === 0) return null;

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
          Cover archive
        </p>
        <a
          href="https://influentglamour.com"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block border-b border-stone-400 pb-0.5 font-sans text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-stone-600 transition-colors hover:border-stone-800 hover:text-stone-900"
        >
          All covers →
        </a>
      </div>
      <div
        ref={stripRef}
        className="covers-rail-scroll flex gap-5 scroll-smooth px-8 md:gap-6"
      >
        {covers.map((c) => (
          <CoverCard key={`${c.thumb}`} c={c} />
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
