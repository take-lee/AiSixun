import { useState, useEffect, useRef, useCallback } from 'react';
import { useResponsive } from '../hooks/useResponsive';

const slides = [
  {
    id: 1,
    title: 'Ai 驱动零售数智化',
    subtitle: 'Ai 数据洞察 · Ai 经营助手 · Ai 会员分析 · Ai 营销引擎',
    subtitleLineHeight: 32,
  },
  {
    id: 2,
    title: '数字零售 · 智启未来',
    subtitle: '25年深耕零售数字化，为超过80万门店提供智能收银、门店管理、供应链协同一站式解决方案',
    subtitleLineHeight: 40,
  },
  {
    id: 3,
    title: '中国零售与餐饮数字化平台',
    subtitle: 'Ai  智能 · SaaS云 · 连锁 · 全渠道 · 数据智能',
    subtitleLineHeight: 32,
  },
  {
    id: 4,
    title: 'Ai 驱动的零售餐饮增长引擎',
    subtitle: 'AI重塑零售底座，让每一笔交易都算数',
    subtitleLineHeight: 32,
  },
];

const Banner = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState(0);

  const { r, width: viewportWidth } = useResponsive();

  const startXRef = useRef<number>(0);
  const lastTimeRef = useRef<number>(0);
  const progressRef = useRef<number | null>(null);

  // 响应式尺寸
  const bannerHeight = r('420px', '460px', '540px', '600px', '660px');
  const bannerTopPadding = r('60px', '70px', '80px', '90px', '100px');
  const titleFontSize = r('24px', '30px', '36px', '44px', '48px');
  const titleLineHeight = r('30px', '38px', '46px', '54px', '58px');
  const subtitleFontSize = r('13px', '15px', '18px', '22px', '24px');
  const subtitleLineHeight = r('18px', '22px', '28px', '32px', `${slides[currentSlide]?.subtitleLineHeight || 32}px`);
  const buttonFontSize = r('13px', '14px', '16px', '18px', '20px');
  const buttonHeight = r('40px', '44px', '48px', '52px', '56px');
  const buttonPaddingH = r('16px', '20px', '24px', '28px', '30px');
  const cardInnerPadX = r('30px', '40px', '55px', '70px', '100px');
  const cardInnerPadT = r('50px', '60px', '75px', '95px', '109px');

  // 卡片宽度占视口的比例（让两边都能露出上一张/下一张卡片的边缘）
  const cardWidth = viewportWidth > 1440
    ? 1440
    : Math.max(280, viewportWidth - 40);
  const cardGap = Math.max(20, Math.min(40, Math.round(viewportWidth * 0.02)));

  const AUTO_PLAY_INTERVAL = 6000;

  const goToSlide = useCallback((index: number) => {
    let newIndex = index;
    if (newIndex >= slides.length) newIndex = slides.length - 1;
    if (newIndex < 0) newIndex = 0;
    setCurrentSlide(newIndex);
    setProgress(0);
  }, []);

  // 自动播放动画
  const animate = useCallback(
    (time: number) => {
      if (!isPlaying) return;
      if (lastTimeRef.current === 0) lastTimeRef.current = time;
      const delta = time - lastTimeRef.current;
      lastTimeRef.current = time;
      setProgress((prev) => {
        const newProgress = prev + delta / AUTO_PLAY_INTERVAL;
        if (newProgress >= 1) {
          setCurrentSlide((c) => {
            if (c >= slides.length - 1) return 0;
            return c + 1;
          });
          return 0;
        }
        return newProgress;
      });
      progressRef.current = requestAnimationFrame(animate);
    },
    [isPlaying]
  );

  useEffect(() => {
    if (isPlaying) {
      lastTimeRef.current = 0;
      progressRef.current = requestAnimationFrame(animate);
    } else if (progressRef.current) {
      cancelAnimationFrame(progressRef.current);
    }
    return () => {
      if (progressRef.current) cancelAnimationFrame(progressRef.current);
    };
  }, [isPlaying, animate]);

  // 拖拽开始（不暂停播放）
  const onDragStart = (clientX: number) => {
    setIsDragging(true);
    startXRef.current = clientX;
  };

  // 拖拽中（边界阻尼）
  const onDragMove = useCallback(
    (clientX: number) => {
      if (!isDragging) return;
      let diff = clientX - startXRef.current;
      if (
        (currentSlide === 0 && diff > 0) ||
        (currentSlide === slides.length - 1 && diff < 0)
      ) {
        diff = diff * 0.3;
      }
      setDragOffset(diff);
    },
    [isDragging, currentSlide]
  );

  // 拖拽结束
  const onDragEnd = useCallback(() => {
    if (!isDragging) return;
    const threshold = 80;
    const atStartEdge = currentSlide === 0 && dragOffset > 0;
    const atEndEdge = currentSlide === slides.length - 1 && dragOffset < 0;

    if (!atStartEdge && !atEndEdge) {
      if (dragOffset > threshold) {
        goToSlide(currentSlide - 1);
      } else if (dragOffset < -threshold) {
        goToSlide(currentSlide + 1);
      }
    }
    setIsDragging(false);
    setDragOffset(0);
  }, [isDragging, dragOffset, currentSlide, goToSlide]);

  const translateX =
    -currentSlide * (cardWidth + cardGap) +
    (viewportWidth - cardWidth) / 2 +
    dragOffset;

  const radius = 18;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference * (1 - progress);

  return (
    <section
      style={{
        width: '100%',
        height: bannerHeight,
        backgroundImage: 'linear-gradient(180deg, #d9e8ff 0%, #d9e8ff4d 100%)',
        overflow: 'hidden',
        userSelect: 'none',
        boxSizing: 'border-box',
      }}
    >
      {/* 横向轨道 —— 全宽，包含所有卡片 */}
      <div
        style={{
          width: '100%',
          height: `calc(${bannerHeight} - 120px)`,
          overflow: 'hidden',
          cursor: isDragging ? 'grabbing' : 'grab',
          position: 'relative',
        }}
        onMouseDown={(e) => onDragStart(e.clientX)}
        onMouseMove={(e) => onDragMove(e.clientX)}
        onMouseUp={onDragEnd}
        onMouseLeave={onDragEnd}
        onTouchStart={(e) => onDragStart(e.touches[0].clientX)}
        onTouchMove={(e) => onDragMove(e.touches[0].clientX)}
        onTouchEnd={onDragEnd}
      >
        <div
          style={{
            display: 'flex',
            height: '100%',
            alignItems: 'center',
            paddingTop: bannerTopPadding,
            transform: `translateX(${translateX}px)`,
            transition: isDragging ? 'none' : 'transform 500ms ease-out',
            willChange: 'transform',
          }}
        >
          {slides.map((slide, i) => (
            <div
              key={slide.id}
              style={{
                flexShrink: 0,
                width: `${cardWidth}px`,
                height: '100%',
                marginLeft: i === 0 ? 0 : `${cardGap}px`,
              }}
            >
              {/* 卡片式 banner 背景 */}
              <div
                style={{
                  width: '100%',
                  height: `calc(${bannerHeight} - 200px)`,
                  borderRadius: '16px',
                  backgroundColor: '#d9d9d9',
                  padding: `${cardInnerPadT}px ${cardInnerPadX}px`,
                  boxSizing: 'border-box',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                }}
              >
                <h2
                  style={{
                    fontFamily: '"Noto Sans SC", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", SimHei, Arial, Helvetica, sans-serif',
                    fontSize: titleFontSize,
                    fontWeight: 700,
                    lineHeight: titleLineHeight,
                    color: '#1d2233',
                    margin: 0,
                    padding: '10px 0',
                  }}
                >
                  {slide.title}
                </h2>
                <p
                  style={{
                    fontFamily: '"Noto Sans SC", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", SimHei, Arial, Helvetica, sans-serif',
                    fontSize: subtitleFontSize,
                    color: '#1d2233',
                    lineHeight: subtitleLineHeight,
                    margin: '20px 0 0 0',
                    maxWidth: '70%',
                  }}
                >
                  {slide.subtitle}
                </p>
                <div style={{ display: 'flex', gap: '20px', marginTop: '30px', flexWrap: 'wrap' }}>
                  <button
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderRadius: '8px',
                      backgroundColor: '#0d99ff',
                      padding: `0 ${buttonPaddingH}px`,
                      height: buttonHeight,
                      cursor: 'pointer',
                      border: 'none',
                      fontSize: buttonFontSize,
                      color: '#ffffff',
                      fontFamily: '"Noto Sans SC", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", SimHei, Arial, Helvetica, sans-serif',
                      flexShrink: 0,
                    }}
                  >
                    了解产品
                  </button>
                  <button
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      border: '1px solid #0d99ff',
                      borderRadius: '8px',
                      backgroundColor: '#ffffff',
                      padding: `0 ${buttonPaddingH}px`,
                      height: buttonHeight,
                      cursor: 'pointer',
                      fontSize: buttonFontSize,
                      color: '#0d99ff',
                      fontFamily: '"Noto Sans SC", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", SimHei, Arial, Helvetica, sans-serif',
                      flexShrink: 0,
                    }}
                  >
                    免费试用
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 控制器 */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingLeft: `calc((100% - ${cardWidth}px) / 2)`,
          paddingRight: `calc((100% - ${cardWidth}px) / 2)`,
          marginTop: '20px',
          boxSizing: 'border-box',
        }}
      >
        {/* 指示点 */}
        <div style={{ display: 'flex', alignItems: 'center', gap: r('10px', '12px', '14px', '18px', '20px') }}>
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              style={{
                cursor: 'pointer',
                border: 'none',
                padding: 0,
                background: 'transparent',
                width: index === currentSlide ? r('30px', '40px', '50px', '55px', '60px') : r('12px', '15px', '18px', '22px', '30px'),
                height: r('4px', '5px', '5px', '6px', '6px'),
                borderRadius: '3px',
                backgroundColor: '#1d2233',
                opacity: index === currentSlide ? 1 : 0.4,
                transition: 'all 300ms ease',
                flexShrink: 0,
              }}
            />
          ))}
        </div>

        {/* 播放/暂停按钮 */}
        <button
          onClick={() => setIsPlaying(!isPlaying)}
          style={{
            position: 'relative',
            width: r('32px', '36px', '38px', '40px', '40px'),
            height: r('32px', '36px', '38px', '40px', '40px'),
            cursor: 'pointer',
            border: 'none',
            background: 'transparent',
            padding: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}
        >
          <svg
            width={r('32px', '36px', '38px', '40px', '40px')}
            height={r('32px', '36px', '38px', '40px', '40px')}
            viewBox="0 0 40 40"
            style={{ position: 'absolute', top: 0, left: 0 }}
          >
            <circle
              cx="20"
              cy="20"
              r={radius}
              fill="none"
              stroke="#1d2233"
              strokeWidth="2"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              transform="rotate(-90 20 20)"
            />
          </svg>
          <img
            src={
              isPlaying
                ? './image/mpqi1duh-zhjqux1.svg'
                : './image/mpqi0wxa-tzglpah.svg'
            }
            alt={isPlaying ? '暂停' : '播放'}
            style={{ width: isPlaying ? '12px' : '10px', height: '12px' }}
          />
        </button>
      </div>
    </section>
  );
};

export default Banner;
