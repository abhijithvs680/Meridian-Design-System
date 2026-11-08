export const statusLabels = {
  queued: 'Ready', running: 'Running', 'awaiting-approval': 'Review required',
  completed: 'Completed', cancelled: 'Cancelled', failed: 'Failed'
};

function node(tag, content, className) {
  const element = document.createElement(tag);
  if (content !== undefined) element.textContent = content;
  if (className) element.className = className;
  return element;
}

function definition(list, label, value) {
  list.append(node('dt', label), node('dd', value));
}

/** Render a snapshot. The host owns authorization, transport and command state. */
export function mountRunInspector(root, { onDecision }) {
  const timeline = root.querySelector('[data-run-steps]');
  const evidence = root.querySelector('[data-run-evidence]');
  const review = root.querySelector('[data-run-review]');
  const audit = root.querySelector('[data-run-audit]');
  const summary = root.querySelector('[data-run-summary]');
  let renderedState;

  function render(state, { connected = true, pending = false, now = Date.now() } = {}) {
    if (state !== renderedState) {
      const open = new Set([...root.querySelectorAll('details[open][data-key]')].map(item => item.dataset.key));
      timeline.replaceChildren(...state.steps.map(step => {
        const row = node('li', undefined, 'mo-step');
        row.dataset.status = step.status;
        const detail = node('details');
        detail.dataset.key = step.stepId;
        detail.open = open.has(step.stepId);
        detail.append(node('summary', step.label), node('p', step.detail),
          node('code', step.effect === 'write' ? step.stepId + ' · ' + step.receiptId : step.stepId + ' · read only'));
        row.append(detail, node('span', step.status, 'mo-step-status'));
        return row;
      }));
      evidence.replaceChildren(...state.sources.map(source => {
        const detail = node('details', undefined, 'mo-source');
        detail.dataset.key = source.sourceId;
        detail.open = open.has(source.sourceId);
        detail.append(node('summary', source.title), node('p', source.excerpt),
          node('code', source.sourceId + ' · ' + source.version));
        return detail;
      }));
      audit.replaceChildren(...state.audit.slice().reverse().map(event => {
        const row = node('li');
        const time = node('time', new Date(event.at).toISOString().slice(11, 19) + ' UTC');
        time.dateTime = event.at;
        row.append(node('code', String(event.seq).padStart(3, '0')), node('span', event.type), time);
        return row;
      }));
      renderedState = state;
    }
    root.querySelector('[data-steps-empty]').hidden = state.steps.length > 0;
    root.querySelector('[data-evidence-empty]').hidden = state.sources.length > 0;
    root.querySelector('[data-audit-empty]').hidden = state.audit.length > 0;
    const status = root.querySelector('[data-run-status]');
    if (status.textContent !== statusLabels[state.status]) status.textContent = statusLabels[state.status];
    status.dataset.status = state.status;
    root.querySelector('[data-run-cursor]').textContent = String(state.cursor).padStart(3, '0');
    root.querySelector('[data-run-spend]').textContent = (state.spentCents / 100).toFixed(2);
    root.querySelector('[data-run-limit]').textContent = state.limitCents ? 'of $' + (state.limitCents / 100).toFixed(2) : 'Budget pending';
    const progress = root.querySelector('[data-run-budget]');
    progress.max = state.limitCents || 1;
    progress.value = state.spentCents;
    if (summary.textContent !== state.message) summary.textContent = state.message;

    const hadFocus = review.contains(document.activeElement);
    const proposal = state.proposal;
    review.replaceChildren();
    if (!proposal) {
      const receipt = state.receipt;
      if (receipt) {
        review.append(node('strong', 'Decision ' + receipt.decision),
          node('p', receipt.actor + ' · ' + receipt.receiptId, 'mo-muted'));
      } else {
        review.append(node('p', 'No action awaiting review.', 'mo-muted'));
      }
    } else {
      const expired = now >= Date.parse(proposal.expiresAt);
      const fields = node('dl', undefined, 'mo-impact');
      definition(fields, 'Target', proposal.target);
      definition(fields, 'Before', proposal.before);
      definition(fields, 'After', proposal.after);
      definition(fields, 'Impact', proposal.impact);
      const sources = node('dd', undefined, 'mo-source-links');
      for (const id of proposal.sourceIds) {
        const link = node('button', id);
        link.type = 'button';
        link.addEventListener('click', () => {
          const source = [...evidence.querySelectorAll('details')].find(item => item.dataset.key === id);
          if (source) {
            source.open = true;
            source.querySelector('summary').focus();
          }
        });
        sources.append(link);
      }
      fields.append(node('dt', 'Evidence'), sources);
      const deadline = node('time', new Date(proposal.expiresAt).toLocaleTimeString());
      deadline.dateTime = proposal.expiresAt;
      const metadata = node('p', proposal.proposalId + ' · rev ' + proposal.revision + ' · expires ', 'mo-mono');
      metadata.append(deadline);
      review.append(node('strong', proposal.action), fields,
        metadata);
      const actions = node('div', undefined, 'mo-actions');
      for (const [decision, label] of [['rejected', 'Reject'], ['approved', 'Approve change']]) {
        const button = node('button', label, decision === 'approved' ? 'm-btn m-btn-primary' : 'm-btn');
        button.type = 'button';
        button.disabled = pending || !connected || expired;
        button.addEventListener('click', () => onDecision(decision));
        actions.append(button);
      }
      review.append(actions);
      if (pending || !connected || expired) {
        review.append(node('p', expired ? 'Proposal expired.' : !connected ? 'Reconnect to review.' : 'Recording decision…', 'mo-muted'));
      }
    }
    if (hadFocus) review.focus();
  }
  return { render };
}
