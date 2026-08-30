# 月满人间 · 中秋动态纸雕长卷

一个使用 React、GSAP 与 CSS 图层实现的非线性中秋文化体验站。当前阶段优先完成页面结构、内容、交互和动画；尚未就绪的服务器美术素材以“带色剪纸占位块 + 素材名称 + 资源键”呈现，后续可以直接按资源键替换为 MinIO 图片。

## 页面入口

- `/`：月门入口。通过轻量视差进入长卷或月下舆图。
- `/journey`：沉浸式动态长卷。包含穿云见月、月宫清辉、山水诗境、古城灯市、一口团圆、人间团圆、万家共月七幕。
- `/atlas`：月下舆图。非线性选择任意场景进入长卷。
- `/admin/assets`：美术素材管理页面，目前使用演示数据并预留 MinIO 接口结构。

## 已实现交互

- GSAP ScrollTrigger 滚动驱动的场景显影、缩放与多层景深平移
- 右侧场景轨道，可直接跳转到任意一幕
- 神话、风俗和团圆意象热点说明
- 诗词轮换、四方月饼切换和图鉴定点进入
- CSS 星空、流云、山水、灯火、水面、纸张纹理与动态金线
- 桌面端与移动端响应式布局，并支持减少动态效果偏好

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

## 规划文档

- [沉浸式主站与素材平台总体规划](docs/immersive-site-and-asset-platform-plan.md)
- [美术资源清单与风格规范](docs/art-assets-and-style.md)
- [产品需求文档](docs/PRD.md)

真实上传必须由服务端创建预签名 URL，禁止在浏览器中保存 MinIO 密钥。
