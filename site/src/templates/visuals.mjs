// Concept illustrations, deliberately distinct from product screenshots.
// Replace via a project's `image` and `imageAlt` fields when assets are ready.
export function projectVisual(type) {
  let drawing = '';
  if (type === 'quantum') {
    const nodes = [[70,138],[144,80],[210,155],[293,77],[322,209],[415,146],[495,71],[527,218],[186,250],[423,285]];
    const edges = [[0,1],[0,2],[1,2],[1,3],[2,3],[2,4],[2,8],[3,5],[3,6],[4,5],[4,8],[4,9],[5,6],[5,7],[5,9],[6,7],[7,9],[8,9]];
    drawing = `<g stroke="#7394ac" stroke-opacity=".4">${edges.map(([a,b])=>`<path d="M${nodes[a][0]} ${nodes[a][1]} ${nodes[b][0]} ${nodes[b][1]}"/>`).join('')}</g>
      <ellipse class="quantum-orbit" cx="300" cy="183" rx="237" ry="118" stroke="#9eb9cb" stroke-opacity=".4" fill="none" transform="rotate(-16 300 183)"/>
      ${nodes.map(([x,y],i)=>`<g class="quantum-node" style="--node-delay:${-i*.3}s"><circle cx="${x}" cy="${y}" r="${i===4||i===9?18:7}" fill="${i===4||i===9?'#FFE79F':'#466581'}" ${i===4||i===9?'':'stroke="#9cb6cc"'}/>${i===4||i===9?`<circle cx="${x}" cy="${y}" r="29" fill="none" stroke="#FFE79F" stroke-opacity=".3"/><text x="${x}" y="${y+4}" text-anchor="middle" fill="#263442" font-size="10">${i===4?'09':'10'}</text>`:''}</g>`).join('')}`;
  } else if (type === 'lidar') {
    const lines = [];
    for (let row = 0; row < 18; row++) {
      const points = [];
      for (let col = 0; col < 26; col++) {
        const x = 52 + col * 20 + row * 2.7;
        const hill = Math.exp(-((col-14)**2/30 + (row-9)**2/26))*95 + Math.exp(-((col-5)**2/19+(row-12)**2/18))*52;
        const y = 95 + row * 10 - hill + col * 1.7;
        points.push(`${x},${y}`);
        lines.push(`<circle cx="${x}" cy="${y}" r="1.4" fill="${col>10&&col<19?'#d5d99e':'#83aecb'}" opacity="${.35+row*.027}"/>`);
      }
      lines.push(`<polyline points="${points.join(' ')}" fill="none" stroke="#7daccb" stroke-opacity=".21"/>`);
    }
    drawing = `<path d="M57 300 297 342 570 296" fill="none" stroke="#7899b2" stroke-opacity=".3"/>${lines.join('')}<circle cx="327" cy="190" r="52" fill="none" stroke="#FFE79F" stroke-opacity=".35" stroke-dasharray="3 6"/><path d="M327 176v28m-14-14h28" stroke="#FFE79F" stroke-opacity=".8"/><g class="lidar-scan"><path d="M70 70h480" stroke="#FFE79F" stroke-width="1.5"/><path d="M70 74h480" stroke="#FFE79F" stroke-opacity=".15" stroke-width="8"/></g>`;
  } else if (type === 'research') {
    drawing = `<g transform="translate(108 57) rotate(-8 115 128)"><rect width="213" height="252" rx="5" fill="#172d41" stroke="#7a97af" stroke-opacity=".45"/><path d="M27 45h138M27 58h112M27 95h159M27 108h145M27 121h152M27 157h100M27 170h145M27 183h130" stroke="#9bb4c6" stroke-opacity=".45" stroke-width="3"/><rect x="27" y="210" width="60" height="6" rx="3" fill="#819cad"/></g><g transform="translate(274 84) rotate(7 108 120)"><rect width="213" height="252" rx="5" fill="#294256" stroke="#9eb5c7" stroke-opacity=".5"/><path d="M25 42h112M25 56h150" stroke="#cbd8df" stroke-width="3" stroke-opacity=".65"/><rect x="24" y="89" width="163" height="42" rx="3" fill="#FFE79F" fill-opacity=".13"/><path d="M34 104h130M34 117h112" stroke="#FFE79F" stroke-opacity=".85" stroke-width="2"/><path d="M25 164h145M25 178h154M25 192h121M25 218h70" stroke="#9fb7c7" stroke-opacity=".55" stroke-width="3"/></g><g class="research-star"><circle cx="302" cy="185" r="23" fill="#FFE79F"/><path d="M302 173v24m-12-12h24m-21-9 18 18m-18 0 18-18" stroke="#3d4b50" stroke-width="1.2"/></g>`;
  } else {
    drawing = `<g fill="none" stroke="#8da9bc"><circle cx="229" cy="183" r="105" opacity=".3"/><circle cx="229" cy="183" r="87" opacity=".5"/><circle cx="229" cy="183" r="70" opacity=".7"/><circle cx="229" cy="183" r="49" opacity=".9"/><circle cx="229" cy="183" r="26" opacity=".9"/><circle cx="434" cy="183" r="58" opacity=".3"/><circle cx="434" cy="183" r="40" opacity=".65"/></g><path class="energy-arc" d="M229 78a105 105 0 0 1 93 155" fill="none" stroke="#FFE79F" stroke-width="3"/><path d="M413 188h17v-21l25 28h-18v22" fill="none" stroke="#FFE79F" stroke-width="2" stroke-linejoin="round"/><path d="M271 283h102" stroke="#9ab2c4" stroke-opacity=".4"/><circle cx="298" cy="283" r="4" fill="#FFE79F"/><circle cx="325" cy="283" r="4" fill="#9ab2c4"/><circle cx="352" cy="283" r="4" fill="#9ab2c4"/>`;
  }
  return `<svg class="project-illustration" viewBox="0 0 620 380" fill="none" aria-hidden="true"><defs><radialGradient id="glow-${type}"><stop stop-color="#395570" stop-opacity=".5"/><stop offset="1" stop-color="#132333" stop-opacity="0"/></radialGradient></defs><rect width="620" height="380" fill="url(#glow-${type})"/>${drawing}</svg>`;
}
