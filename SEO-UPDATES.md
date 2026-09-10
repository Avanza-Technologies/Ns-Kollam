# SEO updates

Implemented the technical foundation from the September 2026 SEO master plan for the existing homepage, cyber security and digital marketing pages.

- Shared page metadata drives titles, descriptions, canonicals, social previews and robots rules.
- Production builds prerender actual React page content and generate route directories so known pages do not depend on the GitHub Pages 404 fallback.
- Existing course URLs remain canonical; aliases retain equivalent content and canonicalize to the existing preferred URL. No URL migration or HTTP 301 is claimed. GitHub Pages requires a different hosting/edge configuration for configurable HTTP redirects.
- Homepage and course headings identify their local search intent. Course pages have visible breadcrumbs and corresponding schema.
- Structured data describes the organization and the relevant course without synthetic FAQs or ranking claims.
- Exam pages and unknown routes use noindex; the generated sitemap contains only the three canonical public pages. Crawling remains allowed so crawlers can see noindex.
- Static content remains available before JavaScript; the existing client root renders the interactive application after load.

Validation: npm run build and npm run check:seo pass. The new SEO files pass oxlint. Full-project lint has an existing conditional hook error in src/networkz/components/SectionBlock.jsx and existing warnings.

Remaining plan work requires a separate content/account rollout: verified course curricula and new landing pages, trainer and placement stories, business profile management, Search Console verification/submission, GA4 property configuration, conversion attribution, and field performance measurement. Existing marketing claims in the wider page content should be verified by the business owner. No account settings or live deployment were changed.

Reference: https://developers.google.com/search/docs/crawling-indexing/javascript/javascript-seo-basics


## Expanded Kollam course coverage

The catalog now has 23 additional dedicated course pages, an all-courses directory and a combined internship page. All 31 catalog entries link to a relevant canonical destination. Cybersecurity/ethical hacking and digital marketing/AI marketing keep their existing combined landing pages. Four internship durations share one comparison page.

The new pages use the existing catalog topics, durations and levels, with enquiry links and Kollam campus details. They do not invent prices, instructors, placement results or additional services. Titles, descriptions, structured data, static HTML and sitemap generation cover these pages. Homepage card titles link to their course destination; the all-courses directory exposes every course regardless of homepage filter state.

Validation: production build, SEO checks across 35 generated documents, and focused lint pass. Existing full-project lint issues remain outside this change. Updates remain local until deployed.
