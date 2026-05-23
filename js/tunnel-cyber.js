/* =============================================
   Tunnel Cyberassurance – tunnel-cyber.js
   ============================================= */

const CYBER_TOTAL_STEPS = 5;
let cyberCurrentStep = 1;

// Données collectées à travers le tunnel
const cyberData = {};

/* ---- Navigation entre étapes ---- */
function goToStep(n) {
  const current = document.getElementById('step-' + cyberCurrentStep);
  const next    = document.getElementById('step-' + n);
  if (!next) return;

  if (current) current.classList.remove('active');
  next.classList.add('active');
  cyberCurrentStep = n;

  updateProgressCyber(n);
  window.scrollTo({ top: 0, behavior: 'smooth' });

  if (n === CYBER_TOTAL_STEPS) buildCyberRecap();
}

function updateProgressCyber(step) {
  const pct = Math.round((step / CYBER_TOTAL_STEPS) * 100);
  const bar = document.getElementById('progress-bar');
  if (bar) bar.style.width = pct + '%';

  document.querySelectorAll('#progress-steps .progress-step').forEach(dot => {
    const s = parseInt(dot.dataset.step);
    dot.classList.remove('active', 'done');
    if (s < step)  dot.classList.add('done');
    if (s === step) dot.classList.add('active');
  });
}

/* ---- Validation générique ---- */
function validateStep(formId, extraCheck) {
  const form   = document.getElementById(formId);
  if (!form) return true;
  let valid    = true;

  form.querySelectorAll('[required]').forEach(el => {
    const err = el.closest('.form-group')?.querySelector('.field-error');
    const val = el.value.trim();
    if (!val) {
      valid = false;
      el.classList.add('error');
      if (err) err.textContent = 'Ce champ est requis.';
    } else {
      el.classList.remove('error');
      if (err) err.textContent = '';
    }
  });

  // Email format
  const emailEl = form.querySelector('[type="email"]');
  if (emailEl && emailEl.value) {
    const ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailEl.value);
    const err = emailEl.closest('.form-group')?.querySelector('.field-error');
    if (!ok) {
      valid = false;
      emailEl.classList.add('error');
      if (err) err.textContent = 'Adresse courriel invalide.';
    }
  }

  if (extraCheck) valid = extraCheck(form) && valid;
  return valid;
}

/* ---- Collecte des données d'une étape ---- */
function collectFormData(formId) {
  const form = document.getElementById(formId);
  if (!form) return;
  new FormData(form).forEach((val, key) => {
    if (cyberData[key]) {
      cyberData[key] = Array.isArray(cyberData[key])
        ? [...cyberData[key], val]
        : [cyberData[key], val];
    } else {
      cyberData[key] = val;
    }
  });
}

/* ---- Soumissions de chaque étape ---- */
document.getElementById('form-step-1')?.addEventListener('submit', e => {
  e.preventDefault();
  if (!validateStep('form-step-1')) return;
  collectFormData('form-step-1');
  goToStep(2);
});

document.getElementById('form-step-2')?.addEventListener('submit', e => {
  e.preventDefault();
  collectFormData('form-step-2');
  goToStep(3);
});

document.getElementById('form-step-3')?.addEventListener('submit', e => {
  e.preventDefault();
  if (!validateStep('form-step-3')) return;
  collectFormData('form-step-3');
  // Affichage conditionnel
  handleAssuranceActuelleCyber();
  goToStep(4);
});

/* ---- Affichage conditionnel assureur actuel ---- */
(function initCyberConditional() {
  const sel = document.getElementById('c-assurance-cyber');
  if (!sel) return;
  sel.addEventListener('change', handleAssuranceActuelleCyber);
})();

function handleAssuranceActuelleCyber() {
  const sel = document.getElementById('c-assurance-cyber');
  if (!sel) return;
  const showAssureur = ['oui-incluse', 'oui-specifique'].includes(sel.value);
  const grpAssureur  = document.getElementById('assureur-actuel-group');
  const grpRenouv    = document.getElementById('renouvellement-group');
  if (grpAssureur)  grpAssureur.style.display  = showAssureur ? 'flex' : 'none';
  if (grpRenouv)    grpRenouv.style.display     = showAssureur ? 'flex' : 'none';
}

