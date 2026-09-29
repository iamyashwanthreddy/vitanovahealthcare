import { useEffect } from 'react';

/**
 * Lightweight, dependency-free SEO helper.
 * Sets document.title, meta description, canonical URL and Open Graph tags.
 */
function setMeta(attr, key, content) {
  if (!content) return;
  let el = document.head.querySelector(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

export default function useDocumentMeta({ title, description, path }) {
  useEffect(() => {
    const fullTitle = title
      ? `${title} — Vitanova Health Care`
      : 'Vitanova Health Care — Compassionate Home & Social Care in Ireland';
    document.title = fullTitle;

    if (description) {
      setMeta('name', 'description', description);
      setMeta('property', 'og:description', description);
    }
    setMeta('property', 'og:title', fullTitle);

    const origin =
      typeof window !== 'undefined' ? window.location.origin : '';
    const url = path ? `${origin}${path}` : origin;

    // canonical
    let link = document.head.querySelector('link[rel="canonical"]');
    if (!link) {
      link = document.createElement('link');
      link.setAttribute('rel', 'canonical');
      document.head.appendChild(link);
    }
    link.setAttribute('href', url);
    setMeta('property', 'og:url', url);
  }, [title, description, path]);
}
