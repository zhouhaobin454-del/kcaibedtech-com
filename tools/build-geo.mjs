// Applies the SEO / GEO structure to every blog article and regenerates llms.txt. Idempotent.
// Per article: key-takeaways summary, optional comparison table, visible FAQ + FAQPage schema,
// corrected breadcrumb, dateModified, rebuilt table of contents.
// Run: node tools/build-geo.mjs
import { readFileSync, writeFileSync, readdirSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { geo, MODIFIED } from './article-geo.mjs';
import { CATS } from './sku-data.mjs';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const SITE = 'https://kcaibedtech.com';
const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const unesc = (s) => s.replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#39;/g, "'");
const ldJson = (obj) => JSON.stringify(obj).replace(/</g, '\\u003c');
const longDate = (iso) => new Date(iso + 'T00:00:00Z').toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' });

const takeawaysHtml = (items) => `<aside class="article-quick-answer">
            <div class="quick-answer-label">Key takeaways</div>
            <ul>
${items.map((t) => `              <li>${esc(t)}</li>`).join('\n')}
            </ul>
          </aside>`;

const tableHtml = ({ head, rows }) => `<!--geo:glance-->
      <h2 id="at-a-glance">At a Glance</h2>
      <div class="kc-table-wrap"><table>
        <thead><tr>${head.map((h) => `<th scope="col">${esc(h)}</th>`).join('')}</tr></thead>
        <tbody>
${rows.map((r) => `          <tr><th scope="row">${esc(r[0])}</th>${r.slice(1).map((c) => `<td>${esc(c)}</td>`).join('')}</tr>`).join('\n')}
        </tbody>
      </table></div>
      <!--/geo:glance-->
      `;

const faqHtml = (faq) => `<!--geo:faq-->
      <section class="article-faq" aria-labelledby="faq">
        <h2 id="faq">Frequently Asked Questions</h2>
${faq.map(([q, a]) => `        <h3>${esc(q)}</h3>\n        <p>${esc(a)}</p>`).join('\n')}
      </section>
      <!--/geo:faq-->
          `;

const faqSchema = (faq) => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faq.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })),
});

const slugs = readdirSync(join(root, 'blog'), { withFileTypes: true })
  .filter((d) => d.isDirectory() && existsSync(join(root, 'blog', d.name, 'index.html')))
  .map((d) => d.name);
const missing = slugs.filter((s) => !geo[s]);
if (missing.length) throw new Error(`article-geo.mjs has no entry for: ${missing.join(', ')}`);

const BODY_OPEN = '<div class="blog-content">';
const BODY_END = '<div class="blog-article-cta">';

