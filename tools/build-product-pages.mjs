import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const data = JSON.parse(readFileSync(join(root, 'data/product-details.json'), 'utf8'));
const SITE = 'https://kcaibedtech.com';
const WA = 'https://wa.me/8619065020180';
const FALLBACK = 'Contact us for details';

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const val = (v) => (v === null || v === undefined || v === '' ? FALLBACK : esc(v));
const quoteUrl = (d) => `contact.html?interest=${encodeURIComponent(d.catLabel)}&amp;model=${encodeURIComponent(d.model)}#inquiry-form`;
const pic = (name, alt, attrs = '') => `<picture><source srcset="/images/products/${name}.webp" type="image/webp"><img src="/images/products/${name}.jpg" alt="${esc(alt)}" ${attrs}></picture>`;

function render(d, { preview }) {
  const m = data.models;
  const pageUrl = `${SITE}/${preview ? `${d.id}-preview.html` : `products/${d.cat}/${d.id}/`}`;
  const ld = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: `${d.model} ${d.name}`,
    sku: d.model,
    description: d.description,
    image: `${SITE}/images/products/${d.image}.jpg`,
    brand: { '@type': 'Brand', name: 'Kang Cai' },
    category: d.catLabel,
  };
  const faq = data.common.faq;
  const next = d.next && m[d.next];
  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <meta name="theme-color" content="#071426">
  ${preview ? '<meta name="robots" content="noindex">\n  ' : ''}<meta name="description" content="${esc(d.description)}">
  <meta property="og:title" content="${esc(d.seoTitle)}">
  <meta property="og:description" content="${esc(d.description)}">
  <meta property="og:image" content="${SITE}/images/products/${d.image}.jpg">
  <meta property="og:url" content="${pageUrl}">
  <meta property="og:type" content="product">
  <title>${esc(d.seoTitle)}</title>
  <link rel="canonical" href="${pageUrl}">
  <link rel="icon" href="favicon.svg" type="image/svg+xml">
  <link rel="stylesheet" href="assets/css/styles.css">
  <link rel="stylesheet" href="assets/css/phase-one.css">
  <script type="application/ld+json">${JSON.stringify(ld)}</script>
