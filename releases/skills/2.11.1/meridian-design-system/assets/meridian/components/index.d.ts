// Meridian component API — documentation of the props every implementation (React, OpenUI, JSON renderer) exposes.
// CSS contract: each component maps to a root class `m-<name>`, parts `m-<name>-<part>`, variants as modifier classes, state via ARIA attributes.
import type * as React from 'react';

export type Tone = 'neutral' | 'info' | 'success' | 'warning' | 'danger' | 'agent';
export type Size = 'sm' | 'md' | 'lg';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** secondary is the default; one primary per view */
  variant?: 'primary' | 'secondary' | 'ghost' | 'agent' | 'danger';
  size?: Size;
  icon?: React.ReactNode;
  /** icon-only button; requires aria-label */
  iconOnly?: boolean;
  /** sets aria-busy and shows a spinner; keeps the label */
  loading?: boolean;
}
export declare function Button(props: ButtonProps): React.ReactElement;

export interface TextFieldProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label: string;
  helper?: string;
  /** error message; sets aria-invalid and replaces helper */
  error?: string;
  optional?: boolean;
  multiline?: boolean;
}
export declare function TextField(props: TextFieldProps): React.ReactElement;

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  options: { value: string; label: string }[];
  placeholder?: string;
  helper?: string;
  error?: string;
}
export declare function Select(props: SelectProps): React.ReactElement;

export interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> { label: string; indeterminate?: boolean }
export declare function Checkbox(props: CheckboxProps): React.ReactElement;
export interface RadioGroupProps { label: string; name: string; options: { value: string; label: string }[]; value?: string; onChange?: (v: string) => void }
export declare function RadioGroup(props: RadioGroupProps): React.ReactElement;
export interface SwitchProps extends React.InputHTMLAttributes<HTMLInputElement> { label: string }
export declare function Switch(props: SwitchProps): React.ReactElement;

export interface BadgeProps { tone?: Tone; dot?: boolean; children: React.ReactNode }
export declare function Badge(props: BadgeProps): React.ReactElement;

export interface AvatarProps { name: string; src?: string; size?: Size }
export declare function Avatar(props: AvatarProps): React.ReactElement;

export interface CardProps { title?: string; description?: string; action?: React.ReactNode; href?: string; children?: React.ReactNode }
export declare function Card(props: CardProps): React.ReactElement;

export interface StatCardProps { label: string; value: string; delta?: string; deltaLabel?: string; trend?: 'up' | 'down' | 'flat'; /** colors the delta by meaning, not direction */ good?: boolean; loading?: boolean; href?: string }
export declare function StatCard(props: StatCardProps): React.ReactElement;

export interface Column<Row> { key: keyof Row & string; label: string; type?: 'text' | 'id' | 'number' | 'currency' | 'date' | 'status'; align?: 'left' | 'right'; hideOnMobile?: boolean; sortable?: boolean }
export interface DataTableProps<Row> {
  columns: Column<Row>[];
  rows: Row[];
  /** status enum value → badge tone, defined once per app */
  statusTones?: Record<string, Tone>;
  searchable?: boolean;
  filters?: string[];
  selectable?: boolean;
  pageSize?: 25 | 50 | 100;
  state?: 'ready' | 'loading' | 'empty' | 'error';
  rowActions?: { label: string; onSelect: (row: Row) => void; danger?: boolean }[];
}
export declare function DataTable<Row>(props: DataTableProps<Row>): React.ReactElement;

export interface ChartSeries { name: string; values: number[] }
export interface ChartProps { title: string; description?: string; labels: string[]; series: ChartSeries[]; type?: 'bar' | 'stacked-bar' | 'line' | 'area'; unit?: string }
export declare function Chart(props: ChartProps): React.ReactElement;

export interface NavItem { label: string; href: string; icon: string; count?: number }
export interface SidebarProps { items: (NavItem | { section: string })[]; current?: string; collapsed?: boolean }
export declare function Sidebar(props: SidebarProps): React.ReactElement;

export interface TabsProps { tabs: { id: string; label: string; count?: number }[]; selected: string; onChange: (id: string) => void }
export declare function Tabs(props: TabsProps): React.ReactElement;

export interface PageHeaderProps { title: string; breadcrumb?: { label: string; href?: string }[]; badge?: React.ReactNode; actions?: React.ReactNode }
export declare function PageHeader(props: PageHeaderProps): React.ReactElement;

export interface MenuProps { trigger: React.ReactNode; items: ({ label: string; icon?: React.ReactNode; shortcut?: string; danger?: boolean; onSelect: () => void } | 'separator')[] }
export declare function Menu(props: MenuProps): React.ReactElement;

