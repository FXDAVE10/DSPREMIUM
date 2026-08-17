/* ============================================================
    DS PREMIUM DETAIL — internal script (cu Formspree integrat)
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
  if(modalClose) modalClose.addEventListener('click', closeModal);
  if(modalBackdrop) modalBackdrop.addEventListener('click', (e) => { if (e.target === modalBackdrop) closeModal(); });
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
    path: null,      // 'package' | 'individual'
    package: null,    // if path === 'package'
    services: [],     // if path === 'individual' → [{name, price}]
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
    const formEl = document.getElementById('booking-form');
    if(formEl) formEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
  document.querySelectorAll('.next-btn').forEach(btn => btn.addEventListener('click', () => goToStep(parseInt(btn.dataset.next, 10))));
  document.querySelectorAll('.prev-btn').forEach(btn => btn.addEventListener('click', () => goToStep(parseInt(btn.dataset.prev, 10))));

  // --- step 1: class ---
  const classOptions = document.getElementById('class-options');
  if(classOptions) {
    classOptions.querySelectorAll('.choice-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        classOptions.querySelectorAll('.choice-btn').forEach(b => b.classList.remove('selected'));
        btn.classList.add('selected');
        state.class = btn.dataset.value;
        const nextBtn = document.querySelector('[data-next="2"]');
        if(nextBtn) nextBtn.disabled = false;
        updatePackagePrices();
      });
    });
  }

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
    if(pathPackageBtn) pathPackageBtn.classList.toggle('selected', path === 'package');
    if(pathIndividualBtn) pathIndividualBtn.classList.toggle('selected', path === 'individual');
    if(selectionPackage) selectionPackage.classList.toggle('active', path === 'package');
    if(selectionIndividual) selectionIndividual.classList.toggle('active', path === 'individual');
    if(dirtinessField) dirtinessField.style.display = path === 'individual' ? 'block' : 'none';
    if (path !== 'individual') {
      state.dirtiness = null;
      if(dirtinessLevel) dirtinessLevel.value = '';
    }
    if(nextStep3Btn) nextStep3Btn.disabled = true;
    state.package = null;
    state.services = [];
  }
  if(dirtinessLevel) {
    dirtinessLevel.addEventListener('change', () => {
      state.dirtiness = dirtinessLevel.value;
    });
  }
  if(pathPackageBtn) pathPackageBtn.addEventListener('click', () => selectPath('package'));
  if(pathIndividualBtn) pathIndividualBtn.addEventListener('click', () => selectPath('individual'));

  // package sub-choice
  const packageOptions = document.getElementById('package-options');
  function updatePackagePrices(){
    if(!packageOptions) return;
    packageOptions.querySelectorAll('.price-tag').forEach(tag => {
      try {
        const prices = JSON.parse(tag.dataset.prices);
        const p = prices[state.class] ?? prices['M'];
        tag.textContent = p + ' RON';
      } catch(e) {}
    });
  }

  const heroSecondary = document.querySelector('.hero-secondary');
  if(heroSecondary) {
    heroSecondary.addEventListener('click', (event) => {
      event.preventDefault();
      const s = document.getElementById('servicii');
      if(s) s.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  }

  if(packageOptions) {
    packageOptions.querySelectorAll('.choice-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        packageOptions.querySelectorAll('.choice-btn').forEach(b => b.classList.remove('selected'));
        btn.classList.add('selected');
        state.package = btn.dataset.value;
        if(nextStep3Btn) nextStep3Btn.disabled = false;
      });
    });
  }

  // individual services sub-choice
  const serviceOptions = document.getElementById('service-options');
  const runningTotalEl = document.getElementById('running-total-value');
  if(serviceOptions) {
    serviceOptions.querySelectorAll('.service-item').forEach(item => {
      item.addEventListener('click', () => {
        item.classList.toggle('selected');
        const nameEl = item.querySelector('span:nth-child(2)');
        const name = nameEl ? nameEl.textContent : 'Serviciu';
        const price = parseInt(item.dataset.price, 10) || 0;
        if (item.classList.contains('selected')) {
          state.services.push({ name, price });
        } else {
          state.services = state.services.filter(s => s.name !== name);
        }
        const total = state.services.reduce((sum, s) => sum + s.price, 0);
        if(runningTotalEl) runningTotalEl.textContent = total + ' RON';
        if(nextStep3Btn) nextStep3Btn.disabled = state.services.length === 0;
      });
    });
  }

  // --- step 3: date & time ---
  const dateInput = document.getElementById('booking-date');
  const timeOptions = document.getElementById('time-options');
  if(dateInput) {
    dateInput.setAttribute('min', new Date().toISOString().split('T')[0]);
  }
  function checkStep3(){
    const next4 = document.querySelector('[data-next="4"]');
    if(next4) next4.disabled = !(state.date && state.time);
  }
  if(dateInput) {
    dateInput.addEventListener('change', () => { state.date = dateInput.value; checkStep3(); });
  }
  if(timeOptions) {
    timeOptions.querySelectorAll('.time-slot').forEach(btn => {
      btn.addEventListener('click', () => {
        timeOptions.querySelectorAll('.time-slot').forEach(b => b.classList.remove('selected'));
        btn.classList.add('selected');
        state.time = btn.dataset.value;
        checkStep3();
      });
    });
  }

  // --- step 4: summary + submit ---
  const summaryText = document.getElementById('summary-text');
  function refreshSummary(){
    let selectionStr = '';
    if (state.path === 'package' && state.package){
      const tag = packageOptions ? packageOptions.querySelector(`.choice-btn[data-value="${state.package}"] .price-tag`) : null;
      const priceStr = tag && tag.textContent ? ' · ' + tag.textContent : '';
      selectionStr = `Pachet ${state.package}${priceStr}`;
    } else if (state.path === 'individual' && state.services.length){
      const total = state.services.reduce((sum, s) => sum + s.price, 0);
      selectionStr = `${state.services.length} servicii individuale · ${total} RON`;
    }
    const dirtinessText = state.path === 'individual' && state.dirtiness ? ` · Murdărie: ${state.dirtiness}` : '';
    if(summaryText) {
      summaryText.textContent = `Clasă ${state.class || '-'} · ${selectionStr}${dirtinessText} · ${state.date || ''} ${state.time || ''}`;
    }
  }
  document.querySelectorAll('[data-next="4"]').forEach(b => b.addEventListener('click', refreshSummary));

  const form = document.getElementById('booking-form');
  if(form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const nameInput = document.getElementById('c-name');
      const phoneInput = document.getElementById('c-phone');
      const name = nameInput ? nameInput.value.trim() : '';
      const phone = phoneInput ? phoneInput.value.trim() : '';
      if (!name || !phone) return;

      let selectionLine = '';
      if (state.path === 'package' && state.package){
        selectionLine = `Pachet: ${state.package}`;
      } else if (state.path === 'individual' && state.services.length){
        const total = state.services.reduce((sum, s) => sum + s.price, 0);
        selectionLine = `Servicii: ${state.services.map(s => s.name).join(', ')} (Total: ${total} RON)`;
      }

      const dirtinessLine = state.path === 'individual' && state.dirtiness ? `Grad murdărie: ${state.dirtiness}` : '';
      const fullMsg = [
        `Nume: ${name}`,
        `Telefon: ${phone}`,
        `Clasă mașină: ${state.class || '-'}`,
        selectionLine || 'Selecție: —',
        dirtinessLine || 'Grad murdărie: nu este specificat',
        `Data: ${state.date || '-'}`,
        `Ora: ${state.time || '-'}`
      ].filter(Boolean).join('\n');

      // Actualizăm câmpul ascuns pentru Formspree
      const hiddenSummary = document.getElementById('hidden-summary');
      if(hiddenSummary) hiddenSummary.value = fullMsg;

      // Trimitem formularul prin fetch către Formspree fără redirectare în Gmail
      try {
        const formData = new FormData(form);
        const response = await fetch(form.action, {
          method: 'POST',
          body: formData,
          headers: { 'Accept': 'application/json' }
        });

        if (response.ok) {
          panels.forEach(p => p.classList.remove('active'));
          const successPanel = document.querySelector('[data-panel="success"]');
          
          // PERSONALIZARE PANOU SUCCES CU ATENȚIONARE PENTRU CLIENT
          if(successPanel) {
            successPanel.innerHTML = `
              <div style="text-align: center; padding: 20px;">
                <h3 style="color: #9c8323; margin-bottom: 15px;">Rezervare Trimisă cu Succes!</h3>
                <p style="margin-bottom: 10px;">Datele programării au fost înregistrate. Veți primi în scurt timp un e-mail de confirmare.</p>
                <div style="background: rgba(156, 131, 35, 0.1); padding: 15px; border-radius: 8px; margin-top: 20px; font-size: 0.95em;">
                  <p style="margin: 0; color: #333;">Dacă nu primiți o confirmare în scurt timp, vă rugăm să ne scrieți direct pe 
                  <a href="https://wa.me/40731353888" target="_blank" style="color: #25d366; font-weight: bold; text-decoration: underline;">WhatsApp</a> 
                  sau pe e-mail pentru siguranță!</p>
                </div>
              </div>
            `;
            successPanel.classList.add('active');
          }

          dots.forEach(d => d.classList.add('done'));
          const bookingEl = document.getElementById('booking-form');
          if(bookingEl) bookingEl.scrollIntoView({ behavior: 'smooth', block: 'start' });

          // Resetare prelungită la 10 secunde (sau poți lăsa clientul să citească în liniște)
          window.setTimeout(() => {
            window.location.reload(); // Cea mai simplă și sigură metodă de resetare curată a paginii
          }, 10000);

        } else {
          // ATENȚIONARE ÎN CAZ DE EȘEC (Când serverul Formspree returnează eroare)
          panels.forEach(p => p.classList.remove('active'));
          const successPanel = document.querySelector('[data-panel="success"]');
          if(successPanel) {
            successPanel.innerHTML = `
              <div style="text-align: center; padding: 20px;">
                <h3 style="color: #d9534f; margin-bottom: 15px;">A apărut o problemă tehnică!</h3>
                <p style="margin-bottom: 15px;">Rezervarea nu s-a putut trimite automat prin sistem.</p>
                <p style="margin-bottom: 20px;">Vă rugăm să ne contactați direct pe <strong>WhatsApp</strong> la numărul <strong>0731 353 888</strong> pentru a vă programa manual.</p>
                <a href="https://wa.me/40731353888" target="_blank" class="btn btn-gold" style="display: inline-block; text-decoration: none; padding: 10px 20px;">Contactează pe WhatsApp</a>
              </div>
            `;
            successPanel.classList.add('active');
          }
        }

      } catch (error) {
        // ATENȚIONARE ÎN CAZ DE EROARE DE INTERNET / CONEXIUNE
        panels.forEach(p => p.classList.remove('active'));
        const successPanel = document.querySelector('[data-panel="success"]');
        if(successPanel) {
          successPanel.innerHTML = `
            <div style="text-align: center; padding: 20px;">
              <h3 style="color: #d9534f; margin-bottom: 15px;">Eroare de conexiune</h3>
              <p style="margin-bottom: 15px;">Verificați conexiunea la internet sau contactați-ne direct.</p>
              <a href="https://wa.me/40731353888" target="_blank" class="btn btn-gold" style="display: inline-block; text-decoration: none; padding: 10px 20px;">Trimite pe WhatsApp</a>
            </div>
          `;
          successPanel.classList.add('active');
        }
      }
    });
  }

});
