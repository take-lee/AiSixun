import { useState, useEffect, useRef, useCallback } from 'react';

// 说明：每张 banner 的灰色背景 (#d9d9d9) 为图片占位，
// 后期可把背景色替换为实际图片 (backgroundImage / <img>) 即可。

// 设计稿尺寸
const CARD_WIDTH = 1440; // 每张 banner 卡片的宽度
const CARD_GAP = 31; // 卡片之间的间距（平均）
const VIEWPORT_WIDTH = 1920; // 设计稿视口宽度
const BANNER_HEIGHT = 660; // Banner 区域总高度
const AUTO_PLAY_INTERVAL = 6000; // 自动轮播间隔

type Slide = {
  id: number;
  variant: 'center' | 'left'; // center = 第一张居中样式；left = 其他左对齐样式
  title?: string;
  subtitle?: string;
  lines?: { text: string; weight?: 400 | 700; size?: number; color?: string }[];
  stockCode?: string;
  showButtons?: boolean;
};

const slides: Slide[] = [
  {
    id: 1,
    variant: 'center',
    title: '思迅软件(股票代码：838758）',
    subtitle:
      '作为国内上市的软件企业，服务了 60 万+ 零售和餐饮门店',
    stockCode: '股票代码：828758',
    showButtons: false,
  },
  {
    id: 2,
    variant: 'left',
    title: '数字零售 · 智启未来',
    subtitle:
      '25年深耕零售数字化，为超过80万门店提供智能收银、门店管理、供应链协同一站式解决方案',
    showButtons: true,
  },
  {
    id: 3,
    variant: 'left',
    title: '中国零售与餐饮数字化平台',
    subtitle: 'Ai  智能 · SaaS云 · 连锁 · 全渠道 · 数据智能',
    showButtons: true,
  },
  {
    id: 4,
    variant: 'left',
    title: 'Ai 驱动的零售餐饮增长引擎',
    subtitle: 'AI重塑零售底座，让每一笔交易都算数',
    showButtons: true,
  },
];

