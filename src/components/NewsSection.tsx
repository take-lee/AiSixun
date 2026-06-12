import { useState } from 'react';

const FONT_FAMILY =
  '"Noto Sans SC", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", SimHei, Arial, Helvetica, sans-serif';

// 新闻数据 —— 与 Figma 534_2726 对应
const LARGE_NEWS = {
  title: '智选未来・e 起共赢——2026 思迅全国合作伙伴大会圆满落幕',
  preview: '2026 思迅全国合作伙伴大会在昆山兰博基尼…',
  image: '/image/news/news-large.png',
};

const SMALL_NEWS = [
  { title: '智选未来・e 起共赢——2026 思迅全国合作…', image: '/image/news/news-small.png' },
  { title: '智选未来・e 起共赢——2026 思迅全国合作…', image: '/image/news/news-small.png' },
  { title: '智选未来・e 起共赢——2026 思迅全国合作…', image: '/image/news/news-small.png' },
  { title: '智选未来・e 起共赢——2026 思迅全国合作…', image: '/image/news/news-small.png' },
  { title: '智选未来・e 起共赢——2026 思迅全国合作…', image: '/image/news/news-small.png' },
];

// =============================
// 大卡片组件（480×540）
// =============================
const LargeCard = ({
  news,
  hovered,
  onHover,
}: {
  news: typeof LARGE_NEWS;
  hovered: boolean;
  onHover: (v: boolean) => void;
}) => {
  return (
    <div
      onMouseEnter={() => onHover(true)}
      onMouseLeave={() => onHover(false)}
      style={{
        position: 'relative',
        flexShrink: 0,
        borderRadius: 16,
        width: 480,
        height: 540,
        overflow: 'hidden',
        cursor: 'pointer',
        boxShadow: hovered
          ? '0px 8px 32px rgba(29, 34, 51, 0.15)'
          : '0px 4px 24px rgba(29, 34, 51, 0.05)',
        transition: 'box-shadow 0.3s ease',
      }}
    >
      {/* 背景图容器 —— hover 时图片微微放大 */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          overflow: 'hidden',
          borderRadius: 16,
        }}
      >
        <img
          src={news.image}
          alt=""
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            display: 'block',
            transform: hovered ? 'scale(1.05)' : 'scale(1)',
            transition: 'transform 0.5s ease',
          }}
        />
      </div>

      {/* 底部文字覆盖层（articleBackground） */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          borderRadius: '0px 0px 16px 16px',
          background: 'rgba(255,255,255,0.8)',
          padding: '20px 30px',
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
        }}
      >
        <p
          style={{
            display: '-webkit-box',
            width: 420,
            overflow: 'hidden',
            lineHeight: '32px',
            letterSpacing: 0,
            color: '#1D2233',
            fontFamily: FONT_FAMILY,
            fontSize: 24,
            fontWeight: 700,
            margin: 0,
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
          }}
        >
          {news.title}
        </p>
        <p
          style={{
            display: '-webkit-box',
            margin: '20px 0 0',
            width: 420,
            overflow: 'hidden',
            lineHeight: '24px',
            letterSpacing: 0,
            color: '#1D2233',
            fontFamily: FONT_FAMILY,
            fontSize: 20,
            WebkitLineClamp: 1,
            WebkitBoxOrient: 'vertical',
          }}
        >
          {news.preview}
        </p>
      </div>
    </div>
  );
};

// =============================
// 小卡片组件（300×260）
// =============================
const SmallCard = ({
  news,
  hovered,
  onHover,
}: {
  news: (typeof SMALL_NEWS)[0];
  hovered: boolean;
  onHover: (v: boolean) => void;
}) => {
  return (
    <div
      onMouseEnter={() => onHover(true)}
      onMouseLeave={() => onHover(false)}
      style={{
        position: 'relative',
        display: 'flex',
        alignItems: 'flex-start',
        alignSelf: 'stretch',
        borderRadius: 16,
        overflow: 'hidden',
        cursor: 'pointer',
        boxShadow: hovered
          ? '0px 8px 32px rgba(29, 34, 51, 0.15)'
          : '0px 4px 24px rgba(29, 34, 51, 0.05)',
        transition: 'box-shadow 0.3s ease',
      }}
    >
      {/* 背景图 —— hover 时微微放大 */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          overflow: 'hidden',
          borderRadius: 16,
        }}
      >
        <img
          src={news.image}
          alt=""
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            display: 'block',
            transform: hovered ? 'scale(1.05)' : 'scale(1)',
            transition: 'transform 0.5s ease',
          }}
        />
      </div>

      {/* 底部文字覆盖层（articleBackground3） */}
      <div
        style={{
          position: 'relative',
          zIndex: 1,
          display: 'flex',
          flexGrow: 1,
          alignItems: 'center',
          borderRadius: '0px 0px 16px 16px',
          background: 'rgba(255,255,255,0.7)',
          padding: 20,
          marginTop: 156,
          backdropFilter: 'blur(5px)',
          WebkitBackdropFilter: 'blur(5px)',
        }}
      >
        <p
          style={{
            display: '-webkit-box',
            width: 260,
            overflow: 'hidden',
            lineHeight: '32px',
            letterSpacing: 0,
            color: '#1D2233',
            fontFamily: FONT_FAMILY,
            fontSize: 24,
            margin: 0,
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
          }}
        >
          {news.title}
        </p>
      </div>
    </div>
  );
};

