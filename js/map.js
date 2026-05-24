/* ========================================
   КАРТА РФ — Mapbox + scrollytelling
   Источник: Natural Earth admin-1 (WGS84)
   ======================================== */

(function () {
  const cfg = window.PRESTOCHI_CONFIG;

  const css = getComputedStyle(document.documentElement);
  const COLORS = {
    base:    css.getPropertyValue('--c-base').trim()    || '#E5E5E5',
    current: css.getPropertyValue('--c-current').trim() || '#C8102E',
    phase1:  css.getPropertyValue('--c-phase1').trim()  || '#E89B3C',
    phase2:  css.getPropertyValue('--c-phase2').trim()  || '#F4C97B',
    phase3:  css.getPropertyValue('--c-phase3').trim()  || '#FBE5B8',
  };

  mapboxgl.accessToken = cfg.mapboxToken;

  const initial = cfg.scenes[0];
  const map = new mapboxgl.Map({
    container: 'map',
    style: cfg.mapStyle,
    center: initial.center,
    zoom: initial.zoom,
    pitch: initial.pitch,
    bearing: initial.bearing,
    minZoom: 1.5,
    maxZoom: 7,
    attributionControl: false,
    projection: 'mercator',
    interactive: false,
  });

  map.addControl(new mapboxgl.AttributionControl({ compact: true }), 'bottom-right');

  window.__cs = {
    map,
    ready: false,
    goToScene: () => {},
  };

  map.on('load', async () => {
    // Скрыть лейблы стран/городов/мест — они светлые и пробиваются сквозь dim-слой.
    // Оставляем только подписи водоёмов и природных объектов (по желанию — тоже можно скрыть).
    const HIDE_PATTERNS = /country-label|state-label|settlement|place-|continent/i;
    map.getStyle().layers.forEach((l) => {
      if (l.type === 'symbol' && HIDE_PATTERNS.test(l.id)) {
        map.setLayoutProperty(l.id, 'visibility', 'none');
      }
    });

    let raw;
    try {
      const res = await fetch(cfg.regionsGeoJsonUrl);
      raw = await res.json();
    } catch (e) {
      console.error('[CS] Не удалось загрузить GeoJSON:', e);
      return;
    }

    // Фильтруем только регионы РФ — несколько вариантов атрибутов на всякий случай.
    // ВАЖНО: Адыгея в Natural Earth имеет adm0_a3 != 'RUS', но adm1_code = 'RUS-2279'.
    const ruFeatures = raw.features.filter((f) => {
      const p = f.properties;
      return (
        p.adm0_a3 === 'RUS' ||
        p.sov_a3 === 'RUS' ||
        p.iso_a2 === 'RU' ||
        p.iso_a2_eh === 'RU' ||
        (p.iso_3166_2 || '').startsWith('RU-') ||
        (p.adm1_code || '').startsWith('RUS-') ||
        /^russia/i.test(p.admin || '') ||
        /^russia/i.test(p.geonunit || '')
      );
    });

    console.log(`[CS] Загружено ${ruFeatures.length} регионов РФ`);

    // Диагностика: ищем Адыгею в исходном массиве, даже если фильтр её срезал
    const adygDebug = raw.features.filter((f) => {
      const all = JSON.stringify(f.properties).toLowerCase();
      return all.includes('adyg');
    });
    if (adygDebug.length) {
      console.log('[CS] DEBUG Adygea features:', adygDebug.map((f) => f.properties));
    } else {
      console.warn('[CS] Адыгея не найдена в исходном GeoJSON вообще');
    }

    // Категоризация — сперва по ISO, затем fallback по имени для анклавов
    // (Natural Earth иногда даёт пустой iso_3166_2 для республик внутри краёв)
    const { current, phase1, phase2 } = cfg.phases;
    const idProp = cfg.regionIdProp;

    // Карта дополнительных имён → ISO (на случай пустого iso_3166_2)
    const NAME_TO_ISO = {
      'adygey':            'RU-AD',
      'adygea':            'RU-AD',
      'republic of adygea':'RU-AD',
      'kabardin-balkar':   'RU-KB',
      'karachay-cherkess': 'RU-KC',
      'north ossetia':     'RU-SE',
      'chechnya':          'RU-CE',
      'ingushetia':        'RU-IN',
      'dagestan':          'RU-DA',
      'kalmyk':            'RU-KL',
      'mariy-el':          'RU-ME',
      'chuvash':           'RU-CU',
      'mordovia':          'RU-MO',
      'udmurt':            'RU-UD',
      'tatarstan':         'RU-TA',
      'bashkortostan':     'RU-BA',
      'karelia':           'RU-KR',
      'komi':              'RU-KO',
    };

    function resolveIso(props) {
      let id = (props[idProp] || '').toUpperCase();
      if (id && id.startsWith('RU-')) return id;
      // Fallback: пытаемся вытащить из ВСЕХ полей имени
      const nameFields = [
        props.name, props.name_en, props.name_long, props.name_alt,
        props.gn_name, props.woe_name, props.admin, props.gn_a1_code,
      ].filter(Boolean).join(' ').toLowerCase();
      for (const key in NAME_TO_ISO) {
        if (nameFields.includes(key)) return NAME_TO_ISO[key];
      }
      return id || nameFields;
    }

    ruFeatures.forEach((f, i) => {
      const id = resolveIso(f.properties);
      let category = 'phase3';
      if (current.includes(id))      category = 'current';
      else if (phase1.includes(id))  category = 'phase1';
      else if (phase2.includes(id))  category = 'phase2';

      if (id === 'RU-AD') {
        if (current.includes('RU-KDA')) category = 'current';
        else if (phase1.includes('RU-KDA')) category = 'phase1';
        else if (phase2.includes('RU-KDA')) category = 'phase2';
        else category = 'phase3';
        f.properties.mergeWithNeighbor = 1;
      }

      f.properties.category = category;
      f.properties.resolvedIso = id;
      f.id = i + 1;
    });

    // Лог регионов, не попавших в фазы (для диагностики анклавов и редких ISO)
    const unmatched = ruFeatures
      .filter((f) => f.properties.category === 'phase3')
      .map((f) => `${f.properties.name} (${f.properties.resolvedIso || '—'})`);
    if (unmatched.length) {
      console.log(`[CS] phase3 / без явной фазы: ${unmatched.length} регионов`, unmatched);
    }

    const regions = { type: 'FeatureCollection', features: ruFeatures };

    map.addSource('ru-regions', {
      type: 'geojson',
      data: regions,
    });

    // Инициализируем feature-state: все регионы стартуют в base
    ruFeatures.forEach((f) => {
      map.setFeatureState(
        { source: 'ru-regions', id: f.id },
        { activePhase: 'base', activeOpacity: 0.58 }
      );
    });

    // Затемнение всего мира кроме РФ — большой прямоугольник под слоем регионов.
    // Российские регионы рисуются поверх с fill-opacity:1 ⇒ остаются яркими.
    map.addSource('world-mask', {
      type: 'geojson',
      data: {
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'Polygon',
          coordinates: [[
            [-180, -85], [180, -85], [180, 85], [-180, 85], [-180, -85],
          ]],
        },
      },
    });
    map.addLayer({
      id: 'world-dim',
      type: 'fill',
      source: 'world-mask',
      paint: {
        'fill-color': '#0B1220',
        'fill-opacity': 0.55,
      },
    }, getFirstSymbolLayerId());

    // Заливка регионов — цвет через feature-state ⇒ работает fill-color-transition
    map.addLayer({
      id: 'regions-fill',
      type: 'fill',
      source: 'ru-regions',
      paint: {
        'fill-color': [
          'match',
          ['coalesce', ['feature-state', 'activePhase'], 'base'],
          'current', COLORS.current,
          'phase1',  COLORS.phase1,
          'phase2',  COLORS.phase2,
          'phase3',  COLORS.phase3,
          /* base */ COLORS.base,
        ],
        'fill-opacity': ['coalesce', ['feature-state', 'activeOpacity'], 0.58],
        'fill-color-transition': { duration: 1600, delay: 0 },
        'fill-opacity-transition': { duration: 1600, delay: 0 },
      },
    }, getFirstSymbolLayerId());

    // Тонкие границы — кроме регионов с флагом mergeWithNeighbor (Адыгея)
    map.addLayer({
      id: 'regions-border',
      type: 'line',
      source: 'ru-regions',
      filter: ['!=', ['get', 'mergeWithNeighbor'], 1],
      paint: {
        'line-color': '#FFFFFF',
        'line-width': 0.6,
      },
    }, getFirstSymbolLayerId());

    // ===== Управление сценами =====
    const source = map.getSource('ru-regions');
    let lastSceneIndex = -1;

    // Грубый центроид (среднее по первой полигональной части) — для каскада
    function roughCentroid(geom) {
      const ring = geom.type === 'MultiPolygon' ? geom.coordinates[0][0] : geom.coordinates[0];
      let sx = 0, sy = 0, n = 0;
      for (const [x, y] of ring) { sx += x; sy += y; n++; }
      return n ? [sx / n, sy / n] : [0, 0];
    }
    regions.features.forEach((f) => {
      f.properties._cx_cy = roughCentroid(f.geometry);
    });

    let cascadeToken = 0; // отменяем предыдущий каскад при новой сцене
    const OPACITY_BASE = 0.58;
    const OPACITY_ACTIVE = 0.96;
    const OPACITY_MS = 900;

    function setRegionVisualState(f, target, token) {
      const ref = { source: 'ru-regions', id: f.id };
      const state = map.getFeatureState(ref) || {};
      const from = typeof state.activeOpacity === 'number' ? state.activeOpacity : OPACITY_BASE;
      const to = target === 'base' ? OPACITY_BASE : OPACITY_ACTIVE;
      const started = performance.now();

      map.setFeatureState(ref, { activePhase: target, activeOpacity: from });

      function tick(now) {
        if (token !== cascadeToken) return;
        const t = Math.min(1, (now - started) / OPACITY_MS);
        const eased = t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
        const activeOpacity = from + (to - from) * eased;
        map.setFeatureState(ref, { activePhase: target, activeOpacity });
        if (t < 1) requestAnimationFrame(tick);
      }

      requestAnimationFrame(tick);
    }

    function applyScene(index) {
      if (index === lastSceneIndex) return;
      lastSceneIndex = index;

      const scene = cfg.scenes[index];
      if (!scene) return;

      const active = new Set(scene.activePhases);

      // Сортируем регионы по расстоянию до центра камеры — ближайшие красятся первыми
      const [cx, cy] = scene.center;
      const ordered = regions.features.slice().sort((a, b) => {
        const [ax, ay] = a.properties._cx_cy;
        const [bx, by] = b.properties._cx_cy;
        return (ax - cx) ** 2 + (ay - cy) ** 2 - ((bx - cx) ** 2 + (by - cy) ** 2);
      });

      // STEP_MS = 0 ⇒ все регионы стартуют crossfade одновременно (плавная одновременная заливка).
      // Поставь >0 (напр. 20-40) чтобы вернуть волну от центра камеры наружу.
      const STEP_MS = 0;
      const token = ++cascadeToken;

      if (STEP_MS === 0) {
        ordered.forEach((f) => {
          const target = active.has(f.properties.category) ? f.properties.category : 'base';
          setRegionVisualState(f, target, token);
        });
      } else {
        ordered.forEach((f, k) => {
          const target = active.has(f.properties.category) ? f.properties.category : 'base';
          setTimeout(() => {
            if (token !== cascadeToken) return;
            setRegionVisualState(f, target, token);
          }, k * STEP_MS);
        });
      }

      map.flyTo({
        center: scene.center,
        zoom: scene.zoom,
        pitch: scene.pitch || 0,
        bearing: scene.bearing || 0,
        duration: scene.duration || 2200,
        essential: true,
        curve: 1.0,
        easing: (t) => t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2,
      });

      window.dispatchEvent(new CustomEvent('cs:scene', { detail: { index, scene } }));
    }

    window.__cs.goToScene = applyScene;
    window.__cs.ready = true;

    if (typeof window.__cs.pendingScene === 'number') {
      applyScene(window.__cs.pendingScene);
    }
  });

  function getFirstSymbolLayerId() {
    const layers = map.getStyle()?.layers || [];
    const sym = layers.find((l) => l.type === 'symbol');
    return sym ? sym.id : undefined;
  }
})();
