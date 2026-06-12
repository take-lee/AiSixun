import { useState, useEffect, useRef, useMemo } from 'react';

// ============================================================
// Spring 物理动画 —— 单个数值弹性缓动
// stiffness: 弹簧刚度（越大越"硬"，回弹越快）
// damping  : 阻尼系数（越大越"稳"，少振荡）
// mass     : 质量（越大越"沉"，惯性越强）
// ============================================================
const useSpringNumber = (
  target: number,
  config: { stiffness?: number; damping?: number; mass?: number } = {},
): number => {
  const stiffness = config.stiffness ?? 180;
  const damping = config.damping ?? 22;
  const mass = config.mass ?? 1;

  const [value, setValue] = useState(target);
  const ref = useRef({
    current: target,
    velocity: 0,
    lastTime: null as number | null,
    raf: null as number | null,
    target,
  });

  useEffect(() => {
    ref.current.target = target;

    if (ref.current.raf !== null) return; // 已有循环在跑

    ref.current.lastTime = null;
    const step = (time: number) => {
      if (ref.current.lastTime === null) ref.current.lastTime = time;
      const dt = Math.min((time - ref.current.lastTime) / 1000, 0.064);
      ref.current.lastTime = time;

      const displacement = ref.current.current - ref.current.target;
      const springForce = -stiffness * displacement;
      const dampingForce = -damping * ref.current.velocity;
      const acceleration = (springForce + dampingForce) / mass;

      ref.current.velocity += acceleration * dt;
      ref.current.current += ref.current.velocity * dt;

      if (Math.abs(displacement) < 0.1 && Math.abs(ref.current.velocity) < 0.1) {
        ref.current.current = ref.current.target;
        ref.current.velocity = 0;
        setValue(ref.current.target);
        ref.current.raf = null;
        return;
      }

      setValue(ref.current.current);
      ref.current.raf = requestAnimationFrame(step);
    };
    ref.current.raf = requestAnimationFrame(step);

    return () => {
      if (ref.current.raf !== null) {
        cancelAnimationFrame(ref.current.raf);
        ref.current.raf = null;
      }
    };
  }, [target, stiffness, damping, mass]);

  return value;
};

