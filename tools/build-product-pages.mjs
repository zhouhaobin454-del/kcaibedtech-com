import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { CATS, skus } from './sku-data.mjs';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const common = JSON.parse(readFileSync(join(root, 'data/product-details.json'), 'utf8')).common;
const imgSizes = JSON.parse(readFileSync(join(root, 'data/image-sizes.json'), 'utf8'));
const SITE = 'https://kcaibedtech.com';
const WA = 'https://wa.me/8619065020180';
const FALLBACK = 'Contact us for details';
const OEM_SCOPE = 'Available, confirmed per project';
const CUSTOM_STD = 'Size customization supported; motor brand and materials selectable';

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const val = (v) => (v === null || v === undefined || v === '' ? FALLBACK : esc(v));
const pad = (i) => String(i + 1).padStart(2, '0');

const all = skus.map((s) => ({ ...s, id: s.model.toLowerCase(), catInfo: CATS[s.cat] }));
const byModel = Object.fromEntries(all.map((s) => [s.model, s]));
const urlOf = (s) => `/products/${s.catInfo.slug}/${s.id}/`;
const imgOf = (s) => `${s.id}-catalog`;
const pic = (s, alt, attrs = '') => {
  const [w, h] = imgSizes[s.id];
  return `<picture><source srcset="/images/products/${imgOf(s)}.webp" type="image/webp"><img src="/images/products/${imgOf(s)}.jpg" alt="${esc(alt)}" width="${w}" height="${h}" ${attrs}></picture>`;
};
const quoteUrl = (s) => `contact.html?interest=${encodeURIComponent(s.catInfo.label)}&amp;model=${encodeURIComponent(s.model)}#inquiry-form`;

function featuresOf(s) {
  if (s.features) return s.features;
  const m = s.pair && byModel[s.pair];
  if (!m) return [];
  const out = [['Leather upholstered frame', `A leather-upholstered smart bed frame (${s.dims}).`]];
  out.push(['Matched mattress', `Shown with the ${m.model} ${m.name.toLowerCase()} (${m.dims}).`]);
  if (m.angles) out.push(['Adjustable positions', `${m.angles.replace('Backrest', 'Backrest lift').replace('leg rest', 'leg rest lift')}.`]);
  if (m.materials) out.push(['Mattress construction', m.materials.split(';')[0] + '.']);
  return out;
}

function keySpecsOf(s) {
  if (s.cat === 'bases') return [['Structure', s.structure], ['Available sizes', s.sizes], ['Material', s.materials], ['OEM / ODM', OEM_SCOPE]];
  if (s.cat === 'beds') {
    const m = byModel[s.pair];
    return [['Structure / material', s.structure], ['Available sizes', s.dims], ['Mattress pairing', `${m.model} electric mattress`], ['Adjustment', m.angles]];
  }
  return [['Structure', s.structure], ['Size', s.sizes || s.dims], ['Motor / drive', s.motor], ['Adjustment angles', s.angles]];
}

function snapshotOf(s) {
  const fmt = s.structure;
  if (s.cat === 'bases') return [['MOQ', null], ['Lead time', null], ['Material', s.materials], ['Available sizes', s.sizes], ['Product format', fmt], ['OEM / ODM', OEM_SCOPE]];
  const m = s.pair && byModel[s.pair];
  const format = s.cat === 'beds' ? `Upholstered frame + ${m.model} mattress` : fmt;
  return [['MOQ', null], ['Lead time', null], ['Motor', s.cat === 'beds' ? null : s.motor], ['Motor warranty', null], ['Product format', format], ['OEM / ODM', OEM_SCOPE]];
}

function specsOf(s) {
  const m = s.pair && byModel[s.pair];
  const standard = s.cat === 'frames' || s.cat === 'mattresses' || s.cat === 'chairs';
  const rows = [
    ['Model', s.model], ['Product name', s.name], ['Structure', s.structure],
    ['Product size', s.dims], ['Available sizes', s.sizes && s.sizes !== s.dims ? s.sizes : null],
    ['Motor / drive', s.motor], ['Adjustment angles', s.angles], ['Load capacity', s.load], ['Floor clearance', s.clearance],
    ['Control options', s.control], ['Functions', s.functions], ['Materials', s.materials], ['Power', s.power],
    ['Styling options', s.options], ['Mattress pairing', s.cat === 'beds' ? `${m.model} (${m.dims})` : null],
    ['Paired bed frame', s.cat === 'mattresses' && s.pair ? `${s.pair} (2000 × ${byModel[s.pair].dims.match(/× (\d+)/)[1]} mm)` : null],
    ['Application', 'Home, senior care, hotels and projects'], ['Customization', standard ? CUSTOM_STD : null],
  ];
  const needed = new Set(['Model', 'Product name', 'Structure', 'Product size', 'Customization', 'Application']);
  if (s.cat !== 'bases' && s.cat !== 'beds') ['Motor / drive', 'Adjustment angles', 'Control options'].forEach((k) => needed.add(k));
  if (s.cat === 'bases' || s.cat === 'beds') needed.add('Materials');
  return rows.filter(([k, v]) => v || needed.has(k));
}

