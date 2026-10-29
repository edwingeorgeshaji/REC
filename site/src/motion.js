export function initMotion(reduced){
  const signature=document.querySelector('.footer-name');
  if(signature){
    const letters=[...signature.querySelectorAll('[data-signature-letter]')];
    const strokes=letters.flatMap(letter=>[...letter.querySelectorAll('.signature-stroke')]);
    // Balance small finishing marks against long flourishes, and overlap each
    // handoff so a new stroke starts before the previous stroke comes to rest.
    const weights=strokes.map(stroke=>Math.max(12,Math.sqrt(stroke.getTotalLength())));
    const overlap=.22;
    const total=weights.reduce((sum,weight)=>sum+weight*(1-overlap),0)+weights.at(-1)*overlap;
    let animations=[],started=false;
    const reset=()=>{
      animations.forEach(animation=>animation.cancel());animations=[];started=false;
      strokes.forEach(stroke=>stroke.style.strokeDashoffset=reduced.matches?'0':'1');
      letters.forEach(letter=>letter.style.color=reduced.matches?'var(--ink)':'var(--accent)');
    };
    const start=()=>{
      started=true;
      const startTime=document.timeline.currentTime;
      const palette=getComputedStyle(signature);
      let elapsed=0,index=0;
      for(const letter of letters){
        let letterEnd=elapsed;
        for(const stroke of letter.querySelectorAll('.signature-stroke')){
          const duration=1900*weights[index++]/total;
          const writing=stroke.animate([{strokeDashoffset:1},{strokeDashoffset:0}],
            {duration,delay:elapsed,easing:'linear',fill:'both'});
          writing.startTime=startTime;
          animations.push(writing);
          letterEnd=elapsed+duration;
          elapsed+=duration*(1-overlap);
        }
        const colour=letter.animate([{color:palette.getPropertyValue('--accent').trim()},
          {color:palette.getPropertyValue('--ink').trim()}],
          {duration:300,delay:letterEnd,easing:'ease-out',fill:'forwards'});
        colour.startTime=startTime;
        colour.onfinish=()=>{letter.style.color='var(--ink)';colour.cancel();};
        animations.push(colour);
      }
    };
    const check=()=>{
      if(reduced.matches){reset();return;}
      const rect=signature.getBoundingClientRect();
      if(rect.top>=innerHeight||rect.bottom<=0){if(started)reset();}
      else if(rect.bottom<=innerHeight-16&&!started)start();
    };
    signature.classList.add('signature-ready');reset();
    const observer=new IntersectionObserver(check,{threshold:[0,1],rootMargin:'0px 0px -16px 0px'});
    observer.observe(signature);
    window.addEventListener('resize',check);
    window.addEventListener('pageshow',check);
    reduced.addEventListener('change',()=>{reset();check();});
    check();
  }
  const homePortrait=document.querySelector('.intro-layout>.portrait-wrap');
  if(homePortrait){
    const originalParent=homePortrait.parentElement;
    const phone=matchMedia('(max-width:600px)');
    const arrange=()=>{
      if(phone.matches)document.querySelector('#about-title').after(homePortrait);
      else originalParent.append(homePortrait);
    };
    phone.addEventListener('change',arrange);arrange();
  }
  let previousY=scrollY;
  const reveals=[...document.querySelectorAll('[data-reveal]')];
  const observer=new IntersectionObserver(entries=>{
    for(const entry of entries){
      if(entry.isIntersecting){
        entry.target.classList.add('is-visible');
      }else if(entry.boundingClientRect.bottom<0||entry.boundingClientRect.top>innerHeight){
        entry.target.classList.remove('is-visible');
        entry.target.style.setProperty('--reveal-y',scrollY<previousY?'-22px':'26px');
      }
    }
    previousY=scrollY;
  },{threshold:.08,rootMargin:'0px 0px -20px 0px'});
  for(const el of reveals){
    const r=el.getBoundingClientRect();
    if(r.top<innerHeight&&r.bottom>0)el.classList.add('is-visible');
    el.classList.add('reveal-ready');observer.observe(el);
  }

  const portrait=document.querySelector('[data-portrait]');
  const finePointer=matchMedia('(hover:hover) and (pointer:fine)');
  if(portrait){
    portrait.addEventListener('pointermove',event=>{
      if(reduced.matches||!finePointer.matches)return;
      const r=portrait.getBoundingClientRect();
      const x=Math.max(-1,Math.min(1,(event.clientX-r.left)/r.width*2-1));
      const y=Math.max(-1,Math.min(1,(event.clientY-r.top)/r.height*2-1));
      portrait.style.setProperty('--portrait-x',`${-y*2.5}deg`);
      portrait.style.setProperty('--portrait-y',`${x*3}deg`);
    });
    const reset=()=>{portrait.style.setProperty('--portrait-x','0deg');portrait.style.setProperty('--portrait-y','0deg');};
    portrait.addEventListener('pointerleave',reset);
    reduced.addEventListener('change',reset);
  }

  const stage=document.querySelector('[data-skills]');
  if(!stage)return;
  stage.querySelector('svg').setAttribute('preserveAspectRatio','xMidYMid meet');
  let visible=false,queued=false;
  function update(){
    queued=false;
    if(!visible||reduced.matches)return;
    const rect=stage.getBoundingClientRect();
    const progress=Math.max(0,Math.min(1,(innerHeight-rect.top)/(innerHeight+rect.height)));
    stage.style.setProperty('--skill-drift',`${(progress-.5)*9}px`);
    stage.style.setProperty('--orbit-angle',`${(progress-.5)*12}deg`);
    stage.style.setProperty('--orbit-offset',String(-progress*.8));
  }
  const queue=()=>{if(!queued&&visible&&!reduced.matches){queued=true;requestAnimationFrame(update);}};
  new IntersectionObserver(([entry])=>{visible=entry.isIntersecting;queue();}).observe(stage);
  window.addEventListener('scroll',queue,{passive:true});
  const resetStage=()=>{for(const property of ['--look-x','--look-y','--skill-drift'])stage.style.setProperty(property,'0px');stage.style.setProperty('--orbit-angle','0deg');};
  stage.addEventListener('pointerleave',resetStage);
  reduced.addEventListener('change',()=>{resetStage();queue();});
}
