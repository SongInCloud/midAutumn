import { useContext, useEffect, useState } from 'react'
import { SceneContext } from '../context'
import { artSources } from '../data'

/**
 * 真实图片的统一渲染器。
 * 当前场景和相邻场景才加载图片，避免一次性请求整套大图。
 */
export function ArtImage({ src, alt, assetKey, className = '', scene = 0 }: { src: string; alt: string; assetKey: string; className?: string; scene?: number }) {
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

/**
 * 素材还没有接入时的低对比占位块。
 * 只要 data 中存在同名 assetKey，就会自动切换到真实图片。
 */
export function AssetPlaceholder({ name, assetKey, className = '', color = '#55708d' }: { name: string; assetKey: string; className?: string; color?: string }) {
  const source = artSources[assetKey]
  if (source) return <ArtImage src={source.src} alt={name} assetKey={assetKey} className={'scene-art ' + className} scene={source.scene}/>
  return <div className={'art-placeholder ' + className} data-asset-key={assetKey} style={{ '--asset-color': color } as React.CSSProperties}>
    <i className="art-shadow"/><i className="art-paper"/><i className="art-cut"/>
    <span>{name}</span><small>{assetKey}</small>
  </div>
}
