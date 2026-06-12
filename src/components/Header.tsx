import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import NavExpandedDetail from './NavExpandedDetail';
import SolutionDropdown from './SolutionDropdown';

const navItems = ['产品中心', '解决方案', '客户案例', '合作伙伴', '关于思迅'];

const Header = () => {
  const [hovered, setHovered] = useState<string | null>(null);
  const [showProductDropdown, setShowProductDropdown] = useState(false);
  const [showSolutionDropdown, setShowSolutionDropdown] = useState(false);
  const navigate = useNavigate();
  const dropdownTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const headerRef = useRef<HTMLElement>(null);

  const handleNavMouseEnter = (item: string) => {
    if (dropdownTimerRef.current) {
      clearTimeout(dropdownTimerRef.current);
      dropdownTimerRef.current = null;
    }
    setHovered(item);
    if (item === '产品中心') {
      setShowProductDropdown(true);
      setShowSolutionDropdown(false);
    } else if (item === '解决方案') {
      setShowSolutionDropdown(true);
      setShowProductDropdown(false);
    } else {
      setShowProductDropdown(false);
      setShowSolutionDropdown(false);
    }
  };

  const handleNavMouseLeave = (_item: string) => {
    if (_item === '产品中心') {
      dropdownTimerRef.current = setTimeout(() => {
        setShowProductDropdown(false);
      }, 150);
    } else if (_item === '解决方案') {
      dropdownTimerRef.current = setTimeout(() => {
        setShowSolutionDropdown(false);
      }, 150);
    }
  };

  const handleProductDropdownMouseEnter = () => {
    if (dropdownTimerRef.current) {
      clearTimeout(dropdownTimerRef.current);
      dropdownTimerRef.current = null;
    }
    setHovered('产品中心');
    setShowProductDropdown(true);
  };

  const handleProductDropdownMouseLeave = () => {
    dropdownTimerRef.current = setTimeout(() => {
      setShowProductDropdown(false);
      setHovered(null);
    }, 150);
  };

  const handleSolutionDropdownMouseEnter = () => {
    if (dropdownTimerRef.current) {
      clearTimeout(dropdownTimerRef.current);
      dropdownTimerRef.current = null;
    }
    setHovered('解决方案');
    setShowSolutionDropdown(true);
  };

  const handleSolutionDropdownMouseLeave = () => {
    dropdownTimerRef.current = setTimeout(() => {
      setShowSolutionDropdown(false);
      setHovered(null);
    }, 150);
  };

  useEffect(() => {
    return () => {
      if (dropdownTimerRef.current) {
        clearTimeout(dropdownTimerRef.current);
      }
    };
  }, []);

  return (
    <>
      <header
        ref={headerRef}
        style={{
          width: '100%',
          height: '72px',
          backgroundColor: 'rgba(255, 255, 255, 0.85)',
          boxShadow: '0px 4px 30px 0px rgba(160, 163, 170, 0.1)',
          backdropFilter: 'blur(10px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '20px 250px',
          boxSizing: 'border-box',
          position: 'fixed',
          top: '28px',
          left: 0,
          right: 0,
          zIndex: 90,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '60px' }}>
          {/* Logo */}
          <img
            src="/image/footer/logo.svg"
            alt="思迅"
            onClick={() => {
              navigate('/');
              window.scrollTo({ top: 0, behavior: 'auto' });
            }}
            style={{
              width: '194px',
              height: '24px',
              flexShrink: 0,
              cursor: 'pointer',
            }}
          />

          {/* 导航项 */}
          <nav style={{ display: 'flex', alignItems: 'center', gap: '40px' }}>
            {navItems.map((item) => {
              const active = hovered === item;
              const isProduct = item === '产品中心';
              const isSolution = item === '解决方案';
              const dropdownActive = (isProduct && showProductDropdown) || (isSolution && showSolutionDropdown);
              return (
                <span
                  key={item}
                  onMouseEnter={() => handleNavMouseEnter(item)}
                  onMouseLeave={() => handleNavMouseLeave(item)}
                  onClick={() => {
                    if (isProduct) {
                      navigate('/products');
                    } else if (isSolution) {
                      navigate('/solutions');
                    }
                  }}
                  style={{
                    fontFamily:
                      '"Noto Sans SC", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", SimHei, Arial, Helvetica, sans-serif',
                    fontSize: '16px',
                    lineHeight: '19px',
                    color: active ? '#0d99ff' : '#1d2233',
                    fontWeight: dropdownActive ? 700 : 400,
                    padding: '26px 0',
                    cursor: 'pointer',
                    whiteSpace: 'nowrap',
                    transition: 'color 200ms ease',
                    position: 'relative',
                    borderBottom: dropdownActive ? '2px solid #0d99ff' : 'none',
                  }}
                >
                  {item}
                </span>
              );
            })}
          </nav>
        </div>

        {/* 免费试用按钮 */}
        <div
          onMouseEnter={() => setHovered('btn')}
          onMouseLeave={() => setHovered(null)}
          style={{
            borderRadius: '8px',
            backgroundColor: hovered === 'btn' ? '#0d7bcc' : '#0d99ff',
            padding: '10px 17px 11px',
            cursor: 'pointer',
            transition: 'background-color 200ms ease',
          }}
        >
          <span
            style={{
              fontFamily:
                '"Noto Sans SC", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", SimHei, Arial, Helvetica, sans-serif',
              fontSize: '16px',
              lineHeight: '19px',
              color: '#ffffff',
              whiteSpace: 'nowrap',
            }}
          >
            免费试用
          </span>
        </div>
      </header>

      {/* 产品中心下拉展开面板 */}
      {showProductDropdown && (
        <div
          onMouseEnter={handleProductDropdownMouseEnter}
          onMouseLeave={handleProductDropdownMouseLeave}
          style={{
            position: 'fixed',
            top: '100px',
            left: 0,
            right: 0,
            zIndex: 89,
          }}
        >
          <NavExpandedDetail onNavigate={() => setShowProductDropdown(false)} />
        </div>
      )}

      {/* 解决方案下拉展开面板 */}
      {showSolutionDropdown && (
        <div
          onMouseEnter={handleSolutionDropdownMouseEnter}
          onMouseLeave={handleSolutionDropdownMouseLeave}
          style={{
            position: 'fixed',
            top: '100px',
            left: 0,
            right: 0,
            zIndex: 89,
          }}
        >
          <SolutionDropdown onNavigate={() => setShowSolutionDropdown(false)} />
        </div>
      )}
    </>
  );
};

export default Header;
