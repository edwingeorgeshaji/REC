import { profile, experience } from '../content/profile.mjs';
import { projects } from '../content/projects.mjs';
import { escape as e, external, layout } from './layout.mjs';
import { icon } from './icons.mjs';
import { projectVisual } from './visuals.mjs';

const label = (n, text) => `<p class="section-label"><span>${n}</span>${text}</p>`;
const tags = (items) => `<ul class="tags">${items.map(t=>`<li>${e(t)}</li>`).join('')}</ul>`;

function projectCard(p, i) {
  return `<article class="project-card">
    <a class="project-art art-${p.visual}" href="/projects/${p.slug}/" aria-label="Explore ${e(p.title)}">
      <div class="art-topline"><span>${e(p.category)}</span><span>${String(i+1).padStart(2,'0')}</span></div>
      ${p.image ? `<img src="${e(p.image)}" alt="${e(p.imageAlt || p.title)}" loading="lazy" width="620" height="380">` : projectVisual(p.visual)}
      <div class="art-bottomline"><span>${p.image?'Project preview':'Concept illustration'}</span><span class="art-open">${icon('external')}</span></div>
    </a>
    <div class="project-meta"><span>${e(p.outcome)}</span>${p.year?`<span>${p.year}</span>`:''}</div>
    <h3><a href="/projects/${p.slug}/">${e(p.title)} ${icon('external')}</a></h3>
    <p class="project-summary">${e(p.summary)}</p>
    ${tags(p.stack.slice(0,4))}
  </article>`;
}

