(() => {
  if (new URLSearchParams(location.search).has('poster')) document.documentElement.dataset.mkPoster = '';
  const motion = matchMedia('(prefers-reduced-motion: reduce)');
  const disclosures = [...document.querySelectorAll('.mk-nav details')];
  document.addEventListener('click', event => {
    for (const item of disclosures) {
      if (!item.contains(event.target) || event.target.closest('a')) item.open = false;
    }
  });
  document.addEventListener('keydown', event => {
    if (event.key !== 'Escape') return;
    const open = disclosures.find(item => item.open && item.contains(document.activeElement));
    if (open) {
      open.open = false;
      open.querySelector('summary').focus();
    }
  });

  document.querySelectorAll('[data-mk-dialog]').forEach(button => {
    const dialog = document.getElementById(button.dataset.mkDialog);
    button.addEventListener('click', () => dialog.showModal());
    dialog.addEventListener('close', () => button.focus());
  });
  document.querySelectorAll('[data-mk-form]').forEach(form => {
    form.addEventListener('submit', event => {
      event.preventDefault();
      const output = form.querySelector('output');
      output.textContent = 'Preview complete. Your details were not sent or stored.';
      form.reset();
    });
  });
  document.querySelectorAll('[data-mk-search]').forEach(search => {
    const input = search.querySelector('input');
    const results = [...search.querySelectorAll('li')];
    input.addEventListener('input', () => {
      const query = input.value.trim().toLowerCase();
      for (const result of results) result.hidden = !result.textContent.toLowerCase().includes(query);
      const count = results.filter(result => !result.hidden).length;
      search.querySelector('output').textContent = count ? count + ' results' : 'No results';
    });
  });
  document.querySelectorAll('[data-mk-billing]').forEach(group => {
    const select = group.querySelector('select');
    select.addEventListener('change', () => {
      for (const price of group.querySelectorAll('[data-monthly]')) {
        price.textContent = select.value === 'annual' ? price.dataset.annual : price.dataset.monthly;
      }
      group.querySelector('output').textContent = select.value === 'annual'
        ? 'Monthly equivalent, billed annually.' : 'Billed monthly.';
    });
  });
  document.querySelectorAll('[data-mk-track]').forEach(gallery => {
    const track = gallery.querySelector('.mk-track');
    const cards = [...track.querySelectorAll('article')];
    for (const button of gallery.querySelectorAll('[data-mk-step]')) {
      button.addEventListener('click', () => {
        const edge = getComputedStyle(track).direction === 'rtl' ? 'right' : 'left';
        const start = track.getBoundingClientRect()[edge];
        const current = cards.reduce((nearest, card, i) =>
          Math.abs(card.getBoundingClientRect()[edge] - start) < Math.abs(cards[nearest].getBoundingClientRect()[edge] - start)
            ? i : nearest, 0);
        const index = Math.min(cards.length - 1, Math.max(0, current + Number(button.dataset.mkStep)));
        const offset = cards[index].getBoundingClientRect()[edge] - start;
        track.scrollBy({ left: offset, behavior: motion.matches ? 'instant' : 'smooth' });
        gallery.querySelector('output').textContent = (index + 1) + ' of ' + cards.length;
      });
    }
  });
  const progress = document.querySelector('[data-mk-progress]');
  if (progress) {
    function updateProgress() {
      const root = document.scrollingElement;
      const distance = root.scrollHeight - root.clientHeight;
      progress.value = distance > 0 ? 100 * root.scrollTop / distance : 100;
    }
    window.addEventListener('scroll', updateProgress, { passive: true });
    window.addEventListener('resize', updateProgress);
    updateProgress();
  }
})();
