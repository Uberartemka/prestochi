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
      ru: '<span class="cover-line">Развитие бренда</span><span class="cover-line"><em>HHB</em></span><span class="cover-line">в&nbsp;России</span>',
      zh: '<span class="cover-line">HHB 品牌</span><span class="cover-line">在俄罗斯的</span><span class="cover-line"><em>发展</em></span>',
    },
    'cover.by':        { ru: 'Презентует <strong>Кристина</strong> · Компонент&nbsp;Сервис', zh: '演讲人：<strong>克里斯季娜</strong> · 康鹏服务' },

    // ─── MAP / INFO PANEL ───
    'map.eyebrow':     { ru: 'География', zh: '业务覆盖范围' },
    'map.title':       { ru: 'Черноземье —<br />опорный сельхоз регион РФ', zh: '黑土区 —<br />俄罗斯核心农业区' },
    'map.subtitle':    { ru: 'Сильная база в&nbsp;Черноземье и&nbsp;выход на&nbsp;Юг', zh: '立足黑土区，向南部地区发展' },

    'map.counter.regions': { ru: 'регионов', zh: '个地区' },

    'map.legend.current.title': { ru: 'Опорные регионы',  zh: '核心地区' },
    'map.legend.current.desc':  { ru: 'Воронеж · Белгород · Курск · Липецк · Тамбов', zh: '沃罗涅日 · 别尔哥罗德 · 库尔斯克 · 利佩茨克 · 坦波夫' },
    'map.legend.phase1.title':  { ru: 'Фаза 1',   zh: '第一阶段' },
    'map.legend.phase1.desc':   { ru: 'Ростов · Краснодар · Ставрополье', zh: '罗斯托夫 · 克拉斯诺达尔 · 斯塔夫罗波尔' },
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
    'step2.title':   { ru: 'Черноземье — опорная территория',  zh: '黑土区 — 核心区域' },
    'step2.text':    { ru: '<strong>Воронеж, Белгород, Курск, Липецк и&nbsp;Тамбов</strong> — ключевая территория: главный сельхоз регион РФ и&nbsp;база для развития HHB.',
                       zh: '<strong>沃罗涅日、别尔哥罗德、库尔斯克、利佩茨克和坦波夫</strong>是核心区域：俄罗斯主要农业地区，也是 HHB 发展的基础。' },

    'step3.eyebrow': { ru: '03 · Фаза 1',         zh: '03 · 第一阶段' },
    'step3.title':   { ru: 'Выход на&nbsp;Юг', zh: '向南部地区发展' },
    'step3.text':    { ru: 'Следующий шаг — <strong>Ростов, Краснодар, Ставрополье</strong> и&nbsp;другие южные территории с&nbsp;сильной аграрной и&nbsp;промышленной базой.',
                       zh: '下一步是进入<strong>罗斯托夫、克拉斯诺达尔、斯塔夫罗波尔</strong>及其他拥有强大农业和工业基础的南部地区。' },

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

    // ─── СЛАЙД 4 — ГРАФИК РОСТА ───
    'growth.eyebrow': { ru: '04 · Траектория роста', zh: '04 · 增长轨迹' },
    'growth.title':   { ru: 'От первых внедрений<br />к&nbsp;<em>ёмкости рынка</em>',
                        zh: '从首批导入<br />到<em>市场容量</em>' },
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
    'growth.step3.title':   { ru: 'Масштабирование на&nbsp;рынке', zh: '市场规模化' },
    'growth.step3.text':    { ru: 'Это расчёт только по&nbsp;корпусным подшипникам и&nbsp;только по&nbsp;Черноземью. Южные регионы могут дать сопоставимую ёмкость, а&nbsp;расширение SKU увеличит потенциал проекта.',
                              zh: '该测算仅针对带座轴承，且仅限黑土区。南部地区可带来同等容量，而 SKU 扩展将进一步提升项目潜力。' },
    'growth.axis':    { ru: 'Клиенты и&nbsp;ёмкость рынка по&nbsp;корпусным подшипникам', zh: '带座轴承客户与市场容量' },
    'growth.legend.history': { ru: 'факт — достигнуто', zh: '实际达成' },
    'growth.legend.plan':    { ru: 'план — проекция роста', zh: '计划预测' },

    // ─── СЛАЙД 5 — PROOF BRIDGE ───
    'proof.eyebrow': { ru: '05 · Доказательство масштаба', zh: '05 · 规模证明' },
    'proof.left.label': { ru: 'клиентов уже переведено<br />на&nbsp;HHB', zh: '客户已转用<br />HHB' },
    'proof.right.label': { ru: 'реальных компаний<br />в&nbsp;нашей активной воронке', zh: '销售漏斗中的<br />真实企业' },
    'proof.title': { ru: 'Это не&nbsp;процент в&nbsp;презентации.<br />Это <em>реальный спрос</em> на&nbsp;рынке.',
                     zh: '这不是演示文稿里的百分比。<br />这是市场上的<em>真实需求</em>。' },
    'proof.lead': { ru: 'За каждой точкой графика стоят предприятия, закупщики, тендеры и&nbsp;технические испытания. Мы&nbsp;не прогнозируем интерес к&nbsp;HHB — мы&nbsp;уже работаем с&nbsp;этим спросом.',
                    zh: '图表每一个点背后都有企业、采购方、招标和技术测试。我们不是预测 HHB 的兴趣 — 我们已经在处理这些真实需求。' },
    'proof.tag1': { ru: 'агрохолдинги', zh: '农业控股' },
    'proof.tag2': { ru: 'элеваторы', zh: '粮仓' },
    'proof.tag3': { ru: 'переработка', zh: '加工企业' },
    'proof.tag4': { ru: 'машиностроение', zh: '机械制造' },
    'proof.tag5': { ru: 'сервисные компании', zh: '服务公司' },
    'proof.tag6': { ru: 'промышленность РФ', zh: '俄罗斯工业' },

    // ─── СЛАЙД 6 — КЛИЕНТЫ ───
    'clients.eyebrow': { ru: '06 · Спрос на&nbsp;столе', zh: '06 · 现有客户群' },
    'clients.title':   { ru: 'Уже&nbsp;в&nbsp;работе —<br />крупнейшие <em>агрохолдинги</em> и&nbsp;промышленные группы РФ',
                         zh: '正在合作中 —<br />俄罗斯最大的<em>农业控股</em>和工业集团' },
    'clients.lead':    { ru: 'Это компании, с&nbsp;которыми мы&nbsp;ведём активные переговоры или&nbsp;уже&nbsp;поставляем подшипники HHB. Большинство — лидеры своих отраслей.',
                         zh: '这些是我们正在积极洽谈或已经供应 HHB 轴承的企业。大部分都是各自行业的领导者。' },
    'clients.plus':    { ru: '+200&nbsp;в&nbsp;работе', zh: '+200 家洽谈中' },
    'clients.and_more':{ ru: 'и ещё десятки компаний в&nbsp;работе', zh: '以及数十家洽谈中的企业' },
    'clients.footer':  { ru: 'Это <strong>живая воронка</strong>: каждый месяц через&nbsp;«чемоданчик» проходят 5-10&nbsp;новых предприятий.',
                         zh: '这是一个<strong>活跃的销售漏斗</strong>：每月有 5-10 家新企业通过「手提箱」方法接入。' },

    // ─── СЛАЙД 7 — МЕТОД ───
    'method.eyebrow': { ru: '07 · Как мы&nbsp;продаём', zh: '07 · 我们的销售方法' },
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

    // ─── СЛАЙД 8 — ТЕХНИЧЕСКИЙ ОТДЕЛ ───
    'tech.eyebrow': { ru: '08 · Экспертиза', zh: '08 · 技术专长' },
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

    // ─── СЛАЙД 9 — ЦИФРОВАЯ СТРАТЕГИЯ ───
    'digital.eyebrow': { ru: '09 · Цифровая стратегия 2026', zh: '09 · 数字战略 2026' },
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

    // ─── СЛАЙД 10 — РАЗВИЛКА ───
    'fork.eyebrow': { ru: '10 · Развилка', zh: '10 · 关键抉择' },
    'fork.title':   { ru: 'Что даёт <em>стратегическое партнёрство</em><br />для развития HHB в&nbsp;России',
                      zh: '<em>战略合作</em><br />将如何推动 HHB 在俄罗斯发展' },

    'fork.pos.title': { ru: 'При закреплённом партнёрстве', zh: '建立稳定合作后' },
    'fork.pos.i1': { ru: 'Понятная ответственность за&nbsp;развитие региона и&nbsp;клиентской базы', zh: '明确区域与客户基础发展的责任' },
    'fork.pos.i2': { ru: 'Единая стратегия бренда: сайт, контент, отраслевое продвижение', zh: '统一品牌战略：网站、内容、行业推广' },
    'fork.pos.i3': { ru: 'Планирование складских запасов и&nbsp;контейнеров под реальный спрос', zh: '根据真实需求规划库存与集装箱' },
    'fork.pos.i4': { ru: 'Инженерная поддержка внедрения HHB у&nbsp;крупных клиентов', zh: '为大型客户导入 HHB 提供工程支持' },
    'fork.pos.i5': { ru: 'Прозрачная обратная связь фабрике по&nbsp;SKU, качеству и&nbsp;рынку', zh: '向工厂提供 SKU、质量与市场的透明反馈' },

    'fork.neg.title': { ru: 'Без закреплённой модели', zh: '没有明确合作模式时' },
    'fork.neg.i1': { ru: 'Продвижение бренда идёт менее системно и&nbsp;медленнее',
                     zh: '品牌推广会不够系统，速度更慢' },
    'fork.neg.i2': { ru: 'Сложнее прогнозировать склад и&nbsp;минимальные партии по&nbsp;SKU',
                     zh: '更难预测库存与各 SKU 的最低起订量' },
    'fork.neg.i3': { ru: 'Клиенты получают разную коммуникацию по&nbsp;цене, наличию и&nbsp;позиционированию',
                     zh: '客户在价格、库存和定位方面收到的信息不一致' },
    'fork.neg.i4': { ru: 'Дольше накапливается техническая статистика по&nbsp;внедрениям HHB',
                     zh: 'HHB 导入的技术数据积累更慢' },
    'fork.neg.i5': { ru: 'Сложнее быстро масштабировать успешные кейсы на&nbsp;новые регионы',
                     zh: '更难将成功案例快速复制到新地区' },

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
