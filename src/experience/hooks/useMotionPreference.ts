import { useEffect, useState } from 'react'

/**
 * 读取系统的减少动态效果偏好，并允许用户在页面内手动开启静观模式。
 */
export function useMotionPreference() {
  const [systemReduced, setSystemReduced] = useState(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches)
  const [manualReduced, setManualReduced] = useState(false)

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => setSystemReduced(media.matches)
    media.addEventListener('change', update)
    return () => media.removeEventListener('change', update)
  }, [])

  return { calm: systemReduced || manualReduced, setCalm: setManualReduced }
}
