/** Pure state helpers. UI authorization is never a substitute for server checks. */
export function transitionRun(state, action) {
  const transitions = {ready:{start:'running'},running:{pause:'paused',cancel:'cancelled',complete:'completed',fail:'failed'},paused:{resume:'running',cancel:'cancelled'},failed:{retry:'running'}};
  return transitions[state]?.[action] ?? state;
}
export function decideApproval(state, decision, expiresAt, now = Date.now()) {
  if (state !== 'pending') return state;
  if (!Number.isFinite(expiresAt) || now >= expiresAt) return 'expired';
  return decision === 'approve' ? 'approved' : decision === 'reject' ? 'rejected' : state;
}
export function filterRecords(records, query = '', status = 'all') {
  const needle = query.trim().toLocaleLowerCase();
  return records.filter(row => (status === 'all' || row.status === status) && Object.values(row).some(value => String(value).toLocaleLowerCase().includes(needle)));
}
export function sortRecords(records, key, direction = 'asc') {
  const sign = direction === 'desc' ? -1 : 1;
  return [...records].sort((a,b) => sign * (typeof a[key] === 'number' && typeof b[key] === 'number' ? a[key]-b[key] : String(a[key]).localeCompare(String(b[key]), undefined, {numeric:true})));
}
