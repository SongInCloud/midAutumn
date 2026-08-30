# 月满人间 · 中秋文化志

一个以中秋文化介绍为核心的 React 单页数字展览。网站采用开放式、非线性浏览结构，用户可以自由访问节日溯源、人间风俗、月下传说、风雅诗词、舌尖中秋与月相知识等主题。

## 主要特性

- 七个平行文化主题，可通过导航直接访问
- 历史时间轴、习俗筛选、传说切换、诗词筛选和月相观察
- 当代中式视觉语言与丰富但克制的动效
- 桌面、平板和移动端响应式适配
- 键盘焦点样式与减少动态效果支持
- 无积分、收集、解锁或线性闯关流程

完整产品定义见 [docs/PRD.md](docs/PRD.md)。

## 启动

```bash
npm install
npm run dev
```

## 构建

```bash
npm run build
```
## 素材管理

启动开发服务器后访问：

- http://localhost:5173/admin/assets

当前管理页使用前端演示数据，已按照正式 MinIO API 结构设计。真实上传必须由服务端创建预签名 URL，禁止在前端配置 MinIO 密钥。

详细规划：

- [沉浸式主站与素材平台总体规划](docs/immersive-site-and-asset-platform-plan.md)
- [美术资源清单与风格规范](docs/art-assets-and-style.md)
