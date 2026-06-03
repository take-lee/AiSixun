import { useState } from 'react';
import { useResponsive } from '../hooks/useResponsive';

// 成就卡片数据
const achievementCards = [
  {
    icon: './image/mpw3826h-x9mzmjh.svg',
    title: '国内首批',
    subtitle: '国家级高新技术企业',
  },
  {
    icon: './image/mpw3826h-8ib9epx.svg',
    title: '"专精特新"',
    subtitle: '中小企业',
  },
  {
    icon: './image/mpw3826h-m4t4du2.svg',
    title: '广东省',
    subtitle: '重点商标',
  },
  {
    icon: './image/mpw3826h-93haf6s.svg',
    title: '深圳市',
    subtitle: '"双软"企业',
  },
  {
    icon: './image/mpw3826h-f5blp0r.svg',
    title: '2016 年',
    subtitle: '挂牌新三板',
    extra: '股票代码：838758',
  },
  {
    icon: './image/mpw3826h-096b78z.svg',
    title: '2017 年',
    subtitle: '入选新三板创新层',
  },
  {
    icon: './image/mpw3826h-31y54bl.svg',
    title: '数十项',
    subtitle: '国家级发明专利',
  },
  {
    icon: './image/mpw3826h-2sfww1d.svg',
    title: '连续 10 年荣获',
    subtitle: '3A 企业信用等级证书',
  },
];

const AchievementsSection = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const { r, isMobile, isTablet, width } = useResponsive();

  const sectionPaddingX = r('16px', '20px', '40px', '80px', '120px');
  const sectionPaddingY = r('50px', '60px', '80px', '100px', '110px');
  const titleFontSize = r('24px', '30px', '36px', '44px', '50px');
  const descFontSize = r('14px', '15px', '16px', '18px', '20px');

  // 计算卡片宽度：根据屏幕宽度自适应
  const getCardWidth = () => {
    if (isMobile) return '100%';
    if (isTablet) return '46%';
    return '23%';
  };
  const cardWidth = getCardWidth();
  const cardHeight = r('180px', '200px', '220px', '200px', '200px');
  const cardTitleFont = r('18px', '20px', '22px', '24px', '28px');
  const cardSubtitleFont = r('13px', '14px', '15px', '16px', '16px');

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      backgroundImage: 'linear-gradient(180deg, #d9e8ff 0%, #d9e8ff66 100%)',
      padding: `${sectionPaddingY} ${sectionPaddingX}`,
      width: '100%',
      boxSizing: 'border-box',
      rowGap: r('40px', '50px', '60px', '70px', '80px'),
    }}>
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        alignSelf: 'stretch',
        rowGap: r('15px', '18px', '22px', '26px', '30px'),
      }}>
        <h2 style={{
          alignSelf: 'stretch',
          textAlign: 'center',
          letterSpacing: 0,
          fontFamily: '"Noto Sans SC", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", SimHei, Arial, Helvetica, sans-serif',
          fontSize: titleFontSize,
          fontWeight: '700',
          lineHeight: 1.3,
          margin: 0,
        }}>
          <span style={{ color: '#1d2233' }}>&nbsp;</span>
          <span style={{ color: '#0068eb' }}>超过 60 万+</span>
          <span style={{ color: '#1d2233' }}>&nbsp;门店选择思迅！</span>
        </h2>
        <p style={{
          alignSelf: 'stretch',
          textAlign: 'center',
          letterSpacing: 0,
          color: '#1d2233',
          fontFamily: '"Noto Sans SC", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", SimHei, Arial, Helvetica, sans-serif',
          fontSize: descFontSize,
          lineHeight: 1.6,
          margin: 0,
          maxWidth: '900px',
        }}>
          国内一流行业软件开发，在收银系统方面拥有行业领先的品牌影响力，思迅&nbsp;品牌及行业产品上百次获得政府及行业荣誉
        </p>
      </div>

      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        alignContent: 'flex-start',
        alignItems: 'flex-start',
        alignSelf: 'stretch',
        justifyContent: 'center',
        gap: r('12px', '15px', '18px', '22px', '24px'),
        maxWidth: '1440px',
      }}>
        {achievementCards.map((card, index) => (
          <div
            key={index}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
            style={{
              position: 'relative',
              borderRadius: '16px',
              boxShadow: '0px 4px 24px 0px #1d22330d',
              background: '#ffffff',
              width: cardWidth,
              minWidth: isMobile ? '0' : isTablet ? '240px' : '240px',
              height: cardHeight,
              transition: 'all 0.3s ease',
              transform: hoveredIndex === index ? 'translateY(-5px) scale(1.02)' : 'translateY(0) scale(1)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              padding: r('16px', '20px', '24px', '28px', '32px'),
              boxSizing: 'border-box',
              rowGap: r('8px', '10px', '12px', '14px', '16px'),
              flex: isMobile ? '1 1 100%' : isTablet ? '1 1 46%' : '0 1 auto',
            }}
          >
            {card.extra ? (
              <>
                <img src={card.icon} alt="" style={{
                  width: r('50px', '60px', '70px', '80px', '90px'),
                  height: r('50px', '60px', '70px', '80px', '90px'),
                }} />
                <p style={{
                  textAlign: 'center',
                  letterSpacing: 0,
                  color: '#1d2233',
                  fontFamily: '"Noto Sans SC", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", SimHei, Arial, Helvetica, sans-serif',
                  fontSize: cardTitleFont,
                  fontWeight: '700',
                  lineHeight: 1.3,
                  margin: 0,
                }}>
                  {card.title}<br />{card.subtitle}
                </p>
                <p style={{
                  letterSpacing: 0,
                  color: '#0068eb',
                  fontFamily: '"Noto Sans SC", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", SimHei, Arial, Helvetica, sans-serif',
                  fontSize: cardSubtitleFont,
                  margin: 0,
                }}>
                  {card.extra}
                </p>
              </>
            ) : (
              <>
                <img src={card.icon} alt="" style={{
                  width: r('50px', '60px', '70px', '80px', '90px'),
                  height: r('50px', '60px', '70px', '80px', '90px'),
                }} />
                <p style={{
                  textAlign: 'center',
                  letterSpacing: 0,
                  color: '#1d2233',
                  fontFamily: '"Noto Sans SC", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", SimHei, Arial, Helvetica, sans-serif',
                  fontSize: cardTitleFont,
                  fontWeight: '700',
                  lineHeight: 1.3,
                  margin: 0,
                }}>
                  {card.title}<br />{card.subtitle}
                </p>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AchievementsSection;
