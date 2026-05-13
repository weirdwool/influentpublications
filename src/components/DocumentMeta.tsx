import { useEffect } from "react";
import {
  SITE_DEFAULT_DESCRIPTION,
  SITE_NAME,
  absoluteUrl,
  pageTitle,
} from "../data/seoConfig";

function setMeta(attr: "name" | "property", key: string, content: string): void {
  const sel = `meta[${attr}="${key}"]`;
  let el = document.head.querySelector(sel);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function setLinkCanonical(href: string): void {
  let el = document.head.querySelector('link[rel="canonical"]');
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", "canonical");
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
}

interface DocumentMetaProps {
  /** Short page title (brand is appended unless it already includes the site name) */
  title: string;
  description?: string;
  /** Path only, e.g. `/` or `/subscribe` or `/article/slug` */
  path: string;
  /** Absolute or site-root image URL for Open Graph / Twitter */
  imageUrl?: string;
  ogType?: "website" | "article";
  /** If true, ask crawlers not to index (preview/staging) */
  noIndex?: boolean;
  /** Optional JSON-LD object (injected as one script tag) */
  jsonLd?: Record<string, unknown>;
}

/**
 * Updates document title and meta/link tags after navigation (SPA).
 * Base tags also exist in index.html for first paint.
 */
export default function DocumentMeta({
  title,
  description = SITE_DEFAULT_DESCRIPTION,
  path,
  imageUrl,
  ogType = "website",
  noIndex = false,
  jsonLd,
}: DocumentMetaProps): null {
  const canonical = absoluteUrl(path);
  const docTitle = title.includes(SITE_NAME) ? title : pageTitle(title);

  useEffect(() => {
    document.title = docTitle;
    setMeta("name", "description", description);
    setLinkCanonical(canonical);

    if (noIndex) {
      setMeta("name", "robots", "noindex, nofollow");
    } else {
      setMeta("name", "robots", "index, follow, max-image-preview:large, max-snippet:-1");
    }

    setMeta("property", "og:site_name", SITE_NAME);
    setMeta("property", "og:title", docTitle);
    setMeta("property", "og:description", description);
    setMeta("property", "og:url", canonical);
    setMeta("property", "og:type", ogType);
    setMeta("property", "og:locale", "en_US");

    if (imageUrl) {
      const img = imageUrl.startsWith("http") ? imageUrl : absoluteUrl(imageUrl);
      setMeta("property", "og:image", img);
      setMeta("property", "og:image:alt", docTitle);
    }

    setMeta("name", "twitter:card", imageUrl ? "summary_large_image" : "summary");
    setMeta("name", "twitter:title", docTitle);
    setMeta("name", "twitter:description", description);
    if (imageUrl) {
      const img = imageUrl.startsWith("http") ? imageUrl : absoluteUrl(imageUrl);
      setMeta("name", "twitter:image", img);
    }

    const ldId = "document-meta-jsonld";
    if (jsonLd) {
      let script = document.getElementById(ldId) as HTMLScriptElement | null;
      if (!script) {
        script = document.createElement("script");
        script.id = ldId;
        script.type = "application/ld+json";
        document.head.appendChild(script);
      }
      script.textContent = JSON.stringify(jsonLd);
    } else {
      document.getElementById(ldId)?.remove();
    }
  }, [docTitle, description, canonical, imageUrl, ogType, noIndex, jsonLd]);

  return null;
}

