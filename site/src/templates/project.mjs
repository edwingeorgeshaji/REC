import { layout, escape as e, external } from './layout.mjs';
import { projects } from '../content/projects.mjs';
import { icon } from './icons.mjs';
import { projectVisual } from './visuals.mjs';

export function projectPage(project) {
  const p = project;
  const next = projects[(projects.indexOf(p)+1)%projects.length];
  return layout({title:p.title,description:p.summary,path:`/projects/${p.slug}/`,content:`
    <article class="project-detail wrap">
      <a href="/#projects" class="text-link back-link">${icon('arrow')} All projects</a>
      <header class="project-intro"><p class="eyebrow">${e(p.category)}${p.year?` <span> / </span> ${p.year}`:''}</p><h1>${e(p.title)}</h1><p class="project-subtitle">${e(p.fullTitle)}</p><p class="project-lead">${e(p.summary)}</p><div class="project-actions">${p.repository?external(p.repository,'View repository','button button-outline'):''}${p.demo?external(p.demo,p.demoLabel || 'View demo','button button-solid'):''}</div></header>
      ${p.image?`<figure class="detail-visual"><img src="${e(p.image)}" alt="${e(p.imageAlt || p.title)}"></figure>`:p.visual?`<figure class="detail-visual art-${p.visual}">${projectVisual(p.visual)}<figcaption>Concept illustration</figcaption></figure>`:''}
      <div class="project-content"><aside class="project-facts"><div><h2>My role</h2><p>${e(p.role)}</p></div><div><h2>Status</h2><p>${e(p.status)}</p></div>${p.date?`<div><h2>Timeline</h2><p>${e(p.date)}</p></div>`:''}<div><h2>Built with</h2><ul class="tags">${p.stack.map(t=>`<li>${e(t)}</li>`).join('')}</ul></div></aside>
      <div class="project-story">${p.sections.map((s,i)=>`<section><p class="section-label"><span>${String(i+1).padStart(2,'0')}</span>${e(s.title)}</p><h2>${e(s.title)}</h2>${s.body.map(b=>`<p>${e(b)}</p>`).join('')}${s.metric?`<div class="result-metric"><strong>${e(s.metric.value)}</strong><p>${e(s.metric.label)}</p><small>${e(s.metric.note)}</small></div>`:''}</section>`).join('')}</div></div>
      <a class="next-project" href="/projects/${next.slug}/"><span><span class="eyebrow">Next project</span><strong>${e(next.title)}</strong></span>${icon('arrow')}</a>
    </article>`});
}

export function simplePage(type) {
  const thanks = type==='thanks';
  return layout({title:thanks?'Thank you':'Page not found',path:thanks?'/thanks/':'/404.html',noindex:true,content:`<section class="simple-page wrap"><p class="eyebrow">${thanks?'A conversation begins':'404 · A little off the path'}</p><h1>${thanks?'Thank you for<br>reaching out.':'Nothing here.<br><em>Plenty to explore.</em>'}</h1><p>${thanks?'I appreciate you taking the time to write. You can also reach me directly by email.':'The page you’re looking for may have moved. Let’s get you back to the good stuff.'}</p><a href="/" class="button button-solid">Back to home ${icon('arrow')}</a>${thanks?'<a class="text-link" href="mailto:edwingeorgeshajipadiyanickal@gmail.com">Send an email</a>':''}</section>`});
}
