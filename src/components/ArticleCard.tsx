import { Link } from "react-router-dom";
import type { Article, ArticleCardVariant } from "../types";
import { optimizedImageUrl } from "../utils/optimizedImageUrl";

interface ArticleCardProps {
  article: Article;
  variant?: ArticleCardVariant;
}

export default function ArticleCard({
  article,
  variant = "default",
}: ArticleCardProps): React.ReactElement {
  const date = new Date(article.publishDate).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  if (variant === "hero") {
    return (
      <Link
        to={`/article/${article.id}`}
        className="block relative w-full h-[75vh] min-h-[500px] max-h-[800px] overflow-hidden"
      >
        <div className="absolute inset-0">
          <img
            src={optimizedImageUrl(article.image, 1920)}
            alt={article.title}
            loading="eager"
            decoding="async"
            fetchPriority="high"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent" />
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-8 text-white max-w-[720px]">
          <span className="inline-block text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-stone-300 border border-white/40 rounded-sm px-3 py-1">
            {article.category}
          </span>
          <h1 className="font-serif text-3xl font-semibold leading-tight mt-3 mb-4 tracking-tight">
            {article.title}
          </h1>
          <p className="text-base font-light leading-relaxed opacity-85 mb-4">
            {article.subtitle}
          </p>
          <div className="flex items-center gap-2 text-sm text-white/70">
            <span>{article.author}</span>
            <span className="opacity-40">·</span>
            <span>{date}</span>
            <span className="opacity-40">·</span>
            <span>{article.readTime}</span>
          </div>
        </div>
      </Link>
    );
  }

  if (variant === "featured") {
    return (
      <Link
        to={`/article/${article.id}`}
        className="flex flex-col bg-white border border-stone-100"
      >
        <div className="relative overflow-hidden aspect-video">
          <img
            src={optimizedImageUrl(article.image, 960)}
            alt={article.title}
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="p-7 flex flex-col gap-2.5 flex-1">
          <span className="inline-block text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-stone-500 border border-stone-300 rounded-sm px-3 py-1 w-fit">
            {article.category}
          </span>
          <h2 className="font-serif text-xl font-medium leading-snug tracking-tight">
            {article.title}
          </h2>
          <p className="text-sm text-stone-500 leading-relaxed line-clamp-3">
            {article.excerpt}
          </p>
          <div className="flex items-center gap-2 text-sm text-stone-500 mt-auto">
            <span>{article.author}</span>
            <span className="opacity-40">·</span>
            <span>{date}</span>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link
      to={`/article/${article.id}`}
      className="flex flex-col bg-white border border-stone-100"
    >
      <div className="relative overflow-hidden aspect-[16/10]">
        <img
          src={optimizedImageUrl(article.image, 800)}
          alt={article.title}
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-6 flex flex-col gap-2.5 flex-1">
        <span className="inline-block text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-stone-500 border border-stone-300 rounded-sm px-3 py-1 w-fit">
          {article.category}
        </span>
        <h3 className="font-serif text-lg font-medium leading-snug tracking-tight">
          {article.title}
        </h3>
        <div className="flex items-center gap-2 text-sm text-stone-500 mt-auto">
          <span>{article.author}</span>
          <span className="opacity-40">·</span>
          <span>{date}</span>
        </div>
      </div>
    </Link>
  );
}