export interface DialogProps { open: boolean; title: string; children?: React.ReactNode; confirmLabel: string; tone?: 'default' | 'danger'; onConfirm: () => void; onClose: () => void; variant?: 'dialog' | 'drawer' }
export declare function Dialog(props: DialogProps): React.ReactElement;

export interface ToastOptions { message: string; tone?: 'success' | 'error'; action?: { label: string; onSelect: () => void } }
export declare function toast(options: ToastOptions): void;

export interface TooltipProps { text: string; children: React.ReactElement }
export declare function Tooltip(props: TooltipProps): React.ReactElement;

export interface AlertProps { title: string; children?: React.ReactNode; tone?: 'info' | 'warning' | 'danger'; action?: React.ReactNode }
export declare function Alert(props: AlertProps): React.ReactElement;

export interface EmptyStateProps { title: string; description: string; actions?: React.ReactNode }
export declare function EmptyState(props: EmptyStateProps): React.ReactElement;

export interface ProgressProps { label: string; value: number; max?: number; tone?: 'default' | 'agent'; valueText?: string }
export declare function Progress(props: ProgressProps): React.ReactElement;
export declare function Skeleton(props: { lines?: number; height?: number }): React.ReactElement;

// Agent components
export interface Citation { label: string; href: string }
export interface AgentMessageProps { role: 'user' | 'agent'; agentName?: string; content: React.ReactNode; citations?: Citation[]; suggestions?: string[]; runSummary?: string; streaming?: boolean }
export declare function AgentMessage(props: AgentMessageProps): React.ReactElement;

export type StepState = 'queued' | 'running' | 'waiting' | 'done' | 'failed' | 'stopped';
export interface AgentStep { title: string; state: StepState; detail?: string; durationMs?: number }
export interface AgentRunStepsProps { steps: AgentStep[]; status: StepState; collapsed?: boolean; onStop?: () => void; onRetry?: (index: number) => void }
export declare function AgentRunSteps(props: AgentRunStepsProps): React.ReactElement;

export interface ApprovalCardProps { action: string; reason: string; params: Record<string, string>; tone?: 'default' | 'danger'; decided?: { by: string; at: string; outcome: 'approved' | 'rejected' }; onApprove: () => void; onReject: () => void; onEdit?: () => void }
export declare function ApprovalCard(props: ApprovalCardProps): React.ReactElement;

export interface InsightCardProps { title: string; body: string; confidence: 'high' | 'medium' | 'low'; asOf: string; citation?: Citation; action?: { label: string; onSelect: () => void } }
export declare function InsightCard(props: InsightCardProps): React.ReactElement;

// ---------- Agent components added in 2.2 ----------
export type AgentState = 'thinking' | 'running' | 'waiting' | 'idle' | 'failed';
export interface AgentStatusProps { state: AgentState; label?: string; step?: number; totalSteps?: number }
export declare function AgentStatus(props: AgentStatusProps): React.ReactElement;

export interface ToolCallProps { title: string; tool: string; status: 'running' | 'done' | 'waiting' | 'failed'; args?: string; result?: string; durationMs?: number; onRetry?: () => void }
export declare function ToolCall(props: ToolCallProps): React.ReactElement;

export interface PlanStep { text: string; state: 'pending' | 'active' | 'done' }
export interface AgentPlanProps { goal: string; steps: PlanStep[]; onRun?: () => void; onEdit?: () => void; onCancel?: () => void }
export declare function AgentPlan(props: AgentPlanProps): React.ReactElement;

export interface ReasoningBlockProps { text: string; durationMs?: number; streaming?: boolean; defaultOpen?: boolean }
export declare function ReasoningBlock(props: ReasoningBlockProps): React.ReactElement;

export interface Source { title: string; kind: 'table' | 'record' | 'document' | 'web'; system: string; detail?: string; href: string }
export interface SourceCardsProps { sources: Source[] }
export declare function SourceCards(props: SourceCardsProps): React.ReactElement;

export interface ContextWindowProps { used: number; limit: number; segments: { label: string; tokens: number }[]; cacheHitRate?: number }
export declare function ContextWindow(props: ContextWindowProps): React.ReactElement;

export interface ModelCardProps { name: string; capabilities: string[]; status: 'active' | 'degraded' | 'down'; latencyMs?: number; costPerRun?: string; successRate?: number; rating?: number; keyLast4?: string; fallback?: string }
export declare function ModelCard(props: ModelCardProps): React.ReactElement;

