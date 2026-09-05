import type { ArtSource, FoodItem, PoemItem, SceneMeta } from './types'

// 真实素材集中在数据层管理，页面组件只关心 assetKey，不直接散落文件路径。
import treeArt from '../../image/月宫场景/桂花神树.png'
import changeArt from '../../image/核心角色/嫦娥飞升姿.png'
import palaceArt from '../../image/月宫场景/月宫主殿.png'
import rabbitArt from '../../image/核心角色/玉兔捣药.png'
import craneArt from '../../image/核心角色/月宫仙鹤.png'
import marketPeopleArt from '../../image/核心角色/灯市人物组.png'
import mountainsArt from '../../image/山水空间/远山组.png'
import pavilionArt from '../../image/山水空间/山间亭台.png'
import courtyardArt from '../../image/人间团圆/赏月庭院.png'
import familyArt from '../../image/人间团圆/团圆家宴人物组.png'
import cakeArt from '../../image/食物展示/广式月饼.png'
import suCakeArt from '../../image/食物展示/苏式月饼.png'
import dianCakeArt from '../../image/食物展示/滇式月饼.png'
import jingCakeArt from '../../image/食物展示/京式月饼.png'

export const sceneMeta: SceneMeta[] = [
  { key: 'prologue', index: '序', title: '穿云见月', subtitle: '三秋恰半' },
  { key: 'moon-palace', index: '壹', title: '月宫清辉', subtitle: '神话与想象' },
  { key: 'landscape', index: '贰', title: '山水诗境', subtitle: '月照古今' },
  { key: 'lantern-market', index: '叁', title: '古城灯市', subtitle: '风俗人间' },
  { key: 'flavors', index: '肆', title: '一口团圆', subtitle: '四方风味' },
  { key: 'reunion', index: '伍', title: '人间团圆', subtitle: '万家灯火' },
  { key: 'finale', index: '终', title: '万家共月', subtitle: '天涯此时' },
]

export const poemData: PoemItem[] = [
  { line: '海上生明月，天涯共此时。', author: '〔唐〕张九龄', note: '望月怀远' },
  { line: '露从今夜白，月是故乡明。', author: '〔唐〕杜甫', note: '月夜忆舍弟' },
  { line: '但愿人长久，千里共婵娟。', author: '〔宋〕苏轼', note: '水调歌头' },
]

export const foodData: FoodItem[] = [
  { name: '广式', note: '皮薄馅丰', text: '莲蓉与咸蛋黄层层相合，油润细腻。' },
  { name: '苏式', note: '酥层分明', text: '水油皮包裹油酥，甜咸皆有江南风味。' },
  { name: '滇式', note: '咸甜交织', text: '云腿与蜂蜜相遇，留下独特的高原风味。' },
  { name: '京式', note: '端正醇厚', text: '传统印纹与规整形制，保留北方气质。' },
]

export const artSources: Record<string, ArtSource> = {
  'moon-palace.osmanthus-tree': { src: treeArt, scene: 1 },
  'moon-palace.change-standing': { src: changeArt, scene: 1 },
  'moon-palace.main-hall': { src: palaceArt, scene: 1 },
  'moon-palace.jade-rabbit-pounding': { src: rabbitArt, scene: 1 },
  'landscape.mountains-far': { src: mountainsArt, scene: 2 },
  'landscape.hexagonal-pavilion': { src: pavilionArt, scene: 2 },
  'reunion.moon-viewing-courtyard': { src: courtyardArt, scene: 5 },
  'reunion.family-dinner-group': { src: familyArt, scene: 5 },
}

export const characterArt = {
  crane: craneArt,
  marketPeople: marketPeopleArt,
}

export const cakeSources = [cakeArt, suCakeArt, dianCakeArt, jingCakeArt]
