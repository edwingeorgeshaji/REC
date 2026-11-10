// A continuous 20-second meadow story, drawn entirely with persistent SVG strokes.
// The rabbit explores, flowers open for the visiting bee, then everyone returns home.
const TAU=Math.PI*2;
const smooth=t=>{t=Math.max(0,Math.min(1,t));return t*t*(3-2*t);};
const windowPulse=(t,a,b,c,d)=>smooth((t-a)/(b-a))*(1-smooth((t-c)/(d-c)));
const line=(points,close=false)=>'M'+points.map(p=>p.map(n=>n.toFixed(2)).join(',')).join(' L')+(close?' Z':'');
function ellipse(cx,cy,rx,ry,angle=0){return line(Array.from({length:33},(_,i)=>{const a=i/32*TAU,x=Math.cos(a)*rx,y=Math.sin(a)*ry;return [cx+x*Math.cos(angle)-y*Math.sin(angle),cy+x*Math.sin(angle)+y*Math.cos(angle)];}));}
function flight(t){
 // A closed Catmull-Rom route: arrive, sip at three flowers, circle the rabbit, return.
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
 // A small cloud stretches gently; it never cuts between poses.
 add(`M${43+wave*5} 65 c-9 -1 -11 -14 1 -17 c1 -18 28 -23 36 -8 c17 -7 28 11 17 21 c-11 6 -37 4 -54 4`);
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
 // Three outward bounds, an inquisitive sniff, then three homeward bounds.
 const outward=smooth(t/.27),home=smooth((t-.72)/.28),travel=outward*(1-home);
 const active=t<.27?t/.27:t>.72?(t-.72)/.28:0;
 const hop=(t<.27||t>.72)?Math.pow(Math.sin(active*Math.PI*3),2):0;
 const sniff=windowPulse(t,.3,.36,.62,.7),x=54+101*travel,y=234-23*hop;
 const lean=sniff*(5+Math.sin(TAU*t*8)*2),ear=Math.sin(TAU*t*6)*3+hop*6;
 const transform=`translate(${x} ${y}) rotate(${lean}) scale(${1+hop*.06} ${1-hop*.04})`;
 add('M-19 3 C-33 -14 -22 -37 -1 -35 C10 -37 18 -27 19 -17 C22 -7 14 4 -2 5 Z',transform);
 add(ellipse(-28,-13,7,7),transform);
 add(`M13 -26 C2 -39 4 -54 17 -56 C29 -62 42 -51 42 -42 Q51 -35 42 -29 Q31 -20 13 -26`,transform);
 add(`M14 -55 C${-1-ear} -86 ${7-ear} -98 ${17-ear*.2} -76 L22 -58 M25 -58 C${25+ear} -93 ${39+ear} -99 ${35+ear*.3} -74 L32 -56`,transform);
 add(`M13 -63 Q${5-ear*.5} -84 ${9-ear*.5} -85 M29 -65 Q${32+ear*.5} -86 ${35+ear*.5} -86`,transform);
 add(ellipse(32,-42,1.3,1.8),transform);
 add('M43 -36 l-3 2 l3 1 M43 -30 l9 -2 M43 -27 l8 2',transform);
 add(`M-8 -13 C-24 -8 -19 6 -6 6 L6 6 Q11 2 4 0 M16 -14 Q${20+hop*7} ${-3-hop*8} ${27+hop*6} ${2-hop*6} L15 3`,transform);
 // Bee follows a closed flight path; wings flutter while it drinks and circles.
 const [bx,by]=flight(t),wing=.35+.65*Math.pow(Math.sin(TAU*t*90),2),bee=`translate(${bx} ${by}) rotate(${Math.sin(TAU*t*4)*15})`;
 add(ellipse(0,0,10,6),bee);add(ellipse(10,-1,4,4),bee);
 add('M-3 -5 Q-6 0 -3 5 M3 -5 Q0 0 3 5 M14 -1 l5 3',bee);
 add(ellipse(-4,-8,7,7*wing,-.6),bee);add(ellipse(3,-9,6,8*wing,.5),bee);
 add('M-10 0 l-4 1 M10 -5 q0 -5 4 -6',bee);
 // A travelling wake uses earlier positions along the same route, not a fixed dash.
 for(let i=0;i<3;i++){const a=flight((t-.014-i*.009+1)%1),b=flight((t-.018-i*.009+1)%1);add(line([a,b]));}
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
