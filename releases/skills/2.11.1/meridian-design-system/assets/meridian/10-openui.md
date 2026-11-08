# OpenUI

Meridian is compatible with **OpenUI** (Thesys, MIT), the open standard for generative UI: the model streams compact **OpenUI Lang** instead of JSON or code, and a renderer maps each statement to an allowed component. Because the model can only name components from the library, it cannot invent colors, spacing or layouts, which is exactly Meridian's rule for AI builders.

```
Meridian library (openui/library.tsx) → library.prompt() + Meridian rules → LLM → OpenUI Lang stream → Renderer → Meridian components
```

## Files
| File | What |
| --- | --- |
| `openui/library.tsx` | `defineComponent` definitions (zod/v4 schemas + React renderers using Meridian classes) and `createLibrary` with `Page` as root |
| `openui/theme.ts` | Meridian tokens mapped onto `@openuidev/react-ui`'s `createTheme` for the chat shell |
| `openui/dashboard.openui.txt` | The DashboardShowcase screen written in OpenUI Lang |

## Setup
```bash
npm install @openuidev/react-lang @openuidev/react-ui zod
```
```tsx
import { Renderer } from "@openuidev/react-lang";
import { meridianLibrary } from "./openui/library";

const system = meridianLibrary.prompt() + "\n\n" + MERIDIAN_RULES; // rules from "Rules for AI builders"

<Renderer response={response} library={meridianLibrary} isStreaming={isStreaming}
  onAction={handleAction} onError={(e) => report(e)} />
```

## Component signatures
Arguments are positional, in schema order; optional ones can be dropped from the end.

| Component | Signature |
| --- | --- |
| Page (root) | `Page(children)` |
| Grid | `Grid(children, columns?)` |
| Card | `Card(title, children, description?)` |
| PageHeader | `PageHeader(title, actions?, breadcrumb?)` |
| Text | `Text(text, muted?)` |
| Button | `Button(label, action, variant?)` |
| Badge | `Badge(label, tone?)` |
| StatCard | `StatCard(label, value, delta?, deltaLabel?, trend?, good?)` |
| Table | `Table(columns, rows, title?)` |
| BarChart | `BarChart(title, labels, series, unit?, stacked?)` |
| Alert | `Alert(title, body?, tone?)` |
| InsightCard | `InsightCard(title, body, confidence, asOf, action?)` |
| ApprovalCard | `ApprovalCard(action, reason, params, destructive?)` |
| AgentMessage | `AgentMessage(agentName, text, citations?, suggestions?, runSummary?)` |
| AgentRunSteps | `AgentRunSteps(steps, status)` |
| ChatThread | `ChatThread(label, state?, messages, agentName?)` |
| AIComposer | `AIComposer(placeholder?, state?, attachments?, agentName?)` |
| AgentTimeline | `AgentTimeline(label, state, events)` |
| MeetingSummary | `MeetingSummary(title, date, attendees, summary, decisions, actions)` |
| AIEditReview | `AIEditReview(title, changes)` (each change: before, after, status, reason?) |
| ImageGeneration | `ImageGeneration(prompt, model, size, state, images?)` |
| TrainingRun | `TrainingRun(name, state, progress?, eta?, metrics?)` |
| LLMCostEstimator | `LLMCostEstimator(inputTokens, outputTokens, requestsPerDay, pricingUpdatedAt, models)` |
| AICommand | `AICommand(query, open?, results, answer?)` |
| AgentStatus | `AgentStatus(state, label)` |
| ToolCall | `ToolCall(title, tool, status, result?, args?)` |
| AgentPlan | `AgentPlan(goal, steps)` |
| ReasoningBlock | `ReasoningBlock(text, seconds?)` |
| SourceCards | `SourceCards(sources)` |
| ContextWindow | `ContextWindow(used, limit, segments)` |
| ModelCard | `ModelCard(name, capabilities, status, stats?)` |
| AgentHandoff | `AgentHandoff(from, to, reason, toPerson?)` |
| ResponseFeedback | `ResponseFeedback(stats?)` |
| StarterPrompts | `StarterPrompts(prompts)` |
| ReplyDraft | `ReplyDraft(to, text, tone?)` |
| PiiRedaction | `PiiRedaction(text, count)` |
| AIWorkflow | `AIWorkflow(nodes, runningIndex?)` |
| ConnectorSetup | `ConnectorSetup(provider, description, scopes)` |
| EnrichColumn | `EnrichColumn(column, rows)` |
| VoiceInput | `VoiceInput(state, transcript?)` |
| LivePill · Expressive | `LivePill(title, status, state, progress?)` |
| AgentOrb · Expressive | `AgentOrb(state, size?)` |
| MorphButton · Expressive | `MorphButton(label, action, workingLabel?, doneLabel?, variant?)` |
| RollingNumber · Expressive | `RollingNumber(label, value, note?)` |
| ProgressRings · Expressive | `ProgressRings(rings)` |
| TextReveal · Expressive | `TextReveal(text)` |
| GenerationReveal · Expressive | `GenerationReveal(children, status?)` |
| SuccessMoment · Expressive | `SuccessMoment(title, detail?)` |
| AgentLoop · Expressive | `AgentLoop(phase, iteration?)` |
| AgentTerminal · Expressive | `AgentTerminal(run, lines)` |
| Keycaps · Expressive | `Keycaps(keys, label)` |
| ImageCompare · Expressive | `ImageCompare(before, after, beforeLabel, afterLabel)` |

