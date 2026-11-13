import { mkdir, cp, writeFile, rm } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { homePage } from '../src/templates/home.mjs';
import { projectPage, notFoundPage } from '../src/templates/project.mjs';
import { projectsPage, experiencePage, certificatesPage, aboutPage, toolkitPage } from '../src/templates/collections.mjs';
import { placeholderAssets } from '../src/templates/placeholders.mjs';
import { profile } from '../src/content/profile.mjs';
import { projects } from '../src/content/projects.mjs';

const root=fileURLToPath(new URL('../',import.meta.url));
const dist=path.resolve(root,'dist');
if (path.dirname(dist)!==path.resolve(root) || path.basename(dist)!=='dist') throw new Error('Invalid build target');
await rm(dist,{recursive:true,force:true});
await mkdir(dist,{recursive:true});
await cp(path.join(root,'public'),dist,{recursive:true});
for(const name of ['styles.css','app.js','navigation.js','motion.js','gallery.js','toolkit.js','slideshow.js','project-browser.js','project-hover.js','error-story.js']) await cp(path.join(root,'src',name),path.join(dist,name));
await mkdir(path.join(dist,'assets/placeholders'),{recursive:true});
for(const a of placeholderAssets().filter(a=>a.name.startsWith('certificate-')&&!a.supplied))await writeFile(path.join(dist,'assets/placeholders',a.name),a.content);
await writeFile(path.join(dist,'index.html'),homePage());
for(const [name,render] of Object.entries({projects:projectsPage,experience:experiencePage,certificates:certificatesPage,about:aboutPage,toolkit:toolkitPage})){
  await mkdir(path.join(dist,name),{recursive:true});
  await writeFile(path.join(dist,name,'index.html'),render());
}
for(const project of projects) {
  const directory=path.join(dist,'projects',project.slug);
  await mkdir(directory,{recursive:true});
  await writeFile(path.join(directory,'index.html'),projectPage(project));
}
await writeFile(path.join(dist,'404.html'),notFoundPage());
const urls=['/','/projects/','/experience/','/certificates/','/about/','/toolkit/',...projects.map(p=>`/projects/${p.slug}/`)];
await writeFile(path.join(dist,'sitemap.xml'),`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls.map(url=>`<url><loc>${profile.siteUrl}${url}</loc></url>`).join('')}</urlset>`);
await writeFile(path.join(dist,'robots.txt'),`User-agent: *\nAllow: /\n\n# Only the main About photograph (both sizes) and favicon are crawlable by Googlebot-Image.\nUser-agent: Googlebot-Image\nDisallow: /\nAllow: /assets/edwin-george-shaji-1-480.webp\nAllow: /assets/edwin-george-shaji-1.webp\nAllow: /favicon.svg\nAllow: /favicon.png\nAllow: /favicon.ico\n\nSitemap: ${profile.siteUrl}/sitemap.xml\n`);
await writeFile(path.join(dist,'_headers'),'/*\n  X-Content-Type-Options: nosniff\n  Referrer-Policy: strict-origin-when-cross-origin\n  X-Frame-Options: SAMEORIGIN\n  Permissions-Policy: camera=(), microphone=(), geolocation=()\n/resume.pdf\n  Content-Disposition: inline; filename="Resume - Edwin George Shaji.pdf"\n');
// Preserve previously shared photograph URLs after the descriptive rename.
await writeFile(path.join(dist,'_redirects'),'/assets/edwin-home-480.webp /assets/edwin-george-shaji-1-480.webp 301\n/assets/edwin-home-920.webp /assets/edwin-george-shaji-1.webp 301\n/assets/edwin-portrait.webp /assets/edwin-george-shaji-2.webp 301\n');
console.log(`Built home, 5 collections, ${projects.length} project pages and 404 → dist/`);
