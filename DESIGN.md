# 思迅软件 (Sixun) 官网 - 设计系统规范 (DESIGN.md)

> 本规范基于项目现有组件和 Figma 设计文件整理，统一全站设计语言，确保各页面、各模块之间的视觉一致性。

---

## 一、项目概述

- **项目名称**：思迅软件 (Sixun) 官方网站
- **行业定位**：零售连锁 / 商超信息化解决方案提供商
- **核心价值**：AI 智能数字商业平台
- **主要内容模块**：Banner → 产品亮点 → AI 助手 → 行业解决方案 → 企业成就 → 新闻动态

---

## 二、颜色系统 (Color System)

### 2.1 品牌主色

| Token | HEX 值 | 用途 | CSS 变量示例 |
|-------|--------|------|--------------|
| `--color-primary` | `#0d99ff` | 主按钮、链接、输入聚焦态、卡片悬停描边 | `var(--color, #0d99ff)` |
| `--color-primary-20` | `#0d99ff33` | 聊天气泡浅底色（20% 透明度） | — |
| `--color-primary-deep` | `#0068eb` | 标题中重点词（如"AI 智能"、"解决方案"） | — |
| `--color-text` | `#1d2233` | 正文标题、图标容器深色背景 | `var(--text, #1d2233)` |
| `--color-text-black` | `#000000` | 产品标题、副标题（深黑） | — |

### 2.2 背景与表面色

| Token | HEX 值 | 用途 |
|-------|--------|------|
| `--color-bg` | `#f5f6f7` | 页面背景、页脚背景 |
| `--color-bg-gradient` | `linear-gradient(180deg, #d9e8ff 0%, #d9e8ff66 100%)` | Banner / Chatbot / 成就区（浅蓝渐变） |
| `--color-surface` | `#ffffff` | 卡片、弹窗、按钮默认态 |
| `--color-surface-glass` | `#ffffffb2` | 玻璃态卡片（配合 `backdrop-filter: blur(10-20px)`） |
| `--color-placeholder` | `#d9d9d9` | 图片占位符、未加载态 |
| `--color-placeholder-2` | `#d3d7de` | 输入框默认态（Footer 表单） |

### 2.3 边框与阴影

| Token | 值 | 用途 |
|-------|-----|------|
| `--color-border` | `#d9d9d9` | 输入框默认态、分隔线 |
| `--color-shadow-card` | `0px 4px 30px 0px #a0a3aa1a` | 产品卡片投影 |
| `--color-shadow-soft` | `0px 4px 24px 0px #1d22330d` | 成就卡片投影 |
| `--color-shadow-nav` | `0 4px 30px rgba(160,163,170,0.1)` | Header 导航投影 |

### 2.4 渐变遮罩（图片卡片底部文字保护）

```scss
// 用于图片卡片底部文字上方的白色渐变遮罩，确保文字可读性
background-image: linear-gradient(180deg, #f5f6f700 0%, #f5f6f7 80%);
// 或
background-image: linear-gradient(180deg, #f5f6f700 0%, #f5f6f7 100%);
```

---

## 三、字体系统 (Typography)

### 3.1 字体栈

```scss
font-family: "Noto Sans SC", "PingFang SC", "Hiragino Sans GB", 
             "Microsoft YaHei", SimHei, Arial, Helvetica, sans-serif;
```

> 优先级：Noto Sans SC → PingFang SC（macOS 苹方）→ 微软雅黑（Windows）→ Arial

### 3.2 字号层级