export interface Actor { name: string; kind: 'agent' | 'person' }
export interface AgentHandoffProps { from: Actor; to: Actor; reason: string; onView?: () => void; onTakeOver?: () => void }
export declare function AgentHandoff(props: AgentHandoffProps): React.ReactElement;

export interface ResponseFeedbackProps { rating?: 'good' | 'bad'; stats?: { steps?: number; durationMs?: number; tokens?: number; cost?: string }; onRate?: (r: 'good' | 'bad', reasons?: string[], note?: string) => void; onCopy?: () => void; onRegenerate?: () => void }
export declare function ResponseFeedback(props: ResponseFeedbackProps): React.ReactElement;

export interface StarterPromptsProps { placeholder: string; prompts: { text: string; hint?: string }[]; onSubmit: (text: string) => void }
export declare function StarterPrompts(props: StarterPromptsProps): React.ReactElement;

export interface ReplyDraftProps { to: string; text: string; tone?: string; tones?: string[]; suggestion?: string; onUse: (text: string) => void; onRewrite?: () => void; onTranslate?: () => void; onSummarize?: () => void }
export declare function ReplyDraft(props: ReplyDraftProps): React.ReactElement;

export interface PiiRedactionProps { text: string; entities: { type: 'NAME' | 'PHONE' | 'EMAIL' | 'ID' | 'ADDRESS' | 'ACCOUNT'; start: number; end: number }[] }
export declare function PiiRedaction(props: PiiRedactionProps): React.ReactElement;

export interface FlowNode { id: string; label: string; kind: 'trigger' | 'agent' | 'tool' | 'human' | 'action'; state?: 'idle' | 'running' | 'done' | 'failed' }
export interface AIWorkflowProps { nodes: FlowNode[]; edges: [string, string][]; live?: boolean; runsThisWeek?: number }
export declare function AIWorkflow(props: AIWorkflowProps): React.ReactElement;

export interface ConnectorSetupProps { provider: string; description: string; scopes: { label: string; access: 'read' | 'write'; required?: boolean; enabled: boolean }[]; credentialLast4?: string; step?: number; totalSteps?: number; onConnect: () => void }
export declare function ConnectorSetup(props: ConnectorSetupProps): React.ReactElement;

export interface EnrichColumnProps { column: string; instruction: string; cells: { rowId: string; state: 'pending' | 'suggested' | 'accepted' | 'rejected'; value?: string }[]; onAcceptAll?: () => void }
export declare function EnrichColumn(props: EnrichColumnProps): React.ReactElement;

export interface VoiceInputProps { state: 'idle' | 'listening' | 'processing' | 'speaking'; transcript?: string; onToggle: () => void }
export declare function VoiceInput(props: VoiceInputProps): React.ReactElement;
export interface SpeechPlayerProps { src: string; durationSec: number; transcript: string; title?: string }
export declare function SpeechPlayer(props: SpeechPlayerProps): React.ReactElement;

// ---------- Expressive pack (opt-in, load components/expressive.css) ----------
export interface LivePillProps { title: string; status: string; state: 'running' | 'waiting' | 'done'; progress?: number; onOpen?: () => void }
export declare function LivePill(props: LivePillProps): React.ReactElement;
export interface AgentOrbProps { state: 'idle' | 'thinking' | 'listening' | 'waiting' | 'done' | 'error'; size?: number }
export declare function AgentOrb(props: AgentOrbProps): React.ReactElement;
export interface MorphButtonProps { label: string; workingLabel?: string; doneLabel?: string; variant?: 'primary' | 'secondary'; confirm?: boolean; confirmLabel?: string; onAction: () => Promise<void> }
export declare function MorphButton(props: MorphButtonProps): React.ReactElement;
export interface RollingNumberProps { label: string; value: string; note?: string }
export declare function RollingNumber(props: RollingNumberProps): React.ReactElement;
export interface ProgressRingsProps { rings: { label: string; percent: number }[] }
export declare function ProgressRings(props: ProgressRingsProps): React.ReactElement;
export interface TextRevealProps { text: string }
export declare function TextReveal(props: TextRevealProps): React.ReactElement;
export interface GenerationRevealProps { ready: boolean; status?: string; children: React.ReactNode }
export declare function GenerationReveal(props: GenerationRevealProps): React.ReactElement;
export interface SuccessMomentProps { title: string; detail?: string }
export declare function SuccessMoment(props: SuccessMomentProps): React.ReactElement;
export interface AgentLoopProps { phase: 'plan' | 'act' | 'observe' | 'reflect'; iteration?: number }
export declare function AgentLoop(props: AgentLoopProps): React.ReactElement;
export interface AgentTerminalProps { run: string; lines: { kind: 'time' | 'agent' | 'tool' | 'ok' | 'warn'; text: string }[]; live?: boolean }
export declare function AgentTerminal(props: AgentTerminalProps): React.ReactElement;
export interface KeycapsProps { keys: string[]; label: string }
export declare function Keycaps(props: KeycapsProps): React.ReactElement;
export interface ImageCompareProps { before: string; after: string; beforeLabel: string; afterLabel: string }
export declare function ImageCompare(props: ImageCompareProps): React.ReactElement;
// Shell-level (used by the host app, not generated): Dock, RadialMenu, CardStack, DateReel, SlidingTabs,
// SpotlightCard, FrostedPanel, DataFlow, VectorSearch, AgentCursor, TeamSwitcher — markup in their previews.

