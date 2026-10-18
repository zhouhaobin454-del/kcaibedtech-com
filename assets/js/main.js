(()=>{const body=document.body,toggle=document.querySelector('[data-menu-toggle]'),nav=document.querySelector('[data-nav-links]');if(toggle&&nav){const close=()=>{nav.classList.remove('open');toggle.setAttribute('aria-expanded','false');body.classList.remove('menu-open')};toggle.addEventListener('click',()=>{const open=nav.classList.toggle('open');toggle.setAttribute('aria-expanded',String(open));body.classList.toggle('menu-open',open)});nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',close));document.addEventListener('keydown',e=>{if(e.key==='Escape')close()})}
document.querySelectorAll('.product-gallery').forEach(g=>{const imgs=[...g.querySelectorAll('[data-gallery-image]')],thumbs=[...g.querySelectorAll('[data-gallery-thumb]')],prev=g.querySelector('[data-gallery-prev]'),next=g.querySelector('[data-gallery-next]');let i=0;const show=n=>{i=(n+imgs.length)%imgs.length;imgs.forEach((x,j)=>x.classList.toggle('active',j===i));thumbs.forEach((x,j)=>{x.classList.toggle('active',j===i);x.setAttribute('aria-current',j===i?'true':'false')});thumbs[i]?.scrollIntoView({block:'nearest',inline:'nearest',behavior:'smooth'})};thumbs.forEach((t,n)=>t.addEventListener('click',()=>show(n)));prev?.addEventListener('click',()=>show(i-1));next?.addEventListener('click',()=>show(i+1));g.addEventListener('keydown',e=>{if(e.key==='ArrowLeft')show(i-1);if(e.key==='ArrowRight')show(i+1)});show(0)});
const filters=[...document.querySelectorAll('[data-filter]')],cards=[...document.querySelectorAll('[data-news-category]')];filters.forEach(b=>b.addEventListener('click',()=>{filters.forEach(x=>x.classList.remove('active'));b.classList.add('active');const f=b.dataset.filter;cards.forEach(c=>c.hidden=f!=='all'&&c.dataset.newsCategory!==f)}));
const float=document.querySelector('[data-floating-contact]'),floatToggle=document.querySelector('[data-contact-toggle]');floatToggle?.addEventListener('click',()=>{const open=float.classList.toggle('open');floatToggle.setAttribute('aria-expanded',String(open))});
const heroVideo=document.querySelector('.hero-video');if(heroVideo&&matchMedia('(prefers-reduced-motion: reduce)').matches){heroVideo.removeAttribute('autoplay');heroVideo.removeAttribute('loop');heroVideo.pause()}
})();

// Product filter chips
(function(){
  var filters=document.querySelectorAll('[data-filter]');
  if(!filters.length)return;
  var params=new URLSearchParams(location.search);
  var urlCat=params.get('category')||'all';
  filters.forEach(function(b){b.classList.toggle('active',b.dataset.filter===urlCat);});
  if(urlCat!=='all')document.querySelectorAll('#catalog .product-list-card').forEach(function(c){c.hidden=c.dataset.category!==urlCat;});
  filters.forEach(function(btn){btn.addEventListener('click',function(){
    filters.forEach(function(b){b.classList.remove('active');});btn.classList.add('active');
    var cat=btn.dataset.filter;
    document.querySelectorAll('#catalog .product-list-card').forEach(function(c){c.hidden=cat!=='all'&&c.dataset.category!==cat;});
    var u=new URL(location.href);cat==='all'?u.searchParams.delete('category'):u.searchParams.set('category',cat);history.replaceState(null,'',u.toString());
  });});
})();
// Mailto form
(function(){
  var form=document.getElementById('inquiry-form');
  if(!form)return;
  var interest=sessionStorage.getItem('kc_interest');
  if(interest){var sel=form.elements.interest;if(sel)for(var i=0;i<sel.options.length;i++)if(sel.options[i].textContent.startsWith(interest)){sel.selectedIndex=i;break;}sessionStorage.removeItem('kc_interest');}
  form.addEventListener('submit',function(e){
    e.preventDefault();if(!form.reportValidity())return;
    if(form.elements.website&&form.elements.website.value)return;
    var d=new FormData(form);
    var v={name:d.get('name')||'',email:d.get('email')||'',company:d.get('company')||'—',phone:d.get('phone')||'—',interest:d.get('interest')||'Not specified',qty:d.get('quantity')||'—',msg:d.get('message')||''};
    var pp=v.interest!=='Not specified'?' — '+v.interest:'';
    var sub=encodeURIComponent('Website inquiry'+pp);
    var body=encodeURIComponent('Name: '+v.name+'
Email: '+v.email+'
Company: '+v.company+'
Phone: '+v.phone+'
Product interest: '+v.interest+'
Estimated quantity: '+v.qty+'

Message:
'+v.msg);
    var st=form.querySelector('.form-status');
    if(st){st.style.display='block';st.innerHTML='Opening your email client… or <a href="'+B_WA+'">message us on WhatsApp</a>.';}
    window.location.href='mailto:zhouhaobin454@gmail.com?subject='+sub+'&body='+body;
  });
  document.querySelectorAll('[data-interest]').forEach(function(el){el.addEventListener('click',function(){sessionStorage.setItem('kc_interest',el.dataset.interest);});});
  var B_WA='https://wa.me/8613925576475';
})();
// Scrolled header blur
(function(){var hdr=document.querySelector('[data-site-header]');if(!hdr)return;window.addEventListener('scroll',function(){hdr.classList.toggle('scrolled',window.scrollY>10);},{passive:true});})();
// Scroll reveal
(function(){var els=document.querySelectorAll('.product-list-card,.blog-card,.category-card,.section-head,.feature-card,.custom-card,.about-stat');if(!els.length||!window.IntersectionObserver)return;var obs=new IntersectionObserver(function(entries){entries.forEach(function(e){if(e.isIntersecting){e.target.classList.add('revealed');obs.unobserve(e.target);}});},{threshold:0.12,rootMargin:'0px 0px -40px 0px'});els.forEach(function(el){el.classList.add('reveal-ready');obs.observe(el);});})();
// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(function(a){a.addEventListener('click',function(e){var id=a.getAttribute('href');if(id.length<2)return;var t=document.querySelector(id);if(t){e.preventDefault();t.scrollIntoView({behavior:'smooth'});}});});
// Image load shimmer removal
document.querySelectorAll('img').forEach(function(img){if(img.complete)img.classList.add('loaded');else img.addEventListener('load',function(){img.classList.add('loaded');});});
// Back to top
(function(){var b=document.querySelector('[data-back-top]');if(!b)return;window.addEventListener('scroll',function(){b.classList.toggle('visible',window.scrollY>400);},{passive:true});b.addEventListener('click',function(){window.scrollTo({top:0,behavior:'smooth'});});})();
// Mobile nav-open sync (works alongside kfyJs open class)
(function(){var nav=document.querySelector('[data-nav-links]');var btn=document.querySelector('[data-menu-toggle]');if(!btn||!nav)return;btn.addEventListener('click',function(){nav.classList.toggle('nav-open');});})();
