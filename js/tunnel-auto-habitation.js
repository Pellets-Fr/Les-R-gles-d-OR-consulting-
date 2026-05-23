/* =============================================
   Tunnel Auto & Habitation – tunnel-auto-habitation.js
   ============================================= */

const AH_TOTAL_STEPS = 5;
let ahCurrentStep   = 1;
let vehiculeCount   = 1;
const ahData        = {};

/* ---- Navigation entre étapes ---- */
function ahGoToStep(n) {
  const current = document.getElementById('ah-step-' + ahCurrentStep);
  const next    = document.getElementById('ah-step-' + n);
  if (!next) return;

  if (current) current.classList.remove('active');
  next.classList.add('active');
  ahCurrentStep = n;

  updateProgressAH(n);
  window.scrollTo({ top: 0, behavior: 'smooth' });

  if (n === AH_TOTAL_STEPS) buildAHRecap();
}

function updateProgressAH(step) {
  const pct = Math.round((step / AH_TOTAL_STEPS) * 100);
  const bar = document.getElementById('ah-progress-bar');
  if (bar) bar.style.width = pct + '%';

  document.querySelectorAll('#progress-steps-ah .progress-step').forEach(dot => {
    const s = parseInt(dot.dataset.step);
    dot.classList.remove('active', 'done');
    if (s < step)   dot.classList.add('done');
    if (s === step) dot.classList.add('active');
  });
}

/* ---- Validation générique ---- */
function ahValidateStep(formId) {
  const form = document.getElementById(formId);
  if (!form) return true;
  let valid = true;

  form.querySelectorAll('[required]').forEach(el => {
    const err = el.closest('.form-group')?.querySelector('.field-error');

    if (el.type === 'radio') {
      const name   = el.name;
      const checked = form.querySelector(`[name="${name}"]:checked`);
      if (!checked) {
        valid = false;
        const grp = form.querySelector(`[name="${name}"]`)?.closest('.form-group');
        const e2  = grp?.querySelector('.field-error');
        if (e2) e2.textContent = 'Veuillez faire un choix.';
      }
      return;
    }

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
    const ok  = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailEl.value);
    const err = emailEl.closest('.form-group')?.querySelector('.field-error');
    if (!ok) {
      valid = false;
      emailEl.classList.add('error');
      if (err) err.textContent = 'Adresse courriel invalide.';
    }
  }

  return valid;
}

/* ---- Collecte données ---- */
function ahCollect(formId) {
  const form = document.getElementById(formId);
  if (!form) return;
  new FormData(form).forEach((val, key) => {
    ahData[key] = val;
  });
  // Radio boutons (FormData ne les inclut que si cochés)
  form.querySelectorAll('input[type="radio"]:checked').forEach(r => {
    ahData[r.name] = r.value;
  });
}

/* ---- Soumissions étape par étape ---- */
document.getElementById('ah-form-step-1')?.addEventListener('submit', e => {
  e.preventDefault();
  if (!ahValidateStep('ah-form-step-1')) return;
  ahCollect('ah-form-step-1');

  // Détermine si on doit afficher étape véhicule
  const typeAss = document.querySelector('[name="type-assurance"]:checked')?.value;
  if (typeAss === 'habitation') {
    // Passer directement à l'étape habitation
    ahGoToStep(3);
  } else {
    ahGoToStep(2);
  }
});

document.getElementById('ah-form-step-2')?.addEventListener('submit', e => {
  e.preventDefault();
  if (!ahValidateStep('ah-form-step-2')) return;
  ahCollect('ah-form-step-2');
  collectVehicules();

  const typeAss = document.querySelector('[name="type-assurance"]:checked')?.value;
  if (typeAss === 'auto') {
    ahGoToStep(4); // Pas de section habitation, aller direct aux docs
  } else {
    ahGoToStep(3);
  }
});

document.getElementById('ah-form-step-3')?.addEventListener('submit', e => {
  e.preventDefault();
  if (!ahValidateStep('ah-form-step-3')) return;
  ahCollect('ah-form-step-3');
  ahGoToStep(4);
});

/* ---- Ajout véhicule dynamique ---- */
function addVehicule() {
  if (vehiculeCount >= 4) return;
  vehiculeCount++;
  const n = vehiculeCount;
  const container = document.getElementById('vehicules-container');
  if (!container) return;

  const block = document.createElement('div');
  block.className = 'vehicule-block';
  block.id = 'vehicule-' + n;
  block.innerHTML = `
    <div class="vehicule-block-header">
      <h4>Véhicule ${n}</h4>
      <button type="button" class="btn btn-outline btn-sm" onclick="removeVehicule(${n})">Retirer</button>
    </div>
    <div class="form-row">
      <div class="form-group">
        <label for="ah-annee-${n}">Année <span class="required">*</span></label>
        <input type="number" id="ah-annee-${n}" name="vehicule-${n}-annee" placeholder="2022" min="1990" max="2026" required />
        <span class="field-error" aria-live="polite"></span>
      </div>
      <div class="form-group">
        <label for="ah-marque-${n}">Marque <span class="required">*</span></label>
        <input type="text" id="ah-marque-${n}" name="vehicule-${n}-marque" placeholder="Ex. : Honda" required />
        <span class="field-error" aria-live="polite"></span>
      </div>
    </div>
    <div class="form-row">
      <div class="form-group">
        <label for="ah-modele-${n}">Modèle <span class="required">*</span></label>
        <input type="text" id="ah-modele-${n}" name="vehicule-${n}-modele" placeholder="Ex. : Civic" required />
        <span class="field-error" aria-live="polite"></span>
      </div>
      <div class="form-group">
        <label for="ah-usage-${n}">Usage principal</label>
        <select id="ah-usage-${n}" name="vehicule-${n}-usage">
          <option value="plaisir">Plaisir / personnel</option>
          <option value="travail">Travail (bureau distant)</option>
          <option value="commercial">Commercial / livraison</option>
        </select>
      </div>
    </div>`;

  container.appendChild(block);

  if (vehiculeCount >= 4) {
    document.getElementById('add-vehicule-btn').style.display = 'none';
  }
}

