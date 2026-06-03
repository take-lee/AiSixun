import { useState } from 'react';
import { useResponsive } from '../hooks/useResponsive';

const NewsSection = () => {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const { r, isMobile, isTablet, width } = useResponsive();

  const sectionPaddingX = r('16px', '20px', '40px', '80px', '120px');
  const sectionPaddingY = r('50px', '60px', '80px', '100px', '110px');
  const titleFontSize = r('24px', '30px', '36px', '44px', '50px');

  // 根据屏幕尺寸计算主卡片尺寸
  const getMainCardSize = () => {
    if (isMobile) return { width: '100%', height: '320px', title: '18px', desc: '14px' };
    if (isTablet) return { width: '48%', height: '380px', title: '20px', desc: '15px' };
    return { width: '480px', height: '540px', title: '24px', desc: '20px' };
  };
  const mainCard = getMainCardSize();

  // 根据屏幕尺寸计算小卡片尺寸
  const getSmallCardSize = () => {
    if (isMobile) return { width: '48%', height: '200px', title: '14px' };
    if (isTablet) return { width: '48%', height: '240px', title: '16px' };
    return { width: '260px', height: '260px', title: '20px' };
  };
  const smallCard = getSmallCardSize();

  const handleMoreNewsClick = () => {
    console.log('更多新闻点击');
  };

  const containerAlign = isMobile ? 'flex-start' : 'center';
  const cardsFlexDirection = isMobile ? 'column' : 'row';
  const mainColFlex = isMobile ? '100%' : 'auto';

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      background: '#ffffff',
      padding: `${sectionPaddingY} ${sectionPaddingX}`,
      width: '100%',
      boxSizing: 'border-box',
      rowGap: r('40px', '50px', '60px', '70px', '80px'),
    }}>
      <h2 style={{
        alignSelf: 'stretch',
        textAlign: 'center',
        letterSpacing: 0,
        color: '#000000',
        fontFamily: '"Noto Sans SC", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", SimHei, Arial, Helvetica, sans-serif',
        fontSize: titleFontSize,
        fontWeight: '700',
        margin: 0,
      }}>
        新闻与活动
      </h2>

      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'flex-start',
        justifyContent: 'center',
        gap: r('12px', '15px', '18px', '20px', '20px'),
        width: '100%',
        maxWidth: '1440px',
      }}>
        {/* 第一个最大的卡片 */}
        <div
          onMouseEnter={() => setHoveredCard(0)}
          onMouseLeave={() => setHoveredCard(null)}
          style={{
            display: 'flex',
            alignItems: 'flex-start',
            borderRadius: '16px',
            background: '#d9d9d9',
            width: mainCard.width,
            height: mainCard.height,
            boxSizing: 'border-box',
            transition: 'transform 0.3s ease',
            transform: hoveredCard === 0 ? 'scale(1.02)' : 'scale(1)',
            cursor: 'pointer',
            position: 'relative',
            overflow: 'hidden',
            flexShrink: 0,
          }}
        >
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            flexGrow: 1,
            alignItems: 'flex-start',
            alignSelf: 'flex-end',
            borderRadius: '0px 0px 16px 16px',
            background: 'rgba(255, 255, 255, 0.8)',
            padding: r('16px', '18px', '20px', '24px', '30px'),
            backdropFilter: 'blur(10px)',
            rowGap: r('8px', '10px', '12px', '14px', '20px'),
          }}>
            <p style={{
              width: '100%',
              letterSpacing: 0,
              color: '#000000',
              fontFamily: '"Noto Sans SC", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", SimHei, Arial, Helvetica, sans-serif',
              fontSize: mainCard.title,
              fontWeight: '700',
              lineHeight: 1.4,
              margin: 0,
            }}>
              智选未来・e 起共赢——2026 思迅全国合作伙伴大会圆满落幕
            </p>
            <p style={{
              width: '100%',
              letterSpacing: 0,
              color: '#000000',
              fontFamily: '"Noto Sans SC", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", SimHei, Arial, Helvetica, sans-serif',
              fontSize: mainCard.desc,
              lineHeight: 1.4,
              margin: 0,
            }}>
              2026 思迅全国合作伙伴大会在昆山兰博基尼…
            </p>
          </div>
        </div>

        {/* 中间两列 */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'stretch',
          gap: r('12px', '15px', '18px', '20px', '20px'),
          flex: mainColFlex,
          minWidth: isMobile ? '0' : smallCard.width,
        }}>
          {/* 第2个卡片 */}
          <div
            onMouseEnter={() => setHoveredCard(1)}
            onMouseLeave={() => setHoveredCard(null)}
            style={{
              display: 'flex',
              alignItems: 'flex-start',
              borderRadius: '16px',
              background: '#d9d9d9',
              width: '100%',
              height: smallCard.height,
              transition: 'transform 0.3s ease',
              transform: hoveredCard === 1 ? 'scale(1.02)' : 'scale(1)',
              cursor: 'pointer',
              position: 'relative',
              overflow: 'hidden',
              flexShrink: 0,
            }}
          >
            <div style={{
              display: 'flex',
              flexGrow: 1,
              alignItems: 'center',
              alignSelf: 'flex-end',
              borderRadius: '0px 0px 16px 16px',
              background: 'rgba(255, 255, 255, 0.7)',
              padding: r('12px', '14px', '16px', '18px', '20px'),
              backdropFilter: 'blur(5px)',
            }}>
              <p style={{
                width: '100%',
                letterSpacing: 0,
                color: '#000000',
                fontFamily: '"Noto Sans SC", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", SimHei, Arial, Helvetica, sans-serif',
                fontSize: smallCard.title,
                fontWeight: '700',
                lineHeight: 1.4,
                margin: 0,
              }}>
                智选未来・e 起共赢——2026 思迅全国合作…
              </p>
            </div>
          </div>

          {/* 第3个卡片 */}
          <div
            onMouseEnter={() => setHoveredCard(2)}
            onMouseLeave={() => setHoveredCard(null)}
            style={{
              display: 'flex',
              alignItems: 'flex-start',
              borderRadius: '16px',
              background: '#d9d9d9',
              width: '100%',
              height: smallCard.height,
              transition: 'transform 0.3s ease',
              transform: hoveredCard === 2 ? 'scale(1.02)' : 'scale(1)',
              cursor: 'pointer',
              position: 'relative',
              overflow: 'hidden',
              flexShrink: 0,
            }}
          >
            <div style={{
              display: 'flex',
              flexGrow: 1,
              alignItems: 'center',
              alignSelf: 'flex-end',
              borderRadius: '0px 0px 16px 16px',
              background: 'rgba(255, 255, 255, 0.7)',
              padding: r('12px', '14px', '16px', '18px', '20px'),
              backdropFilter: 'blur(5px)',
            }}>
              <p style={{
                width: '100%',
                letterSpacing: 0,
                color: '#000000',
                fontFamily: '"Noto Sans SC", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", SimHei, Arial, Helvetica, sans-serif',
                fontSize: smallCard.title,
                fontWeight: '700',
                lineHeight: 1.4,
                margin: 0,
              }}>
                智选未来・e 起共赢——2026 思迅全国合作…
              </p>
            </div>
          </div>
        </div>

        {/* 第二列 */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'stretch',
          gap: r('12px', '15px', '18px', '20px', '20px'),
          flex: mainColFlex,
          minWidth: isMobile ? '0' : smallCard.width,
        }}>
          {/* 第4个卡片 */}
          <div
            onMouseEnter={() => setHoveredCard(3)}
            onMouseLeave={() => setHoveredCard(null)}
            style={{
              display: 'flex',
              alignItems: 'flex-start',
              borderRadius: '16px',
              background: '#d9d9d9',
              width: '100%',
              height: smallCard.height,
              transition: 'transform 0.3s ease',
              transform: hoveredCard === 3 ? 'scale(1.02)' : 'scale(1)',
              cursor: 'pointer',
              position: 'relative',
              overflow: 'hidden',
              flexShrink: 0,
            }}
          >
            <div style={{
              display: 'flex',
              flexGrow: 1,
              alignItems: 'center',
              alignSelf: 'flex-end',
              borderRadius: '0px 0px 16px 16px',
              background: 'rgba(255, 255, 255, 0.7)',
              padding: r('12px', '14px', '16px', '18px', '20px'),
              backdropFilter: 'blur(5px)',
            }}>
              <p style={{
                width: '100%',
                letterSpacing: 0,
                color: '#000000',
                fontFamily: '"Noto Sans SC", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", SimHei, Arial, Helvetica, sans-serif',
                fontSize: smallCard.title,
                fontWeight: '700',
                lineHeight: 1.4,
                margin: 0,
              }}>
                智选未来・e 起共赢——2026 思迅全国合作…
              </p>
            </div>
          </div>

          {/* 第5个卡片 */}
          <div
            onMouseEnter={() => setHoveredCard(4)}
            onMouseLeave={() => setHoveredCard(null)}
            style={{
              display: 'flex',
              alignItems: 'flex-start',
              borderRadius: '16px',
              background: '#d9d9d9',
              width: '100%',
              height: smallCard.height,
              transition: 'transform 0.3s ease',
              transform: hoveredCard === 4 ? 'scale(1.02)' : 'scale(1)',
              cursor: 'pointer',
              position: 'relative',
              overflow: 'hidden',
              flexShrink: 0,
            }}
          >
            <div style={{
              display: 'flex',
              flexGrow: 1,
              alignItems: 'center',
              alignSelf: 'flex-end',
              borderRadius: '0px 0px 16px 16px',
              background: 'rgba(255, 255, 255, 0.7)',
              padding: r('12px', '14px', '16px', '18px', '20px'),
              backdropFilter: 'blur(5px)',
            }}>
              <p style={{
                width: '100%',
                letterSpacing: 0,
                color: '#000000',
                fontFamily: '"Noto Sans SC", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", SimHei, Arial, Helvetica, sans-serif',
                fontSize: smallCard.title,
                fontWeight: '700',
                lineHeight: 1.4,
                margin: 0,
              }}>
                智选未来・e 起共赢——2026 思迅全国合作…
              </p>
            </div>
          </div>
        </div>

        {/* 最后一列：第6个卡片 + 更多新闻 */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'stretch',
          gap: r('12px', '15px', '18px', '20px', '20px'),
          flex: mainColFlex,
          minWidth: isMobile ? '0' : smallCard.width,
        }}>
          {/* 第6个卡片 */}
          <div
            onMouseEnter={() => setHoveredCard(5)}
            onMouseLeave={() => setHoveredCard(null)}
            style={{
              display: 'flex',
              alignItems: 'flex-start',
              borderRadius: '16px',
              background: '#d9d9d9',
              width: '100%',
              height: smallCard.height,
              transition: 'transform 0.3s ease',
              transform: hoveredCard === 5 ? 'scale(1.02)' : 'scale(1)',
              cursor: 'pointer',
              position: 'relative',
              overflow: 'hidden',
              flexShrink: 0,
            }}
          >
            <div style={{
              display: 'flex',
              flexGrow: 1,
              alignItems: 'center',
              alignSelf: 'flex-end',
              borderRadius: '0px 0px 16px 16px',
              background: 'rgba(255, 255, 255, 0.7)',
              padding: r('12px', '14px', '16px', '18px', '20px'),
              backdropFilter: 'blur(5px)',
            }}>
              <p style={{
                width: '100%',
                letterSpacing: 0,
                color: '#000000',
                fontFamily: '"Noto Sans SC", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", SimHei, Arial, Helvetica, sans-serif',
                fontSize: smallCard.title,
                fontWeight: '700',
                lineHeight: 1.4,
                margin: 0,
              }}>
                智选未来・e 起共赢——2026 思迅全国合作…
              </p>
            </div>
          </div>

          {/* 更多新闻卡片 */}
          <div
            onClick={handleMoreNewsClick}
            onMouseEnter={() => setHoveredCard(6)}
            onMouseLeave={() => setHoveredCard(null)}
            style={{
              position: 'relative',
              width: '100%',
              height: smallCard.height,
              transition: 'transform 0.3s ease',
              transform: hoveredCard === 6 ? 'scale(1.02)' : 'scale(1)',
              cursor: 'pointer',
              flexShrink: 0,
            }}
          >
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: '16px',
              background: '#f5f6f7',
              padding: r('20px', '24px', '28px', '30px', '40px'),
              width: '100%',
              height: '100%',
              boxSizing: 'border-box',
              border: hoveredCard === 6 ? '1px solid #0d99ff' : '1px solid transparent',
              rowGap: r('8px', '10px', '12px', '14px', '14px'),
            }}>
              <img
                src={hoveredCard === 6 ? './image/mpv11soq-rsfgq49.png' : './image/mpv11j3f-4xzph6b.png'}
                style={{
                  width: r('18px', '20px', '22px', '24px', '24px'),
                  height: r('18px', '20px', '22px', '24px', '24px'),
                  transform: 'rotate(-180deg)',
                }}
                alt=""
              />
              <p style={{
                opacity: 0.6,
                letterSpacing: 0,
                color: hoveredCard === 6 ? '#0d99ff' : '#1d2233',
                fontFamily: '"Noto Sans SC", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", SimHei, Arial, Helvetica, sans-serif',
                fontSize: r('14px', '16px', '18px', '20px', '20px'),
                margin: 0,
              }}>
                更多新闻
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsSection;
