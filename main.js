// Infocus Group — Shared JS
(function(){
  // Mobile nav toggle
  const btn = document.getElementById('navToggle');
  const menu = document.getElementById('mobileMenu');
  if(btn && menu){
    btn.addEventListener('click', function(){
      btn.classList.toggle('open');
      menu.classList.toggle('open');
    });
    menu.querySelectorAll('a').forEach(function(a){
      a.addEventListener('click',function(){ btn.classList.remove('open'); menu.classList.remove('open'); });
    });
  }

  // Accordion
  document.querySelectorAll('.accordion-trigger').forEach(function(trigger){
    trigger.addEventListener('click', function(){
      const item = this.closest('.accordion-item');
      item.classList.toggle('open');
    });
  });

  // Scroll reveal — simple fade-up on section-header and key cards
  if('IntersectionObserver' in window){
    const els = document.querySelectorAll('[data-reveal]');
    const obs = new IntersectionObserver(function(entries){
      entries.forEach(function(e){
        if(e.isIntersecting){ e.target.classList.add('revealed'); obs.unobserve(e.target); }
      });
    },{threshold:0.12});
    els.forEach(function(el){ obs.observe(el); });
  } else {
    document.querySelectorAll('[data-reveal]').forEach(function(el){ el.classList.add('revealed'); });
  }

  // Netlify form enhancement — show thank you on submit
  const form = document.getElementById('contactForm');
  if(form){
    form.addEventListener('submit', function(e){
      // Netlify handles submission; we just show a thank-you
      // If not using Netlify, remove the setTimeout
      const btn = form.querySelector('.form-submit');
      if(btn){ btn.textContent = 'Sending…'; btn.disabled = true; }
    });
  }
})();
