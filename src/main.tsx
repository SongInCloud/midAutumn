import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import AssetManager from './admin/AssetManager'
import './styles.css'
import './experience/experience.css'
import './experience/refinement.css'
import './admin/admin.css'

const path = window.location.pathname.replace(/\/+$/, '') || '/'
const page = path === '/admin/assets' ? <AssetManager /> : <App />

createRoot(document.getElementById('root')!).render(<StrictMode>{page}</StrictMode>)