// =============================
// 更多新闻按钮（300×260）
// =============================
const MoreNewsButton = ({
  hovered,
  onHover,
}: {
  hovered: boolean;
  onHover: (v: boolean) => void;
}) => {
  return (
    <div
      onMouseEnter={() => onHover(true)}
      onMouseLeave={() => onHover(false)}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        alignSelf: 'stretch',
        borderRadius: 16,
        background: '#F5F6F7',
        padding: '95px 102px',
        rowGap: 14,
        cursor: 'pointer',
        boxShadow: hovered
          ? '0px 8px 32px rgba(29, 34, 51, 0.12)'
          : 'none',
        transition: 'box-shadow 0.3s ease',
      }}
    >
      {/* 箭头图标（rotate: -180deg 表示向右） */}
      <div style={{ position: 'relative', flexShrink: 0, width: 24, height: 24 }}>
        <img
          src="/image/news/arrow-right.png"
          alt=""
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: 24,
            height: 24,
            transform: 'rotate(-180deg)',
            display: 'block',
          }}
        />
      </div>
      <p
        style={{
          flexShrink: 0,
          opacity: 0.6,
          lineHeight: '32px',
          letterSpacing: 0,
          color: '#1D2233',
          fontFamily: FONT_FAMILY,
          fontSize: 24,
          margin: 0,
        }}
      >
        更多新闻
      </p>
    </div>
  );
};

// =============================
// 主组件 —— NewsSection
// 对应 Figma 534_2726 整体布局
// =============================
const NewsSection = () => {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  // 0 = 大卡片, 1-5 = 小卡片, 6 = 更多新闻
  const isHovered = (idx: number) => hoveredIdx === idx;

  return (
    <section
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#FFFFFF',
        padding: '140px 240px',
        width: '100%',
        maxWidth: 1920,
        rowGap: 80,
        margin: '0 auto',
        boxSizing: 'border-box',
      }}
    >
      {/* ---- headerTitle3：思迅 最新动态 ---- */}
      <h2
        style={{
          flexShrink: 0,
          alignSelf: 'stretch',
          textAlign: 'center',
          letterSpacing: 0,
          color: '#000000',
          fontFamily: FONT_FAMILY,
          fontSize: 56,
          fontWeight: 700,
          margin: 0,
          lineHeight: 'normal',
        }}
      >
        <span style={{ color: '#0068EB' }}>思迅</span>
        <span style={{ color: '#1D2233' }}>最新动态</span>
      </h2>

      {/* ---- articleContainer2：卡片网格 ---- */}
      <div
        style={{
          display: 'flex',
          flexShrink: 0,
          alignItems: 'center',
          alignSelf: 'stretch',
          justifyContent: 'space-between',
          minWidth: 1440,
          height: 540,
          gap: 20,
        }}
      >
        {/* 第 1 列：大卡片（480×540） */}
        <LargeCard
          news={LARGE_NEWS}
          hovered={isHovered(0)}
          onHover={(v) => setHoveredIdx(v ? 0 : null)}
        />

        {/* 第 2 列：2 张小卡片（300×260  each，gap 20） */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            alignSelf: 'stretch',
            gap: 20,
            width: 300,
          }}
        >
          <div style={{ flex: 1, width: '100%' }}>
            <SmallCard
              news={SMALL_NEWS[0]}
              hovered={isHovered(1)}
              onHover={(v) => setHoveredIdx(v ? 1 : null)}
            />
          </div>
          <div style={{ flex: 1, width: '100%' }}>
            <SmallCard
              news={SMALL_NEWS[1]}
              hovered={isHovered(2)}
              onHover={(v) => setHoveredIdx(v ? 2 : null)}
            />
          </div>
        </div>

        {/* 第 3 列：2 张小卡片（300×260 each，gap 20） */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            alignSelf: 'stretch',
            gap: 20,
            width: 300,
          }}
        >
          <div style={{ flex: 1, width: '100%' }}>
            <SmallCard
              news={SMALL_NEWS[2]}
              hovered={isHovered(3)}
              onHover={(v) => setHoveredIdx(v ? 3 : null)}
            />
          </div>
          <div style={{ flex: 1, width: '100%' }}>
            <SmallCard
              news={SMALL_NEWS[3]}
              hovered={isHovered(4)}
              onHover={(v) => setHoveredIdx(v ? 4 : null)}
            />
          </div>
        </div>

        {/* 第 4 列：1 张小卡片 + 更多新闻按钮（300×260 each，gap 20） */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            alignSelf: 'stretch',
            gap: 20,
            width: 300,
          }}
        >
          <div style={{ flex: 1, width: '100%' }}>
            <SmallCard
              news={SMALL_NEWS[4]}
              hovered={isHovered(5)}
              onHover={(v) => setHoveredIdx(v ? 5 : null)}
            />
          </div>
          <div style={{ flex: 1, width: '100%' }}>
            <MoreNewsButton
              hovered={isHovered(6)}
              onHover={(v) => setHoveredIdx(v ? 6 : null)}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsSection;
