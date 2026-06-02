const Header = () => {
  return (
    <header 
      className="w-full"
      style={{
        position: 'fixed',
        top: '28px',
        left: 0,
        right: 0,
        zIndex: 50,
        height: '72px',
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.2)',
        boxShadow: '0 4px 30px rgba(160, 163, 170, 0.1)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '20px 240px',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '80px' }}>
        <img 
          src="../.figma/image/mpqkpep0-p74ziy5.svg" 
          alt="思迅"
          style={{
            width: '194px',
            height: '24px',
            flexShrink: 0,
            overflow: 'hidden',
          }}
        />
        <div style={{ display: 'flex', alignItems: 'center', gap: '40px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', padding: '10px 20px' }}>
            <span style={{
              fontFamily: '"Noto Sans SC", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", SimHei, Arial, Helvetica, sans-serif',
              fontSize: '16px',
              lineHeight: '19px',
              color: '#1d2233',
              whiteSpace: 'nowrap',
            }}>产品</span>
            <img 
              src="../.figma/image/mpqkpep0-88q5xti.svg" 
              alt=""
              style={{ width: '16px', height: '16px', flexShrink: 0 }}
            />
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', padding: '10px 20px' }}>
            <span style={{
              fontFamily: '"Noto Sans SC", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", SimHei, Arial, Helvetica, sans-serif',
              fontSize: '16px',
              lineHeight: '19px',
              color: '#1d2233',
              whiteSpace: 'nowrap',
            }}>场景方案</span>
            <img 
              src="../.figma/image/mpqkpep0-88q5xti.svg" 
              alt=""
              style={{ width: '16px', height: '16px', flexShrink: 0 }}
            />
          </div>
          <span style={{
            fontFamily: '"Noto Sans SC", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", SimHei, Arial, Helvetica, sans-serif',
            fontSize: '16px',
            lineHeight: '19px',
            color: '#1d2233',
            padding: '10px 20px',
            whiteSpace: 'nowrap',
          }}>伙伴支持</span>
          <span style={{
            fontFamily: '"Noto Sans SC", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", SimHei, Arial, Helvetica, sans-serif',
            fontSize: '16px',
            lineHeight: '19px',
            color: '#1d2233',
            padding: '10px 20px',
            whiteSpace: 'nowrap',
          }}>公司/社区</span>
        </div>
      </div>

      <div style={{
        display: 'flex',
        alignItems: 'center',
        borderRadius: '8px',
        backgroundColor: '#0d99ff',
        padding: '10px 17px 11px',
      }}>
        <span style={{
          fontFamily: '"Noto Sans SC", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", SimHei, Arial, Helvetica, sans-serif',
          fontSize: '16px',
          lineHeight: '19px',
          color: '#ffffff',
          whiteSpace: 'nowrap',
        }}>免费试用</span>
      </div>
    </header>
  );
};

export default Header;
