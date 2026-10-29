import { arrow } from './icons.mjs';
import { escape } from './layout.mjs';

export const discoverButton=(href,label,extra='')=>`<a class="discover-button" href="${escape(href)}" ${extra}><span class="discover-fill" aria-hidden="true"></span><span class="discover-icon" aria-hidden="true">${arrow('right')}</span><span class="discover-label">${escape(label)}</span></a>`;
export const logo=(id,name='')=>`<img src="/assets/logos/${id}.${['mysql','docker','typescript','postman'].includes(id)?'svg':'png'}" width="96" height="96" alt="${escape(name)}" loading="eager" decoding="sync">`;
export const award=(slug)=>{
  const text=slug==='hybrid-lpg'?'1st place · Innovare 2026':slug==='adaptive-lidar'?'College selection winner · SIH 2026':null;
  return text?`<span class="award"><svg viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="1.3" aria-hidden="true"><path d="M13 26C3 22 3 10 8 5m11 21c10-4 10-16 5-21M8 9l-5-1m4 7-5-2m7 8-5-2m20-10 5-1m-4 7 5-2m-7 8 5-2"/><path d="m16 8 2 5 5 .5-4 3.5 1 5-4-2.5-4 2.5 1-5-4-3.5 5-.5Z"/></svg>${text}</span>`:'';
};
export const previewImage=(kind,index)=>`/assets/placeholders/${kind}-${index}.svg`;
export const ambientSignal=()=>`<div class="ambient-signal" data-ambient role="img" aria-label="Animated connections representing software, artificial intelligence and quantum computing"><svg viewBox="0 0 380 68" fill="none" aria-hidden="true"><path class="signal-rail" d="M12 34h78c36 0 36-21 72-21h58c36 0 36 42 72 42h76M12 34h78c36 0 36 21 72 21h58c36 0 36-42 72-42h76M12 34h356"/><path class="signal-flow" pathLength="1" d="M12 34h78c36 0 36-21 72-21h58c36 0 36 42 72 42h76"/><path class="signal-flow alternate" pathLength="1" d="M12 34h78c36 0 36 21 72 21h58c36 0 36-42 72-42h76"/><circle cx="12" cy="34" r="4"/><circle cx="190" cy="34" r="6"/><circle cx="368" cy="34" r="4"/></svg><div><span>Software</span><span>AI</span><span>Quantum</span></div></div>`;
