import { useState } from 'react';
import { useResponsive } from '../hooks/useResponsive';

const TopBar = () => {
  const [isHovered, setIsHovered] = useState(false);
  const { r, isMobile } = useResponsive();

  const handleClick = () => {
    window.location.href = 'https://www.sixun.com.cn/English/english';
  };

  const paddingX = r('8px', '12px', '20px', '80px', '240px');
  const gap = r('10px', '14px', '20px', '30px', '40px');
  const fontSize = r('11px', '12px', '13px', '14px', '14px');
  const height = r('24px', '26px', '28px', '28px', '28px');

  return (
    <div
      className="w-full"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        height,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(10px)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
        boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        gap,
        padding: `4px ${paddingX}`,
        overflow: 'hidden',
      }}
    >
      <span style={{
        fontFamily: '"Noto Sans SC", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", SimHei, Arial, Helvetica, sans-serif',
        fontSize,
        lineHeight: '17px',
        color: '#ffffff',
        whiteSpace: 'nowrap',
      }}>热线：400-777-9977</span>
      {!isMobile && (
        <span style={{
          fontFamily: '"Noto Sans SC", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", SimHei, Arial, Helvetica, sans-serif',
          fontSize,
          lineHeight: '17px',
          color: '#ffffff',
          whiteSpace: 'nowrap',
        }}>股票代码：838758</span>
      )}
      {!isMobile && (
        <span style={{
          fontFamily: '"Noto Sans SC", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", SimHei, Arial, Helvetica, sans-serif',
          fontSize,
          lineHeight: '17px',
          color: '#ffffff',
          whiteSpace: 'nowrap',
        }}>石基信息成员企业</span>
      )}
      <div
        onClick={handleClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '10px',
          border: '1px solid #ffffff',
          borderRadius: '4px',
          padding: `0 ${r('8px', '9px', '10px', '11px', '11px')}`,
          height: r('16px', '18px', '20px', '20px', '20px'),
          minWidth: r('30px', '34px', '40px', '43px', '43px'),
          backgroundColor: isHovered ? '#0d99ff' : 'transparent',
          cursor: 'pointer',
          transition: 'background-color 200ms ease',
          flexShrink: 0,
        }}
      >
        <span style={{
          fontFamily: '"Noto Sans SC", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", SimHei, Arial, Helvetica, sans-serif',
          fontSize,
          lineHeight: '17px',
          color: '#ffffff',
          whiteSpace: 'nowrap',
        }}>EN</span>
      </div>
    </div>
  );
};

export default TopBar;
