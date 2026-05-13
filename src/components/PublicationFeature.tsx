import type { ReactElement } from "react";
import type { HomePublicationBlock, PublicationMedia } from "../data/publicationHomeBrands";
import { optimizedImageUrl } from "../utils/optimizedImageUrl";

function siteHostname(url: string): string {
  try {
    const h = new URL(url).hostname;
    return h.startsWith("www.") ? h.slice(4) : h;
  } catch {
    return url.replace(/^https?:\/\//i, "").split("/")[0] ?? url;
  }
}

function MediaBlock({
  media,
  navTitle,
  priorityImage,
  split,
}: {
  media: PublicationMedia;
  navTitle: string;
  priorityImage: boolean;
  /** Side-by-side with text: drop top margin (gap handles spacing). */
  split?: boolean;
}): ReactElement | null {
  if (media.kind === "none") {
    return null;
  }

  const figClass = split ? "w-full" : "mt-14 w-full lg:mt-16";

  if (media.kind === "video") {
    const hasClip = Boolean(media.src && media.src.length > 0);

    return (
      <figure className={figClass}>
        <div className="relative aspect-video w-full overflow-hidden bg-stone-200">
          {hasClip ? (
            <video
              src={media.src}
              poster={media.poster}
              controls
              playsInline
              className="h-full w-full object-cover"
            >
              Your browser does not support the video tag.
            </video>
          ) : (
            <>
              <img
                src={optimizedImageUrl(media.poster, 1600)}
                alt=""
                className="absolute inset-0 h-full w-full object-cover"
                decoding="async"
                loading={priorityImage ? "eager" : "lazy"}
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-stone-900/35 px-6 text-center">
                <span className="font-sans text-[0.65rem] font-semibold uppercase tracking-[0.38em] text-white/95">
                  Series in development
                </span>
                <p className="max-w-sm font-serif text-xl font-medium leading-snug text-white drop-shadow md:text-2xl">
                  Showreel and trailer will appear here.
                </p>
              </div>
            </>
          )}
        </div>
        <figcaption className="mt-3 font-sans text-[0.7rem] font-medium uppercase tracking-[0.22em] text-stone-500">
          {navTitle}
          {!hasClip ? " — teaser frame" : " — playback"}
        </figcaption>
      </figure>
    );
  }

  const src = optimizedImageUrl(media.src, 1400);

  const coverFigureClass = split ? "mx-auto w-2/3 min-w-0" : figClass;

  return (
    <figure className={coverFigureClass}>
      <img
        src={src}
        alt={media.alt}
        loading={priorityImage ? "eager" : "lazy"}
        decoding="async"
        fetchPriority={priorityImage ? "high" : "auto"}
        className="mx-auto block h-auto w-full max-w-full align-middle object-contain"
      />
    </figure>
  );
}

function FeatureText({
  block,
  descriptionLineId,
  textForward,
  split,
  centered = false,
  showTitle = false,
}: {
  block: HomePublicationBlock;
  descriptionLineId: string;
  textForward: boolean;
  split: boolean;
  centered?: boolean;
  showTitle?: boolean;
}): ReactElement {
  return (
    <div>
      {showTitle ? (
        <h2 className="mb-2 font-serif text-[2.2rem] font-normal tracking-tight text-stone-900 md:text-[2.4rem]">
          {block.navTitle}
        </h2>
      ) : null}
      <p
        id={descriptionLineId}
        className={`font-serif text-[1.15rem] font-normal leading-snug italic text-stone-600 md:text-[1.22rem] ${
          split ? "" : centered ? "" : "translate-y-[0.06rem]"
        } ${centered ? "mx-auto max-w-xl text-center" : ""}`}
      >
        {block.tagline}
      </p>

      <div
        className={`mt-8 space-y-5 text-stone-600 md:mt-9 md:space-y-[1.125rem] ${
          split
            ? textForward
              ? "max-w-none text-[1.02rem] leading-[1.78] md:text-[1.04rem]"
              : "max-w-none text-[0.96rem] leading-[1.72] md:text-[0.99rem]"
            : textForward
              ? `max-w-xl text-[1.05rem] leading-[1.8] md:text-[1.08rem] md:leading-[1.82] ${centered ? "mx-auto text-center text-pretty" : ""}`
              : `max-w-2xl text-[0.98rem] leading-[1.75] md:text-[1.015rem] ${centered ? "mx-auto text-center text-pretty" : ""}`
        }`}
      >
        {block.paragraphs.map((p, i) => (
          <p
            key={i}
            className={`${
              textForward && i === 0 && !split
                ? "font-serif text-xl font-medium leading-snug text-stone-800 md:text-[1.35rem]"
                : ""
            }`}
          >
            {p}
          </p>
        ))}
      </div>

      {block.siteUrl ? (
        <p className={`mt-10 md:mt-11 ${centered ? "text-center" : ""}`}>
          <a
            href={block.siteUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block border-b border-stone-900 pb-0.5 font-sans text-[0.7rem] font-bold uppercase tracking-[0.22em] text-stone-900 transition-colors hover:border-stone-500 hover:text-stone-700"
          >
            {siteHostname(block.siteUrl)}
          </a>
        </p>
      ) : null}
    </div>
  );
}

/** Tagline, prose, domain treatment; imprint + Visit row in {@link PublicationBrandSection}. */
export default function PublicationFeature({
  block,
  priorityImage = false,
  mediaOnRight = false,
  showTitle = false,
}: {
  block: HomePublicationBlock;
  priorityImage?: boolean;
  /** At `lg` and up: media column on the right when true, on the left when false. Mobile always stacks text then media. */
  mediaOnRight?: boolean;
  /** Render the publication title inside the text column */
  showTitle?: boolean;
}): ReactElement {
  const descriptionLineId = `pub-tagline-${block.id}`;
  const textForward = block.media.kind === "none";
  const hasAsideMedia = block.media.kind !== "none";

  if (!hasAsideMedia) {
    return (
      <div className="mx-auto w-full max-w-2xl text-center">
        <FeatureText
          block={block}
          descriptionLineId={descriptionLineId}
          textForward={textForward}
          split={false}
          centered
          showTitle={showTitle}
        />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:gap-8 xl:gap-10">
      <div
        className={`min-w-0 flex-1 basis-0 lg:max-w-[min(100%,26rem)] xl:max-w-[28rem] ${
          !mediaOnRight ? "lg:order-2" : ""
        }`}
      >
        <FeatureText
          block={block}
          descriptionLineId={descriptionLineId}
          textForward={textForward}
          split
          showTitle={showTitle}
        />
      </div>

      <div className={`min-w-0 flex-1 basis-0 ${!mediaOnRight ? "lg:order-1" : ""}`}>
        <MediaBlock
          media={block.media}
          navTitle={block.navTitle}
          priorityImage={priorityImage}
          split
        />
      </div>
    </div>
  );
}
