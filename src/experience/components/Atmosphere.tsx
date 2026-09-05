import { CSSProperties, memo } from 'react'

/** CSS 云层只负责氛围，不占用图片资源。 */
export function FloatingClouds({ pale = false }: { pale?: boolean }) {
  return <div className={'css-clouds' + (pale ? ' css-clouds--pale' : '')} aria-hidden="true"><i/><i/><i/><i/><i/></div>
}

/** 固定种子的随机数让星点散乱但可复现，刷新时不会跳位置。 */
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

export const StarField = memo(function StarField({ count = 84, seed = 815, className = '' }: { count?: number; seed?: number; className?: string }) {
  const random = createSeededRandom(seed)
  const stars = Array.from({ length: count }, (_, index) => {
    const brightness = random()
    const size = brightness > .94 ? 3.6 + random() * 1.8 : brightness > .72 ? 1.8 + random() * 1.6 : .65 + random() * 1.25
    return { x: 1 + random() * 98, y: 2 + random() * 94, size, opacity: .22 + brightness * .72, duration: 2.4 + random() * 4.8, delay: random() * -6, warm: random() > .82, index }
  })
  return <div className={'star-field ' + className} aria-hidden="true">
    {stars.map(star => <i key={star.index} className={star.warm ? 'is-warm' : ''} style={{ '--star-x': star.x + '%', '--star-y': star.y + '%', '--star-size': star.size + 'px', '--star-opacity': star.opacity, '--star-duration': star.duration + 's', '--star-delay': star.delay + 's' } as CSSProperties}/>)}
  </div>
})
