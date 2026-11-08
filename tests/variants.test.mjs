import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import vm from 'node:vm';
import {combinations,decode,encode,perLayout,variantCSS} from '../catalog/variants.mjs';
test('every configuration has a unique stable round-trip ID',()=>{
 const variants=combinations(['ResearchComposer','AIComposer']);
 assert.equal(variants.length,1024);assert.equal(new Set(variants.map(v=>v.id)).size,1024);
 for(const variant of variants)assert.deepEqual(decode(variant.id,['ResearchComposer','AIComposer']),variant);
 assert.equal(decode('AIComposer~8~0~0~0',['AIComposer']),null);
 assert.equal(decode('bad~0~0~0~0',['AIComposer']),null);
});
test('filters restrict the actual exported dimensions',()=>{
 const variants=combinations(['AIComposer'],{p:'4',t:'2',s:'1'});assert.equal(variants.length,4);
 for(const v of variants){assert.match(variantCSS(v),/#182b24/);assert.match(variantCSS(v),/Trebuchet/);assert.equal(v.s,1);}
 assert.equal(encode('AIComposer',4,2,1,3),'AIComposer~4~2~1~3');
});
test('every advertised category has thousands of configurations with source markup',()=>{
 const data=JSON.parse(readFileSync(new URL('../catalog/data.json',import.meta.url),'utf8'));
 const context={window:{}};vm.createContext(context);
 for(const file of ['marketing-markup.js','composer-markup.js'])vm.runInContext(readFileSync(new URL('../catalog/'+file,import.meta.url),'utf8'),context);
 const markup=context.window.MERIDIAN_MARKETING_MARKUP;
 const counts={};for(const item of data.components.filter(c=>c.family)){assert.ok(markup[item.name]);counts[item.family]=(counts[item.family]||0)+1;}
 counts['AI composers']=Object.keys(context.window.MERIDIAN_COMPOSERS).length;
 assert.equal(Object.keys(counts).length,6);for(const count of Object.values(counts))assert.ok(count*perLayout>=2000);
 assert.equal(Object.values(counts).reduce((a,b)=>a+b,0)*perLayout,16896);
});
