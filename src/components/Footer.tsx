import { useRef, useState } from 'react';

const FONT_FAMILY =
  '"Noto Sans SC", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", SimHei, Arial, Helvetica, sans-serif';

// =============================
// 图标 SVG 路径（对应 Figma 537_6546）
// =============================

/** 微信公众号 SVG —— 替换源：Figma mq63vs4n-bcbz9ve.svg */
const WeChatIcon = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M21.3064 11.2599C21.6513 11.2599 21.9907 11.2856 22.332 11.3224C21.4131 7.1208 16.84 4 11.6182 4C5.78134 4 1 7.90513 1 12.867C1 15.7302 2.59003 18.0814 5.24878 19.9079L4.1875 23.0435L7.89999 21.2171C9.22745 21.4729 10.2925 21.738 11.618 21.738C11.9518 21.738 12.2818 21.7234 12.6081 21.6995C12.4018 21.0016 12.28 20.2725 12.28 19.5122C12.2819 14.9568 16.2645 11.2599 21.3064 11.2599ZM15.5989 8.4335C16.4013 8.4335 16.9283 8.95097 16.9283 9.73527C16.9283 10.5159 16.4013 11.0388 15.5989 11.0388C14.8055 11.0388 14.007 10.5159 14.007 9.73527C14.007 8.94906 14.8038 8.4335 15.5989 8.4335ZM8.16815 11.0389C7.3712 11.0389 6.56877 10.5159 6.56877 9.7353C6.56877 8.9508 7.3712 8.43354 8.16815 8.43354C8.96507 8.43354 9.49383 8.94906 9.49383 9.7353C9.49386 10.5159 8.96493 11.0389 8.16815 11.0389ZM31 19.3869C31 15.2183 26.7512 11.8214 21.9794 11.8214C16.9264 11.8214 12.9493 15.2201 12.9493 19.3869C12.9493 23.5664 16.9283 26.9522 21.9794 26.9522C23.0369 26.9522 24.1038 26.6927 25.1651 26.4314L28.0769 28L27.2782 25.3929C29.4101 23.8204 31 21.738 31 19.3869ZM19.0507 18.0814C18.5239 18.0814 17.9895 17.5659 17.9895 17.0393C17.9895 16.5202 18.5238 15.9973 19.0507 15.9973C19.857 15.9973 20.38 16.5202 20.38 17.0393C20.38 17.5659 19.857 18.0814 19.0507 18.0814ZM24.8913 18.0814C24.3682 18.0814 23.8358 17.5659 23.8358 17.0393C23.8358 16.5202 24.3664 15.9973 24.8913 15.9973C25.6901 15.9973 26.2207 16.5202 26.2207 17.0393C26.2207 17.5659 25.6903 18.0814 24.8913 18.0814Z" fill="currentColor"/>
  </svg>
);