export function homePage() {
  const featured = projects.filter(p=>p.featured);
  const archive = projects.filter(p=>!p.featured);
  return layout({home:true,content:`
    <section class="hero" aria-label="Introduction">
      <div class="hero-visual"><img class="hero-image" src="/assets/blueberries.png" alt="" width="1672" height="941" fetchpriority="high" decoding="async"></div>
      <div class="hero-shade"></div><div class="hero-blend"></div>
      <h1 aria-label="Edwin George Shaji"><span class="name-line" aria-hidden="true"><span class="word-mask"><span class="hero-word" style="--word-order:0">Edwin</span></span></span> <span class="name-line" aria-hidden="true"><span class="word-mask"><span class="hero-word" style="--word-order:1">George</span></span> <span class="word-mask"><span class="hero-word" style="--word-order:2">Shaji</span></span></span></h1>
    </section>

    <section class="about section wrap" id="about" aria-labelledby="about-title">
      ${label('01','A little about me')}
      <div class="about-layout">
        <div class="about-heading"><h2 id="about-title">Curiosity is<br>where it <em>starts.</em></h2><p class="location">${icon('globe')}${e(profile.location)}</p>
        ${profile.portrait?`<img class="portrait" src="${e(profile.portrait)}" alt="Edwin George Shaji" width="420" height="480" loading="lazy">`:''}</div>
        <div class="about-copy">${profile.about.map(p=>`<p>${e(p)}</p>`).join('')}
          <a class="button button-outline" href="${profile.resume}" download>Download résumé ${icon('download')}</a>
          <div class="about-facts"><span>Class of <strong>2028</strong></span><span>Speaking <strong>English & Malayalam</strong></span></div>
        </div>
      </div>
      <div class="skills-grid">${profile.skills.map((group,i)=>`<div class="skill-group"><span class="skill-number">0${i+1}</span><h3>${e(group.name)}</h3>${tags(group.items)}</div>`).join('')}</div>
      <p class="learning-note"><span class="small-orbit" aria-hidden="true"></span>Currently exploring PennyLane and continuing to build my quantum computing practice.</p>
    </section>

    <section class="section wrap projects-section" id="projects" aria-labelledby="projects-title">
      ${label('02','Selected work')}
      <div class="section-heading"><h2 id="projects-title">Ideas, put<br>into <em>practice.</em></h2><p>From quantum algorithms to everyday problems.<br>A selection of things I’ve helped bring to life.</p></div>
      <div class="projects-grid">${featured.map(projectCard).join('')}</div>
      <details class="project-archive"><summary><span>More experiments & projects <span class="count">${archive.length}</span></span><span class="summary-action">Explore the archive ${icon('plus')}</span></summary>
        <div class="archive-list">${archive.map((p,i)=>`<a class="archive-row" href="/projects/${p.slug}/"><span class="archive-number">${String(i+5).padStart(2,'0')}</span><span><strong>${e(p.title)}</strong><span class="archive-description">${e(p.summary)}</span></span><span class="archive-category">${e(p.category)}</span>${icon('external')}</a>`).join('')}</div>
      </details>
    </section>

    <section class="section wrap" id="experience" aria-labelledby="experience-title">
      ${label('03','Experience & community')}
      <div class="section-heading"><h2 id="experience-title">Learning by doing.<br>Growing <em>together.</em></h2><p>Practical experience, student communities,<br>and the people behind the work.</p></div>
      <div class="experience-list">${experience.map((job,i)=>`<details class="experience-item" ${i===0?'open':''}><summary><span class="experience-kind">${e(job.kind)}</span><span class="experience-overview"><strong>${e(job.organisation)}</strong><span>${e(job.roles[0].title)}</span></span><span class="experience-date">${e(job.roles[0].date || 'Virtual Internship 6.0')}</span>${icon('plus')}</summary><div class="experience-body"><div class="role-history">${job.roles.map(r=>`<div><h4>${e(r.title)}</h4>${r.date?`<p>${e(r.date)}</p>`:''}</div>`).join('')}</div><div><p>${e(job.description)}</p>${job.highlights?`<ul class="event-list">${job.highlights.map(h=>`<li>${e(h)}</li>`).join('')}</ul>`:''}${tags(job.tags)}</div></div></details>`).join('')}</div>
    </section>

    <section class="section wrap education-section" id="education" aria-labelledby="education-title">
      ${label('04','Education')}
      <div class="education-layout"><h2 id="education-title">Building the<br><em>foundations.</em></h2><div class="education-list">${profile.education.map((ed,i)=>`<article class="education-item"><p class="eyebrow">${e(ed.date)}</p><h3>${e(ed.title)}</h3><p>${e(ed.school)}</p>${ed.highlight?`<div class="grade"><strong>${e(ed.highlight)}</strong><span>${e(ed.note)}</span></div>`:`<p class="school-detail">${e(ed.detail)}</p>`}</article>`).join('')}<div class="honours">${icon('certificate')}<span>Director’s Honours List <span>Semester 1</span></span></div></div></div>
    </section>

    <section class="section wrap" id="certifications" aria-labelledby="certifications-title">
      ${label('05','Continued learning')}
      <div class="section-heading"><h2 id="certifications-title">Always a <em>student.</em></h2><p>Learning beyond the classroom,<br>one new perspective at a time.</p></div>
      <div class="certificates-grid">${profile.certificates.filter(c=>c.published).map(c=>`<article class="certificate">${icon('certificate')}<p class="eyebrow">${e(c.type)}</p><h3>${e(c.title)}</h3>${c.issuer?`<p>${e(c.issuer)}</p>`:''}${c.url?external(c.url,'View credential'):''}</article>`).join('')}</div>
    </section>

    <section class="section wrap contact-section" id="contact" aria-labelledby="contact-title">
      ${label('06','Get in touch')}
      <div class="contact-layout"><div class="contact-copy"><h2 id="contact-title">Good things begin<br>with a <em>hello.</em></h2><p>Have a project in mind, an interesting opportunity,<br>or a question? I’d love to hear from you.</p><a class="email-link" href="mailto:${profile.email}">${profile.email}${icon('external')}</a><div class="social-links">${external(profile.github,'GitHub')}${external(profile.linkedin,'LinkedIn')}${external(profile.gravatar,'Gravatar')}</div></div>
      <form class="contact-form" action="https://formsubmit.co/${profile.email}" method="POST">
        <input type="hidden" name="_subject" value="Portfolio · A new message for Edwin"><input type="hidden" name="_template" value="table"><input type="hidden" name="_next" value="${profile.siteUrl}/thanks/">
        <div class="form-trap" aria-hidden="true"><label>Leave this field empty<input name="_honey" tabindex="-1" autocomplete="off"></label></div>
        <div class="form-row"><div class="field"><label for="contact-name">Your name</label><input id="contact-name" name="name" placeholder="Alex Morgan" autocomplete="name" required maxlength="100"></div><div class="field"><label for="contact-email">Email address</label><input id="contact-email" name="email" type="email" placeholder="alex@example.com" autocomplete="email" required maxlength="254"></div></div>
        <div class="field"><label for="contact-subject">What’s on your mind?</label><select id="contact-subject" name="topic"><option>A conversation</option><option>An internship opportunity</option><option>A part-time opportunity</option><option>A freelance project</option><option>A collaboration</option></select></div>
        <div class="field"><label for="contact-message">Your message</label><textarea id="contact-message" name="message" rows="4" placeholder="Tell me a little about it…" required minlength="10" maxlength="5000"></textarea></div>
        <div class="form-footer"><p>Sent securely via FormSubmit.</p><button class="button button-solid" type="submit">Send message ${icon('arrow')}</button></div>
      </form></div>
    </section>`});
}
