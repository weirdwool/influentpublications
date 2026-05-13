export interface TravelerMagazine {
  title: string;
  link: string;
  /** Magazine cover artwork — preferred for the home hero so it reads as an issue */
  coverImage?: string;
  /** Main editorial / hero image for the issue (optional; not used for the home tile) */
  mainImage?: string;
  /** Legacy single image when API does not split cover vs main */
  image?: string;
  /** e.g. "Vol. 12" or "Spring 2026" */
  issueNumber?: string;
  excerpt?: string;
}

export interface TravelerFeedPost {
  title: string;
  link: string;
  image: string;
  excerpt?: string;
  /** ISO or parseable date string */
  date?: string;
  publishedAt?: string;
}

/** Legacy flat article shape (magazine + posts share fields) */
export interface TravelerLatestArticle extends TravelerMagazine {
  excerpt?: string;
  date?: string;
  publishedAt?: string;
}
