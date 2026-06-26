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

  // Dynamic glow coordinates tracking for Hero, Page Hero & CTA Band
  document.querySelectorAll('.hero, .page-hero, .cta-band').forEach(function(el) {
    el.addEventListener('mousemove', function(e) {
      const rect = el.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      el.style.setProperty('--glow-x', `${x}%`);
      el.style.setProperty('--glow-y', `${y}%`);
    });
  });

  // Mouse move effect for all card types
  document.querySelectorAll('.cap-card, .cap-detail, .tile-card, .info-card, .sector-card, .why-card, .engage-card, .platform-card, .change-col, .contact-sidebar-dark, .contact-sidebar-light').forEach(function(card) {
    card.addEventListener('mousemove', function(e) {
      const rect = card.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      card.style.setProperty('--mouse-x', `${x}%`);
      card.style.setProperty('--mouse-y', `${y}%`);
    });
  });

  // Nav scroll indicator class
  const nav = document.querySelector('nav');
  if (nav) {
    window.addEventListener('scroll', function() {
      if (window.scrollY > 20) {
        nav.classList.add('scrolled');
      } else {
        nav.classList.remove('scrolled');
      }
    }, { passive: true });
  }

  // Accordion
  document.querySelectorAll('.accordion-trigger').forEach(function(trigger){
    trigger.addEventListener('click', function(){
      const item = this.closest('.accordion-item');
      item.classList.toggle('open');
    });
  });

  // Scroll reveal — fade-up with staggered grid items
  if('IntersectionObserver' in window){
    const els = document.querySelectorAll('[data-reveal]');
    const obs = new IntersectionObserver(function(entries){
      entries.forEach(function(entry){
        if(entry.isIntersecting){
          const target = entry.target;
          target.classList.add('revealed');
          
          // Stagger children transition delays inside grids
          const children = target.children;
          if (children && children.length > 1) {
            Array.from(children).forEach(function(child, index) {
              child.style.transition = 'opacity .75s cubic-bezier(0.25, 0.8, 0.25, 1), transform .75s cubic-bezier(0.25, 0.8, 0.25, 1)';
              child.style.transitionDelay = `${index * 80}ms`;
              child.style.opacity = '1';
              child.style.transform = 'none';
            });
          }
          obs.unobserve(target);
        }
      });
    },{threshold:0.1});
    
    // Setup initial state for container-level reveal targets with children
    els.forEach(function(el){
      obs.observe(el);
      const children = el.children;
      if (children && children.length > 1) {
        Array.from(children).forEach(function(child) {
          child.style.opacity = '0';
          child.style.transform = 'translateY(24px)';
        });
      }
    });
  } else {
    document.querySelectorAll('[data-reveal]').forEach(function(el){ el.classList.add('revealed'); });
  }

  // Direct mailto form submission
  const form = document.getElementById('contactForm');
  if(form){
    form.addEventListener('submit', function(e){
      e.preventDefault();
      const btn = form.querySelector('.form-submit');
      if(btn){ btn.textContent = 'Opening Mail client…'; btn.disabled = true; }

      const name = (form.querySelector('#fname').value + ' ' + form.querySelector('#lname').value).trim();
      const email = form.querySelector('#email').value;
      const org = form.querySelector('#org').value;
      const role = form.querySelector('#role').value;
      const interest = form.querySelector('#sector').value;
      const message = form.querySelector('#message').value;

      const mailtoEmail = 'sahil@infocusgroup.au';
      const subject = `Infocus Group Inquiry from ${name} (${org})`;
      const body = `Hi Infocus Group Team,\n\n` +
                   `You have received a new contact inquiry with the following details:\n\n` +
                   `Name: ${name}\n` +
                   `Work Email: ${email}\n` +
                   `Organisation: ${org}\n` +
                   `Role: ${role}\n` +
                   `Sector: ${interest || 'Not Specified'}\n\n` +
                   `Message:\n${message}\n\n` +
                   `Sent via Infocus Group website contact form.`;

      const mailtoUrl = `mailto:${mailtoEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      
      // Open email client
      window.location.href = mailtoUrl;

      // Reset button and form after short delay
      setTimeout(function(){
        if(btn){ 
          btn.textContent = 'Email Client Opened'; 
          btn.style.backgroundColor = '#167B7D'; 
        }
        setTimeout(function(){
          if(btn){
            btn.textContent = 'Send message';
            btn.disabled = false;
            btn.style.backgroundColor = '';
          }
          form.reset();
        }, 2000);
      }, 1000);
    });
  }
})();
