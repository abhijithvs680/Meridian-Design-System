// Meridian × OpenUI — component library for @openuidev/react-lang
// The model can only emit these components; it never writes CSS or picks colors.
// Positional argument order = zod key order: required, distinctive props first; optional last.
// Verify the child-node and action APIs against your installed @openuidev/react-lang version.
import { createLibrary, defineComponent } from "@openuidev/react-lang";
import { z } from "zod/v4";
import { Fragment, useEffect, useId, useRef, useState, type ReactNode } from "react";
import "../components/bundle.css"; // plus tokens.css from the design system
import "../components/expressive.css"; // Expressive pack (opt-in): remove with the x-components below if unused

const tone = z.enum(["neutral", "info", "success", "warning", "danger", "agent"]);
const nodes = z.array(z.any()); // references to other statements (child components)

const cx = (...c: (string | false | undefined)[]) => c.filter(Boolean).join(" ");
// Render child statements with stable keys (renderNode output carries none).
const renderAll = (nodes: unknown[] | undefined, renderNode: (n: unknown) => unknown) =>
  nodes?.map((n, i) => <Fragment key={i}>{renderNode(n) as ReactNode}</Fragment>);

/* ---------- Layout ---------- */
export const Page = defineComponent({
  name: "Page",
  description: "Root of every generated screen. Children stack with section spacing.",
  props: z.object({ children: nodes }),
  component: ({ props, renderNode }) => <div className="m-main">{renderAll(props.children, renderNode)}</div>,
});

export const Grid = defineComponent({
  name: "Grid",
  description: "Responsive grid of cards. columns: 2 for charts/insights, 4 for StatCards.",
  props: z.object({ children: nodes, columns: z.enum(["2", "3", "4"]).optional() }),
  component: ({ props, renderNode }) => (
    <div className={props.columns === "4" ? "m-stat-grid" : "m-grid-2"}>{renderAll(props.children, renderNode)}</div>
  ),
});

export const Card = defineComponent({
  name: "Card",
  description: "Container for one unit of content. Title states what the card answers.",
  props: z.object({ title: z.string(), children: nodes, description: z.string().optional() }),
  component: ({ props, renderNode }) => (
    <section className="m-card">
      <div className="m-card-head"><div>
        <h3 className="m-card-title">{props.title}</h3>
        {props.description && <p className="m-card-desc">{props.description}</p>}
      </div></div>
      {renderAll(props.children, renderNode)}
    </section>
  ),
});

export const PageHeader = defineComponent({
  name: "PageHeader",
  description: "Top of the screen: title, optional breadcrumb, up to 3 Buttons (one primary, rightmost).",
  props: z.object({ title: z.string(), actions: nodes.optional(), breadcrumb: z.string().optional() }),
  component: ({ props, renderNode }) => (
    <header className="m-pagehead">
      <div>{props.breadcrumb && <nav className="m-crumbs" aria-label="Breadcrumb">{props.breadcrumb}</nav>}
        <h1 className="m-pagetitle">{props.title}</h1></div>
      <div className="m-actions">{renderAll(props.actions, renderNode)}</div>
    </header>
  ),
});

/* ---------- Content ---------- */
export const Text = defineComponent({
  name: "Text",
  description: "A paragraph of body text. muted for secondary text.",
  props: z.object({ text: z.string(), muted: z.boolean().optional() }),
  component: ({ props }) => <p style={{ margin: 0, color: props.muted ? "var(--fg-muted)" : undefined }}>{props.text}</p>,
});

export const Button = defineComponent({
  name: "Button",
  description: "An action. variant: secondary (default), primary (max one per screen), ghost, agent (hands work to an agent), danger.",
  props: z.object({
    label: z.string(),
    action: z.string(),
    variant: z.enum(["secondary", "primary", "ghost", "agent", "danger"]).optional(),
  }),
  component: ({ props }) => (
    <button className={cx("m-btn", props.variant && props.variant !== "secondary" && `m-btn-${props.variant}`)} data-action={props.action}>
      {props.label}
    </button>
  ),
});

export const Badge = defineComponent({
  name: "Badge",
  description: "1–3 words of record status. Use the tone mapped for that status.",
  props: z.object({ label: z.string(), tone: tone.optional() }),
  component: ({ props }) => <span className={cx("m-badge", props.tone && props.tone !== "neutral" && `m-badge-${props.tone}`)}>{props.label}</span>,
});

export const StatCard = defineComponent({
  name: "StatCard",
  description: "One KPI. delta must include its comparison period in deltaLabel. good=false colors a rising cost red.",
  props: z.object({
    label: z.string(), value: z.string(),
    delta: z.string().optional(), deltaLabel: z.string().optional(),
    trend: z.enum(["up", "down", "flat"]).optional(), good: z.boolean().optional(),
  }),
  component: ({ props }) => {
    const cls = props.trend === "flat" || props.good === undefined ? "" : props.good ? "up" : "down";
    const arrow = props.trend === "up" ? "▲ " : props.trend === "down" ? "▼ " : "";
    return (
      <div className="m-stat">
        <div className="m-stat-label">{props.label}</div>
        <div className="m-stat-value">{props.value}</div>
        {(props.delta || props.deltaLabel) && <div className={cx("m-delta", cls)}>{arrow}{props.delta} <span>{props.deltaLabel}</span></div>}
      </div>
    );
  },
});

export const Table = defineComponent({
  name: "Table",
  description: "Records in rows. columns: [{label, type}] where type is text|id|number|currency|date|status. Status cells are [label, tone].",
  props: z.object({
    columns: z.array(z.object({ label: z.string(), type: z.enum(["text", "id", "number", "currency", "date", "status"]).optional() })),
    rows: z.array(z.array(z.union([z.string(), z.number(), z.tuple([z.string(), tone])]))),
    title: z.string().optional(),
  }),
  component: ({ props }) => (
    <div className="m-table-wrap">
      {props.title && <div className="m-toolbar"><strong>{props.title}</strong></div>}
      <div className="m-table-scroll"><table className="m-table">
        <thead><tr>{props.columns.map((c, i) => <th key={i} scope="col" className={c.type === "currency" || c.type === "number" ? "r" : undefined}>{c.label}</th>)}</tr></thead>
        <tbody>{props.rows.map((r, i) => <tr key={i}>{r.map((cell, j) => {
          const t = props.columns[j]?.type;
          if (Array.isArray(cell)) return <td key={j}><span className={cx("m-badge", cell[1] !== "neutral" && `m-badge-${cell[1]}`)}>{cell[0]}</span></td>;
          return <td key={j} className={cx((t === "currency" || t === "number") && "r", t === "id" && "m-mono")}>{cell}</td>;
        })}</tr>)}</tbody>
      </table></div>
    </div>
  ),
});

