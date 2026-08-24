import { useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowUp, BookOpen, ChevronRight, CircleDot, Flower2, Menu, Moon, Utensils, X } from 'lucide-react'

const navItems = [
  { id: 'overview', label: '何谓中秋' },
  { id: 'history', label: '千年流变' },
  { id: 'customs', label: '人间风俗' },
  { id: 'legends', label: '月下传说' },
  { id: 'poetry', label: '月照古今' },
  { id: 'food', label: '一口团圆' },
  { id: 'moon', label: '共赏明月' },
]

const eras = [
  { year: '先秦', title: '秋夕祭月', text: '先民敬畏天象，在秋收之后祭拜月神，感谢大地馈赠。此时尚无“中秋节”，却已有后来节俗最古老的文化源头。' },
  { year: '唐', title: '风雅赏月', text: '赏月成为文人雅事。诗人将明月写入离情、乡愁与知己之思，中秋也开始拥有独立而鲜明的节日气质。' },
  { year: '宋', title: '佳节成形', text: '八月十五成为全民节日。夜市通宵、登楼赏月，百姓以月饼相赠，“团圆”的意味日渐清晰。' },
  { year: '明清', title: '团圆入俗', text: '祭月、拜月、走月、玩花灯等习俗成熟。圆月与圆饼共同指向家庭团聚，中秋地位仅次于春节。' },
  { year: '今', title: '万家共月', text: '传统礼俗以新的方式延续。无论相隔多远，人们仍在同一轮明月下分享祝福、思念与团圆。' },
]

const customs = [
  { title: '祭月拜月', type: '礼仪', region: '全国多地', symbol: '月', text: '设香案、陈瓜果，向月而拜，表达对自然的敬意与对美好生活的期许。' },
  { title: '舞火龙', type: '地域', region: '广东·香港', symbol: '龙', text: '草扎巨龙遍插线香，在鼓点与火光中穿街而过，祈求风调雨顺、平安吉祥。' },
  { title: '走月亮', type: '游艺', region: '江南地区', symbol: '游', text: '中秋夜盛装出游、结伴赏月，在桥畔与水乡之间共享清辉。' },
  { title: '燃灯赏灯', type: '游艺', region: '湖广·岭南', symbol: '灯', text: '竹条扎灯，悬于高处。点点灯火与天上明月相映，照亮节日夜色。' },
  { title: '饮桂花酒', type: '饮食', region: '江南地区', symbol: '桂', text: '桂花盛放正值中秋，清甜香气被酿入酒中，寓意富贵与长久。' },
  { title: '吃柚子', type: '饮食', region: '闽南·台湾', symbol: '柚', text: '“柚”与“佑”谐音，圆润果实也有团圆之意，是月饼之外的重要节食。' },
]

const legends = [
  { name: '嫦娥', subtitle: '奔月 · 清辉长守', mark: '姮', text: '相传嫦娥服下不死药，身轻如燕，飞向月宫。故事版本众多，却共同寄托着古人对月亮、永恒与离合的想象。', quote: '碧海青天夜夜心' },
  { name: '玉兔', subtitle: '捣药 · 仁心济世', mark: '兔', text: '月中白兔持杵捣药，是汉代以来常见的月宫意象。它温顺纯洁，也让清冷月宫多了一份亲切与生机。', quote: '白兔捣药秋复春' },
  { name: '吴刚', subtitle: '伐桂 · 生生不息', mark: '桂', text: '吴刚受罚砍伐月中桂树，树创随合，永无止境。这则传说被赋予坚持、磨炼与生命不息的寓意。', quote: '斫却月中桂' },
  { name: '蟾宫', subtitle: '折桂 · 金榜题名', mark: '蟾', text: '古人称月宫为蟾宫，又以“蟾宫折桂”比喻科举高中。月亮因而与求学、志向和荣耀产生了联系。', quote: '攀仙桂，步蟾宫' },
]

const poems = [
  { theme: '团圆', line: '但愿人长久，千里共婵娟。', author: '苏轼', dynasty: '宋', title: '水调歌头·明月几时有' },
  { theme: '怀人', line: '海上生明月，天涯共此时。', author: '张九龄', dynasty: '唐', title: '望月怀远' },
  { theme: '思乡', line: '露从今夜白，月是故乡明。', author: '杜甫', dynasty: '唐', title: '月夜忆舍弟' },
  { theme: '赏月', line: '此生此夜不长好，明月明年何处看。', author: '苏轼', dynasty: '宋', title: '阳关曲·中秋月' },
]

