# 思迅软件 (Sixun) 官网 - 开发技能与操作指南 (Skill.md)

> 本指南记录项目中用到的开发技能、组件实现方案和通用操作指引。

---

## 一、项目技术栈 (Stack)

- **框架**：React 18 (JavaScript + TypeScript (混合开发)
- **构建工具**：Vite
- **样式方案**：
  - CSS Module (`.module.scss`) - Figma 导出组件使用
  - 内联 style 对象 (React inline styles) - 现有组件使用
- **路由**：react-router-dom v6
- **样式**：原生样式 (无 Tailwind CSS)
- **图标**：自定义资源位于 `.figma/image/` 目录
- **动画**：CSS keyframes + requestAnimationFrame + IntersectionObserver

---

## 二、项目结构 (Project Structure)

```
f:\2026refernce-sixun\
├── .figma/                          # Figma 导出设计稿与资源
│   ├── image/                      # 共享图标与图片资源
│   │   ├── mpw8ctxh-f3nt1vu.svg   # 示例：购物车图标
│   │   └── ...
│   ├── 124_870/                    # 组件 1 (如 Title)
│   ├── I124_1069;96_1692/        # 嵌套组件
│   └── ...
├── public/                            # Vite 公共资源
├── src/
│   ├── components/                    # React 组件
│   │   ├── Banner.tsx               # Banner 轮播组件
│   │   ├── TopBar.tsx             # 顶部信息栏
│   │   ├── Header.tsx               # 主导航栏
│   │   ├── Footer.tsx             # 页脚（带表单与导航）
│   │   ├── FeaturesSection.tsx       # 功能亮点（三个产品）
│   │   ├── ChatbotSection.tsx      # AI 助手对话展示
│   │   ├── IndustrySolutions.tsx    # 行业解决方案 + 数据计数
│   │   ├── AchievementsSection.tsx # 企业成就与荣誉
│   │   └── NewsSection.tsx         # 新闻与活动
│   ├── pages/                         # 页面文件
│   │   ├── HomePage.tsx            # 首页（组装各 Section）
│   │   ├── ProductListPage.tsx        # 产品列表页
│   │   ├── ProductDetailPage.tsx     # 产品详情页
│   │   ├── NewsListPage.tsx         # 新闻列表页
│   │   ├── NewsDetailPage.tsx        # 新闻详情页
│   │   ├── AboutPage.tsx            # 关于我们
│   │   └── ContactPage.tsx          # 联系我们
│   ├── main.tsx                     # 入口文件（BrowserRouter 包装 App）
│   ├── App.tsx                      # 根组件（TopBar + Header + Routes + Footer）
│   └── index.css                    # 全局样式（含 overflow-x: hidden）
├── index.html
├── package.json
├── vite.config.js
├── DESIGN.md                          # 设计系统规范文档
└── Skill.md                            # 当前文件
```

---

## 三、组件开发模式 (Component Patterns)

### 3.1 组件结构模板

新建一个 Section 组件（如 `IndustrySolutions.tsx`）的标准结构：

```tsx
import { useState } from 'react';

const MyComponent = () => {
  // 1) 状态管理 - 使用 useState 管理悬停/点击状态
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  
  // 2) 数据定义 - 硬编码的数据数组
  const items = [
    { id: 1, title: '标题', icon: '.figma/image/xxx.svg' }
  ];

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '120px 240px 120px 240px,
      maxWidth: '1920px',
      width: '100%',
      boxSizing: 'border-box',
    }}>
      {/* 3) 标题区 */}
      <h2 style={{
        fontFamily: '"Noto Sans SC", fontSize: '56px', fontWeight: 700 }}>
        <span style={{ color: '#1d2233' }}>主色</span>
        <span style={{ color: '#0068eb' }}>强调色</span>
      </h2>

      {/* 4) 内容区 - 通过 hoveredIndex === index 来切换样式 */}
      <div style={{ display: 'flex', columnGap: '30px' }}>
        {items.map((item, index) => (
          <div
            key={item.id}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
            style={{
              transition: 'all 0.3s ease',
            }}
          >
            {/* 内容 */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyComponent;
```

### 3.2 首页组件组装 (HomePage Composition)

首页组件之间的组装遵循以下简单模式：

```tsx
// src/pages/HomePage.tsx
import Banner from '../components/Banner';
import FeaturesSection from '../components/FeaturesSection';
// ... 导入所有需要的组件

const HomePage = () => {
  return (
    <>
      {/* 顶部间距，为固定导航预留空间 */}
      <div style={{ height: '100px' }}></div>
      <Banner />
      <FeaturesSection />
      <ChatbotSection />
      <IndustrySolutions />
      <AchievementsSection />
      <NewsSection />
    </>
  );
};
```

---

## 四、通用交互模式 (Interaction Patterns)

### 4.1 鼠标悬停卡片切换 (Card Hover)

参考 [IndustrySolutions.tsx](file:///f:/2026refernce-sixun/src/components/IndustrySolutions.tsx) 与 [FeaturesSection.tsx](file:///f:/2026refernce-sixun/src/components/FeaturesSection.tsx)

**核心思路**：通过 `useState` 管理 hover 索引，在 style 中做条件渲染

```tsx
const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

// JSX 中
<div
  onMouseEnter={() => setHoveredIndex(index)}
  onMouseLeave={() => setHoveredIndex(null)}
  style={{
    paddingTop: hoveredIndex === index ? '0' : '320px',
    transition: 'all 0.3s ease',
  }}
>
  {/* 内容区根据 hoveredIndex === index 决定样式
</div>
```

### 4.2 CSS keyframes 无限滚动 (Infinite Scroll)

参考 [IndustrySolutions.tsx](file:///f:/2026refernce-sixun/src/components/IndustrySolutions.tsx) 标签墙

```tsx
// 通过 style 中加入 CSS keyframes
const rowStyle = {
  display: 'flex',
  columnGap: '20px',
  animation: `scrollLeft${index} 30s linear infinite`,
};

// 页面全局注入（在 component 内定义或使用 useEffect 动态生成样式
```

### 4.3 数字递增计数 (Count-up Animation)

参考 [IndustrySolutions.tsx](file:///f:/2026refernce-sixun/src/components/IndustrySolutions.tsx)

```tsx
import { useEffect, useRef, useState } from 'react';

// IntersectionObserver 监听:
const statsRef = useRef<HTMLDivElement | null>(null);
const [hasAnimated, setHasAnimated] = useState(false);
const [displayValues, setDisplayValues] = useState<number[]>([]);

useEffect(() => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && !hasAnimated) {
        setHasAnimated(true);
        // requestAnimationFrame + easeOutQuad 缓动
      }
    });
  }, { threshold: 0.5 });

  if (statsRef.current) observer.observe(statsRef.current);
}, [hasAnimated]);
```

### 4.4 省市级联下拉 (Cascading Dropdown)

参考 [Footer.tsx](file:///f:/2026refernce-sixun/src/components/Footer.tsx)

```tsx
// 34 个省份 + 城市数据
const citiesData: Record<string, string[]> = {
  '北京市': ['东城区', '西城区', ...],
  '广东省': ['广州市', '深圳市', ...],
};
```

### 4.5 表单输入框状态机 (Form State Machine)

```tsx
const [phone, setPhone] = useState('');
const [phoneError, setPhoneError] = useState('');

const validatePhone = (value: string) => {
  if (!/^1[3-9]\\d{9}$/.test(value)) {
    setPhoneError('请输入正确的手机号');
  } else {
    setPhoneError('');
  }
};

// 按钮状态计算
const isFormValid = phoneError === '' && city && province;

<button style={{
  background: isFormValid ? '#0d99ff' : '默认颜色',
  opacity: isFormValid ? 1 : 0.7,
}}>
  Submit
</button>
```

---

## 五、样式实现方案 (Styling Approach)

### 5.1 内联样式 vs CSS Module

| 场景 | 推荐方案 | 示例位置 |
|------|---------|---------|
| 现有组件 | 内联 style 对象 | 所有 src/components/*.tsx |
| Figma 导出 | CSS Module | `.figma/*/index.module.scss` |

### 5.2 样式组织原则

**不使用任何第三方 UI 库 (Tailwind / Material UI / Ant Design)，遵循以下原则：

1. **颜色**统一从 DESIGN.md 的颜色规范中查找
2. **字号/行高**统一参考 DESIGN.md 字号层级
3. **间距**基于 8px 基数
4. **圆角**统一：8px(小型/ 16px(卡片) / 32px(大容器)

### 5.3 flex 布局速查

| 常见布局模式 | 代码片段 |
|---|---|
| 垂直列布局 | `display:flex; flex-direction: column; row-gap: Xpx` |
| 水平行布局 | `display:flex; flex-direction: row; column-gap: Xpx` |
| 水平居中行 | `display:flex; align-items:center; justify-content:center` |
| 两端对齐 | `display:flex; justify-content: space-between` |
| 响应式栅格 | `display:flex; flex-wrap: wrap; gap: Xpx` |

---

## 六、动画与动效 (Animations & Motion)

### 6.1 过渡动画速查

| 动画类型 | 代码片段 |
|------|---------|
| 通用过渡 | `transition: all 0.3s ease` |
| 快速过渡（按钮） | `transition: all 200ms ease` |
| 仅背景色变化 | `transition: background 300ms ease` |
| 悬停缩放上浮 | `transform: translateY(-5px) scale(1.02)` |
| 图标旋转箭头 | `transform: rotate(-90deg)` |

### 6.2 滚动进入视口动画

```javascript
// 在 useEffect 中
const ref = useRef(null);
useEffect(() => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        // 进入视口后的动画触发逻辑
      }
    });
  }, { threshold: 0.5 });
  if (ref.current) observer.observe(ref.current);
}, []);
```

---

## 七、构建与验证 (Build & Validation)

### 7.1 构建命令

```bash
npm run build          # 生产构建
npm run dev            # 开发服务器
```

### 7.2 代码验证清单 (Checklist)

- [ ] 所有导入路径正确
- [ ] 所有图片资源路径正确（`.figma/image/`）
- [ ] 全局 `overflow-x: hidden` 已设置
- [ ] 所有组件有 `box-sizing: border-box`
- [ ] 悬停交互 `transition: all 0.3s ease` 添加了过渡
- [ ] 响应式 `max-width: 1920px; margin: 0 auto
- [ ] 构建通过 `npm run build` 无错误

