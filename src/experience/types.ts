/**
 * 中秋体验站共享类型。
 * 把类型集中放在这里，可以让页面、组件和 Hook 使用同一套数据契约。
 */
export type SceneMeta = {
  key: string
  index: string
  title: string
  subtitle: string
}

export type PoemItem = {
  line: string
  author: string
  note: string
}

export type FoodItem = {
  name: string
  note: string
  text: string
}

export type InfoContent = {
  kicker: string
  title: string
  text: string
  quote?: string
}

export type ArtSource = {
  src: string
  scene: number
}
