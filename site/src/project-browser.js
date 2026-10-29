import { initProjectHover } from './project-hover.js';
export function initProjectBrowser(){
 const root=document.querySelector('[data-project-browser]');if(!root)return;
 const input=root.querySelector('[data-project-search]'),clear=root.querySelector('[data-search-clear]'),grid=root.querySelector('.project-results-grid'),entries=[...root.querySelectorAll('[data-project-entry]')];
 const noun=root.dataset.browserKind||'project';
 const viewKey='edwin-collection-view';
 const restoreView=()=>{
  let view='grid';
  try {const saved=sessionStorage.getItem(viewKey);if(saved==='grid'||saved==='list')view=saved;} catch {}
  grid.dataset.view=view;
  root.querySelectorAll('[data-project-view]').forEach(button=>button.setAttribute('aria-pressed',String(button.dataset.projectView===view)));
 };
 restoreView();
 window.addEventListener('pageshow',restoreView);
 window.addEventListener('pagereveal',restoreView);
 const update=()=>{
  const query=input.value.trim().toLowerCase(),words=query.split(/\s+/).filter(Boolean);
  const score=e=>e.dataset.name.toLowerCase()===query?3:e.dataset.name.toLowerCase().includes(query)?2:1;
  entries.sort((a,b)=>(query&&noun!=='certificate'?score(b)-score(a):0)||a.dataset.rank-b.dataset.rank);
  let count=0;entries.forEach(e=>{e.hidden=!words.every(w=>e.dataset.search.toLowerCase().includes(w));if(!e.hidden)count++;grid.append(e);});
  clear.hidden=!input.value;root.querySelector('[data-project-results]').textContent=`${count} ${noun}${count===1?'':'s'}`;root.querySelector('[data-project-empty]').hidden=count!==0;
 };
 input.addEventListener('input',update);clear.addEventListener('click',()=>{input.value='';update();input.focus();});
 root.querySelectorAll('[data-project-view]').forEach(button=>button.addEventListener('click',()=>{
  if(grid.dataset.view===button.dataset.projectView)return;
  const visible=entries.filter(e=>!e.hidden);
  visible.forEach(e=>e.getAnimations().forEach(a=>a.cancel()));
  grid.dataset.view=button.dataset.projectView;
  try { sessionStorage.setItem(viewKey,grid.dataset.view); } catch {}
  root.querySelectorAll('[data-project-view]').forEach(b=>b.setAttribute('aria-pressed',String(b===button)));
  if(!matchMedia('(prefers-reduced-motion: reduce)').matches)visible.forEach(e=>{
   e.animate([{opacity:.35},{opacity:1}],{duration:420,easing:'cubic-bezier(.22,.61,.36,1)'});
  });
 }));
 document.addEventListener('keydown',event=>{
  if(event.key!=='/'||event.ctrlKey||event.metaKey||event.altKey||event.isComposing)return;
  if(event.target instanceof Element && (event.target.closest('input,textarea,select')||event.target.isContentEditable))return;
  if(document.querySelector('dialog[open]'))return;
  event.preventDefault();input.focus();
 });
 input.setAttribute('aria-keyshortcuts','/');
 initProjectHover(root);
 update();
 if(location.hash){
  const target=entries.find(entry=>'#'+entry.id===location.hash);
  if(target)requestAnimationFrame(()=>target.scrollIntoView({behavior:'instant',block:'start'}));
 }
}
