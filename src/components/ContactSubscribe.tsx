import type { ReactElement } from "react";

const MEDIA_KIT_URL = ""; // TODO: replace with actual PDF path once ready

export default function ContactSubscribe(): ReactElement {
  return (
    <section id="contact" className="border-t border-stone-200 bg-stone-125">
      <div className="mx-auto max-w-5xl px-8 py-20 md:py-28">
        {/* Section header */}
        <div className="mb-14 text-center md:mb-20">
          <p className="font-sans text-[0.62rem] font-semibold uppercase tracking-[0.3em] text-stone-400">
            Partnerships &amp; Inquiries
          </p>
          <h2 className="mx-auto mt-4 max-w-xl font-serif text-[1.85rem] font-normal leading-snug tracking-tight text-stone-900 md:text-[2.2rem]">
            Let's create something exceptional together
          </h2>
        </div>

        <div className="flex flex-col items-stretch gap-16 md:flex-row md:gap-0">
          {/* ── Media Kit ────────────────────────────── */}
          <div className="flex-1 text-center md:pr-16 md:text-left lg:pr-20">
            <p className="font-sans text-[0.62rem] font-semibold uppercase tracking-[0.28em] text-stone-400">
              Media kit
            </p>
            <h3 className="mt-3 font-serif text-[1.4rem] font-normal tracking-tight text-stone-900 md:text-[1.55rem]">
              Advertise with Influent
            </h3>
            <p className="mx-auto mt-4 max-w-md text-[0.92rem] leading-relaxed text-stone-500 md:mx-0">
              Our publications reach a curated audience of discerning
              readers — from luxury travellers and hotel groups to fashion
              and lifestyle enthusiasts. Feature your brand, property, or
              destination alongside award-worthy editorial.
            </p>
            <ul className="mx-auto mt-6 flex max-w-md flex-col gap-2.5 text-left text-[0.85rem] text-stone-600 md:mx-0">
              <li className="flex items-start gap-2.5">
                <span className="mt-1.5 block h-1 w-1 shrink-0 rounded-full bg-stone-400" />
                Full-page &amp; spread placements across all titles
              </li>
              <li className="flex items-start gap-2.5">
                <span className="mt-1.5 block h-1 w-1 shrink-0 rounded-full bg-stone-400" />
                Dedicated hotel &amp; resort features with editorial coverage
              </li>
              <li className="flex items-start gap-2.5">
                <span className="mt-1.5 block h-1 w-1 shrink-0 rounded-full bg-stone-400" />
                Rate card, audience demographics &amp; sample pages included
              </li>
            </ul>

            {MEDIA_KIT_URL ? (
              <a
                href={MEDIA_KIT_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 inline-flex items-center gap-2.5 bg-stone-900 px-8 py-3.5 font-sans text-xs font-semibold uppercase tracking-[0.16em] text-white transition-colors hover:bg-stone-700"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M8 2v9m0 0L4.5 7.5M8 11l3.5-3.5M2 13h12" />
                </svg>
                Download media kit
              </a>
            ) : (
              <p className="mt-8 inline-block border border-stone-300 px-8 py-3.5 font-sans text-xs font-semibold uppercase tracking-[0.16em] text-stone-400">
                Media kit — coming soon
              </p>
            )}
          </div>

          {/* ── Divider ───────────────────────────────── */}
          <div className="h-px w-full bg-stone-200 md:h-auto md:w-px md:self-stretch" />

          {/* ── Contact ───────────────────────────────── */}
          <div className="flex-1 text-center md:pl-16 md:text-left lg:pl-20">
            <p className="font-sans text-[0.62rem] font-semibold uppercase tracking-[0.28em] text-stone-400">
              Get in touch
            </p>
            <h3 className="mt-3 font-serif text-[1.4rem] font-normal tracking-tight text-stone-900 md:text-[1.55rem]">
              We'd love to hear from you
            </h3>
            <p className="mx-auto mt-4 max-w-md text-[0.92rem] leading-relaxed text-stone-500 md:mx-0">
              Whether you're interested in advertising, editorial
              partnerships, press inquiries, or simply want to learn more
              about what we do — our team is here to help.
            </p>

            <div className="mx-auto mt-8 flex max-w-md flex-col gap-6 text-left md:mx-0">
              <div>
                <p className="font-sans text-[0.62rem] font-semibold uppercase tracking-[0.22em] text-stone-400">
                  General &amp; partnerships
                </p>
                <a
                  href="mailto:contact@influentpublications.com"
                  className="mt-1.5 inline-block font-sans text-[0.88rem] font-medium tracking-wide text-stone-700 transition-colors hover:text-stone-900"
                >
                  contact@influentpublications.com
                </a>
              </div>
              <div>
                <p className="font-sans text-[0.62rem] font-semibold uppercase tracking-[0.22em] text-stone-400">
                  Advertising &amp; features
                </p>
                <a
                  href="mailto:advertising@influentpublications.com"
                  className="mt-1.5 inline-block font-sans text-[0.88rem] font-medium tracking-wide text-stone-700 transition-colors hover:text-stone-900"
                >
                  advertising@influentpublications.com
                </a>
              </div>
            </div>

            <div className="mx-auto mt-10 max-w-md border-t border-stone-200 pt-6 text-left md:mx-0">
              <p className="text-[0.82rem] leading-relaxed text-stone-400">
                Based between Europe and Southeast Asia. We work with
                brands globally and respond within 48 hours.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
