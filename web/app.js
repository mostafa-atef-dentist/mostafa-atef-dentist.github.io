const nav = document.querySelector('#main-nav');
const menu = document.querySelector('.menu-toggle');
menu?.addEventListener('click', () => {
 const expanded=menu.getAttribute('aria-expanded')==='true';
 menu.setAttribute('aria-expanded',String(!expanded));
 nav.classList.toggle('open',!expanded);
});
document.querySelectorAll('#main-nav a').forEach(a=>a.addEventListener('click',()=>{nav.classList.remove('open');menu?.setAttribute('aria-expanded','false');}));
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&nav?.classList.contains('open')){nav.classList.remove('open');menu?.setAttribute('aria-expanded','false');menu?.focus();}});
document.querySelector('[data-print]')?.addEventListener('click',()=>window.print());

const cards=[...document.querySelectorAll('[data-category]')];
const filters=[...document.querySelectorAll('[data-filter]')];
const search=document.querySelector('#case-search');
let category='all';
function filterCases(){
 const term=(search?.value||'').trim().toLowerCase();
 let visible=0;
 cards.forEach(card=>{
  const show=(category==='all'||card.dataset.category===category)&&card.dataset.search.includes(term);
  card.hidden=!show;
  if(show)visible++;
 });
 const empty=document.querySelector('#no-cases');
 if(empty)empty.hidden=visible>0;
}
filters.forEach(button=>button.addEventListener('click',()=>{
 category=button.dataset.filter;
 filters.forEach(b=>{const on=b===button;b.classList.toggle('active',on);b.setAttribute('aria-pressed',String(on));});
 filterCases();
}));
search?.addEventListener('input',filterCases);

const pair=document.querySelector('.pair-view');
const slider=document.querySelector('.slider-comparison');
const viewButtons=[...document.querySelectorAll('[data-view]')];
viewButtons.forEach(button=>button.addEventListener('click',()=>{
 const useSlider=button.dataset.view==='slider';
 pair.hidden=useSlider;
 slider.hidden=!useSlider;
 viewButtons.forEach(b=>{const on=b===button;b.classList.toggle('active',on);b.setAttribute('aria-pressed',String(on));});
}));
slider?.querySelector('input')?.addEventListener('input',e=>slider.style.setProperty('--reveal',e.target.value+'%'));

const dialog=document.querySelector('dialog.lightbox');
const slides=[...document.querySelectorAll('.lightbox-slide')];
const labels=JSON.parse(document.querySelector('#gallery-labels')?.textContent||'[]');
let index=0, previousFocus=null;
function showSlide(next){
 if(!slides.length)return;
 index=(next+slides.length)%slides.length;
 slides.forEach((slide,i)=>slide.hidden=i!==index);
 const caption=dialog.querySelector('.lightbox-caption');
 if(caption)caption.textContent=labels[index];
 const count=dialog.querySelector('.lightbox-count');
 if(count)count.textContent=`${index+1} / ${slides.length}`;
}
document.querySelectorAll('[data-zoom]').forEach(button=>button.addEventListener('click',()=>{
 previousFocus=document.activeElement;
 showSlide(Number(button.dataset.zoom));
 dialog.showModal();
 dialog.querySelector('.lightbox-close').focus();
}));
dialog?.querySelector('.lightbox-close').addEventListener('click',()=>dialog.close());
dialog?.querySelector('[data-lightbox-prev]')?.addEventListener('click',()=>showSlide(index-1));
dialog?.querySelector('[data-lightbox-next]')?.addEventListener('click',()=>showSlide(index+1));
dialog?.addEventListener('close',()=>previousFocus?.focus());
dialog?.addEventListener('keydown',event=>{
 if(event.key==='ArrowLeft'){event.preventDefault();showSlide(index-1);}
 if(event.key==='ArrowRight'){event.preventDefault();showSlide(index+1);}
});
let touchStart=null;
dialog?.addEventListener('touchstart',event=>{touchStart=event.changedTouches[0].clientX;},{passive:true});
dialog?.addEventListener('touchend',event=>{
 if(touchStart===null)return;
 const delta=event.changedTouches[0].clientX-touchStart;
 if(Math.abs(delta)>60)showSlide(index+(delta<0?1:-1));
 touchStart=null;
},{passive:true});
