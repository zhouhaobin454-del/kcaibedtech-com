(() => {
  const page = (location.pathname.split('/').pop() || 'index.html').toLowerCase();
  const active = (file) => page === file ? ' class="active" aria-current="page"' : '';

  const header = document.querySelector('.site-header');
  if (header) {
    header.innerHTML = `
      <nav class="nav" aria-label="Main navigation">
        <a class="brand" href="index.html" aria-label="Kang Cai Smart Sleep home">
          <span class="kc-mark" aria-hidden="true">KC</span><span>KANG CAI</span>
        </a>
        <button class="mobile-toggle" data-menu-toggle aria-expanded="false" aria-controls="primary-menu" aria-label="Open navigation"><span></span><span></span><span></span></button>
        <div class="nav-links" id="primary-menu" data-nav-links>
          <a href="products.html"${active('products.html')}>Products</a>
          <a href="about.html"${active('about.html')}>About</a>
          <a href="news.html"${active('news.html')}>News</a>
          <a href="contact.html"${active('contact.html')}>Contact</a>
        </div>
        <div class="nav-cta"><a class="btn" href="contact.html?interest=OEM%20%2F%20ODM%20Project#inquiry-form">Request a Quote</a></div>
      </nav>`;
  }

  const footer = document.querySelector('.site-footer');
  if (footer) {
    footer.className = 'site-footer kc-footer-shell';
    footer.innerHTML = `
      <div class="kc-container kc-footer-grid">
        <div class="kc-footer-intro">
          <a class="footer-brand" href="index.html"><span class="kc-mark" aria-hidden="true">KC</span><span>KANG CAI</span></a>
          <p>Adjustable sleep systems built for global brands, distributors and project buyers.</p>
          <p class="operator">Kang Cai Smart Sleep Co., Ltd.<br>Dongguan, Guangdong, China</p>
        </div>
        <div><h2>Products</h2><a href="products.html#adjustable-frames">Adjustable Bed Frames</a><a href="products.html#smart-beds">Smart Beds</a><a href="products.html#mattresses">Adjustable Mattresses</a><a href="products.html#leisure-chairs">Leisure Chairs</a><a href="products.html#bed-bases">Bed Bases</a></div>
        <div><h2>Company</h2><a href="about.html">About</a><a href="news.html">News</a><a href="contact.html">Contact</a><a href="privacy-policy.html">Privacy Policy</a><a href="terms-of-use.html">Terms of Use</a></div>
        <div><h2>Start a Project</h2><a href="mailto:zhouhaobin454@gmail.com">zhouhaobin454@gmail.com</a><a href="https://wa.me/8613925576475" target="_blank" rel="noopener">+86 139 2557 6475</a><span>Qisha Industrial Park, Shatian Town<br>Dongguan, Guangdong, China</span></div>
      </div>
      <div class="kc-container copyright"><span>© 2026 Kang Cai Smart Sleep Co., Ltd.</span><span>OEM / ODM · Global B2B</span></div>`;
  }

  const floating = document.querySelector('[data-floating-contact]');
  if (floating) {
    floating.innerHTML = `
      <button class="floating-toggle" data-contact-toggle aria-expanded="false" aria-label="Open contact options">+</button>
      <div class="floating-links"><a href="https://wa.me/8613925576475" target="_blank" rel="noopener" aria-label="Contact on WhatsApp">WA</a><a href="mailto:zhouhaobin454@gmail.com" aria-label="Send email">@</a></div>`;
  }

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
})();
