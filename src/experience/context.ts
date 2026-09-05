import { createContext } from 'react'

/**
 * 当前长卷场景编号。
 * null 表示组件脱离长卷单独使用，例如入口页中的月宫图。
 */
export const SceneContext = createContext<number | null>(null)
