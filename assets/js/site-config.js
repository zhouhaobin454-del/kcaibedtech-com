(()=>{
  if(document.querySelector('link[href*="industrial.css"]'))return; // stylesheets are already linked statically; do not append duplicates after the theme layer
  const styles=['assets/css/nav.css','assets/css/phase-one.css','assets/css/phase-two.css'];
  styles.forEach(href=>{const link=document.createElement('link');link.rel='stylesheet';link.href=href;document.head.append(link)});
})();