export const BarChart = defineComponent({
  name: "BarChart",
  description: "Compare categories or show composition over time. Max 6 series. Series colors are assigned automatically.",
  props: z.object({
    title: z.string(), labels: z.array(z.string()),
    series: z.array(z.object({ name: z.string(), values: z.array(z.number()) })),
    unit: z.string().optional(), stacked: z.boolean().optional(),
  }),
  // Dependency-free bars on Meridian tokens; swap in Recharts or ECharts themed from chart-1..chart-6 for axes and tooltips.
  component: ({ props }) => {
    const series = props.series.slice(0, 6);
    const totals = props.labels.map((_, i) => props.stacked ? series.reduce((sum, s) => sum + (s.values[i] ?? 0), 0) : Math.max(...series.map((s) => s.values[i] ?? 0)));
    const max = Math.max(...totals, 1);
    const summary = series.map((s) => `${s.name}: ${props.labels.map((l, i) => `${l} ${s.values[i] ?? 0}`).join(", ")}`).join("; ");
    return (
      <section className="m-card">
        <div className="m-card-head"><div><h3 className="m-card-title">{props.title}</h3>{props.unit && <p className="m-card-desc">{props.unit}</p>}</div>
          {series.length > 1 && <div className="m-legend">{series.map((s, k) => <span key={s.name} style={{ ["--c" as string]: `var(--chart-${k + 1})` }}>{s.name}</span>)}</div>}</div>
        <div className="m-bars" role="img" aria-label={`${props.title}. ${summary}`}>
          {props.labels.map((label, i) => (
            <div key={label} className="m-bar" style={props.stacked ? undefined : { flexDirection: "row", alignItems: "flex-end", justifyContent: "center", gap: 2 }}>
              {series.map((s, k) => <i key={s.name} style={{ height: `${((s.values[i] ?? 0) / max) * 140}px`, background: `var(--chart-${k + 1})`, ...(props.stacked ? {} : { width: `${Math.max(6, 32 / series.length)}px` }) }} />)}
            </div>
          ))}
        </div>
        <div className="m-axis">{props.labels.map((l) => <span key={l}>{l}</span>)}</div>
      </section>
    );
  },
});

export const Alert = defineComponent({
  name: "Alert",
  description: "Inline status banner. Title says what happened; body says what to do.",
  props: z.object({ title: z.string(), body: z.string().optional(), tone: z.enum(["info", "warning", "danger"]).optional() }),
  component: ({ props }) => (
    <div className={`m-alert m-alert-${props.tone ?? "info"}`} role={props.tone === "danger" ? "alert" : "status"}>
      <div><div className="m-alert-title">{props.title}</div>{props.body && <p>{props.body}</p>}</div>
    </div>
  ),
});

/* ---------- Agent ---------- */
export const InsightCard = defineComponent({
  name: "InsightCard",
  description: "An agent finding. title is a sentence with a number. confidence: high|medium|low. asOf: data date.",
  props: z.object({
    title: z.string(), body: z.string(),
    confidence: z.enum(["high", "medium", "low"]), asOf: z.string(),
    action: z.string().optional(),
  }),
  component: ({ props }) => {
    const on = { high: 3, medium: 2, low: 1 }[props.confidence];
    return (
      <article className={cx("m-insight", props.confidence === "low" && "is-low")}>
        <span className="m-insight-label">Agent insight</span>
        <h4>{props.title}</h4><p>{props.body}</p>
        <div className="m-insight-foot">
          <span className="m-meter" aria-hidden="true">{[0, 1, 2, 3].map((i) => <i key={i} className={i < on ? "on" : ""} />)}</span>
          {props.confidence[0].toUpperCase() + props.confidence.slice(1)} confidence · data from {props.asOf}
          {props.action && <button className="m-btn m-btn-sm" data-action={props.action}>{props.action}</button>}
        </div>
      </article>
    );
  },
});

export const ApprovalCard = defineComponent({
  name: "ApprovalCard",
  description: "REQUIRED before any write (send, update, pay, delete). action: verb phrase. params: exact values as [key, value] pairs.",
  props: z.object({
    action: z.string(), reason: z.string(),
    params: z.array(z.tuple([z.string(), z.string()])),
    destructive: z.boolean().optional(),
  }),
  component: ({ props }) => (
    <div className="m-approval" role="region" aria-label={`Approval needed: ${props.action}`}>
      <div className="m-approval-head">Approval needed: {props.action}</div>
      <div className="m-approval-body">{props.reason}
        <dl className="m-kv">{props.params.flatMap(([k, v]) => [<dt key={k + ":k"}>{k}</dt>, <dd key={k + ":v"}>{v}</dd>])}</dl></div>
      <div className="m-approval-foot">
        <button className="m-btn" data-action="reject">Reject</button>
        <button className={cx("m-btn", props.destructive ? "m-btn-danger" : "m-btn-primary")} data-action="approve">Approve</button>
      </div>
    </div>
  ),
});

/* ---------- Agent (2.2) ---------- */
const Spark = () => (
  <svg className="m-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3l1.8 4.6L18.5 9.4 13.8 11.2 12 16l-1.8-4.8L5.5 9.4l4.7-1.8z" /></svg>
);

export const AgentMessage = defineComponent({
  name: "AgentMessage",
  description: "One agent answer. agentName names the agent. citations: [label, href] pairs for every data claim. suggestions: 1-3 next questions.",
  props: z.object({
    agentName: z.string(), text: z.string(),
    citations: z.array(z.tuple([z.string(), z.string()])).optional(),
    suggestions: z.array(z.string()).optional(), runSummary: z.string().optional(),
  }),
  component: ({ props }) => (
    <div className="m-msg">
      <span className="m-agent-avatar" aria-hidden="true"><Spark /></span>
      <div className="m-msg-body">
        <div className="m-msg-meta"><b>{props.agentName}</b>{props.runSummary && <><span aria-hidden="true">·</span><span>{props.runSummary}</span></>}</div>
        <p>{props.text} {props.citations?.map(([l, h]) => <a key={l} className="m-cite" href={h}>{l}</a>)}</p>
        {props.suggestions && <div className="m-chips">{props.suggestions.map((t) => <button key={t} type="button" className="m-chip" data-action={`ask:${t}`}>{t}</button>)}</div>}
      </div>
    </div>
  ),
});

const stepState = z.enum(["queued", "running", "waiting", "done", "failed", "stopped"]);
export const AgentRunSteps = defineComponent({
  name: "AgentRunSteps",
  description: "Live progress of an agent run. steps: [title, state, detail?]. Titles are plain language; detail holds the tool call.",
  props: z.object({ steps: z.array(z.tuple([z.string(), stepState, z.string().optional()])), status: stepState }),
  component: ({ props }) => (
    <ol className="m-steps" aria-label="Agent progress">
      {props.steps.map(([title, state, detail], i) => (
        <li key={i} className={`m-step ${state}`}>
          <span className="m-step-dot">{state === "running" ? <span className="m-pulse" /> : null}</span>
          <div><div className="m-step-title">{title}</div>{detail && <span className="m-step-detail">{detail}</span>}</div>
          <span className="m-step-time" />
        </li>
      ))}
    </ol>
  ),
});

export const AgentStatus = defineComponent({
  name: "AgentStatus",
  description: "Inline activity status with a short action label. state: thinking|running|waiting|idle|failed. label: short present-tense text.",
  props: z.object({ state: z.enum(["thinking", "running", "waiting", "idle", "failed"]), label: z.string() }),
  component: ({ props }) => {
    const cls = { thinking: "", running: "", waiting: "is-waiting", idle: "is-idle", failed: "is-error" }[props.state];
    return <span className={cx("m-agent-status", cls)} role="status">{props.state === "thinking" || props.state === "running" ? <span className="m-activity-spinner" aria-hidden="true" /> : null}{props.label}</span>;
  },
});

