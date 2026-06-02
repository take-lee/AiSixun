import { useState, useEffect, useRef, useCallback } from 'react';

interface BannerSlide {
  id: number;
  title: string;
  subtitle: string;
  padding?: {
    top: number;
    right: number;
    bottom: number;
    left: number;
  };
  subtitleLineHeight?: number;
  subtitleWidth?: number;
}

const Banner = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [translateX, setTranslateX] = useState(0);
  const [progress, setProgress] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number>(0);

  const slides: BannerSlide[] = [
    {
      id: 1,
      title: 'Ai 驱动零售数智化',
      subtitle: 'Ai 数据洞察 · Ai 经营助手 · Ai 会员分析· Ai 营销引擎',
      padding: { top: 133, right: 745, bottom: 133, left: 100 },
      subtitleLineHeight: 32,
    },
    {
      id: 2,
      title: '数字零售 · 智启未来',
      subtitle: '25年深耕零售数字化，为超过80万门店提供智能收银、门店管理、供应链协同一站式解决方案',
      padding: { top: 109, right: 745, bottom: 109, left: 100 },
      subtitleLineHeight: 40,
      subtitleWidth: 595,
    },
    {
      id: 3,
      title: '中国零售与餐饮数字化平台',
      subtitle: 'Ai  智能· SaaS云 · 连锁 · 全渠道 · 数据智能',
      padding: { top: 135, right: 745, bottom: 135, left: 100 },
    },
    {
      id: 4,
      title: 'Ai 驱动的零售餐饮增长引擎',
      subtitle: 'AI重塑零售底座，让每一笔交易都算数',
      padding: { top: 135, right: 745, bottom: 135, left: 100 },
    },
  ];

  const slideWidth = 1440;
  const slideGap = 31;

  const goToSlide = useCallback((index: number) => {
    let newIndex = index;
    if (newIndex >= slides.length) {
      newIndex = 0;
    } else if (newIndex < 0) {
      newIndex = slides.length - 1;
    }
    setCurrentSlide(newIndex);
    setTranslateX(0);
    setProgress(0);
  }, [slides.length]);

  const animate = useCallback((time: number) => {
    if (!isPlaying) return;
    
    if (lastTimeRef.current === 0) {
      lastTimeRef.current = time;
    }
    
    const delta = time - lastTimeRef.current;
    lastTimeRef.current = time;
    
    setProgress(prev => {
      const newProgress = prev + (delta / 6000);
      
      if (newProgress >= 1) {
        goToSlide(currentSlide + 1);
        return 0;
      }
      
      return newProgress;
    });
    
    progressRef.current = requestAnimationFrame(animate);
  }, [isPlaying, currentSlide, goToSlide]);

  useEffect(() => {
    if (isPlaying) {
      lastTimeRef.current = 0;
      progressRef.current = requestAnimationFrame(animate);
    } else {
      if (progressRef.current) {
        cancelAnimationFrame(progressRef.current);
      }
    }
    
    return () => {
      if (progressRef.current) {
        cancelAnimationFrame(progressRef.current);
      }
    };
  }, [isPlaying, animate]);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.clientX);
  };

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isDragging) return;
    
    const diff = e.clientX - startX;
    
    // 边界限制：第一张时向右拖拽有阻力，最后一张时向左拖拽有阻力
    let adjustedDiff = diff;
    if (currentSlide === 0 && diff > 0) {
      adjustedDiff = diff * 0.3; // 向右拖拽阻力
    } else if (currentSlide === slides.length - 1 && diff < 0) {
      adjustedDiff = diff * 0.3; // 向左拖拽阻力
    }
    
    setTranslateX(adjustedDiff);
  }, [isDragging, startX, currentSlide, slides.length]);

  const handleMouseUp = useCallback(() => {
    if (!isDragging) return;
    setIsDragging(false);
    
    const threshold = 80;
    let shouldSlide = false;
    let targetSlide = currentSlide;
    
    if (translateX < -threshold && currentSlide < slides.length - 1) {
      targetSlide = currentSlide + 1;
      shouldSlide = true;
    } else if (translateX > threshold && currentSlide > 0) {
      targetSlide = currentSlide - 1;
      shouldSlide = true;
    }
    
    if (shouldSlide) {
      goToSlide(targetSlide);
    } else {
      setTranslateX(0);
    }
  }, [isDragging, translateX, currentSlide, slides.length, goToSlide]);

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    setStartX(e.touches[0].clientX);
  };

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (!isDragging) return;
    
    const diff = e.touches[0].clientX - startX;
    
    // 边界限制：第一张时向右拖拽有阻力，最后一张时向左拖拽有阻力
    let adjustedDiff = diff;
    if (currentSlide === 0 && diff > 0) {
      adjustedDiff = diff * 0.3; // 向右拖拽阻力
    } else if (currentSlide === slides.length - 1 && diff < 0) {
      adjustedDiff = diff * 0.3; // 向左拖拽阻力
    }
    
    setTranslateX(adjustedDiff);
  }, [isDragging, startX, currentSlide, slides.length]);

  const handleTouchEnd = useCallback(() => {
    if (!isDragging) return;
    setIsDragging(false);
    
    const threshold = 50;
    let shouldSlide = false;
    let targetSlide = currentSlide;
    
    if (translateX < -threshold && currentSlide < slides.length - 1) {
      targetSlide = currentSlide + 1;
      shouldSlide = true;
    } else if (translateX > threshold && currentSlide > 0) {
      targetSlide = currentSlide - 1;
      shouldSlide = true;
    }
    
    if (shouldSlide) {
      goToSlide(targetSlide);
    } else {
      setTranslateX(0);
    }
  }, [isDragging, translateX, currentSlide, slides.length, goToSlide]);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const radius = 18;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference * (1 - progress);

  return (
    <div 
      className="w-full"
      style={{
        height: '700px',
        backgroundImage: 'linear-gradient(180deg, #d9e8ff 0%, #d9e8ff66 100%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        padding: '70px 0 70px 240px',
        overflow: 'hidden',
      }}
    >
      <div 
        ref={containerRef}
        className="w-full"
        style={{
          display: 'flex',
          alignItems: 'center',
          marginRight: '-4172px',
        }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div 
          className="flex"
          style={{
            transform: `translateX(calc(-${currentSlide * (slideWidth + slideGap)}px + ${translateX}px))`,
            transition: isDragging ? 'none' : 'transform 500ms ease-out',
          }}
        >
          {slides.map((slide, index) => (
            <div 
              key={slide.id}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                marginLeft: index === 0 ? '0px' : (index === 1 ? '31px' : (index === 2 ? '27px' : '34px')),
                borderRadius: '16px',
                backgroundColor: '#d9d9d9',
                padding: slide.padding ? `${slide.padding.top}px ${slide.padding.right}px ${slide.padding.bottom}px ${slide.padding.left}px` : '133px 745px 133px 100px',
                flexShrink: 0,
                width: `${slideWidth}px`,
                cursor: 'grab',
              }}
            >
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                alignSelf: 'stretch',
                paddingTop: '4px',
                paddingBottom: '4px',
                gap: '20px',
              }}>
                <h2 style={{
                  fontFamily: '"Noto Sans SC", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", SimHei, Arial, Helvetica, sans-serif',
                  fontSize: '48px',
                  fontWeight: 700,
                  lineHeight: '58px',
                  color: '#1d2233',
                  padding: '10px 0',
                  overflow: 'hidden',
                }}>
                  {slide.title}
                </h2>
                <p style={{
                  fontFamily: '"Noto Sans SC", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", SimHei, Arial, Helvetica, sans-serif',
                  fontSize: '24px',
                  color: '#1d2233',
                  lineHeight: slide.subtitleLineHeight ? `${slide.subtitleLineHeight}px` : '32px',
                  width: slide.subtitleWidth ? `${slide.subtitleWidth}px` : undefined,
                }}>
                  {slide.subtitle}
                </p>
              </div>
              
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                alignSelf: 'stretch',
                gap: '30px',
                marginTop: '40px',
                marginRight: '285px',
              }}>
                <button style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '10px',
                  borderRadius: '8px',
                  backgroundColor: '#0d99ff',
                  padding: '14px 30px',
                  height: '56px',
                  cursor: 'pointer',
                  border: 'none',
                }}>
                  <span style={{
                    fontFamily: '"Noto Sans SC", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", SimHei, Arial, Helvetica, sans-serif',
                    fontSize: '20px',
                    lineHeight: '24px',
                    color: '#ffffff',
                  }}>
                    了解产品
                  </span>
                </button>
                <button style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '10px',
                  border: '1px solid #0d99ff',
                  borderRadius: '8px',
                  backgroundColor: '#ffffff',
                  padding: '13px 29px',
                  height: '56px',
                  cursor: 'pointer',
                }}>
                  <span style={{
                    fontFamily: '"Noto Sans SC", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", SimHei, Arial, Helvetica, sans-serif',
                    fontSize: '20px',
                    lineHeight: '24px',
                    color: '#0d99ff',
                  }}>
                    免费试用
                  </span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div style={{
        display: 'flex',
        alignItems: 'center',
        alignSelf: 'stretch',
        justifyContent: 'space-between',
        marginTop: '20px',
        paddingRight: '300px',
        paddingLeft: '615px',
      }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '20px' }}>
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                goToSlide(index);
              }}
              style={{
                cursor: 'pointer',
                border: 'none',
                padding: 0,
                background: 'transparent',
              }}
            >
              <div style={{
                borderRadius: '3px',
                backgroundColor: '#1d2233',
                opacity: index === currentSlide ? 1 : 0.4,
                width: index === currentSlide ? '60px' : '30px',
                height: '6px',
                transition: 'all 300ms ease',
              }} />
            </button>
          ))}
        </div>

        <button
          onClick={togglePlay}
          style={{
            position: 'relative',
            width: '40px',
            height: '40px',
            cursor: 'pointer',
            border: 'none',
            background: 'transparent',
            padding: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <svg 
            width="40" 
            height="40" 
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
            src={isPlaying ? "../.figma/image/mpqi1duh-zhjqux1.svg" : "../.figma/image/mpqi0wxa-tzglpah.svg"}
            alt={isPlaying ? "暂停" : "播放"}
            style={{ 
              position: 'relative',
              width: isPlaying ? '12px' : '10px',
              height: '12px',
            }}
          />
        </button>
      </div>
    </div>
  );
};

export default Banner;
