/** Static home publication features. Automated Traveler feed: `AutomatedTravelerSection.tsx`. */

export type PublicationMedia =
  | { kind: "image"; src: string; alt: string }
  | { kind: "video"; poster: string; /** When absent, show poster-only “coming soon” state */ src?: string }
  | { kind: "none" };

export interface HomePublicationBlock {
  id: string;
  navTitle: string;
  /** Italic line after the masthead (title → visit row → tagline → prose → domain link when live). */
  tagline: string;
  /** Omit when not public yet — hides Visit / legal sameAs */
  siteUrl?: string;
  paragraphs: readonly string[];
  media: PublicationMedia;
  /** Beside the Visit row when there is no `siteUrl`; defaults to “Exclusive preview” */
  stubLabel?: string;
}

export const homePublicationBlocks: HomePublicationBlock[] = [
  {
    id: "influent-traveler",
    navTitle: "INFLUENT Traveler",
    tagline: "Hotels, resorts & the art of arrival.",
    siteUrl: "https://influenttraveler.com",
    paragraphs: [
      "Influent Traveler is devoted to the art of arrival: legendary hotels and resorts, restaurants worth planning a trip around, and the culture of place—told with patience, photography, and editorial depth.",
      "Read the magazine on the web, hold the printed edition, or dive into exclusive features and long-form reporting online—the home for travellers who favour substance over noise.",
    ],
    media: {
      kind: "image",
      src: "/travelercover-greece.webp",
      alt: "Influent Traveler n°24 magazine cover — Greece, Aurelie",
    },
  },
  {
    id: "influent-glamour",
    navTitle: "INFLUENT Glamour",
    tagline: "Beauty. Style. Luxury.",
    siteUrl: "https://influentglamour.com",
    paragraphs: [
      "Influent Glamour is our celebration of modelling and fashion as craft—portfolio stories, backstage calm, and the tension between aspiration and intimacy. Born from years of collectible covers, each issue behaves like an object you keep on the table, not a feed you scroll past.",
      "We follow faces, tailoring, casting, and the small army behind every frame. The publication is evolving; what's constant is conviction: sumptuous imagery, ruthless editing, and respect for readers who dress the world.",
    ],
    media: {
      kind: "image",
      src: "/glamourcover-miami.webp",
      alt: "Influent Glamour n°53 — Miami, Anastasia",
    },
  },
  {
    id: "influent-trendsetter",
    navTitle: "Trendsetters",
    tagline: "A competition series — travel, shoots, stakes.",
    paragraphs: [
      "Trendsetters is envisioned as premium unscripted television: a cohort of models is sent to singular destinations—from ancient cities to raw coastlines—each week delivering a photographed brief under genuine pressure.",
      "Think precision craft meeting heat-of-the-moment creativity: wardrobes packed for climate and culture, guest photographers, elimination weeks, and a finale rooted in artistry rather than noise. Equal parts Top Model pedigree and cinematic travel diary; development continues as we assemble partners and locales.",
    ],
    media: {
      kind: "video",
      poster:
        "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1200&q=82",
    },
  },
  {
    id: "mjolnr",
    navTitle: "Mjolnr",
    tagline: "Force forged within.",
    paragraphs: [
      "Mjolnr names a forthcoming line of protein bars built for adults who resent compromise: restrained sweetness, deliberate texture, ingredient transparency, and formulations that honour both training desks and fourteen-hour flights.",
      "We aren't chasing neon packaging or mascot energy. Expect dark chocolate bitterness when it belongs, earnest protein without chalk, and a brand voice as quiet as a good hotel lobby—confident without shouting.",
      "Product and visuals are still in forge; registrations, retail, and the full story arrive when the formulation meets our standard. Until then, this imprint sits under Influent Publications as proof that utility can remain chic.",
    ],
    media: { kind: "none" },
    stubLabel: "Coming soon",
  },
];
