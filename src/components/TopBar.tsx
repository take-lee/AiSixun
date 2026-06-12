import { useState } from 'react';

// TopBar —— 1920px 宽，28px 高，黑色半透明背景，所有内容右侧对齐
// Figma: 534_2943
const TopBar = () => {
  const [enHovered, setEnHovered] = useState(false);
  const [lang, setLang] = useState<'CN' | 'EN'>('CN');

  return (
    <div
      style={{
        width: '100%',
        height: '28px',
        backgroundColor: 'rgba(0, 0, 0, 0.85)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '4px 240px',
        boxSizing: 'border-box',
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
      }}
    >
      {/* 所有内容项（热线 + 股票 + 企业 + EN）整体右侧对齐，间距 40px */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '40px' }}>
        <span
          style={{
            fontFamily:
              '"Noto Sans SC", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", SimHei, Arial, Helvetica, sans-serif',
            fontSize: '14px',
            lineHeight: '17px',
            color: '#ffffff',
            whiteSpace: 'nowrap',
          }}
        >
          热线：400-777-9977
        </span>
        <span
          style={{
            fontFamily:
              '"Noto Sans SC", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", SimHei, Arial, Helvetica, sans-serif',
            fontSize: '14px',
            lineHeight: '17px',
            color: '#ffffff',
            whiteSpace: 'nowrap',
          }}
        >
          股票代码：838758
        </span>
        <span
          style={{
            fontFamily:
              '"Noto Sans SC", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", SimHei, Arial, Helvetica, sans-serif',
            fontSize: '14px',
            lineHeight: '17px',
            color: '#ffffff',
            whiteSpace: 'nowrap',
          }}
        >
          石基信息成员企业
        </span>

        <div
          onMouseEnter={() => setEnHovered(true)}
          onMouseLeave={() => setEnHovered(false)}
          onClick={() => setLang(lang === 'CN' ? 'EN' : 'CN')}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: '1px solid #ffffff',
            borderRadius: '4px',
            padding: '0 11px',
            height: '20px',
            cursor: 'pointer',
            backgroundColor: enHovered ? 'rgba(255,255,255,0.1)' : 'transparent',
            transition: 'background-color 200ms ease',
          }}
        >
          <span
            style={{
              fontFamily:
                '"Noto Sans SC", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", SimHei, Arial, Helvetica, sans-serif',
              fontSize: '14px',
              lineHeight: '20px',
              color: '#ffffff',
              whiteSpace: 'nowrap',
            }}
          >
            {lang === 'CN' ? 'EN' : '中'}
          </span>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
