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
    'cover.eyebrow':   { ru: 'Презентация для фабрики HHB · 2025', zh: '致 HHB 工厂的提案 · 2025' },
    'cover.title':     {
      ru: '<span class="cover-line">Эксклюзивный</span><span class="cover-line">партнёр <em>HHB</em></span><span class="cover-line">в&nbsp;России</span>',
      zh: '<span class="cover-line">HHB 在俄罗斯的</span><span class="cover-line"><em>独家</em>代理伙伴</span>',
    },
    'cover.by':        { ru: 'Презентует <strong>Кристина</strong> · Компонент&nbsp;Сервис', zh: '演讲人：<strong>克里斯季娜</strong> · 康鹏服务' },

    // ─── MAP / INFO PANEL ───
    'map.eyebrow':     { ru: 'География', zh: '业务覆盖范围' },
    'map.title':       { ru: 'От Юга России —<br />ко всей стране', zh: '从俄罗斯南部<br />走向全国' },
    'map.subtitle':    { ru: 'Расширение по&nbsp;всей России', zh: '覆盖全俄扩张计划' },

    'map.counter.regions': { ru: 'регионов', zh: '个地区' },

    'map.legend.current.title': { ru: 'Доминируем',  zh: '核心地区' },
    'map.legend.current.desc':  { ru: 'Воронеж · Белгород · Краснодар', zh: '沃罗涅日 · 别尔哥罗德 · 克拉斯诺达尔' },
    'map.legend.phase1.title':  { ru: 'Фаза 1',   zh: '第一阶段' },
    'map.legend.phase1.desc':   { ru: 'ЮФО и соседние регионы',         zh: '南部联邦区与邻近地区' },
    'map.legend.phase2.title':  { ru: 'Фаза 2',   zh: '第二阶段' },
    'map.legend.phase2.desc':   { ru: 'ЦФО · Поволжье · СПб',           zh: '中央联邦区 · 伏尔加 · 圣彼得堡' },
    'map.legend.phase3.title':  { ru: 'Фаза 3',   zh: '第三阶段' },
    'map.legend.phase3.desc':   { ru: 'Урал · Сибирь · Дальний Восток', zh: '乌拉尔 · 西伯利亚 · 远东' },

    // ─── MAP STEPS ───
    'step1.eyebrow': { ru: '01 · Россия',         zh: '01 · 俄罗斯' },
    'step1.title':   { ru: 'Огромный рынок —<br />один из&nbsp;крупнейших в&nbsp;мире', zh: '巨大的市场 —<br />全球最大经济体之一' },
    'step1.text':    { ru: 'Россия — это <strong>85&nbsp;субъектов</strong>, 11&nbsp;часовых поясов и&nbsp;146&nbsp;млн&nbsp;потребителей. Мы&nbsp;строим систему, которая охватит каждый регион.',
                       zh: '俄罗斯拥有 <strong>85 个联邦主体</strong>、11 个时区和 1.46 亿消费者。我们正在建立覆盖每个地区的系统。' },

    'step2.eyebrow': { ru: '02 · Опорные регионы',  zh: '02 · 核心地区' },
    'step2.title':   { ru: 'Доминируем на&nbsp;Юге',  zh: '南部的主导地位' },
    'step2.text':    { ru: 'Поставки идут по&nbsp;всей России, но&nbsp;<strong>Воронежская, Белгородская области и&nbsp;Краснодарский край</strong>&nbsp;— наша опора: плотный рынок, развитая логистика, доля&nbsp;№1.',
                       zh: '我们已向全俄供货，但<strong>沃罗涅日州、别尔哥罗德州和克拉斯诺达尔边疆区</strong>是我们的核心基地：市场密集、物流发达、市占率第一。' },

    'step3.eyebrow': { ru: '03 · Фаза 1',         zh: '03 · 第一阶段' },
    'step3.title':   { ru: 'Расширение по&nbsp;соседним регионам', zh: '向邻近地区扩展' },
    'step3.text':    { ru: 'Из южного хаба выходим в&nbsp;<strong>Ростовскую и&nbsp;Волгоградскую области, Ставропольский край, республики Северного Кавказа</strong> и&nbsp;Черноземье.',
                       zh: '从南部枢纽延伸至<strong>罗斯托夫州、伏尔加格勒州、斯塔夫罗波尔边疆区、北高加索各共和国</strong>及黑土区。' },

    'step4.eyebrow': { ru: '04 · Фаза 2',         zh: '04 · 第二阶段' },
    'step4.title':   { ru: 'Центр · Поволжье · Северо-Запад', zh: '中央区 · 伏尔加 · 西北' },
    'step4.text':    { ru: 'Подключаем <strong>Москву, Санкт-Петербург, Татарстан, Самару, Нижний Новгород</strong> — самые ёмкие рынки страны.',
                       zh: '接入<strong>莫斯科、圣彼得堡、鞑靼斯坦、萨马拉、下诺夫哥罗德</strong> — 全国最大的市场。' },

    'step5.eyebrow': { ru: '05 · Цель',           zh: '05 · 目标' },
    'step5.title':   { ru: 'Вся Россия — 85&nbsp;регионов', zh: '全俄 — 85 个地区' },
    'step5.text':    { ru: 'Финальная фаза — <strong>Урал, Сибирь и&nbsp;Дальний Восток</strong>. Полное покрытие с&nbsp;единой логистической сетью.',
                       zh: '最终阶段：<strong>乌拉尔、西伯利亚和远东</strong>。统一物流网络的完整覆盖。' },

    // ─── СЛАЙД 3 — РЕЗУЛЬТАТЫ ───
    'results.eyebrow': { ru: '03 · Результаты прямо сейчас', zh: '03 · 现有成果' },
    'results.title':   { ru: 'HHB уже <em>работает</em> в&nbsp;России —<br />и&nbsp;побеждает в&nbsp;тендерах',
                         zh: 'HHB 已在俄罗斯<em>运营</em> —<br />并在招标中胜出' },
    'results.m1.label': { ru: 'клиентской базы<br />переведено на&nbsp;HHB', zh: '客户群<br />已转用 HHB' },
    'results.m2.label': { ru: 'новых клиентов<br />за&nbsp;последние 2&nbsp;месяца', zh: '新增客户<br />近两个月' },
    'results.m3.label': { ru: 'HHB в&nbsp;тендерных списках<br />наравне с&nbsp;европейскими брендами', zh: 'HHB 在招标清单中<br />与欧洲品牌并列' },
    'results.footer':   { ru: '<strong>Курс&nbsp;Агротерминал</strong>, один из&nbsp;крупнейших клиентов, протестировал HHB месяц — и&nbsp;принял в&nbsp;закупочную номенклатуру.',
                          zh: '<strong>Курс Агротерминал</strong> — 最大客户之一，测试 HHB 一个月后正式纳入采购清单。' },

    // ─── СЛАЙД 3.5 — КЛИЕНТЫ ───
    'clients.eyebrow': { ru: '04 · Спрос на&nbsp;столе', zh: '04 · 现有客户群' },
    'clients.title':   { ru: 'Уже&nbsp;в&nbsp;работе —<br />крупнейшие <em>агрохолдинги</em> и&nbsp;промышленные группы РФ',
                         zh: '正在合作中 —<br />俄罗斯最大的<em>农业控股</em>和工业集团' },
    'clients.lead':    { ru: 'Это компании, с&nbsp;которыми мы&nbsp;ведём активные переговоры или&nbsp;уже&nbsp;поставляем подшипники HHB. Большинство — лидеры своих отраслей.',
                         zh: '这些是我们正在积极洽谈或已经供应 HHB 轴承的企业。大部分都是各自行业的领导者。' },
    'clients.plus':    { ru: '+200&nbsp;в&nbsp;работе', zh: '+200 家洽谈中' },
    'clients.and_more':{ ru: 'и ещё десятки компаний в&nbsp;работе', zh: '以及数十家洽谈中的企业' },
    'clients.footer':  { ru: 'Это <strong>живая воронка</strong>: каждый месяц через&nbsp;«чемоданчик» проходят 5-10&nbsp;новых предприятий.',
                         zh: '这是一个<strong>活跃的销售漏斗</strong>：每月有 5-10 家新企业通过「手提箱」方法接入。' },

    // ─── СЛАЙД 4 — МЕТОД ───
    'method.eyebrow': { ru: '05 · Как мы&nbsp;продаём', zh: '05 · 我们的销售方法' },
    'method.title':   { ru: 'Метод <em>«Чемоданчик»</em> —<br />так&nbsp;не&nbsp;делает <strong>никто</strong> в&nbsp;России',
                        zh: '<em>「手提箱」</em>方法 —<br />全俄<strong>独一无二</strong>' },

    'method.s1.h': { ru: 'Глубокий ресёрч предприятия', zh: '深入研究客户企业' },
    'method.s1.p': { ru: 'Холодный звонок + полный профиль ЛПР: соцсети, контакты, привычки. Знаем всё о&nbsp;клиенте до&nbsp;первой встречи.',
                     zh: '冷拜访 + 完整的决策人画像：社交媒体、联系方式、习惯。会面前已了解客户的一切。' },

    'method.s2.h': { ru: 'Очная встреча с&nbsp;делегацией', zh: '现场会议 — 派出代表团' },
    'method.s2.p': { ru: 'Едем большим составом: <strong>механики, инженеры, директора, отдел снабжения</strong>. Привозим чемоданчик с&nbsp;образцами HHB и&nbsp;конкурентов.',
                     zh: '我们派出强大阵容：<strong>机械师、工程师、董事、采购部</strong>。带上装有 HHB 和竞品样品的手提箱。' },

    'method.s3.h': { ru: 'Техническая лекция', zh: '技术讲座' },
    'method.s3.p': { ru: 'Рассказываем про чугун, плотность металла, уплотнения, технологию производства. Инженеры <em>влюбляются</em> в&nbsp;продукт.',
                     zh: '讲解铸铁、金属密度、密封件和生产工艺。让工程师<em>爱上</em>产品。' },

    'method.s4.h': { ru: 'Тестирование на&nbsp;площадке', zh: '现场测试' },
    'method.s4.p': { ru: 'Передаём образцы. Клиент месяц проверяет качество металла, износостойкость, ресурс. Курс&nbsp;Агротерминал — наш свежий кейс.',
                     zh: '提供样品。客户用一个月时间测试金属质量、耐磨性、寿命。Курс Агротерминал 是我们的最新案例。' },

    'method.s5.h': { ru: 'HHB в&nbsp;тендерной номенклатуре', zh: 'HHB 列入采购清单' },
    'method.s5.p': { ru: 'После тестов бренд попадает в&nbsp;список рекомендуемых к&nbsp;закупке — наравне с&nbsp;европейскими топами.',
                     zh: '测试后品牌进入推荐采购清单 — 与欧洲顶级品牌并列。' },

    'method.s6.h': { ru: 'Победа в&nbsp;тендере', zh: '赢得招标' },
    'method.s6.p': { ru: 'Когда тендер запускается — мы&nbsp;участвуем и&nbsp;побеждаем. Так&nbsp;завоёвываются топовые клиенты.',
                     zh: '招标启动 — 我们参与并胜出。这就是赢得顶级客户的方式。' },

    // ─── СЛАЙД 5 — ТЕХНИЧЕСКИЙ ОТДЕЛ ───
    'tech.eyebrow': { ru: '06 · Экспертиза', zh: '06 · 技术专长' },
    'tech.title':   { ru: '15&nbsp;лет в&nbsp;подшипниках —<br />знаем оборудование <em>клиента</em><br />до&nbsp;последнего узла',
                      zh: '15 年轴承行业经验 —<br />深入了解<em>客户</em>设备的<br />每一个机组' },
    'tech.lead':    { ru: 'Наши технические консультанты работали со&nbsp;всеми европейскими и&nbsp;японскими брендами, которые когда-либо завозились в&nbsp;РФ. Знают, какой подшипник стоит на&nbsp;каждой нории, зерносушилке, тракторе, конвейере.',
                      zh: '我们的技术顾问与所有曾在俄罗斯销售过的欧洲和日本品牌都合作过。熟悉每一台提升机、谷物干燥机、拖拉机、输送机上的轴承。' },
    'tech.quote':   { ru: '«Это уникальный сервис, которого&nbsp;нет ни&nbsp;у&nbsp;одного дистрибьютора в&nbsp;России.»',
                      zh: '「这是俄罗斯任何一家分销商都无法提供的独特服务。」' },

    'tech.i1.t': { ru: 'Зерносушилки',           zh: '谷物干燥机' },
    'tech.i2.t': { ru: 'Нории и&nbsp;конвейеры', zh: '提升机与输送机' },
    'tech.i3.t': { ru: 'Тракторы и&nbsp;комбайны', zh: '拖拉机与联合收割机' },
    'tech.i4.t': { ru: 'Промышленные узлы',      zh: '工业机组' },
    'tech.i5.t': { ru: 'Грохоты и&nbsp;дробилки', zh: '振动筛与破碎机' },
    'tech.i6.t': { ru: 'Пищевая переработка',    zh: '食品加工' },

    // ─── СЛАЙД 6 — ЦИФРОВАЯ СТРАТЕГИЯ ───
    'digital.eyebrow': { ru: '07 · Цифровая стратегия 2026', zh: '07 · 数字战略 2026' },
    'digital.title':   { ru: 'Строим бренд <em>HHB в&nbsp;России</em><br />как&nbsp;вывод нового продукта на&nbsp;рынок',
                         zh: '将 <em>HHB 在俄罗斯</em>的品牌建设<br />作为新产品市场推出来运营' },

    'digital.c1.h': { ru: 'Сайт-витрина HHB', zh: 'HHB 品牌专属网站' },
    'digital.c1.p': { ru: 'Полноценный раздел: каталог, технические характеристики, применение, кейсы. Позиционирование бренда под российский рынок.',
                      zh: '完整的网站板块：产品目录、技术参数、应用场景、案例。面向俄罗斯市场的品牌定位。' },

    'digital.c2.h': { ru: 'Экспертные видео&nbsp;и&nbsp;обзоры', zh: '专家视频与产品评测' },
    'digital.c2.p': { ru: 'Серия роликов от&nbsp;технических специалистов: сравнения, тесты, применение в&nbsp;отраслях.',
                      zh: '由技术专家制作的系列视频：对比、测试、行业应用。' },

    'digital.c3.h': { ru: 'Соцсети&nbsp;и&nbsp;блогеры', zh: '社交媒体与意见领袖' },
    'digital.c3.p': { ru: 'Коллаборации с&nbsp;топ-блогерами сельхоз- и&nbsp;промышленной тематики. Прямые контакты с&nbsp;аудиторией.',
                      zh: '与农业和工业领域的顶级博主合作。与受众的直接接触。' },

    'digital.c4.h': { ru: 'Контекстная&nbsp;реклама', zh: '关键词广告投放' },
    'digital.c4.p': { ru: 'Яндекс и&nbsp;другие площадки. Захват спроса по&nbsp;ключевым словам конкурентов и&nbsp;типовых задач.',
                      zh: 'Yandex 及其他平台。通过竞品关键词和典型任务获取需求。' },

    'digital.c5.h': { ru: 'AI-консультант', zh: 'AI 智能顾问' },
    'digital.c5.p': { ru: 'Чат-бот на&nbsp;сайте подбирает подшипник по&nbsp;параметрам узла. Снижает порог входа для&nbsp;новых клиентов.',
                      zh: '网站聊天机器人根据机组参数推荐轴承。降低新客户的入门门槛。' },

    'digital.c6.h': { ru: 'Аналитика&nbsp;и&nbsp;отчётность', zh: '数据分析与定期汇报' },
    'digital.c6.p': { ru: 'Прозрачные дашборды для&nbsp;HHB: где&nbsp;продаётся, какие&nbsp;отрасли, какой&nbsp;спрос. Данные для&nbsp;планирования контейнеров.',
                      zh: '为 HHB 提供透明仪表板：销售地点、行业、需求。为集装箱计划提供数据支持。' },

    // ─── СЛАЙД 7 — РАЗВИЛКА ───
    'fork.eyebrow': { ru: '08 · Развилка', zh: '08 · 关键抉择' },
    'fork.title':   { ru: 'Эксклюзив или&nbsp;нет —<br />два&nbsp;разных <em>будущих</em> для&nbsp;HHB в&nbsp;России',
                      zh: '独家代理与否 —<br />HHB 在俄罗斯的两种<em>未来</em>' },

    'fork.pos.title': { ru: 'С&nbsp;эксклюзивом Компонент&nbsp;Сервис', zh: '授予康鹏服务独家代理' },
    'fork.pos.i1': { ru: 'Весь ресурс компании сфокусирован <strong>на&nbsp;HHB</strong>', zh: '公司全部资源聚焦于 <strong>HHB</strong>' },
    'fork.pos.i2': { ru: 'Системное построение бренда: сайт, контент, отрасли',           zh: '系统化的品牌建设：网站、内容、行业渗透' },
    'fork.pos.i3': { ru: 'Рост объёмов контейнеров год&nbsp;к&nbsp;году',                  zh: '集装箱出货量逐年增长' },
    'fork.pos.i4': { ru: 'HHB занимает место ушедших европейских и&nbsp;японских брендов', zh: 'HHB 占据撤离的欧洲与日本品牌的市场份额' },
    'fork.pos.i5': { ru: 'Защита от&nbsp;ценовых войн между дистрибьюторами',              zh: '避免分销商之间的价格战' },

    'fork.neg.title': { ru: 'Без&nbsp;эксклюзива', zh: '不授予独家代理' },
    'fork.neg.i1': { ru: 'Наш ресурс <strong>уйдёт другому&nbsp;бренду</strong> — мы&nbsp;продолжим работать, но&nbsp;не&nbsp;с&nbsp;HHB',
                     zh: '我们的资源将<strong>转向其他品牌</strong> — 我们继续运营，但不再与 HHB 合作' },
    'fork.neg.i2': { ru: 'Контракт может перейти конкуренту, который возит мизер',
                     zh: '合同可能转给只进口少量货品的竞争对手' },
    'fork.neg.i3': { ru: 'Бренд HHB останется <em>неизвестным</em> в&nbsp;России',
                     zh: 'HHB 品牌在俄罗斯仍将<em>默默无闻</em>' },
    'fork.neg.i4': { ru: 'Демпинг и&nbsp;размывание позиционирования',
                     zh: '价格倾销与品牌定位的稀释' },
    'fork.neg.i5': { ru: 'Окно возможностей после ухода европейцев — закроется',
                     zh: '欧洲品牌撤离留下的窗口期 — 将关闭' },

    // ─── СЛАЙД 8 — ФИНАЛ ───
    'final.eyebrow': { ru: 'Предложение', zh: '提议' },
    'final.title':   { ru: 'Давайте подпишем<br /><em>эксклюзив</em> на&nbsp;Россию',
                       zh: '让我们签订<br />俄罗斯<em>独家</em>代理协议' },
    'final.sub':     { ru: 'Готовы к&nbsp;долгосрочному партнёрству', zh: '期待长期合作伙伴关系' },

    'final.p1': { ru: '<strong>Расширим</strong> географию с&nbsp;3&nbsp;регионов до&nbsp;всей&nbsp;РФ', zh: '<strong>扩展</strong>覆盖 — 从 3 个地区到全俄' },
    'final.p2': { ru: '<strong>Удвоим</strong> объёмы контейнеров в&nbsp;течение года',                   zh: '<strong>翻倍</strong> — 一年内集装箱量翻番' },
    'final.p3': { ru: '<strong>Построим</strong> бренд HHB как&nbsp;альтернативу ушедшим топ-брендам',   zh: '<strong>建立</strong> HHB 品牌 — 替代撤离的顶级品牌' },

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
