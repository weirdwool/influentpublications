import { useEffect, useRef, type ReactElement } from "react";
import ContactSubscribe from "../components/ContactSubscribe";
import DocumentMeta from "../components/DocumentMeta";
import StickyPublicationShowcase from "../components/StickyPublicationShowcase";
import { homePublicationBlocks } from "../data/publicationHomeBrands";
import { SEO_SITE_ORIGIN, SITE_DEFAULT_DESCRIPTION } from "../data/seoConfig";
import { HERO_VIDEO_URL } from "../data/heroVideo";

const ORGANIZATION_SAME_AS = Array.from(
  new Set(homePublicationBlocks.flatMap((b) => (b.siteUrl ? [b.siteUrl] : []))),
);

export default function Home(): ReactElement {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (window.location.hash === "#about") {
      document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.playbackRate = 0.6;
    }
  }, []);

  return (
    <div>
      <DocumentMeta
        title="Luxury boutique publishing & travel media"
        description={SITE_DEFAULT_DESCRIPTION}
        path="/"
        jsonLd={{
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "Organization",
              "@id": `${SEO_SITE_ORIGIN}/#organization`,
              name: "Influent Publications",
              url: SEO_SITE_ORIGIN,
              sameAs: ORGANIZATION_SAME_AS,
            },
            {
              "@type": "WebSite",
              "@id": `${SEO_SITE_ORIGIN}/#website`,
              url: SEO_SITE_ORIGIN,
              name: "Influent Publications",
              publisher: { "@id": `${SEO_SITE_ORIGIN}/#organization` },
            },
          ],
        }}
      />
      {/* Full-width cinematic hero video — black & white, slow motion */}
      <section className="relative w-full h-[75vh] min-h-[500px] overflow-hidden mt-4">
        <video
          ref={videoRef}
          src={HERO_VIDEO_URL}
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover grayscale contrast-125"
        />
      </section>

      {/* About — luxury boutique publishing house */}
      <section id="about" className="max-w-3xl mx-auto px-8 py-20 mb-20 border-b border-stone-200">
        <div className="w-12 h-px bg-stone-400 mb-8" />
        <p className="font-serif text-2xl font-medium text-stone-900 leading-snug tracking-tight mb-6">
          A curated collective of luxury media brands, each dedicated to the art of living well.
        </p>
        <p className="text-stone-600 leading-relaxed mb-6">
          Influent Publications is not a publisher in the ordinary sense. We are a boutique house
          built on a singular conviction: that the finest stories deserve the finest presentation.
          Every title under our imprint is crafted for a discerning audience — readers who value
          depth over distraction, quality over quantity, and the enduring pleasure of beautifully
          told narratives.
        </p>
        <p className="text-stone-600 leading-relaxed">
          From the refined world of <span className="font-medium text-stone-800">Influent Traveler</span> to
          the glamour of style and beauty, from the precision of craft to the pulse of what's next —
          each publication stands on its own while sharing a common ethos. We believe in the power of
          curation. We believe in the luxury of attention. And we believe that the best media
          doesn't merely inform; it elevates.
        </p>
      </section>

      {/* Publication sections — sticky storytelling on desktop, normal stack on mobile */}
      <StickyPublicationShowcase blocks={homePublicationBlocks} />

      <ContactSubscribe />
    </div>
  );
}
