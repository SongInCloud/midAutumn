import { useEffect, useRef } from 'react'
import { X } from 'lucide-react'
import type { InfoContent } from '../types'

/** 场景标题统一结构，保持每一幕的文字节奏一致。 */
export function SceneHeading({ number, eyebrow, title, text }: { number: string; eyebrow: string; title: string; text: string }) {
  return <div className="scene-heading"><span>{number} · {eyebrow}</span><h2>{title}</h2><p>{text}</p></div>
}

/** 热点是按钮而非纯装饰，保证键盘和读屏用户也能访问。 */
export function Hotspot({ label, className = '', onClick }: { label: string; className?: string; onClick: () => void }) {
  return <button className={'scene-hotspot ' + className} onClick={onClick}><i/><span>{label}</span></button>
}

/** 原生 dialog 提供焦点锁定、Esc 关闭和背景滚动锁定。 */
export function InfoDialog({ content, onClose }: { content: InfoContent; onClose: () => void }) {
  const ref = useRef<HTMLDialogElement>(null)
  useEffect(() => {
    const dialog = ref.current!
    const previous = document.activeElement as HTMLElement | null
    const overflow = document.body.style.overflow
    dialog.showModal()
    document.body.style.overflow = 'hidden'
    return () => { dialog.close(); document.body.style.overflow = overflow; previous?.focus({ preventScroll: true }) }
  }, [])
  return <dialog ref={ref} className="culture-dialog" aria-labelledby="culture-title" onCancel={event => { event.preventDefault(); onClose() }} onClick={event => { if (event.target === event.currentTarget) onClose() }}>
    <article className="culture-card">
      <button className="culture-close" onClick={onClose} aria-label="关闭文化说明" autoFocus><X/></button>
      <span className="culture-kicker">{content.kicker}</span><h2 id="culture-title">{content.title}</h2>
      <div className="culture-rule" aria-hidden="true">✦</div><p>{content.text}</p>
      {content.quote && <blockquote>{content.quote}</blockquote>}<footer>月满人间 · 中秋文化志</footer>
    </article>
  </dialog>
}
