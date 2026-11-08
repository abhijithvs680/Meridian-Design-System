"""Rebuild original Meridian additions and the offline catalog. Standard library only."""
from pathlib import Path
import json, re, html
from marketing_catalog import build_marketing
from composer_catalog import build_composers

ROOT = Path(__file__).resolve().parents[1]
version = json.loads((ROOT / 'package.json').read_text(encoding='utf-8'))['version']

def version_theme_links(source):
    return re.sub(r'(href="(?:[\w.-]+/)*(?:tokens|bundle|expressive)\.css)(?:\?v=[^"]*)?"',
                  lambda match: match[1] + '?v=' + version + '"', source)

def stylesheet_names(source):
    return [Path(path).name for path in re.findall(r'<link\b[^>]+href="([^"?]+\.css)(?:\?[^"]*)?"', source)]

def write(path, content):
    dest = ROOT / path
    dest.parent.mkdir(parents=True, exist_ok=True)
    dest.write_text(content, encoding='utf-8')
def badge(text, tone='neutral'):
    return f'<span class="m-badge m-badge-{tone}">{text}</span>'
def button(text, action='', primary=False):
    return f'<button class="m-btn{" m-btn-primary" if primary else ""}" type="button"'+(f' data-do="{action}"' if action else '')+f'>{text}</button>'
def panel(title, content, cls=''):
    return f'<section class="mp-panel mp-stack {cls}"><h3>{title}</h3>{content}</section>'
def link(text, href='#overview'):
    return f'<a class="mp-link" href="{href}">{text}</a>'
def page(title, content, prefix='../../'):
    return f'''<!doctype html><html lang="en" data-theme="light"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>{title} · Meridian</title><link rel="stylesheet" href="{prefix}tokens.css"><link rel="stylesheet" href="{prefix}components/bundle.css"><link rel="stylesheet" href="{prefix}components/expressive.css"><link rel="stylesheet" href="{prefix}components/premium.css"></head><body><main class="mp-stack" style="padding:24px;max-width:1280px;margin:auto">{content}</main><script src="{prefix}components/premium.js"></script></body></html>'''
def demo(body, kind):
    return f'<section class="mp-stack" data-demo="{kind}">{body}<p class="mp-output" data-output role="status" aria-live="polite"></p><p class="mp-demo-note">Interactive sample · fictional data · local state only</p></section>'

mark = '<svg viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="1.75" aria-hidden="true"><circle cx="16" cy="16" r="13"/><path d="M16 3c-9 7-9 19 0 26M16 3c9 7 9 19 0 26M3 16h26"/></svg>'
brand = f'<a class="mp-brand" href="../../index.html">{mark} meridian<span class="mp-tag">2.8</span></a>'
entries=[]
def add(name, group, summary, markup, behavior, states='Loading, empty, error and no-permission are host application responsibilities. Keep a stable heading and announce asynchronous changes.'):
    entries.append(dict(name=name,group=group,summary=summary,path=f'components/{name}/preview.html',markup=markup))
    write(f'components/{name}/preview.html', page(name,markup))
    write(f'components/{name}/README.md',f'''# {name}

{summary}

## Implementation
Optional Meridian 2.8 HTML/CSS pattern. Load `tokens.css`, `components/bundle.css`, `components/premium.css`; load `components/premium.js` for the documented local demo interactions. Existing core classes are preserved. Copy the inner markup from `preview.html` into your application.

## Anatomy and variants
Use the semantic sections, labels and native controls in the preview. `.mp-stack`, `.mp-panel`, `.mp-row` and `.mp-grid` compose the layout. All colors inherit the current Meridian light/dark theme. Compact mode inherits core control density. RTL follows logical spacing.

## Behavior
{behavior}

## States
{states}

## Accessibility
Preserve heading order, native button and form semantics, visible labels, status text and focus rings. Do not announce the entire component on every update. Test keyboard order, 200% zoom, narrow viewports, forced colors and reduced motion in the consuming app. Color is never the only status indicator.

## Integration contract
This is a composition pattern, not an exported React component or a registered OpenUI primitive. Bind real data and action handlers in your adapter. Validate and authorize operations on the server. The standalone preview is deliberately local; no payment, email, authentication or agent execution occurs.
''')

