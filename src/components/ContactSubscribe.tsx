import type { ReactElement } from "react";

export default function ContactSubscribe(): ReactElement {
  return (
    <section id="contact" className="border-t border-stone-200 bg-stone-125">
      <div className="mx-auto max-w-5xl px-8 py-20 md:py-28">
        <div className="flex flex-col items-stretch md:flex-row">
          {/* ── Subscribe ─────────────────────────────── */}
          <div className="flex-1 text-center md:text-left md:pr-16 lg:pr-20">
            <h2 className="font-serif text-[1.7rem] font-normal tracking-tight text-stone-900 md:text-[1.9rem]">
              Stay in the conversation
            </h2>
            <p className="mx-auto mt-3 max-w-md font-serif text-[1.08rem] italic leading-snug text-stone-500 md:mx-0">
              Receive our finest stories, exclusive features, and curated
              recommendations — delivered to your inbox.
            </p>

            <form
              className="mt-8"
              onSubmit={(e) => e.preventDefault()}
            >
              <div className="mx-auto flex max-w-[420px] flex-col gap-0 sm:flex-row md:mx-0">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="flex-1 border border-stone-200 bg-white px-5 py-4 font-sans text-base text-stone-900 placeholder:text-stone-400 transition-colors focus:border-stone-500 focus:outline-none"
                  required
                />
                <button
                  type="submit"
                  className="w-full cursor-pointer border-none bg-stone-900 px-7 py-4 font-sans text-xs font-semibold uppercase tracking-[0.12em] text-white transition-colors hover:bg-stone-700 sm:w-auto"
                >
                  Subscribe
                </button>
              </div>
              <p className="mt-3 text-sm text-stone-400">
                By subscribing, you agree to our privacy policy. Unsubscribe at
                any time.
              </p>
            </form>
          </div>

          {/* ── Divider ───────────────────────────────── */}
          <div className="my-12 h-px w-full bg-stone-200 md:my-0 md:h-auto md:w-px md:self-stretch" />

          {/* ── Contact ───────────────────────────────── */}
          <div className="flex-1 text-center md:pl-16 md:text-left lg:pl-20">
            <h2 className="font-serif text-[1.7rem] font-normal tracking-tight text-stone-900 md:text-[1.9rem]">
              Get in touch
            </h2>
            <p className="mx-auto mt-3 max-w-md font-serif text-[1.08rem] italic leading-snug text-stone-500 md:mx-0">
              For press, partnerships, editorial contributions, or any other
              questions — we'd love to hear from you.
            </p>
            <p className="mt-8">
              <a
                href="mailto:contact@influentpublications.com"
                className="inline-block border-b border-stone-300 pb-0.5 font-sans text-[0.82rem] font-medium tracking-wide text-stone-700 transition-colors hover:border-stone-600 hover:text-stone-900"
              >
                contact@influentpublications.com
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
