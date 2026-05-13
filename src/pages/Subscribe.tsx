import DocumentMeta from "../components/DocumentMeta";
import { publicationsInNav } from "../data/siteConfig";

export default function Subscribe(): React.ReactElement {
  return (
    <div className="max-w-3xl mx-auto px-8 py-16">
      <DocumentMeta
        title="Subscribe"
        description="Join the Influent Publications mailing list for stories, exclusive features, and curated recommendations from our titles."
        path="/subscribe"
      />
      <header className="mb-10">
        <h1 className="font-serif text-3xl font-medium mb-3">Subscribe</h1>
        <div className="w-12 h-px bg-stone-400" />
      </header>
      <div className="text-[1.05rem] leading-relaxed">
        <p className="text-xl text-stone-500 font-light mb-10">
          Stay ahead of the curve. Receive our finest stories, exclusive content, and curated
          recommendations delivered to your inbox.
        </p>

        <form
          className="my-10"
          onSubmit={(e) => e.preventDefault()}
        >
          <div className="flex flex-col sm:flex-row gap-0 max-w-[480px] mb-3">
            <input
              type="email"
              placeholder="Your email address"
              className="flex-1 px-5 py-4 font-sans text-base border border-stone-200 bg-white text-stone-900 placeholder:text-stone-400 focus:outline-none focus:border-stone-500 transition-colors"
              required
            />
            <button
              type="submit"
              className="px-7 py-4 font-sans text-xs font-semibold uppercase tracking-[0.12em] bg-stone-900 text-white border-none cursor-pointer hover:bg-stone-700 transition-colors sm:w-auto w-full"
            >
              Subscribe
            </button>
          </div>
          <p className="text-sm text-stone-500 mt-0">
            By subscribing, you agree to our privacy policy. Unsubscribe at any time.
          </p>
        </form>

        <div className="mt-12 pt-8 border-t border-stone-200">
          <h3 className="font-serif text-base font-medium mb-4">
            Or subscribe to individual publications
          </h3>
          <div className="flex flex-wrap gap-4">
            {publicationsInNav.map((pub) => (
              <a
                key={pub.id}
                href={pub.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-stone-500 underline underline-offset-2 hover:text-stone-900 transition-colors"
              >
                {pub.name}
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