</head>
<body class="kc-pd-page">
  <header class="site-header" data-site-header></header>

  <main>
    <nav class="kc-container kc-pd-crumbs" aria-label="Breadcrumb">
      <a href="index.html">Home</a><span aria-hidden="true">›</span><a href="products.html">Products</a><span aria-hidden="true">›</span><a href="/products/${d.cat}/">${esc(d.catLabel)}</a><span aria-hidden="true">›</span><span aria-current="page">${esc(d.model)}</span>
    </nav>

    <section class="kc-pd-hero">
      <div class="kc-container kc-pd-hero-grid">
        <div class="kc-pd-media">${pic(d.image, d.imageAlt, 'width="1307" height="654" fetchpriority="high"')}</div>
        <div class="kc-pd-info">
          <p class="kc-pd-meta"><span>${esc(d.catLabel)}</span><span class="kc-pd-level">${esc(d.level)}</span></p>
          <h1>${esc(d.model)} ${esc(d.name)}</h1>
          <p class="kc-pd-lead">${esc(d.lead)}</p>
          <p class="kc-pd-bestfor"><strong>Best for</strong> ${esc(d.bestFor)}</p>
          <dl class="kc-pd-keyspecs">
            ${d.keySpecs.map(([k, v]) => `<div><dt>${esc(k)}</dt><dd>${val(v)}</dd></div>`).join('\n            ')}
          </dl>
          <div class="kc-actions">
            <a class="kc-btn kc-btn-primary" href="${quoteUrl(d)}">Request a ${esc(d.model)} B2B Quote</a>
            <a class="kc-btn kc-btn-secondary" href="${WA}" target="_blank" rel="noopener">Contact on WhatsApp</a>
          </div>
          <p class="kc-pd-disclaimer">Specifications, functions, materials and customization options may vary by model, order requirements and target market. Final details are confirmed in the quotation and specification sheet.</p>
        </div>
      </div>
    </section>

    <section class="kc-section kc-section-dark kc-pd-snapshot" aria-labelledby="pd-snapshot-title">
      <div class="kc-container">
        <h2 id="pd-snapshot-title">${esc(d.model)} procurement snapshot</h2>
        <div class="kc-pd-snap-grid">
          ${d.snapshot.map(([k, v], i) => `<div class="kc-pd-snap-cell"><span class="kc-pd-num">${String(i + 1).padStart(2, '0')}</span><p class="kc-pd-snap-label">${esc(k)}</p><p class="kc-pd-snap-value">${val(v)}</p></div>`).join('\n          ')}
        </div>
        <p class="kc-pd-footnote">Final MOQ, lead time, warranty scope, packaging and project terms are confirmed according to configuration and quotation.</p>
      </div>
    </section>

    <section class="kc-section" aria-labelledby="pd-features-title">
      <div class="kc-container">
        <div class="kc-section-head"><div><p class="kc-kicker">Product Features</p><h2 id="pd-features-title">Key features</h2></div></div>
        <div class="kc-pd-features">
          ${d.features.map(([t, x], i) => `<article class="kc-pd-feature"><span class="kc-pd-num">${String(i + 1).padStart(2, '0')}</span><h3>${esc(t)}</h3><p>${esc(x)}</p></article>`).join('\n          ')}
        </div>
      </div>
    </section>

    <section class="kc-section kc-section-soft" aria-labelledby="pd-specs-title">
      <div class="kc-container">
        <div class="kc-section-head"><div><p class="kc-kicker">Technical Specifications</p><h2 id="pd-specs-title">Specifications</h2></div><p>Confirmed structure, functions and sizes. Items marked “${FALLBACK}” are provided on request.</p></div>
        <dl class="kc-pd-specs">
          ${d.specs.map(([k, v]) => `<div><dt>${esc(k)}</dt><dd>${val(v)}</dd></div>`).join('\n          ')}
        </dl>
      </div>
    </section>

    <section class="kc-section" aria-labelledby="pd-steps-title">
      <div class="kc-container">
        <div class="kc-section-head"><div><p class="kc-kicker">From Configuration to Shipment</p><h2 id="pd-steps-title">How a ${esc(d.model)} order works</h2></div></div>
        <ol class="kc-pd-steps">
          ${data.common.steps.map(([t, x], i) => `<li><span class="kc-pd-num">${String(i + 1).padStart(2, '0')}</span><h3>${esc(t)}</h3><p>${esc(x)}</p></li>`).join('\n          ')}
        </ol>
      </div>
    </section>

    <section class="kc-section kc-section-soft" aria-labelledby="pd-faq-title">
      <div class="kc-container">
        <div class="kc-section-head"><div><p class="kc-kicker">Buyer Questions</p><h2 id="pd-faq-title">${esc(d.model)} B2B buyer questions</h2></div></div>
        <div class="kc-pd-faq">
          ${faq.map((f, i) => `<details${i === 0 ? ' open' : ''}><summary>${esc(f.q)}</summary><p>${esc(f.a)}</p></details>`).join('\n          ')}
        </div>
      </div>
    </section>

    <section class="kc-cta">
      <div class="kc-container"><p class="kc-kicker">Build Your Program</p><h2>Build your ${esc(d.model)} B2B program</h2><p>Share your market, size, quantity and control requirements. We can confirm the ${esc(d.model)} specification before quotation.</p><div class="kc-actions"><a class="kc-btn kc-btn-primary" href="${quoteUrl(d)}">Request a ${esc(d.model)} B2B Quote</a><a class="kc-btn kc-btn-secondary" href="${WA}" target="_blank" rel="noopener">Contact on WhatsApp</a></div></div>
    </section>

    <section class="kc-section" aria-labelledby="pd-related-title">
      <div class="kc-container">
        <div class="kc-section-head"><div><p class="kc-kicker">Related Models</p><h2 id="pd-related-title">Compare other ${esc(d.catLabel)}</h2></div></div>
        <div class="kc-pd-related">
          ${d.related.map((id) => { const r = m[id]; return `<article class="kc-pd-related-card"><a class="kc-pd-related-media" href="/products/${d.cat}/${id.toLowerCase()}/" tabindex="-1" aria-hidden="true">${pic(r.image, '', 'width="1300" height="700" loading="lazy"')}</a><div><p class="kc-pd-related-code">${esc(id)}</p><h3>${esc(r.name)}</h3><p>${esc(r.blurb)}</p><a class="kc-inline-link" href="/products/${d.cat}/${id.toLowerCase()}/" aria-label="View ${esc(id)} specifications">View ${esc(id)} specifications</a></div></article>`; }).join('\n          ')}
        </div>
        ${next ? `<p class="kc-pd-next"><a class="kc-inline-link" href="/products/${d.cat}/${d.next.toLowerCase()}/">Next: ${esc(d.next)} ${esc(next.name)} →</a></p>` : ''}
      </div>
    </section>
  </main>

  <footer class="site-footer"></footer>
  <div class="floating-contact" data-floating-contact></div>
  <script src="assets/js/site-config.js"></script>
  <script src="assets/js/brand-shell.js"></script>
  <script src="assets/js/main.js" defer></script>
</body>
</html>
`;
}

const preview = !process.argv.includes('--live');
const only = process.argv.find((a) => /^[A-Z]{2}\d{3}/.test(a));
for (const [sku, d] of Object.entries(data.details)) {
  if (only && sku !== only) continue;
  const out = preview ? `${d.id}-preview.html` : `products/${d.cat}/${d.id}/index.html`;
  writeFileSync(join(root, out), render(d, { preview }));
  console.log('wrote', out);
}
