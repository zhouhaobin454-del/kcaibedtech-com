(()=>{const body=document.body,toggle=document.querySelector('[data-menu-toggle]'),nav=document.querySelector('[data-nav-links]');if(toggle&&nav){const close=()=>{nav.classList.remove('open');toggle.setAttribute('aria-expanded','false');toggle.setAttribute('aria-label','Open navigation');body.classList.remove('menu-open')};toggle.addEventListener('click',()=>{const open=nav.classList.toggle('open');toggle.setAttribute('aria-expanded',String(open));toggle.setAttribute('aria-label',open?'Close navigation':'Open navigation');body.classList.toggle('menu-open',open)});nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',close));document.addEventListener('keydown',e=>{if(e.key==='Escape')close()})}
document.querySelectorAll('.product-gallery').forEach(g=>{const imgs=[...g.querySelectorAll('[data-gallery-image]')],thumbs=[...g.querySelectorAll('[data-gallery-thumb]')],prev=g.querySelector('[data-gallery-prev]'),next=g.querySelector('[data-gallery-next]');let i=0;const show=n=>{i=(n+imgs.length)%imgs.length;imgs.forEach((x,j)=>x.classList.toggle('active',j===i));thumbs.forEach((x,j)=>{x.classList.toggle('active',j===i);x.setAttribute('aria-current',j===i?'true':'false')});thumbs[i]?.scrollIntoView({block:'nearest',inline:'nearest',behavior:'smooth'})};thumbs.forEach((t,n)=>t.addEventListener('click',()=>show(n)));prev?.addEventListener('click',()=>show(i-1));next?.addEventListener('click',()=>show(i+1));g.addEventListener('keydown',e=>{if(e.key==='ArrowLeft')show(i-1);if(e.key==='ArrowRight')show(i+1)});show(0)});
const filters=[...document.querySelectorAll('[data-filter]')],cards=[...document.querySelectorAll('[data-news-category]')];filters.forEach(b=>b.addEventListener('click',()=>{filters.forEach(x=>x.classList.remove('active'));b.classList.add('active');const f=b.dataset.filter;cards.forEach(c=>c.hidden=f!=='all'&&c.dataset.newsCategory!==f)}));
const float=document.querySelector('[data-floating-contact]'),floatToggle=document.querySelector('[data-contact-toggle]');floatToggle?.addEventListener('click',()=>{const open=float.classList.toggle('open');floatToggle.setAttribute('aria-expanded',String(open));floatToggle.setAttribute('aria-label',open?'Close contact options':'Open contact options')});document.addEventListener('keydown',e=>{if(e.key==='Escape'&&float?.classList.contains('open')){float.classList.remove('open');floatToggle.setAttribute('aria-expanded','false');floatToggle.setAttribute('aria-label','Open contact options');floatToggle.focus()}});
const heroVideo=document.querySelector('.hero-video');if(heroVideo&&matchMedia('(prefers-reduced-motion: reduce)').matches){heroVideo.removeAttribute('autoplay');heroVideo.removeAttribute('loop');heroVideo.pause()}
})();
(()=>{const root=document.documentElement,header=document.querySelector('.site-header');
if(header){const sync=()=>header.classList.toggle('is-scrolled',window.scrollY>24);sync();window.addEventListener('scroll',sync,{passive:true})}
const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
if(!reduce&&'IntersectionObserver' in window){
const sel='.kc-section-head,.kc-product-card,.kc-scenario-card,.kc-capability-intro,.kc-capability,.kc-process-card,.kc-category-row,.kc-fit-card,.kc-news-card,.kc-pd-feature,.kc-pd-steps li,.kc-proof-card,.kc-video-feature,.kc-truth-grid,.kc-story-copy,.kc-story-media,.kc-photo-grid figure';
const below=[...document.querySelectorAll(sel)].filter(e=>e.getBoundingClientRect().top>window.innerHeight*.92);
const counts=new Map();
below.forEach(e=>{e.setAttribute('data-kc-reveal','');if(e.classList.contains('kc-story-media'))e.classList.add('kc-media-reveal');const n=counts.get(e.parentElement)||0;counts.set(e.parentElement,n+1);e.style.setProperty('--kc-delay',Math.min(n,4)*80+'ms')});
root.classList.add('kc-reveal-on');
const io=new IntersectionObserver(list=>list.forEach(en=>{if(en.isIntersecting){en.target.classList.add('is-in');io.unobserve(en.target)}}),{rootMargin:'0px 0px -8% 0px',threshold:.08});
below.forEach(e=>io.observe(e))}
const hero=document.querySelector('.kc-pd-hero'),cta=document.querySelector('.kc-pd-info .kc-btn-primary'),title=document.querySelector('.kc-pd-info h1');
if(hero&&cta&&title&&'IntersectionObserver' in window){
const bar=document.createElement('div');bar.className='kc-sticky-quote';bar.setAttribute('role','region');bar.setAttribute('aria-label','Quick inquiry');
const label=document.createElement('div'),model=document.createElement('strong'),tag=document.createElement('span');
model.textContent=title.textContent.trim().split(' ')[0];tag.textContent='B2B inquiry';label.append(model,tag);
const link=cta.cloneNode(true);link.removeAttribute('id');bar.append(label,link);document.body.append(bar);
const shown={hero:false,end:false};
const update=()=>{const on=!shown.hero&&!shown.end;bar.classList.toggle('is-visible',on);document.body.classList.toggle('has-quote-bar',on)};
new IntersectionObserver(l=>{shown.hero=l[0].isIntersecting||l[0].boundingClientRect.top>0;update()}).observe(hero);
const ends=[...document.querySelectorAll('.kc-cta,.kc-cta-band,.kc-footer-shell')],seen=new Set();
if(ends.length){const eo=new IntersectionObserver(l=>{l.forEach(en=>en.isIntersecting?seen.add(en.target):seen.delete(en.target));shown.end=seen.size>0;update()});ends.forEach(e=>eo.observe(e))}}
})();
