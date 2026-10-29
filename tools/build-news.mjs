// Rebuilds the article grid in news.html from the metadata of every blog/<slug>/index.html,
// so /news.html is the single news hub. Run: node tools/build-news.mjs
import { readFileSync, writeFileSync, readdirSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const unesc = (s) => s.replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#39;/g, "'");
const meta = (html, re) => (html.match(re) || [])[1] || '';

const articles = readdirSync(join(root, 'blog'), { withFileTypes: true })
  .filter((d) => d.isDirectory() && existsSync(join(root, 'blog', d.name, 'index.html')))
  .map((d) => {
    const html = readFileSync(join(root, 'blog', d.name, 'index.html'), 'utf8');
    const image = meta(html, /<meta property="og:image" content="https:\/\/kcaibedtech\.com([^"]+)"/);
    return {
      slug: d.name,
      title: unesc(meta(html, /<h1>([\s\S]*?)<\/h1>/)).replace(/<[^>]+>/g, '').trim(),
      desc: unesc(meta(html, /<meta name="description" content="([^"]*)"/)),
      section: unesc(meta(html, /<meta property="article:section" content="([^"]*)"/)) || 'News',
      date: meta(html, /<meta property="article:published_time" content="([^"]*)"/),
      image,
      alt: unesc(meta(html, /<meta property="og:image:alt" content="([^"]*)"/)),
    };
  })
  .sort((a, b) => b.date.localeCompare(a.date) || a.slug.localeCompare(b.slug));

const fmt = (iso) => new Date(iso + 'T00:00:00Z').toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' });
const card = (a) => `        <article class="kc-news-card"><a class="kc-news-card-media" href="/blog/${a.slug}/" tabindex="-1" aria-hidden="true"><img src="${esc(a.image)}" alt="${esc(a.alt)}" loading="lazy"></a><div class="kc-news-card-body"><span class="kc-news-meta">${esc(a.section)}${a.date ? ` · ${fmt(a.date)}` : ''}</span><h2><a href="/blog/${a.slug}/">${esc(a.title)}</a></h2><p>${esc(a.desc)}</p><a class="kc-inline-link" href="/blog/${a.slug}/" aria-label="Read ${esc(a.title)}">Read article</a></div></article>`;

const file = join(root, 'news.html');
const html = readFileSync(file, 'utf8').replace(/\r\n/g, '\n');
const next = html.replace(/<div class="kc-news-grid">[\s\S]*?<\/div>\n    <\/div><\/section>/, () => `<div class="kc-news-grid">\n${articles.map(card).join('\n')}\n      </div>\n    </div></section>`);
writeFileSync(file, next);
console.log(`news.html now lists ${articles.length} articles`);
