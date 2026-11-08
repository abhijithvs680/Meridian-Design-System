export const palettes=[
 ['Ivory & teal','#faf8f0','#1c3531','#52665d','#d5ddd2','#155e52','#eaf0e7'],
 ['Midnight','#15232c','#f4f0e5','#bdcbd0','#455b66','#bcded7','#213640'],
 ['Parchment','#eee6d4','#353326','#66604e','#c9bfa9','#69482d','#e3d9c5'],
 ['Oxide','#fff3e8','#4e2b25','#795b50','#e4c9ba','#963d29','#f4dfcf'],
 ['Evergreen','#182b24','#f3f3e6','#bdcdbb','#48614c','#dbedb4','#294035'],
 ['Porcelain','#f7f9fc','#223347','#596b7c','#d1dbe5','#284e75','#e9eff5'],
 ['Graphite','#242629','#f5f2eb','#c9c7c2','#56595c','#e1d4b6','#36393d'],
 ['Sandstone','#e9dfd1','#332d2a','#645c56','#bfb1a2','#594138','#ded0bf']
];
export const types=['Editorial','Grotesk','Humanist','Technical'];
export const spaces=['Compact','Balanced','Open','Expansive'];
export const frames=['Flush','Inset','Floating','Outlined'];
export const perLayout=palettes.length*types.length*spaces.length*frames.length;
export function encode(layout,p=0,t=0,s=1,f=0){return [layout,p,t,s,f].join('~');}
export function decode(id,layouts){const [layout,...raw]=id.split('~');const n=raw.map(Number);if(!layouts.includes(layout)||n.length!==4||n.some((v,i)=>!Number.isInteger(v)||v<0||v>=[8,4,4,4][i]))return null;return {id,layout,p:n[0],t:n[1],s:n[2],f:n[3]};}
export function combinations(layouts,filter={}){const out=[];for(const layout of layouts)for(let p=0;p<8;p++)for(let t=0;t<4;t++)for(let s=0;s<4;s++)for(let f=0;f<4;f++){const v={layout,p,t,s,f,id:encode(layout,p,t,s,f)};if(Object.entries(filter).every(([k,value])=>value===''||value===undefined||String(v[k])===String(value)))out.push(v);}return out;}
export function variantCSS(v){const [,bg,ink,muted,line,accent,panel]=palettes[v.p], dark=[1,4,6].includes(v.p);const font=['Georgia,serif','Arial,Helvetica,sans-serif','"Trebuchet MS",system-ui,sans-serif','ui-monospace,Consolas,monospace'][v.t];const pad=[24,44,68,94][v.s];const radius=[0,8,22,0][v.f];return `
body.mk-page,body.mc-demo{background:${panel};color:${ink};margin:0;padding:${[0,20,32,16][v.f]}px;box-sizing:border-box;min-height:100vh}
.mk-page,.mk-page [data-mk-tone]{--mk-bg:${bg};--mk-ink:${ink};--mk-muted:${muted};--mk-line:${line};--mk-accent:${accent};--mk-on-accent:${dark?ink==='#f3f3e6'?'#182b24':'#15232c':'#ffffff'};--mk-panel:${panel};--mk-pad:clamp(20px,${pad/12}vw,${pad}px)}
.mk-page>:not(script):not(style),.mc .mc-editor{border-radius:${radius}px;${v.f===2?'box-shadow:0 16px 40px #00000020;':v.f===3?`border:2px solid ${line};`:''}}
.mk-page .mk-title,.mk-page .mk-serif,.mk-page .mk-brand,.mk-page .mk-nav,.mk-page .mk-footer{font-family:${font}}
.mk-page .mk-nav-row,.mk-page .mk-footer{padding-block:${pad/3}px}
.mk-page .mk-button,.mc .mc-tool,.mc .mc-send{border-radius:${[2,6,24,0][v.f]}px}
.mc{--mc-bg:${bg};--mc-ink:${ink};--mc-muted:${muted};--mc-line:${line};--mc-edge:${dark?"#8b929b":"#747879"};--mc-focus:${ink};--mc-soft:${panel};--mc-font:${font};--mc-gap:${[3,4,6,8][v.s]}px;--mc-radius:${radius}px;margin:16px auto}
.mc[data-size="expanded"] textarea{min-block-size:${[72,92,112,132][v.s]}px}
.mc[data-layout="canvas"] textarea{min-block-size:${[120,140,160,180][v.s]}px}
@media(max-width:600px){body.mk-page,body.mc-demo{padding:${v.f?10:0}px}.mk-page .mk-nav-row{padding-block:12px}.mc{margin:10px auto}}
`;}
