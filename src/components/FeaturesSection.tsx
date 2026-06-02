import { useState } from 'react';

const FeaturesSection = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const features = [
    {
      title: '数字门店',
      description: '数字零售·智启未来',
      icon: '.figma/image/mpw9fkch-af1kxmk.svg',
      arrow: '.figma/image/mpw9fkch-r8ydtwt.png'
    },
    {
      title: '数字运营',
      description: '产品功能亮点介绍，产品功能亮点介绍产品功能亮点介绍',
      icon: '.figma/image/mpw9fkch-af1kxmk.svg',
      arrow: '.figma/image/mpw9fkch-r8ydtwt.png'
    },
    {
      title: 'sixunPay',
      description: '产品功能亮点介绍，产品功能亮点介绍产品功能亮点介绍',
      icon: '.figma/image/mpw9fkch-af1kxmk.svg',
      arrow: '.figma/image/mpw9fkch-r8ydtwt.png'
    }
  ];

  return (
    <div 
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '120px 240px',
        width: '100%',
        maxWidth: '1920px',
        height: '740px',
        overflow: 'hidden',
        rowGap: '80px',
        backgroundColor: '#ffffff',
        boxSizing: 'border-box'
      }}
    >
      <h2 style={{
        fontFamily: '"Noto Sans SC", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", SimHei, Arial, Helvetica, sans-serif',
        fontSize: '48px',
        fontWeight: 700,
        lineHeight: '58px',
        color: '#1d2233',
        padding: '10px 0px',
        overflow: 'hidden',
        margin: 0
      }}>
        <span style={{ color: '#0068eb' }}>Ai 智能</span>
        <span style={{ color: '#1d2233' }}>数字商业平台</span>
      </h2>

      <div style={{
        display: 'flex',
        flexShrink: 0,
        alignItems: 'center',
        alignSelf: 'stretch',
        justifyContent: 'center',
        columnGap: '30px',
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
                flexShrink: 0,
                alignItems: isHovered ? 'center' : 'flex-start',
                justifyContent: isHovered ? 'center' : 'flex-start',
                borderRadius: '16px',
                boxShadow: '0px 4px 4px 0px #a0a3aa1a',
                background: '#d9d9d9',
                width: '460px',
                height: '342px',
                rowGap: '10px',
                transition: 'all 0.3s ease',
                cursor: 'pointer',
                position: 'relative',
                overflow: 'hidden',
                paddingTop: isHovered ? '0' : '174px',
              }}
            >
              {/* 白色渐变遮罩 - 仅默认状态显示 */}
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

              {/* 卡片内容 */}
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                flexShrink: 0,
                alignItems: isHovered ? 'center' : 'flex-start',
                alignSelf: 'stretch',
                justifyContent: isHovered ? 'center' : 'flex-start',
                border: isHovered ? '1px solid var(--color, #0d99ff)' : 'none',
                borderRadius: '16px',
                background: isHovered ? '#ffffffb2' : 'transparent',
                padding: isHovered ? '29px' : '30px',
                height: isHovered ? '342px' : '168px',
                rowGap: isHovered ? '30px' : '10px',
                backdropFilter: isHovered ? 'blur(10px)' : 'none',
                zIndex: 2,
                position: 'relative',
              }}>
                {/* 标题和描述容器 */}
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  flexShrink: 0,
                  alignItems: isHovered ? 'center' : 'flex-start',
                  alignSelf: 'stretch',
                  justifyContent: isHovered ? 'center' : 'flex-start',
                  rowGap: isHovered ? '20px' : '10px',
                }}>
                  {/* 图标和标题容器 */}
                  <div style={{
                    display: 'inline-flex',
                    flexShrink: 0,
                    alignItems: 'center',
                    alignSelf: 'stretch',
                    justifyContent: isHovered ? 'center' : 'flex-start',
                    columnGap: '10px',
                    marginRight: isHovered ? '135px' : '0',
                    marginLeft: isHovered ? '135px' : '0',
                  }}>
                    <img src={feature.icon} alt="" style={{ flexShrink: 0, width: '24px', height: '24px' }} />
                    <p style={{
                      flexShrink: 0,
                      lineHeight: '29px',
                      letterSpacing: 0,
                      color: 'var(--text, #1d2233)',
                      fontFamily: '"Noto Sans SC", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", SimHei, Arial, Helvetica, sans-serif',
                      fontSize: '24px',
                      fontWeight: 700,
                      margin: 0,
                    }}>
                      {feature.title}
                    </p>
                  </div>

                  {/* 产品描述 */}
                  <p style={{
                    flexShrink: 0,
                    alignSelf: 'stretch',
                    textAlign: isHovered ? 'center' : 'left',
                    lineHeight: '19px',
                    letterSpacing: 0,
                    color: 'var(--text, #1d2233)',
                    fontFamily: '"Noto Sans SC", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", SimHei, Arial, Helvetica, sans-serif',
                    fontSize: '16px',
                    margin: 0,
                  }}>
                    {feature.description}
                  </p>
                </div>

                {/* 了解更多容器 */}
                <div style={{
                  display: 'flex',
                  flexShrink: 0,
                  alignItems: 'center',
                  justifyContent: isHovered ? 'center' : 'flex-start',
                  columnGap: '4px',
                  border: isHovered ? '1px solid var(--color, #0d99ff)' : 'none',
                  borderRadius: '8px',
                  background: isHovered ? '#ffffff' : 'transparent',
                  width: '124px',
                  height: '40px',
                }}>
                  <p style={{
                    flexShrink: 0,
                    lineHeight: '19px',
                    letterSpacing: 0,
                    color: 'var(--color, #0d99ff)',
                    fontFamily: '"Noto Sans SC", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", SimHei, Arial, Helvetica, sans-serif',
                    fontSize: '16px',
                    margin: 0,
                  }}>
                    了解更多
                  </p>
                  <div style={{
                    position: 'relative',
                    flexShrink: 0,
                    width: '17px',
                    height: '16px',
                  }}>
                    <img
                      src={feature.arrow}
                      alt=""
                      style={{
                        position: 'absolute',
                        top: '-1px',
                        left: '1px',
                        width: '16px',
                        height: '17px',
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
