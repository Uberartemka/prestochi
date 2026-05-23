/* ========================================
   КОНФИГ ПРЕЗЕНТАЦИИ
   ======================================== */

window.PRESTOCHI_CONFIG = {
  // Mapbox public token (pk.*) — публичный по дизайну; защита через URL-restriction в Mapbox dashboard.
  mapboxToken: 'pk.eyJ1IjoiaGVyb2RvdHVzNzciLCJhIjoiY21waWdzdnNjMTZxMzJvcjA1dXpudmw2OSJ9.hJ-C3RTqzkVhks9je2wvYw',

  mapStyle: 'mapbox://styles/mapbox/light-v11',

  // Natural Earth admin-1 (50m) — WGS84, public domain.
  // Фильтруется по adm0_a3 === 'RUS' в map.js.
  regionsGeoJsonUrl: 'https://cdn.jsdelivr.net/gh/nvkelso/natural-earth-vector@master/geojson/ne_50m_admin_1_states_provinces.geojson',

  // Свойство для идентификации региона
  regionIdProp: 'iso_3166_2', // например "RU-VOR"

  // Регионы по фазам (ISO 3166-2 коды)
  phases: {
    current: ['RU-VOR', 'RU-BEL', 'RU-KDA'],

    phase1: [
      'RU-ROS', // Ростовская
      'RU-STA', // Ставропольский край
      'RU-KRS', // Курская
      'RU-LIP', // Липецкая
      'RU-VGG', // Волгоградская
      // RU-AD (Адыгея) — слита с Краснодарским краем в map.js (анклав)
      'RU-KC',  // Карачаево-Черкесия
      'RU-KB',  // Кабардино-Балкария
      'RU-TAM', // Тамбовская
      'RU-ORL', // Орловская
    ],

    phase2: [
      'RU-MOW', 'RU-MOS', 'RU-SPE', 'RU-LEN',
      'RU-TA', 'RU-SAM', 'RU-NIZ', 'RU-TUL', 'RU-RYA',
      'RU-YAR', 'RU-IVA', 'RU-VLA', 'RU-TVE', 'RU-KLU',
      'RU-BRY', 'RU-SMO', 'RU-KOS', 'RU-PNZ', 'RU-SAR',
      'RU-ULY', 'RU-CU', 'RU-ME', 'RU-MO', 'RU-BA',
      'RU-PER', 'RU-UD', 'RU-KIR', 'RU-ORE', 'RU-NGR',
      'RU-PSK', 'RU-VLG', 'RU-ARK', 'RU-MUR', 'RU-KR',
      'RU-KL', 'RU-KO', 'RU-DA', 'RU-IN', 'RU-SE',
      'RU-CE',
    ],
    // Фаза 3 — все остальные регионы РФ (Урал, Сибирь, ДВ) подкрашиваются автоматически
  },

  // Сцены: каждый шаг скролла = одна сцена
  // duration — переопределяет default 2200ms (для индивидуальной мягкости)
  scenes: [
    { center: [100, 64], zoom: 2.4, pitch: 0, bearing: 0, activePhases: [] },
    { center: [45, 48], zoom: 4.6, pitch: 0, bearing: 0, activePhases: ['current'], duration: 3000 },
    { center: [50, 49], zoom: 3.9, pitch: 0, bearing: 0, activePhases: ['current', 'phase1'] },
    { center: [60, 56], zoom: 3.2, pitch: 0, bearing: 0, activePhases: ['current', 'phase1', 'phase2'] },
    { center: [100, 64], zoom: 2.5, pitch: 0, bearing: 0, activePhases: ['current', 'phase1', 'phase2', 'phase3'] },
  ],
};