52 components are in the library: 13 core, 27 agent and 12 Expressive. Expressive ones need `expressive.css`; if an app doesn't opt in, drop them from `createLibrary` so the model can't emit them. The other 11 Expressive components (Dock, RadialMenu, CardStack, DateReel, SlidingTabs, SpotlightCard, FrostedPanel, DataFlow, VectorSearch, AgentCursor, TeamSwitcher) belong to the app shell and are placed by your code, not generated. Every component README ends with its OpenUI signature; other system components, such as forms, overlays, and navigation, can be added to the generated library as needed. Tuple props such as `[label, href]` keep the model's output short.

Agent example:
```text
root = Page([answer, sources, feedback])
answer = AgentMessage("Billing agent", "Four customers owe ₹3.1L past 30 days.", [["INV-2040", "/inv/2040"]], ["Draft reminders"], "4 steps · 9.4s")
sources = SourceCards([["Open invoices", "Accounting", "2 min ago", "/src/1"]])
feedback = ResponseFeedback("4 steps · 9.4s · ₹0.38")
```

Expressive example (agent empty state):
```text
root = Page([meri, prompts])
meri = AgentOrb("idle", 96)
prompts = StarterPrompts([["Who owes us the most?", "Ranks overdue customers"], ["Draft this week's reminders", "Needs your approval to send"]])
```

## Example: the showcase dashboard in OpenUI Lang
```text
root = Page([header, kpis, agentRow, attention])
header = PageHeader("Collections overview", [summarize, newInvoice], "Billing")
summarize = Button("Summarize", "agent.summarize", "agent")
newInvoice = Button("New invoice", "invoice.new", "primary")
kpis = Grid([k1, k2], "4")
k1 = StatCard("Collected (30d)", "₹48.2L", "12.4%", "vs prior 30d", "up", true)
k2 = StatCard("Outstanding", "₹21.7L", "6.1%", "vs prior 30d", "up", false)
agentRow = Grid([insight, approval], "2")
insight = InsightCard("Collections slowed 18% in the South region", "Days-to-pay rose from 34 to 40 since 1 October.", "high", "12 Oct", "Investigate")
approval = ApprovalCard("send 4 payment reminders", "Nothing is sent until you approve.", [["Recipients", "Sri Sai Labs, Brightwell +2"], ["Total overdue", "₹3,10,400"]])
attention = Table([{label: "Invoice", type: "id"}, {label: "Customer"}, {label: "Status", type: "status"}], [["INV-2040", "Sri Sai Labs", ["Overdue 20d", "danger"]]], "Needs attention")
```
`root` comes first so the layout streams in immediately; children are forward references filled in as they arrive.

## Rules for OpenUI integrations
- **Actions go through the host.** Buttons emit an action id; `onAction` decides what happens. Write actions from an agent must render an `ApprovalCard` first, never run directly.
- **Validate after the stream.** During streaming, unresolved forward references are expected; after it ends, treat unknown components, missing required args and extra args as errors and feed them back to the model.
- **Theme with tokens.** Load `tokens.css` and `bundle.css`; the components read Meridian variables, so light/dark and brand themes apply to generated UI automatically. Use `openui/theme.ts` for OpenUI's own chat shell.
- **Keep the library small.** Expose only what generated screens need; every extra component makes the prompt longer and the output less predictable.
- **Data stays authorised.** Generated components never fetch data the user couldn't fetch themselves; `Query`/`Mutation` tools go through your normal auth.
- **Version check.** Verified with `@openuidev/react-lang` 1.1.0, zod 4.6 and React 19.3: the library compiles under strict TypeScript and renders end-to-end. Re-run the check when you upgrade; `createTheme` keys in `openui/theme.ts` belong to `@openuidev/react-ui` and are not covered by that check.
- **Prompt size.** `meridianLibrary.prompt()` for all 52 components is about 12,800 characters (roughly 3,200 tokens). Drop the Expressive components or unused agent components to shrink it.
