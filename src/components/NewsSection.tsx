import { useState } from 'react';

const NewsSection = () => {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  const handleMoreNewsClick = () => {
    // 暂时没有更多新闻页面，先空着
    console.log('更多新闻点击');
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      background: '#ffffff',
      padding: '140px 240px',
      width: '100%',
      maxWidth: '1920px',
      margin: '0 auto',
      height: '967px',
      boxSizing: 'border-box',
      rowGap: '80px',
    }}>
      <h2 style={{
        flexShrink: 0,
        alignSelf: 'stretch',
        textAlign: 'center',
        letterSpacing: 0,
        color: '#000000',
        fontFamily: '"Noto Sans SC", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", SimHei, Arial, Helvetica, sans-serif',
        fontSize: '56px',
        fontWeight: '700',
        margin: 0,
      }}>
        新闻与活动
      </h2>

      <div style={{
        display: 'flex',
        flexShrink: 0,
        alignItems: 'center',
        alignSelf: 'stretch',
        justifyContent: 'space-between',
        minWidth: '1440px',
        height: '540px',
        columnGap: '20px',
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
            paddingTop: '392px',
            width: '480px',
            height: '540px',
            boxSizing: 'border-box',
            transition: 'transform 0.3s ease',
            transform: hoveredCard === 0 ? 'scale(1.02)' : 'scale(1)',
            cursor: 'pointer',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            flexGrow: 1,
            alignItems: 'center',
            borderRadius: '0px 0px 16px 16px',
            background: 'rgba(255, 255, 255, 0.8)',
            padding: '20px 30px',
            backdropFilter: 'blur(10px)',
          }}>
            <p style={{
              width: '420px',
              lineHeight: '32px',
              letterSpacing: 0,
              color: '#000000',
              fontFamily: '"Noto Sans SC", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", SimHei, Arial, Helvetica, sans-serif',
              fontSize: '24px',
              fontWeight: '700',
              margin: 0,
            }}>
              智选未来・e 起共赢——2026 思迅全国合作伙伴大会圆满落幕
            </p>
            <p style={{
              margin: '20px 0px 0px',
              width: '420px',
              lineHeight: '24px',
              letterSpacing: 0,
              color: '#000000',
              fontFamily: '"Noto Sans SC", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", SimHei, Arial, Helvetica, sans-serif',
              fontSize: '20px',
            }}>
              2026 思迅全国合作伙伴大会在昆山兰博基尼…
            </p>
          </div>
        </div>

        {/* 中间两列，每列两个卡片 */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          alignSelf: 'stretch',
        }}>
          {/* 第2个卡片 */}
          <div 
            onMouseEnter={() => setHoveredCard(1)}
            onMouseLeave={() => setHoveredCard(null)}
            style={{
              display: 'flex',
              alignItems: 'flex-start',
              alignSelf: 'stretch',
              borderRadius: '16px',
              background: '#d9d9d9',
              paddingTop: '156px',
              transition: 'transform 0.3s ease',
              transform: hoveredCard === 1 ? 'scale(1.02)' : 'scale(1)',
              cursor: 'pointer',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <div style={{
              display: 'flex',
              flexGrow: 1,
              alignItems: 'center',
              borderRadius: '0px 0px 16px 16px',
              background: 'rgba(255, 255, 255, 0.7)',
              padding: '20px',
              backdropFilter: 'blur(5px)',
            }}>
              <p style={{
                width: '260px',
                lineHeight: '32px',
                letterSpacing: 0,
                color: '#000000',
                fontFamily: '"Noto Sans SC", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", SimHei, Arial, Helvetica, sans-serif',
                fontSize: '20px',
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
              alignSelf: 'stretch',
              marginTop: '20px',
              borderRadius: '16px',
              background: '#d9d9d9',
              paddingTop: '156px',
              transition: 'transform 0.3s ease',
              transform: hoveredCard === 2 ? 'scale(1.02)' : 'scale(1)',
              cursor: 'pointer',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <div style={{
              display: 'flex',
              flexGrow: 1,
              alignItems: 'center',
              borderRadius: '0px 0px 16px 16px',
              background: 'rgba(255, 255, 255, 0.7)',
              padding: '20px',
              backdropFilter: 'blur(5px)',
            }}>
              <p style={{
                width: '260px',
                lineHeight: '32px',
                letterSpacing: 0,
                color: '#000000',
                fontFamily: '"Noto Sans SC", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", SimHei, Arial, Helvetica, sans-serif',
                fontSize: '20px',
                margin: 0,
              }}>
                智选未来・e 起共赢——2026 思迅全国合作…
              </p>
            </div>
          </div>
        </div>

        {/* 第二列，两个卡片 */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          alignSelf: 'stretch',
        }}>
          {/* 第4个卡片 */}
          <div 
            onMouseEnter={() => setHoveredCard(3)}
            onMouseLeave={() => setHoveredCard(null)}
            style={{
              display: 'flex',
              alignItems: 'flex-start',
              alignSelf: 'stretch',
              borderRadius: '16px',
              background: '#d9d9d9',
              paddingTop: '156px',
              transition: 'transform 0.3s ease',
              transform: hoveredCard === 3 ? 'scale(1.02)' : 'scale(1)',
              cursor: 'pointer',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <div style={{
              display: 'flex',
              flexGrow: 1,
              alignItems: 'center',
              borderRadius: '0px 0px 16px 16px',
              background: 'rgba(255, 255, 255, 0.7)',
              padding: '20px',
              backdropFilter: 'blur(5px)',
            }}>
              <p style={{
                width: '260px',
                lineHeight: '32px',
                letterSpacing: 0,
                color: '#000000',
                fontFamily: '"Noto Sans SC", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", SimHei, Arial, Helvetica, sans-serif',
                fontSize: '20px',
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
              alignSelf: 'stretch',
              marginTop: '20px',
              borderRadius: '16px',
              background: '#d9d9d9',
              paddingTop: '156px',
              transition: 'transform 0.3s ease',
              transform: hoveredCard === 4 ? 'scale(1.02)' : 'scale(1)',
              cursor: 'pointer',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <div style={{
              display: 'flex',
              flexGrow: 1,
              alignItems: 'center',
              borderRadius: '0px 0px 16px 16px',
              background: 'rgba(255, 255, 255, 0.7)',
              padding: '20px',
              backdropFilter: 'blur(5px)',
            }}>
              <p style={{
                width: '260px',
                lineHeight: '32px',
                letterSpacing: 0,
                color: '#000000',
                fontFamily: '"Noto Sans SC", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", SimHei, Arial, Helvetica, sans-serif',
                fontSize: '20px',
                margin: 0,
              }}>
                智选未来・e 起共赢——2026 思迅全国合作…
              </p>
            </div>
          </div>
        </div>

        {/* 最后一列，一个普通卡片和一个更多新闻卡片 */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          alignSelf: 'stretch',
        }}>
          {/* 第6个卡片 */}
          <div 
            onMouseEnter={() => setHoveredCard(5)}
            onMouseLeave={() => setHoveredCard(null)}
            style={{
              display: 'flex',
              alignItems: 'flex-start',
              alignSelf: 'stretch',
              borderRadius: '16px',
              background: '#d9d9d9',
              paddingTop: '156px',
              transition: 'transform 0.3s ease',
              transform: hoveredCard === 5 ? 'scale(1.02)' : 'scale(1)',
              cursor: 'pointer',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <div style={{
              display: 'flex',
              flexGrow: 1,
              alignItems: 'center',
              borderRadius: '0px 0px 16px 16px',
              background: 'rgba(255, 255, 255, 0.7)',
              padding: '20px',
              backdropFilter: 'blur(5px)',
            }}>
              <p style={{
                width: '260px',
                lineHeight: '32px',
                letterSpacing: 0,
                color: '#000000',
                fontFamily: '"Noto Sans SC", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", SimHei, Arial, Helvetica, sans-serif',
                fontSize: '20px',
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
              marginTop: '20px',
              width: '300px',
              height: '260px',
              transition: 'transform 0.3s ease',
              transform: hoveredCard === 6 ? 'scale(1.02)' : 'scale(1)',
              cursor: 'pointer',
            }}
          >
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              position: 'absolute',
              top: 0,
              left: 0,
              borderRadius: '16px',
              background: '#f5f6f7',
              padding: '95px',
              width: '300px',
              height: '260px',
              boxSizing: 'border-box',
              border: hoveredCard === 6 ? '1px solid #0d99ff' : '1px solid transparent',
              rowGap: '14px',
            }}>
              {/* 箭头图标 */}
              <div style={{
                position: 'relative',
                flexShrink: 0,
                width: '24px',
                height: '24px',
              }}>
                <img 
                  src={hoveredCard === 6 ? '.figma/image/mpv11soq-rsfgq49.png' : '.figma/image/mpv11j3f-4xzph6b.png'}
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '24px',
                    height: '24px',
                    overflow: 'hidden',
                    transform: 'rotate(-180deg)',
                  }}
                  alt=""
                />
              </div>
              <p style={{
                flexShrink: 0,
                opacity: 0.6,
                lineHeight: '32px',
                letterSpacing: 0,
                color: hoveredCard === 6 ? '#0d99ff' : '#1d2233',
                fontFamily: '"Noto Sans SC", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", SimHei, Arial, Helvetica, sans-serif',
                fontSize: '20px',
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