function removeVehicule(n) {
  const block = document.getElementById('vehicule-' + n);
  if (block) block.remove();
  vehiculeCount--;
  document.getElementById('add-vehicule-btn').style.display = 'inline-flex';
}

function collectVehicules() {
  ahData.vehicules = [];
  for (let i = 1; i <= 4; i++) {
    const annee  = document.getElementById(`ah-annee-${i}`)?.value;
    const marque = document.getElementById(`ah-marque-${i}`)?.value;
    const modele = document.getElementById(`ah-modele-${i}`)?.value;
    if (annee && marque && modele) {
      ahData.vehicules.push({ annee, marque, modele });
    }
  }
}

/* ---- Upload zone ---- */
(function initAHUpload() {
  const zone     = document.getElementById('ah-upload-zone');
  const input    = document.getElementById('ah-files');
  const fileList = document.getElementById('ah-file-list');
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
    item.innerHTML = `<span>📎 ${f.name} <small>(${formatSizeAH(f.size)})</small></span>
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
function buildAHRecap() {
  const container = document.getElementById('ah-recap-content');
  if (!container) return;

  const labels = {
    'type-assurance':    'Type d\'assurance',
    prenom:              'Prénom',
    nom:                 'Nom',
    email:               'Courriel',
    telephone:           'Téléphone',
    ville:               'Ville',
    antecedents:         'Antécédents',
    'type-residence':    'Type de résidence',
    'statut-proprio':    'Statut',
    'assureur-actuel':   'Assureur actuel',
    renouvellement:      'Renouvellement',
  };

  container.innerHTML = '';

  // Type assurance
  const typeLabels = { auto: 'Automobile', habitation: 'Habitation', 'les-deux': 'Auto + Habitation' };
  const typeVal = ahData['type-assurance'];
  if (typeVal) {
    addRecapRow(container, 'Type d\'assurance', typeLabels[typeVal] || typeVal);
  }

  // Infos personnelles
  ['prenom', 'nom', 'email', 'telephone', 'ville'].forEach(key => {
    if (ahData[key]) addRecapRow(container, labels[key], ahData[key]);
  });

  // Véhicules
  if (ahData.vehicules?.length) {
    ahData.vehicules.forEach((v, i) => {
      addRecapRow(container, `Véhicule ${i + 1}`, `${v.annee} ${v.marque} ${v.modele}`);
    });
  }

  // Antécédents
  const antecLabels = { propres: 'Aucun accident/infraction', mineurs: 'Infractions mineures', accident: 'Accident(s) déclaré(s)', 'non-concerne': 'Non concerné' };
  if (ahData.antecedents) addRecapRow(container, 'Antécédents', antecLabels[ahData.antecedents] || ahData.antecedents);

  // Habitation
  const residLabels = { maison: 'Maison', condo: 'Condo', logement: 'Logement locatif', chalet: 'Chalet/saisonnier' };
  if (ahData['type-residence']) addRecapRow(container, 'Résidence', residLabels[ahData['type-residence']] || ahData['type-residence']);

  if (ahData['assureur-actuel']) addRecapRow(container, 'Assureur actuel', ahData['assureur-actuel']);
  if (ahData['renouvellement'])  addRecapRow(container, 'Renouvellement', ahData['renouvellement']);
}

function addRecapRow(container, label, value) {
  const row = document.createElement('div');
  row.className = 'recap-item';
  row.innerHTML = `<span class="recap-label">${label}</span><span class="recap-value">${value}</span>`;
  container.appendChild(row);
}

/* ---- Soumission finale ---- */
function submitAHForm() {
  const consent = document.getElementById('ah-consentement');
  if (!consent?.checked) {
    alert('Veuillez confirmer votre consentement pour transmettre votre demande.');
    return;
  }

  const btn = document.getElementById('ah-submit-btn');
  if (btn) { btn.disabled = true; btn.textContent = '⏳ Envoi en cours...'; }

  setTimeout(() => {
    const step5Form = document.querySelector('#ah-step-5 .step-form');
    const success   = document.getElementById('ah-tunnel-success');
    if (step5Form) step5Form.style.display = 'none';
    if (success)   success.style.display   = 'block';

    const refEl = document.getElementById('ah-ref-numero');
    if (refEl) refEl.textContent = 'AH-' + generateRefAH();
  }, 1800);
}

/* ---- Utilitaires ---- */
function generateRefAH() {
  return Date.now().toString(36).toUpperCase() + '-' +
         Math.random().toString(36).substring(2, 6).toUpperCase();
}
function formatSizeAH(bytes) {
  if (bytes < 1024)    return bytes + ' o';
  if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' Ko';
  return (bytes / 1048576).toFixed(1) + ' Mo';
}

// Efface erreurs à la saisie
document.querySelectorAll('.step-form input, .step-form select').forEach(el => {
  el.addEventListener('input', () => {
    el.classList.remove('error');
    const err = el.closest('.form-group')?.querySelector('.field-error');
    if (err) err.textContent = '';
  });
});
