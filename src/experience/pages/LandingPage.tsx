import { ArrowRight, Map } from 'lucide-react'
import { AssetPlaceholder } from '../components/ArtAsset'
import { FloatingClouds, StarField } from '../components/Atmosphere'

/**
 * 入口页：用一扇月门说明网站的浏览方式。
 * 页面只负责入口视觉和导航，具体内容交给长卷与舆图页面。
 */
export function LandingPage() {
  const handlePointer = (event: React.PointerEvent<HTMLElement>) => {
    if (event.pointerType !== 'mouse' || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const rect = event.currentTarget.getBoundingClientRect()
    event.currentTarget.style.setProperty('--mx', String(((event.clientX - rect.left) / rect.width - .5) * 2))
    event.currentTarget.style.setProperty('--my', String(((event.clientY - rect.top) / rect.height - .5) * 2))
  }

  return <main className="portal-page" onPointerMove={handlePointer}>
    <div className="portal-night"/><StarField count={96} seed={815} className="portal-stars"/><FloatingClouds/>
    <div className="portal-branch portal-branch--left"><i/><i/><i/><i/><i/></div><div className="portal-branch portal-branch--right"><i/><i/><i/></div>
    <div className="moon-gate">
      <div className="moon-gate-ring"><i/><i/><i/></div>
      <div className="moon-gate-world">
        <AssetPlaceholder name="月宫主殿" assetKey="moon-palace.main-hall" className="portal-palace" color="#4f6989"/>
        <div className="portal-mountains"><i/><i/><i/></div><span className="portal-world-moon"/>
      </div>
    </div>
    <section className="portal-copy">
      <p>八月十五 · 中秋文化数字长卷</p><h1>月满<br/><em>人间</em></h1>
      <blockquote>一幅可以走进去的中秋长卷</blockquote>
      <span>循一线月光，越过月宫、山河与灯火。<br/>所见不是章节，而是同一轮月亮下的万千人间。</span>
    </section>
    <div className="portal-actions"><a className="enter-button" href="/journey"><span>入画</span><ArrowRight/></a><a className="atlas-button" href="/atlas"><Map/><span>展开舆图</span></a></div>
    <div className="portal-note"><span>一轮月 · 万千人间</span><i/></div>
  </main>
}
