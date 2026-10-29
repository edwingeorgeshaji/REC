export function initNavigation(){
  // Keep the accessible skip action hash-free while preserving native fallback.
  const skip=document.querySelector('.skip-link');
  skip?.addEventListener('click',event=>{
    if(event.defaultPrevented||event.button!==0||event.metaKey||event.ctrlKey||event.shiftKey||event.altKey)return;
    const main=document.getElementById('main');
    if(!main)return;
    event.preventDefault();
    main.focus({preventScroll:true});
    main.scrollIntoView({behavior:'instant',block:'start'});
  });
  const header=document.querySelector('[data-header]');
  if(!header)return;
  const nav=header.querySelector('nav');
  const indicator=nav.querySelector('.nav-indicator');
  const links=[...nav.querySelectorAll('[data-nav]')];
  const sections=[...document.querySelectorAll('main>section[id]')];
  const fixedPage=document.body.dataset.activePage;
  const reduced=matchMedia('(prefers-reduced-motion: reduce)');
  let active='',scheduled=false,lastY=scrollY,lastTime=performance.now(),locked='',lockTimer;

  function position(id,speed=300){
    const link=links.find(l=>l.dataset.nav===id);
    if(!link)return;
    for(const item of links){
      if(item===link)item.setAttribute('aria-current',fixedPage?'page':'location');
      else item.removeAttribute('aria-current');
    }
    indicator.style.setProperty('--nav-speed',`${speed}ms`);
    indicator.style.width=`${link.offsetWidth}px`;
    indicator.style.transform=`translateX(${link.offsetLeft}px)`;
    indicator.style.opacity='1';
    nav.classList.add('nav-ready');
    if(nav.scrollWidth>nav.clientWidth){
      nav.scrollTo({left:Math.max(0,link.offsetLeft-(nav.clientWidth-link.offsetWidth)/2),behavior:reduced.matches?'instant':'smooth'});
    }
    active=id;
  }
  function update(force=false){
    scheduled=false;
    const now=performance.now();
    const velocity=Math.abs(scrollY-lastY)/Math.max(now-lastTime,16);
    const duration=Math.round(Math.max(150,340-velocity*55));
    if(Math.abs(scrollY-lastY)>3)header.classList.toggle('is-compact',scrollY>lastY&&scrollY>100);
    lastY=scrollY;lastTime=now;
    const hero=document.querySelector('.hero');
    header.classList.toggle('over-hero',Boolean(hero&&hero.getBoundingClientRect().bottom>120));
    for(const control of header.querySelectorAll('.hero-control'))control.inert=!header.classList.contains('over-hero');
    let current=fixedPage||locked||'home';
    if(!fixedPage&&!locked){
      const probe=Math.min(innerHeight*.32,260);
      for(const section of sections)if(section.getBoundingClientRect().top<=probe)current=section.id;
      if(scrollY+innerHeight>=document.documentElement.scrollHeight-8)current='contact';
    }
    if(force||current!==active)position(current,duration);
  }
  const schedule=()=>{if(!scheduled){scheduled=true;requestAnimationFrame(()=>update());}};
  const unlock=()=>{locked='';clearTimeout(lockTimer);schedule();};
  window.addEventListener('scroll',schedule,{passive:true});
  window.addEventListener('scrollend',unlock);
  window.addEventListener('wheel',unlock,{passive:true});
  window.addEventListener('touchmove',unlock,{passive:true});
  window.addEventListener('popstate',unlock);
  const footerLink=document.querySelector('.footer-name');
  for(const link of [...links,...(footerLink?[footerLink]:[])])link.addEventListener('click',event=>{
    if(fixedPage||event.defaultPrevented||event.button!==0||event.metaKey||event.ctrlKey||event.shiftKey||event.altKey)return;
    const target=document.getElementById(link.dataset.nav||'home');
    if(!target)return;
    // Retain native scroll restoration and history entries, without exposing hashes.
    try{
      if(history.state?.portfolioSection!==target.id){
        history.pushState({...history.state,portfolioSection:target.id},'',location.pathname+location.search);
      }else if(location.hash){
        history.replaceState(history.state,'',location.pathname+location.search);
      }
    }catch{return;}
    event.preventDefault();
    locked=target.id;position(locked,300);clearTimeout(lockTimer);
    target.scrollIntoView({behavior:reduced.matches?'instant':'smooth',block:'start'});
    // Match anchor navigation's keyboard focus without a second scroll.
    if(!target.hasAttribute('tabindex')){
      target.setAttribute('tabindex','-1');
      target.addEventListener('blur',()=>target.removeAttribute('tabindex'),{once:true});
    }
    target.focus({preventScroll:true});
    lockTimer=setTimeout(unlock,1100);
  });
  new ResizeObserver(()=>update(true)).observe(nav);
  document.fonts.ready.then(()=>update(true));
  const restoreHeader=()=>{
    header.classList.remove('controls-ready');
    update(true);
    requestAnimationFrame(()=>requestAnimationFrame(()=>{update(true);header.classList.add('controls-ready');}));
  };
  window.addEventListener('pagehide',()=>header.classList.remove('controls-ready'));
  window.addEventListener('pageshow',restoreHeader);
  if(document.readyState==='complete')restoreHeader();
  update(true);
}