/** 视频号 SVG —— 替换源：Figma mq63vs4n-dzqr3bs.svg */
const VideoIcon = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M26.9113 4.00675C27.5041 4.07108 28.0655 4.30703 28.5272 4.6859C28.9889 5.06476 29.331 5.57021 29.5119 6.14073C30.5046 8.54146 29.7636 13.2306 29.2183 15.8139C28.5712 19.252 27.4512 22.5831 25.8906 25.7115C25.6697 26.2565 25.3264 26.7429 24.8874 27.1325C24.4484 27.5222 23.9256 27.8047 23.3598 27.9578C23.2122 27.9851 23.0625 27.9992 22.9124 28C20.1859 28 17.5852 24.4621 16.0053 21.7805C14.4113 24.462 11.8247 28 9.09817 28C8.94803 28.0006 8.79818 27.9864 8.65076 27.9579C8.08208 27.8074 7.55609 27.5261 7.11441 27.1362C6.67274 26.7464 6.3275 26.2586 6.10604 25.7116C4.55157 22.5805 3.43191 19.2503 2.77831 15.8138C2.24696 13.2306 1.49195 8.54148 2.48468 6.14071C2.66554 5.57019 3.00764 5.06475 3.46936 4.6859C3.93109 4.30704 4.49252 4.07109 5.08535 4.00677C7.5322 3.83828 10.4404 6.81461 14.8028 13.9747C15.2503 14.7047 15.6557 15.3786 16.0053 15.9683C16.3548 15.3786 16.7603 14.7047 17.1938 13.9747C21.5562 6.81461 24.4504 3.83828 26.9113 4.00675ZM5.18322 7.16561L5.15526 7.2358L5.11331 7.34811C4.58198 8.86436 4.97349 12.9077 6.07805 17.288C6.64363 19.916 7.6005 22.4434 8.91641 24.785C8.99091 24.8955 9.10298 24.9751 9.23166 25.0087C9.36034 25.0423 9.4968 25.0276 9.6155 24.9675C10.7571 24.2031 11.7128 23.1907 12.4119 22.0051C13.1201 20.9791 13.7645 19.91 14.3414 18.8042C13.6843 17.681 13.0131 16.5719 12.328 15.4628C8.5389 9.22937 6.53947 7.51658 5.72851 7.03923C5.63807 6.98921 5.53243 6.97443 5.43182 6.99774C5.3312 7.02105 5.24269 7.0808 5.18322 7.16556V7.16561ZM26.8414 7.2358C26.8251 7.18634 26.7987 7.14083 26.7639 7.10222C26.7291 7.0636 26.6866 7.03272 26.6392 7.01157C26.5918 6.99041 26.5405 6.97945 26.4887 6.97938C26.4368 6.97931 26.3855 6.99014 26.338 7.01118C26.3134 7.01672 26.2897 7.0262 26.2681 7.03925C25.4711 7.50254 23.4717 9.20132 19.6686 15.4629C18.9974 16.572 18.3123 17.6951 17.6412 18.8042C18.7119 21.1604 20.2931 23.2469 22.2692 24.9113C22.4071 24.9981 22.5733 25.0276 22.7325 24.9936C22.8917 24.9595 23.0314 24.8645 23.1221 24.7288C24.4155 22.401 25.3579 19.8847 25.9165 17.288C27.021 12.9077 27.4125 8.86436 26.8812 7.34811L26.8392 7.2358H26.8414Z" fill="currentColor"/>
  </svg>
);

/** 抖音 SVG —— 替换源：Figma mq63vs4n-iirmqnp.svg */
const DouyinIcon = () => (
  <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M7.18164 23.5758C7.18421 21.2831 8.09612 19.085 9.71729 17.4638C11.3385 15.8427 13.5365 14.9308 15.8292 14.9282V20.1165C14.9122 20.1176 14.033 20.4823 13.3846 21.1308C12.7361 21.7792 12.3714 22.6584 12.3703 23.5754C12.3703 25.275 13.2894 27.1034 15.3076 27.1034C15.4418 27.1034 18.5965 27.0724 18.5965 24.3894V4.72363H24.1254C24.1284 5.96354 24.6225 7.15176 25.4997 8.0281C26.3768 8.90445 27.5655 9.39751 28.8054 9.39931L28.8007 14.5783C27.0354 14.5918 25.3005 14.1185 23.7866 13.2103L23.7845 24.3894C23.7845 29.5222 19.4166 32.2917 15.3068 32.2917C10.6751 32.2928 7.18164 28.5452 7.18164 23.5758Z" fill="currentColor"/>
    <path d="M14.446 15.0323C8.86238 15.7408 4.44589 22.8623 9.02798 29.2707C13.2609 32.7328 22.1655 30.7193 22.4121 23.2288L22.4059 11.833C23.9288 12.7269 25.6636 13.1958 27.4294 13.1909V9.18378C26.3912 8.83314 25.4936 8.15726 24.8698 7.25634C23.9544 6.65419 23.275 5.75434 22.9467 4.70898H18.5989L18.5961 24.4463C18.5921 27.205 13.9917 28.1875 12.8238 25.5101C9.89918 24.1119 10.5605 18.7979 14.4521 18.74L14.446 15.0323Z" fill="currentColor"/>
  </svg>
);

// =============================
// 数据定义 —— 与 Figma 537_5890 对应
// =============================

type FooterColumn = {
  title: string;
  items: { label: string; href: string }[];
};

