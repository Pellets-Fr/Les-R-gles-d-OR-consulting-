/* =============================================
   Les Règles d'OR Consulting – main.js
   Interactions partagées toutes pages
   ============================================= */

/* ---- Navigation ---- */
(function initNav() {
  const nav    = document.getElementById('main-nav');
  const toggle = document.getElementById('nav-toggle');
  const links  = document.getElementById('nav-links');

  if (!nav) return;

  // Sticky shadow on scroll
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 20);
  }, { passive: true });

  // Mobile menu toggle
  if (toggle && links) {
    toggle.addEventListener('click', () => {
      const open = links.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open);
    });
    // Close on link click
    links.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        links.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // Sticky CTA mobile – show after hero
  const stickyCta = document.getElementById('sticky-cta');
  if (stickyCta) {
    const hero = document.getElementById('hero');
    const obs = new IntersectionObserver(([e]) => {
      stickyCta.style.display = e.isIntersecting ? 'none' : 'block';
    }, { threshold: 0 });
    if (hero) obs.observe(hero);
  }
}());

/* ---- FAQ Accordion ---- */
document.querySelectorAll('[data-faq]').forEach(item => {
  const btn    = item.querySelector('.faq-question');
  const answer = item.querySelector('.faq-answer');
  if (!btn || !answer) return;

  btn.addEventListener('click', () => {
    const isOpen = btn.getAttribute('aria-expanded') === 'true';

    // Close all others
    document.querySelectorAll('.faq-question[aria-expanded="true"]').forEach(other => {
      if (other === btn) return;
      other.setAttribute('aria-expanded', 'false');
      other.closest('[data-faq]').querySelector('.faq-answer').classList.remove('open');
    });

    btn.setAttribute('aria-expanded', !isOpen);
    answer.classList.toggle('open', !isOpen);
  });
});

/* ---- Contact form (page d'accueil) ---- */
(function initContactForm() {
  const form    = document.getElementById('contact-form');
  const success = document.getElementById('form-success');
  if (!form) return;

  // Show/hide entreprise field
  const profilSel = document.getElementById('profil');
  const entGrp    = document.getElementById('entreprise-group');
  if (profilSel && entGrp) {
    profilSel.addEventListener('change', () => {
      entGrp.style.display = profilSel.value === 'entreprise' ? 'flex' : 'none';
    });
  }

  // File preview
  const fileInput   = document.getElementById('document');
  const filePreview = document.getElementById('file-preview');
  if (fileInput && filePreview) {
    fileInput.addEventListener('change', () => {
      const f = fileInput.files[0];
      if (f) {
        filePreview.style.display = 'block';
        filePreview.textContent = '📎 ' + f.name + ' (' + formatSize(f.size) + ')';
      } else {
        filePreview.style.display = 'none';
      }
    });
  }

  // Validation helpers
  const rules = {
    prenom:        v => v.trim().length >= 2  || 'Veuillez entrer votre prénom.',
    nom:           v => v.trim().length >= 2  || 'Veuillez entrer votre nom.',
    profil:        v => v !== ''              || 'Veuillez sélectionner votre profil.',
    email:         v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) || 'Adresse courriel invalide.',
    'type-demande':v => v !== ''              || 'Veuillez choisir un type de demande.',
    consentement:  v => v                     || 'Le consentement est requis.',
  };

  form.addEventListener('submit', e => {
    e.preventDefault();
    let valid = true;

    Object.keys(rules).forEach(name => {
      const el  = form.querySelector(`[name="${name}"]`);
      const err = el ? el.closest('.form-group, .form-consent')?.querySelector('.field-error') : null;
      if (!el) return;
      const val = el.type === 'checkbox' ? el.checked : el.value;
      const msg = rules[name](val);
      if (msg !== true) {
        valid = false;
        el.classList.add('error');
        if (err) err.textContent = msg;
      } else {
        el.classList.remove('error');
        if (err) err.textContent = '';
      }
    });

    if (!valid) return;

    // Simulate send
    const btn     = document.getElementById('submit-btn');
    const btnText = btn.querySelector('.btn-text');
    const btnLoad = btn.querySelector('.btn-loading');
    btn.disabled  = true;
    btnText.style.display = 'none';
    btnLoad.style.display = 'inline';

    setTimeout(() => {
      form.style.display = 'none';
      if (success) {
        success.style.display = 'block';
        const prenom = document.getElementById('prenom')?.value || '';
        const span   = document.getElementById('success-prenom');
        if (span) span.textContent = prenom;
      }
    }, 1600);
  });

  // Live clear errors on input
  form.querySelectorAll('input, select, textarea').forEach(el => {
    el.addEventListener('input', () => {
      el.classList.remove('error');
      const err = el.closest('.form-group, .form-consent')?.querySelector('.field-error');
      if (err) err.textContent = '';
    });
  });
}());

/* ---- Utility ---- */
function formatSize(bytes) {
  if (bytes < 1024)       return bytes + ' o';
  if (bytes < 1048576)    return (bytes / 1024).toFixed(1) + ' Ko';
  return (bytes / 1048576).toFixed(1) + ' Mo';
}
