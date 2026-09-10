import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { catalog, coursePages } from '../src/seo/catalog.js';
import { pages, aliases, getSeo } from '../src/seo/pages.js';
for (const path of [...Object.keys(pages), ...Object.keys(aliases), '/exam', '/404']) {
  const html = readFileSync(path === '/404' ? 'dist/404.html' : path === '/' ? 'dist/index.html' : `dist${path}/index.html`, 'utf8');
  const seo = getSeo(path);
  assert.equal((html.match(/<title>/g) || []).length, 1, path);
  assert.equal((html.match(/rel="canonical"/g) || []).length, 1, path);
  assert.ok(html.includes(`href="${seo.canonical}"`), path);
  assert.ok(html.includes(`name="robots" content="${seo.robots}"`), path);
  for (const match of html.matchAll(/<script[^>]*type="application\/ld\+json"[^>]*>(.*?)<\/script>/gs)) JSON.parse(match[1]);
  if (!seo.robots.startsWith('noindex')) {
    assert.equal((html.match(/<h1[\s>]/g) || []).length, 1, path);
    assert.ok(html.includes('href="/'), `Missing crawlable links: ${path}`);
    assert.ok(html.includes('<h1') && html.includes('Kollam'), `Missing prerendered page content: ${path}`);
  }
}
const sitemap = readFileSync('dist/sitemap.xml', 'utf8');
assert.equal((sitemap.match(/<loc>/g) || []).length, Object.keys(pages).length);
assert.ok(!sitemap.includes('/exam'));
console.log(`SEO checks passed for ${Object.keys(pages).length + Object.keys(aliases).length + 2} generated documents.`);

const directory = readFileSync('dist/courses/index.html', 'utf8');
for (const course of catalog) {
  assert.ok(pages[course.path], `Missing destination: ${course.id}`);
  assert.ok(directory.includes(`href="${course.path}"`), `Missing directory link: ${course.id}`);
}
for (const [path, course] of Object.entries(coursePages)) {
  const html = readFileSync(`dist${path}/index.html`, 'utf8');
  assert.ok(html.includes(course.duration), `Missing duration: ${path}`);
  assert.ok(html.includes('918089030405'), `Missing enquiry: ${path}`);
  assert.ok(sitemap.includes(getSeo(path).canonical), `Missing sitemap entry: ${path}`);
}
assert.equal(new Set(Object.values(pages).map(page => page.title)).size, Object.keys(pages).length, 'Duplicate page titles');
console.log(`All ${catalog.length} catalog entries have crawlable destinations and all new course pages have duration, contact and sitemap coverage.`);