const Banner = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState(0);
  const [viewportWidth, setViewportWidth] = useState(VIEWPORT_WIDTH);

  const startXRef = useRef<number>(0);
  const lastTimeRef = useRef<number>(0);
  const progressRef = useRef<number | null>(null);

  useEffect(() => {
    const updateWidth = () => setViewportWidth(window.innerWidth);
    updateWidth();
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  }, []);

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

  const onDragStart = (clientX: number) => {
    setIsDragging(true);
    startXRef.current = clientX;
  };

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
    -currentSlide * (CARD_WIDTH + CARD_GAP) +
    (viewportWidth - CARD_WIDTH) / 2 +
    dragOffset;

  const radius = 18;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference * (1 - progress);

  const commonFontStack =
    '"Noto Sans SC", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", SimHei, Arial, Helvetica, sans-serif';

  return (
    <section
      style={{
        width: '100%',
        height: `${BANNER_HEIGHT}px`,
        backgroundImage:
          'linear-gradient(180deg, #d9e8ff 0%, #d9e8ff4d 100%)',
        overflow: 'hidden',
        userSelect: 'none',
        boxSizing: 'border-box',
      }}
    >
      <div
        style={{
          width: '100%',
          height: `${BANNER_HEIGHT - 120}px`,
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
            paddingTop: '60px',
            transform: `translateX(${translateX}px)`,
            transition: isDragging ? 'none' : 'transform 500ms ease-out',
            willChange: 'transform',
          }}
        >
          {slides.map((slide, i) => {
            const isCenter = slide.variant === 'center';

            return (
              <div
                key={slide.id}
                style={{
                  flexShrink: 0,
                  width: `${CARD_WIDTH}px`,
                  height: '100%',
                  marginLeft: i === 0 ? 0 : `${i === 1 ? 31 : i === 2 ? 27 : 34}px`,
                }}
              >
                {/* 卡片式 banner 背景 */}
                <div
                  style={{
                    width: '100%',
                    height: isCenter ? '460px' : `${BANNER_HEIGHT - 200}px`,
                    borderRadius: '16px',
                    backgroundColor: '#d9d9d9',
                    backgroundImage: isCenter
                      ? 'url(/image/banner/mq931w93-g5s5tth.png)'
                      : undefined,
                    backgroundPosition: 'center',
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                    padding: isCenter
                      ? '108px 300px'
                      : slide.id === 2
                      ? '109px 745px 109px 100px'
                      : '135px 745px 135px 100px',
                    boxSizing: 'border-box',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: isCenter ? 'center' : 'flex-start',
                  }}
                >
                  {/* —— 居中版（第一张）：banner-Default —— */}
                  {isCenter && (
                    <>
                      <div
                        style={{
                          display: 'inline-flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          alignSelf: 'stretch',
                          rowGap: '10px',
                        }}
                      >
                        <h2
                          style={{
                            fontFamily: commonFontStack,
                            fontSize: '56px',
                            fontWeight: 700,
                            lineHeight: '67px',
                            color: '#1d2233',
                            margin: 0,
                            textAlign: 'center',
                            whiteSpace: 'nowrap',
                          }}
                        >
                          思迅软件
                        </h2>
                        <p
                          style={{
                            fontFamily: commonFontStack,
                            fontSize: '24px',
                            lineHeight: '29px',
                            color: '#1d2233',
                            margin: 0,
                            whiteSpace: 'nowrap',
                          }}
                        >
                          股票代码：838758
                        </p>
                      </div>

                      <p
                        style={{
                          margin: '40px 0 0 0',
                          lineHeight: '43px',
                          letterSpacing: 0,
                          color: '#1d2233',
                          fontSize: 0,
                          textAlign: 'center',
                          whiteSpace: 'nowrap',
                        }}
                      >
                        <span
                          style={{
                            fontFamily: commonFontStack,
                            fontSize: '28px',
                            color: '#1d2233',
                          }}
                        >
                          国内
                        </span>
                        <span
                          style={{
                            fontFamily: commonFontStack,
                            fontSize: '36px',
                            fontWeight: 700,
                            color: '#1d2233',
                          }}
                        >
                          上市公司
                        </span>
                        <span
                          style={{
                            fontFamily: commonFontStack,
                            fontSize: '28px',
                            color: '#1d2233',
                          }}
                        >
                          ，服务&nbsp;
                        </span>
                        <span
                          style={{
                            fontFamily: commonFontStack,
                            fontSize: '36px',
                            fontWeight: 700,
                            color: '#1d2233',
                          }}
                        >
                          60万+
                        </span>
                        <span
                          style={{
                            fontFamily: commonFontStack,
                            fontSize: '28px',
                            fontWeight: 700,
                            color: '#1d2233',
                          }}
                        >
                          &nbsp;
                        </span>
                        <span
                          style={{
                            fontFamily: commonFontStack,
                            fontSize: '28px',
                            color: '#1d2233',
                          }}
                        >
                          零售餐饮门店数字化收银
                        </span>
                      </p>

                      <div
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          alignSelf: 'stretch',
                          columnGap: '30px',
                          marginTop: '40px',
                        }}
                      >
                        <button
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            columnGap: '10px',
                            borderRadius: '8px',
                            background: '#0d99ff',
                            padding: '14px 30px',
                            height: '56px',
                            cursor: 'pointer',
                            border: 'none',
                            fontSize: '20px',
                            color: '#ffffff',
                            fontFamily: commonFontStack,
                            whiteSpace: 'nowrap',
                            flexShrink: 0,
                          }}
                        >
                          免费试用
                        </button>
                        <button
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            columnGap: '10px',
                            border: '1px solid #0d99ff',
                            borderRadius: '8px',
                            background: '#ffffff',
                            padding: '13px 29px',
                            height: '56px',
                            cursor: 'pointer',
                            fontSize: '20px',
                            color: '#0d99ff',
                            fontFamily: commonFontStack,
                            whiteSpace: 'nowrap',
                            flexShrink: 0,
                          }}
                        >
                          预约演示
                        </button>
                      </div>
                    </>
                  )}

                  {/* —— 左对齐版（第 2/3/4 张） —— */}
                  {!isCenter && (
                    <>
                      <h2
                        style={{
                          fontFamily: commonFontStack,
                          fontSize: '48px',
                          fontWeight: 700,
                          lineHeight: '58px',
                          color: '#1d2233',
                          margin: 0,
                          padding: '10px 0',
                        }}
                      >
                        {slide.title}
                      </h2>
                      <p
                        style={{
                          fontFamily: commonFontStack,
                          fontSize: '24px',
                          color: '#1d2233',
                          lineHeight: '40px',
                          margin: '20px 0 0 0',
                        }}
                      >
                        {slide.subtitle}
                      </p>
                      {slide.showButtons && (
                        <div
                          style={{
                            display: 'flex',
                            gap: '30px',
                            marginTop: '40px',
                          }}
                        >
                          <button
                            style={{
                              display: 'inline-flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              borderRadius: '8px',
                              backgroundColor: '#0d99ff',
                              padding: '14px 30px',
                              height: '56px',
                              cursor: 'pointer',
                              border: 'none',
                              fontSize: '20px',
                              color: '#ffffff',
                              fontFamily: commonFontStack,
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
                              padding: '13px 29px',
                              height: '56px',
                              cursor: 'pointer',
                              fontSize: '20px',
                              color: '#0d99ff',
                              fontFamily: commonFontStack,
                            }}
                          >
                            免费试用
                          </button>
                        </div>
                      )}
                    </>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 控制器 */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingRight: '240px',
          paddingLeft: '855px',
          marginTop: '20px',
        }}
      >
        {/* 指示点 */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              style={{
                cursor: 'pointer',
                border: 'none',
                padding: 0,
                background: 'transparent',
                width: index === currentSlide ? '60px' : '30px',
                height: '6px',
                borderRadius: '3px',
                backgroundColor: '#1d2233',
                opacity: index === currentSlide ? 1 : 0.4,
                transition: 'all 300ms ease',
              }}
            />
          ))}
        </div>

        {/* 播放/暂停按钮 */}
        <button
          onClick={() => setIsPlaying(!isPlaying)}
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
            src={
              isPlaying
                ? '/image/banner/icon-pause.svg'
                : '/image/banner/icon-play.svg'
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
