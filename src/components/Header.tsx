import { useResponsive } from '../hooks/useResponsive';

const Header = () => {
  const { r, isMobile, isTablet } = useResponsive();

  const topOffset = r('24px', '26px', '28px', '28px', '28px');
  const paddingX = r('8px', '12px', '20px', '80px', '240px');
  const height = r('56px', '60px', '68px', '72px', '72px');
  const logoWidth = r('120px', '140px', '170px', '194px', '194px');
  const logoHeight = r('15px', '17px', '21px', '24px', '24px');
  const fontSize = r('12px', '13px', '15px', '16px', '16px');
  const navGap = r('8px', '12px', '20px', '30px', '40px');
  const logoNavGap = r('20px', '30px', '50px', '70px', '80px');

  const hideNavOnMobile = isMobile || isTablet;

  return (
    <header
      className="w-full"
      style={{
        position: 'fixed',
        top: topOffset,
        left: 0,
        right: 0,
        zIndex: 50,
        height,
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.2)',
        boxShadow: '0 4px 30px rgba(160, 163, 170, 0.1)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: `12px ${paddingX}`,
        boxSizing: 'border-box',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: logoNavGap, flexShrink: 1, minWidth: 0 }}>
        <img
          src="./image/mpqkpep0-p74ziy5.svg"
          alt="思迅"
          style={{
            width: logoWidth,
            height: logoHeight,
            flexShrink: 0,
            overflow: 'hidden',
          }}
        />
        {!hideNavOnMobile && (
          <div style={{ display: 'flex', alignItems: 'center', gap: navGap, flexShrink: 1, minWidth: 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', padding: '10px 20px' }}>
              <span style={{
                fontFamily: '"Noto Sans SC", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", SimHei, Arial, Helvetica, sans-serif',
                fontSize,
                lineHeight: '19px',
                color: '#1d2233',
                whiteSpace: 'nowrap',
              }}>产品</span>
              <img
                src="./image/mpqkpep0-88q5xti.svg"
                alt=""
                style={{ width: r('12px', '14px', '15px', '16px', '16px'), height: r('12px', '14px', '15px', '16px', '16px'), flexShrink: 0 }}
              />
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', padding: '10px 20px' }}>
              <span style={{
                fontFamily: '"Noto Sans SC", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", SimHei, Arial, Helvetica, sans-serif',
                fontSize,
                lineHeight: '19px',
                color: '#1d2233',
                whiteSpace: 'nowrap',
              }}>场景方案</span>
              <img
                src="./image/mpqkpep0-88q5xti.svg"
                alt=""
                style={{ width: r('12px', '14px', '15px', '16px', '16px'), height: r('12px', '14px', '15px', '16px', '16px'), flexShrink: 0 }}
              />
            </div>
            <span style={{
              fontFamily: '"Noto Sans SC", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", SimHei, Arial, Helvetica, sans-serif',
              fontSize,
              lineHeight: '19px',
              color: '#1d2233',
              padding: '10px 20px',
              whiteSpace: 'nowrap',
            }}>伙伴支持</span>
            <span style={{
              fontFamily: '"Noto Sans SC", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", SimHei, Arial, Helvetica, sans-serif',
              fontSize,
              lineHeight: '19px',
              color: '#1d2233',
              padding: '10px 20px',
              whiteSpace: 'nowrap',
            }}>公司/社区</span>
          </div>
        )}
      </div>

      <div style={{
        display: 'flex',
        alignItems: 'center',
        borderRadius: '8px',
        backgroundColor: '#0d99ff',
        padding: r('6px 10px 7px', '8px 12px 9px', '9px 14px 10px', '10px 17px 11px', '10px 17px 11px'),
        flexShrink: 0,
        cursor: 'pointer',
      }}>
        <span style={{
          fontFamily: '"Noto Sans SC", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", SimHei, Arial, Helvetica, sans-serif',
          fontSize: r('12px', '13px', '15px', '16px', '16px'),
          lineHeight: '19px',
          color: '#ffffff',
          whiteSpace: 'nowrap',
        }}>免费试用</span>
      </div>
    </header>
  );
};

export default Header;