export const ToolCall = defineComponent({
  name: "ToolCall",
  description: "One tool call: plain-language title, tool name, status (running|done|waiting|failed), optional args and result summary.",
  props: z.object({
    title: z.string(), tool: z.string(), status: z.enum(["running", "done", "waiting", "failed"]),
    result: z.string().optional(), args: z.string().optional(),
  }),
  component: ({ props }) => {
    const tone = { running: "agent", done: "success", waiting: "warning", failed: "danger" }[props.status];
    const word = props.result ?? { running: "Running", done: "Done", waiting: "Needs approval", failed: "Failed" }[props.status];
    return (
      <div className="m-ai-card">
        <div className="m-ai-head"><span className="grow">{props.title} <span className="m-help">· {props.tool}</span></span><span className={`m-badge m-badge-${tone}`}>{word}</span></div>
        {props.args && <div className="m-ai-body is-mono">{props.args}</div>}
      </div>
    );
  },
});

export const AgentPlan = defineComponent({
  name: "AgentPlan",
  description: "Steps the agent intends to take, shown BEFORE running any plan with writes. steps: [text, pending|active|done].",
  props: z.object({ goal: z.string(), steps: z.array(z.tuple([z.string(), z.enum(["pending", "active", "done"])])) }),
  component: ({ props }) => (
    <div className="m-ai-card">
      <div className="m-ai-head"><Spark /><span className="grow">Plan · {props.goal}</span><button type="button" className="m-btn m-btn-sm" data-action="plan.edit">Edit plan</button></div>
      <div className="m-ai-body"><ol className="m-plan">{props.steps.map(([t, s], i) => <li key={i} className={s === "pending" ? undefined : s}><span>{t}</span></li>)}</ol></div>
      <div className="m-diff-actions"><button type="button" className="m-btn m-btn-sm m-btn-primary" data-action="plan.run">Run plan</button><button type="button" className="m-btn m-btn-sm" data-action="plan.cancel">Cancel</button></div>
    </div>
  ),
});

export const ReasoningBlock = defineComponent({
  name: "ReasoningBlock",
  description: "Collapsed summary of how the agent reached its answer. seconds: time spent reasoning.",
  props: z.object({ text: z.string(), seconds: z.number().optional() }),
  component: ({ props }) => (
    <details className="m-reasoning"><summary><Spark />Reasoned{props.seconds ? ` for ${props.seconds}s` : ""}</summary><div className="m-reasoning-body">{props.text}</div></details>
  ),
});

export const SourceCards = defineComponent({
  name: "SourceCards",
  description: "Numbered sources behind an answer. sources: [title, system, detail, href]; numbers match citations.",
  props: z.object({ sources: z.array(z.tuple([z.string(), z.string(), z.string(), z.string()])) }),
  component: ({ props }) => (
    <div className="m-sources">{props.sources.map(([t, sys, d, h], i) => (
      <a key={i} className="m-source" href={h}><span className="t">{t}</span><span className="d"><span className="n">{i + 1}</span>{sys} · {d}</span></a>
    ))}</div>
  ),
});

export const ContextWindow = defineComponent({
  name: "ContextWindow",
  description: "Context usage. used and limit in tokens; segments: [label, tokens].",
  props: z.object({ used: z.number(), limit: z.number(), segments: z.array(z.tuple([z.string(), z.number()])) }),
  component: ({ props }) => {
    const k = (n: number) => `${Math.round(n / 1000)}k`;
    return (
      <div className="m-card">
        <div className="m-meter-row"><span><b>Context</b> · {Math.round((props.used / props.limit) * 100)}% used</span><b>{k(props.used)} / {k(props.limit)} tokens</b></div>
        <div className="m-ctx-bar" role="img" aria-label={props.segments.map(([l, t]) => `${l} ${k(t)}`).join(", ")}>
          {props.segments.map(([l, t], i) => <i key={l} style={{ width: `${(t / props.limit) * 100}%`, background: `var(--chart-${(i % 6) + 1})` }} />)}
        </div>
      </div>
    );
  },
});

export const ModelCard = defineComponent({
  name: "ModelCard",
  description: "A model's name, capabilities, status (active|degraded|down) and stats: [label, value] pairs.",
  props: z.object({ name: z.string(), capabilities: z.string(), status: z.enum(["active", "degraded", "down"]), stats: z.array(z.tuple([z.string(), z.string()])).optional() }),
  component: ({ props }) => {
    const tone = { active: "success", degraded: "warning", down: "danger" }[props.status];
    return (
      <div className="m-card">
        <div className="m-model-card"><span className="m-tool-icon"><Spark /></span><div><b>{props.name}</b><div className="m-help">{props.capabilities}</div></div><span className={`m-badge m-badge-${tone}`}>{props.status[0].toUpperCase() + props.status.slice(1)}</span></div>
        {props.stats && <div style={{ display: "grid", gridTemplateColumns: `repeat(${props.stats.length}, 1fr)`, gap: 12, marginTop: 16 }}>{props.stats.map(([l, v]) => <div key={l} className="m-kpi-mini"><b>{v}</b><span>{l}</span></div>)}</div>}
      </div>
    );
  },
});

export const AgentHandoff = defineComponent({
  name: "AgentHandoff",
  description: "Work passing between agents or to a person. toPerson=true adds a Take over button.",
  props: z.object({ from: z.string(), to: z.string(), reason: z.string(), toPerson: z.boolean().optional() }),
  component: ({ props }) => (
    <div className="m-handoff"><b>{props.from}</b><span className="arrow">→</span><b>{props.to}</b><span style={{ flex: 1 }}>{props.reason}</span>
      {props.toPerson ? <button type="button" className="m-btn m-btn-sm m-btn-primary" data-action="handoff.take">Take over</button> : <button type="button" className="m-btn m-btn-sm m-btn-ghost" data-action="handoff.view">View</button>}</div>
  ),
});

export const ResponseFeedback = defineComponent({
  name: "ResponseFeedback",
  description: "Rate/copy/regenerate row under an answer, with stats text such as '3 steps · 6.2s · ₹0.38'.",
  props: z.object({ stats: z.string().optional() }),
  component: ({ props }) => (
    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
      <span className="m-feedback">
        <button type="button" className="m-btn m-btn-sm m-btn-ghost" data-action="feedback.good" aria-label="Good response">Good</button>
        <button type="button" className="m-btn m-btn-sm m-btn-ghost" data-action="feedback.bad" aria-label="Bad response">Bad</button>
        <button type="button" className="m-btn m-btn-sm m-btn-ghost" data-action="copy">Copy</button>
        <button type="button" className="m-btn m-btn-sm m-btn-ghost" data-action="regenerate">Regenerate</button>
      </span>
      {props.stats && <span className="m-stats-line">{props.stats}</span>}
    </div>
  ),
});

export const StarterPrompts = defineComponent({
  name: "StarterPrompts",
  description: "Suggested questions grounded in the user's data. prompts: [question, what it will do].",
  props: z.object({ prompts: z.array(z.tuple([z.string(), z.string()])) }),
  component: ({ props }) => (
    <div className="m-prompts">{props.prompts.map(([q, h]) => <button key={q} type="button" className="m-prompt" data-action={`ask:${q}`}>{q}<span>{h}</span></button>)}</div>
  ),
});

