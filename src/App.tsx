import { AtlasPage, JourneyPage, LandingPage } from './experience/Experience'

export default function App() {
  const path = window.location.pathname.replace(/\/+$/, '') || '/'
  if (path === '/journey') return <JourneyPage />
  if (path === '/atlas') return <AtlasPage />
  return <LandingPage />
}
