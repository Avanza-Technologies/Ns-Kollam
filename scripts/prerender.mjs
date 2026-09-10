import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { createServer } from 'vite';
import { pages, aliases, getSeo, schemaFor } from '../src/seo/pages.js';
const escape = value => value.replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');
const template = readFileSync('dist/index.html', 'utf8');
const server = await createServer({ server: { middlewareMode: true }, appType: 'custom' });
try {
  const { render } = await server.ssrLoadModule('/src/seo/render.jsx');
  for (const pathname of [...Object.keys(pages), ...Object.keys(aliases), '/exam', '/404']) {
    const page = getSeo(pathname);
    let html = template.replace(/<title>.*?<\/title>/s, `<title>${escape(page.title)}</title>`);
    const values = { description: page.description, robots: page.robots, 'twitter:title': page.title, 'twitter:description': page.description, 'og:title': page.title, 'og:description': page.description, 'og:url': page.canonical };
    for (const [key, value] of Object.entries(values)) html = html.replace(new RegExp(`(<meta (?:name|property)="${key}" content=")[^"]*`), (_, prefix) => prefix + escape(value));
    html = html.replace(/(<link rel="canonical" href=")[^"]*/, (_, prefix) => prefix + escape(page.canonical));
    const schema = schemaFor(pathname);
    html = html.replace(/<script id="seo-schema" type="application\/ld\+json">.*?<\/script>/s, schema ? `<script id="seo-schema" type="application/ld+json">${JSON.stringify(schema).replaceAll('<', '\\u003c')}</script>` : '');
    html = html.replace('<div id="root"></div>', () => `<div id="root">${render(pathname)}</div>`);
    const file = pathname === '/404' ? 'dist/404.html' : pathname === '/' ? 'dist/index.html' : `dist${pathname}/index.html`;
    mkdirSync(file.slice(0, file.lastIndexOf('/')), { recursive: true });
    writeFileSync(file, html);
  }
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${Object.keys(pages).map(path => `  <url><loc>${getSeo(path).canonical}</loc></url>`).join('\n')}\n</urlset>\n`;
  writeFileSync('dist/sitemap.xml', sitemap);
  console.log('Prerendered public pages, aliases, exam and 404; generated canonical sitemap.');
} finally { await server.close(); }
