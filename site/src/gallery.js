export function initCertificateSort(){
 const list=document.querySelector('[data-certificate-list]');if(!list)return;
 const select=document.querySelector('[data-certificate-sort]'),button=document.querySelector('[data-sort-direction]'),status=document.querySelector('[data-sort-status]');
 const rows=[...list.children],params=new URLSearchParams(location.search);let ascending=params.get('order')==='asc';
 select.value=params.get('sort')==='name'?'name':'date';
 function sort(announce=true){
  const byName=select.value==='name';
  rows.sort((a,b)=>{
   if(byName)return a.dataset.name.localeCompare(b.dataset.name,'en')*(ascending?1:-1);
   const x=Date.parse(a.dataset.date),y=Date.parse(b.dataset.date);
   if(!Number.isFinite(x))return Number.isFinite(y)?1:a.dataset.name.localeCompare(b.dataset.name,'en');
   if(!Number.isFinite(y))return -1;
   return (x-y)*(ascending?1:-1)||a.dataset.name.localeCompare(b.dataset.name,'en');
  });
  list.append(...rows);rows.forEach(r=>r.classList.add('is-visible'));
  button.textContent=byName?(ascending?'A → Z':'Z → A'):(ascending?'Oldest first ↑':'Newest first ↓');
  button.setAttribute('aria-label',`Reverse sort order. Current: ${button.textContent}`);
  if(announce){const url=new URL(location.href);url.searchParams.set('sort',select.value);url.searchParams.set('order',ascending?'asc':'desc');history.replaceState(null,'',url);status.textContent=`Sorted ${rows.length} certificates by ${byName?'name':'date'}, ${button.textContent}. Undated records appear last when sorting by date.`;}
 }
 select.addEventListener('change',()=>{ascending=select.value==='name';sort();});button.addEventListener('click',()=>{ascending=!ascending;sort();});sort(false);
}
export function initGallery(reduced){
 const gallery=document.querySelector('[data-marquee]');if(!gallery)return;
 const sets=[...gallery.querySelectorAll('.marquee-set')],track=document.createElement('div');track.className='certificate-drag-track';track.append(...sets);gallery.append(track);
 const pause=document.querySelector('[data-marquee-pause]');
 let paused=false,visible=false,drag=null,frame=0,last=0,x=0,width=0,velocity=0,suppressClick=false;
 const draw=()=>{if(width){x=((x%width)+width)%width;track.style.transform=`translate3d(${-x}px,0,0)`;}};
 const measure=()=>{const progress=width?x/width:0;width=sets[0].getBoundingClientRect().width;x=progress*width;draw();};
 const label=()=>{pause.textContent=paused||reduced.matches?'Play':'Pause';pause.disabled=reduced.matches;pause.setAttribute('aria-label',`${paused||reduced.matches?'Play':'Pause'} certificate animation`);};
 function tick(time){frame=0;if(!visible||document.hidden||reduced.matches){last=0;return;}const dt=last?Math.min(time-last,40):16.67;last=time;if(!drag&&!paused){x+=dt*.08+velocity*(dt/16.67);velocity*=Math.pow(.975,dt/16.67);if(Math.abs(velocity)<.01)velocity=0;draw();}if(!paused||drag)frame=requestAnimationFrame(tick);}
 const start=()=>{if(!frame){last=0;frame=requestAnimationFrame(tick);}};
 const step=direction=>{velocity=0;if(reduced.matches){gallery.scrollBy({left:direction*gallery.clientWidth*.35,behavior:'instant'});return;}x+=direction*gallery.clientWidth*.35;draw();start();};
 document.querySelector('[data-marquee-prev]').addEventListener('click',()=>step(-1));document.querySelector('[data-marquee-next]').addEventListener('click',()=>step(1));
 pause.addEventListener('click',()=>{paused=!paused;velocity=0;label();start();});
 gallery.addEventListener('keydown',e=>{if(['ArrowLeft','ArrowRight'].includes(e.key)){e.preventDefault();step(e.key==='ArrowLeft'?-1:1);}});
 gallery.addEventListener('click',e=>{if(suppressClick&&e.detail!==0){e.preventDefault();e.stopPropagation();suppressClick=false;}},true);
 gallery.addEventListener('dragstart',e=>e.preventDefault());
 gallery.addEventListener('pointerdown',e=>{if(reduced.matches||e.button!==0)return;suppressClick=false;drag={x:e.clientX,start:e.clientX,time:performance.now()};velocity=0;gallery.classList.add('is-dragging');});
 gallery.addEventListener('pointermove',e=>{if(!drag)return;const now=performance.now(),dx=drag.x-e.clientX,dt=Math.max(1,now-drag.time);if(Math.abs(e.clientX-drag.start)>6){suppressClick=true;if(!gallery.hasPointerCapture(e.pointerId))gallery.setPointerCapture(e.pointerId);}x+=dx;velocity=Math.max(-60,Math.min(60,dx/dt*36.67*2.8));drag={x:e.clientX,start:drag.start,time:now};draw();});
 const release=e=>{if(!drag)return;if(e.type==='pointercancel'||performance.now()-drag.time>100)velocity=0;drag=null;gallery.classList.remove('is-dragging');start();};
 gallery.addEventListener('pointerup',release);gallery.addEventListener('pointercancel',release);gallery.addEventListener('lostpointercapture',release);
 new ResizeObserver(measure).observe(sets[0]);new IntersectionObserver(([e])=>{visible=e.isIntersecting;start();}).observe(gallery);
 document.addEventListener('visibilitychange',start);reduced.addEventListener('change',()=>{velocity=0;drag=null;gallery.classList.remove('is-dragging');label();measure();start();});measure();label();
}
