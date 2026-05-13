export interface Publication {
  id: string;
  name: string;
  url: string;
  tagline: string;
  description: string;
}

export interface Article {
  id: string;
  publication?: string;
  title: string;
  subtitle: string;
  category: string;
  author: string;
  publishDate: string;
  readTime: string;
  image: string;
  excerpt: string;
  content: string;
}

export type ArticleCardVariant = "default" | "featured" | "hero";
