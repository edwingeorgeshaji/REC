export function initSlideshows() {
 document.querySelectorAll('[data-project-gallery]').forEach(gallery=>{
  const dialog=gallery.querySelector('dialog'),images=[...dialog.querySelectorAll('[data-large-image]')],status=dialog.querySelector('.lightbox-status');let current=0,opener,previousOverflow;
  const inline=[...gallery.querySelectorAll('[data-inline-image]')],inlineStatus=gallery.querySelector('[data-inline-status]');
  if(images.length<2)gallery.querySelectorAll('[data-inline-step],[data-image-step]').forEach(button=>{button.hidden=true;});
  const reduced=matchMedia('(prefers-reduced-motion: reduce)');
  let transitionId=0;
  const show=index=>{
   const previous=current,direction=index<current?-1:1;
   current=(index+images.length)%images.length;
   if(gallery.hasAttribute('data-certificate-gallery')) {
    const img=inline[current].querySelector('img');
    gallery.style.setProperty('--certificate-ratio',Math.max(1,Number(img.getAttribute('width'))/Number(img.getAttribute('height'))));
   }
   const id=++transitionId;
   [images,inline].forEach(set=>{
    set.forEach((image,i)=>{image.getAnimations().forEach(animation=>animation.cancel());image.hidden=i!==current;});
    if(previous===current||reduced.matches)return;
    const outgoing=set[previous],incoming=set[current];outgoing.hidden=false;
    const options={duration:380,easing:'cubic-bezier(.22,.75,.18,1)'};
    outgoing.animate([{transform:'translateX(0)'},{transform:`translateX(${-direction*100}%)`}],options).finished.then(()=>{if(id===transitionId)outgoing.hidden=true;}).catch(()=>{});
    incoming.animate([{transform:`translateX(${direction*100}%)`},{transform:'translateX(0)'}],options);
   });
   status.textContent=inlineStatus.textContent=`${current+1} / ${images.length}`;
  };
  gallery.querySelectorAll('[data-image-open]').forEach(button=>button.addEventListener('click',()=>{opener=button;show(current);previousOverflow=document.body.style.overflow;document.body.style.overflow='hidden';dialog.showModal();dialog.querySelector('[data-image-close]').focus();}));
  gallery.querySelectorAll('[data-inline-step]').forEach(button=>button.addEventListener('click',()=>show(current+Number(button.dataset.inlineStep))));
  dialog.querySelector('[data-image-close]').addEventListener('click',()=>dialog.close());
  dialog.querySelectorAll('[data-image-step]').forEach(button=>button.addEventListener('click',()=>show(current+Number(button.dataset.imageStep))));
  dialog.addEventListener('keydown',event=>{if(['ArrowLeft','ArrowRight'].includes(event.key)){event.preventDefault();show(current+(event.key==='ArrowLeft'?-1:1));}});
  dialog.addEventListener('click',event=>{if(event.target===dialog)dialog.close();});
  dialog.addEventListener('close',()=>{document.body.style.overflow=previousOverflow;opener?.focus({preventScroll:true});});
 });
}
