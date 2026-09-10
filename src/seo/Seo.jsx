import { useLayoutEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { getSeo, schemaFor } from './pages.js';
export default function Seo() {
  const { pathname } = useLocation();
  useLayoutEffect(() => {
    const page = getSeo(pathname);
    document.title = page.title;
    const set = (selector, attribute, value) => {
      const element = document.querySelector(selector);
      if (element) element.setAttribute(attribute, value);
    };
    set('link[rel="canonical"]', 'href', page.canonical);
    for (const [name, value] of Object.entries({ description: page.description, robots: page.robots, 'twitter:title': page.title, 'twitter:description': page.description })) set(`meta[name="${name}"]`, 'content', value);
    for (const [name, value] of Object.entries({ 'og:title': page.title, 'og:description': page.description, 'og:url': page.canonical })) set(`meta[property="${name}"]`, 'content', value);
    document.getElementById('seo-schema')?.remove();
    const schema = schemaFor(pathname);
    if (schema) {
      const script = document.createElement('script');
      script.id = 'seo-schema'; script.type = 'application/ld+json'; script.textContent = JSON.stringify(schema);
      document.head.appendChild(script);
    }
  }, [pathname]);
  return null;
}
