import { useState, useEffect, useRef } from 'react';

// 产品卡片数据
const products = [
  {
    id: 1,
    title: '大中型商超',
    subtitle: '大型、中型连锁商超、综合商业零售',
    icon: '.figma/image/mpw8ctxh-f3nt1vu.svg',
    arrowIcon: '.figma/image/mpw8ctxh-n7uai6x.png',
  },
  {
    id: 2,
    title: '便利连锁',
    subtitle: '连锁便利店、社区超市',
    icon: '.figma/image/mpw8ctxh-ozacbkl.svg',
    arrowIcon: '.figma/image/mpw8ctxh-n7uai6x.png',
  },
  {
    id: 3,
    title: '小微门店',
    subtitle: '零食店、便利店、社区店、服装店',
    icon: '.figma/image/mpw8ctxh-ozacbkl.svg',
    arrowIcon: '.figma/image/mpw8ctxh-n7uai6x.png',
  },
];

// 滚动标签数据，包含标签名称和图标
const scrollTags = [
  { name: '零售连锁', icon: '../.figma/image/mpuvzs9v-x1se9jr.svg', width: 240 },
  { name: '生鲜超市', icon: '../.figma/image/mpuvzs9v-geqpz0h.svg', width: 220 },
  { name: '休闲食品', icon: '../.figma/image/mpuvzs9v-x1se9jr.svg', width: 220 },
  { name: '母婴生活馆', icon: '../.figma/image/mpuvzs9v-geqpz0h.svg', width: 240 },
  { name: '中型连锁商超', icon: '../.figma/image/mpuvzs9v-x1se9jr.svg', width: 260 },
  { name: '美业/服务', icon: '../.figma/image/mpuvzs9v-geqpz0h.svg', width: 220 },
  { name: '烘焙熟食', icon: '../.figma/image/mpuvzs9v-x1se9jr.svg', width: 220 },
  { name: '美食广场', icon: '../.figma/image/mpuvzs9v-geqpz0h.svg', width: 220 },
  { name: '母婴美妆', icon: '../.figma/image/mpuvzs9v-x1se9jr.svg', width: 220 },
  { name: '零食便利', icon: '../.figma/image/mpuvzs9v-geqpz0h.svg', width: 220 },
  { name: '思迅商云PC', icon: '../.figma/image/mpuvzs9v-x1se9jr.svg', width: 240 },
];

// 解析值，得到数字和后缀
const parseValue = (valueStr: string) => {
  // 特殊处理 "万" 单位
  const wanMatch = valueStr.match(/^(\d+)万(.*)$/);
  if (wanMatch) {
    // 如果是 "60万+" 这样的，直接显示时显示
    return { num: parseInt(wanMatch[1]), suffix: `万${wanMatch[2]}`, display: valueStr };
  }
  // 匹配数字部分和后缀部分
  const match = valueStr.match(/^(\d+)(.*)$/);
  if (match) {
    return { num: parseInt(match[1]), suffix: match[2], display: valueStr };
  }
  return { num: 0, suffix: valueStr, display: valueStr };
};

// 数据组件数据
const statsData = [
  { value: '25年+', label: '行业深耕' },
  { value: '300+', label: '城市覆盖' },
  { value: '2000+', label: '合作伙伴' },
  { value: '60万+', label: '服务门店数量' },
].map(stat => ({
  ...stat,
  ...parseValue(stat.value),
}));

