import { useState } from 'react';

const FONT_FAMILY =
  '"Noto Sans SC", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", SimHei, Arial, Helvetica, sans-serif';

// =============================
// SVG 资源路径（对应 Figma 导出文件）
// =============================

// Group 2 卡片共享的 frame147 装饰图（月桂冠 + 星点 + 中线）
// 替换源：Figma mq51dq97-e8h925y.svg / mq51cki3-luasgcg.svg
const LAUREL_SVG = '/image/achievements/frame147-laurel.svg';

// Frame 147 专用 union 图（仅月桂冠，无星点）— 用于"2016年 挂牌新三板"卡片
// 替换源：Figma mq51ewa8-xmkxzbi.svg / mq51f6j0-818suu3.svg
const UNION_SVG = '/image/achievements/frame147-union.svg';

// =============================
// 数据定义 —— 与 Figma 534_2803 / 534_2807 8 张卡片一一对应
// =============================

type CardData = {
  title: string;
  sub: string;
  /** 文字区 left（各卡片因文字宽度不同而不同，取自 Figma SCSS） */
  textLeft: number;
  /** 文字区 width */
  textWidth: number;
  /** 文字区 height */
  textHeight: number;
  /** 'laurel' = Group2 共享 frame147-laurel.svg | 'stock' = Frame 147 专用 union + 股票代码 */
  variant: 'laurel' | 'stock';
};

const CARDS: CardData[] = [
  // 第一行 —— 全部使用 LAUREL_SVG（Group 2 共享同一 SVG 图）
  { title: '国内首批',       sub: '国家级高新技术企业', textLeft: 44, textWidth: 252, textHeight: 105, variant: 'laurel' },
  { title: '"专精特新"',     sub: '中小企业',          textLeft: 44, textWidth: 252, textHeight: 105, variant: 'laurel' },
  { title: '广东省',         sub: '重点商标',          textLeft: 44, textWidth: 252, textHeight: 105, variant: 'laurel' },
  { title: '深圳市',         sub: '"双软" 企业',       textLeft: 44, textWidth: 252, textHeight: 105, variant: 'laurel' },
  // 第二行
  // 第 5 张 —— Frame 147（挂牌新三板），单独用 UNION_SVG + 股票代码文字
  { title: '2016 年',        sub: '挂牌新三板',         textLeft: 44, textWidth: 252, textHeight: 105, variant: 'stock' },
  // 第 6-8 张 —— 回到 LAUREL_SVG
  { title: '2017 年',        sub: '入选新三板创新层',   textLeft: 58, textWidth: 224, textHeight: 96,  variant: 'laurel' },
  { title: '数十项',         sub: '国家级发明专利',     textLeft: 72, textWidth: 196, textHeight: 96,  variant: 'laurel' },
  { title: '连续 10 年荣获', sub: '3A 企业信用等级证书',textLeft: 38, textWidth: 265, textHeight: 96,  variant: 'laurel' },
];

// =============================
// 单张成就卡片
// =============================
const AchievementCard = ({ card }: { card: CardData }) => {
  const isStock = card.variant === 'stock';
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: 'relative',
        flexShrink: 0,
        borderRadius: 16,
        background: '#FFFFFF',
        width: 342,
        height: 200,
        cursor: 'default',
        // hover 时增加阴影并微微放大
        boxShadow: hovered
          ? '0px 8px 32px rgba(29, 34, 51, 0.12)'
          : '0px 4px 24px rgba(29, 34, 51, 0.05)',
        transform: hovered ? 'scale(1.03)' : 'scale(1)',
        transition: 'box-shadow 0.3s ease, transform 0.3s ease',
      }}
    >
      {/* ====== frame147 装饰图容器（top:50 left:3 w:334 h:109）====== */}
      <div style={{ position: 'absolute', top: 50, left: 3, width: 334, height: 109 }}>
        {isStock ? (
          // Frame 147 专用：union 图（322×80）+ 底部星点线
          <div style={{ position: 'relative', width: 334, height: 109 }}>
            {/* union 图（top:25 left:6 w:322 h:80） */}
            <img
              src={UNION_SVG}
              alt=""
              style={{
                position: 'absolute',
                top: 25,
                left: 6,
                width: 322,
                height: 80,
                display: 'block',
              }}
            />
            {/* 股票代码文字（top:93 left:100 w:134 h:19） */}
            <p style={{
              position: 'absolute',
              top: 93,
              left: 100,
              width: 134,
              height: 19,
              margin: 0,
              lineHeight: '19px',
              letterSpacing: 0,
              color: '#1D2233',
              fontFamily: FONT_FAMILY,
              fontSize: 16,
              textAlign: 'center',
            }}>
              股票代码：838758
            </p>
          </div>
        ) : (
          // Group 2 共享：frame147-laurel.svg（334×110）
          <img
            src={LAUREL_SVG}
            alt=""
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: 334,
              height: 110,
              display: 'block',
            }}
          />
        )}
      </div>

      {/* ====== 主标题文字（top:39）====== */}
      <p style={{
        position: 'absolute',
        top: 39,
        left: card.textLeft,
        width: card.textWidth,
        height: card.textHeight,
        margin: 0,
        textAlign: 'center',
        lineHeight: '48px',
        letterSpacing: 0,
        color: '#1D2233',
        fontFamily: FONT_FAMILY,
        fontSize: 28,
        fontWeight: 700,
      }}>
        {card.title}
        <br />
        {card.sub}
      </p>
    </div>
  );
};

