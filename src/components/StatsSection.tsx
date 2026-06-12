import { useEffect, useRef, useState } from 'react';

// =============================
// StatsSection —— 数据统计展示组件
// 对应 Figma 534_2929
// 数字计数动画：滚动进入视口或页面刷新时触发一次
// =============================

const FONT_FAMILY =
  '"Noto Sans SC", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", SimHei, Arial, Helvetica, sans-serif';

// 数字 + 中文单位/后缀 拆分
type StatItem = {
  /** 目标数字（动画会从 0 递增到此值） */
  target: number;
  /** 数字后面的文字（如 "年+"、"万+"、"+"）*/
  suffix: string;
  label: string;
};

const stats: StatItem[] = [
  { target: 26, suffix: '年+', label: '行业深耕' },
  { target: 60, suffix: '万+', label: '服务门店数量' },
  { target: 300, suffix: '+', label: '城市覆盖' },
  { target: 2000, suffix: '+', label: '合作伙伴' },
];

// =============================
// 单个数字计数器
// =============================
type CounterProps = {
  target: number;
  suffix: string;
  duration?: number;
  /** 是否已经开始动画 */
  start: boolean;
};

const Counter = ({ target, suffix, duration = 1800, start }: CounterProps) => {
  const [value, setValue] = useState(0);
  const rafRef = useRef<number | null>(null);
  const startTimeRef = useRef<number | null>(null);

  useEffect(() => {
    if (!start) return;

    // 使用 requestAnimationFrame 实现缓动递增
    const tick = (now: number) => {
      if (startTimeRef.current === null) {
        startTimeRef.current = now;
      }
      const progress = Math.min((now - startTimeRef.current) / duration, 1);
      // easeOutQuart：开头快，结尾慢
      const eased = 1 - Math.pow(1 - progress, 4);
      setValue(Math.floor(eased * target));

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        // 确保最终值精确等于 target
        setValue(target);
      }
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
      startTimeRef.current = null;
    };
  }, [target, duration, start]);

  return (
    <span>
      {value}
      {suffix}
    </span>
  );
};

// =============================
// 主组件
// =============================
const StatsSection = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [hasStarted, setHasStarted] = useState(false);
  const triggeredRef = useRef(false);

  // 观察组件是否进入视口，进入时触发动画一次
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    // IntersectionObserver：监听组件是否滚动到视口
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !triggeredRef.current) {
            triggeredRef.current = true;
            setHasStarted(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.4 }
    );

    observer.observe(el);

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        maxWidth: 1920,
        margin: '0 auto',
        background: '#FFFFFF',
        padding: '0 240px',
        boxSizing: 'border-box',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          width: 1440,
          height: 192,
          overflow: 'hidden',
        }}
      >
        {stats.map((stat, index) => (
          <div
            key={index}
            style={{
              display: 'flex',
              flexDirection: 'column',
              flexShrink: 0,
              alignItems: 'center',
              padding: '40px 110px',
              rowGap: 30,
              width: index === 3 ? 360 : undefined,
            }}
          >
            <p
              style={{
                flexShrink: 0,
                lineHeight: '58px',
                letterSpacing: 0,
                color: '#000000',
                fontFamily: FONT_FAMILY,
                fontSize: 48,
                fontWeight: 700,
                textAlign: 'center',
                alignSelf: index === 1 || index === 2 ? 'stretch' : undefined,
                margin: 0,
              }}
            >
              <Counter target={stat.target} suffix={stat.suffix} start={hasStarted} />
            </p>
            <p
              style={{
                flexShrink: 0,
                alignSelf: 'stretch',
                textAlign: 'center',
                letterSpacing: 0,
                color: '#000000',
                fontFamily: FONT_FAMILY,
                fontSize: 20,
                margin: 0,
              }}
            >
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default StatsSection;