nav=f'''<nav class="mp-nav" aria-label="Main">{brand}<div class="mp-row"><details class="mp-menu"><summary>Platform</summary><div class="mp-mega mp-grid"><div>{link('Business operations','../InvoiceWorkbench/preview.html')}<p>Records, revenue and reporting.</p></div><div>{link('Agent workspace','../AgentControlCenter/preview.html')}<p>Runs, evidence and human decisions.</p></div><div>{link('Asset library','../../index.html#assets')}<p>One consistent visual language.</p></div></div></details>{link('Components','../../index.html#components')}{link('Documentation','../../README.md')}</div>{link('Explore Meridian','../../index.html')}</nav>'''
add('MegaNavigation','Marketing','Responsive product navigation with a native disclosure and a categorized flyout.',nav,'Click or press Enter on Platform to expand. Native details remains usable without JavaScript. Links navigate to bundled examples.')
hero=f'''<section class="mp-hero mp-split"><div class="mp-stack"><span class="mp-eyebrow">Built for the work ahead</span><h1>Clarity at every scale.</h1><p class="mp-muted">One design language for your business, your people, and the agents working alongside them.</p><div class="mp-row">{link('Explore the system','../../index.html#components')}{link('See the agent workspace','../AgentControlCenter/preview.html')}</div><p class="mp-muted">Open formats. Thoughtful defaults. Your identity.</p></div><div class="mp-art"><svg viewBox="0 0 400 300" fill="none" aria-label="Abstract Meridian orbital diagram" role="img"><circle cx="200" cy="150" r="105" stroke="var(--primary)" stroke-width="1.5"/><ellipse cx="200" cy="150" rx="50" ry="105" stroke="var(--primary)"/><path d="M60 150h280M200 30v240" stroke="var(--primary)"/><circle cx="200" cy="150" r="30" fill="var(--primary)"/><circle cx="295" cy="105" r="14" fill="var(--agent)"/><circle cx="108" cy="200" r="9" fill="var(--primary)"/></svg></div></section>'''
add('ProductHero','Marketing','Split editorial hero with an original orbital illustration and clear navigation.',hero,'Links lead to real catalog and demo destinations. Illustration is decorative context, never a chart.')
pricing=demo('''<div class="mp-row mp-between"><div><span class="mp-eyebrow">Simple plans</span><h2 class="mp-title">A workspace for every stage.</h2></div><button class="m-btn" data-do="billing" aria-pressed="false">Annual billing · save 20%</button></div><div class="mp-grid">'''+''.join(panel(name,badge(label,'info')+f'<p class="mp-price">$<span data-monthly="{monthly}" data-yearly="{yearly}">{monthly}</span><small> / seat / month</small></p><p class="mp-muted">{desc}</p><ul><li>Shared component library</li><li>Accessible theme foundations</li><li>{feature}</li></ul>'+button('Choose '+name,'plan',name=='Business'),'mp-featured' if name=='Business' else '') for name,label,monthly,yearly,desc,feature in [('Starter','For small teams','15','12','Bring consistency to your next product.','3 workspaces'),('Business','Most flexible','35','28','Connect teams, systems and workflows.','Unlimited workspaces'),('Scale','For growing organizations','75','60','Put governance at the heart of delivery.','Policy and audit controls')])+'</div>','pricing')
add('PricingComparison','Marketing','Three-tier pricing with a functioning billing-period switch.',pricing,'Annual billing toggles the price and accessible pressed state. Choose-plan buttons explain that checkout is not connected. Prices are fictional product examples.')
add('ConversionPanel','Marketing','A focused closing call to action with supporting trust copy.',f'<section class="mp-hero mp-stack"><span class="mp-eyebrow">From idea to operating system</span><h2 class="mp-title">Build your next chapter on Meridian.</h2><p class="mp-muted">Start with foundations. Compose a workflow. Make it yours.</p><div class="mp-row">{link("Browse components","../../index.html#components")}{link("Read the quick start","../../README.md")}</div></section>','Direct links work without scripts; no email or signup collection.')
footer=f'''<footer class="mp-footer mp-stack"><div class="mp-grid"><div class="mp-stack">{brand}<p class="mp-muted">A clear direction for complex work.</p></div><div class="mp-stack"><strong>Build</strong>{link('Components','../../index.html#components')}{link('Patterns','../../index.html#patterns')}{link('Assets','../../index.html#assets')}</div><div class="mp-stack"><strong>Learn</strong>{link('Getting started','../../README.md')}{link('Design principles','../../DESIGN.md')}{link('Accessibility','../../06-accessibility.md')}</div></div><div class="mp-row mp-between"><span class="mp-muted">Meridian · Designed for people and agents.</span><span class="mp-muted">Your system. Your direction.</span></div></footer>'''
add('ResourceFooter','Marketing','Multi-column resource footer with identity, documentation and product links.',footer,'All links resolve to bundled resources. Adapt legal links and copyright ownership to your product.')

