(() => {
  // Image Modal handling (from original site)
  const modalEl = document.getElementById('imageModal');
  if (modalEl) {
    const modalImg = modalEl.querySelector('[data-modal-image]');
    const modalDetails = modalEl.querySelector('[data-modal-details]');

    document.querySelectorAll('[data-image-modal]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const src = btn.getAttribute('data-src') || '';
        const details = btn.getAttribute('data-details') || '';
        if (modalImg) modalImg.src = src;
        if (modalDetails) modalDetails.textContent = details;
      });
    });
  }

  // Handle static demo form submissions
  document.querySelectorAll('form').forEach(form => {
    form.addEventListener('submit', (e) => {
      // If the form doesn't have an action that leads to another .html file, suppress it for demo
      const action = form.getAttribute('action');
      if (action === '#' || !action) {
        e.preventDefault();
        alert('Demo mode: Your request has been "submitted". Since this is a static site, no data was actually saved.');
        form.reset();
      }
    });

    // Also handle buttons of type="button" inside forms that look like submit buttons
    form.querySelectorAll('button[type="button"]').forEach(btn => {
      if (btn.textContent.toLowerCase().includes('submit') || btn.textContent.toLowerCase().includes('search')) {
        btn.addEventListener('click', () => {
          if (btn.textContent.toLowerCase().includes('search')) {
            alert('Demo mode: Searching is not available in the static version.');
          } else {
            alert('Demo mode: Your request has been "submitted".');
            form.reset();
          }
        });
      }
    });
  });

  // Handle generic "Call" or "WhatsApp" buttons that might have # as href
  document.querySelectorAll('a[href="#"]').forEach(link => {
    if (link.textContent.toLowerCase().includes('whatsapp')) {
      link.href = 'https://wa.me/923001234567';
      link.target = '_blank';
    } else if (link.textContent.toLowerCase().includes('call')) {
      link.href = 'tel:+923001234567';
    } else if (link.textContent.toLowerCase().includes('facebook')) {
      link.href = 'https://facebook.com/mylandproperty';
      link.target = '_blank';
    }
  });

  // Handle Admin Delete buttons
  document.querySelectorAll('.btn-outline-danger').forEach(btn => {
    if (btn.textContent.toLowerCase().includes('delete') || btn.textContent.toLowerCase().includes('remove')) {
      btn.addEventListener('click', (e) => {
        if (confirm('Demo mode: Are you sure you want to delete this item? (No actual data will be removed)')) {
          alert('Demo mode: Item deleted mockup.');
          // Optionally hide the row
          const row = btn.closest('tr') || btn.closest('.col-sm-6') || btn.closest('.col-12');
          if (row) row.style.opacity = '0.5';
        }
      });
    }
  });

})();
