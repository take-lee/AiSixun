import { useState } from 'react';
import { useResponsive } from '../hooks/useResponsive';

const features = [
  {
    title: '数字门店',
    description: '数字零售·智启未来',
    icon: './image/mpw9fkch-af1kxmk.svg',
    arrow: './image/mpw9fkch-r8ydtwt.png'
  },
  {
    title: '数字运营',
    description: '产品功能亮点介绍，产品功能亮点介绍产品功能亮点介绍',
    icon: './image/mpw9fkch-af1kxmk.svg',
    arrow: './image/mpw9fkch-r8ydtwt.png'
  },
  {
    title: 'sixunPay',
    description: '产品功能亮点介绍，产品功能亮点介绍产品功能亮点介绍',
    icon: './image/mpw9fkch-af1kxmk.svg',
    arrow: './image/mpw9fkch-r8ydtwt.png'
  }
];

const FeaturesSection = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const { r, isMobile, width } = useResponsive();

  // 响应式尺寸
  const sectionPaddingX = r('16px', '20px', '40px', '100px', '240px');
  const sectionPaddingY = r('50px', '60px', '80px', '100px', '110px');
  const titleFontSize = r('24px', '30px', '36px', '42px', '48px');
  const titleLineHeight = r('30px', '38px', '46px', '54px', '58px');

  // 卡片宽度 - 桌面端固定460，平板约320，移动端100%
  const getCardWidth = () => {
    if (isMobile) return '100%';
    const availableWidth = width - (width > 1440 ? 480 : width > 1024 ? 200 : 80) - 60;
    const perCard = Math.max(240, Math.min(460, availableWidth / 3 - 20));
    return `${perCard}px`;
  };
  const cardWidth = getCardWidth();
  const cardHeight = r('260px', '280px', '310px', '330px', '342px');
  const cardTitleFont = r('18px', '20px', '22px', '23px', '24px');
  const cardDescFont = r('13px', '14px', '15px', '15px', '16px');
  const buttonFont = r('13px', '14px', '15px', '15px', '16px');
  const buttonHeight = r('32px', '36px', '38px', '40px', '40px');

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: `${sectionPaddingY} ${sectionPaddingX}`,
        width: '100%',
        overflow: 'hidden',
        rowGap: r('40px', '50px', '60px', '70px', '80px'),
        backgroundColor: '#ffffff',
        boxSizing: 'border-box'
      }}
    >
      <h2 style={{
        fontFamily: '"Noto Sans SC", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", SimHei, Arial, Helvetica, sans-serif',
        fontSize: titleFontSize,
        fontWeight: 700,
        lineHeight: titleLineHeight,
        color: '#1d2233',
        padding: '10px 0px',
        overflow: 'hidden',
        margin: 0,
        textAlign: 'center'
      }}>
        <span style={{ color: '#0068eb' }}>Ai 智能</span>
        <span style={{ color: '#1d2233' }}> 数字商业平台</span>
      </h2>

      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'stretch',
        gap: r('15px', '20px', '25px', '28px', '30px'),
      }}>
        {features.map((feature, index) => {
          const isHovered = hoveredIndex === index;
          return (
            <div
              key={index}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: isHovered ? 'center' : 'flex-start',
                justifyContent: isHovered ? 'center' : 'flex-start',
                borderRadius: '16px',
                boxShadow: '0px 4px 4px 0px #a0a3aa1a',
                background: '#d9d9d9',
                width: cardWidth,
                height: cardHeight,
                rowGap: '10px',
                transition: 'all 0.3s ease',
                cursor: 'pointer',
                position: 'relative',
                overflow: 'hidden',
                paddingTop: isHovered ? '0' : r('120px', '130px', '150px', '160px', '174px'),
              }}
            >
              {!isHovered && (
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background: 'linear-gradient(180deg, #f5f6f700 0%, #f5f6f7 100%)',
                  borderRadius: '16px',
                  zIndex: 1,
                  pointerEvents: 'none',
                }} />
              )}

              <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: isHovered ? 'center' : 'flex-start',
                alignSelf: 'stretch',
                justifyContent: isHovered ? 'center' : 'flex-start',
                border: isHovered ? '1px solid var(--color, #0d99ff)' : 'none',
                borderRadius: '16px',
                background: isHovered ? '#ffffffb2' : 'transparent',
                padding: isHovered ? r('20px', '22px', '25px', '27px', '29px') : r('18px', '22px', '25px', '27px', '30px'),
                height: isHovered ? cardHeight : 'auto',
                rowGap: isHovered ? r('18px', '20px', '24px', '27px', '30px') : '10px',
                backdropFilter: isHovered ? 'blur(10px)' : 'none',
                zIndex: 2,
                position: 'relative',
              }}>
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: isHovered ? 'center' : 'flex-start',
                  alignSelf: 'stretch',
                  justifyContent: isHovered ? 'center' : 'flex-start',
                  rowGap: isHovered ? r('12px', '14px', '17px', '19px', '20px') : '10px',
                }}>
                  <div style={{
                    display: 'inline-flex',
                    flexShrink: 0,
                    alignItems: 'center',
                    alignSelf: 'stretch',
                    justifyContent: isHovered ? 'center' : 'flex-start',
                    columnGap: '10px',
                    marginRight: isHovered ? r('80px', '90px', '105px', '120px', '135px') : '0',
                    marginLeft: isHovered ? r('80px', '90px', '105px', '120px', '135px') : '0',
                  }}>
                    <img src={feature.icon} alt="" style={{ flexShrink: 0, width: r('18px', '20px', '22px', '23px', '24px'), height: r('18px', '20px', '22px', '23px', '24px') }} />
                    <p style={{
                      flexShrink: 0,
                      lineHeight: '1.2',
                      letterSpacing: 0,
                      color: 'var(--text, #1d2233)',
                      fontFamily: '"Noto Sans SC", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", SimHei, Arial, Helvetica, sans-serif',
                      fontSize: cardTitleFont,
                      fontWeight: 700,
                      margin: 0,
                    }}>
                      {feature.title}
                    </p>
                  </div>

                  <p style={{
                    flexShrink: 0,
                    alignSelf: 'stretch',
                    textAlign: isHovered ? 'center' : 'left',
                    lineHeight: '1.3',
                    letterSpacing: 0,
                    color: 'var(--text, #1d2233)',
                    fontFamily: '"Noto Sans SC", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", SimHei, Arial, Helvetica, sans-serif',
                    fontSize: cardDescFont,
                    margin: 0,
                  }}>
                    {feature.description}
                  </p>
                </div>

                <div style={{
                  display: 'flex',
                  flexShrink: 0,
                  alignItems: 'center',
                  justifyContent: isHovered ? 'center' : 'flex-start',
                  columnGap: '4px',
                  border: isHovered ? '1px solid var(--color, #0d99ff)' : 'none',
                  borderRadius: '8px',
                  background: isHovered ? '#ffffff' : 'transparent',
                  width: isHovered ? 'auto' : 'auto',
                  height: buttonHeight,
                  padding: isHovered ? `0 ${r('12px', '14px', '16px', '18px', '20px')}` : '0',
                }}>
                  <p style={{
                    flexShrink: 0,
                    lineHeight: '1.2',
                    letterSpacing: 0,
                    color: 'var(--color, #0d99ff)',
                    fontFamily: '"Noto Sans SC", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", SimHei, Arial, Helvetica, sans-serif',
                    fontSize: buttonFont,
                    margin: 0,
                  }}>
                    了解更多
                  </p>
                  <div style={{
                    position: 'relative',
                    flexShrink: 0,
                    width: r('14px', '15px', '16px', '17px', '17px'),
                    height: r('14px', '15px', '16px', '16px', '16px'),
                  }}>
                    <img
                      src={feature.arrow}
                      alt=""
                      style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        rotate: '-90deg',
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FeaturesSection;
