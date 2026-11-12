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
  for(const image of html.matchAll(/<meta (?:name|property)="(?:twitter:image|og:image)" content="([^"]+)"/g))references.add(new URL(image[1]).pathname.slice(1));
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

// Audit generated metadata, not only template inputs.
const origin='https://edwingeorgeshaji.com';
const titles=new Set(),descriptions=new Set(),canonicalUrls=[];
for(const page of pages){
 const html=await readFile(path.join(root,page),'utf8');
 const title=html.match(/<title>(.*?)<\/title>/)?.[1];
 const meta=name=>html.match(new RegExp(`<meta (?:name|property)="${name}" content="([^"]*)"`))?.[1];
 assert.ok(title&&!titles.has(title),`Unique title: ${page}`);titles.add(title);
 const description=meta('description');
 assert.ok(description&&!descriptions.has(description),`Unique description: ${page}`);descriptions.add(description);
 const url=origin+'/'+page.replace(/index\.html$/,'');
 const canonicals=[...html.matchAll(/<link rel="canonical" href="([^"]+)"/g)];
 if(page==='404.html'){assert.equal(meta('robots'),'noindex');assert.equal(canonicals.length,0);}
 else{assert.ok(!/noindex/i.test(html));assert.equal(canonicals.length,1);assert.equal(canonicals[0][1],url);canonicalUrls.push(url);}
 assert.equal(meta('og:url'),url);
 assert.equal(meta('og:title'),page==='index.html'?'Edwin':title);
 assert.equal(meta('twitter:title'),page==='index.html'?'Edwin':title);
 assert.equal(meta('og:description'),page==='index.html'?'Edwin George Shaji - Computer Science Student':description);
 assert.equal(meta('twitter:description'),page==='index.html'?'Edwin George Shaji - Computer Science Student':'Edwin George Shaji - R.E.C');
 assert.equal(meta('twitter:image'),`${origin}/assets/hero-social.png`);
 assert.equal(meta('og:image'),meta('twitter:image'));
 for(const key of ['og:image:alt','twitter:image:alt'])assert.equal(meta(key),'Edwin George Shaji’s portfolio hero with his name and navigation over lilies');
 assert.equal(meta('twitter:card'),'summary_large_image');
 for(const key of ['og:image','twitter:image']){const image=new URL(meta(key));assert.equal(image.origin,origin);await access(path.join(root,image.pathname));references.add(image.pathname.slice(1));}
 const schema=JSON.parse(html.match(/<script type="application\/ld\+json">(.*?)<\/script>/s)[1]);
 assert.equal(schema['@context'],'https://schema.org');
 const pageSchema=schema['@graph'].find(item=>['WebPage','ProfilePage'].includes(item['@type']));
 assert.equal(pageSchema.url,url);
 const person=schema['@graph'].find(item=>item['@type']==='Person');
 assert.ok(person.name&&person.sameAs.includes('https://github.com/edwingeorgeshaji')&&person.sameAs.includes('https://www.linkedin.com/in/edwingeorgeshaji'));
 assert.equal(person.image,`${origin}/assets/${page==='index.html'?'edwin-george-shaji-1.webp':'edwin-george-shaji-2.webp'}`);
 const website=schema['@graph'].find(item=>item['@type']==='WebSite');
 assert.equal(website.name,'Edwin George Shaji');assert.equal(website.alternateName,'edwingeorgeshaji.com');
 assert.equal(meta('og:site_name'),'Edwin George Shaji');
 if(page==='index.html'){assert.equal(pageSchema.primaryImageOfPage.contentUrl,`${origin}/assets/edwin-george-shaji-1.webp`);assert.equal(pageSchema.mainEntity['@id'],person['@id']);}
 if(page==='about/index.html'){assert.equal(pageSchema['@type'],'ProfilePage');assert.equal(pageSchema.mainEntity['@id'],person['@id']);}else assert.equal(pageSchema['@type'],'WebPage');
 assert.ok(!html.includes('cozy-larch-9109'),'No previous production origin');
}
const sitemap=await readFile(path.join(root,'sitemap.xml'),'utf8');
const locations=[...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map(m=>m[1]);
assert.equal(locations.length,new Set(locations).size,'Unique sitemap entries');
assert.deepEqual(locations.sort(),canonicalUrls.sort(),'Sitemap covers exactly the indexable pages');
const robots=await readFile(path.join(root,'robots.txt'),'utf8');
assert.ok(robots.startsWith('User-agent: *\nAllow: /\n'));
assert.ok(robots.includes('User-agent: Googlebot-Image\nDisallow: /\n'));
const photoPaths=['/assets/edwin-george-shaji-1-480.webp','/assets/edwin-george-shaji-1.webp'];
const imageRules=robots.split('User-agent: Googlebot-Image')[1];
assert.deepEqual([...imageRules.matchAll(/^Allow: (.+)$/gm)].map(m=>m[1]),[...photoPaths,'/favicon.svg']);
for(const photo of photoPaths)await access(path.join(root,photo));
assert.ok(home.includes('<meta name="robots" content="max-image-preview:standard">'));
assert.ok(home.includes('<meta name="description" content="Personal portfolio showcasing a collection of projects, creative experiments, technical explorations and achievements, bringing together ideas, innovation and technology in one place.">'));
for(const page of pages){const html=await readFile(path.join(root,page),'utf8');assert.ok(!html.includes('noimageindex'));if(page!=='index.html')assert.ok(!html.includes('max-image-preview:standard'));}
for(const page of ['index.html','about/index.html']){const html=await readFile(path.join(root,page),'utf8');const photos=[...html.matchAll(/<img[^>]*src="\/assets\/edwin-[^>]+>/g)];assert.ok(photos.length);for(const [img] of photos)assert.match(img,/alt="Edwin George Shaji[^"]+"/);}
assert.ok(robots.includes(`Sitemap: ${origin}/sitemap.xml`));
console.log(`SEO passed: ${canonicalUrls.length} canonical URLs, sitemap coverage, unique metadata, social cards and JSON-LD.`);

const favicon=await readFile(path.join(root,'favicon.svg'),'utf8');
assert.match(favicon,/width="64" height="64" viewBox="0 0 64 64"/);
assert.ok(home.includes('<link rel="icon" href="/favicon.svg" type="image/svg+xml" sizes="any">'));
