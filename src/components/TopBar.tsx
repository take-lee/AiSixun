import { useState } from 'react';

const TopBar = () => {
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = () => {
    window.location.href = 'https://www.sixun.com.cn/English/english';
  };

  return (
    <div 
      className="w-full"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        height: '28px',
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(10px)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
        boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        gap: '40px',
        padding: '4px 240px 4px 1158px',
      }}
    >
      <span style={{
        fontFamily: '"Noto Sans SC", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", SimHei, Arial, Helvetica, sans-serif',
        fontSize: '14px',
        lineHeight: '17px',
        color: '#ffffff',
        whiteSpace: 'nowrap',
      }}>热线：400-777-9977</span>
      <span style={{
        fontFamily: '"Noto Sans SC", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", SimHei, Arial, Helvetica, sans-serif',
        fontSize: '14px',
        lineHeight: '17px',
        color: '#ffffff',
        whiteSpace: 'nowrap',
      }}>股票代码：838758</span>
      <span style={{
        fontFamily: '"Noto Sans SC", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", SimHei, Arial, Helvetica, sans-serif',
        fontSize: '14px',
        lineHeight: '17px',
        color: '#ffffff',
        whiteSpace: 'nowrap',
      }}>石基信息成员企业</span>
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
          padding: '0 11px',
          height: '20px',
          width: '43px',
          backgroundColor: isHovered ? '#0d99ff' : 'transparent',
          cursor: 'pointer',
          transition: 'background-color 200ms ease',
        }}
      >
        <span style={{
          fontFamily: '"Noto Sans SC", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", SimHei, Arial, Helvetica, sans-serif',
          fontSize: '14px',
          lineHeight: '17px',
          color: '#ffffff',
          whiteSpace: 'nowrap',
        }}>EN</span>
      </div>
    </div>
  );
};

export default TopBar;
