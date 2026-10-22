import { profile } from '../content/profile.mjs';
import { icon } from './icons.mjs';

export const escape = (value = '') => String(value).replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char]));
export const external = (url, label, className = 'text-link') => `<a class="${className}" href="${escape(url)}" target="_blank" rel="noopener noreferrer">${escape(label)}${icon('external')}<span class="sr-only"> (opens in a new tab)</span></a>`;

const links = [['about','About'],['projects','Projects'],['experience','Experience'],['education','Education'],['certifications','Certificates'],['contact','Contact']];

export function layout({ title = profile.name, description = profile.description, path = '/', content, home = false, noindex = false }) {
  const url = `${profile.siteUrl}${path}`;
  const schema = JSON.stringify({ '@context': 'https://schema.org', '@type': 'Person', name: profile.name, url: profile.siteUrl, sameAs: [profile.github, profile.linkedin], knowsLanguage: profile.languages, affiliation: { '@type': 'CollegeOrUniversity', name: 'Amal Jyothi College of Engineering' } }).replace(/</g, '\\u003c');
  return `<!doctype html>
<html lang="en" data-theme="dark">
<head>
  <meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${escape(title === profile.name ? `${profile.name} — Software, AI & Quantum` : `${title} — ${profile.name}`)}</title>
  <meta name="description" content="${escape(description)}"><meta name="theme-color" content="#0c1724">
  ${noindex ? '<meta name="robots" content="noindex">' : `<link rel="canonical" href="${escape(url)}">`}
  <meta property="og:type" content="website"><meta property="og:title" content="${escape(title)}">
  <meta property="og:description" content="${escape(description)}"><meta property="og:url" content="${escape(url)}">
  <meta property="og:image" content="${profile.siteUrl}/assets/blueberries.png"><meta name="twitter:card" content="summary_large_image">
  <link rel="icon" href="/favicon.svg" type="image/svg+xml">
  <link rel="stylesheet" href="/fonts/fonts.css"><link rel="stylesheet" href="/styles.css"><link rel="stylesheet" href="/motion.css">
  ${profile.heroFont ? `<style>@font-face{font-family:Parceh;src:url('${escape(profile.heroFont)}');font-style:normal;font-weight:400;font-display:swap}</style><link rel="preload" href="${escape(profile.heroFont)}" as="font" crossorigin>` : ''}
  ${home ? '<link rel="preload" href="/assets/blueberries.png" as="image" fetchpriority="high">' : ''}
  <script>try{const t=localStorage.getItem('edwin-theme');if(t==='light'||t==='dark')document.documentElement.dataset.theme=t}catch{}document.querySelector('meta[name="theme-color"]').content=document.documentElement.dataset.theme==='light'?'#e6edf3':'#0c1724';</script>
  <script type="application/ld+json">${schema}</script>
  <script src="/app.js" type="module"></script>
</head>
<body class="${home ? 'home-page' : 'inner-page'}">
  <a class="skip-link" href="#main">Skip to content</a>
  <header class="site-header" data-header>
    <nav class="navigation" aria-label="Main navigation">
      <button class="menu-toggle" type="button" aria-expanded="false" aria-controls="navigation-links">Explore ${icon('menu')}</button>
      <div class="navigation-links" id="navigation-links"><span class="nav-indicator" aria-hidden="true"></span>${links.map(([id,label])=>`<a href="${home?'':'/'}#${id}" data-section="${id}">${label}</a>`).join('')}</div>
    </nav>
  </header>
  <button class="theme-toggle" type="button" aria-label="Switch to light theme" title="Switch to light theme" data-theme-toggle>${icon('sun','sun-icon')}${icon('moon','moon-icon')}</button>
  <main id="main">${content}</main>
  <footer class="footer wrap">
    <a class="footer-name" href="/">Edwin George Shaji<span>A little curiosity. A lot to build.</span></a>
    <div class="footer-bottom"><span>© ${new Date().getUTCFullYear()} Edwin George Shaji</span><a href="${home?'#main':'/'}">${home?'Back to top':'Back to home'} ${icon('arrow')}</a><span>Made with care, in Calicut.</span></div>
  </footer>
</body></html>`;
}