export const ReplyDraft = defineComponent({
  name: "ReplyDraft",
  description: "Agent-drafted text the user edits before using. Nothing is sent from here.",
  props: z.object({ to: z.string(), text: z.string(), tone: z.string().optional() }),
  component: ({ props }) => (
    <div className="m-ai-card">
      <div className="m-ai-head"><Spark /><span className="grow">Draft reply · to {props.to}</span>{props.tone && <span className="m-badge plain">{props.tone}</span>}</div>
      <div className="m-ai-body">{props.text}</div>
      <div className="m-diff-actions"><button type="button" className="m-btn m-btn-sm m-btn-primary" data-action="draft.use">Use draft</button><button type="button" className="m-btn m-btn-sm" data-action="draft.rewrite">Rewrite</button></div>
    </div>
  ),
});

export const PiiRedaction = defineComponent({
  name: "PiiRedaction",
  description: "Text as sent to the model, with personal data already replaced by [NAME], [PHONE], [ID] etc. count: items redacted.",
  props: z.object({ text: z.string(), count: z.number() }),
  component: ({ props }) => (
    <div className="m-ai-card">
      <div className="m-ai-head"><span className="grow">Redacted before sending to the model</span><span className="m-badge m-badge-warning">{props.count} items</span></div>
      <div className="m-ai-body">{props.text.split(/(\[[A-Z]+\])/).map((part, i) => /^\[[A-Z]+\]$/.test(part) ? <span key={i} className="m-redact-tag">{part}</span> : part)}</div>
    </div>
  ),
});

export const AIWorkflow = defineComponent({
  name: "AIWorkflow",
  description: "Linear workflow. nodes: [label, kind] with kind trigger|agent|tool|human|action, in order.",
  props: z.object({ nodes: z.array(z.tuple([z.string(), z.enum(["trigger", "agent", "tool", "human", "action"])])), runningIndex: z.number().optional() }),
  component: ({ props }) => (
    <div className="m-flow" role="img" aria-label={`Workflow: ${props.nodes.map(([l]) => l).join(", then ")}`}>
      {props.nodes.map(([l, k], i) => (
        <span key={i} style={{ display: "contents" }}>
          {i > 0 && <span className="m-flow-edge" />}
          <span className={cx("m-flow-node", k === "agent" && "is-agent", k === "human" && "is-human", props.runningIndex === i && "is-running")}>{l}</span>
        </span>
      ))}
    </div>
  ),
});

export const ConnectorSetup = defineComponent({
  name: "ConnectorSetup",
  description: "Connect a data source. scopes: [label, read|write, enabled]. Write scopes are marked as needing approval.",
  props: z.object({ provider: z.string(), description: z.string(), scopes: z.array(z.tuple([z.string(), z.enum(["read", "write"]), z.boolean()])) }),
  component: ({ props }) => (
    <div className="m-card">
      <div className="m-card-head"><div><h3 className="m-card-title">Connect {props.provider}</h3><p className="m-card-desc">{props.description}</p></div></div>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>{props.scopes.map(([l, a, on]) => (
        <label key={l} className="m-check"><input type="checkbox" defaultChecked={on} />{l}{a === "write" && <span className="m-badge m-badge-warning plain">Write · needs approval</span>}</label>
      ))}</div>
      <div className="m-actions" style={{ justifyContent: "flex-end", marginTop: 14 }}><button type="button" className="m-btn m-btn-primary" data-action="connector.connect">Connect</button></div>
    </div>
  ),
});

export const EnrichColumn = defineComponent({
  name: "EnrichColumn",
  description: "An agent fills one column. rows: [rowLabel, value or empty while pending]. Values stay suggestions until accepted.",
  props: z.object({ column: z.string(), rows: z.array(z.tuple([z.string(), z.string()])) }),
  component: ({ props }) => (
    <div className="m-table-wrap"><table className="m-table">
      <thead><tr><th scope="col">Record</th><th scope="col" style={{ color: "var(--agent-text)" }}>{props.column}</th></tr></thead>
      <tbody>{props.rows.map(([r, v]) => <tr key={r}><td>{r}</td><td>{v ? <span style={{ background: "var(--agent-soft)", color: "var(--agent-text)", padding: "1px 6px", borderRadius: 4 }}>{v}</span> : <span className="m-enriching" />}</td></tr>)}</tbody>
    </table></div>
  ),
});

export const VoiceInput = defineComponent({
  name: "VoiceInput",
  description: "Voice mode orb. state: idle|listening|processing|speaking. transcript is always shown.",
  props: z.object({ state: z.enum(["idle", "listening", "processing", "speaking"]), transcript: z.string().optional() }),
  component: ({ props }) => (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
      <button type="button" className={cx("m-orb", props.state === "listening" && "is-listening")} data-action="voice.toggle" aria-label={props.state === "listening" ? "Stop listening" : "Start voice input"} style={{ border: 0, cursor: "pointer" }}><Spark /></button>
      {props.transcript && <span className="m-help">{props.transcript}</span>}
    </div>
  ),
});

/* ---------- Expressive pack (2.5) — opt-in; see the Expressive pack docs for when motion is allowed ---------- */
const reducedMotion = () => typeof matchMedia !== "undefined" && matchMedia("(prefers-reduced-motion: reduce)").matches;

export const LivePill = defineComponent({
  name: "LivePill",
  description: "Background agent activity island. state: running|waiting|done. title: agent name or outcome; status: short present-tense line; progress 0-100. Max one per screen.",
  props: z.object({ title: z.string(), status: z.string(), state: z.enum(["running", "waiting", "done"]), progress: z.number().optional() }),
  component: ({ props }) => (
    <div className={cx("x-pill is-open", props.state === "waiting" && "is-wait", props.state === "done" && "is-done")} role="status" aria-live="polite">
      <span className="x-pill-orb"><Spark /></span>
      <span className="x-pill-text"><span>{props.title}</span><small>{props.status}</small></span>
      {props.progress !== undefined && <span className="x-pill-bar" aria-hidden="true"><i style={{ width: `${props.progress}%` }} /></span>}
    </div>
  ),
});

export const AgentOrb = defineComponent({
  name: "AgentOrb",
  description: "Meri, the agent character, for agent empty states and panel headers. state: idle|thinking|listening|waiting|done|error. size in px (default 72). Always pair with text.",
  props: z.object({ state: z.enum(["idle", "thinking", "listening", "waiting", "done", "error"]), size: z.number().optional() }),
  component: ({ props }) => (
    <div className="x-orb" data-state={props.state} style={{ ["--size" as string]: `${props.size ?? 72}px` }} role="img" aria-label={`Agent ${props.state}`}>
      <svg viewBox="0 0 100 100" aria-hidden="true"><g className="whole">
        <circle className="halo" cx="50" cy="50" r="46" /><circle className="body" cx="50" cy="50" r="38" />
        <path className="meridian" d="M50 14c-11 8-16 19-16 36s5 28 16 36" />
        <ellipse className="eye" cx="42" cy="47" rx="3.6" ry="5.4" /><ellipse className="eye" cx="58" cy="47" rx="3.6" ry="5.4" />
      </g></svg>
    </div>
  ),
});

