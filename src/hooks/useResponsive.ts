import { useState, useEffect } from 'react';

// 断点定义
// xs: 0-640    手机
// sm: 641-768  大手机 / 小平板
// md: 769-1024 平板
// lg: 1025-1440 笔记本 / 小屏桌面
// xl: 1441+   大屏桌面
export type Breakpoint = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export interface ResponsiveUtils {
  width: number;
  breakpoint: Breakpoint;
  // 5 个参数对应 xs, sm, md, lg, xl
  // 小屏传 null 时会自动回退到最近的大屏值
  // 大屏传 null 时会回退到最近的小屏值
  r: <T>(xs: T | null, sm?: T | null, md?: T | null, lg?: T | null, xl?: T | null) => T;
  isMobile: boolean; // <=768
  isTablet: boolean; // 769-1024
  isLaptop: boolean; // 1025-1440
  isDesktop: boolean; // > 1440
}

const getBreakpoint = (w: number): Breakpoint => {
  if (w <= 640) return 'xs';
  if (w <= 768) return 'sm';
  if (w <= 1024) return 'md';
  if (w <= 1440) return 'lg';
  return 'xl';
};

export const useResponsive = (): ResponsiveUtils => {
  const [width, setWidth] = useState<number>(() =>
    typeof window !== 'undefined' ? window.innerWidth : 1920
  );

  useEffect(() => {
    let timeoutId: number | undefined;
    const handler = () => {
      if (timeoutId) window.clearTimeout(timeoutId);
      timeoutId = window.setTimeout(() => setWidth(window.innerWidth), 100);
    };
    window.addEventListener('resize', handler);
    return () => {
      window.removeEventListener('resize', handler);
      if (timeoutId) window.clearTimeout(timeoutId);
    };
  }, []);

  const breakpoint = getBreakpoint(width);

  const r = <T>(
    xs: T | null,
    sm: T | null = null,
    md: T | null = null,
    lg: T | null = null,
    xl: T | null = null
  ): T => {
    const vals: (T | null)[] = [xs, sm, md, lg, xl];
    const order: Breakpoint[] = ['xs', 'sm', 'md', 'lg', 'xl'];
    const idx = order.indexOf(breakpoint);

    // 当前断点有值直接返回
    if (vals[idx] !== null && vals[idx] !== undefined) {
      return vals[idx] as T;
    }
    // 否则往更大屏回退
    for (let i = idx + 1; i < vals.length; i++) {
      if (vals[i] !== null && vals[i] !== undefined) return vals[i] as T;
    }
    // 再往小屏回退
    for (let i = idx - 1; i >= 0; i--) {
      if (vals[i] !== null && vals[i] !== undefined) return vals[i] as T;
    }
    return (xs as T);
  };

  return {
    width,
    breakpoint,
    r,
    isMobile: breakpoint === 'xs' || breakpoint === 'sm',
    isTablet: breakpoint === 'md',
    isLaptop: breakpoint === 'lg',
    isDesktop: breakpoint === 'xl',
  };
};

export default useResponsive;
