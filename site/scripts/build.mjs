import { mkdir, cp, writeFile, access, readdir, unlink } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { homePage } from '../src/templates/home.mjs';
import { projectPage, simplePage } from '../src/templates/project.mjs';
import { profile } from '../src/content/profile.mjs';
import { projects } from '../src/content/projects.mjs';

const root = fileURLToPath(new URL('../', import.meta.url));
const dist = path.join(root, 'dist');
await mkdir(dist, { recursive: true });
await cp(path.join(root, 'public'), dist, { recursive: true });
for (const name of ['styles.css', 'motion.css', 'app.js', 'motion.js']) await cp(path.join(root, 'src', name), path.join(dist, name));
if (profile.heroFont) await access(path.join(root, 'public', profile.heroFont));
await writeFile(path.join(dist, 'index.html'), homePage());
for (const project of projects) {
  const directory = path.join(dist, 'projects', project.slug);
  await mkdir(directory, { recursive: true });
  await writeFile(path.join(directory, 'index.html'), projectPage(project));
}
// Delete only old generated project HTML, never user content or whole directories.
const allowedSlugs = new Set(projects.map(p => p.slug));
for (const item of await readdir(path.join(dist, 'projects'), { withFileTypes: true })) {
  if (!item.isDirectory() || allowedSlugs.has(item.name)) continue;
  const oldPage = path.join(dist, 'projects', item.name, 'index.html');
  try { await unlink(oldPage); } catch (error) { if (error.code !== 'ENOENT') throw error; }
}
await mkdir(path.join(dist, 'thanks'), { recursive: true });
await writeFile(path.join(dist, 'thanks', 'index.html'), simplePage('thanks'));
await writeFile(path.join(dist, '404.html'), simplePage('404'));
const urls = ['/', ...projects.map(p=>`/projects/${p.slug}/`)];
await writeFile(path.join(dist, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls.map(url=>`<url><loc>${profile.siteUrl}${url}</loc></url>`).join('')}</urlset>`);
await writeFile(path.join(dist, 'robots.txt'), `User-agent: *\nAllow: /\nSitemap: ${profile.siteUrl}/sitemap.xml\n`);
await writeFile(path.join(dist, '_headers'), '/*\n  X-Content-Type-Options: nosniff\n  Referrer-Policy: strict-origin-when-cross-origin\n  X-Frame-Options: SAMEORIGIN\n  Permissions-Policy: camera=(), microphone=(), geolocation=()\n');
console.log(`Built homepage, ${projects.length} project pages, thank-you and 404 pages → dist/`);
