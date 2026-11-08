"""Composer specimens with controls sized to each workflow."""
import json
import re

LAYOUTS = [
    ('workspace', 'AIComposer', 'Ask about the current record', 'Ask about this invoice…', 1),
    ('research', 'ResearchComposer', 'Research a question', 'What should the research cover?', 3),
    ('command', 'CommandComposer', 'Run a quick command', 'Type a command…', 1),
    ('brief', 'BriefComposer', 'Write a brief', 'Describe the goal, audience, and constraints…', 3),
    ('canvas', 'CanvasComposer', 'Start a new draft', 'Outline what you want to create…', 5),
    ('reply', 'ContextComposer', 'Reply in a thread', 'Reply…', 1),
]

ICONS = {
    'attach': '<path d="M19 11l-8 8a4 4 0 0 1-6-6l9-9a3 3 0 1 1 4 4l-9 9a1.5 1.5 0 1 1-2-2l8-8"/>',
    'options': '<path d="M4 7h16M4 17h16"/><circle cx="9" cy="7" r="2" fill="currentColor" stroke="none"/><circle cx="15" cy="17" r="2" fill="currentColor" stroke="none"/>',
    'send': '<path d="M12 19V5m-6 6 6-6 6 6"/>',
    'stop': '<rect x="7" y="7" width="10" height="10" rx="1"/>',
}


def icon(name):
    return f'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">{ICONS[name]}</svg>'


def composer(layout):
    _, _, title, placeholder, rows = next(spec for spec in LAYOUTS if spec[0] == layout)
    compact = rows == 1
    allow_files = layout in ('reply', 'research', 'canvas')
    header = '' if compact else f'<h2 class="mc-title">{title}</h2>'
    files = ('<div class="mc-files" aria-label="Attached files"></div>'
             '<input type="file" multiple hidden aria-label="Choose attachments">') if allow_files else ''
    attach = f'<button type="button" class="mc-tool mc-icon-button" data-attach aria-label="Attach files">{icon("attach")}</button>' if allow_files else ''
    context = '<label class="mc-check"><input type="checkbox" name="context" checked> Include invoice INV-2040</label>' if layout == 'workspace' else ''
    mode = '<label>Task mode<select name="mode"><option>Ask</option><option>Plan</option><option>Draft</option></select></label>'
    model = '<label>Model preference<select name="model"><option>Balanced</option><option>Fast</option><option>Deep reasoning</option></select></label>'
    options = ''
    if layout == 'workspace':
        options = f'<details class="mc-options"><summary class="mc-tool mc-icon-button" aria-label="Task settings">{icon("options")}</summary><div class="mc-menu">{context}{mode}{model}</div></details>'
    elif layout == 'research':
        header += '<label class="mc-check"><input type="checkbox" name="context" checked> Include the collections report</label>'
        options = model
    elif layout == 'canvas':
        options = mode
    verb = {'reply': 'Send reply', 'research': 'Start research', 'brief': 'Create brief', 'canvas': 'Start draft'}.get(layout, 'Run task')
    label = '' if compact else f'<span class="mc-send-text">{verb}</span>'
    return f'''<form class="mc" data-layout="{layout}" data-size="{'compact' if compact else 'expanded'}" aria-label="{title}">
  {header}
  {files}
  <div class="mc-editor">
    <textarea aria-label="{title}" placeholder="{placeholder}" rows="{rows}"></textarea>
    <div class="mc-toolbar">
      {attach}{options}
      <button class="mc-send" type="submit" aria-label="{verb}" data-send-label="{verb}" disabled>
        <span class="mc-send-icon">{icon('send')}</span><span class="mc-stop-icon" hidden>{icon('stop')}</span>{label}
      </button>
    </div>
  </div>
  <p class="mc-status" role="status"></p>
</form>'''


def build_composers(write, root, version):
    markup = {}
    for layout, name, title, _, rows in LAYOUTS:
        body = composer(layout)
        markup[name] = body
        if layout == 'workspace':
            body = f'''<section class="mc-record" aria-label="Invoice overview">
  <header class="mc-record-head"><span>Receivables / INV-2040</span><span>Open invoice</span></header>
  <div class="mc-record-body"><h2>Cedar Diagnostics</h2><p>Balance due <strong>₹86,200.00</strong></p></div>
  <div class="mc-record-action">{body}</div>
</section>'''
        write(f'components/{name}/preview.html', f'''<!-- @dsCard group="Agent" height={390 if rows == 1 else 520} -->
<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>{name} · Meridian</title><link rel="stylesheet" href="../../tokens.css?v={version}"><link rel="stylesheet" href="../composer.css?v={version}"></head><body class="mc-demo">{body}<script src="../composer.js?v={version}"></script></body></html>''')
        footprint = 'Starts on one line and grows as the draft wraps.' if rows == 1 else f'Starts with {rows} rows for tasks that need a longer prompt.'
        write(f'components/{name}/README.md', f'''# {name}

{title}. {footprint}

Load `components/composer.css` and `components/composer.js`. The form emits a bubbling `meridian:compose` event with `text`, `files`, `model`, `mode`, and `context`. Absent controls use Balanced, Ask, no files, and no context. The preview stages a payload locally. Connect the event to your agent runtime for execution.

Enter submits. Shift+Enter adds a line. Escape closes task settings. Stop preserves the draft. The controls inherit the host's light or dark theme.
''')
    source = (root / 'components/ChatThread/preview.html').read_text(encoding='utf-8')
    source = re.sub(r'<form class="(?:m-ai-composer|mc)".*?</form>', composer('reply'), source, flags=re.S)
    source = re.sub(r'(\.\./composer\.(?:css|js))(?:\?v=[^"]*)?', rf'\1?v={version}', source)
    if '../composer.css' not in source:
        source = source.replace('</head>', f'<link rel="stylesheet" href="../composer.css?v={version}"></head>')
        source = source.replace('</body>', f'<script src="../composer.js?v={version}"></script></body>')
    write('components/ChatThread/preview.html', source)
    write('catalog/composer-markup.js', 'window.MERIDIAN_COMPOSERS = ' + json.dumps(markup) + ';\n')
