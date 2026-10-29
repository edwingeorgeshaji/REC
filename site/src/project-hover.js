// Cursor-following preview adapted from the supplied HoverImg interaction.
// Native animation keeps this static site free of React/GSAP dependencies.
export function initProjectHover(root){
 const grid=root.querySelector('.project-results-grid');
 const allowed=matchMedia('(hover: hover) and (pointer: fine) and (min-width: 801px)');
 const reduced=matchMedia('(prefers-reduced-motion: reduce)');
 const follower=document.createElement('div');follower.className='project-hover-preview';follower.setAttribute('aria-hidden','true');
 const windowEl=document.createElement('div');windowEl.className='project-hover-window';
 const track=document.createElement('div');track.className='project-hover-track';windowEl.append(track);follower.append(windowEl);document.body.append(follower);
 const entries=[...root.querySelectorAll('[data-project-entry]')];
 entries.forEach(entry=>{
  const frame=document.createElement('div');frame.className='project-hover-frame';
  const visual=entry.querySelector('.project-card img, .project-diagram');
  if(visual){const clone=visual.cloneNode(true);clone.removeAttribute('id');frame.append(clone);}
  track.append(frame);
 });
 let active=null,x=0,y=0,tx=0,ty=0,raf=0;
 const hide=()=>{active=null;windowEl.classList.remove('is-visible');cancelAnimationFrame(raf);raf=0;};
 const tick=()=>{x+=(tx-x)*.18;y+=(ty-y)*.18;follower.style.transform=`translate3d(${x}px,${y}px,0)`;if(active&&(Math.abs(tx-x)+Math.abs(ty-y)>.2))raf=requestAnimationFrame(tick);else raf=0;};
 const position=event=>{const w=400,h=250;tx=Math.max(12,Math.min(innerWidth-w-12,event.clientX-w/2));ty=Math.max(12,Math.min(innerHeight-h-12,event.clientY-h/2));};
 entries.forEach((entry,index)=>{
  entry.addEventListener('pointerenter',event=>{
   if(!allowed.matches||reduced.matches||grid.dataset.view!=='list'||event.pointerType==='touch')return;
   position(event);if(!active){x=tx;y=ty;follower.style.transform=`translate3d(${x}px,${y}px,0)`;}
   active=entry;track.style.transform=`translateY(${-index*250}px)`;windowEl.classList.add('is-visible');
  });
  entry.addEventListener('pointermove',event=>{if(active!==entry)return;position(event);if(!raf)raf=requestAnimationFrame(tick);});
 });
 grid.addEventListener('pointerleave',hide);
 root.addEventListener('input',hide);root.addEventListener('click',hide);
 window.addEventListener('scroll',hide,{passive:true});window.addEventListener('resize',hide);
 allowed.addEventListener('change',hide);reduced.addEventListener('change',hide);
 document.addEventListener('visibilitychange',hide);
}
