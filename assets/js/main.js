(function () {
  // Mobile menu
  var menuBtn = document.querySelector('.menu-toggle');
  var nav = document.querySelector('.nav');
  if (menuBtn && nav) {
    menuBtn.addEventListener('click', function () {
      var open = nav.classList.toggle('open');
      menuBtn.setAttribute('aria-expanded', String(open));
      menuBtn.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
    });
    nav.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        nav.classList.remove('open');
        menuBtn.setAttribute('aria-expanded', 'false');
        menuBtn.setAttribute('aria-label', 'Open navigation');
      });
    });
  }

  // Product filter chips (products page)
  var filters = document.querySelectorAll('[data-filter]');
  if (filters.length) {
    // Apply URL category filter on load
    var params = new URLSearchParams(location.search);
    var urlCat = params.get('category') || 'all';
    filters.forEach(function (btn) {
      if (btn.dataset.filter === urlCat) btn.classList.add('active');
      else btn.classList.remove('active');
    });
    if (urlCat !== 'all') {
      document.querySelectorAll('#catalog .product-card').forEach(function (card) {
        card.hidden = card.dataset.category !== urlCat;
      });
    }
    filters.forEach(function (btn) {
      btn.addEventListener('click', function () {
        filters.forEach(function (b) { b.classList.remove('active'); });
        btn.classList.add('active');
        var cat = btn.dataset.filter;
        document.querySelectorAll('#catalog .product-card').forEach(function (card) {
          card.hidden = cat !== 'all' && card.dataset.category !== cat;
        });
        var url = new URL(location.href);
        if (cat === 'all') url.searchParams.delete('category');
        else url.searchParams.set('category', cat);
        history.replaceState(null, '', url.toString());
      });
    });
  }

  // Store product interest for contact form pre-fill
  document.querySelectorAll('[data-interest]').forEach(function (el) {
    el.addEventListener('click', function () {
      sessionStorage.setItem('kc_interest', el.dataset.interest);
    });
  });

  // Contact form - mailto fallback (works without a server)
  var form = document.getElementById('inquiry-form');
  if (form) {
    var interest = sessionStorage.getItem('kc_interest');
    if (interest) {
      var sel = form.elements.interest;
      if (sel) {
        for (var i = 0; i < sel.options.length; i++) {
          if (sel.options[i].textContent.startsWith(interest)) {
            sel.selectedIndex = i;
            break;
          }
        }
      }
      sessionStorage.removeItem('kc_interest');
    }

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!form.reportValidity()) return;

      // Honeypot check
      var honeypot = form.elements.website;
      if (honeypot && honeypot.value) return;

      var data = new FormData(form);
      var name = data.get('name') || '';
      var email = data.get('email') || '';
      var company = data.get('company') || '—';
      var phone = data.get('phone') || '—';
      var interestVal = data.get('interest') || 'Not specified';
      var quantity = data.get('quantity') || '—';
      var message = data.get('message') || '';

      var productPart = interestVal !== 'Not specified' ? ' — ' + interestVal : '';
      var subject = encodeURIComponent('Website inquiry' + productPart);
      var body = encodeURIComponent(
        'Name: ' + name + '\n' +
        'Email: ' + email + '\n' +
        'Company: ' + company + '\n' +
        'Phone: ' + phone + '\n' +
        'Product interest: ' + interestVal + '\n' +
        'Estimated quantity: ' + quantity + '\n\n' +
        'Message:\n' + message
      );

      var status = form.querySelector('.form-result');
      if (status) {
        status.style.display = 'block';
        status.innerHTML = 'Opening your email client… If it doesn\'t open, <a href="mailto:zhouhaobin454@gmail.com">email us directly</a> or <a href="https://wa.me/8613925576475" target="_blank" rel="noopener">message on WhatsApp</a>.';
      }

      window.location.href = 'mailto:zhouhaobin454@gmail.com?subject=' + subject + '&body=' + body;
    });
  }
})();
