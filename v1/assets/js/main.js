/* Pamario NT – pradinio puslapio demo (vanilla JS, be priklausomybių) */
(() => {
  'use strict';
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const img = (id, w = 900) => `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=${w}`;

  /* ---------- Demo duomenys (12 skelbimų) ---------- */
  const CITY = { klaipeda: 'Klaipėda', 'klaipedos-r': 'Klaipėdos r.', gargzdai: 'Gargždai', palanga: 'Palanga', kretinga: 'Kretinga', neringa: 'Neringa' };
  const TYPE = { butas: 'Butas', namas: 'Namas', kotedzas: 'Kotedžas', sklypas: 'Sklypas', komercines: 'Komercinės patalpos', sodyba: 'Sodyba' };
  const BROKER = { RK: 'Rūta K.', TB: 'Tomas B.', LZ: 'Laura Ž.', AP: 'Andrius P.' };
  const LISTINGS = [
    { id: 'PNT-1021', type: 'butas', deal: 'parduodama', city: 'klaipeda', title: '2 kambarių butas su balkonu ir vaizdu į kiemą', addr: 'Debreceno g., Klaipėda', price: 119000, rooms: 2, area: 48, floor: '5/9', badge: 'nauja', img: 19966766, img2: 19899084, broker: 'RK', photos: 14, date: '2026-10-10' },
    { id: 'PNT-1018', type: 'butas', deal: 'parduodama', city: 'klaipeda', title: 'Renovuotas butas senamiestyje, Daržų g.', addr: 'Daržų g., Klaipėda', price: 126000, rooms: 2, area: 54, floor: '2/3', badge: 'nauja', img: 19836805, img2: 19857231, broker: 'TB', photos: 19, date: '2026-10-09' },
    { id: 'PNT-1007', type: 'sklypas', deal: 'parduodama', city: 'klaipedos-r', title: 'Namų valdos sklypas su komunikacijomis', addr: 'Kiškėnai, Klaipėdos r.', price: 32000, plot: 12, badge: '', img: 32370508, img2: 15422584, broker: 'AP', photos: 6, date: '2026-10-07' },
    { id: 'PNT-0996', type: 'namas', deal: 'parduodama', city: 'gargzdai', title: 'Dviejų aukštų namas su 8 a sklypu', addr: 'Gargždai, Klaipėdos r.', price: 216000, rooms: 4, area: 142, plot: 8, badge: '', img: 7031404, img2: 19966782, broker: 'AP', photos: 22, date: '2026-10-06' },
    { id: 'PNT-0991', type: 'kotedzas', deal: 'parduodama', city: 'klaipedos-r', title: 'Naujos statybos kotedžas Slengiuose', addr: 'Slengiai, Klaipėdos r.', price: 189000, rooms: 4, area: 118, plot: 3, badge: 'nauja', img: 7031604, img2: 19857269, broker: 'LZ', photos: 17, date: '2026-10-05' },
    { id: 'PNT-0984', type: 'sklypas', deal: 'parduodama', city: 'klaipedos-r', title: 'Sklypas prie miško, asfaltuotas privažiavimas', addr: 'Juodikiai, Klaipėdos r.', price: 38000, plot: 15, badge: 'kaina', oldPrice: 42000, img: 7457224, img2: 5112503, broker: 'TB', photos: 5, date: '2026-10-03' },
    { id: 'PNT-0979', type: 'butas', deal: 'parduodama', city: 'klaipeda', title: '3 kambarių butas Rumpiškėse, šalia parko', addr: 'Rumpiškės g., Klaipėda', price: 125000, rooms: 3, area: 62, floor: '3/5', badge: '', img: 19846383, img2: 19899067, broker: 'RK', photos: 12, date: '2026-10-02' },
    { id: 'PNT-0973', type: 'butas', deal: 'parduodama', city: 'neringa', title: 'Jaukus butas Juodkrantėje, 300 m iki marių', addr: 'Juodkrantė, Neringa', price: 299000, rooms: 2, area: 51, floor: '1/2', badge: 'rez', img: 19966782, img2: 19827227, broker: 'LZ', photos: 16, date: '2026-09-30' },
    { id: 'PNT-0968', type: 'namas', deal: 'parduodama', city: 'palanga', title: 'Erdvus namas ramioje Palangos dalyje', addr: 'Vanagupė, Palanga', price: 389000, rooms: 5, area: 180, plot: 10, badge: '', img: 7031411, img2: 19866404, broker: 'TB', photos: 25, date: '2026-09-28' },
    { id: 'PNT-0961', type: 'sodyba', deal: 'parduodama', city: 'kretinga', title: 'Sodyba su pirtimi ir 45 a žemės', addr: 'Kretingos r.', price: 145000, rooms: 3, area: 96, plot: 45, badge: '', img: 12002134, img2: 34480320, broker: 'AP', photos: 20, date: '2026-09-26' },
    { id: 'PNT-0955', type: 'butas', deal: 'nuoma', city: 'klaipeda', title: 'Nuomojamas 2 kambarių butas su baldais', addr: 'Baltijos pr., Klaipėda', price: 650, rooms: 2, area: 50, floor: '4/9', badge: 'nuoma', img: 19899062, img2: 19966790, broker: 'RK', photos: 9, date: '2026-09-25' },
    { id: 'PNT-0948', type: 'komercines', deal: 'nuoma', city: 'klaipeda', title: 'Biuro patalpos Taikos prospekte, 1 aukštas', addr: 'Taikos pr., Klaipėda', price: 1200, area: 86, floor: '1/5', badge: 'nuoma', img: 6550121, img2: 7750129, broker: 'LZ', photos: 8, date: '2026-09-22' }
  ];

  /* ---------- Piktogramos ---------- */
  const I = {
    heart: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"><path d="M12 20.5s-7.5-4.6-7.5-10A4.2 4.2 0 0 1 12 8a4.2 4.2 0 0 1 7.5 2.5c0 5.4-7.5 10-7.5 10z"/></svg>',
    pin: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s7-6.2 7-12a7 7 0 1 0-14 0c0 5.8 7 12 7 12z"/><circle cx="12" cy="10" r="2.6"/></svg>',
    bed: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 18v-7a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v7"/><path d="M3 15h18M5 9V6h6v3M13 9V6h6v3"/></svg>',
    area: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="4" width="16" height="16" rx="2"/><path d="M4 9h5V4M20 15h-5v5"/></svg>',
    floor: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m3 8 9-4 9 4-9 4z"/><path d="m3 12 9 4 9-4M3 16l9 4 9-4"/></svg>',
    plot: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 18 9 6l4 8 3-4 4 8z"/></svg>',
    cam: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 8h3l2-3h6l2 3h3v11H4z"/><circle cx="12" cy="13" r="3.5"/></svg>',
    arrow: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14m-6-6 6 6-6 6"/></svg>'
  };

  /* ---------- Pagalbinės ---------- */
  const fmt = n => String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  const plural = n => (n % 10 === 1 && n % 100 !== 11) ? 'skelbimas' : (n % 10 >= 2 && n % 10 <= 9 && (n % 100 < 10 || n % 100 > 20)) ? 'skelbimai' : 'skelbimų';
  const BADGE = { nauja: ['badge-nauja', 'Nauja'], nuoma: ['badge-nuoma', 'Nuoma'], kaina: ['badge-kaina', 'Sumažinta kaina'], rez: ['badge-rez', 'Rezervuota'] };

  const toast = (() => {
    const el = $('#toast'); let t;
    return msg => { el.textContent = msg; el.classList.add('is-visible'); clearTimeout(t); t = setTimeout(() => el.classList.remove('is-visible'), 2800); };
  })();

  /* ---------- Mėgstamiausi ---------- */
  const favs = new Set(JSON.parse(localStorage.getItem('pnt-favs') || '[]'));
  const favCount = $('#favCount');
  const saveFavs = () => { localStorage.setItem('pnt-favs', JSON.stringify([...favs])); favCount.textContent = favs.size; };
  favCount.textContent = favs.size;

  /* ---------- Filtrų būsena ---------- */
  const state = { deal: 'all', type: 'all', city: 'all', rooms: 'all', min: '', max: '', sort: 'new', favOnly: false, badge: '', limit: 9 };
  const listingsEl = $('#listings'), moreBtn = $('#moreBtn');
  const ctl = { deal: $('#fDeal'), city: $('#fCity'), rooms: $('#fRooms'), min: $('#fMin'), max: $('#fMax'), sort: $('#fSort') };

  function card(l) {
    const isFav = favs.has(l.id);
    const rent = l.deal === 'nuoma';
    const b = BADGE[l.badge];
    const perM2 = !rent && l.area ? `${fmt(l.price / l.area)} €/m²` : rent ? 'per mėn.' : (l.plot ? `${fmt(l.price / l.plot)} €/a` : '');
    const specs = [
      l.rooms ? `<span>${I.bed}${l.rooms} k.</span>` : '',
      l.area ? `<span>${I.area}${l.area} m²</span>` : '',
      l.floor ? `<span>${I.floor}${l.floor} a.</span>` : '',
      l.plot ? `<span>${I.plot}${l.plot} a</span>` : ''
    ].join('');
    return `<article class="card is-new-in" data-id="${l.id}">
      <div class="card-media">
        <img class="main" src="${img(l.img, 800)}" alt="${TYPE[l.type]} – ${l.addr}" loading="lazy" width="800" height="600">
        <img class="alt" src="${img(l.img2, 800)}" alt="" loading="lazy" width="800" height="600">
        <div class="card-badges">${b ? `<span class="badge ${b[0]}">${b[1]}</span>` : ''}<span class="badge">${TYPE[l.type]}</span></div>
        <button class="card-fav${isFav ? ' is-active' : ''}" type="button" data-fav="${l.id}" aria-pressed="${isFav}" aria-label="Į mėgstamiausius">${I.heart}</button>
        <span class="card-count">${I.cam}${l.photos}</span>
      </div>
      <div class="card-body">
        <div class="card-price"><b>${l.oldPrice ? `<s>${fmt(l.oldPrice)} €</s>` : ''}${fmt(l.price)} €${rent ? '<small>/mėn.</small>' : ''}</b><small>${perM2}</small></div>
        <h3><a href="#" data-demo>${l.title}</a></h3>
        <div class="card-addr">${I.pin}${l.addr}</div>
        <div class="card-specs">${specs}</div>
      </div>
      <div class="card-foot">
        <div class="broker"><i>${l.broker}</i>${BROKER[l.broker]} · ${l.id}</div>
        <a class="card-more" href="#" data-demo>Daugiau ${I.arrow}</a>
      </div>
    </article>`;
  }

  function filtered() {
    const min = parseFloat(state.min), max = parseFloat(state.max);
    let list = LISTINGS.filter(l =>
      (state.deal === 'all' || l.deal === state.deal) &&
      (state.type === 'all' || l.type === state.type) &&
      (state.city === 'all' || l.city === state.city) &&
      (state.rooms === 'all' || (state.rooms === '4' ? (l.rooms || 0) >= 4 : String(l.rooms) === state.rooms)) &&
      (isNaN(min) || l.price >= min) && (isNaN(max) || l.price <= max) &&
      (!state.favOnly || favs.has(l.id)) &&
      (!state.badge || l.badge === state.badge));
    const by = { new: (a, b) => b.date.localeCompare(a.date), 'price-asc': (a, b) => a.price - b.price, 'price-desc': (a, b) => b.price - a.price, 'area-desc': (a, b) => (b.area || b.plot || 0) - (a.area || a.plot || 0) };
    return list.sort(by[state.sort]);
  }

  function render() {
    const list = filtered();
    const shown = list.slice(0, state.limit);
    listingsEl.innerHTML = shown.length ? shown.map(card).join('') :
      `<div class="empty"><b>Pagal šiuos kriterijus skelbimų nėra</b>Pakeiskite filtrus arba <a href="#" id="emptyClear" style="color:var(--jura);font-weight:700">išvalykite juos</a>.</div>`;
    $('#resCount').textContent = list.length;
    $('#resWord').textContent = plural(list.length);
    const rest = list.length - shown.length;
    moreBtn.hidden = rest <= 0;
    moreBtn.textContent = `Rodyti daugiau (${rest})`;
    $('#emptyClear')?.addEventListener('click', e => { e.preventDefault(); clear(); });
  }

  function clear() {
    Object.assign(state, { deal: 'all', type: 'all', city: 'all', rooms: 'all', min: '', max: '', favOnly: false, badge: '', limit: 9 });
    syncControls(); render();
  }
  function syncControls() {
    ctl.deal.value = state.deal; ctl.city.value = state.city; ctl.rooms.value = state.rooms; ctl.min.value = state.min; ctl.max.value = state.max; ctl.sort.value = state.sort;
    $$('[data-filter-type]').forEach(c => c.classList.toggle('is-active', c.dataset.filterType === state.type));
    $('#favOnly').classList.toggle('is-active', state.favOnly); $('#favOnly').setAttribute('aria-pressed', state.favOnly);
  }

  /* Įvykiai – filtrų juosta */
  $$('[data-filter-type]').forEach(c => c.addEventListener('click', () => { state.type = c.dataset.filterType; state.badge = ''; state.limit = 9; syncControls(); render(); }));
  ['deal', 'city', 'rooms', 'sort'].forEach(k => ctl[k].addEventListener('change', () => { state[k] = ctl[k].value; state.limit = 9; render(); }));
  ['min', 'max'].forEach(k => ctl[k].addEventListener('input', () => { state[k] = ctl[k].value; state.limit = 9; render(); }));
  $('#fClear').addEventListener('click', clear);
  $('#favOnly').addEventListener('click', () => { state.favOnly = !state.favOnly; state.limit = 9; syncControls(); render(); });
  moreBtn.addEventListener('click', () => { state.limit += 6; render(); });
  $('#toolbarToggle').addEventListener('click', e => { const t = $('#toolbar'); t.classList.toggle('is-collapsed'); e.currentTarget.setAttribute('aria-expanded', !t.classList.contains('is-collapsed')); });
  if (innerWidth < 768) $('#toolbar').classList.add('is-collapsed'), $('#toolbarToggle').setAttribute('aria-expanded', 'false');

  /* Širdelės */
  listingsEl.addEventListener('click', e => {
    const b = e.target.closest('[data-fav]'); if (!b) return;
    const id = b.dataset.fav;
    favs.has(id) ? favs.delete(id) : favs.add(id);
    b.classList.toggle('is-active', favs.has(id)); b.setAttribute('aria-pressed', favs.has(id));
    saveFavs(); toast(favs.has(id) ? 'Skelbimas pridėtas prie mėgstamiausių' : 'Skelbimas pašalintas iš mėgstamiausių');
    if (state.favOnly) render();
  });
  $('#favBtn').addEventListener('click', () => { state.favOnly = true; state.limit = 9; syncControls(); render(); scrollToListings(); if (!favs.size) toast('Pažymėkite skelbimus širdele – jie atsiras čia'); });

  /* Nuorodos su data-type / data-city / data-deal (meniu, kategorijos, vietovės, poraštė) */
  const scrollToListings = () => $('#skelbimai').scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });
  document.addEventListener('click', e => {
    const a = e.target.closest('a[data-type],a[data-city],a[data-deal]'); if (!a) return;
    e.preventDefault();
    Object.assign(state, { type: 'all', city: 'all', deal: 'all', badge: '', favOnly: false, limit: 9 });
    if (a.dataset.type) state.type = a.dataset.type;
    if (a.dataset.city) state.city = a.dataset.city;
    if (a.dataset.deal) state.deal = a.dataset.deal;
    if (a.dataset.badge) state.badge = a.dataset.badge;
    syncControls(); render(); closeDrawer(); scrollToListings();
  });

  /* Hero paieška */
  const heroTabs = $$('.search-tabs button'); let heroDeal = 'parduodama';
  heroTabs.forEach(b => b.addEventListener('click', () => { heroDeal = b.dataset.deal; heroTabs.forEach(x => { x.classList.toggle('is-active', x === b); x.setAttribute('aria-selected', x === b); }); }));
  $('#heroSearch').addEventListener('submit', e => {
    e.preventDefault();
    Object.assign(state, { deal: heroDeal, type: $('#hsType').value, city: $('#hsCity').value, rooms: $('#hsRooms').value, min: '', max: $('#hsMax').value, badge: '', favOnly: false, limit: 9 });
    syncControls(); render(); scrollToListings();
  });
  $('#searchForm').addEventListener('submit', e => {
    e.preventDefault();
    const q = $('#searchInput').value.trim().toLowerCase();
    const hit = LISTINGS.find(l => l.id.toLowerCase() === q || l.addr.toLowerCase().includes(q) || (CITY[l.city] || '').toLowerCase() === q);
    clear();
    if (hit && q) { state.city = hit.city; if (q.startsWith('pnt')) state.type = hit.type; syncControls(); render(); }
    scrollToListings(); toast(q ? `Paieška: „${$('#searchInput').value.trim()}“ (demo – ieško tik pavyzdiniuose skelbimuose)` : 'Įveskite gatvę, miestą arba skelbimo ID');
  });

  /* Demo nuorodos ir formos */
  document.addEventListener('click', e => {
    const d = e.target.closest('[data-demo]'); if (!d) return;
    e.preventDefault(); toast('Demo versija – ši nuoroda veiks tikroje svetainėje');
  });
  $$('form[data-demo-form]').forEach(f => f.addEventListener('submit', e => { e.preventDefault(); toast('Demo versija – forma duomenų nesiunčia'); f.reset(); }));

  /* ---------- Mobilus meniu ---------- */
  const drawer = $('#drawerNav'), backdrop = $('#backdrop'), burger = $('#burger');
  const openDrawer = () => { drawer.classList.add('is-open'); backdrop.classList.add('is-open'); drawer.setAttribute('aria-hidden', 'false'); burger.setAttribute('aria-expanded', 'true'); document.body.classList.add('no-scroll'); };
  const closeDrawer = () => { drawer.classList.remove('is-open'); backdrop.classList.remove('is-open'); drawer.setAttribute('aria-hidden', 'true'); burger.setAttribute('aria-expanded', 'false'); document.body.classList.remove('no-scroll'); };
  burger.addEventListener('click', openDrawer);
  backdrop.addEventListener('click', closeDrawer);
  $$('[data-close], .drawer-links a', drawer).forEach(el => el.addEventListener('click', closeDrawer));
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeDrawer(); });

  /* ---------- Antraštė, parallax ---------- */
  const head = $('#siteHead'); const para = $$('[data-parallax]');
  let ticking = false;
  function onScroll() {
    if (ticking) return; ticking = true;
    requestAnimationFrame(() => {
      head.classList.toggle('is-scrolled', scrollY > 10);
      if (!reduceMotion) para.forEach(el => {
        const r = el.parentElement.getBoundingClientRect();
        if (r.bottom < 0 || r.top > innerHeight) return;
        el.style.transform = `translate3d(0,${(r.top + r.height / 2 - innerHeight / 2) * -0.18}px,0)`;
      });
      ticking = false;
    });
  }
  addEventListener('scroll', onScroll, { passive: true }); onScroll();

  /* ---------- Reveal + skaitikliai ---------- */
  const io = new IntersectionObserver(entries => entries.forEach(en => {
    if (!en.isIntersecting) return;
    en.target.classList.add('is-in'); io.unobserve(en.target);
    $$('[data-count]', en.target).forEach(countUp);
  }), { threshold: .15, rootMargin: '0px 0px -8% 0px' });
  $$('.reveal, .reveal-stagger').forEach(el => io.observe(el));
  function countUp(el) {
    const end = +el.dataset.count; if (reduceMotion) { el.textContent = fmt(end); return; }
    const t0 = performance.now(), dur = 1500;
    (function step(t) { const p = Math.min(1, (t - t0) / dur), e = 1 - Math.pow(1 - p, 3); el.textContent = fmt(end * e); if (p < 1) requestAnimationFrame(step); })(t0);
  }

  /* ---------- 3D pakreipimas kategorijų plytelėms ---------- */
  if (!reduceMotion && matchMedia('(hover:hover) and (pointer:fine)').matches) {
    $$('[data-tilt]').forEach(el => {
      el.addEventListener('pointermove', e => {
        const r = el.getBoundingClientRect(), x = (e.clientX - r.left) / r.width - .5, y = (e.clientY - r.top) / r.height - .5;
        el.style.transform = `perspective(900px) rotateX(${(-y * 7).toFixed(2)}deg) rotateY(${(x * 7).toFixed(2)}deg) translateY(-4px)`;
      });
      el.addEventListener('pointerleave', () => { el.style.transform = ''; });
    });
  }

  render();
})();
