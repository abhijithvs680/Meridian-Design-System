"""Original Meridian editorial sections and launch templates."""
from math import sin, cos, pi

HOME = '../../index.html'
STUDIO = HOME + '#components/operations-studio'
LIBRARY = HOME + '#components'
TOKENS = HOME + '#foundations'
PATTERNS = HOME + '#patterns'
ASSET = '../../assets/Marketing/'

MARK = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" aria-hidden="true"><circle cx="12" cy="12" r="10"/><ellipse cx="12" cy="12" rx="4" ry="10"/><path d="M2 12h20"/></svg>'

def a(text, href=STUDIO, secondary=False):
    return f'<a class="mk-button{" mk-secondary" if secondary else ""}" href="{href}">{text} <span aria-hidden="true">↗</span></a>'

def brand(name='Meridian'):
    return f'<a class="mk-brand" href="{HOME}">{MARK}{name}</a>'

def picture(name, extra=''):
    return f'<img class="mk-art {extra}" src="{ASSET}{name}.svg" alt="" width="800" height="520">'

def section(body, tone='', cls=''):
    return f'<section class="mk-section {cls}" data-mk-tone="{tone}"><div class="mk-inner">{body}</div></section>'

def intro(title, eyebrow, lede='', title_class=''):
    return (f'<p class="mk-eyebrow">{eyebrow}</p><h1 class="mk-title {title_class}">{title}</h1>'
            + (f'<p class="mk-lede">{lede}</p>' if lede else ''))

def cta(title, eyebrow, lede, actions):
    return (f'<p class="mk-eyebrow">{eyebrow}</p><h2 class="mk-title mk-title-sm">{title}</h2>'
            f'<p class="mk-lede">{lede}</p><div class="mk-actions">{actions}</div>')

def nav_row(links, tone='', extra='', suffix='', name='Meridian'):
    return (f'<nav class="mk-nav {extra}" data-mk-tone="{tone}" aria-label="Site navigation">'
            f'{suffix}<div class="mk-nav-row">{brand(name)}<div class="mk-nav-links">{links}</div></div></nav>')

def form(label, action):
    return (f'<form class="mk-form" data-mk-form><label>{label}<input type="email" autocomplete="email" '
            f'placeholder="name@example.com" required></label><button type="submit" class="mk-button">{action}</button>'
            '<output aria-live="polite"></output></form>')

def sheet(title, body, prefix, version):
    return f'''<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>{title} · Meridian Marketing</title><link rel="stylesheet" href="{prefix}marketing/marketing.css?v={version}"></head>
<body class="mk-page">{body}<script src="{prefix}marketing/marketing.js?v={version}"></script></body></html>
'''

