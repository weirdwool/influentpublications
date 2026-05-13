import { Link } from "react-router-dom";

/** Letters stay in place; each fades in with a different delay (random order) — slow, elegant reveal */
const LETTERS = ["I", "N", "F", "L", "U", "E", "N", "T"];
const DELAYS_MS = [0, 2000, 800, 1600, 2800, 400, 2400, 1200]; // I, N, F, L, U, E, N, T — random reveal, ~4x slower
const PUBLICATIONS_DELAY_MS = Math.max(...DELAYS_MS) + 600;

interface LogoProps {
  variant?: "header" | "footer";
}

export default function Logo({ variant = "header" }: LogoProps): React.ReactElement {
  const textColor = variant === "header" ? "text-stone-900" : "text-white";
  const subColor = variant === "header" ? "text-stone-500" : "text-stone-400";

  return (
    <Link
      to="/"
      className={`flex flex-col items-center leading-none tracking-[0.08em] ${textColor}`}
    >
      <span className="font-logo text-3xl font-medium uppercase tracking-[0.2em] inline-flex">
        {LETTERS.map((letter, i) => (
          <span
            key={`${letter}-${i}`}
            className="inline-block opacity-0 animate-fade-in"
            style={{
              animationDelay: `${DELAYS_MS[i]}ms`,
              animationFillMode: "forwards",
            }}
          >
            {letter}
          </span>
        ))}
      </span>
      <span
        className={`font-sans text-[0.9rem] font-normal uppercase tracking-[0.5em] mt-1.5 opacity-0 animate-fade-in ${subColor}`}
        style={{
          animationDelay: `${PUBLICATIONS_DELAY_MS}ms`,
          animationFillMode: "forwards",
        }}
      >
        Publications
      </span>
    </Link>
  );
}
