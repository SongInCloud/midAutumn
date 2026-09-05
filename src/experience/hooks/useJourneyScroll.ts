import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { sceneMeta } from '../data'

gsap.registerPlugin(ScrollTrigger)

/**
 * 长卷唯一的滚动控制器。
 * 页面只消费 activeScene 和 scrollToScene，不需要知道 ScrollTrigger 的细节。
 */
export function useJourneyScroll(calm: boolean) {
  const shellRef = useRef<HTMLDivElement>(null)
  const stageRef = useRef<HTMLDivElement>(null)
  const timelineRef = useRef<gsap.core.Timeline | null>(null)
  const currentIndex = useRef(-1)
  const [activeScene, setActiveScene] = useState(0)

  const scrollToScene = useCallback((index: number) => {
    const shell = shellRef.current
    if (!shell) return
    const safeIndex = Math.max(0, Math.min(sceneMeta.length - 1, index))
    const range = shell.offsetHeight - window.innerHeight
    window.scrollTo({ top: shell.offsetTop + range * (safeIndex / (sceneMeta.length - 1)), behavior: calm ? 'auto' : 'smooth' })
  }, [calm])

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
          const isActive = i === index
          scene.inert = !isActive
          scene.setAttribute('aria-hidden', String(!isActive))
          scene.dataset.active = String(isActive)
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
          // 时间轴每一秒对应一幕，避免进度条和右侧编号错位。
          activate(Math.min(scenes.length - 1, Math.floor(this.time() + .19)))
          stage.style.setProperty('--journey-progress', String(this.progress()))
        },
        scrollTrigger: { trigger: shell, start: 'top top', end: 'bottom bottom', scrub: calm ? true : .32, invalidateOnRefresh: true },
      })
      timelineRef.current = timeline

      scenes.forEach((scene, index) => {
        if (index > 0) {
          timeline.to(scenes[index - 1], { autoAlpha: 0, duration: .38 }, index - .38)
          timeline.to(scene, { autoAlpha: 1, duration: .38 }, index - .38)
        }
        if (!calm && index < scenes.length - 1) {
          for (const [depth, distance] of [['far', 1], ['middle', 2], ['near', 3]] as const) {
            const layers = scene.querySelectorAll('[data-depth="' + depth + '"]')
            if (layers.length) timeline.fromTo(layers, { xPercent: -distance }, { xPercent: distance, duration: .62 }, index)
          }
        }
      })
      ScrollTrigger.refresh()
    }, stage)

    return () => { timelineRef.current = null; context.revert() }
  }, [calm])

  // 支持 /journey?scene=landscape 这种直接进入某一幕的链接。
  useEffect(() => {
    const target = sceneMeta.findIndex(item => item.key === new URLSearchParams(window.location.search).get('scene'))
    if (target <= 0) return
    const frame = requestAnimationFrame(() => {
      const shell = shellRef.current
      if (!shell) return
      window.scrollTo({ top: shell.offsetTop + (shell.offsetHeight - window.innerHeight) * target / (sceneMeta.length - 1), behavior: 'auto' })
      ScrollTrigger.update()
      timelineRef.current?.progress(target / (sceneMeta.length - 1))
    })
    return () => cancelAnimationFrame(frame)
  }, [])

  return { shellRef, stageRef, activeScene, scrollToScene }
}
