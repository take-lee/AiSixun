import { useState } from 'react';

// 成就卡片数据
const achievementCards = [
  {
    icon: '.figma/image/mpw3826h-x9mzmjh.svg',
    title: '国内首批',
    subtitle: '国家级高新技术企业',
  },
  {
    icon: '.figma/image/mpw3826h-8ib9epx.svg',
    title: '“专精特新”',
    subtitle: '中小企业',
  },
  {
    icon: '.figma/image/mpw3826h-m4t4du2.svg',
    title: '广东省',
    subtitle: '重点商标',
  },
  {
    icon: '.figma/image/mpw3826h-93haf6s.svg',
    title: '深圳市',
    subtitle: '“双软”企业',
  },
  {
    icon: '.figma/image/mpw3826h-f5blp0r.svg',
    title: '2016 年',
    subtitle: '挂牌新三板',
    extra: '股票代码：838758',
  },
  {
    icon: '.figma/image/mpw3826h-096b78z.svg',
    title: '2017 年',
    subtitle: '入选新三板创新层',
  },
  {
    icon: '.figma/image/mpw3826h-31y54bl.svg',
    title: '数十项',
    subtitle: '国家级发明专利',
  },
  {
    icon: '.figma/image/mpw3826h-2sfww1d.svg',
    title: '连续 10 年荣获',
    subtitle: '3A 企业信用等级证书',
  },
];

const AchievementsSection = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start',
      backgroundImage: 'linear-gradient(180deg, #d9e8ff 0%, #d9e8ff66 100%)',
      padding: '140px 240px',
      width: '100%',
      maxWidth: '1920px',
      margin: '0 auto',
      boxSizing: 'border-box',
      rowGap: '80px',
    }}>
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        flexShrink: 0,
        alignItems: 'center',
        alignSelf: 'stretch',
        rowGap: '30px',
      }}>
        <h2 style={{
          flexShrink: 0,
          alignSelf: 'stretch',
          textAlign: 'center',
          letterSpacing: '0',
          fontFamily: '"Noto Sans SC", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", SimHei, Arial, Helvetica, sans-serif',
          fontSize: '56px',
          fontWeight: '700',
          margin: '0',
        }}>
          <span style={{ color: '#1d2233' }}>&nbsp;</span>
          <span style={{ color: '#0068eb' }}>超过 60 万+</span>
          <span style={{ color: '#1d2233' }}>&nbsp;门店选择思迅！</span>
        </h2>
        <p style={{
          flexShrink: 0,
          alignSelf: 'stretch',
          textAlign: 'center',
          lineHeight: '36px',
          letterSpacing: '0',
          color: '#1d2233',
          fontFamily: '"Noto Sans SC", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", SimHei, Arial, Helvetica, sans-serif',
          fontSize: '24px',
          margin: '0',
        }}>
          国内一流行业软件开发，在收银系统方面拥有行业领先的品牌影响力，思迅&nbsp;品牌及行业产品上百次获得政府及行业荣誉
        </p>
      </div>
      
      <div style={{
        display: 'flex',
        flexShrink: 0,
        flexWrap: 'wrap',
        alignContent: 'flex-start',
        alignItems: 'flex-start',
        alignSelf: 'stretch',
        justifyContent: 'space-between',
        rowGap: '24px',
      }}>
        {achievementCards.map((card, index) => (
          <div 
            key={index}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
            style={{
              position: 'relative',
              flexShrink: 0,
              borderRadius: '16px',
              boxShadow: '0px 4px 24px 0px #1d22330d',
              background: '#ffffff',
              width: '342px',
              height: '200px',
              transition: 'all 0.3s ease',
              transform: hoveredIndex === index ? 'translateY(-5px) scale(1.02)' : 'translateY(0) scale(1)',
            }}
          >
            <img src={card.icon} alt="" style={{
              position: 'absolute',
              top: '50px',
              left: '3px',
              width: '334px',
              height: '109px',
            }} />
            
            {card.extra ? (
              <>
                <div style={{
                  position: 'absolute',
                  top: '50px',
                  left: '3px',
                  width: '334px',
                  height: '109px',
                }}>
                  <img src=".figma/image/mpw3826h-f5blp0r.svg" alt="" style={{
                    position: 'absolute',
                    top: '25px',
                    left: '6px',
                    width: '322px',
                    height: '80px',
                  }} />
                  <p style={{
                    position: 'absolute',
                    top: '93px',
                    left: '100px',
                    width: '134px',
                    height: '19px',
                    lineHeight: '19px',
                    letterSpacing: '0',
                    color: '#1d2233',
                    fontFamily: '"Noto Sans SC", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", SimHei, Arial, Helvetica, sans-serif',
                    fontSize: '16px',
                    margin: '0',
                  }}>
                    {card.extra}
                  </p>
                </div>
                <p style={{
                  position: 'absolute',
                  top: '39px',
                  left: '44px',
                  width: '252px',
                  height: '105px',
                  textAlign: 'center',
                  lineHeight: '48px',
                  letterSpacing: '0',
                  color: '#1d2233',
                  fontFamily: '"Noto Sans SC", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", SimHei, Arial, Helvetica, sans-serif',
                  fontSize: '28px',
                  fontWeight: '700',
                  margin: '0',
                }}>
                  {card.title}<br />{card.subtitle}
                </p>
              </>
            ) : (
              <p style={{
                position: 'absolute',
                top: '39px',
                left: '44px',
                width: index === 5 ? '224px' : index === 6 ? '252px' : index === 7 ? '265px' : '252px',
                height: '105px',
                textAlign: 'center',
                lineHeight: '48px',
                letterSpacing: '0',
                color: '#1d2233',
                fontFamily: '"Noto Sans SC", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", SimHei, Arial, Helvetica, sans-serif',
                fontSize: '28px',
                fontWeight: '700',
                margin: '0',
              }}>
                {card.title}<br />{card.subtitle}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AchievementsSection;
