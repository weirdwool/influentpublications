import type { ReactElement } from "react";
import type { HomePublicationBlock } from "../data/publicationHomeBrands";
import GlamourCoversRail from "./GlamourCoversRail";
import PublicationFeature from "./PublicationFeature";
import TravelerCoversRail from "./TravelerCoversRail";

/**
 * Masthead: title and Vogue “Visit site” on one row (space between), then {@link PublicationFeature}.
 */
export default function PublicationBrandSection({
  block,
  priorityHero = false,
  mediaOnRight = false,
  compact = false,
}: {
  block: HomePublicationBlock;
  /** Sets eager loading / fetch priority on the hero media when present */
  priorityHero?: boolean;
  /** At `lg` and up: media column on the right (trailing) when true, on the left when false */
  mediaOnRight?: boolean;
  /** Viewport-fitted mode — tighter padding */
  compact?: boolean;
}): ReactElement {
  const textOnly = block.media.kind === "none";

  return (
    <section
      id={block.id}
      className="border-b border-stone-200/85 bg-stone-125 last:border-b-0"
      aria-labelledby={`pub-title-${block.id}`}
      aria-describedby={`pub-tagline-${block.id}`}
    >
      <div
        className={`mx-auto max-w-6xl px-8 ${
          compact ? "py-8 md:py-10" : "py-[4.25rem] md:py-[5.25rem]"
        } ${textOnly ? "text-center" : ""}`}
      >
        <header
          className={`${compact ? "hidden" : "mb-8 md:mb-10"} ${
            textOnly
              ? "mx-auto max-w-2xl text-center"
              : "flex w-full flex-row flex-wrap items-start justify-between gap-x-6 gap-y-3"
          }`}
        >
          {block.siteUrl ? (
            <>
              <div className="min-w-0 max-w-[min(100%,65%)] sm:max-w-[min(100%,58%)] md:max-w-[min(100%,50%)] lg:max-w-[min(100%,54%)]">
                <h2
                  id={`pub-title-${block.id}`}
                  className="font-serif text-[2.2rem] font-normal tracking-tight text-stone-900 md:text-[2.4rem]"
                >
                  {block.navTitle}
                </h2>
              </div>
              <div className="flex shrink-0 flex-wrap items-center justify-end gap-x-10 gap-y-2 pt-1 sm:pt-[0.35rem]">
                <div className="h-px w-14 shrink-0 bg-stone-300/90 max-sm:hidden" aria-hidden />
                <a
                  href={block.siteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="whitespace-nowrap font-sans text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-stone-800 decoration-stone-400 underline-offset-4 transition-colors hover:text-stone-600 hover:underline"
                >
                  Visit site
                </a>
              </div>
            </>
          ) : (
            <>
              <h2
                id={`pub-title-${block.id}`}
                className="font-serif text-[2.2rem] font-normal tracking-tight text-stone-900 md:text-[2.4rem]"
              >
                {block.navTitle}
              </h2>
              <span className="mt-2 block font-sans text-[0.62rem] font-semibold uppercase tracking-[0.28em] text-stone-400">
                {block.stubLabel ?? "Exclusive preview"}
              </span>
            </>
          )}
        </header>

        <PublicationFeature
          block={block}
          priorityImage={priorityHero}
          mediaOnRight={mediaOnRight}
          showTitle={compact}
        />

        {block.id === "influent-traveler" ? <TravelerCoversRail /> : null}
        {block.id === "influent-glamour" ? <GlamourCoversRail /> : null}
      </div>
    </section>
  );
}
