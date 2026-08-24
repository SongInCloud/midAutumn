import { useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowDown, ChevronRight, Moon, Sparkles, Star, Volume2, X } from 'lucide-react'

type Riddle = { question: string; answer: string; hint: string }

const riddles: Riddle[] = [
  { question: '一轮明月挂天边，猜一字', answer: '有', hint: '月亮的一半在天上。' },
  { question: '十五的月亮，猜一成语', answer: '正大光明', hint: '皎洁又圆满。' },
  { question: '中秋菊开，猜一成语', answer: '花好月圆', hint: '佳节常用的祝词。' },
]

const phases = ['新月', '上弦', '满月', '下弦']

export default function App() {
  const [light, setLight] = useState(0)
  const [phase, setPhase] = useState(2)
  const [riddle, setRiddle] = useState(0)
  const [revealed, setRevealed] = useState(false)
  const [wish, setWish] = useState('')
  const [wishSent, setWishSent] = useState(false)
  const [showStory, setShowStory] = useState(false)
  const stars = useMemo(() => Array.from({ length: 56 }, (_, i) => ({ id: i, left: `${(i * 37) % 100}%`, top: `${(i * 61) % 70}%`, delay: `${(i % 9) * .45}s`, size: 1 + (i % 3) })), [])

  const collectLight = () => setLight((value) => Math.min(12, value + 1))
  const nextRiddle = () => { setRiddle((riddle + 1) % riddles.length); setRevealed(false) }
  const launchWish = () => { if (wish.trim()) { setWishSent(true); setWish('') } }

  return <main>
    <section className="hero" id="home">
      <div className="stars" aria-hidden="true">{stars.map(s => <i key={s.id} style={{ left: s.left, top: s.top, animationDelay: s.delay, width: s.size, height: s.size }} />)}</div>
      <nav><a className="brand" href="#home"><Moon size={17} fill="currentColor" /> 月满长安</a><div className="navlinks"><a href="#culture">月之礼</a><a href="#play">夜游局</a><a href="#wish">寄相思</a></div><button className="sound" aria-label="开启声音"><Volume2 size={18} /></button></nav>
      <div className="cloud cloud-a" /><div className="cloud cloud-b" />
      <motion.div className="moon" initial={{ scale: .75, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 1.4, ease: 'easeOut' }} onClick={collectLight} role="button" tabIndex={0} onKeyDown={(e) => e.key === 'Enter' && collectLight()}>
        <span className="moon-crater crater-one" /><span className="moon-crater crater-two" /><span className="moon-crater crater-three" />
        <span className="moon-tip">轻点收集月华 <Sparkles size={14} /></span>
      </motion.div>
      <div className="mountains mountain-back" /><div className="mountains mountain-front" />
      <div className="hero-copy"><p className="eyebrow">乙巳年 · 八月十五</p><h1>月圆人间<br /><em>共此清光</em></h1><p className="intro">一轮澄澈，照见千年的团圆心意。<br />今夜，随月光走入中秋的诗意与欢喜。</p><a className="scroll" href="#culture">启程夜游 <ArrowDown size={16} /></a></div>
      <div className="moonlight-counter"><span>已收月华</span><b>{String(light).padStart(2, '0')}<small>/12</small></b><div className="meter"><i style={{ width: `${light / 12 * 100}%` }} /></div></div>
    </section>

    <section className="culture" id="culture">
      <div className="section-heading"><p>月之礼 · MID-AUTUMN</p><h2>一夜，盛下千年团圆</h2><span>月有阴晴圆缺，人有悲欢离合。关于中秋的美好，不止于月色。</span></div>
      <div className="culture-grid">
        <article className="culture-card story-card"><div className="stamp">月宫</div><span className="card-index">01</span><h3>嫦娥奔月</h3><p>清辉之上，有她轻舒广袖的身影。传说让月亮有了永恒的浪漫。</p><button onClick={() => setShowStory(true)}>听月宫旧事 <ChevronRight size={16} /></button></article>
        <article className="culture-card mooncake-card"><div className="pastry"><span>团<br/>圆</span></div><span className="card-index">02</span><h3>一饼尝秋</h3><p>酥皮包住绵密心事，切开的月饼，是一桌人共享的圆满。</p></article>
        <article className="culture-card osmanthus-card"><div className="branch"><i/><i/><i/><i/><i/><i/></div><span className="card-index">03</span><h3>桂子飘香</h3><p>桂影摇曳，香气落在衣襟。秋天最温柔的信笺，由风送达。</p></article>
      </div>
    </section>

    <section className="play" id="play"><div className="play-title"><p>夜游局 · PLAY WITH THE MOON</p><h2>今夜有趣，月光作伴</h2></div>
      <div className="play-grid">
        <article className="game riddle-game"><div><span className="game-label">灯谜小局</span><h3>猜一猜，<br/>月下藏着什么？</h3><p>{riddles[riddle].question}</p></div><div className={`riddle-tile ${revealed ? 'is-revealed' : ''}`} onClick={() => setRevealed(!revealed)} role="button" tabIndex={0}><span>{revealed ? riddles[riddle].answer : '谜'}</span><small>{revealed ? riddles[riddle].hint : '点击翻开'}</small></div><button className="text-btn" onClick={nextRiddle}>换一题 <ChevronRight size={15} /></button></article>
        <article className="game phase-game"><span className="game-label">月相观测</span><h3>拨一拨，<br/>看月的变化</h3><div className="phase-orbit"><div className={`phase phase-${phase}`} /></div><input aria-label="选择月相" type="range" min="0" max="3" value={phase} onChange={e => setPhase(Number(e.target.value))}/><div className="phase-labels">{phases.map((label, i) => <span key={label} className={i === phase ? 'active' : ''}>{label}</span>)}</div></article>
      </div>
    </section>

    <section className="wish" id="wish"><div className="wish-moon" /><div className="wish-inner"><p>寄相思 · A LETTER TO THE MOON</p><h2>写下今夜的祝愿</h2><span>让月光替你，送往想念的人身边。</span><div className="wish-box"><textarea maxLength={50} value={wish} onChange={e => { setWish(e.target.value); setWishSent(false) }} placeholder="愿人长久，千里共婵娟……" /><button onClick={launchWish}>寄往月宫 <Star size={15} fill="currentColor" /></button></div>{wishSent && <motion.div className="wish-success" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>你的祝愿已化作一盏月灯，正在星河中缓缓升起。</motion.div>}</div></section>
    <footer>月满长安 · 愿所有思念，都有回响 <span>·</span> 中秋安康</footer>

    <AnimatePresence>{showStory && <motion.div className="modal-mask" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}><motion.article className="story-modal" initial={{ y: 30, scale: .96 }} animate={{ y: 0, scale: 1 }} exit={{ y: 20, scale: .96 }}><button className="close" onClick={() => setShowStory(false)} aria-label="关闭"><X size={20}/></button><span>月宫旧事</span><h2>嫦娥应悔偷灵药，碧海青天夜夜心</h2><p>相传后羿得西王母不死之药，嫦娥为守护灵药，服药飞向月宫。自此，举头望月的人们，便把对美好、对团聚的心愿寄给了清辉。</p><button onClick={() => setShowStory(false)}>收下这段月色</button></motion.article></motion.div>}</AnimatePresence>
  </main>
}
