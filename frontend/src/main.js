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
