// 客户精选案例 —— 参考 Figma 537_5799 / 537_5808
// 内容区 1440px 宽，2 行 × 5 列 = 10 张案例卡片（264 × 200，圆角 16px，背景 #E9EEF3）
// 每张卡片的 logo 尺寸/内边距与 Figma 保持一致
// 图片来源：public/image/ContainerCase/*.png  —— 每个文件在本组件内只引用一次

const FONT_FAMILY =
  '"Noto Sans SC", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", SimHei, Arial, Helvetica, sans-serif';

type CaseCard = {
  src: string;
  // 容器 padding：上 左下右
  pad: { top: number; right?: number; bottom?: number; left?: number };
  // logo 显示尺寸
  logo: { w: number; h: number };
  // 列间距 row 区分（2 行）
  row: 1 | 2;
  col: 1 | 2 | 3 | 4 | 5;
};

const caseCards: CaseCard[] = [
  // —— 第一行（autoWrapper 1~5）——
  {
    row: 1,
    col: 1,
    src: '/image/ContainerCase/华侨城.png',
    logo: { w: 213, h: 70 },
    pad: { top: 62, right: 17, bottom: 62, left: 17 },
  },
  {
    row: 1,
    col: 2,
    src: '/image/ContainerCase/爱婴岛.png',
    logo: { w: 200, h: 85 },
    pad: { top: 58, right: 32, bottom: 57, left: 32 },
  },
  {
    row: 1,
    col: 3,
    src: '/image/ContainerCase/欢乐谷.png',
    logo: { w: 175, h: 118 },
    pad: { top: 33, right: 32, bottom: 32, left: 32 },
  },
  {
    row: 1,
    col: 4,
    src: '/image/ContainerCase/龙江交投.png',
    logo: { w: 164, h: 140 },
    pad: { top: 15, right: 32, bottom: 14, left: 32 },
  },
  {
    row: 1,
    col: 5,
    src: '/image/ContainerCase/华中科技大学.png',
    logo: { w: 213, h: 100 },
    pad: { top: 44, right: 12, bottom: 43, left: 12 },
  },
  // —— 第二行（autoWrapper2 1~5）——
  {
    row: 2,
    col: 1,
    src: '/image/ContainerCase/李雪与韩梅梅.png',
    logo: { w: 149, h: 120 },
    pad: { top: 20, right: 32, bottom: 19, left: 32 },
  },
  {
    row: 2,
    col: 2,
    src: '/image/ContainerCase/世纪华联.png',
    logo: { w: 130, h: 138 },
    pad: { top: 60, right: 12, bottom: 59, left: 12 },
  },
  {
    row: 2,
    col: 3,
    src: '/image/ContainerCase/俏皮羊.png',
    logo: { w: 240, h: 54 },
    pad: { top: 73, right: 12, bottom: 73, left: 12 },
  },
  {
    row: 2,
    col: 4,
    src: '/image/ContainerCase/中国石化.png',
    logo: { w: 230, h: 77 },
    pad: { top: 60, right: 12, bottom: 59, left: 12 },
  },
  {
    row: 2,
    col: 5,
    src: '/image/ContainerCase/红蜻蜓粮油.png',
    logo: { w: 213, h: 80 },
    pad: { top: 60, right: 12, bottom: 60, left: 12 },
  },
];

const CustomerCases = () => {
  // 按 row 分两组渲染
  const row1 = caseCards.filter((c) => c.row === 1);
  const row2 = caseCards.filter((c) => c.row === 2);

  const renderCard = (c: CaseCard) => (
    <div
      key={c.src}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '16px',
        background: '#E9EEF3',
        padding: `${c.pad.top}px ${c.pad.right}px ${c.pad.bottom}px ${c.pad.left}px`,
        width: '264px',
        height: '200px',
        rowGap: '10px',
        flexShrink: 0,
        boxShadow: '0px 4px 12px rgba(16, 24, 40, 0.04)',
        transition: 'box-shadow 200ms ease, transform 200ms ease',
        cursor: 'pointer',
        // hover 时：阴影加强 + 微微放大（通过 :hover 伪类 style sheet 注入）
        ['--hover-shadow' as string]: '0px 10px 30px rgba(16, 24, 40, 0.12)',
      }}
      // 悬浮态通过 className + style sheet 实现，避免在 React inline style 中无法写 :hover
      className="customerCaseCard"
    >
      <img
        src={c.src}
        alt=""
        style={{
          flexShrink: 0,
          width: `${c.logo.w}px`,
          height: `${c.logo.h}px`,
          display: 'block',
          objectFit: 'contain',
        }}
      />
    </div>
  );

  return (
    <section
      style={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        background: '#FFFFFF',
        padding: '100px 240px 120px',
        boxSizing: 'border-box',
      }}
    >
      {/* 注入：卡片 hover 阴影 + 微放大；同时修正浏览器默认 img border */}
      <style>{`
        .customerCaseCard:hover {
          box-shadow: 0px 10px 30px rgba(16, 24, 40, 0.12);
          transform: scale(1.03);
        }
      `}</style>

      {/* 标题区：点击跳转到客户案例页面（/cases，后期替换真实路由） */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          alignSelf: 'stretch',
          margin: '0 auto',
        }}
      >
        {/* Header title 文字点击 → 跳转客户案例页 */}
        <a
          href="/cases"
          style={{
            margin: 0,
            textDecoration: 'none',
            cursor: 'pointer',
            lineHeight: '67px',
            letterSpacing: 0,
            color: '#000000',
            fontFamily: FONT_FAMILY,
            fontSize: '56px',
            fontWeight: 700,
          }}
        >
          <span style={{ color: '#000000' }}>客户</span>
          <span style={{ color: '#0D99FF' }}>精选案例</span>
        </a>
        <p
          style={{
            margin: '30px 0 0',
            lineHeight: '29px',
            letterSpacing: 0,
            color: '#000000',
            fontFamily: FONT_FAMILY,
            fontSize: '20px',
          }}
        >
          目前已有超 60万+客户选择思迅 →
        </p>
      </div>

      {/* 内容区 1440px，两行卡片，行间距 30px */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          alignSelf: 'stretch',
          justifyContent: 'space-between',
          marginTop: '80px',
          minWidth: '1440px',
          height: '430px',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            alignSelf: 'stretch',
            rowGap: '30px',
          }}
        >
          <div style={{ display: 'flex', columnGap: '30px' }}>
            {row1.map(renderCard)}
          </div>
          <div style={{ display: 'flex', columnGap: '30px' }}>
            {row2.map(renderCard)}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CustomerCases;
