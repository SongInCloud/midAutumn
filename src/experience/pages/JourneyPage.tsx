import { CSSProperties, useState } from 'react'
import { ArrowDown, Compass, Moon, Pause, Play } from 'lucide-react'
import { SceneContext } from '../context'
import { characterArt, cakeSources, foodData, poemData, sceneMeta } from '../data'
import type { InfoContent } from '../types'
import { useJourneyScroll } from '../hooks/useJourneyScroll'
import { useMotionPreference } from '../hooks/useMotionPreference'
import { AssetPlaceholder, ArtImage } from '../components/ArtAsset'
import { FloatingClouds, StarField } from '../components/Atmosphere'
import { Hotspot, InfoDialog, SceneHeading } from '../components/SceneUI'

/**
 * 沉浸式长卷页面。
 * 页面负责组合场景，滚动计算已移入 useJourneyScroll，便于单独学习和复用。
 */export function JourneyPage() {
  const [info, setInfo] = useState<InfoContent | null>(null)
  const [poem, setPoem] = useState(0)
  const [food, setFood] = useState(0)
  const { calm, setCalm } = useMotionPreference()
  const { shellRef, stageRef, activeScene, scrollToScene } = useJourneyScroll(calm)

  return <SceneContext.Provider value={activeScene}><main className={"journey-page" + (calm ? " is-calm" : "")}>
    <div className="journey-shell" ref={shellRef}>
      <div className="journey-stage" ref={stageRef}>
        <header className="journey-header">
          <a href="/" className="journey-brand"><Moon fill="currentColor"/><span>月满人间<small>动态纸雕长卷</small></span></a>
          <div><button className="motion-toggle" onClick={() => setCalm(value => !value)} aria-pressed={calm} aria-label={calm ? '开启动效' : '静观：减少动效'}>{calm ? <Play/> : <Pause/>}<span>{calm ? '开启动效' : '静观'}</span></button><a href="/atlas" aria-label="打开月下舆图"><Compass/></a></div>
        </header>

        {/* 序章：用月亮和仙鹤建立进入长卷的视觉入口。 */}
        <section className="journey-scene scene-prologue">
          <StarField count={118} seed={2026} className="scene-stars"/><FloatingClouds/>
          <div className="giant-moon" data-depth="far"><i/><i/><i/></div>
          <ArtImage src={characterArt.crane} alt="展翅飞过月面的丹顶仙鹤纸雕" assetKey="character.crane-flying" className="crane-artwork"/>
          <div className="silhouette-mountains" data-depth="middle"><i/><i/><i/></div>
          <SceneHeading number="序" eyebrow="三秋恰半" title="穿云见月" text="中秋之名，取秋季正中之意。从祭月、赏月到家人团聚，一轮圆月承载了千年的心意。"/>
          <button className="scroll-cue" onClick={() => scrollToScene(1)}><span>循月光前行</span><ArrowDown/></button>
        </section>

        {/* 第一幕：月宫神话，热点打开文化说明弹层。 */}
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

        {/* 第二幕：山水诗境，诗句按钮只更新局部内容。 */}
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

        {/* 第三幕：灯市风俗，灯笼和热点共享说明状态。 */}
        <section className="journey-scene scene-market">
          <div className="market-sky" data-depth="far"/>
          <AssetPlaceholder name="城楼剪影" assetKey="lantern-market.city-tower" className="city-tower" color="#344d68"/>
          <AssetPlaceholder name="古城街屋组" assetKey="lantern-market.street-buildings" className="street-buildings" color="#4d6172"/>
          <ArtImage src={characterArt.marketPeople} alt="提灯游赏的中秋灯市人物纸雕组" assetKey="lantern-market.people-group" className="market-people-artwork" scene={3}/>
          <AssetPlaceholder name="月饼铺" assetKey="lantern-market.mooncake-shop" className="shop-placeholder shop-mooncake" color="#77604d"/>
          <AssetPlaceholder name="桂花酒摊" assetKey="lantern-market.osmanthus-wine-stall" className="shop-placeholder shop-wine" color="#67594b"/>
          <AssetPlaceholder name="舞火龙" assetKey="lantern-market.fire-dragon" className="fire-dragon" color="#ae5339"/>
          <div className="lantern-lines" data-depth="near">{Array.from({ length: 9 }, (_, i) => <button key={i} aria-label={i === 4 ? '了解舞火龙' : '了解中秋灯俗'} onClick={() => setInfo(i === 4 ? { kicker: '岭南风俗', title: '舞火龙', text: '草扎巨龙遍插线香，在鼓点和火光中穿街而过。人们借此祈求平安、丰收与风调雨顺。' } : { kicker: '中秋灯俗', title: '一盏灯，一份祈愿', text: '中秋夜，人们扎灯、提灯、悬灯，把对团圆与平安的期盼寄托在灯火中。不同地方的灯样各异，共同点亮了人间月夜。' })}><i/><span>{i === 4 ? '舞火龙' : ''}</span></button>)}</div>
          <SceneHeading number="叁" eyebrow="风俗人间" title="古城灯市" text="祭月、走月、舞火龙、饮桂花酒。不同水土，用不同方式分享同一夜月光。"/>
          <Hotspot label="燃灯赏灯" className="hotspot-lantern" onClick={() => setInfo({ kicker: '湖广 · 岭南', title: '灯火照人间', text: '中秋燃灯有祈福、助月色的意味。竹条扎灯，悬于高处，点点灯火与天上明月相映。' })}/>
          <Hotspot label="桂花酒" className="hotspot-wine" onClick={() => setInfo({ kicker: '江南风物', title: '桂子飘香', text: '桂花盛放正值中秋。清甜香气被酿入酒中，寄托富贵、长久与团圆的愿望。' })}/>
        </section>

        {/* 第四幕：月饼图鉴，food 状态驱动图片和文字同步切换。 */}
        <section className="journey-scene scene-flavors">
          <div className="paper-table" data-depth="far"/>
          <div className="food-orbit">{foodData.map((item, index) => <button key={item.name} className={'food-piece food-piece-' + index + (index === food ? ' active' : '')} aria-label={item.name + '月饼'} aria-pressed={index === food} onClick={() => setFood(index)}><i/><span>{item.name}<small>月饼</small></span></button>)}</div>
          <AssetPlaceholder name="茶具组" assetKey="reunion.tea-set" className="tea-placeholder" color="#8aa09d"/>
          <AssetPlaceholder name="桂花酒坛" assetKey="reunion.osmanthus-wine-jar" className="wine-jar-placeholder" color="#8a6048"/>
          <AssetPlaceholder name="柚子与果肉" assetKey="food.pomelo" className="pomelo-placeholder" color="#9ba168"/>
          <SceneHeading number="肆" eyebrow="四方风味" title="一口团圆" text="从岭南到江南，从北方到高原，不同风土，被包进一枚圆饼。"/>
          <ArtImage src={cakeSources[food]} alt={foodData[food].name + '月饼'} assetKey={'food.mooncake-' + food} className="cake-artwork" scene={4}/><div className="food-caption" aria-live="polite"><span>{foodData[food].name}月饼 · {foodData[food].note}</span><p>{foodData[food].text}</p><small>点击月饼切换流派</small></div>
        </section>

        {/* 第五幕：团圆庭院，把真实场景图作为背景层。 */}
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

        {/* 终章：把长卷的情绪收束到共赏一轮月。 */}
        <section className="journey-scene scene-finale">
          <div className="finale-moon" data-depth="far"/>
          <div className="finale-city" data-depth="middle">{Array.from({ length: 28 }, (_, i) => <i key={i} style={{ '--h': (25 + (i * 17) % 65) + 'px', '--d': ((i % 8) * .12) + 's' } as CSSProperties}/>)}</div>
          <ArtImage src={characterArt.crane} alt="飞向万家灯火的丹顶仙鹤纸雕" assetKey="character.crane-flying" className="finale-crane-artwork" scene={6}/>
          <div className="golden-path" data-depth="near"><svg viewBox="0 0 1000 260" preserveAspectRatio="none"><path d="M-20,210 C150,30 290,280 450,120 S760,20 1040,90"/></svg></div>
          <div className="finale-copy"><span>终 · 天涯此时</span><h2>海上生明月<br/><em>天涯共此时</em></h2><p>愿所有相隔千里的思念，<br/>都能在今夜，被同一轮月光照见。</p><div><button onClick={() => scrollToScene(0)}>再游一遍</button><a href="/atlas">展开月下舆图</a></div></div>
        </section>

        {/* 桌面右侧、手机底部共用这一份场景导航数据。 */}
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