def build_art(write):
    assets = []
    def art(name, bg, body):
        path = f'assets/Marketing/{name}.svg'
        write(path, f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 520"><rect width="800" height="520" fill="{bg}"/>{body}</svg>')
        assets.append(dict(name=name, group='Marketing', path=path))

    coordinates = ''.join(f'<path d="M{x} 0V520"/>' for x in range(20, 800, 40))
    coordinates += ''.join(f'<path d="M0 {y}H800"/>' for y in range(20, 520, 40))
    contours = []
    for index in range(33):
        points = []
        for step in range(73):
            angle = 2 * pi * step / 72
            radius = 28 + index * 8
            wobble = sin(3 * angle + index * .12) * 17 + cos(5 * angle) * 6
            points.append(f'{420 + (radius + wobble) * cos(angle):.1f},{246 + .68 * (radius + wobble) * sin(angle):.1f}')
        contours.append('<polygon points="' + ' '.join(points) + '"/>')
    art('contour-field', '#102719', f'<g stroke="#99b489" opacity=".18">{coordinates}</g>'
        '<g stroke="#cee59d" stroke-width="1" fill="none">' + ''.join(contours)
        + '</g><path d="M420 24v464M76 246h653" stroke="#a9bfa1" stroke-dasharray="4 9" opacity=".65"/>'
        '<circle cx="420" cy="246" r="5" fill="#d6ed91"/>')
    ellipses = ''.join(f'<ellipse cx="510" cy="254" rx="{75 + i*8}" ry="{30 + i*4}" transform="rotate({i*8} 510 254)"/>'
                       for i in range(18))
    art('orbital-array', '#101b2a', f'<g stroke="#6d8da9" opacity=".17">{coordinates}</g>'
        '<g fill="none" stroke="#bad9ec" stroke-width="1.3">' + ellipses
        + '</g><circle cx="510" cy="254" r="13" fill="#d7e8f5"/><circle cx="680" cy="170" r="7" fill="#e9a778"/>')
    terraces = ''.join(f'<path d="M{50+i*16} {370-i*11}l{340-i*11} -130 210 85 -{340-i*11} 130z" fill="{["#883b28","#b45132","#cd7550","#e2a77a"][i%4]}" stroke="#f5c39a" stroke-width="1.1"/>'
                       for i in range(15))
    art('clay-terraces', '#e7c5a2', terraces + '<path d="M25 28H775V492H25Z" stroke="#a76a49" fill="none"/>')
    rules = ''.join(f'<path d="M{150+i*18} 82v356M76 {104+i*19}h648"/>' for i in range(20))
    forms = ''.join(f'<rect x="{148+i*13}" y="{116+i*6}" width="{394-i*10}" height="{280-i*8}" transform="rotate({i*4} 400 256)"/>' for i in range(20))
    art('drafting-plates', '#efe9d6', f'<g stroke="#b5ad95" opacity=".4">{rules}</g>'
        f'<g stroke="#293d35" stroke-width="1" fill="none">{forms}</g><circle cx="400" cy="256" r="5" fill="#a43b22"/>')
    return assets

def build_marketing(write, version):
    designs = []
    def add(name, title, group, summary, body, behavior):
        path = f'components/{name}/preview.html'
        write(path, sheet(title, body, '../../', version))
        write(f'components/{name}/README.md', f'''# {title}

{summary}

## Use
Copy the section from the specimen into a `mk-page` wrapper. Load `marketing/marketing.css`. Include `marketing/marketing.js` for disclosure, dialog, form, pricing, gallery or progress controls. Keep the assets in `assets/Marketing` and adjust relative paths when moving the markup.

## Interaction
{behavior}

## Handoff
Choose a scoped `data-mk-tone`, edit the product content and replace the example destinations. Use one H1 per page and update heading levels when combining sections. Verify keyboard focus, mobile wrapping and reduced motion in the assembled page.
''')
        item = dict(name=name, title=title, group='Marketing · ' + group, family=group, order=len(designs),
                    summary=summary, path=path, added=True)
        designs.append((item, body))

    links = f'<a href="{LIBRARY}">Components</a><a href="{PATTERNS}">Templates</a><a href="{TOKENS}">Tokens</a>'
    menu = f'<details><summary>Explore</summary><div class="mk-popover">{links}</div></details>'
    mega = (f'<details><summary>Platform</summary><div class="mk-popover mk-menu-grid">'
            f'<div><strong>Build</strong>{links}</div><div><strong>Operate</strong><a href="{STUDIO}">Agent Operations</a>'
            f'<a href="{HOME}#assets">Asset library</a></div></div></details>')
    demo_article = section(intro('A library in motion.', 'Navigation specimen',
                                 'Follow the working links or scroll to see how the header behaves.'))
    article_tail = section(cta('Find your starting point.', 'Library index', 'Explore Meridian’s reference applications.', a('Browse templates', PATTERNS)), 'ink')
    add('EditorialHeader', 'Editorial header', 'Navigation', 'An understated editorial header with a native flyout.',
        nav_row(menu + links, name='Fieldwork') + demo_article, 'Tab to Explore and use Enter to toggle it. Escape closes it and returns focus.')
    add('LaunchMegamenu', 'Launch megamenu', 'Navigation', 'Two grouped link columns and a release announcement.',
        nav_row(mega + f'<a href="{STUDIO}">Operations</a>' + a('Browse kit', LIBRARY), 'forest',
                suffix=f'<a class="mk-announcement" href="{STUDIO}">Release notes · Agent Operations is available ↗</a>') + demo_article,
        'The announcement has its own destination. The menu remains an ordinary disclosure with link navigation.')
    add('StickyProductNav', 'Sticky product navigation', 'Navigation', 'A persistent product header with reading progress.',
        nav_row(links, 'ink', 'mk-sticky', '<progress class="mk-progress" data-mk-progress max="100" value="0" aria-label="Page reading progress"></progress>') +
        demo_article + section(picture('drafting-plates')) + article_tail,
        'Scroll the preview to update reading progress. Sticky positioning leaves native document scrolling intact.')
    fullscreen = ('<button type="button" class="mk-button mk-secondary" data-mk-dialog="site-index">Open index</button>'
                  '<dialog class="mk-dialog" id="site-index" aria-labelledby="menu-heading"><header><h2 id="menu-heading">Site index</h2>'
                  '<form method="dialog"><button class="mk-button mk-secondary">Close</button></form></header>'
                  f'<nav aria-label="Site index">{links}<a href="{STUDIO}">Operations Studio</a></nav></dialog>')
    add('FullscreenIndex', 'Fullscreen index', 'Navigation', 'A large format index with a modal reading order.',
        nav_row(fullscreen, 'ink') + demo_article, 'Open the index and use Escape or Close. The opener regains focus.')
    add('ResourceRail', 'Resource rail', 'Navigation', 'A narrow sidebar index with breadcrumbs for structured documentation.',
        f'<div class="mk-rail"><nav class="mk-nav" data-mk-tone="forest" aria-label="Resources">{brand("Fieldwork")}'
        f'<div class="mk-nav-links">{links}<a href="{STUDIO}">Operations</a></div></nav>'
        + section(f'<nav class="mk-breadcrumbs" aria-label="Breadcrumb"><a href="{HOME}">Home</a><span aria-hidden="true">/</span><span aria-current="page">Field guide</span></nav>'
                  + intro('Field guide', 'Documentation', 'An index for products, teams and operational resources.', 'mk-title-sm')) + '</div>',
        'The rail stacks above the article on small screens.')
    searchable = ('<div class="mk-search" data-mk-search><label>Find a resource<input type="search" placeholder="Try tokens"></label>'
                  '<output role="status">4 results</output><ul class="mk-search-results">'
                  f'<li><a href="{TOKENS}">Design tokens and color</a></li><li><a href="{PATTERNS}">Launch templates</a></li>'
                  f'<li><a href="{LIBRARY}">Component reference</a></li><li><a href="{STUDIO}">Agent operations</a></li></ul></div>')
    add('ResourceSearchNav', 'Resource search navigation', 'Navigation', 'A searchable resource index inside a navigation disclosure.',
        nav_row('<details><summary>Search resources</summary><div class="mk-popover">' + searchable + '</div></details>', name='Index') + demo_article,
        'Search filters the visible resource links and announces the result count.')
    add('ProductSubnav', 'Product subnavigation', 'Navigation', 'Breadcrumbs and secondary navigation for a product family.',
        nav_row(links, 'ink', name='Atlas') + '<div class="mk-nav mk-nav-row" aria-label="Product context">'
        f'<nav class="mk-breadcrumbs" aria-label="Breadcrumb"><a href="{HOME}">Platform</a><span aria-hidden="true">/</span><span aria-current="page">Observability</span></nav>'
        f'<nav class="mk-nav-links" aria-label="Related resources"><a href="{STUDIO}">Run history</a><a href="{TOKENS}">Implementation</a></nav></div>'
        + demo_article, 'Breadcrumbs identify position. Sibling destinations use links, with no tab semantics.')

    orbital = ('<section class="mk-section mk-hero-art" data-mk-tone="ink">' + picture('orbital-array')
               + section(intro('See the work behind the answer.', 'MERIDIAN / AGENT SYSTEMS',
                               'Inspect how a run reached its outcome. Review the evidence and approve the next step with context.')
                         + '<div class="mk-actions">' + a('Open operations studio') + a('Browse components', LIBRARY, True) + '</div>', 'ink') + '</section>')
    add('OrbitalProductHero', 'Orbital product hero', 'Heroes', 'A cinematic blue-black hero with original orbital linework and a clear product action.', orbital,
        'The SVG is decorative. Both actions remain available at every viewport width.')
    land = section('<div class="mk-split"><div>' + intro('Read the terrain.', 'FIELDWORK / STUDY 01',
                   'A visual language for products that make complex systems easier to navigate.', 'mk-serif')
                   + '<div class="mk-actions">' + a('Explore the patterns', PATTERNS) + '</div></div>'
                   + f'<figure>{picture("contour-field")}<figcaption class="mk-meta"><span>FIG 01 / ELEVATION FIELD</span><span>800 × 520</span></figcaption></figure></div>',
                   '', 'mk-editorial')
    add('FieldworkEditorialHero', 'Fieldwork editorial hero', 'Heroes', 'Large serif typography, generous space and an original topographic plate.', land,
        'The split reflows into a single reading column on mobile.')
    product_preview = ('''<div class="mk-product"><div class="mk-product-top">RUN REVIEW / FINANCE OPERATIONS</div>
<div class="mk-product-body"><small>INV-1042 · PROPOSED ADJUSTMENT</small><h2>Remove duplicate fee</h2>
<table><thead><tr><th scope="col">Field</th><th scope="col">Before</th><th scope="col">After</th></tr></thead><tbody>
<tr><th scope="row">Invoice total</th><td>$1,480</td><td>$1,455</td></tr><tr><th scope="row">Processing fee</th><td>$50</td><td>$25</td></tr>
</tbody></table><p><small>2 sources · Human review required</small></p>''' + a('Inspect live run') + '</div></div>')
    agent = section('<div class="mk-split"><div>' + intro('Work you can verify.', 'MERIDIAN / OPERATIONS',
                    'Give teams a clear record of what an agent read, proposed and changed.', 'mk-title-sm')
                    + '<div class="mk-actions">' + a('Review a run') + '</div></div>' + product_preview + '</div>', 'forest')
    add('ProductProofHero', 'Product proof hero', 'Heroes', 'A split hero that demonstrates a real review state in the headline area.', agent,
        'The compact table is readable HTML. Both actions lead to the interactive run review.')
    masthead = section('<div class="mk-masthead"><div class="mk-meta"><span>MERIDIAN / EDITION 01</span><span>DESIGN SYSTEMS FOR PRODUCT TEAMS</span></div>'
                       + intro('FIELDWORK', '', 'Interfaces for teams navigating complex work.')
                       + '<div class="mk-actions">' + a('Explore the system', LIBRARY) + '</div></div>', 'rust')
    add('TypeFirstHero', 'Type-first hero', 'Heroes', 'A masthead-sized wordmark and one action on a rust color field.', masthead,
        'Use a short title and keep the primary action visible below it.')
    centered = section(intro('One system. Many surfaces.', 'MERIDIAN / DESIGN TO CODE',
                             'From the first product page to the operational work behind it.')
                       + '<div class="mk-actions">' + a('Start with a template', PATTERNS) + a('Inspect the tokens', TOKENS, True)
                       + '</div><div class="mk-divider">' + picture('drafting-plates') + '</div>', '', 'mk-center')
    add('BlueprintHero', 'Blueprint hero', 'Heroes', 'Centered product positioning over a technical drafting illustration.', centered,
        'The primary and secondary actions remain links. Use short copy to preserve the balance of the composition.')

    conversion = section(cta('Put the system to work.', 'NEXT STEP / 01', 'Start with the same tools used in Meridian’s reference applications.',
                             a('Open the library', LIBRARY) + a('Explore the tokens', TOKENS, True)), 'rust')
    add('EditorialAction', 'Editorial action', 'Calls to action', 'A high contrast closing section with two explicit routes.', conversion,
        'Use the primary link for the next step and the secondary link for evaluation.')
    download = section('<div class="mk-split"><div>' + cta('Take the palette with you.', 'DESIGN HANDOFF / JSON',
                       'Download Meridian’s theme values for inspection or integration.',
                       f'<a class="mk-button" href="../../assets/token-handoff.json" download>Download token JSON <span aria-hidden="true">↓</span></a>')
                       + '</div>' + picture('drafting-plates') + '</div>', 'ink')
    add('DownloadGate', 'Download handoff', 'Calls to action', 'A direct download with clear file format and no lead capture.', download,
        'The download points to the current generated token handoff.')
    newsletter = section('<div class="mk-split"><div>' + cta('Notes from the field.', 'FIELD NOTES / 01',
                         'An editorial newsletter pattern for release notes, design decisions, and lessons from real products.', '')
                         + '</div><div>' + form('Email address', 'Subscribe in preview') + '</div></div>', 'forest')
    add('NewsletterEdition', 'Newsletter edition', 'Calls to action', 'A publication signup with native validation and visible feedback.', newsletter,
        'Enter a sample address to preview feedback. Connect consent and delivery to your own service for a live signup.')
    modal_cta = section(cta('Bring a workflow.', 'WORKING SESSION', 'A request pattern for teams evaluating an operational rollout.',
                         '<button type="button" class="mk-button" data-mk-dialog="demo-request">Request a session ↗</button>')
                         + '<dialog class="mk-dialog" id="demo-request" aria-labelledby="request-heading"><header>'
                         '<h2 id="request-heading">Request a session</h2><form method="dialog"><button class="mk-button mk-secondary">Close</button></form></header>'
                         + form('Work email', 'Preview request') + '</dialog>')
    add('ConsultationDialog', 'Consultation dialog', 'Calls to action', 'A focused modal lead form with keyboard-safe dismissal.', modal_cta,
        'Native dialog handles Escape and modal focus. Form confirmation is local to the specimen.')
    pricing = section('<div data-mk-billing><p class="mk-eyebrow">PLANS / EXAMPLE PRICING</p><h2 class="mk-title mk-title-sm">Choose your workspace.</h2>'
        '<label>Billing period <select><option value="monthly">Monthly</option><option value="annual">Annual</option></select></label>'
        '<div class="mk-price-grid"><article class="mk-price"><h3>Studio</h3><strong data-monthly="$49" data-annual="$39">$49</strong>'
        '<p>For a single product team.</p>' + a('See Studio workflow', STUDIO, True) + '</article>'
        '<article class="mk-price mk-price-featured"><h3>Operations</h3><strong data-monthly="$149" data-annual="$119">$149</strong>'
        '<p>For teams coordinating agent reviews.</p>' + a('Inspect Operations') + '</article></div>'
        '<output aria-live="polite">Billed monthly.</output></div>', 'forest')
    add('PlanDecisionCTA', 'Plan decision', 'Calls to action', 'Plan selection with monthly and annual price examples.', pricing,
        'Changing billing updates both amounts and the billing explanation. The links open working examples.')
    add('ProductProofCTA', 'Product proof action', 'Calls to action', 'A conversion section with the actual review interface alongside it.',
        section('<div class="mk-split"><div>' + cta('See a decision through.', 'TRY A REAL FLOW',
                'Explore the review, evidence and execution outcome before adopting the kit.', a('Open the review'))
                + '</div>' + product_preview + '</div>'),
        'The table is readable without interaction. The CTA opens the complete reference application.')

    def foot_column(title, entries):
        return f'<div><h2>{title}</h2><ul>' + ''.join(f'<li><a href="{href}">{label}</a></li>' for label, href in entries) + '</ul></div>'
    def footer(body, tone=''):
        return f'<footer class="mk-section mk-footer" data-mk-tone="{tone}"><div class="mk-inner">{body}</div></footer>'
    foot_links = (foot_column('Product', [('Operations Studio', STUDIO), ('Page templates', PATTERNS)])
                  + foot_column('Build', [('Component library', LIBRARY), ('Design tokens', TOKENS)])
                  + foot_column('Resources', [('Marketing collection', HOME+'#marketing'), ('Assets', HOME+'#assets')]))
    colophon = '<div class="mk-meta mk-divider"><span>MERIDIAN / DESIGN SYSTEM</span><a href="#top">Back to top ↑</a></div>'
    typography = footer('<div class="mk-meta"><span>THE FIELDWORK INDEX</span><span>EDITION 01 / COLOPHON</span></div>'
                        '<strong class="mk-word mk-serif">Fieldwork.</strong><div class="mk-foot-grid">' + foot_links + '</div>' + colophon, 'forest')
    add('WordmarkColophon', 'Wordmark colophon', 'Footers', 'An oversize serif sign-off with a practical link index.', typography,
        'Link groups retain meaningful headings at narrow sizes.')
    matrix = footer(brand() + '<div class="mk-foot-grid">' + foot_links + '</div>' + colophon, 'ink')
    add('ResourceMatrixFooter', 'Resource matrix footer', 'Footers', 'A compact footer grid for products with extensive documentation.', matrix,
        'Group destinations by user intent. Each link leads to a corresponding Meridian section.')
    illustrated = footer('<div class="mk-split"><div>' + brand('Fieldwork')
                         + '<p class="mk-lede">A visual language for complex systems.</p><div class="mk-foot-grid">'
                         + foot_column('Explore', [('Sections', HOME+'#marketing'), ('Assets', HOME+'#assets')])
                         + '</div></div>' + picture('clay-terraces') + '</div>' + colophon, 'rust')
    add('IllustratedColophon', 'Illustrated colophon', 'Footers', 'An illustrated footer with a warm clay terrace plate.', illustrated,
        'The illustration is decorative and reflows after the links on mobile.')
    footer_cards = footer(brand() + '<div class="mk-foot-grid"><div class="mk-footer-card">' + foot_column('Find a pattern', [('Page templates', PATTERNS)])
                          + '</div><div class="mk-footer-card">' + foot_column('Build with tokens', [('Color and themes', TOKENS)])
                          + '</div><div class="mk-footer-card">' + foot_column('Inspect a run', [('Operations Studio', STUDIO)])
                          + '</div></div>' + colophon)
    add('PathwayFooter', 'Pathway footer', 'Footers', 'Three clearly framed destinations for readers who reach the end of a page.', footer_cards,
        'The cards stack when the page no longer has room for three columns.')
    minimal = footer(f'<div class="mk-meta"><span>{brand()}</span><span><a href="{LIBRARY}">Components</a> · <a href="{TOKENS}">Tokens</a> · '
                     f'<a href="{PATTERNS}">Templates</a></span><span>DESIGN TO CODE / MERIDIAN</span></div>')
    add('QuietFooter', 'Quiet footer', 'Footers', 'A slim sign-off for documentation and product tools.', minimal,
        'Footer links wrap rather than shrinking below a readable size.')

    chapter_intro = section(intro('How a run earns trust.', 'SCROLL STUDY / 01',
                                  'Scroll through the three checkpoints of an agent-assisted decision.', 'mk-title-sm'), 'forest')
    chapters = section('<div class="mk-split mk-chapters"><header><p class="mk-eyebrow">THE REVIEW PATH</p>'
                       '<h2 class="mk-title mk-title-sm mk-serif">Three checkpoints.</h2></header><div>'
                       + ''.join(f'<article><p class="mk-eyebrow">0{i+1} / {label}</p><h3>{title}</h3><p>{copy}</p></article>'
                                 for i, (label, title, copy) in enumerate([
                                     ('Read', 'See the evidence.', 'Versioned source excerpts show where a proposed change came from.'),
                                     ('Review', 'Compare before and after.', 'The reviewer sees the exact target, change, and impact.'),
                                     ('Resolve', 'Verify the outcome.', 'The timeline separates the approval receipt from the result of execution.')]))
                       + '</div></div>')
    add('PinnedChapters', 'Pinned chapters', 'Scroll effects', 'A sticky chapter heading beside a naturally scrolling narrative.', chapter_intro + chapters + conversion,
        'The heading releases at the end of its section. On narrow screens and reduced motion it uses regular document flow.')
    scroll_art = (section(intro('A field in motion.', 'SCROLL STUDY / 02',
                               'Scroll past the plate to see the artwork drift within its frame.', 'mk-title-sm'), 'forest')
                  + section(picture('contour-field', 'mk-motion-art'), 'forest', 'mk-motion')
                  + section(cta('Read the layers.', 'DESIGN NOTE', 'The content stays in normal flow while the artwork follows the viewport.', a('Explore assets', HOME+'#assets'))))
    add('ContourParallax', 'Contour parallax', 'Scroll effects', 'A topographic plate with native viewport-linked drift.', scroll_art,
        'Browsers that support view timelines animate the decorative art. Others render the complete static plate.')
    gallery = section('<div data-mk-track>' + intro('The plate library.', 'SCROLL STUDY / 03', 'Browse original artwork by dragging the track or using the controls.', 'mk-title-sm')
                      + '<div class="mk-actions"><button class="mk-button mk-secondary" type="button" data-mk-step="-1">Previous</button>'
                      '<button class="mk-button" type="button" data-mk-step="1">Next</button><output aria-live="polite">1 of 4</output></div>'
                      '<div class="mk-track" tabindex="0" role="region" aria-label="Artwork plates">'
                      + ''.join(f'<article>{picture(name)}<h3>{title}</h3></article>' for name, title in [
                          ('contour-field', 'Elevation'), ('clay-terraces', 'Terraces'),
                          ('orbital-array', 'Orbital array'), ('drafting-plates', 'Drafting')])
                      + '</div></div>', 'ink')
    add('SnapPlateGallery', 'Snap plate gallery', 'Scroll effects', 'A manual horizontal gallery with snap points and explicit controls.', gallery,
        'Next and Previous pan the track. The track also supports native touch and keyboard scrolling. There is no autoplay.')
    reveal = chapter_intro + ''.join(section('<div class="mk-split mk-reveal-panel"><div>' + cta(title, label, body, a('Inspect the workflow'))
                                            + '</div>' + picture(art) + '</div>', tone)
                                    for title, label, body, art, tone in [
                                        ('Sources first.', '01 / EVIDENCE', 'Begin with evidence you can inspect.', 'drafting-plates', ''),
                                        ('The decision is visible.', '02 / REVIEW', 'Make the proposed change clear before it runs.', 'orbital-array', 'ink')])
    add('ProgressivePanels', 'Progressive panels', 'Scroll effects', 'Editorial feature panels with a restrained entrance effect.', reveal,
        'The content remains visible before motion begins. Reduced-motion and unsupported browsers show static panels.')

    patterns = []
    for slug, title, body, names, summary in [
        ('fieldwork-launch', 'Fieldwork editorial launch',
         nav_row(menu + links, name='Fieldwork') + land + gallery.replace('<h1', '<h2').replace('</h1>', '</h2>') + newsletter + typography,
         ['Editorial header', 'Fieldwork editorial hero', 'Snap plate gallery', 'Newsletter edition', 'Wordmark colophon'],
         'An editorial launch page with original artwork, a horizontal gallery and a newsletter section.'),
        ('agent-product-launch', 'Agent product launch',
         nav_row(mega + links, 'forest') + agent + chapters + pricing + matrix,
         ['Launch megamenu', 'Product proof hero', 'Pinned chapters', 'Plan decision', 'Resource matrix footer'],
         'A full product launch for agent operations, from proof of capability through pricing and resources.')
    ]:
        path = f'patterns/{slug}.html'
        write(path, sheet(title, body.replace('../../', '../'), '../', version))
        patterns.append(dict(name=title, path=path, components=names, summary=summary))
    markup = {}
    for item, body in designs:
        if item['family'] == 'Navigation' and item['name'] != 'ResourceRail':
            body = body.split(demo_article, 1)[0]
        markup[item['name']] = body.replace('../../', '')
    return {item['name']: item for item, _ in designs}, patterns, build_art(write), markup
