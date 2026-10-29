import { initProjectBrowser } from './project-browser.js';
import { initSlideshows } from './slideshow.js';
import { initNavigation } from './navigation.js';
import { initGallery, initCertificateSort } from './gallery.js';
import { initMotion } from './motion.js';

const root=document.documentElement;
const reduced=matchMedia('(prefers-reduced-motion: reduce)');
// Resolve the destination before the incoming page is painted. Font swaps must
// not move the company after the cross-document transition has started.
const experienceTarget=document.querySelector('.experience-record:target');
if(experienceTarget && performance.getEntriesByType('navigation')[0]?.type!=='back_forward'){
  await document.fonts.ready;
  experienceTarget.scrollIntoView({behavior:'instant',block:'start'});
}
initNavigation();
initMotion(reduced);
initGallery(reduced);
initCertificateSort();
if(document.querySelector('.toolkit-page'))import('./toolkit.js').then(({initToolkit})=>initToolkit());
Promise.allSettled([document.fonts.ready,...[...document.querySelectorAll('.hero-image')].map(img=>img.decode())]).then(()=>root.classList.remove('booting'));

// One atomic theme update with the original circular reveal.
const themeButton=document.querySelector('[data-theme-toggle]');
let targetTheme=root.dataset.theme,busy=false;
function themeLabel(){themeButton?.setAttribute('aria-label',`Switch to ${targetTheme==='dark'?'light':'dark'} theme`);}
function setTheme(theme){
  root.dataset.theme=theme;
  document.querySelector('meta[name="theme-color"]').content=theme==='light'?'#e7eddf':'#101d17';
  try{sessionStorage.setItem('edwin-theme',theme);}catch{}
}
async function changeTheme(){
  if(busy)return;
  busy=true;
  const next=targetTheme;
  try{
    if(document.startViewTransition&&!reduced.matches){
      // View-transition clipping uses viewport coordinates, measured before the swap.
      const box=themeButton.getBoundingClientRect();
      const hero=document.querySelector('.hero');
      const heroBox=hero?.getBoundingClientRect();
      const blendHeight=hero?parseFloat(getComputedStyle(hero,'::after').height):0;
      // Begin at the gradient, not below it or across the unchanged photograph.
      const blendTop=heroBox?heroBox.bottom-blendHeight:box.top+box.height/2;
      const x=box.left+box.width/2;
      const y=hero?Math.max(0,Math.min(innerHeight,blendTop)):box.top+box.height/2;
      const radius=Math.hypot(Math.max(x,innerWidth-x),Math.max(y,innerHeight-y));
      root.classList.add('theme-changing');
      const transition=document.startViewTransition(()=>setTheme(next));
      await transition.ready;
      const timing={duration:550,easing:'cubic-bezier(.22,.75,.18,1)'};
      await root.animate({clipPath:[`circle(0px at ${x}px ${y}px)`,`circle(${radius}px at ${x}px ${y}px)`]}, {...timing,pseudoElement:'::view-transition-new(root)'}).finished;
      await transition.finished;
    }else{
      root.classList.add('theme-fallback');
      setTheme(next);
    }
  }catch{setTheme(next);}finally{
    root.classList.remove('theme-changing');busy=false;
    if(targetTheme!==root.dataset.theme)changeTheme();
  }
}
themeButton?.addEventListener('click',()=>{targetTheme=targetTheme==='dark'?'light':'dark';themeLabel();changeTheme();});
themeLabel();

// Restored pages retain their old DOM; reconcile it with the latest choice
// before showing a cached homepage or subpage again.
function restoreTheme(){
  try{
    const saved=sessionStorage.getItem('edwin-theme');
    if(saved!=='light'&&saved!=='dark')return;
    targetTheme=saved;
    if(root.dataset.theme!==saved)setTheme(saved);
    themeLabel();
  }catch{}
}
window.addEventListener('pageshow',restoreTheme);
window.addEventListener('pagereveal',restoreTheme);
restoreTheme();

const copy=document.querySelector('[data-copy]');
if(copy&&navigator.clipboard?.writeText){
  copy.hidden=false;let timer;
  copy.addEventListener('click',async()=>{
    clearTimeout(timer);
    const status=document.querySelector('[data-copy-status]');
    try{await navigator.clipboard.writeText(copy.dataset.copy);copy.classList.add('copied');copy.setAttribute('aria-label','Email copied');status.textContent='Email address copied.';}
    catch{copy.setAttribute('aria-label','Copy failed; select the email address');status.textContent='Please select the email address to copy it, or open the email link.';}
    timer=setTimeout(()=>{copy.classList.remove('copied');copy.setAttribute('aria-label','Copy email');},2500);
  });
}

initSlideshows();

initProjectBrowser();