export const MorphButton = defineComponent({
  name: "MorphButton",
  description: "Button that shows its own result: label → working label → done label. Use for quick same-screen actions (save, sync). variant: primary|secondary.",
  props: z.object({ label: z.string(), action: z.string(), workingLabel: z.string().optional(), doneLabel: z.string().optional(), variant: z.enum(["primary", "secondary"]).optional() }),
  component: ({ props }) => {
    const [state, setState] = useState<"idle" | "working" | "done">("idle");
    const run = () => {
      if (state !== "idle") return;
      setState("working");
      // The host's onAction should resolve the real work; this timer only drives the demo state.
      setTimeout(() => { setState("done"); setTimeout(() => setState("idle"), 1800); }, 1100);
    };
    const text = state === "working" ? props.workingLabel ?? "Working" : state === "done" ? props.doneLabel ?? "Done" : props.label;
    return (
      <button type="button" className={cx("m-btn x-morph", props.variant === "primary" && "m-btn-primary")} data-state={state} data-action={props.action} aria-busy={state === "working"} onClick={run}>
        <span key={state} className="x-label is-enter">{state === "working" && <span className="m-spinner" />}{text}</span>
      </button>
    );
  },
});

export const RollingNumber = defineComponent({
  name: "RollingNumber",
  description: "A live KPI whose digits roll when the value changes. value: the formatted number string, e.g. '₹4,82,190'.",
  props: z.object({ label: z.string(), value: z.string(), note: z.string().optional() }),
  component: ({ props }) => (
    <div className="m-stat">
      <div className="m-stat-label">{props.label}</div>
      <div className="m-stat-value"><span className="x-roll" aria-label={props.value} aria-live="polite">
        {props.value.split("").map((ch, i) => /\d/.test(ch)
          ? <span key={i} className="x-roll-col" aria-hidden="true"><span style={{ ["--n" as string]: ch }}>{"0123456789".split("").map((d) => <i key={d}>{d}</i>)}</span></span>
          : <span key={i} className="x-roll-static" aria-hidden="true">{ch}</span>)}
      </span></div>
      {props.note && <div className="m-delta"><span>{props.note}</span></div>}
    </div>
  ),
});

export const ProgressRings = defineComponent({
  name: "ProgressRings",
  description: "Two or three related goals as concentric rings. rings: [label, percent].",
  props: z.object({ rings: z.array(z.tuple([z.string(), z.number()])) }),
  component: ({ props }) => {
    const colors = ["var(--chart-1)", "var(--chart-2)", "var(--agent)"];
    return (
      <div style={{ display: "flex", gap: 28, alignItems: "center" }}>
        <svg className="x-rings" viewBox="0 0 160 160" width="160" height="160" role="img" aria-label={props.rings.map(([l, v]) => `${l} ${v}%`).join(", ")}>
          <g transform="rotate(-90 80 80)">{props.rings.slice(0, 3).map(([l, v], i) => {
            const r = 68 - i * 18, L = 2 * Math.PI * r;
            return <g key={l}><circle className="track" cx="80" cy="80" r={r} strokeWidth="14" /><circle className="val" cx="80" cy="80" r={r} strokeWidth="14" stroke={colors[i]} strokeDasharray={L} strokeDashoffset={L * (1 - v / 100)} /></g>;
          })}</g>
        </svg>
        <div className="x-rings-legend">{props.rings.slice(0, 3).map(([l, v], i) => <span key={l} style={{ ["--c" as string]: colors[i] }}>{l} <b>{v}%</b></span>)}</div>
      </div>
    );
  },
});

export const TextReveal = defineComponent({
  name: "TextReveal",
  description: "Agent text whose words settle in calmly as they stream. Use inside agent answers only.",
  props: z.object({ text: z.string() }),
  component: ({ props }) => (
    <p className="x-reveal" aria-label={props.text}>
      {props.text.split(" ").map((w, i) => <span key={i} className="w" style={{ ["--i" as string]: i }} aria-hidden="true">{w} </span>)}
    </p>
  ),
});

export const GenerationReveal = defineComponent({
  name: "GenerationReveal",
  description: "Wraps generated content (a chart or card) and reveals it from tiles once ready. status: the label shown while generating.",
  props: z.object({ children: nodes, status: z.string().optional() }),
  component: ({ props, renderNode }) => {
    const [done, setDone] = useState(false);
    useEffect(() => { const t = setTimeout(() => setDone(true), reducedMotion() ? 0 : 1200); return () => clearTimeout(t); }, []);
    return (
      <div className={cx("x-gen", done && "is-done")} aria-busy={!done}>
        {renderAll(props.children, renderNode)}
        <div className="x-gen-grid" aria-hidden="true">{Array.from({ length: 96 }, (_, k) => <i key={k} style={{ ["--k" as string]: (k * 37) % 96 }} />)}</div>
        <span className="x-gen-label m-agent-status"><span className="m-pulse" />{props.status ?? "Generating…"}</span>
      </div>
    );
  },
});

export const SuccessMoment = defineComponent({
  name: "SuccessMoment",
  description: "A brief celebration for a real milestone (first approval, import finished, month closed). Not for routine saves.",
  props: z.object({ title: z.string(), detail: z.string().optional() }),
  component: ({ props }) => (
    <div className="x-success" role="status">
      <svg className="x-success-mark" viewBox="0 0 72 72" aria-hidden="true">
        <circle className="ripple" cx="36" cy="36" r="30" /><circle className="ripple r2" cx="36" cy="36" r="30" />
        {[0, 45, 90, 135, 180, 225, 270, 315].map((a) => <circle key={a} className="spark" cx="36" cy="36" r="2.5" style={{ ["--r" as string]: `${a}deg` }} />)}
        <circle className="disc" cx="36" cy="36" r="28" /><path className="tick" d="M24 37l8 8 16-17" />
      </svg>
      <div><div className="m-card-title">{props.title}</div>{props.detail && <p className="m-help" style={{ margin: "4px 0 0" }}>{props.detail}</p>}</div>
    </div>
  ),
});

export const AgentLoop = defineComponent({
  name: "AgentLoop",
  description: "Plan → act → observe → reflect cycle with the current phase highlighted. phase: plan|act|observe|reflect.",
  props: z.object({ phase: z.enum(["plan", "act", "observe", "reflect"]), iteration: z.number().optional() }),
  component: ({ props }) => {
    const nodes: [string, number, number][] = [["plan", 130, 22], ["act", 236, 130], ["observe", 130, 238], ["reflect", 24, 130]];
    return (
      <div className="x-loop" role="img" aria-label={`Agent loop, now ${props.phase}${props.iteration ? `, iteration ${props.iteration}` : ""}`}>
        <svg viewBox="0 0 260 260" aria-hidden="true"><circle className="ring" cx="130" cy="130" r="106" /></svg>
        {nodes.map(([n, x, y]) => <span key={n} className={cx("x-loop-node", props.phase === n && "is-active")} style={{ left: x, top: y }}>{n[0].toUpperCase() + n.slice(1)}</span>)}
        {props.iteration !== undefined && <div className="x-loop-center"><b>{props.iteration}</b>iteration</div>}
      </div>
    );
  },
});

