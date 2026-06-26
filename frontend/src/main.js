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

  // Dynamic glow coordinates tracking for Hero
  const hero = document.querySelector('.hero');
  if (hero) {
    hero.addEventListener('mousemove', function(e) {
      const rect = hero.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      hero.style.setProperty('--glow-x', `${x}%`);
      hero.style.setProperty('--glow-y', `${y}%`);
    });
  }

  // Mouse move effect for capability & case cards
  document.querySelectorAll('.cap-card, .case-card').forEach(function(card) {
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

  // Backend form submission
  const form = document.getElementById('contactForm');
  if(form){
    form.addEventListener('submit', function(e){
      e.preventDefault();
      const btn = form.querySelector('.form-submit');
      if(btn){ btn.textContent = 'Sending…'; btn.disabled = true; }

      const payload = {
        name: (form.querySelector('#fname').value + ' ' + form.querySelector('#lname').value).trim(),
        email: form.querySelector('#email').value,
        org: form.querySelector('#org').value,
        role: form.querySelector('#role').value,
        interest: form.querySelector('#sector').value,
        message: form.querySelector('#message').value
      };

      fetch('http://localhost:5000/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      })
      .then(function(res){ return res.json(); })
      .then(function(data){
        if(data.success){
          btn.textContent = 'Message Sent!';
          btn.style.backgroundColor = '#167B7D';
          alert(data.message || 'Thank you! Your submission was successful.');
          form.reset();
        } else {
          btn.textContent = 'Error';
          btn.disabled = false;
          alert(data.error || 'Something went wrong. Please try again.');
        }
      })
      .catch(function(err){
        console.error('Error submitting form:', err);
        btn.textContent = 'Send message';
        btn.disabled = false;
        alert('Could not reach the backend server. Please make sure the backend is running.');
      });
    });
  }
})();