invoices=[('INV-1042','Orbit Labs',124500,'Paid'),('INV-1043','Juniper Studio',84000,'Pending'),('INV-1044','Northstar Works',226000,'Overdue'),('INV-1045','Aster Systems',56000,'Paid'),('INV-1046','Fieldwork Co.',163500,'Pending')]
table='''<div class="mp-scroll"><table class="mp-table"><caption>Sample invoices · INR</caption><thead><tr><th scope="col">Invoice</th><th scope="col">Customer</th><th scope="col" aria-sort="none"><button class="m-btn m-btn-ghost" data-do="sort">Amount ↕</button></th><th scope="col">Status</th></tr></thead><tbody>'''+''.join(f'<tr data-amount="{amount}" data-status="{status}"><td class="mp-code">{id}</td><td>{name}</td><td>₹{amount:,}</td><td>{badge(status,"success" if status=="Paid" else "warning")}</td></tr>' for id,name,amount,status in invoices)+'</tbody></table></div>'
invoice=demo('<div class="mp-row mp-between"><div><span class="mp-eyebrow">Revenue operations</span><h2 class="mp-title">Invoices</h2></div>'+button('Export CSV','download')+'</div><div class="mp-toolbar"><label class="mp-field">Search invoices<input class="mp-input" data-filter placeholder="Customer or invoice number"></label><label class="mp-field">Status<select class="mp-input" data-status-filter><option value="all">All statuses</option><option>Paid</option><option>Pending</option><option>Overdue</option></select></label></div>'+table,'invoices')
add('InvoiceWorkbench','Business','Searchable invoice table with status filtering, amount sorting and CSV export.',invoice,'Search and status filters combine; amount header toggles numeric sort. CSV exports currently visible sample rows. Filtering announces the number of results.','All rows, filtered results, zero results and sorted states are implemented. Fetch/loading/errors belong to your data adapter.')
kanban=demo('<div class="mp-row mp-between"><h2 class="mp-title">Launch pipeline</h2>'+badge('3 tasks')+'</div><div class="mp-kanban">'+''.join(f'<section class="mp-lane mp-stack"><h3>{lane}</h3><div class="mp-stack" data-cards>'+(''.join(f'<article class="mp-panel mp-stack" data-task><span class="mp-eyebrow">{team}</span><h4>{title}</h4><p class="mp-muted">{due}</p>{button("Move to next stage","move")}</article>' for title,team,due in [('Review launch brief','Product','Due Nov 10'),('Approve campaign assets','Marketing','Due Nov 12'),('Publish release notes','Engineering','Due Nov 14')]) if i==0 else '')+'</div></section>' for i,lane in enumerate(['Planned','In progress','Done']))+'</div>','kanban')
add('PipelineBoard','Business','Keyboard-operable task board with explicit move controls.',kanban,'Move to next stage advances each card. Final-stage buttons become disabled. Uses explicit buttons so drag and drop is not required.')
usage=panel('Usage and limits','<div class="mp-row mp-between"><span>Agent credits</span><strong>7,250 / 10,000</strong></div><progress class="mp-meter" max="10000" value="7250" aria-label="Agent credits used"></progress><p class="mp-muted">Resets Dec 1 · 2,750 credits available</p><div class="mp-row mp-between"><span>Storage</span><strong>42 / 100 GB</strong></div><progress class="mp-meter" max="100" value="42" aria-label="Storage used"></progress><p class="mp-muted">Includes archived artifacts and source documents.</p>')
add('SubscriptionUsage','Business','Quota and subscription usage with units, reset date and accessible meters.',usage,'Read-only snapshot. Populate limit, usage and reset time from billing API. Never imply these values are live.')
roles='<div class="mp-scroll"><table class="mp-table"><caption>Workspace role permissions</caption><thead><tr><th scope="col">Capability</th><th scope="col">Viewer</th><th scope="col">Operator</th><th scope="col">Admin</th></tr></thead><tbody>'+''.join('<tr><th scope="row">'+cap+'</th>'+''.join(f'<td>{v}</td>' for v in vals)+'</tr>' for cap,vals in [('Read records',['Allowed','Allowed','Allowed']),('Approve agent writes',['Not allowed','Allowed','Allowed']),('Manage members',['Not allowed','Not allowed','Allowed']),('Delete workspace',['Not allowed','Not allowed','Allowed'])])+'</tbody></table></div>'
add('PermissionMatrix','Business','Readable role-permission matrix for administration and security reviews.',panel('Workspace access',roles+'<p class="mp-muted">Display contract only. Enforce every permission server-side.</p>'),'Read-only role comparison. UI visibility is not authorization. Keep an explicit not-allowed label rather than relying on color.')
audit=panel('Audit trail','<ol class="mp-list mp-log">'+''.join(f'<li><div class="mp-row mp-between"><strong>{title}</strong><time datetime="2026-11-08T{time}:00+05:30">{time} IST</time></div><p class="mp-muted">{who}</p><code class="mp-code">{id}</code></li>' for title,time,who,id in [('Invoice draft approved','14:32','Priya Rao · Human approval · 1 record','evt_1042 · proposal_72'),('Invoice draft prepared','14:30','Meridian agent · Read-only sources','evt_1041 · run_018'),('Source synchronized','14:28','System · Accounting connector','evt_1040 · sync_24')])+'</ol>')
add('AuditExplorer','Business','Chronological audit events distinguish human, agent and system actors.',audit,'Read-only sample. Store append-only events with actor, source, correlation ID and timestamps in the backend; this UI does not guarantee immutability.')
onboard=demo(panel('Make the workspace yours','<span class="mp-eyebrow">Workspace setup</span><progress class="mp-meter" max="4" value="1" aria-label="Setup progress"></progress><div data-checklist>'+''.join(f'<label class="mp-check"><input type="checkbox" {"checked" if i==0 else ""}><span><strong>{title}</strong><br><span class="mp-muted">{desc}</span></span></label>' for i,(title,desc) in enumerate([('Create your workspace','Choose an identity for your team.'),('Invite teammates','Give people the right level of access.'),('Connect a data source','Start with read-only access.'),('Review agent permissions','Set limits before enabling actions.')]))+'</div>'),'onboarding')
add('WorkspaceOnboarding','Business','A four-step checklist with native controls and live progress.',onboard,'Checks update the progress bar and count. Completion is session-local and resets on reload; connect onboarding progress to your account service.')
add('IntegrationCatalog','Business','Connector cards expose availability, scopes and sync state.', '<div class="mp-grid">'+''.join(panel(name,badge(state,'success' if state=='Connected' else 'neutral')+f'<p class="mp-muted">{desc}</p><span class="mp-tag">Scope: {scope}</span><details><summary>Connection requirements</summary><p>{requirements}</p></details>') for name,state,desc,scope,requirements in [('Accounting','Connected','Last sample sync: 2 minutes ago','Read invoices','OAuth credentials must stay on the server. Show revocation and last successful sync.'),('Knowledge base','Not connected','Search team-approved documentation.','Read documents','Request only selected spaces. Show precisely what the agent can retrieve.'),('CRM','Needs attention','Sample credential expired.','Read contacts','Reauthenticate using your provider. Never collect access tokens in this preview.')])+'</div>','Native disclosure reveals connection requirements. There is no OAuth flow or live provider connection.')
add('NotificationInbox','Business','Action-oriented notification inbox links directly to the relevant review surface.',panel('Needs your attention','<ul class="mp-list"><li>'+badge('Approval','warning')+'<h4>Payment terms are ready for review</h4><p class="mp-muted">Meridian analyst · proposal_72 · 4 minutes ago</p>'+link('Review proposed change','../ActionReview/preview.html')+'</li><li>'+badge('Connection','warning')+'<h4>CRM connection needs attention</h4><p class="mp-muted">Workspace system · 12 minutes ago</p>'+link('Inspect integration','../IntegrationCatalog/preview.html')+'</li><li>'+badge('Workspace','info')+'<h4>Finish setting up your workspace</h4>'+link('Continue setup','../WorkspaceOnboarding/preview.html')+'</li></ul>'),'Links navigate to actionable destinations. Production notifications require read/unread persistence, per-user authorization and timestamps from the server.')