const FOOTER_COLUMNS: FooterColumn[] = [
  {
    title: '产品中心',
    items: [
      { label: '商云|智选', href: '/product/shangyun' },
      { label: '思迅商旗', href: '/product/shangqi' },
      { label: 'eShop小象', href: '/product/eshop-xiaoxiang' },
      { label: 'eShop小牛', href: '/product/eshop-xiaoniu' },
      { label: '天店·星耀', href: '/product/tiandian' },
      { label: '美食家3', href: '/product/meishijia' },
      { label: '更多产品→', href: '/products' },
    ],
  },
  {
    title: '解决方案',
    items: [
      { label: '商超百货', href: '/solution/chaoshuo' },
      { label: '专卖零售', href: '/solution/zhuanmao' },
      { label: '餐饮娱乐', href: '/solution/canyin' },
      { label: 'O2O服务', href: '/solution/o2o' },
    ],
  },
  {
    title: '服务支持',
    items: [
      { label: '使用手册', href: '/support/manual' },
      { label: '方案下载', href: '/support/download' },
      { label: '技术支持', href: '/support/tech' },
      { label: '思迅社区', href: '/support/community' },
    ],
  },
  {
    title: '关于思迅',
    items: [
      { label: '思迅介绍', href: '/about' },
      { label: '新闻动态', href: '/news' },
      { label: '客户案例', href: '/cases' },
      { label: '联系我们', href: '/contact' },
      { label: '用户协议', href: '/agreement' },
      { label: '隐私政策', href: '/privacy' },
    ],
  },
];

// =============================
// 二维码悬浮层（hover 时显示在图标下方，悬浮在整个 footer 高度内）
// 对应 Figma 537_5960 / 537_5893
// =============================
type QRFloatingProps = {
  visible: boolean;
  anchorLeft: number; // 按钮在页面中的 left（px）
  anchorTop: number; // 按钮在页面中的 top（px）
  footerRect: { top: number; left: number; height: number; width: number } | null;
  label: string;
};

const QRFloating = ({ visible, anchorLeft, anchorTop, footerRect, label }: QRFloatingProps) => {
  if (!visible || !footerRect) return null;

  const QR_WIDTH = 142;
  const QR_HEIGHT = 142;
  const GAP = 12; // 二维码与按钮之间的间距

  // 让二维码水平居中于按钮下方
  const BUTTON_HEIGHT = 48;
  const centerX = anchorLeft + 24; // 按钮中心，按钮宽 48

  // 相对于 footer 的位置（二维码在按钮下方）
  const relLeft = centerX - footerRect.left - QR_WIDTH / 2;
  const relTop = anchorTop - footerRect.top + BUTTON_HEIGHT + GAP;

  // 确保不越出 footer 左侧与右侧
  const left = Math.max(16, Math.min(relLeft, footerRect.width - QR_WIDTH - 16));
  // 向下最多延伸到 footer 高度内（顶部不超过 16px 留白）
  const top = Math.max(16, relTop);

  const qrSrc =
    label === '抖音'
      ? '/image/footer/tiktokcode.png'
      : label === '视频号'
        ? '/image/footer/videocode.png'
        : '/image/footer/qrcode.png';

  return (
    <div
      style={{
        position: 'absolute',
        left,
        top,
        width: QR_WIDTH,
        height: QR_HEIGHT + 28,
        zIndex: 9999,
        pointerEvents: 'none',
      }}
    >
      {/* 标题文字 */}
      <p
        style={{
          margin: 0,
          marginBottom: 8,
          textAlign: 'center',
          fontFamily: FONT_FAMILY,
          fontSize: 14,
          color: '#1D2233',
          fontWeight: 500,
        }}
      >
        {label}
      </p>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 8,
          background: '#FFFFFF',
          padding: 7,
          boxShadow: '0px 8px 40px rgba(0, 104, 235, 0.15)',
        }}
      >
        <img
          src={qrSrc}
          alt={label}
          style={{ width: 128, height: 128, display: 'block' }}
        />
      </div>
    </div>
  );
};

// =============================
// 社交图标按钮（悬停时在图标下方显示二维码悬浮层）
// =============================
type SocialIconProps = {
  icon: React.ReactNode;
  label: string;
  onHoverChange: (
    v: boolean,
    rect: { left: number; top: number; width: number; height: number } | null
  ) => void;
};

const SocialIcon = ({ icon, label, onHoverChange }: SocialIconProps) => {
  const [hovered, setHovered] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  return (
    <div
      ref={ref}
      onMouseEnter={() => {
        setHovered(true);
        const r = ref.current?.getBoundingClientRect();
        onHoverChange(
          true,
          r ? { left: r.left, top: r.top, width: r.width, height: r.height } : null
        );
      }}
      onMouseLeave={() => {
        setHovered(false);
        onHoverChange(false, null);
      }}
      style={{
        position: 'relative',
        display: 'flex',
        flexShrink: 0,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 16,
        background: hovered ? '#C8C8C8' : '#D9D9D9',
        width: 48,
        height: 48,
        cursor: 'pointer',
        transition: 'background 0.2s ease',
      }}
      title={label}
    >
      <span style={{ flexShrink: 0, width: 32, height: 32, color: '#1D2233' }}>
        {icon}
      </span>
    </div>
  );
};

