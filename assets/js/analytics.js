(() => {
  // Google tag (GA4 via GTM container). Loads only after the visitor accepts analytics, as the privacy policy (section 7) states.
  const GTM_ID = 'GTM-WNMB922L';
  const STORAGE_KEY = 'kc-analytics-consent';
  const read = () => { try { return localStorage.getItem(STORAGE_KEY); } catch (e) { return null; } };
  const write = (value) => { try { localStorage.setItem(STORAGE_KEY, value); } catch (e) { /* storage blocked: the choice simply is not remembered */ } };

  window.dataLayer = window.dataLayer || [];
  function gtag() { window.dataLayer.push(arguments); }
  let loaded = false;

  const load = () => {
    if (loaded) return;
    loaded = true;
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtm.js?id=${GTM_ID}`;
    document.head.append(script);
    gtag('js', new Date());
  };

  const track = (name, params) => { if (loaded) gtag('event', name, params || {}); };

  // Banner
  let banner = null;
  const closeBanner = () => { if (banner) { banner.remove(); banner = null; } };
  const choose = (value) => {
    write(value);
    closeBanner();
    if (value === 'granted') load();
  };
  const openBanner = () => {
    if (banner) return;
    banner = document.createElement('div');
    banner.className = 'kc-cookie-banner';
    banner.setAttribute('role', 'region');
    banner.setAttribute('aria-label', 'Analytics consent');
    const text = document.createElement('p');
    text.append('We use Google Analytics to see which pages bring product inquiries. It only runs if you accept. ');
    const link = document.createElement('a');
    link.href = '/privacy-policy.html#cookies';
    link.textContent = 'Privacy policy';
    text.append(link);
    const actions = document.createElement('div');
    actions.className = 'kc-cookie-actions';
    const decline = document.createElement('button');
    decline.type = 'button';
    decline.className = 'kc-btn kc-btn-secondary';
    decline.textContent = 'Decline';
    decline.addEventListener('click', () => choose('denied'));
    const accept = document.createElement('button');
    accept.type = 'button';
    accept.className = 'kc-btn kc-btn-primary';
    accept.textContent = 'Accept';
    accept.addEventListener('click', () => choose('granted'));
    actions.append(decline, accept);
    banner.append(text, actions);
    document.body.append(banner);
  };

  gtag('consent', 'default', { analytics_storage: 'denied', ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied' });
  const saved = read();
  if (saved === 'granted') load();
  else if (saved !== 'denied') openBanner();

  // "Cookie settings" link in the footer reopens the choice
  document.addEventListener('click', (event) => {
    const settings = event.target.closest('[data-cookie-settings]');
    if (settings) { event.preventDefault(); openBanner(); return; }
    const link = event.target.closest('a[href]');
    if (!link) return;
    const href = link.getAttribute('href') || '';
    if (/wa\.me\//.test(href)) track('click_whatsapp', { link_location: location.pathname });
    else if (href.startsWith('mailto:')) track('click_email', { link_location: location.pathname });
    else if (href.startsWith('tel:')) track('click_phone', { link_location: location.pathname });
    else if (/contact\.html/.test(href) && link.matches('.kc-btn, .btn')) track('click_quote_cta', { link_location: location.pathname, link_text: (link.textContent || '').trim().slice(0, 40) });
  });

  // Inquiry form success (dispatched by contact-v2.js); no personal data is sent
  document.addEventListener('kc:lead', (event) => {
    track('generate_lead', { form: 'contact', product_interest: (event.detail && event.detail.productInterest) || '' });
  });
})();
