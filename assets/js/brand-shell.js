(() => {
  // Shared header / footer / floating-contact markup. tools/build-shell.mjs pre-renders it into every page
  // so search engines and first paint see it; this script only fills it in when it is missing.
  const path = (window.KC_SHELL_PATH || location.pathname).toLowerCase();
  const activeKey = () => {
    if (path.startsWith('/products') || path.startsWith('/product/')) return 'products';
    if (path.startsWith('/blog') || path.startsWith('/news')) return 'news';
    if (path.startsWith('/about')) return 'about';
    if (path.startsWith('/contact')) return 'contact';
    return '';
  };
  const link = (key, href, label, current) => `<a href="${href}"${current === key ? ' class="active" aria-current="page"' : ''}>${label}</a>`;

  const shell = {
    header(current) {
      return `
      <nav class="nav" aria-label="Main navigation">
        <a class="brand" href="/" aria-label="Kang Cai Smart Sleep home">
          <span class="kc-mark" aria-hidden="true">KC</span><span>KANG CAI</span>
        </a>
        <button class="mobile-toggle" data-menu-toggle aria-expanded="false" aria-controls="primary-menu" aria-label="Open navigation"><span></span><span></span><span></span></button>
        <div class="nav-links" id="primary-menu" data-nav-links>
          ${link('products', '/products.html', 'Products', current)}
          ${link('about', '/about.html', 'About', current)}
          ${link('news', '/news.html', 'News', current)}
          ${link('contact', '/contact.html', 'Contact', current)}
        </div>
        <div class="nav-cta"><a class="btn" href="/contact.html?interest=OEM%20%2F%20ODM%20Project#inquiry-form">Request a Quote</a></div>
      </nav>`;
    },
    footer() {
      return `
      <div class="kc-container kc-footer-grid">
        <div class="kc-footer-intro">
          <a class="footer-brand" href="/"><span class="kc-mark" aria-hidden="true">KC</span><span>KANG CAI</span></a>
          <p>Adjustable sleep systems built for global brands, distributors and project buyers.</p>
          <p class="operator">Kang Cai Smart Sleep Co., Ltd.<br>Dongguan, Guangdong, China</p>
        </div>
        <div><h2>Products</h2><a href="/products/adjustable-bed-frames/">Adjustable Bed Frames</a><a href="/products/smart-beds/">Smart Beds</a><a href="/products/mattresses/">Adjustable Mattresses</a><a href="/products/leisure-chairs/">Leisure Chairs</a><a href="/products/bed-bases/">Bed Bases</a></div>
        <div><h2>Company</h2><a href="/about.html">About</a><a href="/news.html">News</a><a href="/sourcing/">Sourcing Guide</a><a href="/faq/">FAQ</a><a href="/contact.html">Contact</a><a href="/privacy-policy.html">Privacy Policy</a><a href="/terms-of-use.html">Terms of Use</a></div>
        <div><h2>Start a Project</h2><a href="mailto:zhouhaobin454@gmail.com">zhouhaobin454@gmail.com</a><a href="https://wa.me/8619065020180" target="_blank" rel="noopener">+86 190 6502 0180</a><span>Qisha Industrial Park, Shatian Town<br>Dongguan, Guangdong, China</span></div>
      </div>
      <div class="kc-container copyright"><span>© 2026 Kang Cai Smart Sleep Co., Ltd.</span><span>OEM / ODM · Global B2B</span></div>`;
    },
    floating() {
      return `
      <button class="floating-toggle" data-contact-toggle aria-expanded="false" aria-label="Open contact options">+</button>
      <div class="floating-links"><a href="https://wa.me/8619065020180" target="_blank" rel="noopener" aria-label="Contact on WhatsApp">WA</a><a href="mailto:zhouhaobin454@gmail.com" aria-label="Send email">@</a></div>`;
    },
  };
  window.KCShell = shell;

  const header = document.querySelector('.site-header');
  if (header && !header.querySelector('.nav')) header.innerHTML = shell.header(activeKey());

  const footer = document.querySelector('.site-footer');
  if (footer && !footer.querySelector('.kc-footer-grid')) {
    footer.className = 'site-footer kc-footer-shell';
    footer.innerHTML = shell.footer();
  }

  const floating = document.querySelector('[data-floating-contact]');
  if (floating && !floating.querySelector('.floating-toggle')) floating.innerHTML = shell.floating();

  const interest = document.querySelector('#productInterest');
  if (interest) {
    interest.innerHTML = `
      <option value="">Select a product line</option>
      <option>Adjustable Bed Frames</option>
      <option>Smart Beds</option>
      <option>Adjustable Mattresses</option>
      <option>Leisure Chairs</option>
      <option>Bed Bases</option>
      <option>OEM / ODM Project</option>`;
    const requestedInterest = new URLSearchParams(location.search).get('interest');
    if (requestedInterest && [...interest.options].some((option) => option.value === requestedInterest)) {
      interest.value = requestedInterest;
    } else if (requestedInterest) {
      interest.value = 'OEM / ODM Project';
    }
  }

  const requestedModel = new URLSearchParams(location.search).get('model');
  const specificProduct = document.querySelector('[name="specificProduct"]');
  if (requestedModel && specificProduct) specificProduct.value = requestedModel.slice(0, 100);
})();
