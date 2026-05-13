import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { publicationsInNav } from "../data/siteConfig";
import Logo from "./Logo";

const navLinkClass =
  "text-xs font-medium uppercase tracking-[0.14em] py-1 text-stone-500 hover:text-stone-900 transition-colors block";

export default function Header(): React.ReactElement {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  return (
    <header className="bg-stone-50">
      <div className="max-w-6xl mx-auto px-8">
        <div className="flex justify-center items-center py-8 pb-5">
          <Logo variant="header" />
        </div>
        <div className="w-full h-px bg-stone-200" />
        <div className="flex justify-center items-center py-3.5 relative">
        {/* Desktop nav — hidden on small screens */}
        <nav className="hidden min-[1200px]:flex justify-center gap-10">
          <Link to="/#about" className={navLinkClass}>
            About
          </Link>
          {publicationsInNav.map((pub) => (
            <Link
              key={pub.id}
              to={`/#${pub.id}`}
              className={navLinkClass}
            >
              {pub.name}
            </Link>
          ))}
          <Link to="/#contact" className={navLinkClass}>
            Subscribe
          </Link>
          <Link to="/#contact" className={navLinkClass}>
            Contact
          </Link>
        </nav>

        {/* Burger — always visible on the right */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen((o) => !o)}
          className="absolute right-8 flex flex-col gap-1.5 p-2 -m-2 text-stone-500 hover:text-stone-900 transition-colors"
          aria-label="Toggle menu"
          aria-expanded={mobileMenuOpen}
        >
          <span className="block w-5 h-px bg-current" />
          <span className="block w-5 h-px bg-current" />
          <span className="block w-5 h-px bg-current" />
        </button>
        </div>

        {/* Overlay — slides in from right */}
        {mobileMenuOpen && (
          <>
            <div
              className="fixed inset-0 bg-stone-900/30 backdrop-blur-sm z-40 animate-fade-in-fast"
              onClick={() => setMobileMenuOpen(false)}
              aria-hidden="true"
            />
            <div className="fixed inset-y-0 right-0 w-72 max-w-[85vw] bg-stone-50 shadow-2xl z-50 animate-slide-in-right flex flex-col px-8">
              <div className="flex justify-end pt-8">
                <button
                  type="button"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-10 h-10 flex items-center justify-center text-stone-500 hover:text-stone-900 transition-colors relative"
                  aria-label="Close menu"
                >
                  <span className="absolute w-5 h-px bg-current rotate-45" />
                  <span className="absolute w-5 h-px bg-current -rotate-45" />
                </button>
              </div>
              <nav className="flex flex-col gap-6 pt-6">
                <Link
                  to="/#about"
                  className={navLinkClass}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  About
                </Link>
                {publicationsInNav.map((pub) => (
                  <Link
                    key={pub.id}
                    to={`/#${pub.id}`}
                    className={navLinkClass}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {pub.name}
                  </Link>
                ))}
                <Link
                  to="/#contact"
                  className={navLinkClass}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Subscribe
                </Link>
                <Link
                  to="/#contact"
                  className={navLinkClass}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Contact
                </Link>
              </nav>
            </div>
          </>
        )}
      </div>
    </header>
  );
}
