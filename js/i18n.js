/* ============================================
   I18N — двуязычность RU ⇄ 中文
   ============================================ */

window.PRESTOCHI_I18N = (function () {
  const STORAGE_KEY = 'cs-lang';
  const DEFAULT_LANG = 'ru';

  // ─── СЛОВАРЬ ───
  // Ключ один — два варианта (ru, zh). Значение может содержать HTML.
  const D = {
    // Top bar / общие
    'brand.name':      { ru: 'КОМПОНЕНТ&nbsp;СЕРВИС', zh: '康鹏服务' },
    'lang.label.ru':   { ru: 'RU', zh: 'RU' },
    'lang.label.zh':   { ru: '中文', zh: '中文' },
    'scroll.cue':      { ru: 'Прокрутите вниз', zh: '向下滚动' },

    // ─── COVER ───
    'cover.eyebrow':   { ru: 'Презентация для фабрики FKD · 2025', zh: '致 FKD 工厂的提案 · 2025' },
    'cover.title':     {
      ru: '<span class="cover-line">Развитие бренда</span><span class="cover-line"><em>HHB</em></span><span class="cover-line">в&nbsp;России</span>',
      zh: '<span class="cover-line">HHB 品牌</span><span class="cover-line">在俄罗斯的</span><span class="cover-line"><em>发展</em></span>',
    },
    'cover.by':        { ru: 'Презентует <strong>Кристина</strong> · Компонент&nbsp;Сервис', zh: '演讲人：<strong>克里斯季娜</strong> · 康鹏服务' },

    // ─── MAP / INFO PANEL ───
    'map.eyebrow':     { ru: 'География', zh: '业务覆盖范围' },
    'map.title':       { ru: 'Черноземье —<br />главный сельхоз регион РФ', zh: '黑土区 —<br />俄罗斯核心农业区' },
    'map.subtitle':    { ru: 'Доминация в&nbsp;Черноземье и&nbsp;выход на&nbsp;Юг', zh: '立足黑土区，向南部地区发展' },

    'map.counter.regions': { ru: 'регионов', zh: '个地区' },

    'map.legend.current.title': { ru: 'Доминируем',  zh: '核心地区' },
    'map.legend.current.desc':  { ru: 'Воронеж · Белгород · Курск · Липецк · Тамбов', zh: '沃罗涅日 · 别尔哥罗德 · 库尔斯克 · 利佩茨克 · 坦波夫' },
    'map.legend.phase1.title':  { ru: 'Фаза 1',   zh: '第一阶段' },
    'map.legend.phase1.desc':   { ru: 'Ростов · Краснодар · Ставрополье', zh: '罗斯托夫 · 克拉斯诺达尔 · 斯塔夫罗波尔' },
    'map.legend.phase2.title':  { ru: 'Фаза 2',   zh: '第二阶段' },
    'map.legend.phase2.desc':   { ru: 'Регионы с&nbsp;развитой логистикой', zh: '物流网络发达地区' },
    'map.legend.phase3.title':  { ru: 'Фаза 3',   zh: '第三阶段' },
    'map.legend.phase3.desc':   { ru: 'Объединение регионов в&nbsp;сеть', zh: '区域整合为统一网络' },

    // ─── MAP STEPS ───
    'step1.eyebrow': { ru: '01 · Россия',         zh: '01 · 俄罗斯' },
    'step1.title':   { ru: 'Развитие бренда HHB<br />в&nbsp;России', zh: 'HHB 品牌<br />在俄罗斯的发展' },
    'step1.text':    { ru: 'Цель презентации — показать фабрике FKD, как Компонент&nbsp;Сервис может развивать бренд HHB на&nbsp;российском рынке.',
                       zh: '本提案旨在向 FKD 工厂展示康鹏服务如何在俄罗斯市场发展 HHB 品牌。' },

    'step2.eyebrow': { ru: '02 · Опорные регионы',  zh: '02 · 核心地区' },
    'step2.title':   { ru: 'Черноземье — зона доминации',  zh: '黑土区 — 核心优势区域' },
    'step2.text':    { ru: '<strong>Воронеж, Белгород, Курск, Липецк и&nbsp;Тамбов</strong> — ключевая территория: главный сельхоз регион РФ и&nbsp;база для развития HHB.',
                       zh: '<strong>沃罗涅日、别尔哥罗德、库尔斯克、利佩茨克和坦波夫</strong>是核心区域：俄罗斯主要农业地区，也是 HHB 发展的基础。' },

    'step3.eyebrow': { ru: '03 · Фаза 1',         zh: '03 · 第一阶段' },
    'step3.title':   { ru: 'Выход на&nbsp;Юг', zh: '向南部地区发展' },
    'step3.text':    { ru: 'Следующий шаг — <strong>Ростов, Краснодар, Ставрополье</strong> и&nbsp;другие южные территории с&nbsp;сильной аграрной и&nbsp;промышленной базой.',
                       zh: '下一步是进入<strong>罗斯托夫、克拉斯诺达尔、斯塔夫罗波尔</strong>及其他拥有强大农业和工业基础的南部地区。' },

    'step4.eyebrow': { ru: '04 · Фаза 2',         zh: '04 · 第二阶段' },
    'step4.title':   { ru: 'Регионы с&nbsp;развитой логистикой', zh: '物流网络发达地区' },
    'step4.text':    { ru: 'Развитие строится через объединение регионов, где уже есть понятная логистика, клиентская база и&nbsp;потенциал для корпусных подшипников.',
                       zh: '发展将围绕物流清晰、客户基础成熟且带座轴承需求潜力高的地区进行整合。' },

    'step5.eyebrow': { ru: '05 · Цель',           zh: '05 · 目标' },
    'step5.title':   { ru: 'Единая сеть развития', zh: '统一发展网络' },
    'step5.text':    { ru: 'Финальная логика — связать Черноземье, Юг и&nbsp;логистически сильные регионы в&nbsp;единую сеть продвижения HHB.',
                       zh: '最终逻辑是将黑土区、南部地区和物流优势地区连接成 HHB 推广的统一网络。' },

    // ─── СЛАЙД 3 — РЕЗУЛЬТАТЫ ───
    'results.eyebrow': { ru: '03 · Результаты прямо сейчас', zh: '03 · 现有成果' },
    'results.title':   { ru: 'HHB уже входит<br />в&nbsp;<em>клиентскую базу</em>',
                         zh: 'HHB 已进入<br /><em>我们的客户基础</em>' },
    'results.m1.label': { ru: 'клиентов уже<br />попробовали HHB', zh: '客户已经<br />试用 HHB' },
    'results.m2.label': { ru: 'компаний используют HHB<br />на&nbsp;100% по&nbsp;корпусным', zh: '企业在带座轴承方向<br />100% 使用 HHB' },
    'results.m3.label': { ru: 'HHB — один из&nbsp;ключевых брендов<br />корпусных подшипников', zh: 'HHB 是带座轴承<br />关键品牌之一' },
    'results.footer':   { ru: '<strong>Курск&nbsp;Агротерминал</strong> — один из&nbsp;крупных клиентов, с&nbsp;которым мы&nbsp;работаем по&nbsp;направлению корпусных подшипников.',
                          zh: '<strong>Kursk Agroterminal</strong> 是我们在带座轴承方向合作的重要客户之一。' },

    // ─── СЛАЙД 4 — ГРАФИК РОСТА ───
    'growth.eyebrow': { ru: '04 · Траектория роста', zh: '04 · 增长轨迹' },
    'growth.title':   { ru: 'От первых внедрений<br />к&nbsp;<em>ёмкости Черноземья</em>',
                        zh: '从首批导入<br />到<em>黑土区市场容量</em>' },
    'growth.lead':    { ru: 'Сейчас в&nbsp;нашей базе около <strong>600 клиентов</strong>. HHB уже попробовали <strong>100 компаний</strong>, из&nbsp;них <strong>50</strong> используют HHB на&nbsp;100% по&nbsp;корпусным подшипникам. Ёмкость только Черноземья по&nbsp;корпусным — около <strong>1000 компаний</strong>; Юг добавит сопоставимый потенциал.',
                        zh: '目前我们的客户基础约为 <strong>600 家</strong>。已有 <strong>100 家</strong>试用 HHB，其中 <strong>50 家</strong>在带座轴承方向 100% 使用 HHB。仅黑土区带座轴承市场容量约 <strong>1000 家企业</strong>；南部地区还将带来同等潜力。' },
    'growth.s1.label':{ ru: 'клиентов<br />попробовали HHB', zh: '已试用 HHB<br />客户数' },
    'growth.s2.label':{ ru: 'компаний на&nbsp;100% HHB<br />по&nbsp;корпусным', zh: '带座轴承方向<br />100% 使用 HHB' },
    'growth.s3.label':{ ru: 'ёмкость Черноземья<br />только корпусные', zh: '黑土区容量<br />仅带座轴承' },
    'growth.step1.eyebrow': { ru: 'Точка отсчёта · 2024', zh: '起点 · 2024' },
    'growth.step1.title':   { ru: 'Первые поставки HHB',     zh: 'HHB 首批供货' },
    'growth.step1.text':    { ru: 'На старте бренд только входил в&nbsp;клиентскую базу и&nbsp;формировал первые устойчивые продажи.',
                              zh: '起步阶段，品牌刚进入客户基础并形成首批稳定销售。' },
    'growth.step2.eyebrow': { ru: 'Сегодня · 2026', zh: '现状 · 2026' },
    'growth.step2.title':   { ru: 'Первые внедрения HHB',  zh: 'HHB 首批导入' },
    'growth.step2.text':    { ru: 'Сегодня HHB уже попробовали <strong>100 клиентов</strong>. Из&nbsp;них <strong>50 компаний</strong> используют HHB на&nbsp;100% именно по&nbsp;корпусным подшипникам.',
                              zh: '目前已有 <strong>100 家客户</strong>试用 HHB。其中 <strong>50 家企业</strong>在带座轴承方向 100% 使用 HHB。' },
    'growth.step3.eyebrow': { ru: 'Цель · 2028', zh: '目标 · 2028' },
    'growth.step3.title':   { ru: 'Ёмкость только Черноземья — 1000 компаний', zh: '仅黑土区容量 — 1000 家企业' },
    'growth.step3.text':    { ru: 'Это расчёт только по&nbsp;корпусным подшипникам и&nbsp;только по&nbsp;Черноземью. Южные регионы могут дать сопоставимую ёмкость, а&nbsp;расширение SKU увеличит потенциал проекта.',
                              zh: '该测算仅针对带座轴承，且仅限黑土区。南部地区可带来同等容量，而 SKU 扩展将进一步提升项目潜力。' },
    'growth.axis':    { ru: 'Клиенты и&nbsp;ёмкость рынка по&nbsp;корпусным подшипникам', zh: '带座轴承客户与市场容量' },
    'growth.legend.history': { ru: 'факт — достигнуто', zh: '实际达成' },
    'growth.legend.plan':    { ru: 'план — проекция роста', zh: '计划预测' },

    // ─── СЛАЙД 5 — PROOF BRIDGE ───
    'proof.eyebrow': { ru: '05 · Доказательство масштаба', zh: '05 · 规模证明' },
    'proof.left.label': { ru: 'клиентов<br />попробовали HHB', zh: '客户<br />已试用 HHB' },
    'proof.right.label': { ru: 'компаний уже на&nbsp;100% HHB<br />по&nbsp;корпусным', zh: '企业在带座轴承方向<br />100% 使用 HHB' },
    'proof.title': { ru: 'От теста к&nbsp;полному переходу<br />по&nbsp;<em>корпусным подшипникам</em>',
                     zh: '从试用到带座轴承方向<br /><em>全面转用</em>' },
    'proof.lead': { ru: 'Это только первая стадия внедрения. Когда клиент переводит корпусные подшипники на&nbsp;HHB полностью, его потребность растёт; дополнительно можно расширять линейку SKU за&nbsp;пределы текущих позиций.',
                    zh: '这只是导入的第一阶段。当客户在带座轴承方向全面转用 HHB 后，需求将增长；同时还可以在现有型号之外扩展 SKU。' },
    'proof.tag1': { ru: 'агрохолдинги', zh: '农业控股' },
    'proof.tag2': { ru: 'элеваторы', zh: '粮仓' },
    'proof.tag3': { ru: 'переработка', zh: '加工企业' },
    'proof.tag4': { ru: 'машиностроение', zh: '机械制造' },
    'proof.tag5': { ru: 'сервисные компании', zh: '服务公司' },
    'proof.tag6': { ru: 'промышленность РФ', zh: '俄罗斯工业' },

    // ─── СЛАЙД 6 — КЛИЕНТЫ ───
    'clients.eyebrow': { ru: '06 · Сферы поставок', zh: '06 · 供货方向' },
    'clients.title':   { ru: 'Клиенты, с&nbsp;которыми<br />мы работаем в&nbsp;агросекторе',
                         zh: '我们在农业领域<br />合作的客户' },
    'clients.lead':    { ru: 'Фокус — агрохолдинги, переработка, элеваторы и&nbsp;предприятия, где корпусные подшипники являются ключевой номенклатурой.',
                         zh: '重点是农业控股、加工企业、粮仓及带座轴承为关键品类的企业。' },
    'clients.dir1':    { ru: 'Агрохолдинги', zh: '农业控股' },
    'clients.dir2':    { ru: 'Переработка', zh: '加工企业' },
    'clients.dir3':    { ru: 'Элеваторы', zh: '粮仓' },
    'clients.market1': { ru: 'Мираторг', zh: 'Miratorg' },
    'clients.market2': { ru: 'Черкизово', zh: 'Cherkizovo' },
    'clients.market3': { ru: 'Курск&nbsp;Агротерминал', zh: 'Kursk Agroterminal' },
    'clients.market4': { ru: 'Содружество', zh: 'Sodrugestvo' },
    'clients.market5': { ru: 'ЭкоНива', zh: 'EkoNiva' },
    'clients.market6': { ru: 'Благо', zh: 'Blago' },
    'clients.market7': { ru: 'Коблик', zh: 'Koblik' },
    'clients.market8': { ru: 'Черноземье Агрохолдинг', zh: 'Chernozemye Agroholding' },
    'clients.market9': { ru: 'Агротехгарант', zh: 'Agrotekhgarant' },
    'clients.market10': { ru: 'ГКЗ', zh: 'GKZ' },
    'clients.market11': { ru: 'Агроэко', zh: 'Agroeko' },
    'clients.plus':    { ru: '600 клиентов в&nbsp;базе', zh: '客户基础 600 家' },
    'clients.and_more':{ ru: 'ключевые клиенты и&nbsp;агропредприятия', zh: '核心客户与农业企业' },
    'clients.footer':  { ru: 'Этого списка достаточно для демонстрации клиентской базы: больше компаний на&nbsp;слайде не&nbsp;нужно.',
                         zh: '该名单足以展示客户基础：本页无需添加更多公司。' },

    // ─── СЛАЙД 7 — МЕТОД ───
    'method.eyebrow': { ru: '07 · Маркетинг FKD/HHB', zh: '07 · FKD/HHB 市场推广' },
    'method.title':   { ru: 'Маркетинговые мероприятия<br />для продвижения <em>FKD/HHB</em>',
                        zh: '推广 <em>FKD/HHB</em><br />的市场活动' },

    'method.s1.h': { ru: 'Выставки и&nbsp;презентации', zh: '展会与品牌展示' },
    'method.s1.p': { ru: 'Участие в&nbsp;крупных выставках и&nbsp;презентациях бренда FKD/HHB.',
                     zh: '参加大型展会并进行 FKD/HHB 品牌展示。' },

    'method.s2.h': { ru: 'WEB-сайт о&nbsp;бренде', zh: '品牌网站' },
    'method.s2.p': { ru: 'Создание и&nbsp;продвижение WEB-сайта о&nbsp;бренде FKD/HHB.',
                     zh: '建立并推广 FKD/HHB 品牌网站。' },

    'method.s3.h': { ru: 'Интернет и&nbsp;мессенджеры', zh: '互联网与通讯软件广告' },
    'method.s3.p': { ru: 'Реклама бренда в&nbsp;сети интернет и&nbsp;в&nbsp;мессенджерах.',
                     zh: '在互联网和通讯软件中进行品牌广告推广。' },

    'method.s4.h': { ru: 'Бизнес-презентации', zh: '企业商务展示' },
    'method.s4.p': { ru: 'Бизнес-презентации FKD/HHB на&nbsp;крупных предприятиях.',
                     zh: '在大型企业进行 FKD/HHB 商务展示。' },

    'method.s5.h': { ru: 'Каталог на&nbsp;русском языке', zh: '俄文目录' },
    'method.s5.p': { ru: 'Создание и&nbsp;печать каталога FKD/HHB на&nbsp;русском языке.',
                     zh: '制作并印刷俄文 FKD/HHB 产品目录。' },

    'method.s6.h': { ru: 'Мерч и&nbsp;рекламная продукция', zh: '品牌周边与广告材料' },
    'method.s6.p': { ru: 'Создание оригинального мерча и&nbsp;рекламной продукции FKD/HHB.',
                     zh: '制作 FKD/HHB 品牌周边和广告材料。' },

    // ─── СЛАЙД 8 — MOQ ───
    'moq.eyebrow': { ru: '08 · Предложение по&nbsp;MOQ', zh: '08 · MOQ 建议' },
    'moq.title':   { ru: 'Гибкий MOQ для быстрого<br />роста бренда <em>HHB</em>',
                     zh: '通过灵活 MOQ<br />加速 <em>HHB</em> 品牌增长' },
    'moq.m1.label': { ru: 'согласовать минимальные партии<br />по&nbsp;ключевым позициям', zh: '针对关键型号<br />协商最低起订量' },
    'moq.m2.label': { ru: 'формировать смешанные контейнеры<br />под спрос клиентов', zh: '按客户需求<br />组合混装集装箱' },
    'moq.m3.label': { ru: 'масштабировать закупки<br />по&nbsp;плану 2026→2028', zh: '按 2026→2028 计划<br />扩大采购' },
    'moq.footer': { ru: 'Предлагаем фабрике FKD согласовать гибкие условия MOQ: это позволит быстрее переводить клиентов на&nbsp;HHB, закрывать ёмкость Черноземья, затем масштабировать тот&nbsp;же подход на&nbsp;Юг и&nbsp;расширять SKU-линейку.',
                    zh: '建议 FKD 工厂确认灵活的 MOQ 条件：这将帮助客户更快转用 HHB，覆盖黑土区容量，随后将同样模式扩展到南部地区并扩大 SKU 产品线。' },

    // ─── СЛАЙД 10 — РАЗВИЛКА ───
    'fork.eyebrow': { ru: '10 · Развилка', zh: '10 · 关键抉择' },
    'fork.title':   { ru: 'Что мы предлагаем<br />закрепить <em>соглашением</em>',
                      zh: '我们建议通过<em>协议</em><br />确认的内容' },

    'fork.pos.title': { ru: 'Предлагаем', zh: '我们建议' },
    'fork.pos.i1': { ru: 'Закрепить регион <strong>Черноземье</strong> за ООО «КС»', zh: '将<strong>黑土区</strong>指定给康鹏服务负责' },
    'fork.pos.i2': { ru: 'Предоставить сертификат дилера FKD/HHB', zh: '提供 FKD/HHB 经销商证书' },
    'fork.pos.i3': { ru: 'Предоставить гарантии отсутствия новых контрактов в&nbsp;Черноземье', zh: '保证黑土区不签署新合同' },
    'fork.pos.i4': { ru: 'Предоставить время на&nbsp;развитие и&nbsp;продвижение бренда', zh: '给予品牌发展和推广时间' },
    'fork.pos.i5': { ru: 'Перевести сотрудничество в&nbsp;стратегический формат', zh: '将合作转为战略合作' },

    'fork.neg.title': { ru: 'Цель проекта', zh: '项目目标' },
    'fork.neg.i1': { ru: 'Скомплектовать необходимые складские запасы', zh: '建立必要库存' },
    'fork.neg.i2': { ru: 'Сделать FKD/HHB популярным в&nbsp;регионах', zh: '提升 FKD/HHB 在地区的知名度' },
    'fork.neg.i3': { ru: 'Развивать бренд в&nbsp;Черноземье и&nbsp;России', zh: '在黑土区和俄罗斯发展品牌' },
    'fork.neg.i4': { ru: 'Увеличивать продажи FKD/HHB', zh: '增加 FKD/HHB 销售' },
    'fork.neg.i5': { ru: 'Сокращать распространение конкурирующих брендов', zh: '减少竞争品牌扩散' },

    // ─── СЛАЙД 8 — ФИНАЛ ───
    'final.eyebrow': { ru: 'Предложение', zh: '提议' },
    'final.title':   { ru: 'Предлагаем сделать сотрудничество<br /><em>стратегическим</em>',
                       zh: '建议将合作发展为<br /><em>战略合作</em>' },
    'final.sub':     { ru: 'Проект развития FKD/HHB в&nbsp;Черноземье и&nbsp;России', zh: 'FKD/HHB 在黑土区和俄罗斯的发展项目' },

    'final.p1': { ru: '<strong>Закрепить</strong><br />Черноземье за ООО «КС»', zh: '<strong>确认</strong><br />黑土区由康鹏服务负责' },
    'final.p2': { ru: '<strong>Предоставить</strong><br />сертификат дилера FKD/HHB', zh: '<strong>提供</strong><br />FKD/HHB 经销商证书' },
    'final.p3': { ru: '<strong>План закупок:</strong><br />6 контейнеров в&nbsp;2026, 9 в&nbsp;2027, 12 в&nbsp;2028', zh: '<strong>采购计划：</strong><br />2026 年 6 个，2027 年 9 个，2028 年 12 个' },

    'final.sig.name': { ru: 'Кристина<br /><small>Компонент&nbsp;Сервис</small>', zh: '克里斯季娜<br /><small>康鹏服务</small>' },
    'final.sig.cta':  { ru: 'Готовы обсудить условия',                            zh: '期待与您洽谈条款' },
  };

  // ─── API ───
  function get(key, lang) {
    return (D[key] && D[key][lang]) || '';
  }

  function applyLang(lang) {
    if (lang !== 'ru' && lang !== 'zh') lang = DEFAULT_LANG;
    document.documentElement.lang = lang === 'zh' ? 'zh' : 'ru';
    document.body.classList.toggle('lang-ru', lang === 'ru');
    document.body.classList.toggle('lang-zh', lang === 'zh');

    const other = lang === 'ru' ? 'zh' : 'ru';

    // Главные блоки — текущий язык
    document.querySelectorAll('[data-i18n]').forEach((el) => {
      const key = el.getAttribute('data-i18n');
      const val = get(key, lang);
      if (val) el.innerHTML = val;
    });
    // Вторичные блоки — противоположный язык (мелким шрифтом)
    document.querySelectorAll('[data-i18n-sec]').forEach((el) => {
      const key = el.getAttribute('data-i18n-sec');
      const val = get(key, other);
      if (val) el.innerHTML = val;
    });

    // Подсветить активную кнопку
    document.querySelectorAll('.lang-btn').forEach((btn) => {
      btn.classList.toggle('active', btn.getAttribute('data-lang-id') === lang);
    });

    try { localStorage.setItem(STORAGE_KEY, lang); } catch (e) {}
    window.dispatchEvent(new CustomEvent('cs:lang', { detail: { lang } }));
  }

  function getStored() {
    try { return localStorage.getItem(STORAGE_KEY); } catch (e) { return null; }
  }

  function init() {
    const stored = getStored();
    const initial = stored || DEFAULT_LANG;
    applyLang(initial);

    // Кликабельный переключатель в top-bar
    const sw = document.querySelector('.lang-switch');
    if (sw) {
      sw.addEventListener('click', (e) => {
        const target = e.target.closest('[data-lang-set]');
        if (!target) return;
        applyLang(target.getAttribute('data-lang-set'));
      });
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  return { applyLang, get };
})();