---

## 八、资源引用规范 (Asset References)

### 8.1 图标引用路径

| 位置 | 路径示例 |
|---|---|
| `src/components/` 内组件 | `.figma/image/mpw8ctxh-f3nt1vu.svg` |
| `src/pages/` 内页面 | `../.figma/image/mpw8ctxh-f3nt1vu.svg` |
| Figma 导出组件 | `../image/mpw8ctxh-f3nt1vu.svg` |

### 8.2 箭头图标约定

- 所有「了解更多」等链接的箭头图标统一 `rotate: -90deg`（指向右侧）
- 大小通常为 16-24px，根据卡片调整

---

## 九、常见问题与解决方案 (FAQ)

### Q1: 如何添加新的 Section 组件？

**步骤**：
1. 在 `src/components/` 下创建 `NewSection.tsx`
2. 参考 `IndustrySolutions.tsx` 模式（最完整的模板）
3. 在 `src/pages/HomePage.tsx` 中导入并插入
4. 设计规范参考 `DESIGN.md`

### Q2: 如何修改颜色/字体/间距？

统一在 `DESIGN.md` 中查找对应的 Token 数值，然后在组件 style 对象中直接修改

### Q3: 如何添加新的图标？

1. 将 SVG/PNG 放入 `.figma/image/`
2. 在组件内通过相对路径引用（`.figma/image/filename.svg`

