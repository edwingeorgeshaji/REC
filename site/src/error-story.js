// A continuous 20-second meadow story, drawn entirely with persistent SVG strokes.
// Two bees visit a flowering meadow under drifting clouds and a peeking sun.
const TAU=Math.PI*2;
const smooth=t=>{t=Math.max(0,Math.min(1,t));return t*t*(3-2*t);};
const windowPulse=(t,a,b,c,d)=>smooth((t-a)/(b-a))*(1-smooth((t-c)/(d-c)));
const line=(points,close=false)=>'M'+points.map(p=>p.map(n=>n.toFixed(2)).join(',')).join(' L')+(close?' Z':'');
function ellipse(cx,cy,rx,ry,angle=0){return line(Array.from({length:33},(_,i)=>{const a=i/32*TAU,x=Math.cos(a)*rx,y=Math.sin(a)*ry;return [cx+x*Math.cos(angle)-y*Math.sin(angle),cy+x*Math.sin(angle)+y*Math.cos(angle)];}));}
function flight(t){
 // A closed Catmull-Rom route: arrive, sip at three flowers, circle the meadow, return.
 const stops=[[340,75],[305,62],[269,110],[266,111],[303,147],[304,146],[226,153],[225,153],[170,105],[126,84],[191,44],[286,47]];
 const u=t*stops.length,i=Math.floor(u),f=u-i,p=k=>stops[(k+stops.length)%stops.length];
 const a=p(i-1),b=p(i),c=p(i+1),d=p(i+2);
 return [0,1].map(k=>.5*((2*b[k])+(-a[k]+c[k])*f+(2*a[k]-5*b[k]+4*c[k]-d[k])*f*f+(-a[k]+3*b[k]-3*c[k]+d[k])*f*f*f));
}
function meadow(t){
 const strokes=[];const add=(d,transform='')=>strokes.push({d,transform});const wave=Math.sin(TAU*t);
 add('M25 258 C95 248 140 259 195 253 C258 245 310 258 375 248');
 add('M55 273 C114 268 152 273 184 268');add('M257 270 Q311 263 350 268');
 // Bending grass shares the breeze with the flower stems.
 for(let i=0;i<11;i++){const x=34+i*32,y=254+Math.sin(i*2)*3,w=Math.sin(TAU*t*3+i)*4;add(`M${x-5} ${y} Q${x-11+w} ${y-15} ${x-8+w} ${y-23} M${x} ${y} Q${x+1+w} ${y-19} ${x+8+w} ${y-29} M${x+5} ${y} Q${x+13+w} ${y-12} ${x+16+w} ${y-13}`);}
 // The exposed sun arc sits behind the upper-right edge of the left cloud.
 const sunX=89+wave*5,sunY=37;
 add(`M${sunX-14} ${sunY-10} A17 17 0 1 1 ${sunX+15} ${sunY+8}`);
 for(let i=0;i<8;i++){const a=(-155+i*27)*Math.PI/180,len=i%2?5:9;add(line([[sunX+Math.cos(a)*22,sunY+Math.sin(a)*22],[sunX+Math.cos(a)*(22+len),sunY+Math.sin(a)*(22+len)]]));}
 // A small cloud stretches gently; it never cuts between poses.
 add(`M${43+wave*5} 65 c-9 -1 -11 -14 1 -17 c1 -18 28 -23 36 -8 c17 -7 28 11 17 21 c-11 6 -37 4 -54 4`);
 add('M0 0 c-9 -1 -11 -14 1 -17 c1 -18 28 -23 36 -8 c17 -7 28 11 17 21 c-11 6 -37 4 -54 4',`translate(${292-wave*4} 75) scale(.78)`);
 const flowers=[[268,139,1],[306,174,.78],[225,180,.7]];
 flowers.forEach(([x,y,scale],i)=>{
  const bloom=.3+.7*windowPulse(t,.05+i*.07,.16+i*.07,.69+i*.035,.94+i*.015),sway=Math.sin(TAU*t*3+i)*3;
  const cx=x+sway,cy=y+Math.sin(TAU*t*2+i)*1.5;
  add(`M${x} 252 C${x-7} 224 ${cx+9} ${cy+27} ${cx} ${cy}`);
  add(`M${x} 229 Q${x-27} 228 ${x-29} 209 Q${x-6} 211 ${x} 229`);
  add(`M${x+1} 217 Q${x+23} 211 ${x+27} 196 Q${x+6} 198 ${x+1} 217`);
  for(let j=0;j<6;j++){const a=j/6*TAU+Math.sin(TAU*t+i)*.08,dist=(5+10*bloom)*scale;add(ellipse(cx+Math.cos(a)*dist,cy+Math.sin(a)*dist,(5+9*bloom)*scale,(2+4*bloom)*scale,a));}
  add(ellipse(cx,cy,6*scale,6*scale));
 });
 // Two small bees have separate heads, thoraxes, striped abdomens, antennae and legs.
 for(let i=0;i<2;i++){
  const phase=(t+i*.43)%1,[bx,by]=flight(phase),wing=.3+.7*Math.pow(Math.sin(TAU*t*90+i*1.3),2);
  const bee=`translate(${bx} ${by+i*9}) rotate(${Math.sin(TAU*phase*4)*18}) scale(.64)`;
  add(ellipse(-6,1,9,5.5),bee);add(ellipse(3,0,4.3,4.5),bee);add(ellipse(9,-1,3.5,3.5),bee);
  add('M-11 -3 Q-13 1 -11 5 M-6 -4 Q-8 1 -6 6 M-1 -3 Q-3 1 -1 5',bee);
  add(ellipse(0,-7,6,7*wing,-.7),bee);add(ellipse(4,-7,5,7*wing,.5),bee);
  add('M9 -4 q1 -5 4 -6 M7 -4 q-1 -5 1 -7 M10 2 l3 3 M2 4 l-2 4 l-3 1 M5 4 l1 4 l3 1 M-3 5 l-3 4 l-3 0',bee);
 }
 return strokes;
}
export function errorStoryMarkup(){return `<div class="error-story" aria-hidden="true"><svg viewBox="0 0 400 300" fill="none" stroke="currentColor" stroke-width="1.65" stroke-linecap="round" stroke-linejoin="round" data-error-story>${meadow(0).map(p=>`<path d="${p.d}" transform="${p.transform}"/>`).join('')}</svg></div>`;}
export function initErrorStory(){
 const svg=document.querySelector('[data-error-story]');if(!svg)return;
 const paths=[...svg.children],reduced=matchMedia('(prefers-reduced-motion: reduce)');let elapsed=0,last=0,frame=0,visible=false;
 const draw=t=>meadow(t).forEach((p,i)=>{paths[i].setAttribute('d',p.d);paths[i].setAttribute('transform',p.transform);});
 function tick(time){frame=0;if(!visible||document.hidden||reduced.matches){last=0;return;}if(last)elapsed=(elapsed+Math.min(time-last,50))%20000;last=time;draw(elapsed/20000);frame=requestAnimationFrame(tick);}
 function sync(){cancelAnimationFrame(frame);frame=0;last=0;if(reduced.matches){draw(.44);return;}if(visible&&!document.hidden)frame=requestAnimationFrame(tick);}
 new IntersectionObserver(([e])=>{visible=e.isIntersecting;sync();}).observe(svg);
 document.addEventListener('visibilitychange',sync);reduced.addEventListener('change',sync);window.addEventListener('pagehide',()=>{cancelAnimationFrame(frame);frame=0;last=0;});window.addEventListener('pageshow',sync);
}
