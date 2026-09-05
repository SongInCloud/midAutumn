import { ArrowLeft, ArrowRight, Compass, Moon } from 'lucide-react'
import { StarField } from '../components/Atmosphere'
import { sceneMeta } from '../data'

/**
 * 舆图页：把七幕内容平铺为可自由选择的入口。
 * 它不依赖长卷内部状态，因此可以单独作为一个页面学习路由跳转。
 */
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
