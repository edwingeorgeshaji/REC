import http from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

await import('./build.mjs');
const root = path.resolve(fileURLToPath(new URL('../dist/', import.meta.url)));
const types = { '.html':'text/html; charset=utf-8', '.css':'text/css; charset=utf-8', '.js':'application/javascript; charset=utf-8', '.png':'image/png', '.svg':'image/svg+xml', '.webp':'image/webp', '.jpg':'image/jpeg', '.pdf':'application/pdf', '.woff':'font/woff', '.woff2':'font/woff2', '.ttf':'font/ttf', '.otf':'font/otf', '.xml':'application/xml', '.txt':'text/plain' };
const server = http.createServer(async (req,res) => {
  try {
    const pathname = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
    let file = path.resolve(root, '.' + pathname);
    if (file !== root && !file.startsWith(root + path.sep)) { res.writeHead(403); res.end(); return; }
    const info = await stat(file);
    if (info.isDirectory()) {
      if (!pathname.endsWith('/')) { res.writeHead(308, {Location:pathname+'/'}); res.end(); return; }
      file = path.join(file, 'index.html');
    }
    const data = await readFile(file);
    res.writeHead(200, { 'Content-Type':types[path.extname(file)] || 'application/octet-stream', 'Cache-Control':'no-store', 'X-Content-Type-Options':'nosniff' });
    res.end(data);
  } catch {
    res.writeHead(404, {'Content-Type':'text/html; charset=utf-8'});
    res.end(await readFile(path.join(root,'404.html')));
  }
});
server.listen(Number(process.env.PORT || 4173), '127.0.0.1', () => console.log(`Local: http://127.0.0.1:${server.address().port}`));