// =============================
// Footer 链接项（悬停蓝色+下划线）
// =============================
const FooterLink = ({ item }: { item: FooterColumn['items'][0] }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <a
      href={item.href}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        fontFamily: FONT_FAMILY,
        fontSize: 14,
        lineHeight: '40px',
        letterSpacing: 0,
        color: hovered ? '#0068EB' : '#000000',
        textDecoration: hovered ? 'underline' : 'none',
        cursor: 'pointer',
        transition: 'color 0.2s ease',
        display: 'block',
      }}
    >
      {item.label}
    </a>
  );
};

// =============================
// 主组件 —— Footer（Main Frame）
// 对应 Figma 537_5890 / 537_5893
// =============================
const Footer = () => {
  const footerRef = useRef<HTMLElement | null>(null);

  // 当前 hover 的按钮信息（哪个按钮 + 其位置）
  const [hoverInfo, setHoverInfo] = useState<{
    label: string;
    left: number;
    top: number;
  } | null>(null);

  const footerRect = (() => {
    const r = footerRef.current?.getBoundingClientRect();
    if (!r) return null;
    return { top: r.top, left: r.left, width: r.width, height: r.height };
  })();

  const handleSocialHover = (
    v: boolean,
    label: string,
    rect: { left: number; top: number } | null
  ) => {
    if (v && rect) {
      setHoverInfo({ label, left: rect.left, top: rect.top });
    } else {
      setHoverInfo(null);
    }
  };

  return (
    <footer
      ref={footerRef}
      style={{ width: '100%', position: 'relative' }}
    >
      {/* ---- informationContainer ---- */}
      <div
        style={{
          display: 'inline-flex',
          flexShrink: 0,
          alignItems: 'flex-start',
          alignSelf: 'stretch',
          justifyContent: 'center',
          background: '#E8E9EE',
          padding: '80px 240px 40px',
          width: '100%',
          maxWidth: 1920,
          margin: '0 auto',
          boxSizing: 'border-box',
        }}
      >
        {/* ====== 左侧 contactInfoContainer（socialMediaContainer + qRCodeImage） ====== */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            paddingRight: 166,
            width: 360,
            rowGap: 20,
          }}
        >
          {/* socialMediaContainer */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              flexShrink: 0,
              alignItems: 'flex-start',
              alignSelf: 'stretch',
            }}
          >
            {/* companyLogo —— 替换源：Figma mq63v64m-5tvihvx.svg */}
            <img
              src="/image/footer/logo.svg"
              alt="思迅"
              style={{ width: 194, height: 24, overflow: 'hidden', display: 'block' }}
            />

            {/* salesHotlineText */}
            <p
              style={{
                margin: '50px 0 0',
                lineHeight: '24px',
                letterSpacing: 0,
                color: '#000000',
                fontFamily: FONT_FAMILY,
                fontSize: 20,
              }}
            >
              销售热线
            </p>

            {/* phoneNumber */}
            <p
              style={{
                margin: '15px 0 0',
                lineHeight: '34px',
                letterSpacing: 0,
                color: '#000000',
                fontFamily: FONT_FAMILY,
                fontSize: 28,
                fontWeight: 700,
              }}
            >
              400-777-9977
            </p>

            {/* 关注思迅 */}
            <p
              style={{
                margin: '50px 0 0',
                lineHeight: '24px',
                letterSpacing: 0,
                color: '#000000',
                fontFamily: FONT_FAMILY,
                fontSize: 20,
              }}
            >
              关注思迅
            </p>

            {/* weChatIconRow */}
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                alignSelf: 'stretch',
                columnGap: 20,
                marginTop: 15,
                marginRight: 10,
              }}
            >
              <SocialIcon
                icon={<WeChatIcon />}
                label="微信公众号"
                onHoverChange={(v, r) => handleSocialHover(v, '微信公众号', r)}
              />
              <SocialIcon
                icon={<VideoIcon />}
                label="视频号"
                onHoverChange={(v, r) => handleSocialHover(v, '视频号', r)}
              />
              <SocialIcon
                icon={<DouyinIcon />}
                label="抖音"
                onHoverChange={(v, r) => handleSocialHover(v, '抖音', r)}
              />
            </div>
          </div>
        </div>

        {/* ====== 右侧 4 列 ====== */}
        <div style={{ display: 'flex', alignItems: 'flex-start' }}>
          {/* 产品中心 —— padding: 0px 90px 169px 100px */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              flexShrink: 0,
              alignItems: 'flex-start',
              padding: '0px 90px 100px 100px',
              rowGap: 40,
            }}
          >
            <p
              style={{
                flexShrink: 0,
                alignSelf: 'stretch',
                letterSpacing: 0,
                color: '#000000',
                fontFamily: FONT_FAMILY,
                fontSize: 20,
                fontWeight: 500,
                margin: 0,
              }}
            >
              产品中心
            </p>
            <div>
              {FOOTER_COLUMNS[0].items.map((item) => (
                <FooterLink key={item.label} item={item} />
              ))}
            </div>
          </div>

          {/* 解决方案 —— padding: 0px 85px 49px 100px, height: 400px */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              flexShrink: 0,
              alignItems: 'flex-start',
              padding: '0px 85px 49px 100px',
              height: 400,
              rowGap: 40,
            }}
          >
            <p
              style={{
                flexShrink: 0,
                lineHeight: '24px',
                letterSpacing: 0,
                color: '#000000',
                fontFamily: FONT_FAMILY,
                fontSize: 20,
                fontWeight: 500,
                margin: 0,
              }}
            >
              解决方案
            </p>
            <div>
              {FOOTER_COLUMNS[1].items.map((item) => (
                <FooterLink key={item.label} item={item} />
              ))}
            </div>
          </div>

          {/* 服务支持 —— padding: 0px 90px 96px 100px, justifyContent: flex-end */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              flexShrink: 0,
              alignItems: 'flex-start',
              justifyContent: 'flex-end',
              padding: '0px 90px 96px 100px',
              rowGap: 40,
            }}
          >
            <p
              style={{
                flexShrink: 0,
                lineHeight: '24px',
                letterSpacing: 0,
                color: '#000000',
                fontFamily: FONT_FAMILY,
                fontSize: 20,
                fontWeight: 500,
                margin: 0,
              }}
            >
              服务 支持
            </p>
            <div>
              {FOOTER_COLUMNS[2].items.map((item) => (
                <FooterLink key={item.label} item={item} />
              ))}
            </div>
          </div>

          {/* 关于思迅 —— padding: 0px 74px 56px 100px, justifyContent: flex-end */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              flexShrink: 0,
              alignItems: 'flex-start',
              justifyContent: 'flex-end',
              padding: '0px 74px 56px 100px',
              rowGap: 40,
            }}
          >
            <p
              style={{
                flexShrink: 0,
                alignSelf: 'stretch',
                letterSpacing: 0,
                color: '#000000',
                fontFamily: FONT_FAMILY,
                fontSize: 20,
                fontWeight: 500,
                margin: 0,
              }}
            >
              关于思迅
            </p>
            <div>
              {FOOTER_COLUMNS[3].items.map((item) => (
                <FooterLink key={item.label} item={item} />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ---- footerContainer ---- */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          flexShrink: 0,
          alignItems: 'center',
          alignSelf: 'stretch',
          justifyContent: 'center',
          background: '#E8E9EE',
          padding: '30px 717px 30px 718px',
          rowGap: 10,
        }}
      >
        <p
          style={{
            flexShrink: 0,
            lineHeight: '17px',
            letterSpacing: 0,
            color: '#000000',
            fontFamily: FONT_FAMILY,
            fontSize: 12,
            margin: 0,
          }}
        >
          深圳市思迅软件股份有限公司 版权所有
        </p>
        <p
          style={{
            flexShrink: 0,
            lineHeight: '17px',
            letterSpacing: 0,
            color: '#000000',
            fontFamily: FONT_FAMILY,
            fontSize: 12,
            margin: 0,
          }}
        >
          <span>Copyright 2026 www.sixun.com.cn All Rights Reserved.&nbsp;</span>
          <span style={{ textDecoration: 'underline' }}>粤ICP备14033072号</span>
        </p>
      </div>

      {/* 二维码悬浮层 —— hover 图标时显示在图标下方，悬浮在整个 footer 高度内 */}
      <QRFloating
        visible={hoverInfo !== null}
        anchorLeft={hoverInfo?.left ?? 0}
        anchorTop={hoverInfo?.top ?? 0}
        footerRect={footerRect}
        label={hoverInfo?.label ?? ''}
      />
    </footer>
  );
};

export default Footer;