run=demo(panel('Research revenue anomalies','<div class="mp-row">'+badge('✧ Meridian analyst','agent')+'<span class="mp-tag" data-run-status>Ready</span><code class="mp-code">run_018</code></div><ol class="mp-list"><li><strong>1. Read approved invoice sources</strong><p class="mp-muted">Accounting · scope: read invoices</p></li><li><strong>2. Compare with previous period</strong><p class="mp-muted">Calculated metrics, linked to source records</p></li><li><strong>3. Prepare a reviewable summary</strong><p class="mp-muted">No messages or writes without approval</p></li></ol><div class="mp-row">'+button('Start demo run','run',True)+button('Cancel run','cancel')+'</div>'),'run')
add('AgentControlCenter','Agent operations','A run surface with visible scope, steps, pause/resume and cancellation.',run,'Start, pause, resume and cancel change local UI state. No autonomous execution is simulated as completed. Cancellation disables subsequent controls.','Ready, running, paused and cancelled are implemented. For real runs also implement failed, timed-out, interrupted, waiting-for-approval and completed from server events.')
approval=demo(panel('Review proposed changes','<div class="mp-row">'+badge('Human approval required','warning')+'<code class="mp-code">proposal_72</code></div><p>Meridian analyst proposes updating the payment terms for <strong>Orbit Labs</strong>.</p><div class="mp-diff"><del><strong>Before</strong><br>Net 30 days</del><ins><strong>After</strong><br>Net 45 days</ins></div><dl><dt>Reason</dt><dd>Renewal contract clause 4.2, reviewed Nov 8</dd><dt>Scope</dt><dd>1 customer record · future invoices only</dd><dt>Reversibility</dt><dd>Can be reverted; issued invoices remain unchanged</dd></dl><div class="mp-row">'+button('Reject proposal','reject')+button('Approve terms change','approve',True)+'</div>','mp-warning'),'approval')
add('ActionReview','Agent operations','Concrete before-and-after review with exact target, scope and a one-time decision.',approval,'Approve/reject locks both buttons and announces the local decision. Bind real decisions to a server-issued proposal ID, revision, expiry and idempotency key. Revalidate permissions and target state before execution.','Pending, approved and rejected local states. Production requires expired, stale, permission-denied, submitting, failed and conflict handling; see agent contract documentation.')
evidence=panel('Evidence behind the finding','<div class="mp-row">'+badge('✧ Agent-generated summary','agent')+badge('2 sources')+'</div><p>Payment delays increased in the enterprise segment. Review the source records before taking action.</p><ol class="mp-list"><li><strong>[1] Invoice ledger · October 2026</strong><p class="mp-muted">Accounting snapshot · Retrieved Nov 8, 14:28 IST</p><details><summary>View quoted evidence</summary><blockquote>18 of 64 enterprise invoices exceeded their payment terms.</blockquote></details></li><li><strong>[2] Collections report · September 2026</strong><p class="mp-muted">Finance team · Retrieved Nov 8, 14:29 IST</p><details><summary>View quoted evidence</summary><blockquote>9 of 61 enterprise invoices exceeded their payment terms.</blockquote></details></li></ol><p class="mp-muted">These sample sources support the trend, not a causal explanation.</p>','mp-agent')
add('EvidencePanel','Agent operations','Source provenance, quoted excerpts and explicit limits on generated findings.',evidence,'Native disclosures expose source excerpts. In production link permission-checked source URLs, retrieval timestamps and stable document versions; do not invent confidence percentages.')
budget=demo(panel('Execution budget','<form class="mp-stack"><label class="mp-field">Maximum cost per run (USD)<input class="mp-input" type="number" min="0.01" max="1000" step="0.01" value="5" required></label><label class="mp-field">Maximum tool calls<input class="mp-input" type="number" min="1" max="100" step="1" value="20" required></label><label class="mp-field">Timeout (minutes)<input class="mp-input" type="number" min="1" max="60" value="10" required></label><label class="mp-check"><input type="checkbox" checked disabled><span>Require approval for external writes</span></label><button class="m-btn m-btn-primary" type="submit">Validate budget</button></form>'),'budget')
add('RunBudget','Agent operations','Explicit cost, tool-call and time limits for agent runs.',budget,'Native validation rejects missing, out-of-range and fractional tool-call values. Submission is local validation only. Server enforces budget atomically across concurrent steps.')
add('ModelRouting','Agent operations','Task-oriented model routing makes cost and fallback policies inspectable.',panel('Routing policy','<p class="mp-muted">Route by capability and data boundary. Names below are fictional deployment aliases.</p><div class="mp-scroll"><table class="mp-table"><caption>Workspace model routes</caption><thead><tr><th scope="col">Task</th><th scope="col">Deployment</th><th scope="col">Fallback</th><th scope="col">Data boundary</th></tr></thead><tbody><tr><th scope="row">Extract fields</th><td>fast-text</td><td>balanced-text</td><td>Workspace region</td></tr><tr><th scope="row">Review contracts</th><td>reasoning-text</td><td>Human review</td><td>Workspace region</td></tr><tr><th scope="row">Read attachments</th><td>vision-text</td><td>Human review</td><td>Workspace region</td></tr></tbody></table></div>'),'Read-only policy surface. Provider integrations must supply current costs, capabilities, residency and availability; no vendor pricing is assumed.')
add('EvaluationScorecard','Agent operations','Evaluation scorecard separates quality, reliability and budget regression.',panel('Release candidate · analyst-v4','<div class="mp-grid">'+''.join(panel(title,f'<strong class="mp-stat">{value}</strong><p class="mp-muted">{detail}</p>') for title,value,detail in [('Task success','92 / 100','100 frozen test cases'),('Policy violations','0','External write cases: 24'),('Median latency','2.8 s','p95 latency: 8.1 s')])+'</div><p class="mp-muted">Sample evaluation only. Record dataset version, judge criteria and baseline before deployment.</p><details><summary>Review failing cases</summary><ul><li>Case 018 · ambiguous customer match</li><li>Case 039 · source document unavailable</li><li>6 additional cases require reviewer triage</li></ul></details>'),'Read-only evaluation summary with failure disclosure. Scores must be traceable to a versioned dataset; this component does not evaluate models.')
add('ArtifactReview','Agent operations','Generated artifact handoff keeps version, source and review state visible.',panel('Quarterly collections brief','<div class="mp-row">'+badge('✧ Agent draft','agent')+badge('Review required','warning')+'</div><p class="mp-muted">Version 3 · Generated from 2 approved sources · Not published</p><details open><summary>Preview document outline</summary><ol><li>Executive summary</li><li>Collections trend and exceptions</li><li>Recommended follow-up</li><li>Evidence and limitations</li></ol></details><div class="mp-row">'+link('Review evidence','../EvidencePanel/preview.html')+link('Review proposed action','../ActionReview/preview.html')+'</div>'),'Links connect the artifact to evidence and action review. Add authenticated download and version diff handlers in your app; the sample does not contain a generated business report.')

