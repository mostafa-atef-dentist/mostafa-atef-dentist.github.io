const editor=document.querySelector('#content-editor');
const status=document.querySelector('#status');
const KEY='mostafa-portfolio-content-draft-v1';
let published;
function validate(){
 const content=JSON.parse(editor.value);
 for(const key of ['name','role','email','education','experience','cases','certificates'])if(!content[key])throw new Error(`Missing ${key}`);
 if(!Array.isArray(content.cases))throw new Error('Cases must be a list.');
 const ids=new Set();
 content.cases.forEach(c=>{
  if(!/^[a-z0-9-]+$/.test(c.id))throw new Error(`Invalid case id: ${c.id}`);
  if(ids.has(c.id))throw new Error(`Duplicate case id: ${c.id}`);
  ids.add(c.id);
  if(!c.title?.en||!c.title?.ar||!Array.isArray(c.views)||!c.views.length)throw new Error(`Case ${c.id} needs English/Arabic titles and image views.`);
 });
 return content;
}
function report(fn){try{fn();}catch(e){status.textContent='Could not save: '+e.message;}}
fetch('portfolio.json').then(r=>{if(!r.ok)throw new Error('Content unavailable');return r.json();}).then(d=>{
 published=d;
 let draft=null;try{draft=localStorage.getItem(KEY);}catch{}
 editor.value=draft||JSON.stringify(d,null,2);
 status.textContent=draft?'Local draft restored. Export and publish it to update the website.':'Published content loaded. Edit, validate, and export to prepare an update.';
}).catch(e=>status.textContent=e.message);
document.querySelector('#save-draft').addEventListener('click',()=>report(()=>{const d=validate();localStorage.setItem(KEY,JSON.stringify(d,null,2));status.textContent='Draft saved in this browser only. The live website has not changed.';}));
document.querySelector('#export-content').addEventListener('click',()=>report(()=>{
 const d=validate();const blob=new Blob([JSON.stringify(d,null,2)+'\n'],{type:'application/json'});const url=URL.createObjectURL(blob);
 const a=document.createElement('a');a.href=url;a.download='portfolio.json';a.click();setTimeout(()=>URL.revokeObjectURL(url),2000);
 status.textContent='Content exported. Replace content/portfolio.json in the repository and publish to update the website. Put any new image files in assets/.';
}));
document.querySelector('#reset-content').addEventListener('click',()=>{if(!published)return;editor.value=JSON.stringify(published,null,2);try{localStorage.removeItem(KEY);}catch{}status.textContent='Published content reloaded. Local draft cleared.';});
document.querySelector('#import-file').addEventListener('change',async e=>{
 const f=e.target.files[0];if(!f)return;
 try{const text=await f.text();JSON.parse(text);editor.value=text;validate();status.textContent='Content imported into the editor. Export to prepare the final content file.';}catch(error){status.textContent='Import error: '+error.message;}
});
