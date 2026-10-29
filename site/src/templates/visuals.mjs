const svg = (content) => `<svg class="project-diagram" viewBox="0 0 600 360" fill="none" aria-hidden="true">${content}</svg>`;
const label = (x,y,text,extra='') => `<text x="${x}" y="${y}" class="diagram-label" ${extra}>${text}</text>`;

function microgrid() {
  const nodes=[[80,90],[180,65],[295,90],[415,60],[520,105],[100,205],[215,170],[330,220],[460,195],[530,280],[190,285],[355,300]];
  const edges=[[0,1],[1,2],[2,3],[3,4],[0,5],[1,6],[2,6],[2,7],[3,8],[4,8],[5,6],[5,10],[6,7],[6,10],[7,8],[7,11],[8,9],[9,11],[10,11]];
  return svg(`<g stroke="currentColor" stroke-opacity=".25">${edges.map(([a,b])=>`<path d="M${nodes[a]} ${nodes[b]}"/>`).join('')}</g><path class="accent-stroke diagram-trace" d="M80 90 180 65 295 90 330 220 460 195 530 280" stroke-width="2"/>${nodes.map(([x,y],i)=>`<circle cx="${x}" cy="${y}" r="${i===8||i===9?19:7}" fill="${i===8||i===9?'var(--accent)':'var(--paper)'}" stroke="${i===8||i===9?'var(--accent)':'currentColor'}"/>${label(x,y+(i===8||i===9?5:-17),String(i+1).padStart(2,'0'),`text-anchor="middle" ${i===8||i===9?'style="fill:var(--paper)"':''}`)}`).join('')}${label(30,343,'SCHEMATIC / BATTERY PLACEMENT')}${label(570,343,'BUS 09 + 10','text-anchor="end"')}`);
}

function research() {
  return svg(`<g stroke="currentColor" stroke-opacity=".26"><rect x="62" y="54" width="147" height="192" transform="rotate(-8 62 54)"/><path d="M79 86 188 71M84 114 179 101M88 134 183 121M93 165 173 154M97 185 181 173"/><rect x="391" y="61" width="145" height="192" transform="rotate(8 391 61)"/><path d="m408 87 91 13m-95 11 91 13m-96 13 90 13m-94 23 77 11m-80 11 86 12"/><path d="M209 160H265M365 160h41" stroke-dasharray="4 5"/></g><g class="diagram-trace"><rect x="236" y="94" width="128" height="171" fill="var(--paper)" stroke="var(--accent)"/><path d="M258 121h54m-54 22h84m-84 17h84m-84 17h58m-58 27h84m-84 17h71" class="accent-stroke"/><circle cx="301" cy="277" r="23" fill="var(--accent)"/><path d="m292 277 6 6 12-13" stroke="var(--paper)" stroke-width="2"/></g>${label(30,343,'DISCOVER → COMPARE → UNDERSTAND')}${label(570,343,'PAPERIQ','text-anchor="end"')}`);
}

function lidar() {
  let paths='';
  for(let row=0;row<17;row++) {
    let d='';
    for(let col=0;col<=40;col++) {const x=55+col*12.2;const y=72+row*10+Math.sin(col*.18+row*.22)*23-Math.exp(-((col-24)**2)/34)*Math.sin(row*.16)*65;d+=`${col?'L':'M'}${x.toFixed(1)} ${y.toFixed(1)}`;}
    paths+=`<path d="${d}" stroke="${row>10?'var(--accent)':'currentColor'}" opacity="${row>10?'.8':'.3'}"/>`;
  }
  return svg(`${paths}<path d="M297 296 191 147M297 296 405 144M297 296V172" stroke="var(--accent)" stroke-dasharray="3 5"/><circle cx="297" cy="296" r="7" fill="var(--accent)"/>${label(30,343,'FAR: COARSE / NEAR: FINE')}${label(570,343,'CONCEPT STUDY','text-anchor="end"')}`);
}

function energy() {
  return svg(`<g stroke="currentColor" stroke-opacity=".4"><rect x="92" y="183" width="76" height="90" rx="23"/><path d="M115 183v-16h30v16M121 165v-14h19m-6 0v16M168 231h72v-86h70M415 223h75V125H337"/><path d="M253 116h102l-8 39h-86zM243 109h122M268 93c-15-19 15-23 0-44m33 44c-15-19 15-23 0-44m33 44c-15-19 15-23 0-44"/><circle cx="452" cy="223" r="32" fill="var(--paper)"/></g><g class="accent-stroke diagram-trace" stroke-width="2"><path d="M183 231h57v-86h15M353 125h137v53M442 228l13-22-4 17h11l-17 19 5-14z"/><circle cx="304" cy="222" r="36"/><path d="M293 222h22m-11-11v22"/><path d="M268 222h-28m100 0h79" stroke-dasharray="4 5"/></g>${label(113,296,'LPG')}${label(427,277,'ELECTRIC')}${label(30,343,'SENSE → ADAPT → HEAT')}${label(570,343,'HYBRID SYSTEM','text-anchor="end"')}`);
}

export function projectVisual(type) {
  return ({quantum:microgrid,research,lidar,energy}[type] || research)();
}
