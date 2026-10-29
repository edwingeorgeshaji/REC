// Adjacent chapters share a single scroll progress value. Layout never shifts.
export function initToolkit(){
 const groups=[...document.querySelectorAll('[data-toolkit-group]')];
 if(!groups.length)return;
 const reduced=matchMedia('(prefers-reduced-motion: reduce)');
 const clamp=v=>Math.max(0,Math.min(1,v));
 let metrics=[],queued=false;
 function measure(){
  metrics=groups.map(group=>{
   const grid=group.querySelector('.toolkit-grid');
   const columns=Math.max(1,Math.floor((grid.clientWidth+12)/60));
   return {grid,items:[...grid.children].map((item,i)=>{
    const size=item.querySelector('.toolkit-logo').offsetWidth,scale=48/size;
    return {item,scale,x:(i%columns)*60-item.offsetLeft-(item.offsetWidth-size)/2*scale,y:Math.floor(i/columns)*60-item.offsetTop};
   })};
  });
  update();
 }
 function update(){
  queued=false;
  const focus=innerHeight*.55;
  const centers=metrics.map(({grid})=>{const r=grid.getBoundingClientRect();return r.top+r.height/2;});
  let index=0;
  while(index<centers.length-2&&focus>centers[index+1])index++;
  const t=clamp((focus-centers[index])/(centers[index+1]-centers[index]));
  const progress=t*t*(3-2*t);
  metrics.forEach(({grid,items},i)=>{
   const expansion=reduced.matches?1:i===index?1-progress:i===index+1?progress:0;
   grid.style.setProperty('--label-opacity',clamp((expansion-.25)/.65));
   for(const {item,scale,x,y} of items){
    item.style.setProperty('--item-x',`${x*(1-expansion)}px`);
    item.style.setProperty('--item-y',`${y*(1-expansion)}px`);
    item.style.setProperty('--item-scale',scale+(1-scale)*expansion);
   }
  });
 }
 const schedule=()=>{if(!queued){queued=true;requestAnimationFrame(update);}};
 addEventListener('scroll',schedule,{passive:true});
 addEventListener('pageshow',schedule);
 new ResizeObserver(measure).observe(document.querySelector('.toolkit-page'));
 document.fonts.ready.then(measure);
 reduced.addEventListener('change',update);
 measure();
}