export const AgentTerminal = defineComponent({
  name: "AgentTerminal",
  description: "Terminal-style run log for technical users. lines: [kind, text] with kind time|agent|tool|ok|warn.",
  props: z.object({ run: z.string(), lines: z.array(z.tuple([z.enum(["time", "agent", "tool", "ok", "warn"]), z.string()])) }),
  component: ({ props }) => {
    const cls = { time: "dim", agent: "ag", tool: "", ok: "ok", warn: "warn" };
    return (
      <div className="x-term">
        <div className="x-term-head"><span className="m-pulse" />{props.run}</div>
        <div className="x-term-body" aria-live="polite">{props.lines.map(([k, t], i) => <div key={i} className={cls[k]}>{t}</div>)}<span className="x-caret" /></div>
      </div>
    );
  },
});

export const Keycaps = defineComponent({
  name: "Keycaps",
  description: "Teach a keyboard shortcut. keys: e.g. ['⌘', 'K']; label: what it does.",
  props: z.object({ keys: z.array(z.string()), label: z.string() }),
  component: ({ props }) => (
    <div className="m-row">
      <span className="x-keys" aria-label={props.keys.join(" ")}>{props.keys.map((k, i) => <span key={i} style={{ display: "contents" }}>{i > 0 && <span className="plus">+</span>}<span className="x-key">{k}</span></span>)}</span>
      <span className="m-help">{props.label}</span>
    </div>
  ),
});

export const ImageCompare = defineComponent({
  name: "ImageCompare",
  description: "Before/after slider comparing an original with what the agent produced. before/after: image URLs from the host.",
  props: z.object({ before: z.string(), after: z.string(), beforeLabel: z.string(), afterLabel: z.string() }),
  component: ({ props }) => {
    const ref = useRef<HTMLDivElement>(null);
    return (
      <div className="x-compare" ref={ref} style={{ ["--pos" as string]: "50%", aspectRatio: "16 / 9" }}>
        <img src={props.before} alt={props.beforeLabel} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
        <img className="after" src={props.after} alt={props.afterLabel} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        <span className="x-compare-tag" style={{ left: 10 }}>{props.afterLabel}</span><span className="x-compare-tag" style={{ right: 10 }}>{props.beforeLabel}</span>
        <input type="range" min={0} max={100} defaultValue={50} aria-label={`Compare ${props.afterLabel} and ${props.beforeLabel}`} onInput={(e) => ref.current?.style.setProperty("--pos", `${(e.target as HTMLInputElement).value}%`)} />
        <span className="x-compare-handle" />
      </div>
    );
  },
});

/* ---------- AI workflow extensions (2.6.1: styled with Meridian classes, unique ids, named agents) ---------- */
const cite = z.array(z.object({ title: z.string(), href: z.string() }));

