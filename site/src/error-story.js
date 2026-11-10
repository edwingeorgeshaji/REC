// Twelve persistent strokes form a bird, a butterfly, and a blooming flower.
// Each scene keeps stroke identities so the loop morphs without cuts or fades.
export const storyScenes = [
 [
 'M106 158 C88 112 118 82 149 103 C180 118 168 160 143 180 C125 196 97 180 106 158',
 'M118 150 C91 161 76 173 54 178 C71 186 93 183 110 173',
 'M114 143 C130 123 155 131 155 150 C151 169 128 174 114 157',
 'M153 111 C166 107 173 107 184 115 C173 118 168 120 161 121',
 'M148 114 C147 110 153 110 153 114 C153 118 147 118 148 114',
 'M122 183 C120 191 120 196 116 201 C112 202 110 202 107 202',
 'M136 184 C136 193 136 198 132 202 C128 202 126 202 122 202',
 'M48 207 C104 199 176 204 230 188',
 'M181 199 C179 182 190 173 208 172 C205 188 195 196 181 199',
 'M190 192 C195 185 201 180 208 172',
 'M204 100 C212 93 220 94 225 88',
 'M214 119 C225 112 235 116 243 108'
 ],
 [
 'M146 126 C139 111 140 100 146 100 C152 100 153 111 146 126 C141 146 141 161 146 177 C151 160 151 143 146 126',
 'M140 125 C117 84 70 65 66 100 C64 129 105 146 140 145',
 'M152 125 C175 84 222 65 226 100 C228 129 187 146 152 145',
 'M139 147 C101 137 78 162 92 187 C106 211 132 184 143 161',
 'M153 147 C191 137 214 162 200 187 C186 211 160 184 149 161',
 'M143 103 C138 88 129 85 126 77',
 'M149 103 C154 88 163 85 166 77',
 'M132 134 C108 111 88 102 80 99',
 'M160 134 C184 111 204 102 212 99',
 'M130 158 C116 162 108 174 103 181',
 'M162 158 C176 162 184 174 189 181',
 'M105 225 C124 212 168 239 190 220'
 ],
 [
 'M132 122 C132 105 158 105 158 122 C158 140 132 140 132 122',
 'M137 108 C115 72 140 57 151 76 C157 88 151 99 150 108',
 'M156 111 C174 78 199 88 193 106 C189 120 171 122 159 119',
 'M160 128 C199 121 204 149 184 153 C170 154 157 143 153 137',
 'M147 140 C164 170 141 190 130 170 C124 157 133 146 137 138',
 'M131 135 C101 159 82 137 99 122 C108 115 121 120 131 122',
 'M132 113 C101 109 100 83 119 86 C131 89 135 98 137 108',
 'M146 177 C146 199 139 220 145 244',
 'M143 222 C120 221 104 205 106 192 C126 194 141 205 143 222',
 'M145 207 C164 208 185 187 184 177 C162 181 149 190 145 207',
 'M106 192 C122 206 131 211 143 222',
 'M145 207 C159 195 170 185 184 177'
 ]
];
export function errorStoryMarkup(){return `<div class="error-story" aria-hidden="true"><svg viewBox="0 0 292 292" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" data-error-story>${storyScenes[0].map(d=>`<path d="${d}"/>`).join('')}</svg></div>`;}
export function initErrorStory(){
 const svg=document.querySelector('[data-error-story]');if(!svg)return;
 const paths=[...svg.children],samples=48,reduced=matchMedia('(prefers-reduced-motion: reduce)');
 const probe=document.createElementNS('http://www.w3.org/2000/svg','path');svg.append(probe);
 const frames=storyScenes.map(scene=>scene.map(d=>{probe.setAttribute('d',d);const length=probe.getTotalLength();return Array.from({length:samples},(_,i)=>{const p=probe.getPointAtLength(length*i/(samples-1));return [p.x,p.y];});}));probe.remove();
 const hold=1900,morph=800,period=hold+morph;let elapsed=0,last=0,frame=0,visible=false;
 function draw(){const scene=Math.floor(elapsed/period)%frames.length,phase=elapsed%period,raw=Math.max(0,(phase-hold)/morph),t=raw*raw*(3-2*raw),next=(scene+1)%frames.length;
  paths.forEach((path,i)=>{const points=frames[scene][i].map(([x,y],j)=>{const [nx,ny]=frames[next][i][j];const bend=Math.sin(Math.PI*t)*7*Math.sin(i*1.7);return `${(x+(nx-x)*t+bend).toFixed(2)},${(y+(ny-y)*t-bend*.5).toFixed(2)}`;});path.setAttribute('d','M'+points.join(' L'));});
 }
 function tick(time){frame=0;if(!visible||document.hidden||reduced.matches){last=0;return;}if(last)elapsed=(elapsed+Math.min(time-last,50))%(period*frames.length);last=time;draw();frame=requestAnimationFrame(tick);}
 function sync(){if(frame)cancelAnimationFrame(frame);frame=0;last=0;if(reduced.matches){paths.forEach((p,i)=>p.setAttribute('d',storyScenes[0][i]));return;}if(visible&&!document.hidden)frame=requestAnimationFrame(tick);}
 new IntersectionObserver(([entry])=>{visible=entry.isIntersecting;sync();}).observe(svg);
 document.addEventListener('visibilitychange',sync);reduced.addEventListener('change',sync);window.addEventListener('pagehide',()=>{cancelAnimationFrame(frame);frame=0;last=0;});window.addEventListener('pageshow',sync);
}
