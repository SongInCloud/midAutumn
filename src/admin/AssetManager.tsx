import { FormEvent, useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import {
  Archive, Box, Check, ChevronRight, Clipboard, CloudUpload, ExternalLink,
  FileImage, FolderTree, Grid2X2, HardDrive, Image, Layers3, List,
  Menu, Moon, MoreHorizontal, Plus, Search, Settings, Sparkles, Trash2, Upload,
  X,
} from 'lucide-react'

type AssetStatus = 'ready' | 'processing' | 'draft' | 'archived'
type AssetRecord = {
  id: string
  name: string
  key: string
  scene: string
  category: string
  status: AssetStatus
  format: 'PNG' | 'WEBP' | 'AVIF' | 'SVG'
  dimensions: string
  size: string
  version: number
  updatedAt: string
  usages: string[]
  color: string
  preview?: string
}

const scenes = ['全部场景', '月门入口', '月宫', '山水诗境', '古城灯市', '舌尖中秋', '人间团圆']
const categories = ['全部类型', '角色', '建筑', '植物', '道具', '食物', '前景']
const statusLabel: Record<AssetStatus, string> = { ready: '已就绪', processing: '处理中', draft: '草稿', archived: '已归档' }

const seedAssets: AssetRecord[] = [
  { id: 'a01', name: '月宫主殿', key: 'moon-palace.main-hall', scene: '月宫', category: '建筑', status: 'ready', format: 'PNG', dimensions: '4800 × 3200', size: '18.4 MB', version: 3, updatedAt: '今天 13:42', usages: ['月宫 · 主场景', '月下舆图 · 地标'], color: '#55708d' },
  { id: 'a02', name: '嫦娥立姿', key: 'moon-palace.change-standing', scene: '月宫', category: '角色', status: 'ready', format: 'WEBP', dimensions: '1800 × 2800', size: '4.8 MB', version: 2, updatedAt: '今天 11:18', usages: ['月宫 · 人物前景'], color: '#c9b58e' },
  { id: 'a03', name: '玉兔捣药', key: 'moon-palace.jade-rabbit-pounding', scene: '月宫', category: '角色', status: 'processing', format: 'PNG', dimensions: '2200 × 2200', size: '12.6 MB', version: 1, updatedAt: '18 分钟前', usages: ['月宫 · 互动热点'], color: '#d7d1bd' },
  { id: 'a04', name: '桂花神树', key: 'moon-palace.osmanthus-tree', scene: '月宫', category: '植物', status: 'ready', format: 'PNG', dimensions: '3600 × 5200', size: '24.1 MB', version: 4, updatedAt: '昨天 18:30', usages: ['月宫 · 中景', '吴刚传说 · 主体'], color: '#6e7659' },
  { id: 'a05', name: '青绿中山层', key: 'landscape.middle-mountain-a', scene: '山水诗境', category: '前景', status: 'ready', format: 'WEBP', dimensions: '5600 × 1900', size: '7.2 MB', version: 2, updatedAt: '昨天 16:05', usages: ['山水诗境 · 中景循环'], color: '#526e68' },
  { id: 'a06', name: '山间六角亭', key: 'landscape.hexagonal-pavilion', scene: '山水诗境', category: '建筑', status: 'draft', format: 'PNG', dimensions: '2400 × 2100', size: '9.7 MB', version: 1, updatedAt: '8月28日', usages: [], color: '#435976' },
  { id: 'a07', name: '红色宫灯', key: 'lantern-market.palace-lantern-red', scene: '古城灯市', category: '道具', status: 'ready', format: 'PNG', dimensions: '1200 × 2200', size: '5.1 MB', version: 5, updatedAt: '8月27日', usages: ['古城灯市 · 前景', '导航热点 · 风俗'], color: '#a64036' },
  { id: 'a08', name: '玉兔纸灯', key: 'lantern-market.rabbit-lantern', scene: '古城灯市', category: '道具', status: 'ready', format: 'PNG', dimensions: '1600 × 1800', size: '6.3 MB', version: 2, updatedAt: '8月27日', usages: ['古城灯市 · 灯铺'], color: '#d8c9aa' },
  { id: 'a09', name: '舞火龙主体', key: 'lantern-market.fire-dragon', scene: '古城灯市', category: '角色', status: 'processing', format: 'PNG', dimensions: '6200 × 1800', size: '28.9 MB', version: 1, updatedAt: '8月26日', usages: ['古城灯市 · 横向穿场'], color: '#b15b35' },
  { id: 'a10', name: '广式月饼剖面', key: 'food.cantonese-mooncake-cutaway', scene: '舌尖中秋', category: '食物', status: 'ready', format: 'WEBP', dimensions: '1800 × 1500', size: '3.6 MB', version: 2, updatedAt: '8月25日', usages: ['舌尖中秋 · 月饼流派'], color: '#a76a3f' },
  { id: 'a11', name: '团圆家宴人物组', key: 'reunion.family-dinner-group', scene: '人间团圆', category: '角色', status: 'draft', format: 'PNG', dimensions: '4200 × 2600', size: '21.5 MB', version: 1, updatedAt: '8月24日', usages: [], color: '#765b4c' },
  { id: 'a12', name: '冰裂纹窗框', key: 'reunion.window-frame', scene: '人间团圆', category: '前景', status: 'ready', format: 'PNG', dimensions: '5000 × 3200', size: '16.8 MB', version: 3, updatedAt: '8月23日', usages: ['人间团圆 · 镜头穿越', '结尾 · 拉远遮挡'], color: '#3c342d' },
]

function AssetArtwork({ asset }: { asset: AssetRecord }) {
  if (asset.preview) return <img src={asset.preview} alt="" />
  return <div className="asset-artwork" style={{ '--asset-color': asset.color } as React.CSSProperties}>
    <span className="paper-layer paper-layer-a" />
    <span className="paper-layer paper-layer-b" />
    <span className="paper-moon" />
    <span className="paper-mark">{asset.name.slice(0, 1)}</span>
  </div>
}

export default function AssetManager() {
  const [assets, setAssets] = useState(seedAssets)
  const [query, setQuery] = useState('')
  const [scene, setScene] = useState('全部场景')
  const [category, setCategory] = useState('全部类型')
  const [view, setView] = useState<'grid' | 'list'>('grid')
  const [selected, setSelected] = useState<AssetRecord | null>(null)
  const [uploadOpen, setUploadOpen] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [toast, setToast] = useState('')
  const toastTimer = useRef<number | null>(null)

  const filteredAssets = useMemo(() => assets.filter(asset => {
    const matchesQuery = (asset.name + asset.key + asset.scene).toLowerCase().includes(query.toLowerCase())
    return matchesQuery && (scene === '全部场景' || asset.scene === scene) && (category === '全部类型' || asset.category === category)
  }), [assets, query, scene, category])

  const notify = (message: string) => {
    setToast(message)
    if (toastTimer.current) window.clearTimeout(toastTimer.current)
    toastTimer.current = window.setTimeout(() => setToast(''), 2200)
  }

  const copyKey = async (key: string) => {
    await navigator.clipboard.writeText(key)
    notify('资源键已复制')
  }

  const handleUpload = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const form = new FormData(event.currentTarget)
    const file = form.get('file') as File
    const name = String(form.get('name') || file?.name || '未命名资源')
    const uploadScene = String(form.get('scene') || '月宫')
    const uploadCategory = String(form.get('category') || '道具')
    const slug = name.toLowerCase().replace(/\s+/g, '-')
    const record: AssetRecord = {
      id: 'local-' + Date.now(),
      name,
      key: uploadScene + '.' + slug,
      scene: uploadScene,
      category: uploadCategory,
      status: 'draft',
      format: 'PNG',
      dimensions: '等待处理',
      size: file?.size ? (file.size / 1024 / 1024).toFixed(1) + ' MB' : '—',
      version: 1,
      updatedAt: '刚刚',
      usages: [],
      color: '#657184',
      preview: file?.size ? URL.createObjectURL(file) : undefined,
    }
    setAssets(current => [record, ...current])
    setUploadOpen(false)
    notify('已登记为草稿；接入 API 后将上传到 MinIO')
  }

  return <div className="asset-admin">
    <aside className={'admin-sidebar' + (sidebarOpen ? ' is-open' : '')}>
      <div className="admin-brand"><span><Moon size={18} fill="currentColor"/></span><div>月满人间<small>ASSET STUDIO</small></div></div>
      <button className="sidebar-close" onClick={() => setSidebarOpen(false)} aria-label="关闭侧栏"><X/></button>
      <nav>
        <span>工作空间</span>
        <button className="active"><Image size={17}/>素材库<small>{assets.length}</small></button>
        <button><Upload size={17}/>上传队列<small>2</small></button>
        <button><FolderTree size={17}/>场景配置</button>
        <button><Layers3 size={17}/>版本记录</button>
        <span>系统</span>
        <button><Trash2 size={17}/>回收站</button>
        <button><Settings size={17}/>存储设置</button>
      </nav>
      <div className="storage-card"><div><HardDrive size={16}/><span>MinIO 存储</span><b>演示模式</b></div><i><span/></i><p>1.84 GB / 20 GB</p></div>
    </aside>

    <main className="admin-main">
      <header className="admin-topbar">
        <button className="sidebar-trigger" onClick={() => setSidebarOpen(true)} aria-label="打开侧栏"><Menu/></button>
        <div><span>素材中心</span><ChevronRight size={13}/><b>全部素材</b></div>
        <a href="/" target="_blank">查看网站<ExternalLink size={14}/></a>
      </header>

      <section className="admin-content">
        <div className="admin-heading"><div><p>ART ASSET LIBRARY</p><h1>美术素材库</h1><span>统一管理纸雕长卷中的角色、建筑、道具和场景资源。</span></div><button className="primary-button" onClick={() => setUploadOpen(true)}><Plus size={17}/>上传素材</button></div>

        <div className="summary-grid">
          <article><span><Box/></span><div><small>全部素材</small><b>{assets.length}</b><p>7 个场景</p></div></article>
          <article><span className="summary-ready"><Check/></span><div><small>已就绪</small><b>{assets.filter(item => item.status === 'ready').length}</b><p>可供页面调用</p></div></article>
          <article><span className="summary-process"><Sparkles/></span><div><small>处理中</small><b>{assets.filter(item => item.status === 'processing').length}</b><p>正在生成衍生格式</p></div></article>
          <article><span className="summary-draft"><Archive/></span><div><small>待确认</small><b>{assets.filter(item => item.status === 'draft').length}</b><p>草稿与待审核</p></div></article>
        </div>

        <div className="asset-toolbar">
          <label className="search-box"><Search size={16}/><input value={query} onChange={event => setQuery(event.target.value)} placeholder="搜索名称、资源键或场景…"/></label>
          <select value={scene} onChange={event => setScene(event.target.value)}>{scenes.map(item => <option key={item}>{item}</option>)}</select>
          <select value={category} onChange={event => setCategory(event.target.value)}>{categories.map(item => <option key={item}>{item}</option>)}</select>
          <div className="view-switch"><button className={view === 'grid' ? 'active' : ''} onClick={() => setView('grid')} aria-label="网格视图"><Grid2X2/></button><button className={view === 'list' ? 'active' : ''} onClick={() => setView('list')} aria-label="列表视图"><List/></button></div>
        </div>

        <div className="result-meta"><span>共 {filteredAssets.length} 个素材</span><small>资源键是业务页面引用素材的稳定标识</small></div>

        {filteredAssets.length ? <div className={'asset-collection asset-collection--' + view}>
          {filteredAssets.map(asset => <article className="asset-card" key={asset.id} onClick={() => setSelected(asset)}>
            <div className="asset-preview"><AssetArtwork asset={asset}/><span className={'status-pill status-' + asset.status}>{statusLabel[asset.status]}</span><button onClick={event => { event.stopPropagation(); setSelected(asset) }} aria-label="更多操作"><MoreHorizontal/></button></div>
            <div className="asset-info"><div><small>{asset.scene} · {asset.category}</small><h3>{asset.name}</h3></div><span>{asset.format}</span><button className="asset-key" onClick={event => { event.stopPropagation(); copyKey(asset.key) }}><code>{asset.key}</code><Clipboard size={13}/></button><p>{asset.dimensions}<i/>v{asset.version}<i/>{asset.updatedAt}</p></div>
          </article>)}
        </div> : <div className="empty-state"><FileImage/><h3>没有找到素材</h3><p>更换关键词或筛选条件后再试。</p><button onClick={() => { setQuery(''); setScene('全部场景'); setCategory('全部类型') }}>清除筛选</button></div>}
      </section>
    </main>

    <AnimatePresence>{selected && <><motion.div className="drawer-mask" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelected(null)}/><motion.aside className="asset-drawer" initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ type: 'spring', damping: 28, stiffness: 260 }}>
      <header><div><small>素材详情</small><h2>{selected.name}</h2></div><button onClick={() => setSelected(null)} aria-label="关闭详情"><X/></button></header>
      <div className="drawer-preview"><AssetArtwork asset={selected}/></div>
      <div className="drawer-actions"><button className="primary-button" onClick={() => copyKey(selected.key)}><Clipboard size={15}/>复制资源键</button><button><Archive size={15}/>归档</button></div>
      <dl><div><dt>资源键</dt><dd><code>{selected.key}</code></dd></div><div><dt>MinIO 对象</dt><dd><code>midautumn/prod/{selected.scene}/{selected.key}/v{selected.version}/source.{selected.format.toLowerCase()}</code></dd></div><div><dt>格式 / 尺寸</dt><dd>{selected.format} · {selected.dimensions}</dd></div><div><dt>文件大小</dt><dd>{selected.size}</dd></div><div><dt>当前版本</dt><dd>v{selected.version}</dd></div><div><dt>状态</dt><dd><span className={'status-text status-' + selected.status}>{statusLabel[selected.status]}</span></dd></div></dl>
      <section className="usage-section"><h3>页面引用</h3>{selected.usages.length ? selected.usages.map(usage => <p key={usage}><span/><b>{usage}</b><ChevronRight/></p>) : <div><FolderTree/><span>尚未被场景引用</span></div>}</section>
      <section className="version-section"><h3>版本记录</h3><p><span>v{selected.version}</span><b>当前版本</b><small>{selected.updatedAt}</small></p>{selected.version > 1 && <p><span>v{selected.version - 1}</span><b>历史版本</b><small>可恢复</small></p>}</section>
    </motion.aside></>}</AnimatePresence>

    <AnimatePresence>{uploadOpen && <motion.div className="modal-mask" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}><motion.form className="upload-modal" onSubmit={handleUpload} initial={{ opacity: 0, y: 24, scale: .98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 16 }}>
      <header><div><small>NEW ASSET</small><h2>上传美术素材</h2></div><button type="button" onClick={() => setUploadOpen(false)} aria-label="关闭上传"><X/></button></header>
      <label className="drop-zone"><CloudUpload/><b>选择 PNG、WebP、AVIF 或 SVG</b><span>透明 PNG 源文件建议不超过 50 MB</span><input name="file" type="file" accept="image/png,image/webp,image/avif,image/svg+xml"/></label>
      <div className="form-grid"><label><span>素材名称</span><input name="name" placeholder="例如：月宫主殿" required/></label><label><span>所属场景</span><select name="scene">{scenes.slice(1).map(item => <option key={item}>{item}</option>)}</select></label><label><span>素材类型</span><select name="category">{categories.slice(1).map(item => <option key={item}>{item}</option>)}</select></label><label><span>资源版本</span><input value="v1 · 新资源" disabled/></label></div>
      <p className="api-notice"><HardDrive/>当前为前端演示模式。接入服务端后，文件将通过预签名 URL 直接上传到 MinIO，密钥不会进入浏览器。</p>
      <footer><button type="button" onClick={() => setUploadOpen(false)}>取消</button><button className="primary-button" type="submit"><Upload size={16}/>登记素材</button></footer>
    </motion.form></motion.div>}</AnimatePresence>

    <AnimatePresence>{toast && <motion.div className="admin-toast" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}><Check/>{toast}</motion.div>}</AnimatePresence>
  </div>
}