# Native vector assets: consistent 24px / 1.75px stroke, no third-party downloads.
icons={
'grid':'<rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>',
'search':'<circle cx="10" cy="10" r="6"/><path d="m15 15 6 6"/>',
'plus':'<path d="M12 4v16M4 12h16"/>','minus':'<path d="M4 12h16"/>','check':'<path d="m4 12 5 5L20 6"/>','close':'<path d="m5 5 14 14M19 5 5 19"/>',
'arrow-right':'<path d="M4 12h16m-6-6 6 6-6 6"/>','arrow-left':'<path d="M20 12H4m6-6-6 6 6 6"/>','arrow-up':'<path d="M12 20V4m-6 6 6-6 6 6"/>','arrow-down':'<path d="M12 4v16m-6-6 6 6 6-6"/>',
'chevron-down':'<path d="m5 9 7 7 7-7"/>','chevron-right':'<path d="m9 5 7 7-7 7"/>',
'play':'<path d="m7 4 13 8-13 8z"/>','pause':'<path d="M8 4v16M16 4v16"/>','stop':'<rect x="5" y="5" width="14" height="14" rx="2"/>',
'document':'<path d="M5 3h9l5 5v13H5zM14 3v5h5M8 12h8M8 16h6"/>','folder':'<path d="M3 6h7l2 3h9v11H3z"/>',
'mail':'<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 6 9 7 9-7"/>',
'calendar':'<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M7 2v6M17 2v6M3 11h18M7 15h3M14 15h3"/>',
'clock':'<circle cx="12" cy="12" r="9"/><path d="M12 6v6l4 2"/>',
'person':'<circle cx="12" cy="7" r="4"/><path d="M4 21v-2a8 8 0 0 1 16 0v2"/>',
'team':'<circle cx="9" cy="7" r="3"/><path d="M2 21v-3a7 7 0 0 1 14 0v3M17 4a3 3 0 0 1 0 6M19 14a6 6 0 0 1 3 5v2"/>',
'lock':'<rect x="5" y="10" width="14" height="11" rx="2"/><path d="M8 10V6a4 4 0 0 1 8 0v4M12 14v3"/>',
'shield':'<path d="m12 2 9 4v6c0 5-9 10-9 10S3 17 3 12V6zM8 12l3 3 5-6"/>',
'chart':'<path d="M3 3v18h18M7 17v-5M12 17V8M17 17V4"/>',
'trend':'<path d="m3 18 6-6 4 3 8-10M14 5h7v7"/>',
'filter':'<path d="M3 4h18l-7 8v7l-4 2v-9z"/>',
'download':'<path d="M12 3v12m-5-5 5 5 5-5M4 15v6h16v-6"/>',
'upload':'<path d="M12 16V3m-5 5 5-5 5 5M4 15v6h16v-6"/>',
'copy':'<rect x="8" y="8" width="13" height="13" rx="2"/><path d="M16 5V3H3v13h2"/>',
'link':'<path d="m9 15 6-6M7 14l-2 2a3 3 0 0 0 4 4l4-4M11 8l4-4a3 3 0 0 1 5 5l-2 2"/>',
'external':'<path d="M14 3h7v7M21 3 10 14M10 5H3v16h16v-7"/>',
'sparkle':'<path d="m12 2 3 7 7 3-7 3-3 7-3-7-7-3 7-3z"/>',
'terminal':'<rect x="2" y="4" width="20" height="16" rx="2"/><path d="m6 8 4 4-4 4M13 16h5"/>',
'database':'<ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M3 5v14c0 4 18 4 18 0V5M3 12c0 4 18 4 18 0"/>',
'workflow':'<rect x="8" y="2" width="8" height="5" rx="1"/><rect x="2" y="17" width="7" height="5" rx="1"/><rect x="15" y="17" width="7" height="5" rx="1"/><path d="M12 7v5H5v5M12 12h7v5"/>',
'code':'<path d="m7 6-5 6 5 6M17 6l5 6-5 6M14 3l-4 18"/>',
'eye':'<path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>',
'warning':'<path d="m12 3 10 18H2zM12 9v5M12 17v1"/>',
'info':'<circle cx="12" cy="12" r="9"/><path d="M12 10v7M12 6v1"/>',
'refresh':'<path d="M20 10a8 8 0 0 0-14-5L3 8M3 3v5h5M4 14a8 8 0 0 0 14 5l3-3M21 21v-5h-5"/>',
'settings':'<path d="M3 6h18M3 12h18M3 18h18"/><circle cx="8" cy="6" r="2" fill="white"/><circle cx="16" cy="12" r="2" fill="white"/><circle cx="10" cy="18" r="2" fill="white"/>',
'receipt':'<path d="M5 2l3 2 4-2 4 2 3-2v20l-3-2-4 2-4-2-3 2zM8 8h8M8 12h8M8 16h5"/>',
'credit-card':'<rect x="2" y="4" width="20" height="16" rx="3"/><path d="M2 9h20M6 16h4"/>',
'globe':'<circle cx="12" cy="12" r="10"/><ellipse cx="12" cy="12" rx="4" ry="10"/><path d="M2 12h20"/>',
'home':'<path d="m2 11 10-9 10 9M5 9v13h14V9M9 22v-8h6v8"/>',
'bell':'<path d="M5 17h14l-2-3V9a5 5 0 0 0-10 0v5zM10 21h4"/>',
'book':'<path d="M12 5C8 2 4 3 2 4v16c4-2 7-1 10 1 3-2 6-3 10-1V4c-2-1-6-2-10 1v16"/>',
'layers':'<path d="m12 2 10 6-10 6L2 8zM2 12l10 6 10-6M2 16l10 6 10-6"/>',
'message':'<path d="M3 3h18v14H9l-6 5zM7 7h10M7 11h7"/>',
'sun':'<circle cx="12" cy="12" r="4"/><path d="M12 1v3M12 20v3M1 12h3M20 12h3M4 4l2 2M18 18l2 2M4 20l2-2M18 6l2-2"/>',
'moon':'<path d="M20 15A9 9 0 0 1 9 3a9 9 0 1 0 11 12z"/>',
'image':'<rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8" cy="8" r="2"/><path d="m3 18 6-6 4 4 4-6 4 6"/>',
'target':'<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1"/>',
'archive':'<rect x="2" y="3" width="20" height="5" rx="1"/><path d="M4 8v13h16V8M9 12h6"/>',
'briefcase':'<rect x="2" y="7" width="20" height="14" rx="2"/><path d="M8 7V3h8v4M2 13c6 4 14 4 20 0M12 12v5"/>',
'heart':'<path d="M12 21S2 15 2 8a5 5 0 0 1 10-2 5 5 0 0 1 10 2c0 7-10 13-10 13z"/>',
'flag':'<path d="M4 22V3h8l2 3h6v10h-8l-2-3H4"/>',
'key':'<circle cx="8" cy="8" r="5"/><path d="m12 12 9 9M16 16l3-3M19 19l3-3"/>',
'cpu':'<rect x="5" y="5" width="14" height="14" rx="2"/><rect x="9" y="9" width="6" height="6"/><path d="M8 1v4M16 1v4M8 19v4M16 19v4M1 8h4M1 16h4M19 8h4M19 16h4"/>'}
assets=[]
for name, drawing in icons.items():
    p=f'assets/Icons/{name}.svg'
    write(p,f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><title>{name.replace("-"," ")}</title>{drawing}</svg>')
    assets.append(dict(name=name,group='Icons',path=p))
write('assets/Icons/sprite.svg','<svg xmlns="http://www.w3.org/2000/svg">'+''.join(f'<symbol id="{name}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round">{draw}</symbol>' for name,draw in icons.items())+'</svg>')
for name,color in [('meridian-mark','#2450d6'),('meridian-mark-dark','#7090ff')]:
    write(f'assets/Logos/{name}.svg',mark.replace('<svg ','<svg xmlns="http://www.w3.org/2000/svg" ').replace('currentColor',color).replace('aria-hidden="true"','role="img" aria-label="Meridian"'))
    assets.append(dict(name=name,group='Logos',path=f'assets/Logos/{name}.svg'))
write('assets/Logos/meridian-lockup.svg','<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 220 40" role="img" aria-label="Meridian"><g fill="none" stroke="#2450d6" stroke-width="1.75"><circle cx="20" cy="20" r="16"/><ellipse cx="20" cy="20" rx="7" ry="16"/><path d="M4 20h32"/></g><text x="48" y="29" font-family="Arial,sans-serif" font-size="29" fill="#18181b">meridian</text></svg>')
assets.append(dict(name='meridian-lockup',group='Logos',path='assets/Logos/meridian-lockup.svg'))
for i,(name,icon) in enumerate([('empty-inbox','mail'),('no-results','search'),('access-protected','shield'),('connected-workspace','workflow'),('agent-ready','sparkle'),('all-complete','check')]):
    p=f'assets/Illustrations/{name}.svg'
    write(p,f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 240" role="img" aria-label="{name.replace("-"," ")}"><rect width="320" height="240" rx="20" fill="#eef2fc"/><g stroke="#c7d4f5" fill="none"><circle cx="160" cy="120" r="87"/><ellipse cx="160" cy="120" rx="115" ry="43" transform="rotate(-25 160 120)"/><path d="M20 120h280M160 20v200"/></g><rect x="108" y="68" width="104" height="104" rx="24" fill="#fff" stroke="#c7d4f5"/><g transform="translate(130 90) scale(2.5)" fill="none" stroke="#2450d6" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round">{icons[icon]}</g><circle cx="246" cy="74" r="9" fill="#6d28d9"/><circle cx="70" cy="162" r="5" fill="#2450d6"/></svg>')
    assets.append(dict(name=name,group='Illustrations',path=p))
for name,body in [('fine-grid','<path d="M0 0H40V40" fill="none" stroke="#2450d6" stroke-opacity=".15"/>'),('dot-field','<circle cx="8" cy="8" r="1.3" fill="#2450d6" fill-opacity=".25"/>'),('diagonal','<path d="M-10 10 10-10M0 40 40 0M30 50 50 30" stroke="#2450d6" stroke-opacity=".12"/>'),('crosshair','<path d="M15 20h10M20 15v10" stroke="#2450d6" stroke-opacity=".2"/>')]:
    p=f'assets/Backgrounds/{name}.svg'
    write(p,f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 480"><defs><pattern id="pattern" width="40" height="40" patternUnits="userSpaceOnUse">{body}</pattern></defs><rect width="800" height="480" fill="#f6f8fe"/><rect width="800" height="480" fill="url(#pattern)"/></svg>')
    assets.append(dict(name=name,group='Backgrounds',path=p))

# Composed full-page starting points; no duplicate adapter implementations.
components={e['name']:e['markup'] for e in entries}
pattern_specs=[('business-operations','Business operations',['InvoiceWorkbench','SubscriptionUsage','AuditExplorer']),('agent-workspace','Agent workspace',['AgentControlCenter','ActionReview','EvidencePanel','RunBudget']),('saas-launch','SaaS launch',['MegaNavigation','ProductHero','PricingComparison','ConversionPanel','ResourceFooter']),('workspace-admin','Workspace administration',['WorkspaceOnboarding','PermissionMatrix','IntegrationCatalog'])]
patterns=[]
for slug,title,names in pattern_specs:
    body=f'<header class="mp-row mp-between">{brand}<span class="mp-tag">{title} · sample workspace</span></header>'+''.join(components[n] for n in names)
    # Pattern files live one level down; component-relative paths are adapted.
    body=body.replace('../../','../')
    for e in entries: body=body.replace(f'../{e["name"]}/',f'../components/{e["name"]}/')
    p=f'patterns/{slug}.html'; write(p,version_theme_links(page(title,body,'../')));patterns.append(dict(name=title,path=p,components=names))
patterns.insert(0, dict(
    name='Agent Operations Studio', path='patterns/operations-studio.html',
    components=['Run timeline', 'Evidence inspector', 'Decision review', 'Budget meter', 'Audit log'],
    summary='Review a ledger adjustment, inspect evidence and replay missed run events in a working reference application.',
    guide='docs/operations-integration.md',
))
marketing_components, launch_patterns, marketing_assets, marketing_markup = build_marketing(write, version)
patterns.extend(launch_patterns)
assets.extend(marketing_assets)

build_composers(write, ROOT, version)

# Make the imported previews genuinely standalone, preserving their original bodies.
for file in (ROOT/'components').glob('*/preview.html'):
    if file.parent.name in marketing_components:
        continue
    text=file.read_text(encoding='utf-8')
    if 'href="../../tokens.css' not in text:
        text=text.replace('</head>','<meta name="viewport" content="width=device-width,initial-scale=1"><link rel="stylesheet" href="../../tokens.css"><link rel="stylesheet" href="../bundle.css"><link rel="stylesheet" href="../expressive.css"></head>')
    file.write_text(version_theme_links(text),encoding='utf-8')

new={e['name']:e for e in entries}; catalog=[]; specimens={}
for file in sorted((ROOT/'components').glob('*/preview.html')):
    name=file.parent.name; text=file.read_text(encoding='utf-8'); readme=file.parent/'README.md'
    desc=readme.read_text(encoding='utf-8').split('\n\n')[1] if readme.exists() else 'Meridian visual composition.'
    group=re.search(r'@dsCard group="([^"]+)"',text)
    catalog.append(marketing_components.get(name) or dict(name=name,group=new[name]['group'] if name in new else group.group(1) if group else 'Showcase',summary=new[name]['summary'] if name in new else desc,path=file.relative_to(ROOT).as_posix(),added=name in new))
    specimens[name] = {
        'source': text.strip(),
        'guide': readme.read_text(encoding='utf-8') if readme.exists() else '',
        'styles': stylesheet_names(text),
        'scripted': bool(re.search(r'<script\b', text)),
    }
for pattern in patterns:
    key = Path(pattern['path']).stem
    source = (ROOT / pattern['path']).read_text(encoding='utf-8').strip()
    specimens[key] = {
        'source': source,
        'guide': (ROOT / pattern['guide']).read_text(encoding='utf-8') if 'guide' in pattern
                 else '## Included components\n' + '\n'.join(pattern['components']),
        'styles': stylesheet_names(source),
        'scripted': bool(re.search(r'<script\b', source)),
    }
token_file = ROOT / 'tokens.css'
generated_marker = '/* Generated token completion from tokens.json. */'
base_css = token_file.read_text(encoding='utf-8').split(generated_marker, 1)[0].rstrip()
existing = set(re.findall(r'(--[\w-]+)\s*:', base_css))
token_document = json.loads((ROOT / 'tokens.json').read_text(encoding='utf-8'))
light_tokens, dark_tokens = [], []
for group in token_document.values():
    if not isinstance(group, dict):
        continue
    for token in group.get('tokens', []):
        name = '--' + token['name']
        if name in existing:
            continue
        value = token['value']
        comment = ' /* ' + token['usage'] + ' */' if token.get('usage') else ''
        def css_value(raw):
            return re.sub(r'\{([\w-]+)\}', r'var(--\1)', str(raw))
        if isinstance(value, dict):
            light_tokens.append(f'  {name}: {css_value(value["light"])};{comment}')
            dark_tokens.append(f'  {name}: {css_value(value["dark"])};')
        else:
            light_tokens.append(f'  {name}: {css_value(value)};{comment}')
token_css = '\n'.join([
    base_css, '', generated_marker, ':root, [data-theme] {',
    *light_tokens, '}', '[data-theme="dark"] {', *dark_tokens, '}', ''
])
write('tokens.css', token_css)

tokens = {}
theme = 'light'
for line in token_css.splitlines():
    if line.startswith(':root'):
        theme = 'light'
    elif line.startswith('[data-theme="dark"]'):
        theme = 'dark'
    token = re.match(r'\s+(--[\w-]+):\s*(.*?);\s*(?:/\*\s*(.*?)\s*\*/)?$', line)
    if token:
        name, value, description = token.groups()
        entry = tokens.setdefault(name, {'name': name, 'description': description or ''})
        entry[theme] = value
write('catalog/specimens.js', 'window.MERIDIAN_SPECIMENS = '+json.dumps(specimens,ensure_ascii=False)+';\n'
      + 'window.MERIDIAN_TOKENS = '+json.dumps(list(tokens.values()),ensure_ascii=False)+';\n')
write('assets/token-handoff.json', json.dumps({'version': version, 'tokens': list(tokens.values())},
                                           indent=2, ensure_ascii=False)+'\n')
data=dict(version=version,components=catalog,assets=assets,patterns=patterns)
write('catalog/data.json',json.dumps(data,indent=2,ensure_ascii=False)+'\n')
write('catalog/data.js','window.MERIDIAN_CATALOG = '+json.dumps(data,ensure_ascii=False)+';\n')
write('catalog/marketing-markup.js','window.MERIDIAN_MARKETING_MARKUP = '+json.dumps(marketing_markup,ensure_ascii=False)+';\n')
write('assets/manifest.json',json.dumps(assets,indent=2)+'\n')
manifest=json.loads((ROOT/'manifest.json').read_text(encoding='utf-8'))
manifest.update(name='Meridian — business and agentic UI',version=version,components=[{k:v for k,v in c.items() if k!='added'} for c in catalog],assetGroups=sorted(set(a['group'] for a in assets)))
manifest['files']=sorted(p.relative_to(ROOT).as_posix() for p in ROOT.rglob('*') if p.is_file() and p.suffix in {'.md','.css','.html','.svg','.json','.js','.mjs','.mts','.tsx','.ts'} and not any(x in p.parts for x in ['releases','.git','node_modules']) and p.name!='manifest.json')
write('manifest.json',json.dumps(manifest,indent=2,ensure_ascii=False)+'\n')
design=json.loads((ROOT/'design-system.json').read_text(encoding='utf-8'))
design['docs']={'readme':'README.md','sections': sorted(p.name for p in ROOT.glob('[0-9]*.md'))+['DESIGN.md','docs/premium-expansion.md','docs/agent-contracts.md','docs/operations-integration.md','docs/premium-benchmark.md','docs/marketing-collection.md','docs/section-studio.md']}
design['assetGroups']={group:{'name':group,'order':[a['name']+'.svg' for a in assets if a['group']==group],'files':{a['name']+'.svg':{'name':a['name']+'.svg','path':a['path'],'size':(ROOT/a['path']).stat().st_size,'type':'image/svg+xml'} for a in assets if a['group']==group}} for group in sorted(set(a['group'] for a in assets))}
design['groups']=list(design['assetGroups']);design['lastChange']={'at':'2026-11-09','note':'2.11.1: contextual composer sizing and neutral agent activity','via':'Codex'}
write('design-system.json',json.dumps(design,indent=2,ensure_ascii=False)+'\n')
print(f'Built {len(entries)} new patterns, {len(catalog)} total previews, {len(assets)} assets and {len(patterns)} page templates.')