const foods = [
  { name: '广式月饼', region: '岭南', flavor: '皮薄馅丰', color: '#b55c3f', detail: '莲蓉、豆沙、五仁与咸蛋黄层层相合，油润细腻，是今天流传最广的月饼流派之一。' },
  { name: '苏式月饼', region: '江南', flavor: '酥层分明', color: '#c98b50', detail: '以水油皮包裹油酥，烘烤后层层起酥。甜有玫瑰百果，咸有鲜肉榨菜。' },
  { name: '滇式月饼', region: '云南', flavor: '花香咸甜', color: '#8f4c43', detail: '云腿月饼将宣威火腿与蜂蜜、砂糖相配，咸甜交织，形成独特高原风味。' },
  { name: '京式月饼', region: '北方', flavor: '端正醇厚', color: '#9b6949', detail: '讲究皮馅比例与整齐花纹，自来红、自来白和提浆月饼都有鲜明的北方气质。' },
]

const moonPhases = [
  { name: '朔月', day: '初一', desc: '月球位于太阳与地球之间，明亮的一面背向我们，夜空中几乎看不见月亮。' },
  { name: '娥眉月', day: '初三至初六', desc: '日落后的西方低空，一弯细月像眉梢，古人也称它为“蛾眉”。' },
  { name: '上弦月', day: '初七至初八', desc: '月亮西半面明亮，约在正午升起、午夜落下，黄昏时最适合观察。' },
  { name: '盈凸月', day: '十一至十四', desc: '亮面超过一半并逐日丰满，向望月靠近，月光也愈加充盈。' },
  { name: '满月', day: '十五前后', desc: '地球大致位于太阳和月球之间，整个月面被照亮。天文学中也称“望”，最圆时刻并不一定恰好在中秋之夜。' },
  { name: '亏凸月', day: '十六至二十', desc: '满月之后亮面渐亏，升起时间越来越晚，清晨仍可见于西方天空。' },
  { name: '下弦月', day: '廿二至廿三', desc: '月亮东半面明亮，通常在午夜升起、正午落下，适合黎明前观察。' },
  { name: '残月', day: '廿六至廿九', desc: '黎明前东方出现一弯细月，一个月相周期即将结束。' },
]

function SectionTitle({ kicker, title, intro, light = false }: { kicker: string; title: string; intro: string; light?: boolean }) {
  return <div className={'section-title' + (light ? ' section-title--light' : '')}>
    <span>{kicker}</span><h2>{title}</h2><p>{intro}</p>
  </div>
}

