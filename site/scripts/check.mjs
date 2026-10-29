import { certificates } from '../src/templates/certificate.mjs';
import assert from 'node:assert/strict';
import { readFile, access, readdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { projects } from '../src/content/projects.mjs';

const root=fileURLToPath(new URL('../dist/',import.meta.url));
const pages=['index.html','projects/index.html','experience/index.html','certificates/index.html','about/index.html','toolkit/index.html',...projects.map(p=>`projects/${p.slug}/index.html`),'404.html'];
assert.equal(new Set(projects.map(p=>p.slug)).size,projects.length,'Project slugs must be unique');
const references=new Set(['index.html','404.html','sitemap.xml','robots.txt','_headers']);
for(const page of pages){
  const html=await readFile(path.join(root,page),'utf8');
  references.add(page);
  assert.equal((html.match(/<h1[ >]/g)||[]).length,1,`One primary heading: ${page}`);
  const ids=[...html.matchAll(/\bid="([^"]+)"/g)].map(m=>m[1]);
  assert.equal(ids.length,new Set(ids).size,`Unique IDs: ${page}`);
  assert.ok(!/undefined|\[object Object\]/i.test(html),`Resolved content: ${page}`);
  for(const match of html.matchAll(/(?:href|src)="(\/[^"?#]*)(?:[?#]([^"]*))?"/g)){
    const relative=match[1].slice(1);
    const target=!relative||relative.endsWith('/')?relative+'index.html':relative;
    await access(path.join(root,target));references.add(target);
    if(match[2]){
      const targetHtml=await readFile(path.join(root,target),'utf8');
      assert.ok(targetHtml.includes(`id="${match[2]}"`),`Anchor ${match[2]} exists`);
    }
  }
  for(const match of html.matchAll(/href="#([^"]+)"/g)) assert.ok(ids.includes(match[1]),`Local anchor ${match[1]} exists`);
  for(const match of html.matchAll(/srcset="([^"]+)"/g)){
    for(const candidate of match[1].split(',')){
      const asset=candidate.trim().split(/\s+/)[0].replace(/^\//,'');
      await access(path.join(root,asset));references.add(asset);
    }
  }
}
const css=await readFile(path.join(root,'styles.css'),'utf8');
for(const match of css.matchAll(/url\(['"]?(\/[^'"\)]+)['"]?\)/g)){await access(path.join(root,match[1]));references.add(match[1].slice(1));}
for(const file of ['app.js','navigation.js','motion.js','gallery.js','toolkit.js'])await access(path.join(root,file));
async function checkAssets(dir){for(const entry of await readdir(path.join(root,dir),{withFileTypes:true})){const name=`${dir}/${entry.name}`;if(entry.isDirectory())await checkAssets(name);else assert.ok(entry.name.endsWith('-OFL.txt')||references.has(name),`Asset is used: ${name}`);}}
for(const dir of ['assets','type'])await checkAssets(dir);
assert.ok(css.includes('prefers-reduced-motion:reduce'),'Reduced-motion override exists');
const home=await readFile(path.join(root,'index.html'),'utf8');
assert.ok(!home.includes('<form'),'Contact uses direct links');
assert.ok(!home.includes('• Guido •'),'Removed subtitle stays removed');
for(const page of pages){const html=await readFile(path.join(root,page),'utf8');assert.ok(!/data-hover-preview|hover-image|data-preview-toggle/.test(html),`No hover previews: ${page}`);if(page!=='index.html')assert.ok(!/class="site-header|class="site-footer|id="contact"/.test(html),`No home chrome on ${page}`);}
assert.ok(home.includes('Jalvair.otf')&&home.includes('Parceh.otf'),'Supplied fonts are preloaded');
console.log(`Passed: ${pages.length} pages, internal links, anchors, unique IDs, asset use and accessibility structure.`);

for(const c of certificates){await assert.rejects(access(path.join(root,`certificates/${c.slug}/index.html`)));assert.equal(home.includes(`/certificates/#${c.slug}`),!c.portrait,'Marquee includes only non-portrait certificates');}
