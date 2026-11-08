import type { RunState, DecisionCommand } from './runtime.mjs';
export const statusLabels: Record<RunState['status'], string>;
export function mountRunInspector(
  root: HTMLElement,
  options: { onDecision: (decision: DecisionCommand['decision']) => void }
): { render(state: RunState, options?: { connected?: boolean; pending?: boolean; now?: number }): void };
