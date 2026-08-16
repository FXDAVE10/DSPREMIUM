/* ============================================================
   DS PREMIUM DETAIL — internal script
   Sections: 1) scroll reveal  2) modals  3) booking wizard
   ============================================================ */
document.addEventListener('DOMContentLoaded', () => {

  /* ---------- 1) SCROLL REVEAL (Intersection Observer) ---------- */
  const revealEls = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  revealEls.forEach(el => revealObserver.observe(el));

  /* ---------- 2) MODALS: Car Classes & Packages ---------- */
  const classInfo = {
    S: {
      title: 'Clasa S — Mașini Mici',
      list: ['Fiat 500', 'VW Up!', 'Toyota Aygo', 'Hyundai i10'],
      text: 'Mașini compacte, de oraș, cu habitaclu redus. Timpul de lucru este mai scurt, ceea ce se reflectă direct în preț — clasa cea mai accesibilă din grilă.'
    },
    M: {
      title: 'Clasa M — Mașini Medii',
      list: ['VW Golf', 'Dacia Logan', 'Opel Astra', 'Skoda Octavia'],
      text: 'Segmentul cel mai popular. Habitaclu generos pentru o mașină de zi cu zi, dar fără suprafețele extinse ale unui SUV — un echilibru bun între timp și preț.'
    },
    L: {
      title: 'Clasa L — Mașini Mari',
      list: ['VW Passat', 'BMW Seria 5', 'Audi A6', 'Skoda Superb'],
      text: 'Berline și break-uri mari, cu spațiu interior semnificativ mai mare — mai multe suprafețe de tapițerie, plastic și piele de tratat, deci timp de lucru suplimentar.'
    },
    XL: {
      title: 'Clasa XL — SUV / 7 Locuri',
      list: ['BMW X5', 'Audi Q7', 'VW Tiguan', 'Skoda Kodiaq', 'Dubă mică'],
      text: 'SUV-uri și mașini cu 7 locuri, cu portbagaj extins și multiple rânduri de scaune. Cel mai lung timp de lucru dintre mașinile de pasageri.'
    },
    Van: {
      title: 'Clasa Dubă',
      list: ['Dubă marfă', 'Dubă pasageri', 'Utilitare mici/medii'],
      text: 'Pachetele pentru dube sunt calculate separat, în funcție de dimensiune și gradul de murdărie — interval 143–630 RON. Pentru o ofertă exactă, ne poți contacta cu modelul exact.'
    }
  };

  const packageInfo = {
    Basic: {
      title: 'Pachet Basic',
      duration: '1–2 ore',
      prices: { S: 180, M: 220, L: 250, XL: 300 },
      steps: ['Aspirare completă (scaune, mochetă, portbagaj)', 'Curățare praf de pe bord și plastice', 'Curățare geamuri interior', 'Curățare panouri uși'],
      chem: 'Soluții de curățare universale, dedicate detailingului auto profesional.',
      text: 'Ideal pentru întreținere regulată — o curățare rapidă și eficientă a interiorului.'
    },
    Standard: {
      title: 'Pachet Standard',
      duration: '2–3 ore',
      prices: { S: 280, M: 330, L: 380, XL: 450 },
      steps: ['Tot ce include pachetul Basic', 'Pensulare tapițerie și mochetă', 'Curățare grile de ventilație', 'Dressing plastice interioare', 'Neutralizare mirosuri'],
      chem: 'Soluții de curățare + dressing pe bază de silicon/apă pentru plastice, fără reziduuri grase.',
      text: 'Un nivel de curățenie vizibil mai profund, recomandat la 2–3 luni.'
    },
    Premium: {
      title: 'Pachet Premium',
      duration: '4–6 ore',
      prices: { S: 450, M: 550, L: 650, XL: 800 },
      steps: ['Tot ce include pachetul Standard', 'Injecție-extracție pentru tapițerie/mochetă', 'Curățare piele', 'Hidratare piele'],
      chem: 'Soluție de injecție-extracție special formulată pentru textile auto + cremă hidratantă pentru piele naturală/ecologică.',
      text: 'Curățare profundă, recomandată pentru mașini folosite intens sau înainte de vânzare.'
    },
    VIP: {
      title: 'Pachet VIP',
      duration: '6–8 ore',
      prices: { S: 700, M: 850, L: 1000, XL: 1200 },
      steps: ['Tot ce include pachetul Premium', 'Demontare parțială elemente interioare', 'Hidratare profundă piele/plastice', 'Igienizare climă (A/C)'],
      chem: 'Gamă completă de soluții profesionale, plus tratament pentru sistemul de climatizare.',
      text: 'Detailing complet, la cel mai înalt nivel — mașina arată și miroase ca nouă.'
    }
  };

  const modalBackdrop = document.getElementById('modal-backdrop');
  const modalContent = document.getElementById('modal-content');
  const modalClose = document.getElementById('modal-close');

  function openModal(html){
    modalContent.innerHTML = html;
    modalBackdrop.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
  function closeModal(){
    modalBackdrop.classList.remove('open');
    document.body.style.overflow = '';
  }
  modalClose.addEventListener('click', closeModal);
  modalBackdrop.addEventListener('click', (e) => { if (e.target === modalBackdrop) closeModal(); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeModal(); });

  // class cards → modal
  document.querySelectorAll('.class-card').forEach(card => {
    card.addEventListener('click', () => {
      const data = classInfo[card.dataset.class];
      if (!data) return;
      openModal(`
        <p class="modal-eyebrow">Clasificare Auto</p>
        <h3>${data.title}</h3>
        <p>${data.text}</p>
        <div class="modal-section">
          <h5>Exemple de mașini</h5>
          <ul class="modal-list">${data.list.map(item => `<li>${item}</li>`).join('')}</ul>
        </div>
      `);
    });
  });

  // package cards → modal
  document.querySelectorAll('.price-card').forEach(card => {
    card.addEventListener('click', () => {
      const data = packageInfo[card.dataset.package];
      if (!data) return;
      openModal(`
        <p class="modal-eyebrow">Pachet · ${data.duration}</p>
        <h3>${data.title}</h3>
        <p>${data.text}</p>
        <div class="modal-section">
          <h5>Preț pe clasă</h5>
          <div class="modal-price-grid">
            <div><span>S</span><strong>${data.prices.S} RON</strong></div>
            <div><span>M</span><strong>${data.prices.M} RON</strong></div>
            <div><span>L</span><strong>${data.prices.L} RON</strong></div>
            <div><span>XL</span><strong>${data.prices.XL} RON</strong></div>
          </div>
        </div>
        <div class="modal-section">
          <h5>Procedură pas cu pas</h5>
          <ul class="modal-list">${data.steps.map(s => `<li>${s}</li>`).join('')}</ul>
        </div>
        <div class="modal-section">
          <h5>Soluții folosite</h5>
          <p>${data.chem}</p>
        </div>
      `);
    });
  });

  /* ---------- 3) BOOKING WIZARD ---------- */
  const state = {
    class: null,
    path: null,       // 'package' | 'individual'
    package: null,     // if path === 'package'
    services: [],      // if path === 'individual' → [{name, price}]
    dirtiness: null,
    date: null,
    time: null
  };

  const panels = document.querySelectorAll('.wizard-panel[data-panel]');
  const dots = document.querySelectorAll('.step-dot');

  function goToStep(n){
    panels.forEach(p => p.classList.toggle('active', p.dataset.panel === String(n)));
    dots.forEach(d => {
      const dn = parseInt(d.dataset.dot, 10);
      d.classList.toggle('active', dn === n);
      d.classList.toggle('done', dn < n);
    });
    document.getElementById('booking-form').scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
  document.querySelectorAll('.next-btn').forEach(btn => btn.addEventListener('click', () => goToStep(parseInt(btn.dataset.next, 10))));
  document.querySelectorAll('.prev-btn').forEach(btn => btn.addEventListener('click', () => goToStep(parseInt(btn.dataset.prev, 10))));

  // --- step 1: class ---
  const classOptions = document.getElementById('class-options');
  classOptions.querySelectorAll('.choice-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      classOptions.querySelectorAll('.choice-btn').forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
      state.class = btn.dataset.value;
      document.querySelector('[data-next="2"]').disabled = false;
      updatePackagePrices();
    });
  });

  // --- step 2: dual path ---
  const pathPackageBtn = document.getElementById('path-package');
  const pathIndividualBtn = document.getElementById('path-individual');
  const selectionPackage = document.getElementById('selection-package');
  const selectionIndividual = document.getElementById('selection-individual');
  const nextStep3Btn = document.querySelector('[data-next="3"]');
  const dirtinessField = document.getElementById('dirtiness-field');
  const dirtinessLevel = document.getElementById('dirtiness-level');

  function selectPath(path){
    state.path = path;
    pathPackageBtn.classList.toggle('selected', path === 'package');
    pathIndividualBtn.classList.toggle('selected', path === 'individual');
    selectionPackage.classList.toggle('active', path === 'package');
    selectionIndividual.classList.toggle('active', path === 'individual');
    dirtinessField.style.display = path === 'individual' ? 'block' : 'none';
    if (path !== 'individual') {
      state.dirtiness = null;
      dirtinessLevel.value = '';
    }
    // reset step-2 completion state until a concrete choice is made
    nextStep3Btn.disabled = true;
    state.package = null;
    state.services = [];
  }
  dirtinessLevel.addEventListener('change', () => {
    state.dirtiness = dirtinessLevel.value;
  });
  pathPackageBtn.addEventListener('click', () => selectPath('package'));
  pathIndividualBtn.addEventListener('click', () => selectPath('individual'));

  // package sub-choice
  const packageOptions = document.getElementById('package-options');
  function updatePackagePrices(){
    packageOptions.querySelectorAll('.price-tag').forEach(tag => {
      const prices = JSON.parse(tag.dataset.prices);
      const p = prices[state.class] ?? prices['M'];
      tag.textContent = p + ' RON';
    });
  }

  document.querySelector('.hero-secondary').addEventListener('click', (event) => {
    event.preventDefault();
    document.getElementById('servicii').scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
  packageOptions.querySelectorAll('.choice-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      packageOptions.querySelectorAll('.choice-btn').forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
      state.package = btn.dataset.value;
      nextStep3Btn.disabled = false;
    });
  });

  // individual services sub-choice
  const serviceOptions = document.getElementById('service-options');
  const runningTotalEl = document.getElementById('running-total-value');
  serviceOptions.querySelectorAll('.service-item').forEach(item => {
    item.addEventListener('click', () => {
      item.classList.toggle('selected');
      const name = item.querySelector('span:nth-child(2)').textContent;
      const price = parseInt(item.dataset.price, 10);
      if (item.classList.contains('selected')) {
        state.services.push({ name, price });
      } else {
        state.services = state.services.filter(s => s.name !== name);
      }
      const total = state.services.reduce((sum, s) => sum + s.price, 0);
      runningTotalEl.textContent = total + ' RON';
      nextStep3Btn.disabled = state.services.length === 0;
    });
  });

  // --- step 3: date & time ---
  const dateInput = document.getElementById('booking-date');
  const timeOptions = document.getElementById('time-options');
  dateInput.setAttribute('min', new Date().toISOString().split('T')[0]);
  function checkStep3(){ document.querySelector('[data-next="4"]').disabled = !(state.date && state.time); }
  dateInput.addEventListener('change', () => { state.date = dateInput.value; checkStep3(); });
  timeOptions.querySelectorAll('.time-slot').forEach(btn => {
    btn.addEventListener('click', () => {
      timeOptions.querySelectorAll('.time-slot').forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
      state.time = btn.dataset.value;
      checkStep3();
    });
  });

  // --- step 4: summary + submit ---
  const summaryText = document.getElementById('summary-text');
  function refreshSummary(){
    let selectionStr = '';
    if (state.path === 'package' && state.package){
      const tag = packageOptions.querySelector(`.choice-btn[data-value="${state.package}"] .price-tag`);
      const priceStr = tag && tag.textContent ? ' · ' + tag.textContent : (state.package === 'Exterior' ? ' · 99–330 RON' : '');
      selectionStr = `Pachet ${state.package}${priceStr}`;
    } else if (state.path === 'individual' && state.services.length){
      const total = state.services.reduce((sum, s) => sum + s.price, 0);
      selectionStr = `${state.services.length} servicii individuale · ${total} RON`;
    }
    const dirtinessText = state.path === 'individual' && state.dirtiness ? ` · Murdărie: ${state.dirtiness}` : '';
    summaryText.textContent = `Clasă ${state.class || '-'} · ${selectionStr}${dirtinessText} · ${state.date || ''} ${state.time || ''}`;
  }
  document.querySelectorAll('[data-next="4"]').forEach(b => b.addEventListener('click', refreshSummary));

  const form = document.getElementById('booking-form');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('c-name').value.trim();
    const phone = document.getElementById('c-phone').value.trim();
    if (!name || !phone) return;

    let selectionLine = '';
    if (state.path === 'package' && state.package){
      selectionLine = `Pachet: ${state.package}`;
    } else if (state.path === 'individual' && state.services.length){
      const total = state.services.reduce((sum, s) => sum + s.price, 0);
      selectionLine = `Servicii: ${state.services.map(s => s.name).join(', ')} (Total: ${total} RON)`;
    }

    const dirtinessLine = state.path === 'individual' && state.dirtiness ? `Grad murdărie: ${state.dirtiness}` : '';
    const msg = [
      'Bună, aș dori o programare la DS Premium Detail.',
      `Nume: ${name}`,
      `Telefon: ${phone}`,
      `Clasă mașină: ${state.class || '-'}`,
      selectionLine || 'Selecție: —',
      dirtinessLine || 'Grad murdărie: nu este specificat',
      `Data: ${state.date || '-'}`,
      `Ora: ${state.time || '-'}`,
      'Vă mulțumesc!'
    ].join('\n');

    const targetEmail = 'dspremium.detailing@gmail.com';
    window.location.href = `mailto:${targetEmail}?subject=${encodeURIComponent('Programare nouă DS Premium Detail')}&body=${encodeURIComponent(msg)}`;

    panels.forEach(p => p.classList.remove('active'));
    const successPanel = document.querySelector('[data-panel="success"]');
    successPanel.classList.add('active');
    dots.forEach(d => d.classList.add('done'));
    document.getElementById('booking-form').scrollIntoView({ behavior: 'smooth', block: 'start' });

    window.setTimeout(() => {
      successPanel.classList.remove('active');
      panels.forEach(p => p.classList.remove('active'));
      document.querySelector('[data-panel="1"]').classList.add('active');
      dots.forEach(d => {
        d.classList.remove('active', 'done');
        if (d.dataset.dot === '1') d.classList.add('active');
      });
      document.getElementById('booking-form').reset();
      classOptions.querySelectorAll('.choice-btn').forEach(b => b.classList.remove('selected'));
      packageOptions.querySelectorAll('.choice-btn').forEach(b => b.classList.remove('selected'));
      serviceOptions.querySelectorAll('.service-item').forEach(item => item.classList.remove('selected'));
      timeOptions.querySelectorAll('.time-slot').forEach(btn => btn.classList.remove('selected'));
      state.class = null;
      state.path = null;
      state.package = null;
      state.services = [];
      state.dirtiness = null;
      state.date = null;
      state.time = null;
      nextStep3Btn.disabled = true;
      document.querySelector('[data-next="2"]').disabled = true;
      document.querySelector('[data-next="4"]').disabled = true;
      dirtinessField.style.display = 'none';
      dirtinessLevel.value = '';
      runningTotalEl.textContent = '0 RON';
      summaryText.textContent = '—';
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 3500);
  });

});