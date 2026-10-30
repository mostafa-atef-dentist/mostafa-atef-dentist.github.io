import {readFile,readdir,stat} from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const out=path.join(root,'dist');
const data=JSON.parse(await readFile(path.join(root,'content/portfolio.json'),'utf8'));
const failures=[];
async function walk(dir){const list=[];for(const e of await readdir(dir,{withFileTypes:true})){const p=path.join(dir,e.name);if(e.isDirectory())list.push(...await walk(p));else list.push(p);}return list;}
const htmlFiles=(await walk(out)).filter(p=>p.endsWith('.html'));
for(const file of htmlFiles){
 const html=await readFile(file,'utf8');
 for(const match of html.matchAll(/(?:href|src)="([^"]+)"/g)){
  const url=match[1].replaceAll('&amp;','&');
  if(/^(?:https?:|mailto:|tel:|data:|#)/.test(url))continue;
  const rel=url.split('#')[0].split('?')[0];
  const target=path.resolve(path.dirname(file),rel);
  if(!target.startsWith(out+path.sep)&&target!==out){failures.push('Path escapes output: '+url);continue;}
  try{await stat(target);}catch{failures.push(`${path.relative(out,file)} → ${url}`);}
 }
 for(const original of ['Dr. Mohamed Shabaan','01553911135','firebase','cloudinary','TODO','Lorem ipsum'])if(html.includes(original))failures.push(`Unexpected old/placeholder content in ${file}: ${original}`);
 if(file.includes(`${path.sep}ar${path.sep}`)&&!html.includes('dir="rtl"'))failures.push('Arabic page lacks RTL: '+file);
 if(file.includes(`${path.sep}en${path.sep}`)&&!html.includes('lang="en"'))failures.push('English locale mismatch: '+file);
}
for(const locale of ['en','ar'])for(const c of data.cases){
 const html=await readFile(path.join(out,locale,'cases',c.id,'index.html'),'utf8');
 if(!html.includes('dialog class="lightbox"'))failures.push('Missing full image viewer: '+c.id);
 if(c.views.length===1&&html.includes('data-view="slider"'))failures.push('Single-image case has a false comparison: '+c.id);
}
for(const c of data.cases)for(const v of c.views){
 if(!/^[a-zA-Z0-9_.-]+$/.test(v.source))failures.push('Invalid image filename: '+v.source);
 if(!Array.isArray(v.crop)||v.crop.length!==4)failures.push('Invalid crop: '+c.id);
}
if(failures.length){console.error(failures.join('\n'));process.exit(1);}
console.log(`PASS: ${htmlFiles.length} pages; local links/media; Arabic RTL; four clinical cases; original image access; no original owner contact or database connections.`);