export const ChatThread = defineComponent({
  name: "ChatThread",
  description: "A grouped conversation with explicit roles, timestamps, citations and delivery state. agentName names the agent on every agent turn.",
  props: z.object({
    label: z.string(),
    state: z.enum(["loading", "ready", "error"]).optional(),
    messages: z.array(z.object({ role: z.enum(["user", "agent", "system"]), content: z.string(), timestamp: z.string().optional(), citations: cite.optional(), status: z.enum(["sending", "sent", "failed"]).optional() })),
    agentName: z.string().optional(),
  }),
  component: ({ props }) => {
    const agent = props.agentName ?? "Agent";
    return (
      <section className="m-chat-thread" aria-label={props.label} aria-busy={props.state === "loading"}>
        <div className="m-chat-thread-head"><span className="m-agent-avatar" aria-hidden="true"><Spark /></span><h3>{props.label}</h3></div>
        <div role="log" aria-live="polite" aria-label="Messages"><ol className="m-chat-thread-body">
          {props.messages.map((m, i) => (
            <li key={i}>
              {m.role === "user" ? <div className="m-msg-user">{m.content}</div>
                : m.role === "system" ? <div className="m-chat-day">{m.content}</div>
                : <div className="m-msg"><span className="m-agent-avatar" aria-hidden="true"><Spark /></span><div className="m-msg-body">
                    <div className="m-msg-meta"><b>{agent}</b>{m.timestamp && <><span aria-hidden="true">·</span><span>{m.timestamp}</span></>}</div>
                    <p>{m.content} {m.citations?.map((c, j) => <a key={j} className="m-cite" href={c.href}>{c.title}</a>)}</p>
                  </div></div>}
              {m.role === "user" && m.status === "failed" && <span className="m-chat-delivery is-failed">Not sent · <button type="button" data-action={`chat.retry.${i}`}>Retry</button></span>}
            </li>
          ))}
        </ol></div>
        {props.state === "error" && <div className="m-alert m-alert-danger" role="alert"><div><div className="m-alert-title">Couldn't load this conversation</div><p>Retry in a minute.</p></div></div>}
      </section>
    );
  },
});

export const AIComposer = defineComponent({
  name: "AIComposer",
  description: "A compact message composer with upload, sending, generation and stop states. Use expanded layout for longer prompts.",
  props: z.object({
    placeholder: z.string().optional(),
    state: z.enum(["ready", "uploading", "sending", "generating", "error"]).optional(),
    attachments: z.array(z.object({ name: z.string(), status: z.enum(["uploading", "ready", "failed"]).optional() })).optional(),
    agentName: z.string().optional(),
    layout: z.enum(["compact", "expanded"]).optional(),
  }),
  component: ({ props }) => {
    const id = useId();
    const agent = props.agentName ?? "the agent";
    const busy = props.state === "sending" || props.state === "generating";
    return (
      <form className={cx("m-ai-composer", props.layout !== "expanded" && "is-compact", props.state === "error" && "is-error")} onSubmit={(e) => e.preventDefault()}>
        {props.attachments?.length ? <div className="m-chat-attachments" style={{ margin: 0 }}>{props.attachments.map((a, i) => (
          <span key={i} className={cx("m-attachment", a.status === "uploading" && "is-uploading", a.status === "failed" && "is-failed")}>{a.status === "uploading" && <span className="m-spinner" />}<span>{a.name}{a.status === "failed" ? " · upload failed" : ""}</span></span>
        ))}</div> : null}
        <div className="m-composer">
          <label className="m-sr" htmlFor={id}>Message {agent}</label>
          <textarea id={id} rows={props.layout === "expanded" ? 3 : 1} placeholder={props.placeholder || `Ask ${agent}…`} disabled={props.state === "generating"} aria-busy={busy} />
          <div className="m-ai-composer-bar">
            <span className="grow" />
            {props.state === "generating"
              ? <button className="m-btn m-btn-sm" type="button" data-action="agent.stop">Stop response</button>
              : <button className="m-btn m-btn-agent-solid m-btn-icon" type="button" data-action="agent.send" aria-label="Send" aria-busy={props.state === "sending"} disabled={props.state === "uploading"}><svg className="m-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 19V5m-6 6 6-6 6 6" /></svg></button>}
          </div>
        </div>
        {props.state === "error" && <span className="m-help" role="alert" style={{ color: "var(--danger-text)" }}>Couldn't send your message. Retry in a minute.</span>}
      </form>
    );
  },
});

export const AgentTimeline = defineComponent({
  name: "AgentTimeline",
  description: "An ordered audit timeline for agent, tool, approval, handoff and retry events, with a run state.",
  props: z.object({
    label: z.string(),
    state: z.enum(["running", "done", "failed", "stopped"]),
    events: z.array(z.object({ actor: z.string(), kind: z.enum(["agent", "tool", "approval", "handoff", "retry"]), title: z.string(), at: z.string(), detail: z.string().optional(), status: z.enum(["running", "done", "failed", "waiting"]).optional() })),
  }),
  component: ({ props }) => {
    const tone = { running: "agent", done: "success", failed: "danger", stopped: "neutral" }[props.state];
    return (
      <section className="m-agent-timeline" aria-label={props.label}>
        <div className="m-agent-timeline-head"><h3>{props.label}</h3><span className={cx("m-badge", tone !== "neutral" && `m-badge-${tone}`)}>{props.state[0].toUpperCase() + props.state.slice(1)}</span></div>
        <ol>{props.events.map((e, i) => (
          <li key={i} className={cx("m-agent-timeline-event", e.status === "failed" && "is-failed", e.status === "waiting" && "is-waiting")} aria-current={e.status === "running" ? "step" : undefined}>
            <time>{e.at}</time>
            <span className={cx("m-timeline-icon", (e.kind === "agent" || e.kind === "handoff") && "is-agent")}>{e.kind === "agent" || e.kind === "handoff" ? <Spark /> : null}</span>
            <div><b>{e.title}</b><div className="who">{e.actor} · {e.kind}</div>{e.detail && <details><summary>Details</summary><span className="m-step-detail">{e.detail}</span></details>}</div>
          </li>
        ))}</ol>
      </section>
    );
  },
});

export const MeetingSummary = defineComponent({
  name: "MeetingSummary",
  description: "A source-linked meeting summary with decisions and reviewable action items. Creating tasks goes through the footer approval.",
  props: z.object({
    title: z.string(), date: z.string(), attendees: z.array(z.string()), summary: z.string(), decisions: z.array(z.string()),
    actions: z.array(z.object({ text: z.string(), owner: z.string().optional(), due: z.string().optional() })),
    sources: cite.optional(),
  }),
  component: ({ props }) => (
    <article className="m-meeting-summary">
      <div className="m-meeting-summary-head"><div><h3>{props.title}</h3><p>{props.date} · {props.attendees.join(", ")}</p></div></div>
      <section className="m-meeting-summary-section"><h4>Summary</h4><p>{props.summary}</p></section>
      <section className="m-meeting-summary-section"><h4>Decisions</h4><ul>{props.decisions.map((d, i) => <li key={i} className="m-decision"><span>{d}</span></li>)}</ul></section>
      <section className="m-meeting-summary-section"><h4>Action items</h4><ul>{props.actions.map((a, i) => (
        <li key={i} className="m-action-item"><label className="m-check"><input type="checkbox" defaultChecked aria-label={`Include: ${a.text}`} /></label><span>{a.text}<div className="meta">{[a.owner, a.due && `due ${a.due}`].filter(Boolean).join(" · ")}</div></span><span className="m-badge plain">Task</span></li>
      ))}</ul></section>
      {props.sources?.length ? <section className="m-meeting-summary-section"><h4>Transcript sources</h4><p>{props.sources.map((s, i) => <a key={i} className="m-cite" href={s.href}>{s.title}</a>)}</p></section> : null}
      {props.actions.length > 0 && <div className="m-meeting-summary-foot"><span className="m-help">Nothing is created until you approve</span><button type="button" className="m-btn m-btn-primary" data-action="meeting.createTasks">Create {props.actions.length} tasks</button></div>}
    </article>
  ),
});

export const AIEditReview = defineComponent({
  name: "AIEditReview",
  description: "Review proposed edits one at a time before applying them. Each change: before, after, status, optional reason.",
  props: z.object({
    title: z.string(),
    changes: z.array(z.object({ before: z.string(), after: z.string(), status: z.enum(["pending", "accepted", "rejected"]), reason: z.string().optional() })),
  }),
  component: ({ props }) => (
    <section className="m-ai-edit-review" aria-label={props.title}>
      <div className="m-ai-edit-review-head"><h3>{props.title}</h3><button type="button" className="m-btn m-btn-sm" data-action="edit.acceptAll">Accept all</button></div>
      <ol>{props.changes.map((c, i) => (
        <li key={i} className={cx("m-ai-edit-review-change", `is-${c.status}`)}>
          <span className="m-ai-edit-review-text">{c.before && <del className="m-ai-edit-review-del">{c.before}</del>} {c.after && <ins className="m-ai-edit-review-ins">{c.after}</ins>}</span>
          <span className="m-actions">{c.status === "pending"
            ? <><button className="m-btn m-btn-sm" type="button" data-action={`edit.reject.${i}`}>Reject</button><button className="m-btn m-btn-sm m-btn-primary" type="button" data-action={`edit.accept.${i}`}>Accept</button></>
            : <><span className={cx("m-badge", c.status === "accepted" && "m-badge-success")}>{c.status === "accepted" ? "Accepted" : "Rejected"}</span><button className="m-btn m-btn-sm m-btn-ghost" type="button" data-action={`edit.undo.${i}`}>Undo</button></>}</span>
          {c.reason && <span className="m-ai-edit-review-why"><Spark />{c.reason}</span>}
        </li>
      ))}</ol>
    </section>
  ),
});

export const ImageGeneration = defineComponent({
  name: "ImageGeneration",
  description: "Generate and review image variations with an explicit prompt and state; Retry, Download and Use act on the selected image.",
  props: z.object({
    prompt: z.string(), model: z.string(), size: z.string(),
    state: z.enum(["queued", "generating", "complete", "partial", "failed", "cancelled"]),
    images: z.array(z.object({ src: z.string(), alt: z.string() })).optional(),
  }),
  component: ({ props }) => {
    const [sel, setSel] = useState(0);
    const working = props.state === "queued" || props.state === "generating";
    return (
      <section className="m-image-generation" aria-label="Image generation">
        <div className="m-image-generation-controls"><div className="m-label">Prompt</div><p style={{ margin: 0 }}>{props.prompt}</p><div className="m-help">{props.model} · {props.size}</div></div>
        <div className="m-image-generation-results">
          <div className="m-row">
            {working ? <span className="m-agent-status" role="status"><span className="m-pulse" />{props.state === "queued" ? "Queued" : "Generating"}</span>
              : <span className="m-help" role="status">{props.state[0].toUpperCase() + props.state.slice(1)}</span>}
            <span style={{ flex: 1 }} />
            <button type="button" className="m-btn m-btn-sm m-btn-ghost" data-action="image.retry">Retry</button>
            {props.images?.length ? <><button type="button" className="m-btn m-btn-sm" data-action={`image.download.${sel}`}>Download</button><button type="button" className="m-btn m-btn-sm m-btn-primary" data-action={`image.use.${sel}`}>Use image {sel + 1}</button></> : null}
          </div>
          {props.state === "failed" && <div className="m-alert m-alert-danger" role="alert"><div><div className="m-alert-title">Couldn't generate the image</div><p>Retry, or change the prompt.</p></div></div>}
          <div className="m-image-generation-grid" role="listbox" aria-label="Variations">{props.images?.map((image, i) => (
            <figure className="m-image-generation-result" key={i} role="option" aria-selected={i === sel} tabIndex={0} onClick={() => setSel(i)} onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") setSel(i); }}>
              <img src={image.src} alt={image.alt} /><figcaption>{i + 1}</figcaption>
            </figure>
          ))}</div>
        </div>
      </section>
    );
  },
});

export const TrainingRun = defineComponent({
  name: "TrainingRun",
  description: "Track model training progress, metrics and job state with clear controls. progress 0-100.",
  props: z.object({
    name: z.string(),
    state: z.enum(["queued", "running", "paused", "completed", "failed", "cancelled"]),
    progress: z.number().optional(), eta: z.string().optional(),
    metrics: z.array(z.object({ label: z.string(), value: z.string() })).optional(),
  }),
  component: ({ props }) => {
    const tone = { queued: "", running: "agent", paused: "warning", completed: "success", failed: "danger", cancelled: "" }[props.state];
    const p = props.progress ?? 0;
    return (
      <section className="m-training-run" aria-label={props.name}>
        <div className="m-training-run-head"><h3>{props.name}</h3><span className={cx("m-badge", tone && `m-badge-${tone}`)}>{props.state[0].toUpperCase() + props.state.slice(1)}</span>
          {(props.state === "running" || props.state === "paused") && <span className="m-actions">
            <button className="m-btn m-btn-sm" type="button" data-action={props.state === "running" ? "training.pause" : "training.resume"}>{props.state === "running" ? "Pause run" : "Resume run"}</button>
            <button className="m-btn m-btn-sm m-btn-danger" type="button" data-action="training.cancel">Cancel run</button></span>}
        </div>
        <div className="m-training-run-body">
          <div><div className="m-progress-row"><span>Progress</span><span className="m-num">{p}%{props.eta ? ` · ${props.eta} left` : ""}</span></div>
            <div className="m-progress is-agent" role="progressbar" aria-valuenow={p} aria-valuemin={0} aria-valuemax={100} aria-label={`${props.name} progress`}><i style={{ width: `${p}%` }} /></div></div>
          {props.metrics?.length ? <dl className="m-training-run-metrics">{props.metrics.map((m, i) => <div className="m-training-run-metric" key={i}><dt>{m.label}</dt><dd>{m.value}</dd></div>)}</dl> : null}
        </div>
      </section>
    );
  },
});

export const LLMCostEstimator = defineComponent({
  name: "LLMCostEstimator",
  description: "Estimate monthly model spend from explicit workload and dated pricing assumptions (prices per million tokens).",
  props: z.object({
    inputTokens: z.number(), outputTokens: z.number(), requestsPerDay: z.number(), pricingUpdatedAt: z.string(), currency: z.string().optional(),
    models: z.array(z.object({ name: z.string(), provider: z.string(), inputPerMillion: z.number(), outputPerMillion: z.number() })),
    locale: z.string().optional(),
  }),
  component: ({ props }) => {
    const locale = props.locale ?? (typeof navigator !== "undefined" ? navigator.language : "en-US");
    const fmt = new Intl.NumberFormat(locale, { style: "currency", currency: props.currency || "USD", maximumFractionDigits: 0 });
    const num = (n: number) => n.toLocaleString(locale);
    const costs = props.models.map((m) => props.requestsPerDay * 30 * ((props.inputTokens * m.inputPerMillion + props.outputTokens * m.outputPerMillion) / 1_000_000));
    const max = Math.max(...costs, 1), min = Math.min(...costs);
    return (
      <section className="m-llm-cost-estimator" aria-label="Estimated monthly model cost">
        <div className="m-llm-cost-estimator-inputs">
          <div className="m-kpi-mini"><b>{num(props.requestsPerDay)}</b><span>requests per day</span></div>
          <div className="m-kpi-mini"><b>{num(props.inputTokens)}</b><span>input tokens / request</span></div>
          <div className="m-kpi-mini"><b>{num(props.outputTokens)}</b><span>output tokens / request</span></div>
        </div>
        <table className="m-table"><caption className="m-sr">Estimated cost by model</caption>
          <thead><tr><th scope="col">Model</th><th scope="col">Provider</th><th scope="col">Relative</th><th scope="col" className="r">Per month</th></tr></thead>
          <tbody>{props.models.map((m, i) => (
            <tr key={i} className={cx("m-llm-cost-estimator-row", costs[i] === min && "is-cheapest")}><td>{m.name}</td><td className="muted">{m.provider}</td>
              <td><div className="bar"><i style={{ width: `${(costs[i] / max) * 100}%` }} /></div></td><td className="r"><b>{fmt.format(costs[i])}</b></td></tr>
          ))}</tbody>
        </table>
        <div className="m-llm-cost-estimator-foot">Prices as of {props.pricingUpdatedAt} · 30-day month · estimates use the assumptions shown</div>
      </section>
    );
  },
});

export const AICommand = defineComponent({
  name: "AICommand",
  description: "Search actions or ask a question in a keyboard-first command surface. answer: optional cited answer shown above the actions.",
  props: z.object({
    query: z.string(), open: z.boolean().optional(),
    results: z.array(z.object({ label: z.string(), kind: z.enum(["action", "answer"]), citations: cite.optional() })),
    answer: z.object({ agentName: z.string(), text: z.string(), citations: cite.optional() }).optional(),
  }),
  component: ({ props }) => {
    const id = useId();
    if (props.open === false) return null;
    return (
      <div className="m-cmdk m-ai-command" role="dialog" aria-label="Search or ask">
        <div className="m-cmdk-input"><label className="m-sr" htmlFor={id}>Search or ask</label><input id={id} defaultValue={props.query} /></div>
        {props.answer && <div className="m-ai-command-answer" role="region" aria-label={`Answer from ${props.answer.agentName}`}>
          <div className="m-msg-meta"><b>{props.answer.agentName}</b></div>
          <p>{props.answer.text} {props.answer.citations?.map((c, j) => <a key={j} className="m-cite" href={c.href}>{c.title}</a>)}</p></div>}
        <div className="m-listbox" role="listbox" aria-label="Actions">{props.results.map((r, i) => (
          <div key={i} className="m-option m-ai-command-result" role="option" aria-selected={false} data-action={`command.${i}`}>{r.label}<small>{r.kind}</small></div>
        ))}</div>
      </div>
    );
  },
});

export const meridianLibrary = createLibrary({
  root: "Page",
  components: [
    Page, Grid, Card, PageHeader, Text, Button, Badge, StatCard, Table, BarChart, Alert, InsightCard, ApprovalCard,
    AgentMessage, AgentRunSteps, AgentStatus, ToolCall, AgentPlan, ReasoningBlock, SourceCards, ContextWindow, ModelCard,
    AgentHandoff, ResponseFeedback, StarterPrompts, ReplyDraft, PiiRedaction, AIWorkflow, ConnectorSetup, EnrichColumn, VoiceInput,
    ChatThread, AIComposer, AgentTimeline, MeetingSummary, AIEditReview, ImageGeneration, TrainingRun, LLMCostEstimator, AICommand,
    // Expressive (opt-in)
    LivePill, AgentOrb, MorphButton, RollingNumber, ProgressRings, TextReveal, GenerationReveal, SuccessMoment, AgentLoop, AgentTerminal, Keycaps, ImageCompare,
  ],
});

// Server side: build the system prompt from the same contract, then append Meridian's hard rules.
// const system = meridianLibrary.prompt() + "\n\n" + MERIDIAN_RULES;