function faqOf(s) {
  const pair = s.pair && byModel[s.pair];
  const join = (...parts) => parts.filter(Boolean).join(' ');
  const electrical = s.cat === 'bases' ? '' : 'Plug type and voltage are configured for the destination country.';
  const sizes = s.sizes ? `Listed sizes: ${s.sizes}.` : `Size shown: ${s.dims}.`;
  const compat = {
    frames: ['Which mattresses can I use with it?', 'A powered base needs a mattress that flexes with the backrest and leg lift, such as foam, latex or a flexible hybrid. Send us the mattress type and thickness and we will confirm the fit before you order.'],
    mattresses: ['How does it fit with a bed frame or board?', join(s.structure ? `Structure: ${s.structure}.` : '', pair ? `It is shown with the ${pair.model} bed frame.` : '', 'Send your bed board or frame size and we will confirm the fit.')],
    beds: ['What is included in the set?', pair && `The leather upholstered frame (${s.dims}) is shown with the ${pair.model} electric mattress (${pair.dims}). Details of what is supplied per order are confirmed in the quotation.`],
    chairs: ['What materials and finishes are available?', join(s.materials ? `${s.materials}.` : '', s.options ? `${s.options}.` : '', 'Other finishes are confirmed on request.')],
    bases: ['Which mattresses suit a slatted base?', 'Slat spacing and mattress type both affect support. Share the mattress type and the sizes you need and we will confirm the slat layout.'],
  }[s.cat];
  const src = pair && s.cat === 'beds' ? pair : s;
  const options = s.cat === 'bases'
    ? ['What materials and construction are used?', s.materials ? `${s.materials}. Structure: ${s.structure}.` : `Structure: ${s.structure}. ${FALLBACK}.`]
    : ['Which motor, control and function options are available?', join(src.motor ? `${src.motor}.` : '', src.control ? `${src.control}.` : '', src.functions ? `${src.functions}.` : '') || `${FALLBACK}.`];
  return [
    ...common.faq,
    { q: 'Which sizes and markets does it suit?', a: join(sizes, electrical, 'Tell us your target market and we will confirm the exact size and specification.') },
    { q: compat[0], a: compat[1] },
    { q: options[0], a: options[1] },
    { q: 'How is it packed and shipped?', a: join('Export packing and the loading plan are confirmed per order.', s.variants ? 'Carton sizes and weights for the listed sizes are in the table above.' : 'Carton size, weight and container loading quantity for this model are available on request.') },
  ];
}

function relatedOf(s) {
  const peers = all.filter((p) => p.cat === s.cat && p.model !== s.model);
  const idx = all.filter((p) => p.cat === s.cat).findIndex((p) => p.model === s.model);
  const ring = all.filter((p) => p.cat === s.cat);
  const next = Array.from({ length: Math.min(3, peers.length) }, (_, i) => ring[(idx + 1 + i) % ring.length]);
  const pair = s.pair ? byModel[s.pair] : null;
  return { cards: (pair ? [pair, ...next.slice(0, 2)] : next), next: ring[(idx + 1) % ring.length] };
}