function Reveal({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return <motion.div className={className} initial={{ opacity: 0, y: 26 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .16 }} transition={{ duration: .7, ease: [.22, 1, .36, 1] }}>{children}</motion.div>
}

export default function App() {
  const [activeSection, setActiveSection] = useState('overview')
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeEra, setActiveEra] = useState(2)
  const [customFilter, setCustomFilter] = useState('全部')
  const [activeLegend, setActiveLegend] = useState(0)
  const [poemTheme, setPoemTheme] = useState('全部')
  const [phase, setPhase] = useState(4)
  const [moonFact, setMoonFact] = useState(false)

  const visibleCustoms = useMemo(() => customFilter === '全部' ? customs : customs.filter(item => item.type === customFilter), [customFilter])
  const visiblePoems = useMemo(() => poemTheme === '全部' ? poems : poems.filter(item => item.theme === poemTheme), [poemTheme])

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      const visible = entries.filter(entry => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
      if (visible) setActiveSection(visible.target.id)
    }, { rootMargin: '-25% 0px -58%', threshold: [0, .2, .5] })
    navItems.forEach(item => {
      const section = document.getElementById(item.id)
      if (section) observer.observe(section)
    })
    return () => observer.disconnect()
  }, [])

  return <main>
    <header className="site-header">
      <a className="brand" href="#top" aria-label="回到首页"><span className="brand-moon"><Moon size={15} fill="currentColor" /></span><span>月满人间<small>中秋文化志</small></span></a>
      <nav className="desktop-nav" aria-label="主题导航">{navItems.map(item => <a key={item.id} href={'#' + item.id} className={activeSection === item.id ? 'active' : ''}>{item.label}</a>)}</nav>
      <button className="menu-button" onClick={() => setMenuOpen(true)} aria-label="打开主题目录"><Menu /></button>
    </header>

    <AnimatePresence>{menuOpen && <motion.div className="mobile-menu" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}><button onClick={() => setMenuOpen(false)} aria-label="关闭目录"><X /></button><span>七章 · 自在观览</span>{navItems.map((item, i) => <a key={item.id} href={'#' + item.id} onClick={() => setMenuOpen(false)}><small>0{i + 1}</small>{item.label}</a>)}</motion.div>}</AnimatePresence>

    <section className="hero" id="top">
      <div className="hero-stars" aria-hidden="true">{Array.from({ length: 30 }, (_, i) => <i key={i} style={{ '--x': ((i * 37) % 97) + '%', '--y': ((i * 53) % 75) + '%', '--delay': ((i % 7) * .6) + 's' } as React.CSSProperties} />)}</div>
      <div className="cloud cloud-one" /><div className="cloud cloud-two" />
      <motion.button className="hero-moon" onClick={() => setMoonFact(!moonFact)} initial={{ scale: .82, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 1.3, ease: 'easeOut' }} aria-label="查看中秋月亮知识">
        <span className="crater c1"/><span className="crater c2"/><span className="crater c3"/>
        <AnimatePresence>{moonFact && <motion.span className="moon-fact" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>中秋月不一定在十五最圆<small>点击“共赏明月”了解月相</small></motion.span>}</AnimatePresence>
      </motion.button>
      <div className="hero-mountain hero-mountain-back"/><div className="hero-mountain hero-mountain-front"/>
      <div className="hero-copy"><span>八月十五 · 中秋文化数字展</span><h1>海上生明月<br/><em>天涯共此时</em></h1><p>从一轮月亮出发，读节俗、访传说、赏诗词、尝人间烟火。<br/>七个主题，自在观览。</p></div>
      <div className="topic-dock" aria-label="选择浏览主题">{navItems.map((item, i) => <a href={'#' + item.id} key={item.id}><small>0{i + 1}</small><span>{item.label}</span><ChevronRight size={15}/></a>)}</div>
      <span className="hero-caption">点击月亮 · 查看一则月相知识</span>
    </section>

    <section className="overview paper-section" id="overview">
      <Reveal><SectionTitle kicker="壹 · 何谓中秋" title="一轮圆月，照见中国人的团圆" intro="“中秋”不只是一日节庆。它从秋收、祭月与赏月中生长，最终成为中国人共同的情感坐标。"/></Reveal>
      <Reveal className="overview-layout"><div className="overview-essay"><span className="drop-cap">中</span><p>秋者，四时之中；八月十五，又居秋季之中，故名中秋。先民仰观月相、俯察物候，在丰收之后祭月答谢。千百年间，这份敬畏渐渐融入家宴、赠饼与诗酒，也让圆月成为团聚的象征。</p><blockquote>月圆，是天象；团圆，是人心。</blockquote></div>
        <div className="overview-facts"><article><b>2008</b><span>列为国家法定节假日</span></article><article><b>八月十五</b><span>农历秋季正中</span></article><article><b>四大</b><span>中国传统节日之一</span></article><article><b>团圆</b><span>延续至今的核心寓意</span></article></div></Reveal>
    </section>

    <section className="history ink-section" id="history">
      <Reveal><SectionTitle light kicker="贰 · 千年流变" title="从祭月之礼，到万家灯火" intro="选择任一时代，翻阅中秋在历史中的不同面貌。时间在向前，望月的人心始终相通。"/></Reveal>
      <Reveal className="timeline"><div className="timeline-tabs" role="tablist">{eras.map((era, i) => <button role="tab" aria-selected={i === activeEra} className={i === activeEra ? 'active' : ''} key={era.year} onClick={() => setActiveEra(i)}><span>{era.year}</span><i/></button>)}</div>
        <AnimatePresence mode="wait"><motion.article className="era-card" key={activeEra} initial={{ opacity: 0, x: 18 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -18 }}><small>{String(activeEra + 1).padStart(2, '0')} / {String(eras.length).padStart(2, '0')}</small><h3>{eras[activeEra].title}</h3><p>{eras[activeEra].text}</p><span className="era-seal">{eras[activeEra].year}</span></motion.article></AnimatePresence></Reveal>
    </section>

    <section className="customs paper-section" id="customs">
      <Reveal><SectionTitle kicker="叁 · 人间风俗" title="一方水土，一样月光" intro="祭月、赏桂、走月、舞龙……不同地方以不同方式过中秋，却都在表达对丰收、团聚与平安的祝愿。"/></Reveal>
      <Reveal><div className="filter-row" role="group" aria-label="筛选中秋习俗">{['全部','礼仪','游艺','饮食','地域'].map(type => <button key={type} onClick={() => setCustomFilter(type)} className={customFilter === type ? 'active' : ''}>{type}</button>)}</div>
        <motion.div className="custom-grid" layout>{visibleCustoms.map((item, i) => <motion.article layout key={item.title} initial={{ opacity: 0 }} animate={{ opacity: 1 }}><div className="custom-mark"><span>{item.symbol}</span></div><small>{item.region} · {item.type}</small><h3>{item.title}</h3><p>{item.text}</p><b>0{i + 1}</b></motion.article>)}</motion.div></Reveal>
    </section>

    <section className="legends dark-section" id="legends">
      <Reveal><SectionTitle light kicker="肆 · 月下传说" title="仰望月亮，也仰望无尽想象" intro="神话并非历史事实，却记录着古人理解世界的方式。选择一位月宫来客，听它背后的文化寓意。"/></Reveal>
      <Reveal className="legend-layout"><div className="legend-figure"><div className="legend-orbit"/><AnimatePresence mode="wait"><motion.span key={activeLegend} initial={{ opacity: 0, scale: .75, rotate: -8 }} animate={{ opacity: 1, scale: 1, rotate: 0 }} exit={{ opacity: 0, scale: .8 }}>{legends[activeLegend].mark}</motion.span></AnimatePresence><small>非史实 · 神话传说</small></div>
        <div className="legend-content"><div className="legend-tabs" role="tablist">{legends.map((item, i) => <button role="tab" aria-selected={i === activeLegend} key={item.name} className={i === activeLegend ? 'active' : ''} onClick={() => setActiveLegend(i)}>{item.name}</button>)}</div><AnimatePresence mode="wait"><motion.article key={activeLegend} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}><span>{legends[activeLegend].subtitle}</span><h3>{legends[activeLegend].name}</h3><p>{legends[activeLegend].text}</p><blockquote>“{legends[activeLegend].quote}”</blockquote></motion.article></AnimatePresence></div></Reveal>
    </section>

    <section className="poetry paper-section" id="poetry">
      <Reveal><SectionTitle kicker="伍 · 月照古今" title="同一轮月，不同的人间心事" intro="古人把无法抵达的故乡、无法相见的人，都交给月亮。按心境翻开一页，读一首属于今夜的诗。"/></Reveal>
      <Reveal><div className="filter-row poem-filters">{['全部','团圆','怀人','思乡','赏月'].map(theme => <button key={theme} className={poemTheme === theme ? 'active' : ''} onClick={() => setPoemTheme(theme)}>{theme}</button>)}</div><motion.div className="poem-grid" layout>{visiblePoems.map((poem, i) => <motion.article layout key={poem.line}><span>0{i + 1}</span><i>{poem.theme}</i><blockquote>{poem.line}</blockquote><p>〔{poem.dynasty}〕{poem.author}<small>{poem.title}</small></p></motion.article>)}</motion.div></Reveal>
    </section>

    <section className="food warm-section" id="food">
      <Reveal><SectionTitle kicker="陆 · 一口团圆" title="月饼不止一种，团圆只有一种" intro="从岭南到江南，从北方到高原，不同风土被包进一枚圆饼。把鼠标移近，看看它们的滋味。"/></Reveal>
      <Reveal className="food-grid">{foods.map((food, i) => <article key={food.name} style={{ '--food-color': food.color } as React.CSSProperties}><div className="mooncake-visual"><span>{food.name[0]}</span><i/><i/><i/><i/></div><small>{food.region} · {food.flavor}</small><h3>{food.name}</h3><p>{food.detail}</p><b>0{i + 1}</b></article>)}</Reveal>
    </section>

    <section className="moon-lab dark-section" id="moon">
      <Reveal><SectionTitle light kicker="柒 · 共赏明月" title="月有盈亏，自有它的次序" intro="拖动月相尺，观察一个朔望月里的光影变化。中秋常逢满月，但最圆时刻并不总在十五。"/></Reveal>
      <Reveal className="moon-lab-layout"><div className="phase-stage"><div className="orbit-ring"/><div className={'phase-sphere phase-sphere-' + phase}/><span>{moonPhases[phase].name}</span></div><div className="phase-control"><small>{moonPhases[phase].day}</small><h3>{moonPhases[phase].name}</h3><p>{moonPhases[phase].desc}</p><input type="range" min="0" max="7" step="1" value={phase} onChange={e => setPhase(Number(e.target.value))} aria-label="拖动观察月相"/><div className="phase-scale">{moonPhases.map((item, i) => <button key={item.name} className={i === phase ? 'active' : ''} onClick={() => setPhase(i)} aria-label={'查看' + item.name}><i className={'mini-phase mini-phase-' + i}/><span>{item.name}</span></button>)}</div><aside><CircleDot size={17}/><span><b>你知道吗？</b>“十五的月亮十六圆”并非固定规律。月球绕地球运动速度并不均匀，望月可能出现在农历十四至十七。</span></aside></div></Reveal>
    </section>

    <footer><div className="footer-mark"><Moon fill="currentColor"/><span>月满人间<small>中秋文化志</small></span></div><p>愿人长久，千里共婵娟。</p><div className="footer-links"><a href="#overview"><BookOpen size={15}/>内容导览</a><a href="#customs"><Flower2 size={15}/>人间风俗</a><a href="#food"><Utensils size={15}/>一口团圆</a><a href="#top"><ArrowUp size={15}/>回到月下</a></div><small>内容为传统文化普及用途 · 传说部分均已标注非史实属性</small></footer>
  </main>
}