| 层级 | 字号 | 行高 | 字重 | 典型用途 | 示例位置 |
|-----|------|------|------|---------|---------|
| H1 Banner | 48px | 58px | 700 (Bold) | 全站大 Banner 标题 | [Banner.tsx](file:///f:/2026refernce-sixun/src/components/Banner.tsx) |
| H2 区块 | 56px | 58px | 700 (Bold) | 行业解决方案 / 成就 / 新闻 主标题 | [IndustrySolutions.tsx](file:///f:/2026refernce-sixun/src/components/IndustrySolutions.tsx) |
| H2 产品 | 32px | 38px | 700 (Bold) | 产品卡片主标题 | — |
| H3 模块 | 24px | 29px / 32px / 40px | 500 或 700 | 模块副标题、功能标题 | [FeaturesSection.tsx](file:///f:/2026refernce-sixun/src/components/FeaturesSection.tsx) |
| 大按钮 | 20px | 24px | 400 | 主按钮 / 幽灵按钮 | — |
| 次级标题 | 20px | — | 400 | 产品副标题、数据标签 | — |
| 正文 | 16px | 24px / 19px | 400 | 消息文本、输入占位符、描述文本 | — |
| 辅助 | 14px | — | 400 | TopBar 文字、版权声明 | [TopBar.tsx](file:///f:/2026refernce-sixun/src/components/TopBar.tsx) |
| 提示 | 12px | — | 400 | 表单错误提示 | [Footer.tsx](file:///f:/2026refernce-sixun/src/components/Footer.tsx) |

### 3.3 字重规范

- **700 Bold**：所有标题 (H1-H3)
- **500 Medium**：页脚列标题、功能模块列表
- **400 Regular**：正文、按钮文字

### 3.4 其他排版属性

```scss
letter-spacing: 0;                 // 默认无特殊字距
text-align: justify;              // 长文本两端对齐（聊天气泡等场景）
overflow: hidden;                 // 长文本在卡片中截断
text-overflow: ellipsis;          // 超出省略号
```

---

## 四、间距系统 (Spacing)

**基准单位**：8px

| Token | 数值 | 典型用途 |
|-------|------|---------|
| `--space-xs` | 4px | 小图标间距、元素内边距 |
| `--space-sm` | 10px | 行间距 `row-gap`、小容器 padding |
| `--space-md` | 20px | Banner 内容行间距、段落间距 |
| `--space-lg` | 30px | **主要间距** - 按钮水平内边距 `padding: 14px 30px`、卡片水平内边距、元素间距 `column-gap: 30px` |
| `--space-xl` | 40px | Banner 标题上下内边距、页脚行高 |
| `--space-section-y` | 120-140px | 大区段垂直内边距（顶部 120-140px / 底部 120px） |
| `--space-section-x` | 240px | 大区段水平内边距（左右 240px，在 `1920px` 宽度下） |

---

## 五、圆角与阴影 (Radius & Shadow)

### 5.1 圆角规范

| 圆角值 | 应用场景 |
|--------|---------|
| 1px | 极细元素（音波条 `bar`） |
| 3px | 分页指示点 |
| **8px** | **小型元素** - 按钮、图标容器、输入框元素、聊天气泡、二维码容器 |
| **16px** | **中型卡片** - 产品卡片、Banner 背景卡片、新闻卡片 |
| 18px | 圆形按钮（36px 容器的一半） |
| 28px | 大型输入框（搜索框类） |
| **31-32px** | **大型容器** - AI 助手主容器、弹窗卡片 |

### 5.2 阴影规范

| 场景 | 阴影值 |
|------|--------|
| 卡片常规投影 | `0px 4px 30px 0px #a0a3aa1a` |
| 成就卡片投影 | `0px 4px 24px 0px #1d22330d` |
| Header 悬浮 | `0 4px 30px rgba(160,163,170,0.1)` |

### 5.3 毛玻璃效果 (Glassmorphism)

```scss
// 模式 A - 导航型（深色半透明）
background: rgba(0, 0, 0, 0.7);
backdrop-filter: blur(20px);

// 模式 B - 导航型（浅色半透明）
background: rgba(255, 255, 255, 0.5);
backdrop-filter: blur(20px);

// 模式 C - 卡片标题覆盖（悬停态）
background: #ffffffb2;
backdrop-filter: blur(10px); // 或 blur(15px)

// 模式 D - 图片卡片底部信息条
background: rgba(255,255,255,0.8);
backdrop-filter: blur(10px);
```

---

## 六、图标系统 (Icons)

### 6.1 尺寸规范

| 尺寸 | 应用场景 | 容器规格 |
|------|---------|---------|
| 20 × 20px | 链接右侧箭头（旋转 -90deg） | 独立 |
| 24 × 24px | 小型图标（聊天气泡内图标） | 独立 |
| **32 × 32px** | **标准图标尺寸** - 产品图标、模块图标 | 40 × 40px 容器 + `padding: 10px` |
| 36 × 36px | 输入框内发送按钮 | 独立 |
| 40 × 40px | 图标容器外壳（深底 + 白色图标） | 容器 `border-radius: 8px; background: #1d2233; padding: 10px` |

### 6.2 资源引用

- **路径**：`.figma/image/`（组件内相对路径）或 `../.figma/image/`（页面内相对路径）
- **格式**：SVG 用于矢量图标，PNG 用于复杂效果位图
- **命名约定**：`mp{前缀}{8位随机串}-{8位随机串}.{svg|png}`
  - 例：`mpw8ctxh-f3nt1vu.svg`（购物车图标）
  - 例：`mpw8ctxh-n7uai6x.png`（箭头图标）
- **旋转箭头**：所有"了解更多"等方向箭头统一 `rotate: -90deg`

### 6.3 图标容器通用样式

```scss
.icon-container {
  display: flex;
  align-items: center;
  justify-content: center;
  column-gap: 10px;
  border-radius: 8px;
  background: #1d2233;  // 深色背景衬托白色图标
  padding: 10px;
  width: 40px;
  height: 40px;
}
```

---

## 七、按钮与交互 (Buttons & Interactions)

### 7.1 主按钮 (Primary Button)

```scss
border-radius: 8px;
background: #0d99ff;
color: #ffffff;
font-size: 20px;
line-height: 24px;
padding: 14px 30px;
height: 56px;
```

### 7.2 幽灵按钮 (Outline / Ghost Button)

```scss
border: 1px solid #0d99ff;
border-radius: 8px;
background: #ffffff;
color: #0d99ff;
font-size: 20px;
line-height: 24px;
padding: 13px 29px;  // 比主按钮少 1px 补偿边框
height: 56px;
```

### 7.3 小型了解更多按钮（卡片内）

```scss
// 悬停前 - 纯文字 + 箭头
color: #0d99ff;
font-size: 20px;  // 或 16px

// 悬停态 - 蓝色描边卡片
display: flex;
align-items: center;
justify-content: center;
border: 1px solid #0d99ff;
border-radius: 8px;
background: #ffffff;
width: 124px;
height: 40px;
```

### 7.4 过渡动画规范

```scss
transition: all 0.3s ease;           // 卡片/大型元素通用
transition: all 200ms ease;           // 导航/按钮快速响应
transition: background 300ms ease;    // 仅背景色变化
```

---

## 八、输入框与表单 (Inputs & Forms)

### 8.1 标准输入框

```scss
// 默认态
border: 1px solid #d9d9d9;
border-radius: 28px;                 // 胶囊形
background: #f5f6f7;
padding: 9px 9px 9px 19px;
height: 56px;

// 悬停/聚焦态
background: #ffffff;
border: 1px solid #0d99ff;
```

### 8.2 小型输入框（页脚表单）

```scss
width: 228px;
height: 40px;
border-radius: 8px;
background: #d3d7de;                // 默认灰
// 悬停/聚焦后变白 + 蓝色描边
```

### 8.3 级联下拉（省份/城市）

参考 [Footer.tsx](file:///f:/2026refernce-sixun/src/components/Footer.tsx) 的实现：
- 点击输入框展开选项列表
- 选择省份后联动城市列表
- 箭头图标 `rotate(180deg)` 指示展开状态
- 选项悬停变 `#f5f6f7` 背景

---

## 九、卡片组件规范 (Cards)

### 9.1 产品/功能卡片（带图片占位）- 默认态

```scss
width: 460px;
height: 520px;  // 或 342px
border-radius: 16px;
background: #d9d9d9;               // 图片占位
box-shadow: 0px 4px 30px 0px #a0a3aa1a;
position: relative;
overflow: hidden;
paddingTop: 320px;                 // 174px / 320px 根据卡片高度
// + 底部渐变遮罩 linear-gradient(180deg, #f5f6f700 0%, #f5f6f7 80%)
```

### 9.2 产品/功能卡片（悬停态 - 翻牌效果）

```scss
paddingTop: 0;
// 内容区全屏覆盖
.card-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  align-self: stretch;
  border: 1px solid #0d99ff;
  background: #ffffffb2;
  backdrop-filter: blur(10-15px);
  row-gap: 30px;
  height: 100%;
}
```

### 9.3 成就/荣誉卡片

```scss
width: 342px;
height: 200px;
border-radius: 16px;
background: #ffffff;
box-shadow: 0px 4px 24px 0px #1d22330d;
// 悬停: transform: translateY(-5px) scale(1.02);
```

### 9.4 新闻大卡片

```scss
width: 480px;
height: 540px;
// 底部信息条: background: rgba(255,255,255,0.8); backdrop-filter: blur(10px);
```

---

## 十、页面布局容器 (Layout Containers)

### 10.1 全局容器规范

| 属性 | 值 | 说明 |
|-----|-----|------|
| `max-width` | 1920px | 全站最大宽度（典型桌面设计稿） |
| `overflow-x` | hidden | 防止横向滚动条（全局） |
| `box-sizing` | border-box | 全局，确保 padding 不撑开宽度 |

### 10.2 区块容器 (Section Container)

```scss
display: flex;
flex-direction: column;
align-items: flex-start;    // 或 center
width: 100%;
max-width: 1920px;
margin: 0 auto;              // 水平居中
padding: 140px 240px 120px;  // 上下 120-140px，左右 240px
row-gap: 80px;               // 内部模块间距
background: #ffffff;         // 或渐变色
box-sizing: border-box;
```

### 10.3 Banner 容器

```scss
width: 100%;
max-width: 1920px;
height: 700px;
padding: 70px 240px;
background: linear-gradient(180deg, #d9e8ff 0%, #d9e8ff66 100%);
box-sizing: border-box;
```

---

## 十一、导航与头部 (Navigation)

### 11.1 TopBar 顶部信息栏

```scss
position: fixed;
top: 0;
width: 100%;
height: 28px;
background: rgba(0, 0, 0, 0.7);
backdrop-filter: blur(20px);
z-index: 50;
font-size: 14px;
color: #ffffff;
```

### 11.2 Header 主导航

```scss
position: fixed;
top: 28px;                // TopBar 下方
width: 100%;
height: 72px;
background: rgba(255, 255, 255, 0.5);
backdrop-filter: blur(20px);
box-shadow: 0 4px 30px rgba(160,163,170,0.1);
font-size: 16px;
color: #1d2233;
```

---

## 十二、动画与动效 (Animations)

### 12.1 轮播自动播放

```javascript
// 基于 requestAnimationFrame 实现，6000ms 切换
// 参考 [Banner.tsx:73-112]
```

### 12.2 CSS 无限滚动（标签墙）

```scss
@keyframes scrollLeft {
  0%   { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}
// 鼠标悬停: animation-play-state: paused;
```

### 12.3 数字递增计数

```javascript
// IntersectionObserver 监听 (阈值 0.5)
// requestAnimationFrame + easeOutQuad 缓动函数
// 参考 [IndustrySolutions.tsx:82-140]
```

### 12.4 渐变流动边框（Chatbot）

```scss
@keyframes gradientBorder {
  0%   { background-position: 0% 50%; }
  100% { background-position: 200% 50%; }
}
```

### 12.5 声波/加载动画

```scss
// 声波: 6 根条形 transform: scaleY() 循环波动
// 加载: 3 个圆点跳动
```

### 12.6 拖拽滑动（Banner 轮播）

```javascript
// mousedown/mousemove/mouseup + touchstart/touchmove/touchend
// 边界阻力系数 0.3
// 切换阈值: 拖拽距离 > 80px (PC) / 50px (Mobile)
```

---

## 十三、表单验证与交互状态机

参考 [Footer.tsx](file:///f:/2026refernce-sixun/src/components/Footer.tsx) 实现：

### 13.1 手机号正则校验

```javascript
/^1[3-9]\d{9}$/      // 中国大陆手机号格式
```

### 13.2 纯数字校验

```javascript
/^\d+$/              // 防止纯数字输入到店铺名称等字段
```

### 13.3 按钮动态状态

- **禁用/未就绪**：灰色背景、文字 `opacity: 0.7`
- **就绪/可点击**：蓝色背景 `#0d99ff`、文字完全可见
- **过渡**：`300ms ease`

---

## 十四、首页组件顺序 (HomePage Composition)

组件渲染顺序形成**「认知 → 信任 → 转化」**的叙事流：

| 序号 | 组件 | 页面角色 | 背景 |
|-----|------|---------|------|
| 1 | [Banner.tsx](file:///f:/2026refernce-sixun/src/components/Banner.tsx) | 品牌主视觉 / CTA | 浅蓝渐变 |
| 2 | [FeaturesSection.tsx](file:///f:/2026refernce-sixun/src/components/FeaturesSection.tsx) | 产品能力介绍 | `#ffffff` |
| 3 | [ChatbotSection.tsx](file:///f:/2026refernce-sixun/src/components/ChatbotSection.tsx) | AI 差异化亮点 | 浅蓝渐变 + 彩色渐变边框 |
| 4 | [IndustrySolutions.tsx](file:///f:/2026refernce-sixun/src/components/IndustrySolutions.tsx) | 行业场景落地 | `#ffffff` |
| 5 | [AchievementsSection.tsx](file:///f:/2026refernce-sixun/src/components/AchievementsSection.tsx) | 企业资质 / 社会证明 | 浅蓝渐变 |
| 6 | [NewsSection.tsx](file:///f:/2026refernce-sixun/src/components/NewsSection.tsx) | 最新动态 | `#ffffff` |
| 7 | [Footer.tsx](file:///f:/2026refernce-sixun/src/components/Footer.tsx) | 导航 / 线索表单 / 版权 | `#f5f6f7` |

---

## 十五、Figma 资源引用

设计稿位于 `.figma/` 目录，每个组件包含：

- `index.jsx` - React 组件代码（使用 CSS Module）
- `index.module.scss` - SCSS 样式（嵌套语法）
- `screenshot_{编号}.png` - 组件预览图
- `image/` - 共享图片/图标资源

**组件目录命名规则**：
- `{数字}_{数字}` 例如 `124_870` - 独立组件
- `I{父组件};{子组件}` 例如 `I124_1069;96_1692` - 嵌套实例

---

## 十六、代码实现建议

1. **样式写法**：当前项目使用 **内联 style 对象**（React inline styles），每个组件内通过 `useState` 管理状态，在 style 中计算条件样式。优点是无需额外 CSS 构建配置、样式与组件逻辑强绑定、可直接在 JS 中做动态计算（如 `hoveredCard === product.id`）。

2. **响应式设计**：目前全站以 **1920px 固定宽度**为主，组件使用 `max-width: 1920px; margin: 0 auto`居中策略；若需适配小屏，建议在关键断点（1440 / 1024 / 768 / 375）引入 media query 或动态调整 `padding` 与字号。

3. **交互统一**：所有卡片悬停遵循 **「默认底部信息条 → 悬停全屏覆盖 + 毛玻璃」**的统一模式，确保用户学习曲线平滑。

4. **全局 overflow**：`html`, `body` 设置 `overflow-x: hidden` 防止意外横向滚动。

---

*最后更新：基于项目现有组件（2026 年 6 月代码状态）整理*