function render(s) {
  const pageUrl = `${SITE}${urlOf(s)}`;
  const title = `${s.model} ${s.name} | OEM/ODM | Kang Cai`;
  const desc = `${s.lead} OEM/ODM from Kang Cai, Dongguan, China.`;
  const faqs = faqOf(s);
  const ld = [{
    '@context': 'https://schema.org', '@type': 'Product', name: `${s.model} ${s.name}`, sku: s.model, description: s.lead,
    image: `${SITE}/images/products/${imgOf(s)}.jpg`, brand: { '@type': 'Brand', name: 'Kang Cai' }, category: s.catInfo.label,
  }, {
    '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [
      ['Home', `${SITE}/`], ['Products', `${SITE}/products.html`], [s.catInfo.label, `${SITE}/products/${s.catInfo.slug}/`], [s.model, pageUrl],
    ].map(([name, item], i) => ({ '@type': 'ListItem', position: i + 1, name, item })),
  }];
  const { cards, next } = relatedOf(s);
  const features = featuresOf(s);
  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <base href="/">
  <meta name="theme-color" content="#071426">
  <meta name="description" content="${esc(desc)}">
  <meta property="og:title" content="${esc(title)}">
  <meta property="og:description" content="${esc(desc)}">
  <meta property="og:image" content="${SITE}/images/products/${imgOf(s)}.jpg">
  <meta property="og:url" content="${pageUrl}">
  <meta property="og:type" content="product">
  <title>${esc(title)}</title>
  <link rel="canonical" href="${pageUrl}">
  <link rel="icon" href="favicon.svg" type="image/svg+xml">
  <link rel="stylesheet" href="assets/css/styles.css">
  <link rel="stylesheet" href="assets/css/phase-one.css">
  <script type="application/ld+json">${JSON.stringify(ld[0])}</script>
  <script type="application/ld+json">${JSON.stringify(ld[1])}</script>
  <script type="application/ld+json">${JSON.stringify({ '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: faqs.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) })}</script>
</head>
<body class="kc-pd-page">
  <header class="site-header" data-site-header></header>

  <main>
    <nav class="kc-container kc-pd-crumbs" aria-label="Breadcrumb">
      <a href="index.html">Home</a><span aria-hidden="true">›</span><a href="products.html">Products</a><span aria-hidden="true">›</span><a href="/products/${s.catInfo.slug}/">${esc(s.catInfo.label)}</a><span aria-hidden="true">›</span><span aria-current="page">${esc(s.model)}</span>
    </nav>

    <section class="kc-pd-hero">
      <div class="kc-container kc-pd-hero-grid">
        <div class="kc-pd-media">${pic(s, `${s.model} ${s.name}`, 'fetchpriority="high"')}</div>
        <div class="kc-pd-info">
          <p class="kc-pd-meta"><span>${esc(s.catInfo.label)}</span></p>
          <h1>${esc(s.model)} ${esc(s.name)}</h1>
          <p class="kc-pd-lead">${esc(s.lead)}</p>
          <p class="kc-pd-bestfor"><strong>Best for</strong> ${esc(s.catInfo.bestFor)}</p>
          <dl class="kc-pd-keyspecs">
            ${keySpecsOf(s).map(([k, v]) => `<div><dt>${esc(k)}</dt><dd>${val(v)}</dd></div>`).join('\n            ')}
          </dl>
          <div class="kc-actions">
            <a class="kc-btn kc-btn-primary" href="${quoteUrl(s)}">Request a ${esc(s.model)} B2B Quote</a>
            <a class="kc-btn kc-btn-secondary" href="${WA}" target="_blank" rel="noopener">Contact on WhatsApp</a>
          </div>
          <p class="kc-pd-disclaimer">Specifications, functions, materials and customization options may vary by model, order requirements and target market. Final details are confirmed in the quotation and specification sheet.</p>
        </div>
      </div>
    </section>

    <section class="kc-section kc-section-dark kc-pd-snapshot" aria-labelledby="pd-snapshot-title">
      <div class="kc-container">
        <h2 id="pd-snapshot-title">${esc(s.model)} procurement snapshot</h2>
        <div class="kc-pd-snap-grid">
          ${snapshotOf(s).map(([k, v], i) => `<div class="kc-pd-snap-cell"><span class="kc-pd-num">${pad(i)}</span><p class="kc-pd-snap-label">${esc(k)}</p><p class="kc-pd-snap-value">${val(v)}</p></div>`).join('\n          ')}
        </div>
        <p class="kc-pd-footnote">Final MOQ, lead time, warranty scope, packaging and project terms are confirmed according to configuration and quotation.</p>
      </div>
    </section>

    <section class="kc-section" aria-labelledby="pd-features-title">
      <div class="kc-container">
        <div class="kc-section-head"><div><p class="kc-kicker">Product Features</p><h2 id="pd-features-title">Key features</h2></div></div>
        <div class="kc-pd-features">
          ${features.map(([t, x], i) => `<article class="kc-pd-feature"><span class="kc-pd-num">${pad(i)}</span><h3>${esc(t)}</h3><p>${esc(x)}</p></article>`).join('\n          ')}
        </div>
      </div>
    </section>

    <section class="kc-section kc-section-soft" aria-labelledby="pd-specs-title">
      <div class="kc-container">
        <div class="kc-section-head"><div><p class="kc-kicker">Technical Specifications</p><h2 id="pd-specs-title">Specifications</h2></div><p>Confirmed structure, functions and sizes. Items marked “${FALLBACK}” are provided on request.</p></div>
        <dl class="kc-pd-specs">
          ${specsOf(s).map(([k, v]) => `<div><dt>${esc(k)}</dt><dd>${val(v)}</dd></div>`).join('\n          ')}
        </dl>
${s.variants ? `        <h3 class="kc-pd-subhead">Size variants and packing</h3>
        <div class="kc-pd-table-wrap"><table class="kc-pd-table">
          <thead><tr><th scope="col">Size</th><th scope="col">Product size</th><th scope="col">Net weight</th><th scope="col">Gross weight</th><th scope="col">Carton size</th></tr></thead>
          <tbody>${s.variants.map((r) => `<tr>${r.map((c, i) => `<${i ? 'td' : 'th scope="row"'}>${esc(c)}</${i ? 'td' : 'th'}>`).join('')}</tr>`).join('')}</tbody>
        </table></div>
        <p class="kc-pd-footnote kc-pd-note">Weights and carton sizes are from production packing data and vary by size and configuration. Other sizes: ${FALLBACK.toLowerCase()}.</p>
` : ''}      </div>
    </section>

    <section class="kc-section" aria-labelledby="pd-steps-title">
      <div class="kc-container">
        <div class="kc-section-head"><div><p class="kc-kicker">From Configuration to Shipment</p><h2 id="pd-steps-title">How a ${esc(s.model)} order works</h2></div></div>
        <ol class="kc-pd-steps">
          ${common.steps.map(([t, x], i) => `<li><span class="kc-pd-num">${pad(i)}</span><h3>${esc(t)}</h3><p>${esc(x)}</p></li>`).join('\n          ')}
        </ol>
      </div>
    </section>

    <section class="kc-section kc-section-soft" aria-labelledby="pd-faq-title">
      <div class="kc-container">
        <div class="kc-section-head"><div><p class="kc-kicker">Buyer Questions</p><h2 id="pd-faq-title">${esc(s.model)} B2B buyer questions</h2></div></div>
        <div class="kc-pd-faq">
          ${faqs.map((f, i) => `<details${i === 0 ? ' open' : ''}><summary>${esc(f.q)}</summary><p>${esc(f.a)}</p></details>`).join('\n          ')}
        </div>
      </div>
    </section>

    <section class="kc-cta">
      <div class="kc-container"><p class="kc-kicker">Build Your Program</p><h2>Build your ${esc(s.model)} B2B program</h2><p>Share your market, size, quantity and control requirements. We can confirm the ${esc(s.model)} specification before quotation.</p><div class="kc-actions"><a class="kc-btn kc-btn-primary" href="${quoteUrl(s)}">Request a ${esc(s.model)} B2B Quote</a><a class="kc-btn kc-btn-secondary" href="${WA}" target="_blank" rel="noopener">Contact on WhatsApp</a></div></div>
    </section>

    <section class="kc-section" aria-labelledby="pd-related-title">
      <div class="kc-container">
        <div class="kc-section-head"><div><p class="kc-kicker">Related Models</p><h2 id="pd-related-title">Compare related models</h2></div></div>
        <div class="kc-pd-related">
          ${cards.map((r) => `<article class="kc-pd-related-card"><a class="kc-pd-related-media" href="${urlOf(r)}" tabindex="-1" aria-hidden="true">${pic(r, '', 'loading="lazy"')}</a><div><p class="kc-pd-related-code">${esc(r.model)}</p><h3>${esc(r.name)}</h3><p>${esc(r.lead)}</p><a class="kc-inline-link" href="${urlOf(r)}" aria-label="View ${esc(r.model)} specifications">View ${esc(r.model)} specifications</a></div></article>`).join('\n          ')}
        </div>
        <p class="kc-pd-next"><a class="kc-inline-link" href="${urlOf(next)}">Next: ${esc(next.model)} ${esc(next.name)} →</a> · <a class="kc-inline-link" href="/products/${s.catInfo.slug}/">All ${esc(s.catInfo.label)}</a></p>
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

const only = process.argv.find((a) => /^[A-Z]{2}\d{3}/.test(a));
for (const s of all) {
  if (only && s.model !== only) continue;
  const dir = join(root, 'products', s.catInfo.slug, s.id);
  mkdirSync(dir, { recursive: true });
  writeFileSync(join(dir, 'index.html'), render(s));
  console.log('wrote', `products/${s.catInfo.slug}/${s.id}/index.html`);
}

// ---- Listing pages: /products/<category>/ and /products/all/ ----
const card = (r) => `<article class="kc-pd-related-card"><a class="kc-pd-related-media" href="${urlOf(r)}" tabindex="-1" aria-hidden="true">${pic(r, '', 'loading="lazy"')}</a><div><p class="kc-pd-related-code">${esc(r.model)}</p><h3>${esc(r.name)}</h3><p>${esc(r.lead)}</p><a class="kc-inline-link" href="${urlOf(r)}" aria-label="View ${esc(r.model)} specifications">View ${esc(r.model)} specifications</a></div></article>`;

function renderListing({ path, title, h1, intro, groups }) {
  const url = `${SITE}${path}`;
  const ld = { '@context': 'https://schema.org', '@type': 'CollectionPage', name: title, url, description: intro };
  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <base href="/">
  <meta name="theme-color" content="#071426">
  <meta name="description" content="${esc(intro)}">
  <meta property="og:title" content="${esc(title)}">
  <meta property="og:description" content="${esc(intro)}">
  <meta property="og:url" content="${url}">
  <meta property="og:type" content="website">
  <title>${esc(title)}</title>
  <link rel="canonical" href="${url}">
  <link rel="icon" href="favicon.svg" type="image/svg+xml">
  <link rel="stylesheet" href="assets/css/styles.css">
  <link rel="stylesheet" href="assets/css/phase-one.css">
  <script type="application/ld+json">${JSON.stringify(ld)}</script>
</head>
<body class="kc-pd-page">
  <header class="site-header" data-site-header></header>

  <main>
    <nav class="kc-container kc-pd-crumbs" aria-label="Breadcrumb">
      <a href="index.html">Home</a><span aria-hidden="true">›</span><a href="products.html">Products</a><span aria-hidden="true">›</span><span aria-current="page">${esc(h1)}</span>
    </nav>
${groups.map((g, i) => `
    <section class="kc-section${i % 2 ? ' kc-section-soft' : ''}" aria-labelledby="list-${g.cat.slug}">
      <div class="kc-container">
        <div class="kc-section-head"><div><p class="kc-kicker">${g.items.length} ${g.items.length === 1 ? 'model' : 'models'}</p><h${groups.length > 1 ? 2 : 1} id="list-${g.cat.slug}">${esc(groups.length > 1 ? g.cat.label : h1)}</h${groups.length > 1 ? 2 : 1}></div><p>${groups.length > 1 ? `<a class="kc-inline-link" href="/products/${g.cat.slug}/">View ${esc(g.cat.label)}</a>` : esc(intro)}</p></div>
        <div class="kc-pd-related kc-pd-listing">
          ${g.items.map(card).join('\n          ')}
        </div>
      </div>
    </section>`).join('\n')}

    <section class="kc-cta">
      <div class="kc-container"><p class="kc-kicker">Need Product Selection Support?</p><h2>Tell us what you sell and where you sell it.</h2><p>Kang Cai can suggest a starting platform before detailed model and configuration review.</p><div class="kc-actions"><a class="kc-btn kc-btn-primary" href="contact.html?interest=Product%20Selection%20Support#inquiry-form">Ask for Product Guidance</a><a class="kc-btn kc-btn-secondary" href="${WA}" target="_blank" rel="noopener">Contact on WhatsApp</a></div></div>
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

if (!only) {
  const groups = Object.values(CATS).map((cat) => ({ cat, items: all.filter((s) => s.catInfo === cat) }));
  const intros = {
    'adjustable-bed-frames': 'Electric adjustable bed frames from Kang Cai: split, fixed, wall hugger, hanging and five-zone designs for OEM and ODM programs.',
    'smart-beds': 'Leather-upholstered smart bed frames from Kang Cai, each paired with an integrated electric mattress.',
    mattresses: 'Electric and adjustable mattresses from Kang Cai with independent backrest and leg rest lift.',
    'leisure-chairs': 'Powered zero-gravity yoga chairs from Kang Cai for wellness, lifestyle and hospitality ranges.',
    'bed-bases': 'Slatted bed bases from Kang Cai in fiberglass, solid wood, poplar and rubber-cup constructions.',
  };
  for (const g of groups) {
    const dir = join(root, 'products', g.cat.slug);
    writeFileSync(join(dir, 'index.html'), renderListing({ path: `/products/${g.cat.slug}/`, title: `${g.cat.label} | OEM/ODM | Kang Cai`, h1: g.cat.label, intro: intros[g.cat.slug], groups: [g] }));
    console.log('wrote', `products/${g.cat.slug}/index.html`);
  }
  writeFileSync(join(root, 'products/all/index.html'), renderListing({ path: '/products/all/', title: 'All Products | OEM/ODM Smart Sleep | Kang Cai', h1: 'All Products', intro: 'All 34 Kang Cai models across adjustable bed frames, adjustable mattresses, smart beds, leisure chairs and bed bases.', groups }));
  console.log('wrote products/all/index.html');
}
