import assert from 'node:assert/strict';
import { readFile, access } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { projects } from '../src/content/projects.mjs';
import { profile } from '../src/content/profile.mjs';

const root = fileURLToPath(new URL('../dist/', import.meta.url));
assert.equal(new Set(projects.map(p => p.slug)).size, projects.length, 'Project slugs must be unique');
for (const p of projects) assert.match(p.slug, /^[a-z0-9]+(?:-[a-z0-9]+)*$/);
for (const page of ['index.html', ...projects.map(p => `projects/${p.slug}/index.html`), 'thanks/index.html','404.html']) {
  const html = await readFile(path.join(root,page),'utf8');
  assert.equal((html.match(/<h1[ >]/g)||[]).length,1,`One primary heading: ${page}`);
  const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map(m=>m[1]);
  assert.equal(ids.length,new Set(ids).size,`Unique IDs: ${page}`);
  assert.ok(!/undefined|\[object Object\]|TODO|to be confirmed/i.test(html),`No unresolved content: ${page}`);
  for (const match of html.matchAll(/(?:href|src)="(\/[^"?#]*)(?:[?#][^"]*)?"/g)) {
    const target=match[1];
    await access(path.join(root, target.endsWith('/') ? target+'index.html' : target));
  }
}
const homepage=await readFile(path.join(root,'index.html'),'utf8');
assert.ok(homepage.includes(`action="https://formsubmit.co/${profile.email}"`));
console.log(`Content integrity and internal resources checked across ${projects.length+3} pages.`);
