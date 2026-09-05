# 月满人间 · 中秋动态纸雕长卷

一个使用 React、GSAP 与 CSS 图层实现的非线性中秋文化体验站。当前使用已有纸雕 PNG 组成月宫、山水、灯市、月饼与庭院场景；少量未接入美术保留低对比占位轮廓。资源键保留在元素属性中，后续可切换到 MinIO URL。

## 页面入口

- `/`：月门入口。通过轻量视差进入长卷或月下舆图。
- `/journey`：沉浸式动态长卷。包含穿云见月、月宫清辉、山水诗境、古城灯市、一口团圆、人间团圆、万家共月七幕。
- `/atlas`：月下舆图。非线性选择任意场景进入长卷。
- `/admin/assets`：美术素材管理页面，目前使用演示数据并预留 MinIO 接口结构。

## 已实现交互

- GSAP ScrollTrigger 滚动驱动的场景交叠显影与轻量景深平移
- 桌面右侧场景轨道、手机底部导航，可直接跳转到任意一幕
- 神话、风俗和团圆意象热点说明；弹层支持 Esc 关闭、焦点管理和背景滚动锁定
- 诗词轮换、四方月饼切换和图鉴定点进入
- CSS 星空、流云、山水、灯火、水面、纸张纹理与动态金线
- 桌面端与移动端响应式布局；静观开关与系统减少动态效果偏好生效，非当前场景暂停装饰动画

## 素材接入方式

每个待替换美术位均保留 `data-asset-key`，例如：

- `moon-palace.main-hall`
- `landscape.mountains-far`
- `lantern-market.city-tower`
- `reunion.family-dinner-group`

服务器资源就绪后，页面可根据资源键读取素材记录和 MinIO URL；无需重做场景布局与动画。

## 本地运行

```bash
npm install
npm run dev
```

生产构建：

```bash
npm run build
```

## 视觉与交互检查

先运行预览服务，再运行浏览器检查：

```bash
npm run dev -- --host 127.0.0.1 --port 5174
node scripts/visual-check.mjs
```

检查覆盖七幕桌面/手机切换、场景直达、月饼切换、弹层关闭和焦点返回、减少动效偏好。截图保存在 node_modules/.cache/visual-check，不进入版本控制。

脚本优先使用本机 Chrome 或 Edge；其他环境可设置 BROWSER_EXECUTABLE 和 PREVIEW_URL，或为 Playwright 安装 Chromium。

美术原图保持不变。当前及相邻场景的素材会逐步加载，已加载资源在本次浏览中保留。图片仍为原始 PNG，服务器上线前可以另行提供压缩的派生版本。

## 规划文档

- [沉浸式主站与素材平台总体规划](docs/immersive-site-and-asset-platform-plan.md)
- [美术资源清单与风格规范](docs/art-assets-and-style.md)
- [产品需求文档](docs/PRD.md)

真实上传必须由服务端创建预签名 URL，禁止在浏览器中保存 MinIO 密钥。