/* ---- Upload zone ---- */
(function initCyberUpload() {
  const zone     = document.getElementById('upload-zone');
  const input    = document.getElementById('c-files');
  const fileList = document.getElementById('file-list');
  if (!zone || !input || !fileList) return;

  const uploadedFiles = [];

  zone.addEventListener('dragover', e => { e.preventDefault(); zone.classList.add('dragging'); });
  zone.addEventListener('dragleave', ()  => zone.classList.remove('dragging'));
  zone.addEventListener('drop', e => {
    e.preventDefault();
    zone.classList.remove('dragging');
    handleFiles(e.dataTransfer.files);
  });

  input.addEventListener('change', () => handleFiles(input.files));

  function handleFiles(files) {
    Array.from(files).forEach(f => {
      if (uploadedFiles.find(u => u.name === f.name)) return;
      uploadedFiles.push(f);
      renderFileItem(f);
    });
  }

  function renderFileItem(f) {
    const item = document.createElement('div');
    item.className = 'file-item';
    item.innerHTML = `<span>📎 ${f.name} <small>(${formatSizeCyber(f.size)})</small></span>
                      <span class="file-item-remove" title="Retirer">✕</span>`;
    item.querySelector('.file-item-remove').addEventListener('click', () => {
      const idx = uploadedFiles.findIndex(u => u.name === f.name);
      if (idx > -1) uploadedFiles.splice(idx, 1);
      item.remove();
    });
    fileList.appendChild(item);
  }
}());

/* ---- Récapitulatif étape 5 ---- */
function buildCyberRecap() {
  const container = document.getElementById('recap-content');
  if (!container) return;

  const labels = {
    'nom-entreprise': 'Entreprise',
    prenom:           'Prénom',
    nom:              'Nom',
    email:            'Courriel',
    telephone:        'Téléphone',
    secteur:          'Secteur',
    employes:         'Employés',
    'chiffre-affaires': 'Chiffre d\'affaires',
    'dependance-it':  'Dépendance IT',
    'incident-passe': 'Incident passé',
    'assurance-cyber-actuelle': 'Assurance cyber actuelle',
    budget:           'Budget envisagé',
  };

  container.innerHTML = '';
  Object.entries(labels).forEach(([key, label]) => {
    const val = cyberData[key];
    if (!val) return;
    const row = document.createElement('div');
    row.className = 'recap-item';
    row.innerHTML = `<span class="recap-label">${label}</span>
                     <span class="recap-value">${Array.isArray(val) ? val.join(', ') : val}</span>`;
    container.appendChild(row);
  });

  // Risques & données
  ['donnees', 'risques', 'securite'].forEach(key => {
    const val = cyberData[key];
    if (!val) return;
    const labelMap = { donnees: 'Données sensibles', risques: 'Risques ciblés', securite: 'Mesures en place' };
    const row = document.createElement('div');
    row.className = 'recap-item';
    const vals = Array.isArray(val) ? val : [val];
    row.innerHTML = `<span class="recap-label">${labelMap[key]}</span>
                     <span class="recap-value">${vals.length} sélectionné(s)</span>`;
    container.appendChild(row);
  });
}

/* ---- Soumission finale ---- */
function submitCyberForm() {
  const consent = document.getElementById('c-consentement');
  if (!consent?.checked) {
    alert('Veuillez confirmer votre consentement pour transmettre votre demande.');
    return;
  }

  const btn = document.getElementById('c-submit-btn');
  if (btn) { btn.disabled = true; btn.textContent = '⏳ Envoi en cours...'; }

  setTimeout(() => {
    const step5Form = document.querySelector('#step-5 .step-form');
    const success   = document.getElementById('tunnel-success');
    if (step5Form) step5Form.style.display = 'none';
    if (success)   success.style.display   = 'block';

    const refEl = document.getElementById('c-ref-numero');
    if (refEl) refEl.textContent = 'CYBER-' + generateRef();
  }, 1800);
}

/* ---- Utilitaires ---- */
function generateRef() {
  return Date.now().toString(36).toUpperCase() + '-' +
         Math.random().toString(36).substring(2, 6).toUpperCase();
}
function formatSizeCyber(bytes) {
  if (bytes < 1024)    return bytes + ' o';
  if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' Ko';
  return (bytes / 1048576).toFixed(1) + ' Mo';
}

// Efface erreurs à la saisie
document.querySelectorAll('.step-form input, .step-form select, .step-form textarea').forEach(el => {
  el.addEventListener('input', () => {
    el.classList.remove('error');
    const err = el.closest('.form-group')?.querySelector('.field-error');
    if (err) err.textContent = '';
  });
});