const articles = [];
for (const slug of slugs) {
  const file = join(root, 'blog', slug, 'index.html');
  const g = geo[slug];
  let html = readFileSync(file, 'utf8');
  const eol = html.includes('\r\n') ? '\r\n' : '\n';
  html = html.replace(/\r\n/g, '\n');

  // key takeaways
  html = html.replace(/<aside class="article-quick-answer">[\s\S]*?<\/aside>/, () => takeawaysHtml(g.takeaways));

  // comparison table (before the first h2 of the body) and FAQ (end of the body)
  html = html.replace(/<!--geo:glance-->[\s\S]*?<!--\/geo:glance-->\s*/, '');
  html = html.replace(/<!--geo:faq-->[\s\S]*?<!--\/geo:faq-->\s*/, '');
  if (g.table) {
    const h2 = html.indexOf('<h2', html.indexOf(BODY_OPEN));
    html = html.slice(0, h2) + tableHtml(g.table) + html.slice(h2);
  }
  html = html.replace(/(\s*)<\/div>(\s*<div class="blog-article-cta">)/, (_, sp, rest) => `\n      ${faqHtml(g.faq).trimEnd()}\n          </div>${rest}`);

  // table of contents rebuilt from the body headings
  const body = html.slice(html.indexOf(BODY_OPEN), html.indexOf(BODY_END));
  const toc = [...body.matchAll(/<h2 id="([^"]+)">([\s\S]*?)<\/h2>/g)].map((m) => `<li><a href="#${m[1]}">${m[2].replace(/<[^>]+>/g, '')}</a></li>`).join('');
  html = html.replace(/(<aside class="article-toc">[\s\S]*?<ul>\s*)[\s\S]*?(\s*<\/ul>)/, (_, a, b) => `${a}${toc}${b}`);

  // schema: breadcrumb target, BlogPosting freshness fields, FAQPage
  html = html.replace('"item":"https://kcaibedtech.com/blog/"', `"item":"${SITE}/news.html"`);
  html = html.replace(/  <script type="application\/ld\+json" data-geo="faq">[\s\S]*?<\/script>\n/, '');
  const section = unesc((html.match(/<meta property="article:section" content="([^"]*)"/) || [])[1] || 'News');
  const words = body.replace(/<[^>]+>/g, ' ').split(/\s+/).filter(Boolean).length;
  html = html.replace(/<script type="application\/ld\+json">(\{"@context":"https:\/\/schema\.org","@type":"BlogPosting"[\s\S]*?)<\/script>/, (_, json) => {
    const post = JSON.parse(json);
    post.dateModified = MODIFIED;
    post.inLanguage = 'en';
    post.articleSection = section;
    post.wordCount = words;
    return `<script type="application/ld+json">${ldJson(post)}</script>`;
  });
  html = html.replace(/(\n)(  <link rel="stylesheet" href="\/assets\/css\/styles\.css)/, `$1  <script type="application/ld+json" data-geo="faq">${ldJson(faqSchema(g.faq))}</script>\n$2`);

  // modified date: meta tag and visible byline
  html = html.replace(/\n  <meta property="article:modified_time" content="[^"]*">/, '');
  html = html.replace(/(<meta property="article:published_time" content="[^"]*">)/, `$1\n  <meta property="article:modified_time" content="${MODIFIED}">`);
  html = html.replace(/(<p class="blog-meta">By [^<]*· Published <time datetime="[^"]*">[^<]*<\/time>)(?: · Updated <time[^>]*>[^<]*<\/time>)?/, `$1 · Updated <time datetime="${MODIFIED}">${longDate(MODIFIED)}</time>`);

  writeFileSync(file, html.replace(/\n/g, eol));
  articles.push({
    slug,
    title: unesc((html.match(/<h1>([\s\S]*?)<\/h1>/) || [])[1] || slug).replace(/<[^>]+>/g, '').trim(),
    desc: unesc((html.match(/<meta name="description" content="([^"]*)"/) || [])[1] || ''),
  });
}

// sitemap lastmod for articles
const smPath = join(root, 'sitemap.xml');
let sm = readFileSync(smPath, 'utf8');
for (const { slug } of articles) {
  const re = new RegExp(`(<loc>${SITE}/blog/${slug}/</loc>)<lastmod>[^<]*</lastmod>`);
  sm = sm.replace(re, `$1<lastmod>${MODIFIED}</lastmod>`);
}
writeFileSync(smPath, sm);

// llms.txt
const lines = [
  '# Kang Cai Smart Sleep',
  '',
  '> Kang Cai Smart Sleep Co., Ltd. is an OEM / ODM manufacturer of adjustable bed frames, smart beds, adjustable mattresses, leisure chairs and bed bases for global brands, distributors and project buyers. Based in Shatian Town, Dongguan, Guangdong, China. The site is written for B2B buyers; unpublished specification values are shown as "Contact us for details".',
  '',
  '## Products',
  ...Object.values(CATS).map((c) => `- [${c.label}](${SITE}/products/${c.slug}/): ${c.bestFor}`),
  `- [All models](${SITE}/products/all/): every model with key specifications`,
  '',
  '## Buyer guides',
  ...articles.sort((a, b) => a.slug.localeCompare(b.slug)).map((a) => `- [${a.title}](${SITE}/blog/${a.slug}/): ${a.desc}`),
  `- [OEM sourcing guide](${SITE}/sourcing/): step-by-step OEM / ODM sourcing process`,
  `- [FAQ](${SITE}/faq/): common buyer questions`,
  '',
  '## Company and contact',
  `- [About](${SITE}/about.html)`,
  `- [Contact and inquiry form](${SITE}/contact.html)`,
  `- [News](${SITE}/news.html)`,
  '- WhatsApp: +86 190 6502 0180',
  '',
];
writeFileSync(join(root, 'llms.txt'), lines.join('\n'));
console.log(`GEO structure applied to ${articles.length} articles; llms.txt written`);
