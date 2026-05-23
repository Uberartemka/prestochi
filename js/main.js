/* ============================================
   PRESTOCHI — main controller
   - Bearing: idle ping-pong (frames 0..50) + scroll-driven (0..119)
   - Custom JS scroll-snap (медленнее, плавнее) — заменяет CSS scroll-snap
   - Map: scrollytelling через IntersectionObserver
   ============================================ */

(function () {
  if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
  window.scrollTo(0, 0);

  // ===== Элементы =====
  const body         = document.body;
  const cover        = document.querySelector('.cover');
  const counterEl    = document.getElementById('counter-current');
  const legendItems  = document.querySelectorAll('.legend li');
  const stepEls      = document.querySelectorAll('.step');

  // ===== Тема =====
  // Берём тему из data-theme той секции, центр которой ближе всего к центру viewport.
  // Cover = тёмная (по умолчанию), карта (map-section) = светлая, слайды 3-8 = берут свой атрибут.
  const themedSections = Array.from(document.querySelectorAll('.cover, .map-section, .slide'));
  function updateTheme() {
    const vhCenter = window.scrollY + window.innerHeight * 0.5;
    let best = null;
    let bestDist = Infinity;
    themedSections.forEach((el) => {
      const top = el.offsetTop;
      const center = top + el.offsetHeight / 2;
      const d = Math.abs(center - vhCenter);
      if (d < bestDist) { bestDist = d; best = el; }
    });
    let theme = 'dark';
    if (best) {
      if (best.classList.contains('cover')) theme = 'dark';
      else if (best.classList.contains('map-section')) theme = 'light';
      else theme = best.dataset.theme || 'dark';
    }
    body.classList.toggle('theme-dark', theme === 'dark');
    body.classList.toggle('theme-light', theme === 'light');
  }
  let themeScheduled = false;
  window.addEventListener('scroll', () => {
    if (!themeScheduled) {
      themeScheduled = true;
      requestAnimationFrame(() => { updateTheme(); themeScheduled = false; });
    }
  }, { passive: true });
  updateTheme();

  // ===========================================================
  //  CUSTOM SCROLL SNAP: 1 wheel = 1 секция, плавная анимация
  // ===========================================================
  const SCROLL_DURATION = 1400; // ms — длительность снап-перехода (медленно и красиво)
  const WHEEL_DEBOUNCE  = 250;  // ms — защита от инерции трекпада

  let snapTargets = [0]; // абсолютные scrollY-позиции снап-точек
  function recomputeSnapTargets() {
    const targets = [0]; // cover
    // Шаги карты (5 штук) — каждый занимает 100vh внутри map-section
    document.querySelectorAll('.step').forEach((el) => {
      targets.push(Math.round(el.getBoundingClientRect().top + window.scrollY));
    });
    // Остальные слайды (3-8): каждый — 100vh секция в потоке после map-section
    document.querySelectorAll('.slide').forEach((el) => {
      targets.push(Math.round(el.getBoundingClientRect().top + window.scrollY));
    });
    // Сортируем и убираем дубликаты на всякий случай
    snapTargets = Array.from(new Set(targets)).sort((a, b) => a - b);
  }
  recomputeSnapTargets();
  window.addEventListener('resize', recomputeSnapTargets);
  // На случай, если шрифты/изображения сдвинули layout — пересчитать после загрузки
  window.addEventListener('load', recomputeSnapTargets);

  function findCurrentTargetIndex() {
    // Возвращает индекс ближайшей снап-точки к текущему scrollY
    const y = window.scrollY;
    let bestIdx = 0;
    let bestDist = Infinity;
    snapTargets.forEach((t, i) => {
      const d = Math.abs(t - y);
      if (d < bestDist) { bestDist = d; bestIdx = i; }
    });
    return bestIdx;
  }

  let isAnimatingScroll = false;
  function smoothScrollTo(targetY, duration) {
    return new Promise((resolve) => {
      const startY = window.scrollY;
      const dist = targetY - startY;
      if (Math.abs(dist) < 1) { resolve(); return; }
      const t0 = performance.now();
      isAnimatingScroll = true;
      function step(now) {
        const p = Math.min(1, (now - t0) / duration);
        // easeInOutCubic
        const eased = p < 0.5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2;
        window.scrollTo(0, startY + dist * eased);
        if (p < 1) requestAnimationFrame(step);
        else { isAnimatingScroll = false; resolve(); }
      }
      requestAnimationFrame(step);
    });
  }

  function snapToIndex(idx) {
    idx = Math.max(0, Math.min(snapTargets.length - 1, idx));
    if (snapTargets[idx] === undefined) return;
    smoothScrollTo(snapTargets[idx], SCROLL_DURATION);
  }

  // ===== Wheel =====
  let lastWheelTime = 0;
  window.addEventListener('wheel', (e) => {
    e.preventDefault();
    if (isAnimatingScroll) return;
    const now = performance.now();
    if (now - lastWheelTime < WHEEL_DEBOUNCE) return;
    if (Math.abs(e.deltaY) < 5) return;
    lastWheelTime = now;
    const cur = findCurrentTargetIndex();
    if (e.deltaY > 0) snapToIndex(cur + 1);
    else snapToIndex(cur - 1);
  }, { passive: false });

  // ===== Touch =====
  let touchStartY = 0;
  window.addEventListener('touchstart', (e) => {
    touchStartY = e.touches[0].clientY;
  }, { passive: true });
  window.addEventListener('touchend', (e) => {
    if (isAnimatingScroll) return;
    const dy = touchStartY - e.changedTouches[0].clientY;
    if (Math.abs(dy) < 50) return;
    const cur = findCurrentTargetIndex();
    if (dy > 0) snapToIndex(cur + 1);
    else snapToIndex(cur - 1);
  });

  // ===== Keys =====
  window.addEventListener('keydown', (e) => {
    if (isAnimatingScroll) { e.preventDefault(); return; }
    const cur = findCurrentTargetIndex();
    if (e.key === 'ArrowDown' || e.key === 'PageDown' || e.code === 'Space' || e.key === 'ArrowRight') {
      e.preventDefault(); snapToIndex(cur + 1);
    } else if (e.key === 'ArrowUp' || e.key === 'PageUp' || e.key === 'ArrowLeft') {
      e.preventDefault(); snapToIndex(cur - 1);
    } else if (e.key === 'Home') {
      e.preventDefault(); snapToIndex(0);
    } else if (e.key === 'End') {
      e.preventDefault(); snapToIndex(snapTargets.length - 1);
    }
  });

  // ===== КАРТА: смена сцен по скроллу =====
  const sceneToLegend = {
    0: [], 1: [0], 2: [0, 1], 3: [0, 1, 2], 4: [0, 1, 2, 3],
  };

  const observer = new IntersectionObserver(
    (entries) => {
      let best = null;
      entries.forEach((e) => {
        if (e.isIntersecting && (!best || e.intersectionRatio > best.intersectionRatio)) {
          best = e;
        }
      });
      if (best) {
        const idx = parseInt(best.target.dataset.scene, 10);
        activateScene(idx);
      }
    },
    {
      rootMargin: '-40% 0px -40% 0px',
      threshold: [0, 0.25, 0.5, 0.75, 1],
    }
  );
  stepEls.forEach((s) => observer.observe(s));

  function activateScene(index) {
    if (window.__cs && window.__cs.ready) {
      window.__cs.goToScene(index);
    } else {
      window.__cs = window.__cs || {};
      window.__cs.pendingScene = index;
    }
    const set = new Set(sceneToLegend[index] || []);
    legendItems.forEach((li, i) => li.classList.toggle('active', set.has(i)));
  }

  // ===== Счётчик закрашенных регионов по фазам =====
  // На каждой сцене считаем кумулятивно сколько регионов окрашено и плавно анимируем.
  const TOTAL_REGIONS = 85;
  const phasesCfg = (window.PRESTOCHI_CONFIG && window.PRESTOCHI_CONFIG.phases) || {};
  const phaseSizes = {
    current: (phasesCfg.current || []).length,            // 3
    phase1:  (phasesCfg.phase1  || []).length,            // ~9
    phase2:  (phasesCfg.phase2  || []).length,            // ~40
  };
  // phase3 — все остальные регионы РФ
  phaseSizes.phase3 = Math.max(
    0,
    TOTAL_REGIONS - phaseSizes.current - phaseSizes.phase1 - phaseSizes.phase2
  );

  function sceneCount(sceneIdx) {
    const scene = (window.PRESTOCHI_CONFIG.scenes || [])[sceneIdx];
    if (!scene || !scene.activePhases) return 0;
    return scene.activePhases.reduce((sum, p) => sum + (phaseSizes[p] || 0), 0);
  }

  // Инициализируем счётчик нулём (на сцене 0 ничего не закрашено)
  if (counterEl) counterEl.textContent = '0';
  let currentCount = 0;

  window.addEventListener('cs:scene', (e) => {
    const target = sceneCount(e.detail.index);
    if (target === currentCount) return;
    // Длительность пропорциональна разнице — большие скачки анимируются дольше
    const delta = Math.abs(target - currentCount);
    const duration = Math.min(1800, 500 + delta * 25);
    animateCounter(counterEl, currentCount, target, duration);
    currentCount = target;
  });
  // ===== REVEAL: stagger fade-in для всех [data-reveal] =====
  // Группируем по родительской секции, чтобы stagger считался локально на каждом слайде.
  document.querySelectorAll('.slide, .cover').forEach((section) => {
    const reveals = section.querySelectorAll('[data-reveal]');
    reveals.forEach((el, i) => el.style.setProperty('--i', i));
  });

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('in-view');
          // Один раз — не отписываем для эффекта повторного входа? оставляем подписку,
          // чтобы можно было повторно «оживать» при скролле назад.
        } else {
          // При уходе из viewport — снимаем класс, чтобы при возврате анимация проиграла снова
          e.target.classList.remove('in-view');
        }
      });
    },
    { threshold: 0.15, rootMargin: '0px 0px -10% 0px' }
  );
  document.querySelectorAll('[data-reveal]').forEach((el) => revealObserver.observe(el));

  // ===== COUNT-UP: метрики слайда «Результаты» 0 → N =====
  const metricObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        if (el.dataset.counted) return;
        el.dataset.counted = '1';
        const to = parseInt(el.dataset.countTo, 10) || 0;
        const prefix = el.dataset.countPrefix || '';
        const suffix = el.dataset.countSuffix || '';
        const unitHTML = suffix
          ? `<span class="metric-unit">${suffix}</span>`
          : '';
        const duration = 1500;
        const t0 = performance.now();
        function tick(now) {
          const p = Math.min(1, (now - t0) / duration);
          const eased = 1 - Math.pow(1 - p, 3);
          const v = Math.round(to * eased);
          el.innerHTML = `${prefix}${v}${unitHTML}`;
          if (p < 1) requestAnimationFrame(tick);
        }
        // Небольшая задержка чтобы совпало с reveal-fade родительского .metric
        setTimeout(() => requestAnimationFrame(tick), 200);
      });
    },
    { threshold: 0.5 }
  );
  document
    .querySelectorAll('.metric-num[data-count-to]')
    .forEach((el) => metricObserver.observe(el));

  function animateCounter(el, from, to, duration) {
    const t0 = performance.now();
    function tick(now) {
      const p = Math.min(1, (now - t0) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(from + (to - from) * eased);
      if (p < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }
})();