const IndustrySolutions = () => {
  const [visibleStats, setVisibleStats] = useState<number[]>([]);
  const [counts, setCounts] = useState<number[]>(statsData.map(() => 0));
  const [isRow1Hovered, setIsRow1Hovered] = useState(false);
  const [isRow3Hovered, setIsRow3Hovered] = useState(false);
  const [hoveredTagId, setHoveredTagId] = useState<string | null>(null);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);
  const animationRefs = useRef<number[]>([]);

  // 数字计数动画函数
  const animateCount = (index: number, target: number, duration: number = 2000) => {
    const startTime = performance.now();
    
    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // 使用 easeOutQuad 缓动函数
      const easeOut = progress * (2 - progress);
      const currentCount = Math.floor(easeOut * target);
      
      setCounts(prev => {
        const newCounts = [...prev];
        newCounts[index] = currentCount;
        return newCounts;
      });
      
      if (progress < 1) {
        animationRefs.current[index] = requestAnimationFrame(animate);
      }
    };
    
    animationRefs.current[index] = requestAnimationFrame(animate);
  };

  // 数据组件动态加载效果
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated.current) {
            hasAnimated.current = true;
            // 逐个显示统计数据并开始计数
            statsData.forEach((stat, index) => {
              setTimeout(() => {
                setVisibleStats((prev) => [...prev, index]);
                // 开始计数动画
                animateCount(index, stat.num, 2000);
              }, index * 300);
            });
            observer.disconnect();
          }
        });
      },
      { threshold: 0.5 }
    );

    if (statsRef.current) {
      observer.observe(statsRef.current);
    }

    return () => {
      observer.disconnect();
      // 清理所有动画
      animationRefs.current.forEach(id => {
        if (id) cancelAnimationFrame(id);
      });
    };
  }, []);

  // 计算每个标签的宽度，根据文字长度
  const getTagWidth = (name: string) => {
    const baseWidth = 200;
    const charWidth = 12;
    return Math.max(baseWidth, baseWidth + (name.length - 4) * charWidth);
  };



  return (
    <section style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start',
      background: '#ffffff',
      padding: '140px 240px 120px',
      width: '100%',
      maxWidth: '1920px',
      margin: '0 auto',
      rowGap: '120px',
      boxSizing: 'border-box',
    }}>
      {/* 容器 */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        flexShrink: 0,
        alignItems: 'flex-start',
        alignSelf: 'stretch',
        rowGap: '80px',
      }}>
        {/* 标题 */}
        <h2 style={{
          flexShrink: 0,
          width: '1440px',
          height: '67px',
          textAlign: 'center',
          letterSpacing: 0,
          color: '#000000',
          fontFamily: '"Noto Sans SC", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", SimHei, Arial, Helvetica, sans-serif',
          fontSize: '56px',
          fontWeight: 700,
          margin: 0,
        }}>
          <span style={{
            letterSpacing: 0,
            color: 'var(--text, #1d2233)',
            fontFamily: '"Noto Sans SC", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", SimHei, Arial, Helvetica, sans-serif',
            fontSize: '56px',
            fontWeight: 700,
          }}>
            探索行业
          </span>
          <span style={{
            letterSpacing: 0,
            color: '#0068eb',
            fontFamily: '"Noto Sans SC", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", SimHei, Arial, Helvetica, sans-serif',
            fontSize: '56px',
            fontWeight: 700,
          }}>
            解决方案
          </span>
        </h2>

        {/* 滚动标签区域 - Popup Overlay */}
        <div style={{
          position: 'relative',
          flexShrink: 0,
          width: '100%',
          maxWidth: '1440px',
          margin: '0 auto',
          height: '298px',
          overflow: 'hidden',
        }}>
          {/* 左渐变遮罩 */}
          <div style={{
            position: 'absolute',
            left: 0,
            top: 0,
            width: '150px',
            height: '100%',
            background: 'linear-gradient(to right, white 0%, transparent 100%)',
            zIndex: 2,
            pointerEvents: 'none',
          }} />
          
          {/* 右渐变遮罩 */}
          <div style={{
            position: 'absolute',
            right: 0,
            top: 0,
            width: '150px',
            height: '100%',
            background: 'linear-gradient(to left, white 0%, transparent 100%)',
            zIndex: 2,
            pointerEvents: 'none',
          }} />

          {/* 滚动内容 */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            height: '100%',
            rowGap: '24px',
          }}>
            {/* 第一行 - 向左滚动 */}
            <div
              onMouseEnter={() => setIsRow1Hovered(true)}
              onMouseLeave={() => {
                setIsRow1Hovered(false);
                setHoveredTagId(null);
              }}
              style={{
                display: 'flex',
                columnGap: '24px',
                animation: isRow1Hovered ? 'none' : 'scrollLeft 30s linear infinite',
                width: 'max-content',
              }}
            >
              {[...scrollTags, ...scrollTags].map((tag, index) => {
                const tagId = `row1-${index}`;
                const isHovered = hoveredTagId === tagId;
                return (
                  <div
                    key={tagId}
                    onMouseEnter={() => setHoveredTagId(tagId)}
                    onMouseLeave={() => setHoveredTagId(null)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      borderRadius: '16px',
                      background: isHovered ? '#f5f6f7' : '#d9d9d9',
                      border: isHovered ? '1px solid #0d99ff' : 'none',
                      padding: '14px 30px',
                      width: getTagWidth(tag.name),
                      minWidth: getTagWidth(tag.name),
                      height: '68px',
                      whiteSpace: 'nowrap',
                      transition: 'all 0.3s ease',
                    }}
                  >
                    <div style={{
                      borderRadius: '8px',
                      background: '#f5f6f7',
                      width: '40px',
                      height: '40px',
                      flexShrink: 0,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                      <img
                        src={tag.icon}
                        alt=""
                        style={{
                          width: '24px',
                          height: '24px',
                          flexShrink: 0,
                        }}
                      />
                    </div>
                    <span style={{
                      lineHeight: '24px',
                      letterSpacing: 0,
                      color: '#1d2233',
                      fontFamily: '"Noto Sans SC", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", SimHei, Arial, Helvetica, sans-serif',
                      fontSize: '20px',
                    }}>
                      {tag.name}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* 第二行 - 中间固定，两边渐变 */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              columnGap: '24px',
              position: 'relative',
            }}>
              {/* 左边渐变 */}
              <div style={{
                position: 'absolute',
                left: 0,
                top: 0,
                bottom: 0,
                width: '250px',
                background: 'linear-gradient(to right, white 0%, transparent 100%)',
                zIndex: 1,
              }} />
              
              {/* 右边渐变 */}
              <div style={{
                position: 'absolute',
                right: 0,
                top: 0,
                bottom: 0,
                width: '250px',
                background: 'linear-gradient(to left, white 0%, transparent 100%)',
                zIndex: 1,
              }} />

              {/* 中间固定标签 */}
              {scrollTags.slice(0, 7).map((tag, index) => {
                const tagId = `row2-${index}`;
                const isHovered = hoveredTagId === tagId;
                return (
                  <div
                    key={tagId}
                    onMouseEnter={() => setHoveredTagId(tagId)}
                    onMouseLeave={() => setHoveredTagId(null)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      borderRadius: '16px',
                      background: isHovered ? '#f5f6f7' : '#d9d9d9',
                      border: isHovered ? '1px solid #0d99ff' : 'none',
                      padding: '14px 30px',
                      width: getTagWidth(tag.name),
                      minWidth: getTagWidth(tag.name),
                      height: '68px',
                      whiteSpace: 'nowrap',
                      transition: 'all 0.3s ease',
                    }}
                  >
                    <div style={{
                      borderRadius: '8px',
                      background: '#f5f6f7',
                      width: '40px',
                      height: '40px',
                      flexShrink: 0,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                      <img
                        src={tag.icon}
                        alt=""
                        style={{
                          width: '24px',
                          height: '24px',
                          flexShrink: 0,
                        }}
                      />
                    </div>
                    <span style={{
                      lineHeight: '24px',
                      letterSpacing: 0,
                      color: '#1d2233',
                      fontFamily: '"Noto Sans SC", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", SimHei, Arial, Helvetica, sans-serif',
                      fontSize: '20px',
                    }}>
                      {tag.name}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* 第三行 - 向左滚动 */}
            <div
              onMouseEnter={() => setIsRow3Hovered(true)}
              onMouseLeave={() => {
                setIsRow3Hovered(false);
                setHoveredTagId(null);
              }}
              style={{
                display: 'flex',
                columnGap: '24px',
                animation: isRow3Hovered ? 'none' : 'scrollLeft 35s linear infinite',
                width: 'max-content',
              }}
            >
              {[...scrollTags.slice(3), ...scrollTags.slice(3)].map((tag, index) => {
                const tagId = `row3-${index}`;
                const isHovered = hoveredTagId === tagId;
                return (
                  <div
                    key={tagId}
                    onMouseEnter={() => setHoveredTagId(tagId)}
                    onMouseLeave={() => setHoveredTagId(null)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      borderRadius: '16px',
                      background: isHovered ? '#f5f6f7' : '#d9d9d9',
                      border: isHovered ? '1px solid #0d99ff' : 'none',
                      padding: '14px 30px',
                      width: getTagWidth(tag.name),
                      minWidth: getTagWidth(tag.name),
                      height: '68px',
                      whiteSpace: 'nowrap',
                      transition: 'all 0.3s ease',
                    }}
                  >
                    <div style={{
                      borderRadius: '8px',
                      background: '#f5f6f7',
                      width: '40px',
                      height: '40px',
                      flexShrink: 0,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                      <img
                        src={tag.icon}
                        alt=""
                        style={{
                          width: '24px',
                          height: '24px',
                          flexShrink: 0,
                        }}
                      />
                    </div>
                    <span style={{
                      lineHeight: '24px',
                      letterSpacing: 0,
                      color: '#1d2233',
                      fontFamily: '"Noto Sans SC", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", SimHei, Arial, Helvetica, sans-serif',
                      fontSize: '20px',
                    }}>
                      {tag.name}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* 产品卡片列表 */}
        <div style={{
          display: 'flex',
          flexShrink: 0,
          alignItems: 'center',
          width: '1440px',
          height: '520px',
          columnGap: '30px',
        }}>
          {products.map((product) => {
            const isHovered = hoveredCard === product.id;
            return (
              <div
                key={product.id}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  flexShrink: 0,
                  alignItems: isHovered ? 'center' : 'flex-start',
                  justifyContent: isHovered ? 'center' : 'flex-start',
                  borderRadius: '16px',
                  boxShadow: '0px 4px 30px 0px #a0a3aa1a',
                  background: '#d9d9d9',
                  width: '460px',
                  height: '520px',
                  rowGap: '10px',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer',
                  position: 'relative',
                  overflow: 'hidden',
                  paddingTop: isHovered ? '0' : '320px',
                }}
                onMouseEnter={() => setHoveredCard(product.id)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                {/* 白色渐变遮罩 - 仅默认状态显示 */}
                {!isHovered && (
                  <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'linear-gradient(180deg, #f5f6f700 0%, #f5f6f7 80%)',
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
                  background: isHovered ? '#ffffffb2' : 'linear-gradient(180deg, #f5f6f700 0%, #f5f6f7 80%)',
                  padding: isHovered ? '29px 37px' : '30px 46px 30px 30px',
                  height: isHovered ? '520px' : 'auto',
                  rowGap: '18px',
                  backdropFilter: isHovered ? 'blur(15px)' : 'none',
                  zIndex: 2,
                  position: 'relative',
                }}>
                  {/* 图标和标题容器 */}
                  <div style={{
                    display: 'flex',
                    flexDirection: isHovered ? 'column' : 'row',
                    flexShrink: 0,
                    alignItems: isHovered ? 'center' : 'flex-start',
                    alignSelf: 'stretch',
                    justifyContent: isHovered ? 'center' : 'flex-start',
                    rowGap: isHovered ? '20px' : '0',
                    columnGap: isHovered ? '0' : '20px',
                  }}>
                    {/* 产品图标 */}
                    <div style={{
                      display: 'flex',
                      flexShrink: 0,
                      alignItems: 'center',
                      justifyContent: 'center',
                      columnGap: '10px',
                      borderRadius: '8px',
                      background: 'var(--text, #1d2233)',
                      padding: '10px',
                      width: '40px',
                      height: '40px',
                    }}>
                      <img
                        src={product.icon}
                        alt=""
                        style={{
                          flexShrink: 0,
                          width: '32px',
                          height: '32px',
                          overflow: 'hidden',
                        }}
                      />
                    </div>

                    {/* 产品标题 */}
                    <p style={{
                      flexShrink: 0,
                      width: '320px',
                      textAlign: isHovered ? 'center' : 'left',
                      letterSpacing: 0,
                      color: '#000000',
                      fontFamily: '"Noto Sans SC", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", SimHei, Arial, Helvetica, sans-serif',
                      fontSize: '32px',
                      fontWeight: 700,
                      margin: 0,
                    }}>
                      {product.title}
                    </p>
                  </div>

                  {/* 产品副标题 */}
                  <p style={{
                    flexShrink: 0,
                    alignSelf: 'stretch',
                    textAlign: isHovered ? 'center' : 'left',
                    letterSpacing: 0,
                    color: '#000000',
                    fontFamily: '"Noto Sans SC", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", SimHei, Arial, Helvetica, sans-serif',
                    fontSize: '20px',
                    margin: 0,
                  }}>
                    {product.subtitle}
                  </p>

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
                    width: '120px',
                    height: '40px',
                  }}>
                    <p style={{
                      flexShrink: 0,
                      lineHeight: '24px',
                      letterSpacing: 0,
                      color: '#0d99ff',
                      fontFamily: '"Noto Sans SC", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", SimHei, Arial, Helvetica, sans-serif',
                      fontSize: '20px',
                      margin: 0,
                    }}>
                      了解更多
                    </p>
                    <div style={{
                      position: 'relative',
                      flexShrink: 0,
                      width: '20px',
                      height: '20px',
                    }}>
                      <img
                        src={product.arrowIcon}
                        alt=""
                        style={{
                          position: 'absolute',
                          top: '1px',
                          left: '1px',
                          width: '20px',
                          height: '20px',
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

      {/* 数据组件 - date */}
      <div
        ref={statsRef}
        style={{
          display: 'flex',
          flexShrink: 0,
          alignItems: 'center',
          alignSelf: 'stretch',
          overflow: 'hidden',
          justifyContent: 'center',
        }}
      >
        {statsData.map((stat, index) => (
          <div
            key={index}
            style={{
              display: 'flex',
              flexDirection: 'column',
              flexShrink: 0,
              alignItems: 'center',
              padding: '40px 110px',
              rowGap: '30px',
              width: index === 2 ? '360px' : 'auto',
              opacity: visibleStats.includes(index) ? 1 : 0,
              transform: visibleStats.includes(index) ? 'translateY(0)' : 'translateY(20px)',
              transition: 'all 0.5s ease',
            }}
          >
            <p style={{
              flexShrink: 0,
              lineHeight: '58px',
              letterSpacing: 0,
              color: '#000000',
              fontFamily: '"Noto Sans SC", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", SimHei, Arial, Helvetica, sans-serif',
              fontSize: '48px',
              fontWeight: 700,
              margin: 0,
              textAlign: 'center',
            }}>
              {visibleStats.includes(index) ? `${counts[index]}${stat.suffix}` : stat.value}
            </p>
            <p style={{
              flexShrink: 0,
              alignSelf: 'stretch',
              textAlign: 'center',
              letterSpacing: 0,
              color: '#000000',
              fontFamily: '"Noto Sans SC", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", SimHei, Arial, Helvetica, sans-serif',
              fontSize: '20px',
              margin: 0,
            }}>
              {stat.label}
            </p>
          </div>
        ))}
      </div>

      {/* CSS 动画 */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes scrollLeft {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
      `}} />
    </section>
  );
};

export default IndustrySolutions;