### Q4: 如何添加新的页面路由？

1. 在 `src/pages/` 创建 `NewPage.tsx`（参考 `AboutPage.tsx` 骨架）
2. 在 `src/App.tsx` 的 `Routes` 中添加 `<Route path="/new" element={<NewPage />}`

### Q5: 页面如何防止横向滚动？

全局在 `src/index.css` 的 `html`, `body` 和 `App.tsx` 的根容器都设置了 `overflow-x: hidden`，无需额外处理

### Q6: 数字计数动画如何复用？

复制 `IndustrySolutions.tsx` 中的 `useEffect` 整个部分，修改 `stats` 数组和数字格式解析

---

## 十、参考组件速查表 (Component Reference)

| 组件 | 文件路径 | 核心功能 |
|------|---------|---------|
| Banner | [Banner.tsx](file:///f:/2026refernce-sixun/src/components/Banner.tsx) | 轮播 / 拖拽滑动 / 6秒自动切换 |
| FeaturesSection | [FeaturesSection.tsx](file:///f:/2026refernce-sixun/src/components/FeaturesSection.tsx) | 三卡片悬停翻牌 |
| ChatbotSection | [ChatbotSection.tsx](file:///f:/2026refernce-sixun/src/components/ChatbotSection.tsx) | 对话模拟 / 渐变边框 / 声波 |
| IndustrySolutions | [IndustrySolutions.tsx](file:///f:/2026refernce-sixun/src/components/IndustrySolutions.tsx) | 标签滚动 / 卡片翻牌 / 数字计数 |
| AchievementsSection | [AchievementsSection.tsx](file:///f:/2026refernce-sixun/src/components/AchievementsSection.tsx) | 荣誉卡片 / 悬停上浮 |
| NewsSection | [NewsSection.tsx](file:///f:/2026refernce-sixun/src/components/NewsSection.tsx) | 新闻卡片 / 不对称布局 |
| Footer | [Footer.tsx](file:///f:/2026refernce-sixun/src/components/Footer.tsx) | 表单验证 / 级联下拉 |
| TopBar | [TopBar.tsx](file:///f:/2026refernce-sixun/src/components/TopBar.tsx) | 毛玻璃导航 |
| Header | [Header.tsx](file:///f:/2026refernce-sixun/src/components/Header.tsx) | 毛玻璃导航 / Logo / 菜单 |

---

*最后更新：基于 2026 年 6 月项目状态整理*
