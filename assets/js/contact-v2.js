(() => {
  const form = document.querySelector('[data-contact-v2]');
  if (!form) return;
  const status = form.querySelector('[data-form-status]');
  const button = form.querySelector('button[type="submit"]');

  const setStatus = (message, type = '') => {
    status.textContent = message;
    status.className = `kc-form-status${type ? ` ${type}` : ''}`;
  };

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    setStatus('');
    if (!form.checkValidity()) {
      form.reportValidity();
      setStatus('Please complete the required fields.', 'error');
      return;
    }

    if (['localhost', '127.0.0.1'].includes(location.hostname)) {
      setStatus('Local preview: email delivery activates after the PHP files are deployed. You can use WhatsApp or email now.', 'error');
      return;
    }

    const payload = Object.fromEntries(new FormData(form).entries());
    payload.privacyAgreement = Boolean(form.elements.privacyAgreement.checked);
    button.disabled = true;
    setStatus('Sending your inquiry…');
    try {
      const response = await fetch('api/contact.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(payload),
      });
      const result = await response.json().catch(() => ({}));
      if (!response.ok || !result.ok) throw new Error(result.message || 'Submission failed');
      form.reset();
      setStatus('Thank you. Your inquiry has been sent to the Kang Cai team.', 'success');
    } catch (error) {
      setStatus('We could not send the form. Please email zhouhaobin454@gmail.com or contact us on WhatsApp.', 'error');
    } finally {
      button.disabled = false;
    }
  });
})();
