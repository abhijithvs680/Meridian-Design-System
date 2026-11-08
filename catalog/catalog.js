(() => {
  const data = window.MERIDIAN_CATALOG;
  const specimens = window.MERIDIAN_SPECIMENS;
  const byId = id => document.getElementById(id);
  const frame = byId('preview-frame');
  const root = document.documentElement;
  const collections = new Map();
  const entries = [...data.components, ...data.patterns.map(pattern => ({
    name: pattern.path.split('/').pop().replace('.html', ''),
    title: pattern.name,
    group: 'Page templates',
    summary: pattern.summary || 'Composes ' + pattern.components.join(', ') + '.',
    path: pattern.path,
    guide: pattern.guide,
    template: true
  }))];
  let selected;

  function element(tag, content, className) {
    const node = document.createElement(tag);
    node.textContent = content;
    if (className) node.className = className;
    return node;
  }

  function displayName(name) {
    return name.replace(/([A-Z])([A-Z][a-z])/g, '$1 $2').replace(/([a-z])([A-Z])/g, '$1 $2');
  }

  byId('component-count').textContent = data.components.length;
  byId('stat-components').textContent = data.components.length;
  byId('pattern-count').textContent = data.patterns.length;
  byId('library-total').textContent = entries.length;
  byId('asset-count').textContent = data.assets.length;
  byId('stat-assets').textContent = data.assets.length;

  for (const component of entries) {
    if (!collections.has(component.group)) collections.set(component.group, []);
    collections.get(component.group).push(component);
  }
  const groups = [...collections.keys()].sort();
  for (const group of groups) {
    byId('category').add(new Option(group + ' (' + collections.get(group).length + ')', group));
  }

  function renderLibrary() {
    const query = byId('search').value.trim().toLowerCase();
    const category = byId('category').value;
    const list = byId('component-grid');
    const scrollTop = list.scrollTop;
    list.replaceChildren();
    let count = 0;
    for (const group of groups) {
      if (category !== 'all' && group !== category) continue;
      const matches = collections.get(group).filter(item =>
        [item.name, item.title || displayName(item.name), item.summary, item.group].join(' ').toLowerCase().includes(query));
      if (!matches.length) continue;
      count += matches.length;
      const section = document.createElement('section');
      const heading = element('h2', group, 'collection-title');
      heading.append(element('span', matches.length));
      section.append(heading);
      for (const item of matches) {
        const link = element('a', item.title || displayName(item.name), 'specimen-link');
        link.href = '#components/' + item.name;
        link.dataset.specimen = item.name;
        if (selected?.name === item.name) link.setAttribute('aria-current', 'page');
        section.append(link);
      }
      list.append(section);
    }
    list.scrollTop = scrollTop;
    byId('result-count').textContent = count
      ? count + ' of ' + entries.length + ' specimens'
      : 'No specimens match your filters.';
  }

  byId('search').addEventListener('input', renderLibrary);
  byId('category').addEventListener('change', renderLibrary);
  document.addEventListener('keydown', event => {
    if (event.key !== '/' || byId('components').hidden || event.altKey || event.ctrlKey || event.metaKey) return;
    if (event.target.closest('input, textarea, select, [contenteditable]')) return;
    event.preventDefault();
    byId('search').focus();
  });

  function syncFrame() {
    try {
      const documentRoot = frame.contentDocument?.documentElement;
      if (!documentRoot) return;
      documentRoot.dataset.theme = root.dataset.theme;
      documentRoot.dataset.density = root.dataset.density || '';
      documentRoot.dir = root.dir || 'ltr';
    } catch {
      // Some browsers isolate local files. The standalone specimen still works.
    }
  }
  frame.addEventListener('load', syncFrame);

  function preference(id, isActive, update) {
    byId(id).addEventListener('click', () => {
      const active = !isActive();
      update(active);
      byId(id).setAttribute('aria-pressed', String(active));
      syncFrame();
    });
  }
  preference('theme', () => root.dataset.theme === 'dark', active => {
    root.dataset.theme = active ? 'dark' : 'light';
    byId('theme').textContent = active ? 'Light theme' : 'Dark theme';
  });
  preference('density', () => root.dataset.density === 'compact', active => {
    root.dataset.density = active ? 'compact' : '';
  });
  preference('direction', () => root.dir === 'rtl', active => {
    root.dir = active ? 'rtl' : 'ltr';
  });

  function setView(view) {
    document.querySelectorAll('.spec-tabs button').forEach(button => {
      button.setAttribute('aria-pressed', String(button.dataset.view === view));
      byId(button.dataset.view + '-panel').hidden = button.dataset.view !== view;
    });
  }
  document.querySelectorAll('.spec-tabs button').forEach(button => {
    button.addEventListener('click', () => setView(button.dataset.view));
  });
  byId('viewport-width').addEventListener('change', event => {
    const width = event.target.value;
    frame.style.width = width === 'auto' ? '100%' : width + 'px';
  });
  new ResizeObserver(() => {
    byId('viewport-size').value = frame.clientWidth + ' px';
  }).observe(frame);
  byId('reset-preview').addEventListener('click', () => {
    setView('live');
    frame.src = selected.path;
  });

  byId('copy-markup').addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(specimens[selected.name].source);
      byId('copy-status').textContent = 'Original HTML copied.';
    } catch {
      byId('copy-status').textContent = 'Select the source text to copy it manually.';
      byId('spec-source').focus();
    }
  });

  function renderGuide(markdown) {
    const panel = byId('usage-panel');
    panel.replaceChildren();
    if (!markdown) {
      panel.append(element('p', 'This showcase is documented in its standalone source.'));
      return;
    }
    for (const block of markdown.trim().split(/\r?\n\s*\r?\n/)) {
      if (/^#\s/.test(block)) continue;
      const lines = block.split(/\r?\n/);
      if (/^#{2,6}\s/.test(lines[0])) {
        panel.append(element('h2', lines.shift().replace(/^#+\s/, '')));
      }
      if (!lines.length) continue;
      if (lines[0].startsWith('|') || lines[0].startsWith('```')) {
        panel.append(element('pre', lines.join('\n')));
      } else {
        panel.append(element('p', lines.join('\n').replace(/\*\*|`/g, '')));
      }
    }
  }

  function selectSpecimen(component) {
    if (selected === component) return;
    selected = component;
    const details = specimens[component.name];
    const name = component.title || displayName(component.name);
    byId('preview-title').textContent = name;
    byId('preview-group').textContent = component.group;
    byId('preview-description').textContent = component.summary;
    byId('spec-collection').textContent = component.group;
    byId('spec-type').textContent = component.template ? 'Page template'
      : component.added ? 'Composition pattern' : 'Library specimen';
    byId('spec-runtime').textContent = details.scripted ? 'Includes local JavaScript' : 'HTML and CSS';
    byId('spec-contract').textContent = component.family
      ? 'Use a mk-page wrapper with marketing.css. Scoped tones come with each section. Read the guide before composing.'
      : component.added || component.template
      ? 'Compose the markup with your app state. Demo actions use local sample data.'
      : 'Use the documented CSS classes and verify the interaction contract for your framework.';
    byId('spec-styles').replaceChildren(...details.styles.map(file => element('li', file)));
    byId('spec-source').textContent = details.source;
    byId('copy-status').textContent = '';
    byId('open-preview').href = component.path;
    byId('read-docs').hidden = !details.guide || (component.template && !component.guide);
    byId('read-docs').href = component.guide || component.path.replace('preview.html', 'README.md');
    renderGuide(details.guide);
    setView('live');
    frame.title = name + ' live specimen';
    frame.src = component.path;
    for (const link of document.querySelectorAll('[data-specimen]')) {
      if (link.dataset.specimen === component.name) link.setAttribute('aria-current', 'page');
      else link.removeAttribute('aria-current');
    }
    const list = byId('component-grid');
    const current = list.querySelector('[aria-current="page"]');
    if (current) {
      const bounds = list.getBoundingClientRect();
      const item = current.getBoundingClientRect();
      if (item.top < bounds.top || item.bottom > bounds.bottom) {
        list.scrollTop += item.top - bounds.top - 20;
      }
    }
  }

  for (const [index, pattern] of data.patterns.entries()) {
    const link = element('a', '', 'pattern-tile');
    link.href = '#components/' + pattern.path.split('/').pop().replace('.html', '');
    link.append(element('span', String(index + 1).padStart(2, '0'), 'pattern-number'),
      element('h2', pattern.name), element('p', pattern.components.join(' · ')),
      element('span', 'Inspect page template →', 'card-link'));
    byId('pattern-grid').append(link);
  }

  function renderAssets() {
    const group = byId('asset-group').value;
    const tiles = data.assets.filter(asset => group === 'all' || asset.group === group).map(asset => {
      const tile = element('article', '', 'asset-tile');
      tile.dataset.group = asset.group;
      const image = new Image();
      image.src = asset.path;
      image.alt = '';
      image.loading = 'lazy';
      const download = element('a', 'Download SVG ↗');
      download.href = asset.path;
      download.download = asset.name + '.svg';
      tile.append(image, element('strong', asset.name), download);
      return tile;
    });
    byId('asset-grid').replaceChildren(...tiles);
  }
  for (const group of new Set(data.assets.map(asset => asset.group))) {
    const filter = byId('asset-group');
    if (![...filter.options].some(option => option.value === group)) filter.add(new Option(group, group));
  }
  byId('asset-group').addEventListener('change', renderAssets);
  renderAssets();

  function renderTokens() {
    const query = byId('token-search').value.trim().toLowerCase();
    const tokens = window.MERIDIAN_TOKENS.filter(token =>
      (token.name + ' ' + token.description).toLowerCase().includes(query));
    byId('token-count').textContent = tokens.length + ' tokens';
    byId('token-grid').replaceChildren(...tokens.map(token => {
      const row = document.createElement('tr');
      const name = element('th', token.name);
      name.scope = 'row';
      row.append(name);
      for (const value of [token.light, token.dark]) {
        const cell = element('td', value || 'Inherits light');
        if (value?.startsWith('#')) {
          const swatch = element('span', '', 'token-chip');
          swatch.style.backgroundColor = value;
          cell.prepend(swatch);
        }
        row.append(cell);
      }
      row.append(element('td', token.description));
      return row;
    }));
  }
  byId('token-search').addEventListener('input', renderTokens);
  renderTokens();

  const marketing = data.components.filter(item => item.family).sort((a, b) => a.order - b.order);
  const gallery = byId('marketing-grid');
  const categoryBar = byId('marketing-filters');
  const thumbObserver = new ResizeObserver(entries => {
    for (const entry of entries) {
      entry.target.style.setProperty('--thumb-scale', entry.contentRect.width / 820);
    }
  });

  function renderMarketing(family) {
    for (const button of categoryBar.querySelectorAll('button')) {
      button.setAttribute('aria-pressed', String(button.dataset.family === family));
    }
    thumbObserver.disconnect();
    gallery.replaceChildren();
    const items = marketing.filter(item => item.family === family);
    for (const [index, item] of items.entries()) {
      const card = element('a', '', 'marketing-card');
      card.href = '#components/' + item.name;
      const poster = element('div', '', 'marketing-poster');
      poster.setAttribute('aria-hidden', 'true');
      const preview = document.createElement('iframe');
      preview.src = item.path + '?poster=1';
      preview.title = item.title + ' thumbnail';
      preview.loading = 'lazy';
      preview.tabIndex = -1;
      preview.inert = true;
      poster.append(preview);
      const caption = element('div', '', 'marketing-caption');
      caption.append(element('span', String(index + 1).padStart(2, '0'), 'marketing-index'),
        element('strong', item.title), element('span', '↗', 'marketing-arrow'));
      card.append(poster, caption);
      gallery.append(card);
      thumbObserver.observe(poster);
    }
  }

  for (const family of ['Heroes', 'Navigation', 'Calls to action', 'Footers', 'Scroll effects']) {
    const button = element('button', family);
    button.type = 'button';
    button.dataset.family = family;
    button.addEventListener('click', () => renderMarketing(family));
    categoryBar.append(button);
  }
  byId('marketing-count').textContent = marketing.length;
  const composer = byId('launch-composer');
  for (const select of composer.querySelectorAll('select')) {
    for (const item of marketing.filter(item => item.family === select.dataset.family && item.name !== 'ResourceRail' &&
      Object.hasOwn(window.MERIDIAN_MARKETING_MARKUP, item.name))) {
      select.add(new Option(item.title, item.name));
    }
    if (select.dataset.initial) select.value = select.dataset.initial;
  }
  function composedPage() {
    const sections = [];
    for (const select of composer.querySelectorAll('select')) {
      const source = window.MERIDIAN_MARKETING_MARKUP[select.value];
      if (!source) continue;
      sections.push(select.dataset.family === 'Scroll effects'
        ? source.replaceAll('<h1', '<h2').replaceAll('</h1>', '</h2>') : source);
    }
    return '<!doctype html>\n<html lang="en"><head><meta charset="utf-8">' +
      '<meta name="viewport" content="width=device-width, initial-scale=1"><title>Meridian launch</title>' +
      '<link rel="stylesheet" href="marketing/marketing.css?v=' + data.version + '"></head>\n' +
      '<body class="mk-page">\n' + sections.join('\n') +
      '\n<script src="marketing/marketing.js?v=' + data.version + '"></script></body></html>';
  }
  function renderComposition() {
    byId('composition-frame').srcdoc = composedPage();
  }
  composer.addEventListener('change', renderComposition);
  composer.addEventListener('toggle', () => { if (composer.open) renderComposition(); });
  byId('download-composition').addEventListener('click', () => {
    const url = URL.createObjectURL(new Blob([composedPage()], { type: 'text/html' }));
    const link = element('a', 'Download launch page');
    link.href = url;
    link.download = 'meridian-launch.html';
    link.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  });

  function route() {
    const key = location.hash.slice(1) || 'components';
    const legacy = key.startsWith('preview=');
    const [section, name] = legacy ? ['components', key.slice(8)] : key.split('/');
    const view = ['overview', 'components', 'marketing', 'studio', 'patterns', 'assets', 'foundations'].includes(section)
      ? section : 'components';
    document.body.dataset.view = view;
    document.querySelectorAll('.view').forEach(panel => { panel.hidden = panel.id !== view; });
    document.querySelectorAll('[data-section]').forEach(link => {
      if (link.dataset.section === view) link.setAttribute('aria-current', 'page');
      else link.removeAttribute('aria-current');
    });
    byId('breadcrumb').textContent = view === 'components' ? 'Workbench' : displayName(view[0].toUpperCase() + view.slice(1));
    if (view === 'marketing' && !gallery.children.length) renderMarketing('Heroes');
    if (view === 'components') {
      const component = entries.find(item => item.name === name)
        || selected || data.components.find(item => item.name === 'InvoiceWorkbench');
      selectSpecimen(component);
    }
    window.scrollTo({ top: 0, behavior: 'instant' });
  }
  renderLibrary();
  window.addEventListener('hashchange', route);
  route();
})();
