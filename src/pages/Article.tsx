import { useParams, Link } from "react-router-dom";
import ArticleCard from "../components/ArticleCard";
import DocumentMeta from "../components/DocumentMeta";
import { getArticleById, getLatestArticles } from "../data/articles";
import { absoluteUrl } from "../data/seoConfig";
import { optimizedImageUrl } from "../utils/optimizedImageUrl";
import { getPublicationById } from "../data/siteConfig";

export default function Article(): React.ReactElement {
  const { id } = useParams<{ id: string }>();
  const article = getArticleById(id);

  if (!article) {
    return (
      <div className="text-center py-24 px-8">
        <DocumentMeta
          title="Article not found"
          description="The requested article could not be found on Influent Publications."
          path={id ? `/article/${id}` : "/article"}
          noIndex
        />
        <h1 className="font-serif text-3xl mb-3">Article Not Found</h1>
        <p className="text-stone-500 mb-8">The article you're looking for doesn't exist.</p>
        <Link
          to="/"
          className="inline-block px-8 py-3 text-xs font-semibold uppercase tracking-[0.15em] border border-stone-900 hover:bg-stone-900 hover:text-white transition-colors"
        >
          Return Home
        </Link>
      </div>
    );
  }

  const date = new Date(article.publishDate).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const related = getLatestArticles(4)
    .filter((a) => a.id !== article.id)
    .slice(0, 3);
  const publication = article.publication ? getPublicationById(article.publication) : null;

  return (
    <article className="max-w-6xl mx-auto px-8">
      <DocumentMeta
        title={article.title}
        description={article.excerpt || article.subtitle}
        path={`/article/${article.id}`}
        imageUrl={article.image}
        ogType="article"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: article.title,
          description: article.excerpt || article.subtitle,
          datePublished: article.publishDate,
          author: { "@type": "Person", name: article.author },
          image: article.image.startsWith("http")
            ? article.image
            : absoluteUrl(article.image),
        }}
      />
      <header className="max-w-3xl mx-auto text-center py-8 pb-10">
        {publication && (
          <a
            href={publication.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block text-[0.7rem] font-medium uppercase tracking-[0.12em] text-stone-500 mb-2 hover:text-stone-900 transition-colors"
          >
            From {publication.name}
          </a>
        )}
        <span className="inline-block text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-stone-500 border border-stone-300 rounded-sm px-3 py-1 mb-4">
          {article.category}
        </span>
        <h1 className="font-serif text-3xl font-semibold leading-tight mt-4 mb-4 tracking-tight">
          {article.title}
        </h1>
        <p className="text-lg text-stone-500 font-light leading-relaxed mb-6">
          {article.subtitle}
        </p>
        <div className="flex justify-center items-center gap-2 text-stone-500">
          <span>By {article.author}</span>
          <span className="opacity-40">·</span>
          <span>{date}</span>
          <span className="opacity-40">·</span>
          <span>{article.readTime}</span>
        </div>
      </header>

      <div className="w-full max-h-[560px] overflow-hidden mb-12">
        <img
          src={optimizedImageUrl(article.image, 1400)}
          alt={article.title}
          decoding="async"
          fetchPriority="high"
          className="w-full h-full object-cover max-h-[560px]"
        />
      </div>

      <div
        className="max-w-3xl mx-auto mb-16 article-prose text-lg leading-relaxed text-stone-600"
        dangerouslySetInnerHTML={{ __html: article.content }}
      />

      {related.length > 0 && (
        <section className="border-t border-stone-200 pt-12 mt-8">
          <div className="mb-10">
            <h2 className="font-serif text-2xl font-medium tracking-tight mb-3">
              Continue Reading
            </h2>
            <div className="w-12 h-px bg-stone-400" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {related.map((a) => (
              <ArticleCard key={a.id} article={a} />
            ))}
          </div>
        </section>
      )}
    </article>
  );
}
