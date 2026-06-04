import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type MouseEvent,
  type ReactElement,
} from "react";
import { createPortal } from "react-dom";
import { FEED_URL, GLAMOUR_COVERS_BASE } from "../data/feedEndpoint";

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

function CoverCard({
  c,
  onClick,
}: {
  c: GlamourCover;
  onClick: () => void;
}): ReactElement {
  const src = `${GLAMOUR_COVERS_BASE}${c.thumb}`;
  return (
    <button
      type="button"
      onClick={onClick}
      title={c.title}
      className="group flex w-[clamp(132px,30vw,175px)] shrink-0 cursor-pointer flex-col border-0 bg-transparent p-0 text-left outline-none"
    >
      <div className="flex flex-1 items-center overflow-hidden bg-white shadow-sm transition-shadow duration-300 group-hover:shadow-md">
        <img
          src={src}
          alt={c.title}
          loading="lazy"
          decoding="async"
          className="block w-full"
        />
      </div>
      <div className="mt-auto pt-3">
        <p className="font-serif text-[0.8125rem] font-medium leading-snug tracking-tight text-stone-800 line-clamp-2 md:text-[0.84rem]">
          {c.title}
        </p>
        <span className="mt-1 block font-sans text-[0.62rem] font-semibold uppercase tracking-[0.2em] text-stone-500">
          {c.issue ? `No. ${c.issue}` : "\u00A0"}
        </span>
      </div>
    </button>
  );
}

function LightboxModal({
  covers,
  activeIndex,
  onClose,
  onNavigate,
}: {
  covers: GlamourCover[];
  activeIndex: number;
  onClose: () => void;
  onNavigate: (index: number) => void;
}): ReactElement {
  const c = covers[activeIndex];
  const fullSrc = `${GLAMOUR_COVERS_BASE}${c.full}`;
  const total = covers.length;
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(false);
  }, [activeIndex]);

  useEffect(() => {
    const prevIdx = (activeIndex - 1 + total) % total;
    const nextIdx = (activeIndex + 1) % total;
    for (const idx of [nextIdx, prevIdx]) {
      const img = new Image();
      img.src = `${GLAMOUR_COVERS_BASE}${covers[idx].full}`;
    }
  }, [activeIndex, covers, total]);

  const goPrev = useCallback(() => {
    onNavigate((activeIndex - 1 + total) % total);
  }, [activeIndex, total, onNavigate]);

  const goNext = useCallback(() => {
    onNavigate((activeIndex + 1) % total);
  }, [activeIndex, total, onNavigate]);

  useEffect(() => {
    function handleKey(e: KeyboardEvent): void {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowLeft") goPrev();
      else if (e.key === "ArrowRight") goNext();
    }
    window.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [onClose, goPrev, goNext]);

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/85 backdrop-blur-sm"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      {/* Close */}
      <button
        type="button"
        onClick={onClose}
        className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white/80 transition-colors hover:bg-white/20 hover:text-white"
        aria-label="Close"
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
          <line x1="5" y1="5" x2="15" y2="15" />
          <line x1="15" y1="5" x2="5" y2="15" />
        </svg>
      </button>

      {/* Prev */}
      {total > 1 && (
        <button
          type="button"
          onClick={goPrev}
          className="absolute left-3 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white/80 transition-colors hover:bg-white/20 hover:text-white sm:left-5"
          aria-label="Previous cover"
        >
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="14,4 7,11 14,18" />
          </svg>
        </button>
      )}

      {/* Next */}
      {total > 1 && (
        <button
          type="button"
          onClick={goNext}
          className="absolute right-3 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white/80 transition-colors hover:bg-white/20 hover:text-white sm:right-5"
          aria-label="Next cover"
        >
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="8,4 15,11 8,18" />
          </svg>
        </button>
      )}

      {/* Cover image + caption */}
      <div className="flex max-h-[90vh] max-w-[90vw] flex-col items-center px-12">
        <div className="relative flex items-center justify-center">
          {!loaded && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="h-6 w-6 animate-spin rounded-full border-2 border-white/20 border-t-white/70" />
            </div>
          )}
          <img
            key={activeIndex}
            src={fullSrc}
            alt={c.title}
            onLoad={() => setLoaded(true)}
            className={`max-h-[78vh] max-w-full object-contain transition-opacity duration-200 ${loaded ? "opacity-100" : "opacity-0"}`}
          />
        </div>
        <div className="mt-4 text-center">
          <p className="font-serif text-sm font-medium text-white/90 sm:text-base">
            {c.title}
          </p>
          <p className="mt-1 font-sans text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-white/50">
            {c.issue ? `No. ${c.issue} · ` : ""}
            {activeIndex + 1} / {total}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function GlamourCoversRail(): ReactElement | null {
  const [covers, setCovers] = useState<GlamourCover[]>([]);
  const [phase, setPhase] = useState<"loading" | "done">("loading");
  const [lightbox, setLightbox] = useState<number | null>(null);

  useEffect(() => {
    let alive = true;
    setPhase("loading");

    fetch(FEED_URL, { credentials: "omit" })
      .then((r) => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        return r.json() as Promise<{ glamour?: CoversPayload }>;
      })
      .then((feed) => {
        if (!alive) return;
        setCovers(feed.glamour?.covers ?? []);
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
        {covers.map((c, i) => (
          <CoverCard
            key={`${c.thumb}`}
            c={c}
            onClick={() => setLightbox(i)}
          />
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
      {lightbox !== null &&
        createPortal(
          <LightboxModal
            covers={covers}
            activeIndex={lightbox}
            onClose={() => setLightbox(null)}
            onNavigate={setLightbox}
          />,
          document.body,
        )}
    </div>
  );
}
