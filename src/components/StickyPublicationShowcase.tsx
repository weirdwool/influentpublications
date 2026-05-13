import {
  useRef,
  useState,
  useEffect,
  type ReactElement,
} from "react";
import { motion } from "framer-motion";
import PublicationBrandSection from "./PublicationBrandSection";
import type { HomePublicationBlock } from "../data/publicationHomeBrands";

const LG = 1024;

const cardTransition = {
  duration: 1.0,
  ease: [0.22, 1, 0.36, 1] as const,
};

export default function StickyPublicationShowcase({
  blocks,
}: {
  blocks: HomePublicationBlock[];
}): ReactElement {
  const containerRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [isDesktop, setIsDesktop] = useState(() => window.innerWidth >= LG);

  const exitingRef = useRef(false);
  const prevYRef = useRef(window.scrollY);
  const exitTimerRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  /* ── responsive breakpoint ──────────────────────────────────────── */

  useEffect(() => {
    const check = () => setIsDesktop(window.innerWidth >= LG);
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  /* ── scroll-driven card logic (desktop only) ────────────────────── */

  useEffect(() => {
    if (!isDesktop) return;
    prevYRef.current = window.scrollY;

    const onScroll = () => {
      const el = containerRef.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const scrollable = el.offsetHeight - vh;
      if (scrollable <= 0) return;

      const into = -rect.top;
      const progress = Math.max(0, Math.min(1, into / scrollable));

      const y = window.scrollY;
      const delta = y - prevYRef.current;
      prevYRef.current = y;

      if (exitingRef.current) {
        if (delta > 4) {
          exitingRef.current = false;
          clearTimeout(exitTimerRef.current);
        }
        return;
      }

      const inSticky = rect.top <= 0 && rect.bottom > vh + 1;
      if (!inSticky) return;

      if (delta < -4 && progress > 0.02) {
        exitingRef.current = true;
        const top = y + rect.top;
        window.scrollTo({ top, behavior: "smooth" });
        exitTimerRef.current = setTimeout(() => {
          exitingRef.current = false;
          setActive(0);
        }, 800);
        return;
      }

      const idx = Math.min(
        blocks.length - 1,
        Math.floor(progress * blocks.length),
      );
      setActive(idx);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      clearTimeout(exitTimerRef.current);
    };
  }, [isDesktop, blocks.length]);

  /* ── mobile: plain vertical stack (unchanged) ───────────────────── */

  if (!isDesktop) {
    return (
      <div
        className="dark-editorial space-y-16"
        style={{
          background:
            "radial-gradient(ellipse at 50% 40%, #1e1d1b 0%, #0f0e0d 100%)",
        }}
      >
        {blocks.map((b, i) => (
          <PublicationBrandSection
            key={b.id}
            block={b}
            priorityHero={i === 0}
            mediaOnRight={i % 2 === 1}
            compact
          />
        ))}
      </div>
    );
  }

  /* ── desktop: sticky showcase ───────────────────────────────────── */

  const scrollToCard = (i: number) => {
    const el = containerRef.current;
    if (!el) return;
    const elTop = el.getBoundingClientRect().top + window.scrollY;
    const scrollable = el.offsetHeight - window.innerHeight;
    window.scrollTo({
      top: elTop + (i / blocks.length) * scrollable + 1,
      behavior: "smooth",
    });
  };

  return (
    <div
      ref={containerRef}
      className="relative"
      style={{ height: `${blocks.length * 100}vh` }}
    >
      <div
        className="sticky top-0 h-screen overflow-hidden"
        style={{
          background:
            "radial-gradient(ellipse at 50% 40%, #1e1d1b 0%, #0f0e0d 100%)",
        }}
      >
        {/* ── thin progress bar at top ────────────────────────────── */}
        <div className="absolute top-0 right-0 left-0 z-40 h-px bg-white/[0.06]">
          <motion.div
            className="h-full bg-stone-500/50"
            animate={{ width: `${((active + 1) / blocks.length) * 100}%` }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          />
        </div>

        {/* ── left nav column ─────────────────────────────────────── */}
        <nav
          aria-label="Publication sections"
          className="absolute inset-y-0 left-0 z-30 flex w-44 flex-col justify-center px-5 xl:w-52 xl:px-7"
        >
          <div className="flex flex-col gap-1">
            {blocks.map((b, i) => {
              const isCurrent = i === active;
              return (
                <button
                  key={b.id}
                  onClick={() => scrollToCard(i)}
                  className={`group border-l-2 py-2.5 pl-4 text-left transition-all duration-500 ${
                    isCurrent
                      ? "border-stone-300"
                      : "border-transparent"
                  }`}
                  aria-current={isCurrent ? "step" : undefined}
                >
                  <span
                    className={`font-sans text-[0.68rem] uppercase tracking-[0.15em] transition-colors duration-500 ${
                      isCurrent
                        ? "font-medium text-stone-200"
                        : "text-stone-600 group-hover:text-stone-300"
                    }`}
                  >
                    {b.navTitle}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="absolute bottom-6 left-5 font-sans text-[0.6rem] font-medium tracking-[0.3em] text-stone-700 xl:left-7">
            {String(active + 1).padStart(2, "0")}
            <span className="mx-1 text-stone-800">/</span>
            {String(blocks.length).padStart(2, "0")}
          </div>
        </nav>

        {/* ── stacked card layers ─────────────────────────────────── */}
        <div className="relative z-20 h-full w-full">
          {blocks.map((block, i) => {
            const isCurrent = i === active;
            return (
              <motion.div
                key={block.id}
                className="dark-editorial absolute inset-0 flex items-center overflow-hidden"
                animate={{
                  opacity: isCurrent ? 1 : 0,
                  y: isCurrent ? 0 : 40,
                  scale: isCurrent ? 1 : 0.97,
                }}
                transition={cardTransition}
                style={{ pointerEvents: isCurrent ? "auto" : "none" }}
                aria-hidden={!isCurrent}
              >
                <div className="w-full pl-44 xl:pl-52 [&>section]:border-b-0 [&_figure_img]:max-h-[42vh]">
                  <PublicationBrandSection
                    block={block}
                    priorityHero={i === 0}
                    compact
                  />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
