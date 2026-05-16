import type { Publication } from "../types";

/**
 * Publication links — update these URLs when each site is live.
 * These are the separate magazine/sites under the Influent Publications umbrella.
 */
export const publications: Publication[] = [
  {
    id: "influent-traveler",
    name: "INFLUENT Traveler",
    url: "https://influenttraveler.com",
    tagline: "The art of travel, refined",
    description: "Luxury travel, destinations, and the art of the journey.",
  },
  {
    id: "influent-glamour",
    name: "INFLUENT Glamour",
    url: "https://influentglamour.com",
    tagline: "Style, beauty, and the glamorous life",
    description: "Fashion, beauty, and lifestyle for the discerning.",
  },
  {
    id: "influent-model",
    name: "Models",
    url: "https://influentmodel.com",
    tagline: "The face of luxury",
    description: "Modeling, fashion, and the art of the image.",
  },
  {
    id: "mjolnr",
    name: "Mjölnr",
    url: "https://mjolnr.com",
    tagline: "Power, craft, and legacy",
    description: "Where power meets craft.",
  },
  {
    id: "influent-trendsetter",
    name: "Trendsetters",
    url: "https://influenttrendsetter.com",
    tagline: "Where style leads",
    description: "Emerging trends, tastemakers, and what's next.",
  },
];

export function getPublicationById(id: string | undefined): Publication | undefined {
  return publications.find((p) => p.id === id);
}

/** Publications to show in nav — excludes those whose sites aren't live yet */
export const publicationsInNav = publications.filter((p) => p.id !== "influent-model");
