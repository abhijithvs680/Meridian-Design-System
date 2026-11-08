/* Demo controller: local UI state only; no network writes or credentials. Works from file://. */
(() => {
  function init(root = document) {
    root.querySelectorAll('[data-demo]').forEach(host => {
      if (host.dataset.initialized) return;
      host.dataset.initialized = 'true';
      const out = host.querySelector('[data-output]');
      const say = message => { if (out) out.textContent = message; };
      host.addEventListener('click', event => {
        const button = event.target.closest('[data-do]');
        if (!button || button.disabled) return;
        const action = button.dataset.do;
        if (action === 'approve' || action === 'reject') {
          if (host.dataset.decision) return;
          host.dataset.decision = action;
          host.querySelectorAll('[data-do="approve"],[data-do="reject"]').forEach(b => b.disabled = true);
          say(action === 'approve' ? 'Approved in this demo. No records were changed.' : 'Rejected. No action will be taken.');
        } else if (action === 'run') {
          const running = host.dataset.state !== 'running';
          host.dataset.state = running ? 'running' : 'paused';
          button.textContent = running ? 'Pause run' : 'Resume run';
          const badge = host.querySelector('[data-run-status]');
          if (badge) badge.textContent = running ? 'Running' : 'Paused';
          say(running ? 'Demo run started. Awaiting source connection.' : 'Run paused. Progress is preserved in this view.');
        } else if (action === 'cancel') {
          host.dataset.state = 'cancelled';
          host.querySelector('[data-run-status]').textContent = 'Cancelled';
          host.querySelector('[data-do="run"]').disabled = true; button.disabled = true;
          say('Demo run cancelled. No external actions occurred.');
        } else if (action === 'billing') {
          const yearly = button.getAttribute('aria-pressed') !== 'true';
          button.setAttribute('aria-pressed', String(yearly));
          host.querySelectorAll('[data-monthly]').forEach(p => p.textContent = yearly ? p.dataset.yearly : p.dataset.monthly);
          say(yearly ? 'Annual billing selected. Prices shown are monthly equivalents, billed annually.' : 'Monthly billing selected.');
        } else if (action === 'sort') {
          const table = button.closest('table'); const body = table.tBodies[0];
          const ascending = button.closest('th').getAttribute('aria-sort') !== 'ascending';
          [...body.rows].sort((a,b) => (Number(a.dataset.amount)-Number(b.dataset.amount))*(ascending?1:-1)).forEach(row=>body.append(row));
          button.closest('th').setAttribute('aria-sort', ascending ? 'ascending' : 'descending');
          say(ascending ? 'Amount sorted ascending.' : 'Amount sorted descending.');
        } else if (action === 'move') {
          const card = button.closest('[data-task]'); const next = card.parentElement.nextElementSibling;
          if (next) { next.querySelector('[data-cards]').append(card); } else {
            const lane = card.closest('.mp-lane').nextElementSibling;
            if (lane) lane.querySelector('[data-cards]').append(card);
          }
          if (!card.closest('.mp-lane').nextElementSibling) { button.textContent = 'Completed'; button.disabled = true; }
          say('Task moved to ' + card.closest('.mp-lane').querySelector('h3').textContent + '.');
        } else if (action === 'download') {
          const rows = [...host.querySelectorAll('tbody tr')].filter(r=>!r.hidden);
          const csv = ['Invoice,Customer,Amount,Status', ...rows.map(r=>[...r.cells].map(c=>'"'+c.textContent.trim().replaceAll('"','""')+'"').join(','))].join('\r\n');
          const url = URL.createObjectURL(new Blob([csv],{type:'text/csv;charset=utf-8'}));
          const a = document.createElement('a'); a.href=url; a.download='meridian-demo-invoices.csv'; a.click(); setTimeout(()=>URL.revokeObjectURL(url),1000); say('Filtered sample invoices exported.');
        } else if (action === 'plan') say('Plan selected in this demo. Connect your billing service to start checkout.');
      });
      host.addEventListener('input', () => {
        if (host.querySelector('[data-filter]')) {
          const query = host.querySelector('[data-filter]').value.toLowerCase();
          const status = host.querySelector('[data-status-filter]')?.value || 'all';
          let count = 0;
          host.querySelectorAll('tbody tr').forEach(row=>{row.hidden = !row.textContent.toLowerCase().includes(query) || (status!=='all' && row.dataset.status!==status); if(!row.hidden) count++;});
          say(`${count} matching invoices.`);
        }
        if (host.querySelector('[data-checklist]')) {
          const checks = [...host.querySelectorAll('input[type=checkbox]')]; const n = checks.filter(c=>c.checked).length;
          host.querySelector('progress').value = n; say(`${n} of ${checks.length} setup steps complete.`);
        }
      });
      host.addEventListener('submit',event=>{
        event.preventDefault();
        say('Validated locally. This demo does not send or store your information.');
      });
    });
  }
  window.MeridianPremium = { init };
  init();
})();