export interface Attachment { id: string; name: string; type: string; size?: number; status?: 'uploading' | 'ready' | 'failed' }
export interface ChatThreadMessage { id: string; role: 'user' | 'agent' | 'system'; content: React.ReactNode; timestamp: string; citations?: Source[]; attachments?: Attachment[]; status?: 'sending' | 'sent' | 'failed' }
export interface ChatThreadProps { messages: ChatThreadMessage[]; label: string; state?: 'loading' | 'ready' | 'error'; agentName?: string; onRetry?: (id: string) => void }
export declare function ChatThread(props: ChatThreadProps): React.ReactElement;
export interface AgentTimelineEvent { id: string; at: string; actor: string; kind: 'agent' | 'tool' | 'approval' | 'handoff' | 'retry'; title: string; detail?: React.ReactNode; status?: 'running' | 'done' | 'failed' | 'waiting' }
export interface AgentTimelineProps { events: AgentTimelineEvent[]; runId: string; label: string; state: 'running' | 'done' | 'failed' | 'stopped' }
export declare function AgentTimeline(props: AgentTimelineProps): React.ReactElement;
export interface MeetingSummaryAction { id: string; text: string; owner?: string; due?: string; approved?: boolean }
export interface MeetingSummaryProps { title: string; date: string; attendees: string[]; summary: React.ReactNode; decisions: string[]; actions: MeetingSummaryAction[]; sources: Source[] }
export declare function MeetingSummary(props: MeetingSummaryProps): React.ReactElement;
export interface AIEditChange { id: string; before: string; after: string; status: 'pending' | 'accepted' | 'rejected' | 'conflict'; reason?: string }
export interface AIEditReviewProps { title: string; changes: AIEditChange[]; onAccept: (id: string) => void; onReject: (id: string) => void; onUndo?: (id: string) => void }
export declare function AIEditReview(props: AIEditReviewProps): React.ReactElement;
export interface ImageGenerationProps { prompt: string; model: string; size: string; state: 'queued' | 'generating' | 'complete' | 'partial' | 'failed' | 'cancelled'; images?: { src: string; alt: string }[]; onRetry?: () => void; onDownload?: (index: number) => void; onUse?: (index: number) => void }
export declare function ImageGeneration(props: ImageGenerationProps): React.ReactElement;
export interface TrainingRunProps { name: string; state: 'queued' | 'running' | 'paused' | 'completed' | 'failed' | 'cancelled'; progress?: number; eta?: string; metrics?: { label: string; value: string }[]; onPause?: () => void; onResume?: () => void; onCancel?: () => void }
export declare function TrainingRun(props: TrainingRunProps): React.ReactElement;
export interface LLMCostEstimatorProps { models: { name: string; provider: string; inputPerMillion: number; outputPerMillion: number }[]; inputTokens: number; outputTokens: number; requestsPerDay: number; pricingUpdatedAt: string; currency?: string }
export declare function LLMCostEstimator(props: LLMCostEstimatorProps): React.ReactElement;
export interface AICommandProps { open: boolean; query: string; results: { id: string; label: string; kind: 'action' | 'answer'; citations?: Source[] }[]; answer?: { agentName: string; text: string; citations?: Source[] }; onSelect: (id: string) => void; onClose: () => void }
export declare function AICommand(props: AICommandProps): React.ReactElement;
export interface AIComposerProps { value: string; attachments?: Attachment[]; state?: 'ready' | 'uploading' | 'sending' | 'generating' | 'error'; agentName?: string; onChange: (value: string) => void; onSend: () => void; onStop?: () => void; onRemoveAttachment?: (id: string) => void }
export declare function AIComposer(props: AIComposerProps): React.ReactElement;
