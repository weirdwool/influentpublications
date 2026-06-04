import { Link } from "react-router-dom";
import { publicationsInNav } from "../data/siteConfig";
import Logo from "./Logo";

export default function Footer(): React.ReactElement {
  return (
    <footer className="bg-stone-900 text-stone-400">
      <div className="max-w-6xl mx-auto px-8 py-16 pb-8">
        <div className="text-center mb-12">
          <Logo variant="footer" />
          <p className="mt-3 text-sm text-stone-500 font-light">
            Curating the finer things in life since 2024.
          </p>
        </div>
        <div className="flex justify-center gap-24 mb-12">
          <div className="flex flex-col gap-2.5">
            <h4 className="font-serif text-sm font-medium text-white mb-2">Our Publications</h4>
            {publicationsInNav.map((pub) => (
              <a
                key={pub.id}
                href={pub.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-stone-500 hover:text-stone-300 transition-colors"
              >
                {pub.name}
              </a>
            ))}
          </div>
          <div className="flex flex-col gap-2.5">
            <h4 className="font-serif text-sm font-medium text-white mb-2">Company</h4>
            <Link
              to="/#about"
              className="text-sm text-stone-500 hover:text-stone-300 transition-colors"
            >
              About
            </Link>
            <Link
              to="/#contact"
              className="text-sm text-stone-500 hover:text-stone-300 transition-colors"
            >
              Contact
            </Link>
          </div>
        </div>
        <div className="text-center pt-8 border-t border-stone-800">
          <p className="text-xs text-stone-600">
            &copy; {new Date().getFullYear()} Influent Publications. All rights reserved.
          </p>
          <Link
            to="/terms"
            className="mt-2 inline-block text-xs text-stone-600 hover:text-stone-400 transition-colors"
          >
            Terms &amp; Conditions
          </Link>
        </div>
      </div>
    </footer>
  );
}