// ============================================================
// Spring 物理动画 —— 批量数值弹性缓动（共享一次 rAF，性能更好）
// ============================================================
const useSprings = (
  targets: number[],
  config: { stiffness?: number; damping?: number; mass?: number } = {},
): number[] => {
  const stiffness = config.stiffness ?? 200;
  const damping = config.damping ?? 24;
  const mass = config.mass ?? 1;

  const [values, setValues] = useState<number[]>(targets.slice());
  const ref = useRef({
    currents: targets.slice(),
    velocities: targets.map(() => 0),
    lastTime: null as number | null,
    raf: null as number | null,
    targets: targets.slice(),
  });

  useEffect(() => {
    ref.current.targets = targets.slice();

    // 已经在动画循环中 → 不需要重启，只更新 target 让循环自然响应
    if (ref.current.raf !== null) return;

    ref.current.lastTime = null;
    const step = (time: number) => {
      if (ref.current.lastTime === null) ref.current.lastTime = time;
      const dt = Math.min((time - ref.current.lastTime) / 1000, 0.064);
      ref.current.lastTime = time;

      let converged = true;
      for (let i = 0; i < ref.current.targets.length; i++) {
        const displacement = ref.current.currents[i] - ref.current.targets[i];
        const springForce = -stiffness * displacement;
        const dampingForce = -damping * ref.current.velocities[i];
        const acceleration = (springForce + dampingForce) / mass;

        ref.current.velocities[i] += acceleration * dt;
        ref.current.currents[i] += ref.current.velocities[i] * dt;

        if (Math.abs(displacement) > 0.1 || Math.abs(ref.current.velocities[i]) > 0.1) {
          converged = false;
        } else {
          ref.current.currents[i] = ref.current.targets[i];
          ref.current.velocities[i] = 0;
        }
      }

      setValues([...ref.current.currents]);

      if (!converged) {
        ref.current.raf = requestAnimationFrame(step);
      } else {
        ref.current.raf = null;
      }
    };
    ref.current.raf = requestAnimationFrame(step);

    return () => {
      if (ref.current.raf !== null) {
        cancelAnimationFrame(ref.current.raf);
        ref.current.raf = null;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [targets]);

  return values;
};

// ============ 常量（完全对齐 Figma，与Banner保持一致的240px左右边距） ============
const ENLARGED_W = 520;
const DEFAULT_W = 300;
const CARD_H = 540;
const GAP = 30;
const VIEWPORT_W = 1920;
const BANNER_CARD_W = 1440;
const SIDE_MARGIN = (VIEWPORT_W - BANNER_CARD_W) / 2; // = 240px，与Banner左右边距一致

const cards = [
  { number: '01', title: '全场景适配', titleExt: '', subtitle: '思迅拥有私有化、SaaS云、小微版三层产品体系', desc: '大型连锁总部、中型门店，街边小店，都能匹配对应的版本，适配性强、落地快' },
  { number: '02', title: '深耕行业', titleExt: '', subtitle: '26 年专注零售餐饮数字化，50+ 细分业态解决方案', desc: '大型连锁总部、中型门店，街边小店，都能匹配对应的版本，适配性强、落地快' },
  { number: '03', title: 'Ai 驱动', titleExt: '', subtitle: '私有化 DeepSeek 大模型 + 思迅 Ai 助手', desc: '大型连锁总部、中型门店，街边小店，都能匹配对应的版本，适配性强、落地快' },
  { number: '04', title: '全渠道 O2O', titleExt: '', subtitle: '线上线下一体化，门店数据全域互通', desc: '大型连锁总部、中型门店，街边小店，都能匹配对应的版本，适配性强、落地快' },
  { number: '05', title: '售后保障', titleExt: '', subtitle: '思迅维修服务平台 + 全链路售后体系', desc: '大型连锁总部、中型门店，街边小店，都能匹配对应的版本，适配性强、落地快' },
];

const NUM_FONT = 'Roboto, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", SimHei, Arial, Helvetica, sans-serif';
const TXT_FONT = '"Noto Sans SC", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", SimHei, Arial, Helvetica, sans-serif';

const FeaturesSection = () => {
  // ===== 点击交互：点击哪张卡片，哪张放大 =====
  const [activeIndex, setActiveIndex] = useState<number>(0);

  // ===== 目标宽度数组（activeIndex 变化时才重新计算） =====
  const targetWidths = useMemo<number[]>(
    () => cards.map((_, i) => (i === activeIndex ? ENLARGED_W : DEFAULT_W)),
    [activeIndex],
  );

  // ===== 基于最终 targetWidths 计算 finalTranslateX（也是 activeIndex 变化时才重算）
  // 让活动卡片的左侧在视口中从 SIDE_MARGIN 线性位移到 VIEWPORT_W-SIDE_MARGIN-ENLARGED_W
  // 即 i=0 时 left=240，i=4 时 right=1680，与Banner的240px左右边距保持一致 =====
  const finalTranslateX = useMemo<number>(() => {
    // 活动卡片在卡片行中的left（前i张都是默认态宽度）
    const activeCardLeftInRow = activeIndex * DEFAULT_W + activeIndex * GAP;

    // 活动卡片在视口中的目标left：从SIDE_MARGIN线性过渡到VIEWPORT_W-SIDE_MARGIN-ENLARGED_W
    const minLeft = SIDE_MARGIN;
    const maxLeft = VIEWPORT_W - SIDE_MARGIN - ENLARGED_W;
    const targetCardLeft = minLeft + (maxLeft - minLeft) * (activeIndex / (cards.length - 1));

    // translateX = 目标视口left - 卡片行内left
    return targetCardLeft - activeCardLeftInRow;
  }, [targetWidths, activeIndex]);

  // ===== 对每张卡的 width 应用 spring 动画（共享一次 rAF） =====
  const animWidths = useSprings(targetWidths, { stiffness: 200, damping: 24, mass: 1 });

  // ===== 用动画化后的 width 计算每张卡的 left（累积计算，保证卡片不重叠） =====
  const animLefts: number[] = useMemo(() => {
    const result: number[] = [];
    let acc = 0;
    for (let i = 0; i < cards.length; i++) {
      result.push(acc);
      acc += animWidths[i] + GAP;
    }
    return result;
  }, [animWidths]);

  const trackWidth = animWidths.reduce((sum, w) => sum + w, 0) + GAP * (cards.length - 1);

  // ===== 轨道 translateX：spring 动画平滑过渡到最终位置 =====
  const animTranslateX = useSpringNumber(finalTranslateX, { stiffness: 150, damping: 20, mass: 1 });

  return (
    <section
      style={{
        width: '100%',
        maxWidth: '1920px',
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: '#ffffff',
        paddingTop: '100px',
        paddingBottom: '60px',
        boxSizing: 'border-box',
      }}
    >
      {/* ===== Title Text (534_4013) ===== */}
      <h2
        style={{
          width: '100%',
          height: '67px',
          textAlign: 'center',
          letterSpacing: 0,
          fontFamily: TXT_FONT,
          fontSize: '56px',
          fontWeight: 700,
          lineHeight: '67px',
          margin: 0,
          padding: 0,
          color: '#000000',
        }}
      >
        <span style={{ color: '#0068eb' }}>五大核心</span>
        <span style={{ color: '#1d2233' }}>能力</span>
      </h2>

      {/* ===== Mask Group / Details Container (534_4054 maskGroup: 1920×700, marginTop: 1px) ===== */}
      <div
        style={{
          width: '100%',
          maxWidth: '1920px',
          height: '700px',
          marginTop: '1px',
          overflow: 'hidden',
          position: 'relative',
          boxSizing: 'border-box',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            height: '100%',
            width: `${trackWidth}px`,
            transform: `translateX(${animTranslateX}px)`,
            willChange: 'transform',
          }}
        >
          {cards.map((card, i) => {
            const isActive = i === activeIndex;
            const w = animWidths[i];
            const left = animLefts[i];

            return (
              <div
                key={card.number}
                onClick={() => setActiveIndex(i)}
                style={{
                  position: 'absolute',
                  top: `${(700 - CARD_H) / 2}px`,
                  left: `${left}px`,
                  width: `${w}px`,
                  height: `${CARD_H}px`,
                  borderRadius: '16px',
                  backgroundColor: '#d9d9d9', /* 占位背景，后期替换设计图 */
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat',
                  boxShadow: isActive
                    ? '0px 8px 40px 0px rgba(0, 104, 235, 0.20)'
                    : '0px 4px 20px 0px rgba(0, 0, 0, 0.05)',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  willChange: 'width, left',
                }}
              >
                {/* 大号序号 - 镂空描边效果 */}
                <p
                  style={{
                    opacity: 0.4,
                    lineHeight: '141px',
                    letterSpacing: 0,
                    color: '#000000',
                    fontFamily: NUM_FONT,
                    fontSize: '120px',
                    fontWeight: 700,
                    WebkitTextStroke: '1px #ffffff',
                    WebkitTextFillColor: 'transparent',
                    margin: 0,
                    padding: 0,
                  }}
                >
                  {card.number}
                </p>

                {/* ===== 放大态：完整内容 ===== */}
                {isActive && (
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'flex-start',
                      alignSelf: 'stretch',
                      marginTop: '152px',
                      borderRadius: '16px',
                      padding: '30px',
                      rowGap: '20px',
                      backgroundImage: 'linear-gradient(180deg, rgba(255,255,255,0) 0%, #ffffff 100%)',
                      opacity: Math.min(1, Math.max(0, (w - DEFAULT_W) / (ENLARGED_W - DEFAULT_W) * 2)),
                    }}
                  >
                    <p
                      style={{
                        flexShrink: 0,
                        lineHeight: '38px',
                        letterSpacing: 0,
                        color: '#1d2233',
                        fontFamily: TXT_FONT,
                        fontSize: '32px',
                        fontWeight: 700,
                        margin: 0,
                      }}
                    >
                      {card.title}&nbsp;&nbsp;&nbsp;{card.titleExt}
                    </p>
                    <p
                      style={{
                        flexShrink: 0,
                        lineHeight: '24px',
                        letterSpacing: 0,
                        color: '#1d2233',
                        fontFamily: TXT_FONT,
                        fontSize: '20px',
                        margin: 0,
                        display: '-webkit-box',             // 必须：设置为弹性盒子
                        WebkitBoxOrient: 'vertical',        // 必须：垂直排列
                        WebkitLineClamp: 1,                 // 核心：限制显示2行
                        overflow: 'hidden',                 // 必须：隐藏溢出
                        textOverflow: 'ellipsis',           // 建议：显示省略号
                        wordBreak: 'break-all',  
                      }}
                    >
                      {card.subtitle}
                    </p>
                    <div
                      style={{
                        flexShrink: 0,
                        opacity: 0.4,
                        backgroundColor: '#1d2233',
                        width: '460px',
                        height: '1px',
                      }}
                    />
                    <p
                      style={{
                        display: '-webkit-box',             // 必须：设置为弹性盒子
                        WebkitBoxOrient: 'vertical',        // 必须：垂直排列
                        WebkitLineClamp: 2,                 // 核心：限制显示2行
                        overflow: 'hidden',                 // 必须：隐藏溢出
                        textOverflow: 'ellipsis',           // 建议：显示省略号
                          wordBreak: 'break-all',             // 建议：防止长单词/数字撑破布局
    
                          // 其他样式保持原样
                          flexShrink: 0,
                          alignSelf: 'stretch',
                          width: '460px',
                          lineHeight: '32px',
                          letterSpacing: 0,
                          color: '#1d2233',
                          fontFamily: TXT_FONT,
                          fontSize: '20px',
                          margin: 0,
                      }}
                    >
                      {card.desc}
                    </p>
                  </div>
                )}

                {/* ===== 默认态：精简内容 ===== */}
                {!isActive && (
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'flex-start',
                      alignSelf: 'stretch',
                      marginTop: '231px',
                      marginLeft: '30px',
                      rowGap: '20px',
                      opacity: 1,
                    }}
                  >
                    <p
                      style={{
                        flexShrink: 0,
                        lineHeight: '46px',
                        letterSpacing: 0,
                        color: '#1d2233',
                        fontFamily: TXT_FONT,
                        fontSize: '32px',
                        fontWeight: 700,
                        margin: 0,
                      }}
                    >
                      {card.title}
                      <br />
                      {card.titleExt}
                    </p>
                    <p
                      style={{
                        display: '-webkit-box',
                        flexShrink: 0,
                        alignSelf: 'stretch',
                        width: '240px',
                        overflow: 'hidden',
                        lineHeight: '36px',
                        letterSpacing: 0,
                        color: '#1d2233',
                        fontFamily: TXT_FONT,
                        fontSize: '20px',
                        margin: 0,
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                      }}
                    >
                      {card.subtitle}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
