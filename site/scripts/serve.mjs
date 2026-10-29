import http from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { watch } from 'node:fs';
import { spawnSync } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const projectRoot=fileURLToPath(new URL('../',import.meta.url));
const root=path.join(projectRoot,'dist');
const production=process.argv.includes('--production');
const build=()=>{
  const result=spawnSync(process.execPath,[path.join(projectRoot,'scripts/build.mjs')],{stdio:'inherit'});
  if(result.status!==0) throw new Error('Build failed');
};
if(!production) build();
await stat(path.join(root,'index.html'));
const types={'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'application/javascript; charset=utf-8','.mjs':'application/javascript; charset=utf-8','.svg':'image/svg+xml','.pdf':'application/pdf','.woff2':'font/woff2','.otf':'font/otf','.webp':'image/webp','.jpg':'image/jpeg','.xml':'application/xml','.txt':'text/plain; charset=utf-8'};
const server=http.createServer(async(req,res)=>{
  try{
    const pathname=decodeURIComponent(new URL(req.url,'http://localhost').pathname);
    let file=path.resolve(root,'.'+pathname);
    if(file!==root&&!file.startsWith(root+path.sep)){res.writeHead(403);res.end();return;}
    if((await stat(file)).isDirectory()){
      if(!pathname.endsWith('/')){res.writeHead(308,{Location:pathname+'/'});res.end();return;}
      file=path.join(file,'index.html');
    }
    const data=await readFile(file);
    if(pathname==='/resume.pdf')res.setHeader('Content-Disposition','inline; filename="Resume - Edwin George Shaji.pdf"');
    res.writeHead(200,{'Content-Type':types[path.extname(file)]||'application/octet-stream','Cache-Control':'no-store','X-Content-Type-Options':'nosniff'});
    res.end(req.method==='HEAD'?undefined:data);
  }catch{
    res.writeHead(404,{'Content-Type':'text/html; charset=utf-8'});
    res.end(await readFile(path.join(root,'404.html')));
  }
});
server.listen(Number(process.env.PORT||4173),'127.0.0.1',()=>console.log(`Local: http://127.0.0.1:${server.address().port}`));
if(!production){
  let timer;
  for(const directory of ['src','public'])watch(path.join(projectRoot,directory),{recursive:true},()=>{
    clearTimeout(timer);
    timer=setTimeout(()=>{try{build();}catch(error){console.error(error.message);}},160);
  });
  console.log('Watching src/ and public/. Refresh the browser after changes.');
}
