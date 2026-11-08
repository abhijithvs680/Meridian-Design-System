import test from 'node:test';
import assert from 'node:assert/strict';
import { transitionRun, decideApproval, filterRecords, sortRecords } from '../components/premium-state.mjs';
test('run cancellation is terminal and pause is reversible',()=>{
  assert.equal(transitionRun('ready','start'),'running');
  assert.equal(transitionRun('running','pause'),'paused');
  assert.equal(transitionRun('paused','resume'),'running');
  assert.equal(transitionRun('paused','cancel'),'cancelled');
  assert.equal(transitionRun('cancelled','start'),'cancelled');
  assert.equal(transitionRun('completed','retry'),'completed');
  assert.equal(transitionRun('failed','retry'),'running');
});
test('approval expires at its exact boundary, cannot be repeated and rejects invalid expiry',()=>{
  assert.equal(decideApproval('pending','approve',100,99),'approved');
  assert.equal(decideApproval('pending','approve',100,100),'expired');
  assert.equal(decideApproval('pending','reject',100,99),'rejected');
  assert.equal(decideApproval('approved','reject',100,99),'approved');
  assert.equal(decideApproval('pending','approve',NaN,0),'expired');
});
test('search combines query and status without mutating records',()=>{
  const rows=[{name:'Orbit',amount:100,status:'Paid'},{name:'Orbit',amount:9,status:'Pending'},{name:'Aster',amount:50,status:'Paid'}];
  assert.deepEqual(filterRecords(rows,'  ORBIT ','Paid'),[rows[0]]);
  assert.deepEqual(filterRecords(rows,'missing'),[]);
  assert.deepEqual(sortRecords(rows,'amount').map(r=>r.amount),[9,50,100]);
  assert.deepEqual(sortRecords(rows,'amount','desc').map(r=>r.amount),[100,50,9]);
  assert.equal(rows[0].amount,100);
});
