/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Canonical origin for SEO (no trailing slash), e.g. https://www.influentpublications.com */
  readonly VITE_SITE_ORIGIN?: string;
}
