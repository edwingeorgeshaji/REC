import { projectSlideshow } from './slideshow.mjs';
import { discoverButton } from './components.mjs';
import { projects } from '../content/projects.mjs';
import { layout, escape, external } from './layout.mjs';
import { arrow } from './icons.mjs';
import { projectVisual } from './visuals.mjs';

export function projectPage(project) {
  const index=projects.indexOf(project);
  const next=projects[(index+1)%projects.length];
  return layout({active:'projects',title:project.title,description:project.summary,path:`/projects/${project.slug}/`,content:`
    <article class="project-page wrap">
      <div class="project-breadcrumb"><a href="/projects/">${arrow('right')} All work</a><span class="eyebrow">Study ${String(index+1).padStart(2,'0')} / ${String(projects.length).padStart(2,'0')}</span></div>
      <header class="project-heading"><p class="eyebrow accent">${escape(project.category)}</p><h1>${escape(project.title)}</h1><p class="project-subtitle">${escape(project.fullTitle)}</p></header>
      <div class="project-overview"><p class="large-copy">${escape(project.summary)}</p><dl class="project-facts"><div><dt>My role</dt><dd>${escape(project.role)}</dd></div><div><dt>Status</dt><dd>${escape(project.status)}</dd></div><div><dt>Year</dt><dd>${escape(project.year || 'Not recorded yet')}</dd></div></dl></div>
      <div class="project-resources">${project.repository?discoverButton(project.repository,'View source code','target="_blank" rel="noopener noreferrer"'):''}${project.demo?discoverButton(project.demo,project.demoLabel||'Open demo','target="_blank" rel="noopener noreferrer"'):''}${project.document?discoverButton(project.document,'Read technical report','target="_blank" rel="noopener noreferrer"'):''}${!project.repository&&!project.demo?'<span class="pending">Repository / demo: not available yet.</span>':''}</div>
      ${project.images?.length?projectSlideshow(project,true):project.visual?`<figure class="detail-visual">${projectVisual(project.visual)}<figcaption class="eyebrow">Illustrative schematic · Not an application screenshot</figcaption></figure>`:''}
      <div class="project-body"><aside><p class="eyebrow">Built with</p><ul class="stack-list">${project.stack.map(t=>`<li>${escape(t)}</li>`).join('')}</ul>${project.teammates?.length?`<div class="project-team"><p class="eyebrow">Teammates</p><ul>${project.teammates.map(person=>`<li>${person.url?external(person.url,person.name):`<span>${escape(person.name)}</span>`}</li>`).join('')}</ul></div>`:''}</aside><div class="project-narrative">${project.sections.map((section,i)=>`<section><span class="eyebrow accent">Note ${String(i+1).padStart(2,'0')}</span><h2>${escape(section.title)}</h2>${section.body.map(p=>`<p>${escape(p)}</p>`).join('')}${section.metric?`<figure class="project-metric"><strong>${escape(section.metric.value)}</strong><figcaption>${escape(section.metric.label)}<small>${escape(section.metric.note)}</small></figcaption></figure>`:''}</section>`).join('')}</div></div>
      <a href="/projects/${next.slug}/" class="next-project"><span class="eyebrow">Next project</span><span>${escape(next.title)}</span>${arrow('right')}</a>
    </article>`});
}

export function notFoundPage() {
  return layout({title:'Page not found',path:'/404.html',noindex:true,content:`<section class="not-found wrap"><p class="eyebrow accent">404 / A missing page</p><h1>This page hasn’t<br>been written.</h1><p>The page may have moved. You can return to the portfolio below.</p><a class="button" href="/">Back to the portfolio ${arrow('right')}</a></section>`});
}
