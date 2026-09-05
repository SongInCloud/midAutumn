import { AtlasPage, JourneyPage, LandingPage } from './experience/Experience'

/**
 * 极简路由入口。
 * 当前项目没有引入路由库，使用 pathname 也能清楚展示页面之间的关系。
 * 后续如果页面数量增加，可以把这里替换为 React Router 配置。
 */
export default function App() {
  const path = window.location.pathname.replace(/\/+$/, '') || '/'
  if (path === '/journey') return <JourneyPage />
  if (path === '/atlas') return <AtlasPage />
  return <LandingPage />
}
