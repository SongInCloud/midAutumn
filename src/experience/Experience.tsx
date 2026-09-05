import { CSSProperties, createContext, memo, useContext, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import craneArtwork from '../../iamge/核心角色/月宫仙鹤.png'
import marketPeopleArtwork from '../../iamge/核心角色/灯市人物组.png'
import {
  ArrowDown, ArrowLeft, ArrowRight, Compass,
  Map, Moon, Pause, Play, X,
} from 'lucide-react'

import treeArt from '../../iamge/月宫场景/桂花神树.png'
import changeArt from '../../iamge/核心角色/嫦娥飞升姿.png'
import palaceArt from '../../iamge/月宫场景/月宫主殿.png'
import rabbitArt from '../../iamge/核心角色/玉兔捣药.png'
import mountainsArt from '../../iamge/山水空间/远山组.png'
import pavilionArt from '../../iamge/山水空间/山间亭台.png'
import courtyardArt from '../../iamge/人间团圆/赏月庭院.png'
import familyArt from '../../iamge/人间团圆/团圆家宴人物组.png'
import cakeArt from '../../iamge/食物展示/广式月饼.png'
import suCakeArt from '../../iamge/食物展示/苏式月饼.png'
import dianCakeArt from '../../iamge/食物展示/滇式月饼.png'
import jingCakeArt from '../../iamge/食物展示/京式月饼.png'

gsap.registerPlugin(ScrollTrigger)
const SceneContext = createContext<number | null>(null)
const artSources: Record<string, { src: string; scene: number }> = {
  'moon-palace.osmanthus-tree': { src: treeArt, scene: 1 },
  'moon-palace.change-standing': { src: changeArt, scene: 1 },
  'moon-palace.main-hall': { src: palaceArt, scene: 1 },
  'moon-palace.jade-rabbit-pounding': { src: rabbitArt, scene: 1 },
  'landscape.mountains-far': { src: mountainsArt, scene: 2 },
  'landscape.hexagonal-pavilion': { src: pavilionArt, scene: 2 },
  'reunion.moon-viewing-courtyard': { src: courtyardArt, scene: 5 },
  'reunion.family-dinner-group': { src: familyArt, scene: 5 },
}
const cakeSources = [cakeArt, suCakeArt, dianCakeArt, jingCakeArt]

const sceneMeta = [
  { key: 'prologue', index: '序', title: '穿云见月', subtitle: '三秋恰半' },
  { key: 'moon-palace', index: '壹', title: '月宫清辉', subtitle: '神话与想象' },
  { key: 'landscape', index: '贰', title: '山水诗境', subtitle: '月照古今' },
  { key: 'lantern-market', index: '叁', title: '古城灯市', subtitle: '风俗人间' },
  { key: 'flavors', index: '肆', title: '一口团圆', subtitle: '四方风味' },
  { key: 'reunion', index: '伍', title: '人间团圆', subtitle: '万家灯火' },
  { key: 'finale', index: '终', title: '万家共月', subtitle: '天涯此时' },
]

const poemData = [
  { line: '海上生明月，天涯共此时。', author: '〔唐〕张九龄', note: '望月怀远' },
  { line: '露从今夜白，月是故乡明。', author: '〔唐〕杜甫', note: '月夜忆舍弟' },
  { line: '但愿人长久，千里共婵娟。', author: '〔宋〕苏轼', note: '水调歌头' },
]

const foodData = [
  { name: '广式', note: '皮薄馅丰', text: '莲蓉与咸蛋黄层层相合，油润细腻。' },
  { name: '苏式', note: '酥层分明', text: '水油皮包裹油酥，甜咸皆有江南风味。' },
  { name: '滇式', note: '咸甜交织', text: '云腿与蜂蜜相遇，留下独特的高原风味。' },
  { name: '京式', note: '端正醇厚', text: '传统印纹与规整形制，保留北方气质。' },
]

type InfoContent = { kicker: string; title: string; text: string; quote?: string }

function AssetPlaceholder({ name, assetKey, className = '', color = '#55708d' }: { name: string; assetKey: string; className?: string; color?: string }) {
  const source = artSources[assetKey]
  if (source) return <ArtImage src={source.src} alt={name} assetKey={assetKey} className={'scene-art ' + className} scene={source.scene}/>
  return <div className={'art-placeholder ' + className} data-asset-key={assetKey} style={{ '--asset-color': color } as CSSProperties}>
    <i className="art-shadow"/><i className="art-paper"/><i className="art-cut"/>
    <span>{name}</span><small>{assetKey}</small>
  </div>
}

function ArtImage({ src, alt, assetKey, className = '', scene = 0 }: { src: string; alt: string; assetKey: string; className?: string; scene?: number }) {
  const active = useContext(SceneContext)
  const [readyToLoad, setReadyToLoad] = useState(active === null || Math.abs(active - scene) <= 1)
  const [failed, setFailed] = useState(false)
  useEffect(() => setFailed(false), [src])
  useEffect(() => {
    if (active === null || Math.abs(active - scene) <= 1) setReadyToLoad(true)
  }, [active, scene])
  return <figure className={'art-image ' + className} data-asset-key={assetKey}>
    {readyToLoad && !failed && <img src={src} alt={alt} decoding="async" onError={() => setFailed(true)}/>}
    {failed && <span className="art-fallback">{alt} · 暂未载入</span>}
  </figure>
}

function InfoDialog({ content, onClose }: { content: InfoContent; onClose: () => void }) {
  const ref = useRef<HTMLDialogElement>(null)
  useEffect(() => {
    const dialog = ref.current!
    const previous = document.activeElement as HTMLElement | null
    const overflow = document.body.style.overflow
    dialog.showModal()
    document.body.style.overflow = 'hidden'
    return () => {
      dialog.close()
      document.body.style.overflow = overflow
      previous?.focus({ preventScroll: true })
    }
  }, [])
  return <dialog ref={ref} className="culture-dialog" aria-labelledby="culture-title" onCancel={event => { event.preventDefault(); onClose() }} onClick={event => { if (event.target === event.currentTarget) onClose() }}>
    <article className="culture-card">
      <button className="culture-close" onClick={onClose} aria-label="关闭文化说明" autoFocus><X/></button>
      <span className="culture-kicker">{content.kicker}</span>
      <h2 id="culture-title">{content.title}</h2>
      <div className="culture-rule" aria-hidden="true">✦</div>
      <p>{content.text}</p>
      {content.quote && <blockquote>{content.quote}</blockquote>}
      <footer>月满人间 · 中秋文化志</footer>
    </article>
  </dialog>
}
function FloatingClouds({ pale = false }: { pale?: boolean }) {
  return <div className={'css-clouds' + (pale ? ' css-clouds--pale' : '')} aria-hidden="true">
    <i/><i/><i/><i/><i/>
  </div>
}

function createSeededRandom(seed: number) {
  let state = seed >>> 0
  return () => {
    state += 0x6D2B79F5
    let value = state
    value = Math.imul(value ^ (value >>> 15), value | 1)
    value ^= value + Math.imul(value ^ (value >>> 7), value | 61)
    return ((value ^ (value >>> 14)) >>> 0) / 4294967296
  }
}

const StarField = memo(function StarField({ count = 84, seed = 815, className = '' }: { count?: number; seed?: number; className?: string }) {
  const random = createSeededRandom(seed)
  const stars = Array.from({ length: count }, (_, index) => {
    const brightness = random()
    const size = brightness > .94 ? 3.6 + random() * 1.8 : brightness > .72 ? 1.8 + random() * 1.6 : .65 + random() * 1.25
    return {
      x: 1 + random() * 98,
      y: 2 + random() * 94,
      size,
      opacity: .22 + brightness * .72,
      duration: 2.4 + random() * 4.8,
      delay: random() * -6,
      warm: random() > .82,
      index,
    }
  })

  return <div className={'star-field ' + className} aria-hidden="true">
    {stars.map(star => <i key={star.index} className={star.warm ? 'is-warm' : ''} style={{
      '--star-x': star.x + '%',
      '--star-y': star.y + '%',
      '--star-size': star.size + 'px',
      '--star-opacity': star.opacity,
      '--star-duration': star.duration + 's',
      '--star-delay': star.delay + 's',
    } as CSSProperties}/>)}
  </div>
})

function SceneHeading({ number, eyebrow, title, text, align = 'left' }: { number: string; eyebrow: string; title: string; text: string; align?: 'left' | 'right' }) {
  return <div className={'scene-heading scene-heading--' + align}>
    <span>{number} · {eyebrow}</span><h2>{title}</h2><p>{text}</p>
  </div>
}

function Hotspot({ label, className = '', onClick }: { label: string; className?: string; onClick: () => void }) {
  return <button className={'scene-hotspot ' + className} onClick={onClick}><i/><span>{label}</span></button>
}

export function LandingPage() {
  const handlePointer = (event: React.PointerEvent<HTMLElement>) => {
    if (event.pointerType !== 'mouse' || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const rect = event.currentTarget.getBoundingClientRect()
    const x = ((event.clientX - rect.left) / rect.width - .5) * 2
    const y = ((event.clientY - rect.top) / rect.height - .5) * 2
    event.currentTarget.style.setProperty('--mx', String(x))
    event.currentTarget.style.setProperty('--my', String(y))
  }

  return <main className="portal-page" onPointerMove={handlePointer}>
    <div className="portal-night"/>
    <StarField count={96} seed={815} className="portal-stars"/>
    <FloatingClouds/>
    <div className="portal-branch portal-branch--left"><i/><i/><i/><i/><i/></div>
    <div className="portal-branch portal-branch--right"><i/><i/><i/></div>
    <div className="moon-gate">
      <div className="moon-gate-ring"><i/><i/><i/></div>
      <div className="moon-gate-world">
        <AssetPlaceholder name="月宫主殿" assetKey="moon-palace.main-hall" className="portal-palace" color="#4f6989"/>
        <div className="portal-mountains"><i/><i/><i/></div>
        <span className="portal-world-moon"/>
      </div>
    </div>
    <section className="portal-copy">
      <p>八月十五 · 中秋文化数字长卷</p>
      <h1>月满<br/><em>人间</em></h1>
      <blockquote>一幅可以走进去的中秋长卷</blockquote>
      <span>循一线月光，越过月宫、山河与灯火。<br/>所见不是章节，而是同一轮月亮下的万千人间。</span>
    </section>
    <div className="portal-actions">
      <a className="enter-button" href="/journey"><span>入画</span><ArrowRight/></a>
      <a className="atlas-button" href="/atlas"><Map/><span>展开舆图</span></a>
    </div>
    <div className="portal-note"><span>一轮月 · 万千人间</span><i/></div>
  </main>
}

export function JourneyPage() {
  const shellRef = useRef<HTMLDivElement>(null)
  const stageRef = useRef<HTMLDivElement>(null)
  const [activeScene, setActiveScene] = useState(0)
  const [info, setInfo] = useState<InfoContent | null>(null)
  const [poem, setPoem] = useState(0)
  const [food, setFood] = useState(0)
  const [calm, setCalm] = useState(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches)
  const currentIndex = useRef(-1)
  const timelineRef = useRef<gsap.core.Timeline | null>(null)

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => setCalm(media.matches)
    media.addEventListener('change', update)
    return () => media.removeEventListener('change', update)
  }, [])

  const scrollToScene = (index: number) => {
    const shell = shellRef.current
    if (!shell) return
    const range = shell.offsetHeight - window.innerHeight
    window.scrollTo({ top: shell.offsetTop + range * (index / (sceneMeta.length - 1)), behavior: calm ? 'instant' : 'smooth' })
  }

  useLayoutEffect(() => {
    const shell = shellRef.current
    const stage = stageRef.current
    if (!shell || !stage) return
    const context = gsap.context(() => {
      const scenes = Array.from(stage.querySelectorAll<HTMLElement>('.journey-scene'))
      const activate = (index: number) => {
        if (currentIndex.current === index) return
        currentIndex.current = index
        scenes.forEach((scene, i) => {
          scene.inert = i !== index
          scene.setAttribute('aria-hidden', String(i !== index))
          scene.dataset.active = String(i === index)
        })
        setActiveScene(index)
      }
      currentIndex.current = -1
      gsap.set(scenes, { autoAlpha: 0 })
      gsap.set(scenes[0], { autoAlpha: 1 })
      activate(0)
      const timeline = gsap.timeline({
        defaults: { ease: 'none' },
        onUpdate() {
          activate(Math.min(6, Math.floor(this.time() + .19)))
          stage.style.setProperty('--journey-progress', String(this.progress()))
        },
        scrollTrigger: {
          trigger: shell, start: 'top top', end: 'bottom bottom',
          scrub: calm ? true : .32, invalidateOnRefresh: true,
        },
      })
      timelineRef.current = timeline
      scenes.forEach((scene, i) => {
        if (i > 0) {
          timeline.to(scenes[i - 1], { autoAlpha: 0, duration: .38 }, i - .38)
          timeline.to(scene, { autoAlpha: 1, duration: .38 }, i - .38)
        }
        if (!calm && i < scenes.length - 1) {
          for (const [depth, distance] of [['far', 1], ['middle', 2], ['near', 3]] as const) {
            const layers = scene.querySelectorAll('[data-depth="' + depth + '"]')
            if (layers.length) timeline.fromTo(layers, { xPercent: -distance }, { xPercent: distance, duration: .62 }, i)
          }
        }
      })
      ScrollTrigger.refresh()
    }, stage)
    return () => { timelineRef.current = null; context.revert() }
  }, [calm])

  useEffect(() => {
    const target = sceneMeta.findIndex(item => item.key === new URLSearchParams(window.location.search).get('scene'))
    if (target <= 0) return
    const frame = requestAnimationFrame(() => {
      const shell = shellRef.current!
      window.scrollTo({ top: shell.offsetTop + (shell.offsetHeight - window.innerHeight) * target / 6, behavior: 'instant' })
      ScrollTrigger.update()
      timelineRef.current?.progress(target / 6)
    })
    return () => cancelAnimationFrame(frame)
  }, [])
  return <SceneContext.Provider value={activeScene}><main className={"journey-page" + (calm ? " is-calm" : "")}>
    <div className="journey-shell" ref={shellRef}>
      <div className="journey-stage" ref={stageRef}>
        <header className="journey-header">
          <a href="/" className="journey-brand"><Moon fill="currentColor"/><span>月满人间<small>动态纸雕长卷</small></span></a>
          <div><button className="motion-toggle" onClick={() => setCalm(value => !value)} aria-pressed={calm} aria-label={calm ? '开启动效' : '静观：减少动效'}>{calm ? <Play/> : <Pause/>}<span>{calm ? '开启动效' : '静观'}</span></button><a href="/atlas" aria-label="打开月下舆图"><Compass/></a></div>
        </header>

        <section className="journey-scene scene-prologue">
          <StarField count={118} seed={2026} className="scene-stars"/><FloatingClouds/>
          <div className="giant-moon" data-depth="far"><i/><i/><i/></div>
          <ArtImage src={craneArtwork} alt="展翅飞过月面的丹顶仙鹤纸雕" assetKey="character.crane-flying" className="crane-artwork"/>
          <div className="silhouette-mountains" data-depth="middle"><i/><i/><i/></div>
          <SceneHeading number="序" eyebrow="三秋恰半" title="穿云见月" text="中秋之名，取秋季正中之意。从祭月、赏月到家人团聚，一轮圆月承载了千年的心意。"/>
          <button className="scroll-cue" onClick={() => scrollToScene(1)}><span>循月光前行</span><ArrowDown/></button>
        </section>

        <section className="journey-scene scene-palace">
          <div className="palace-moon" data-depth="far"/>
          <FloatingClouds pale/>
          <AssetPlaceholder name="桂花神树" assetKey="moon-palace.osmanthus-tree" className="palace-tree" color="#667257"/>
          <AssetPlaceholder name="月宫主殿" assetKey="moon-palace.main-hall" className="palace-main" color="#476487"/>
          <AssetPlaceholder name="月宫侧殿" assetKey="moon-palace.side-hall" className="palace-side" color="#5f7894"/>
          <AssetPlaceholder name="嫦娥立姿" assetKey="moon-palace.change-standing" className="change-figure" color="#d4c7a8"/>
          <AssetPlaceholder name="玉兔捣药" assetKey="moon-palace.jade-rabbit-pounding" className="rabbit-figure" color="#dad7c7"/>
          <div className="paper-railing" data-depth="near"><i/><i/><i/><i/><i/></div>
          <SceneHeading number="壹" eyebrow="神话与想象" title="月宫清辉" text="嫦娥、玉兔、吴刚与蟾宫，是古人寄给月亮的四种想象。"/>
          <Hotspot label="嫦娥奔月" className="hotspot-change" onClick={() => setInfo({ kicker: '神话传说 · 非历史事实', title: '奔月 · 清辉长守', text: '相传嫦娥服下不死药，身轻如燕，飞向月宫。故事版本众多，却共同寄托着古人对月亮、永恒与离合的想象。', quote: '嫦娥应悔偷灵药，碧海青天夜夜心。' })}/>
          <Hotspot label="玉兔捣药" className="hotspot-rabbit" onClick={() => setInfo({ kicker: '月宫意象', title: '捣药 · 仁心济世', text: '月中白兔持杵捣药，是汉代以来常见的月宫意象。它让清冷月宫多了一份亲切与生机。', quote: '白兔捣药秋复春，嫦娥孤栖与谁邻。' })}/>
          <Hotspot label="吴刚伐桂" className="hotspot-tree" onClick={() => setInfo({ kicker: '神话传说 · 非历史事实', title: '伐桂 · 生生不息', text: '吴刚受罚砍伐月中桂树，树创随合，永无止境。后人从中读出坚持、磨炼与生命不息。' })}/>
        </section>

        <section className="journey-scene scene-landscape">
          <div className="landscape-moon" data-depth="far"/>
          <AssetPlaceholder name="远山组" assetKey="landscape.mountains-far" className="mountain-layer mountain-far" color="#91a5a0"/>
          <AssetPlaceholder name="中山组" assetKey="landscape.mountains-middle" className="mountain-layer mountain-mid" color="#617d76"/>
          <AssetPlaceholder name="近山组" assetKey="landscape.mountains-near" className="mountain-layer mountain-near" color="#344f50"/>
          <AssetPlaceholder name="山间亭台" assetKey="landscape.hexagonal-pavilion" className="pavilion-placeholder" color="#5f7181"/>
          <AssetPlaceholder name="临水石桥" assetKey="landscape.stone-bridge" className="bridge-placeholder" color="#8c938d"/>
          <div className="css-river" data-depth="middle"><i/><i/><i/></div>
          <div className="foreground-reeds" data-depth="near">{Array.from({ length: 12 }, (_, i) => <i key={i}/>)}</div>
          <SceneHeading number="贰" eyebrow="月照古今" title="山水诗境" text="古人将无法抵达的故乡、无法相见的人，都交给月亮代为照看。"/>
          <div className="poem-scroll" aria-live="polite">
            <span>{poemData[poem].note}</span><blockquote key={poem}>{poemData[poem].line.split('，').map((line, i) => <span key={i} className="poem-verse">{line}{i === 0 ? '，' : ''}</span>)}</blockquote><p>{poemData[poem].author}</p>
            <div>{poemData.map((item, index) => <button key={item.line} className={index === poem ? 'active' : ''} aria-pressed={index === poem} onClick={() => setPoem(index)} aria-label={'查看诗句 ' + (index + 1)}>{index + 1}</button>)}</div>
          </div>
          <Hotspot label="水中月影" className="hotspot-river" onClick={() => setInfo({ kicker: '月下诗意', title: '为什么诗人总在望月？', text: '月亮同时照见相隔千里的人，因此成为思乡、怀人和团圆最稳定的共同意象。望月，是在确认远方的人也拥有同一片清辉。' })}/>
        </section>

        <section className="journey-scene scene-market">
          <div className="market-sky" data-depth="far"/>
          <AssetPlaceholder name="城楼剪影" assetKey="lantern-market.city-tower" className="city-tower" color="#344d68"/>
          <AssetPlaceholder name="古城街屋组" assetKey="lantern-market.street-buildings" className="street-buildings" color="#4d6172"/>
          <ArtImage src={marketPeopleArtwork} alt="提灯游赏的中秋灯市人物纸雕组" assetKey="lantern-market.people-group" className="market-people-artwork" scene={3}/>
          <AssetPlaceholder name="月饼铺" assetKey="lantern-market.mooncake-shop" className="shop-placeholder shop-mooncake" color="#77604d"/>
          <AssetPlaceholder name="桂花酒摊" assetKey="lantern-market.osmanthus-wine-stall" className="shop-placeholder shop-wine" color="#67594b"/>
          <AssetPlaceholder name="舞火龙" assetKey="lantern-market.fire-dragon" className="fire-dragon" color="#ae5339"/>
          <div className="lantern-lines" data-depth="near">{Array.from({ length: 9 }, (_, i) => <button key={i} aria-label={i === 4 ? '了解舞火龙' : '了解中秋灯俗'} onClick={() => setInfo(i === 4 ? { kicker: '岭南风俗', title: '舞火龙', text: '草扎巨龙遍插线香，在鼓点和火光中穿街而过。人们借此祈求平安、丰收与风调雨顺。' } : { kicker: '中秋灯俗', title: '一盏灯，一份祈愿', text: '中秋夜，人们扎灯、提灯、悬灯，把对团圆与平安的期盼寄托在灯火中。不同地方的灯样各异，共同点亮了人间月夜。' })}><i/><span>{i === 4 ? '舞火龙' : ''}</span></button>)}</div>
          <SceneHeading number="叁" eyebrow="风俗人间" title="古城灯市" text="祭月、走月、舞火龙、饮桂花酒。不同水土，用不同方式分享同一夜月光。"/>
          <Hotspot label="燃灯赏灯" className="hotspot-lantern" onClick={() => setInfo({ kicker: '湖广 · 岭南', title: '灯火照人间', text: '中秋燃灯有祈福、助月色的意味。竹条扎灯，悬于高处，点点灯火与天上明月相映。' })}/>
          <Hotspot label="桂花酒" className="hotspot-wine" onClick={() => setInfo({ kicker: '江南风物', title: '桂子飘香', text: '桂花盛放正值中秋。清甜香气被酿入酒中，寄托富贵、长久与团圆的愿望。' })}/>
        </section>

        <section className="journey-scene scene-flavors">
          <div className="paper-table" data-depth="far"/>
          <div className="food-orbit">{foodData.map((item, index) => <button key={item.name} className={'food-piece food-piece-' + index + (index === food ? ' active' : '')} aria-label={item.name + '月饼'} aria-pressed={index === food} onClick={() => setFood(index)}><i/><span>{item.name}<small>月饼</small></span></button>)}</div>
          <AssetPlaceholder name="茶具组" assetKey="reunion.tea-set" className="tea-placeholder" color="#8aa09d"/>
          <AssetPlaceholder name="桂花酒坛" assetKey="reunion.osmanthus-wine-jar" className="wine-jar-placeholder" color="#8a6048"/>
          <AssetPlaceholder name="柚子与果肉" assetKey="food.pomelo" className="pomelo-placeholder" color="#9ba168"/>
          <SceneHeading number="肆" eyebrow="四方风味" title="一口团圆" text="从岭南到江南，从北方到高原，不同风土，被包进一枚圆饼。"/>
          <ArtImage src={cakeSources[food]} alt={foodData[food].name + '月饼'} assetKey={'food.mooncake-' + food} className="cake-artwork" scene={4}/><div className="food-caption" aria-live="polite"><span>{foodData[food].name}月饼 · {foodData[food].note}</span><p>{foodData[food].text}</p><small>点击月饼切换流派</small></div>
        </section>

        <section className="journey-scene scene-reunion">
          <div className="reunion-night" data-depth="far"/>
          <div className="window-frame" data-depth="near"><i/><i/><i/><i/></div>
          <AssetPlaceholder name="赏月庭院" assetKey="reunion.moon-viewing-courtyard" className="courtyard-placeholder" color="#5e6c69"/>
          <AssetPlaceholder name="团圆家宴人物组" assetKey="reunion.family-dinner-group" className="family-placeholder" color="#8a614b"/>
          <div className="warm-lamp"><i/></div>
          <SceneHeading number="伍" eyebrow="万家灯火" title="人间团圆" text="中秋的意义，从来不只在天上的月亮。它也在一张圆桌、一盏灯、一封未寄出的问候里。"/>
          <Hotspot label="同席" className="hotspot-family" onClick={() => setInfo({ kicker: '人间中秋', title: '月圆是天象，团圆是人心', text: '围坐、分食、举杯，这些普通的动作让节日真正落在人间。团圆不只是相聚，也包括对未归之人的惦念。' })}/>
          <Hotspot label="遥祝" className="hotspot-empty-seat" onClick={() => setInfo({ kicker: '共此时', title: '相隔千里，也可共享月光', text: '当无法归家时，人们借月亮确认彼此仍处于同一片夜色。中秋因此既关乎相聚，也容纳离别与思念。' })}/>
        </section>

        <section className="journey-scene scene-finale">
          <div className="finale-moon" data-depth="far"/>
          <div className="finale-city" data-depth="middle">{Array.from({ length: 28 }, (_, i) => <i key={i} style={{ '--h': (25 + (i * 17) % 65) + 'px', '--d': ((i % 8) * .12) + 's' } as CSSProperties}/>)}</div>
          <ArtImage src={craneArtwork} alt="飞向万家灯火的丹顶仙鹤纸雕" assetKey="character.crane-flying" className="finale-crane-artwork" scene={6}/>
          <div className="golden-path" data-depth="near"><svg viewBox="0 0 1000 260" preserveAspectRatio="none"><path d="M-20,210 C150,30 290,280 450,120 S760,20 1040,90"/></svg></div>
          <div className="finale-copy"><span>终 · 天涯此时</span><h2>海上生明月<br/><em>天涯共此时</em></h2><p>愿所有相隔千里的思念，<br/>都能在今夜，被同一轮月光照见。</p><div><button onClick={() => scrollToScene(0)}>再游一遍</button><a href="/atlas">展开月下舆图</a></div></div>
        </section>

        <nav className="scene-rail" aria-label="长卷场景导航">
          <span>{sceneMeta[activeScene].index}</span>
          <div>{sceneMeta.map((scene, index) => <button key={scene.key} className={index === activeScene ? 'active' : ''} aria-label={scene.title} aria-current={index === activeScene ? 'location' : undefined} onClick={() => scrollToScene(index)}><i/><b>{scene.title}</b></button>)}</div>
          <small>{String(activeScene + 1).padStart(2, '0')} / {String(sceneMeta.length).padStart(2, '0')}</small>
        </nav>
      </div>
    </div>

    {info && <InfoDialog content={info} onClose={() => setInfo(null)}/>}
  </main></SceneContext.Provider>
}
export function AtlasPage() {
  return <main className="atlas-page">
    <header><a href="/"><ArrowLeft/>返回月门</a><div><span>月满人间</span><small>月下舆图</small></div><a href="/journey">进入长卷<ArrowRight/></a></header>
    <StarField count={104} seed={1508} className="atlas-stars"/>
    <section className="atlas-copy"><span>MAP OF THE MOONLIT JOURNEY</span><h1>月下舆图</h1><p>这里没有必须完成的章节。选择一处地标，<br/>从你感兴趣的地方进入长卷。</p></section>
    <div className="atlas-map">
      <svg className="atlas-path" viewBox="0 0 1200 500" preserveAspectRatio="none"><path d="M30,320 C170,90 300,90 400,270 S620,450 720,220 S930,55 1160,245"/><path className="atlas-path-glow" d="M30,320 C170,90 300,90 400,270 S620,450 720,220 S930,55 1160,245"/></svg>
      {sceneMeta.slice(1, 6).map((scene, index) => <a key={scene.key} href={'/journey?scene=' + scene.key} className={'atlas-node atlas-node-' + index}><i><span>{scene.index}</span></i><b>{scene.title}</b><small>{scene.subtitle}</small></a>)}
      <a href="/journey?scene=finale" className="atlas-node atlas-node-5"><i><Moon fill="currentColor"/></i><b>万家共月</b><small>天涯此时</small></a>
    </div>
    <div className="atlas-legend"><Compass/><span>拖动长卷时，右上角月纹可随时返回此处</span></div>
  </main>
}
