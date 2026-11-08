# UIArc AI component crosswalk

This guide accounts for the AI and agent patterns in UIArc's live component catalog and maps them into Meridian. The reference is UIArc's [component catalog](https://uiarc.dev/components/) and [machine-readable index](https://uiarc.dev/llms.txt), checked 8 Nov 2026. Catalog contents and access can change.

Meridian keeps its own visual language and API. The nine new Meridian components below were designed from scratch for this system, using Meridian tokens and contracts. Their behaviors are guided by public descriptions; no UIArc implementation source, Pro source, or Arc foundation CSS is included.

## New Meridian AI components

| Meridian component | Adds |
| --- | --- |
| ChatThread | Grouped multi-turn conversations, message delivery states, citations, and attachments. |
| AIComposer | A conversation input with attachments, sending, stop, and generation states. |
| AgentTimeline | A timestamped audit trail for agent, tool, approval, handoff, and retry events. |
| MeetingSummary | A sourced meeting summary with decisions and follow-up actions. |
| AIEditReview | Per-change review for proposed text or code edits, with accept, reject, and undo. |
| ImageGeneration | Prompt and settings, generation state, result variations, retry, and download. |
| TrainingRun | Long-running training job status, progress, metrics, checkpoints, and controls. |
| LLMCostEstimator | Spend estimates from workload inputs and timestamped provider prices. |
| AICommand | A keyboard-first command palette with cited answer results and actions. |

Each has a README and preview under `components/`, typed props in `components/index.d.ts`, and styling contracts in `components/bundle.css`.

## Full AI and agent pattern mapping

### Already covered by Meridian

| UIArc pattern | Meridian equivalent |
| --- | --- |
| Agent status, tool call, agent plan | AgentStatus, ToolCall, AgentPlan |
| Context window, reasoning block, source cards | ContextWindow, ReasoningBlock, SourceCards |
| Model card, provider keys, provider status, generation stats | ModelCard |
| AI workflow, ticket router | AIWorkflow |
| Ghost text, smart form fill, enrich column | InlineEdit, EnrichColumn |
| Dictation, speech player, voice orb | VoiceInput |
| Reply draft, AI translate, tone rewrite, TL;DR | ReplyDraft |
| Agent handoff, PII redaction, response feedback | AgentHandoff, PiiRedaction, ResponseFeedback |
| Connector setup, starter prompts, ask your data | ConnectorSetup, StarterPrompts (with chart and table composition) |
| Agent cursor, agent loop, data flow, image reveal, AI spark | AgentCursor, AgentLoop, DataFlow, GenerationReveal, AgentOrb |
| Prompt cache, reasoning tree | ContextWindow, ReasoningBlock |
| Mascot-style presence | AgentOrb (Meri); other mascot styles are intentionally excluded |
| AI chat, AI side panel, AI composer blocks | ChatThread, AgentMessage, AIComposer, AIEditReview composed with existing panels |
| Research run | AgentRunSteps, AgentTimeline, SourceCards |
| AI inline edit | AIEditReview |

### Added in Meridian 2.6.0 (finished in 2.6.1)

| UIArc pattern | Meridian equivalent |
| --- | --- |
| Multi-message chat thread | ChatThread |
| Orchestrated agent run timeline | AgentTimeline |
| Meeting summary with transcript grounding | MeetingSummary |
| Code or document change suggestion | AIEditReview |
| Generated image workspace | ImageGeneration |
| Training or fine-tuning run | TrainingRun |
| Model workload cost calculator | LLMCostEstimator |
| AI-aware command palette | AICommand |
| AI chat composer | AIComposer |

### Not adopted as standalone components

UIArc also lists technical animations and marketing or decorative patterns. Meridian does not add Pro-only branded implementations, speculative model-mechanics animations (such as mixture-of-experts or speculative-decoding illustrations), animated mascots other than Meri, or marketing widgets such as live visitors and social-proof toasts. Use an existing Meridian status, chart, or documentation component where the underlying information is useful. Keep all generated actions reviewable and all factual claims sourced.

## Implementation rules

1. Use Meridian semantic and component tokens; do not import Arc foundation CSS or Arc motion tokens.
2. A UIArc component page can inform behavior and accessibility review, but Meridian's component README, CSS, types, and preview define the implementation.
3. Every generated change with an external effect goes through ApprovalCard. AI output that makes a factual claim carries citations.
4. Keep motion functional, provide reduced-motion behavior, and preserve the static text state.
5. Check each UIArc item's current license and access terms before using any of its source. Pro source remains gated; this archive does not reproduce it.