// =============================
// 主组件 —— AchievementsSection
// 对应 Figma 534_2803 整体布局
// =============================
const AchievementsSection = () => {
  const [ctaHover, setCtaHover] = useState(false);

  return (
    <section style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start',
      padding: '140px 240px',
      width: '100%',
      maxWidth: 1920,
      rowGap: 80,
      margin: '0 auto',
      boxSizing: 'border-box',
      height: 1053,
      // Figma 渐变背景：#d9e8ffb2 → #d9e8ff47
      backgroundImage: 'linear-gradient(180deg, #d9e8ffb2 0%, #d9e8ff47 100%)',
    }}>
      {/* ---- headerContainer ---- */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        flexShrink: 0,
        alignItems: 'center',
        alignSelf: 'stretch',
        rowGap: 30,
      }}>
        {/* mainHeading3 */}
        <h2 style={{
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
        }}>
          <span style={{ color: '#1D2233' }}>{'\u00A0'}</span>
          <span style={{ color: '#0068EB' }}>超过 60 万+</span>
          <span style={{ color: '#1D2233' }}>{'\u00A0'}门店选择思迅！</span>
        </h2>

        {/* subheading —— Figma 字号 24px */}
        <p style={{
          flexShrink: 0,
          alignSelf: 'stretch',
          textAlign: 'center',
          lineHeight: '36px',
          letterSpacing: 0,
          color: '#1D2233',
          fontFamily: FONT_FAMILY,
          fontSize: 24,
          margin: 0,
        }}>
          国内一流行业软件开发，在收银系统方面拥有行业领先的品牌影响力，思迅{'\u00A0'}品牌及行业产品上百次获得政府及行业荣誉
        </p>
      </div>

      {/* ---- contentSection：2 行 × 4 列 ---- */}
      <div style={{
        display: 'flex',
        flexShrink: 0,
        flexWrap: 'wrap',
        alignContent: 'flex-start',
        alignItems: 'flex-start',
        alignSelf: 'stretch',
        justifyContent: 'space-between',
        minWidth: 1440,
        rowGap: 24,
      }}>
        {CARDS.map((card, i) => (
          <AchievementCard key={i} card={card} />
        ))}
      </div>

      {/* ---- CTA 按钮 (category) ---- */}
      <div
        onMouseEnter={() => setCtaHover(true)}
        onMouseLeave={() => setCtaHover(false)}
        style={{
          display: 'inline-flex',
          flexShrink: 0,
          alignItems: 'center',
          alignSelf: 'stretch',
          justifyContent: 'center',
          columnGap: '10px',
          marginRight: '556px',
          marginLeft: '556px',
          borderRadius: '8px',
          backgroundColor: ctaHover ? '#0068eb' : '#0d99ff',
          padding: '14px 30px',
          height: '56px',
          cursor: 'pointer',
          boxSizing: 'border-box',
          transition: 'background-color 200ms ease',
        }}
      >
        <span style={{
          flexShrink: 0,
          lineHeight: '29px',
          letterSpacing: 0,
          color: '#ffffff',
          fontFamily: FONT_FAMILY,
          fontSize: '20px',
        }}>
          7x12 小时服务，立即免费试用
        </span>
      </div>
    </section>
  );
};

export default AchievementsSection;
