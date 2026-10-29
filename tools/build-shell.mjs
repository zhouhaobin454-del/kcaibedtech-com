// Pre-renders the shared header / footer / floating contact and a static CSS <link> set into every page,
// so first paint and crawlers no longer depend on assets/js/brand-shell.js and assets/js/site-config.js.
// Run after editing brand-shell.js or adding pages: node tools/build-shell.mjs
import { readFileSync, writeFileSync, readdirSync, statSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join, relative, sep } from 'node:path';
import vm from 'node:vm';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const shellCode = readFileSync(join(root, 'assets/js/brand-shell.js'), 'utf8');
const CSS_VERSION = '13';
const SKIP = new Set(['404.html', 'about/index.html', 'contact/index.html', 'privacy/index.html', 'products/index.html']);
const LEGACY = /^(blog|faq|sourcing)\//;
const SCRIPTLESS = new Set(['contact.html']); // pages that still need brand-shell.js (form prefill)

function renderShell(urlPath) {
  const window = { KC_SHELL_PATH: urlPath };
  vm.runInNewContext(shellCode, {
    window,
    location: { pathname: urlPath, search: '' },
    URLSearchParams,
    document: { querySelector: () => null },
  });
  return { header: window.KCShell.header(urlPath), footer: window.KCShell.footer(), floating: window.KCShell.floating() };
}

function walk(dir, acc = []) {
  for (const name of readdirSync(dir)) {
    if (['node_modules', '.git', 'assets', 'images', 'videos', 'pdf_images', 'api', 'data', 'tools'].includes(name)) continue;
    const p = join(dir, name);
    if (statSync(p).isDirectory()) walk(p, acc);
    else if (name.endsWith('.html')) acc.push(p);
  }
  return acc;
}

const cssLinks = (legacy) => ['styles', 'nav', 'phase-one', 'phase-two', ...(legacy ? ['legacy-gold'] : [])]
  .map((n) => `  <link rel="stylesheet" href="/assets/css/${n}.css?v=${CSS_VERSION}">`).join('\n');

let changed = 0;
for (const file of walk(root)) {
  const rel = relative(root, file).split(sep).join('/');
  if (SKIP.has(rel)) continue;
  const original = readFileSync(file, 'utf8').replace(/\r\n/g, '\n');
  let html = original;
  if (!html.includes('class="site-header"')) continue;
  const urlPath = '/' + rel.replace(/index\.html$/, '');
  const legacy = LEGACY.test(rel);
  const shell = renderShell(urlPath);

  // Head: one static, ordered stylesheet block.
  html = html.replace(/^[ \t]*<link rel="stylesheet" href="[^"]*assets\/css\/(?:styles|nav|phase-one|phase-two|legacy-gold)\.css[^"]*">\n/gm, '');
  html = html.replace('</head>', `${cssLinks(legacy)}\n</head>`);

  // Header, footer, floating contact.
  html = html.replace(/<header class="site-header"[^>]*>[\s\S]*?<\/header>/, () => `<header class="site-header" data-site-header>${shell.header}\n  </header>`);
  html = html.replace(/<footer class="site-footer[^"]*"[^>]*>[\s\S]*?<\/footer>/, () => `<footer class="site-footer kc-footer-shell">${shell.footer}\n  </footer>`);
  html = html.replace(/<div class="floating-contact"[^>]*>[\s\S]*?(?=\s*<button class="back-to-top"|\s*<script)/, () => `<div class="floating-contact" data-floating-contact>${shell.floating}\n  </div>`);

  // Scripts: CSS is static now; brand-shell is only needed where it fills form fields.
  html = html.replace(/[ \t]*<script src="[^"]*assets\/js\/site-config\.js[^"]*"><\/script>\n/g, '');
  if (!SCRIPTLESS.has(rel)) html = html.replace(/[ \t]*<script src="[^"]*assets\/js\/brand-shell\.js[^"]*"><\/script>\n/g, '');
  if (!/assets\/js\/main\.js/.test(html)) html = html.replace('</body>', '  <script src="/assets/js/main.js" defer></script>\n</body>');

  if (legacy && !html.includes('kc-legacy')) {
    html = html.replace(/<body([^>]*)>/, (m, attrs) => (/class="/.test(attrs)
      ? `<body${attrs.replace(/class="([^"]*)"/, 'class="$1 kc-legacy"')}>`
      : `<body${attrs} class="kc-legacy">`));
  }

  if (html !== original) { writeFileSync(file, html); changed++; }
}
console.log(`pre-rendered shell into ${changed} pages`);
