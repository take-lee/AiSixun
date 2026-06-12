import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const FONT_FAMILY =
  '"Noto Sans SC", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", SimHei, Arial, Helvetica, sans-serif';

// ======================= 数据定义 =======================

interface ProductLink {
  name: string;
  link: string;
}

interface SolutionItem {
  title: string;
  tagsRow1: string[];
  tagsRow2: string[];
  products: ProductLink[];
  link: string;
}

interface SolutionSection {
  key: string;
  label: string;
  items: SolutionItem[];
}

const SECTIONS: SolutionSection[] = [
  {
    key: 'retail',
    label: '综合商超零售',
    items: [
      {
        title: '商超',
        tagsRow1: ['集团多仓WMS', '业财税一体化', '总部管控'],
        tagsRow2: ['高并发收银', '联营专柜结算'],
        products: [
          { name: '思迅商旗', link: '/products/shangqi' },
          { name: '商汇', link: '/products/shanghui' },
          { name: 'eShop 商业 5', link: '/products/eshop-business-5' },
        ],
        link: '/solutions/shangchao',
      },
      {
        title: '大卖场',
        tagsRow1: ['多区域总部管控', '业财税一体化', '总部管控'],
        tagsRow2: ['全链路数据打通', '联营专柜结算'],
        products: [
          { name: '思迅商旗', link: '/products/shangqi' },
          { name: '商汇', link: '/products/shanghui' },
          { name: 'eShop 商业 5', link: '/products/eshop-business-5' },
        ],
        link: '/solutions/damaichang',
      },
      {
        title: '社区超市',
        tagsRow1: ['快捷进销存', '业财税一体化', '总部管控'],
        tagsRow2: ['高并发收银'],
        products: [
          { name: '商云', link: '/products/shangyun' },
          { name: '思迅天店', link: '/products/tiandian' },
          { name: 'eShop 小象', link: '/products/eshop-xiaoxiang' },
        ],
        link: '/solutions/shequ',
      },
      {
        title: '便利店',
        tagsRow1: ['快捷进销存', '批量调价', '轻连锁云端管理'],
        tagsRow2: ['会员互通', '门店调拨', '免服务器快速部署'],
        products: [
          { name: '商云', link: '/products/shangyun' },
          { name: '思迅天店', link: '/products/tiandian' },
          { name: 'eShop 小象', link: '/products/eshop-xiaoxiang' },
        ],
        link: '/solutions/bianlidian',
      },
      {
        title: '生鲜果蔬',
        tagsRow1: ['AI 智能称重', '拆分分拣', '损耗管控'],
        tagsRow2: ['前店后场一体化管理'],
        products: [
          { name: '思迅秤心管家', link: '/products/chengxin' },
          { name: '天店·星锐', link: '/products/tiandian-xingrui' },
          { name: '商锐', link: '/products/shangrui' },
        ],
        link: '/solutions/shengxian',
      },
      {
        title: '农贸市场',
        tagsRow1: ['AI 智能称重', '拆分分拣', '秤码互联'],
        tagsRow2: ['商品批次效期', '损耗管控'],
        products: [
          { name: '思迅秤心管家', link: '/products/chengxin' },
          { name: '商云', link: '/products/shangyun' },
          { name: '天店·星锐', link: '/products/tiandian-xingrui' },
        ],
        link: '/solutions/nongmao',
      },
      {
        title: '熟食卤味',
        tagsRow1: ['损耗管控', '前店后场一体化管理', '秤码互联'],
        tagsRow2: ['临期预警'],
        products: [
          { name: '思迅秤心管家', link: '/products/chengxin' },
          { name: '商云', link: '/products/shangyun' },
          { name: '天店·星锐', link: '/products/tiandian-xingrui' },
        ],
        link: '/solutions/shushi',
      },
      {
        title: '零食专卖',
        tagsRow1: ['快速盘点', '多规格商品管理', '捆绑促销'],
        tagsRow2: ['临期预警', '连锁门店统一进销存', '会员营销'],
        products: [
          { name: '商云', link: '/products/shangyun' },
          { name: '思迅天店', link: '/products/tiandian' },
          { name: 'eShop 小象', link: '/products/eshop-xiaoxiang' },
        ],
        link: '/solutions/lingshi',
      },
    ],
  },
  {
    key: 'specialty',
    label: '垂直专卖行业',
    items: [
      {
        title: '母婴/童装',
        tagsRow1: ['尺码色码', '会员成长', '奶粉溯源'],
        tagsRow2: ['组合套装', '导购提成'],
        products: [
          { name: '商锐', link: '/products/shangrui' },
          { name: '天店·星云', link: '/products/tiandian-xingyun' },
          { name: 'eShop 服装版', link: '/products/eshop-clothing' },
        ],
        link: '/solutions/muying',
      },
      {
        title: '医药',
        tagsRow1: ['GSP合规', '批号效期', '处方管理'],
        tagsRow2: ['医保对接', '药师审方'],
        products: [
          { name: '商云医药版', link: '/products/shangyun-medical' },
          { name: '商锐', link: '/products/shangrui' },
          { name: 'eShop 小象', link: '/products/eshop-xiaoxiang' },
        ],
        link: '/solutions/yaodian',
      },
      {
        title: '服装鞋帽/箱包',
        tagsRow1: ['多规格SKU', '季节换货', '导购提成'],
        tagsRow2: ['门店调拨', '会员价'],
        products: [
          { name: '商锐', link: '/products/shangrui' },
          { name: '天店·星云', link: '/products/tiandian-xingyun' },
          { name: 'eShop 服装版', link: '/products/eshop-clothing' },
        ],
        link: '/solutions/fuzhuang',
      },
      {
        title: '烟酒茶',
        tagsRow1: ['批次溯源', '会员分级', '礼盒套装'],
        tagsRow2: ['扫码验真', '库存预警'],
        products: [
          { name: '商云专卖版', link: '/products/shangyun-specialty' },
          { name: '商锐', link: '/products/shangrui' },
          { name: '天店·星耀', link: '/products/tiandian-xingyao' },
        ],
        link: '/solutions/yanjiu',
      },
      {
        title: '饰品/文具',
        tagsRow1: ['小件管理', '组合套装', '节日营销'],
        tagsRow2: ['库存预警', '会员积分'],
        products: [
          { name: '商云', link: '/products/shangyun' },
          { name: '思迅天店', link: '/products/tiandian' },
          { name: 'eShop 小象', link: '/products/eshop-xiaoxiang' },
        ],
        link: '/solutions/wenju',
      },
      {
        title: '家电/数码通讯',
        tagsRow1: ['SN码追踪', '以旧换新', '延保服务'],
        tagsRow2: ['安装预约', '会员营销'],
        products: [
          { name: '商锐', link: '/products/shangrui' },
          { name: '天店·星耀', link: '/products/tiandian-xingyao' },
          { name: 'eShop 数码版', link: '/products/eshop-digital' },
        ],
        link: '/solutions/shuma',
      },
    ],
  },
  {
    key: 'catering',
    label: '餐饮全业态',
    items: [
      {
        title: '正餐酒楼',
        tagsRow1: ['包厢管理', '宴会预订', '后厨分单'],
        tagsRow2: ['会员储值', '扫码点餐'],
        products: [
          { name: '美食家3', link: '/products/meishijia-3' },
          { name: '思迅食通天', link: '/products/shitongtian' },
          { name: '天店·餐饮版', link: '/products/tiandian-canyin' },
        ],
        link: '/solutions/zhengcan',
      },
      {
        title: '西餐/牛排',
        tagsRow1: ['扫码点餐', '熟度管理', '酒水管理'],
        tagsRow2: ['服务费计算', '会员营销'],
        products: [
          { name: '美食家3', link: '/products/meishijia-3' },
          { name: '思迅食通天', link: '/products/shitongtian' },
          { name: '天店·餐饮版', link: '/products/tiandian-canyin' },
        ],
        link: '/solutions/xican',
      },
      {
        title: '火锅/烧烤',
        tagsRow1: ['锅底选辣', '自助下单', '计时收费'],
        tagsRow2: ['套餐拼盘', '会员储值'],
        products: [
          { name: '美食家3', link: '/products/meishijia-3' },
          { name: '思迅食通天', link: '/products/shitongtian' },
          { name: '天店·餐饮版', link: '/products/tiandian-canyin' },
        ],
        link: '/solutions/huoguo',
      },
      {
        title: '汉堡/炸鸡',
        tagsRow1: ['叫号取餐', '外卖聚合', '套餐换购'],
        tagsRow2: ['效期预警', '会员积分'],
        products: [
          { name: '美食家3', link: '/products/meishijia-3' },
          { name: '食通天8', link: '/products/shitongtian-8' },
          { name: '天店·小吃版', link: '/products/tiandian-xiaochi' },
        ],
        link: '/solutions/kuaican',
      },
      {
        title: '奶茶/咖啡',
        tagsRow1: ['糖度冰度', '加料管理', '会员积分'],
        tagsRow2: ['小程序点单', '外卖对接'],
        products: [
          { name: '烘焙之星', link: '/products/hongbei' },
          { name: '思迅咖啡通', link: '/products/kafeitong' },
          { name: '天店·星锐', link: '/products/tiandian-xingrui' },
        ],
        link: '/solutions/naicha',
      },
      {
        title: '小吃档口',
        tagsRow1: ['档口管理', '统一收银', '分账结算'],
        tagsRow2: ['营业报表', '会员营销'],
        products: [
          { name: '美食家3', link: '/products/meishijia-3' },
          { name: '食通天8', link: '/products/shitongtian-8' },
          { name: '天店·小吃版', link: '/products/tiandian-xiaochi' },
        ],
        link: '/solutions/xiaochi',
      },
    ],
  },
  {
    key: 'o2o',
    label: 'O2O全域配套',
    items: [
      {
        title: '零售通用',
        tagsRow1: ['自助收银', '电子价签', '智能货架'],
        tagsRow2: ['客流分析', '会员营销'],
        products: [
          { name: '思迅微商店', link: '/products/weishangdian' },
          { name: '小程序商城', link: '/products/miniprogram-mall' },
          { name: 'O2O商城', link: '/products/o2o-mall' },
        ],
        link: '/solutions/xiaochengxu',
      },
      {
        title: '餐饮/外卖',
        tagsRow1: ['美团饿了么', '自动接单', '后厨分单'],
        tagsRow2: ['配送调度', '聚合管理'],
        products: [
          { name: '外卖管家', link: '/products/waimai-manager' },
          { name: '会员营销系统', link: '/products/member-marketing' },
          { name: '思迅商圈', link: '/products/shangquan' },
        ],
        link: '/solutions/waimai',
      },
      {
        title: '全渠道/会员',
        tagsRow1: ['积分通兑', '等级权益', '储值营销'],
        tagsRow2: ['精准发券', '私域运营'],
        products: [
          { name: '全渠道零售', link: '/products/omni-channel' },
          { name: '直播通', link: '/products/zhibotong' },
          { name: 'O2O平台版', link: '/products/o2o-platform' },
        ],
        link: '/solutions/huiyuan',
      },
    ],
  },
];

// ======================= 图标 =======================

const CartIcon = () => (
  <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="36" height="36" rx="12" fill="#D9D9D9" />
    <path d="M10 12h3.2l2.4 12h11.6l2.4-8H13.2" stroke="#1D2233" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="16" cy="28" r="1.8" fill="#1D2233" />
    <circle cx="25" cy="28" r="1.8" fill="#1D2233" />
  </svg>
);

// ======================= 子组件 =======================

const SolutionCard = ({ item }: { item: SolutionItem }) => {
  const [hovered, setHovered] = useState(false);
  const [btn1Hover, setBtn1Hover] = useState(false);
  const [btn2Hover, setBtn2Hover] = useState(false);
  const navigate = useNavigate();

  const btnBaseStyle: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    columnGap: '10px',
    borderRadius: '8px',
    height: '56px',
    cursor: 'pointer',
    fontFamily: FONT_FAMILY,
    transition: 'all 200ms ease',
    textDecoration: 'none',
    boxSizing: 'border-box',
  };

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => navigate(item.link)}
      style={{
        position: 'relative',
        width: '460px',
        height: '447px',
        borderRadius: '16px',
        overflow: 'hidden',
        cursor: 'pointer',
        transition: 'all 200ms ease',
        boxShadow: hovered ? '0px 8px 30px 0px #0068eb1a' : 'none',
        border: hovered ? '1px solid #0D99FF' : '1px solid transparent',
        flexShrink: 0,
        boxSizing: 'border-box',
      }}
    >
      {/* Container - 灰色背景卡片主体（展位图，后期替换为真实图片） */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'flex-end',
          borderRadius: '16px',
          background: '#D9D9D9',
          /* 如需替换为图片背景，请取消下方注释并设置图片地址 */
          // backgroundImage: 'url(/images/solution-card-placeholder.jpg)',
          // backgroundSize: 'cover',
          // backgroundPosition: 'center',
          paddingTop: '160px',
          width: '100%',
          height: '100%',
          rowGap: '10px',
          boxSizing: 'border-box',
        }}
      >
        {/* tagContainer - 底部毛玻璃信息区 */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            flexShrink: 0,
            alignItems: 'flex-start',
            alignSelf: 'stretch',
            justifyContent: 'center',
            borderRadius: '16px',
            background: 'rgba(255,255,255,0.7)',
            padding: '30px',
            rowGap: '20px',
            backdropFilter: 'blur(5px)',
            boxSizing: 'border-box',
          }}
        >
          {/* cardHeader - 图标 + 标题 */}
          <div
            style={{
              display: 'inline-flex',
              flexShrink: 0,
              alignItems: 'center',
              alignSelf: 'stretch',
              columnGap: '10px',
            }}
          >
            <div
              style={{
                display: 'flex',
                flexShrink: 0,
                alignItems: 'center',
                justifyContent: 'center',
                columnGap: '10px',
                borderRadius: '12px',
                background: '#D9D9D9',
                padding: '6px',
              }}
            >
              <CartIcon />
            </div>
            <p
              style={{
                flexShrink: 0,
                lineHeight: '41px',
                letterSpacing: 0,
                color: '#1D2233',
                fontFamily: FONT_FAMILY,
                fontSize: '28px',
                fontWeight: 400,
                margin: 0,
              }}
            >
              {item.title}
            </p>
          </div>

          {/* tagGroup2 - 标签组 */}
          <div
            style={{
              display: 'inline-flex',
              flexDirection: 'column',
              flexShrink: 0,
              alignItems: 'flex-start',
              alignSelf: 'stretch',
              rowGap: '10px',
            }}
          >
            {/* tagGroup - 第一行标签 */}
            <div
              style={{
                display: 'flex',
                flexShrink: 0,
                alignItems: 'center',
                columnGap: '16px',
                width: '400px',
              }}
            >
              {item.tagsRow1.map((t) => (
                <div
                  key={t}
                  style={{
                    display: 'inline-flex',
                    flexShrink: 0,
                    alignItems: 'center',
                    justifyContent: 'center',
                    columnGap: '16px',
                    border: '1px solid #D9D9D9',
                    borderRadius: '8px',
                    padding: '9px',
                  }}
                >
                  <p
                    style={{
                      flexShrink: 0,
                      lineHeight: '20px',
                      letterSpacing: 0,
                      color: '#1D2233',
                      fontFamily: FONT_FAMILY,
                      fontSize: '14px',
                      margin: 0,
                    }}
                  >
                    {t}
                  </p>
                </div>
              ))}
            </div>

            {/* tagItem3 - 第二行标签 */}
            <div
              style={{
                display: 'flex',
                flexShrink: 0,
                alignItems: 'flex-start',
                columnGap: '16px',
                width: '400px',
              }}
            >
              {item.tagsRow2.map((t) => (
                <div
                  key={t}
                  style={{
                    display: 'inline-flex',
                    flexShrink: 0,
                    alignItems: 'center',
                    justifyContent: 'center',
                    columnGap: '10px',
                    border: '1px solid #D9D9D9',
                    borderRadius: '8px',
                    padding: '9px',
                  }}
                >
                  <p
                    style={{
                      flexShrink: 0,
                      lineHeight: '20px',
                      letterSpacing: 0,
                      color: '#1D2233',
                      fontFamily: FONT_FAMILY,
                      fontSize: '14px',
                      margin: 0,
                    }}
                  >
                    {t}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* lineDivider - 分隔线（hover 显示） */}
          <div
            style={{
              display: hovered ? 'flex' : 'none',
              flexShrink: 0,
              background: '#D9D9D9',
              width: '400px',
              height: '1px',
              transition: 'opacity 200ms ease',
            }}
          />

          {/* additionalInfo - 适配产品 + 按钮（hover 显示） */}
          <div
            style={{
              display: hovered ? 'inline-flex' : 'none',
              flexDirection: 'column',
              flexShrink: 0,
              alignItems: 'flex-start',
              alignSelf: 'stretch',
              rowGap: '30px',
            }}
          >
            {/* 适配产品 */}
            <div
              style={{
                display: 'inline-flex',
                flexShrink: 0,
                alignItems: 'flex-start',
                alignSelf: 'stretch',
                columnGap: '10px',
              }}
            >
              <p
                style={{
                  flexShrink: 0,
                  lineHeight: '24px',
                  letterSpacing: 0,
                  color: '#1D2233',
                  fontFamily: FONT_FAMILY,
                  fontSize: '20px',
                  margin: 0,
                }}
              >
                适配产品：
              </p>
              <div
                style={{
                  display: 'inline-flex',
                  flexShrink: 0,
                  alignItems: 'center',
                  columnGap: '20px',
                }}
              >
                {item.products.map((p) => (
                  <a
                    key={p.name}
                    href={p.link}
                    onClick={(e) => e.stopPropagation()}
                    style={{
                      flexShrink: 0,
                      lineHeight: '26px',
                      letterSpacing: 0,
                      color: '#0068EB',
                      fontFamily: FONT_FAMILY,
                      fontSize: '18px',
                      textDecoration: 'none',
                    }}
                    onMouseEnter={(e) => { (e.target as HTMLElement).style.textDecoration = 'underline'; }}
                    onMouseLeave={(e) => { (e.target as HTMLElement).style.textDecoration = 'none'; }}
                  >
                    {p.name}
                  </a>
                ))}
              </div>
            </div>

            {/* 按钮组 */}
            <div
              style={{
                display: 'inline-flex',
                flexShrink: 0,
                alignItems: 'center',
                alignSelf: 'stretch',
                columnGap: '30px',
              }}
            >
              <a
                href={item.link}
                onClick={(e) => e.stopPropagation()}
                onMouseEnter={() => setBtn1Hover(true)}
                onMouseLeave={() => setBtn1Hover(false)}
                style={{
                  ...btnBaseStyle,
                  border: '1px solid #D9D9D9',
                  background: btn1Hover ? '#0D99FF' : '#FFFFFF',
                  color: btn1Hover ? '#FFFFFF' : '#1D2233',
                  padding: '13px 29px',
                  fontSize: '20px',
                  lineHeight: '29px',
                }}
              >
                了解详情
              </a>
              <a
                href="http://www.sixuneshop.com.cn/index.html"
                onClick={(e) => e.stopPropagation()}
                onMouseEnter={() => setBtn2Hover(true)}
                onMouseLeave={() => setBtn2Hover(false)}
                style={{
                  ...btnBaseStyle,
                  border: '1px solid #D9D9D9',
                  background: btn2Hover ? '#0D99FF' : '#FFFFFF',
                  color: btn2Hover ? '#FFFFFF' : '#1D2233',
                  padding: '13px 29px',
                  fontSize: '20px',
                  lineHeight: '29px',
                }}
              >
                获取方案
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ======================= 主组件 =======================

const SolutionsPage = () => {
  const [activeTab, setActiveTab] = useState('retail');
  const sectionRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const [tabBarFixed, setTabBarFixed] = useState(false);

  // 监听滚动，实现 tab bar 吸顶
  useEffect(() => {
    const handleScroll = () => {
      setTabBarFixed(window.scrollY > 480);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (key: string) => {
    setActiveTab(key);
    const el = sectionRefs.current[key];
    if (el) {
      const headerOffset = 192;
      const top = el.getBoundingClientRect().top + window.scrollY - headerOffset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  // 监听各 section 进入视口，自动高亮对应 tab
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const key = entry.target.getAttribute('data-section-key');
            if (key) setActiveTab(key);
          }
        });
      },
      { rootMargin: '-192px 0px -60% 0px', threshold: 0 }
    );

    Object.values(sectionRefs.current).forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div style={{ width: '100%', paddingTop: '100px', background: '#FFFFFF' }}>
      {/* ======================= Hero Banner (Figma 587_3453) ======================= */}
      <section
        style={{
          position: 'relative',
          width: '100%',
          background: '#F5F6F7',
          padding: '0 240px',
          boxSizing: 'border-box',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          rowGap: '60px',
          height: '480px',
          overflow: 'hidden',
        }}
      >
        {/* 背景图占位（后期替换）：如需添加背景图，请取消下方 style 的注释并替换图片地址 */}
        {/* <div style={{
          position: 'absolute', inset: 0, zIndex: 0,
          backgroundImage: 'url(/images/solutions-banner-bg.jpg)',
          backgroundSize: 'cover', backgroundPosition: 'center'
        }} /> */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            flexShrink: 0,
            alignItems: 'center',
            alignSelf: 'stretch',
            rowGap: '20px',
          }}
        >
          <h1
            style={{
              margin: 0,
              padding: '10px 0',
              overflow: 'hidden',
              lineHeight: '70px',
              letterSpacing: 0,
              color: '#1D2233',
              fontFamily: FONT_FAMILY,
              fontSize: '48px',
              fontWeight: 400,
              textAlign: 'center',
            }}
          >
            思迅新零售行业解决方案
          </h1>
          <p
            style={{
              margin: 0,
              flexShrink: 0,
              width: '1107px',
              maxWidth: '100%',
              textAlign: 'center',
              lineHeight: '40px',
              letterSpacing: 0,
              color: '#1D2233',
              fontFamily: FONT_FAMILY,
              fontSize: '24px',
            }}
          >
            26 年深耕零售数字化，为超过 60 万门店提供智能收银、门店管理、供应链协同一站式解决方案
          </p>
        </div>

        <div
          style={{
            display: 'inline-flex',
            flexShrink: 0,
            alignItems: 'center',
            alignSelf: 'stretch',
            justifyContent: 'center',
            columnGap: '10px',
          }}
        >
          <a
            href="#"
            style={{
              display: 'inline-flex',
              flexShrink: 0,
              alignItems: 'center',
              justifyContent: 'center',
              columnGap: '10px',
              border: '1px solid #0D99FF',
              borderRadius: '8px',
              background: '#FFFFFF',
              padding: '13px 29px',
              height: '56px',
              textDecoration: 'none',
              cursor: 'pointer',
            }}
          >
            <span
              style={{
                flexShrink: 0,
                lineHeight: '24px',
                letterSpacing: 0,
                color: '#0D99FF',
                fontFamily: FONT_FAMILY,
                fontSize: '20px',
              }}
            >
              申请免费试用
            </span>
          </a>
        </div>
      </section>

      {/* ======================= Tab Navigation (Figma 598_6843) ======================= */}
      <div
        style={{
          width: '100%',
          background: '#FFFFFF',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: tabBarFixed ? 'fixed' : 'relative',
          top: tabBarFixed ? '100px' : 'auto',
          left: 0,
          right: 0,
          zIndex: 80,
          boxShadow: tabBarFixed ? '0px 4px 20px rgba(160,163,170,0.1)' : 'none',
        }}
      >
        <div
          style={{
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            width: '1440px',
            height: '91px',
          }}
        >
          {/* 底部分隔线 */}
          <div
            style={{
              position: 'absolute',
              top: '89px',
              left: 0,
              flexShrink: 0,
              background: '#D9D9D9',
              width: '1440px',
              height: '2px',
            }}
          />

          {SECTIONS.map((section, idx) => {
            const isActive = activeTab === section.key;
            return (
              <div
                key={section.key}
                onClick={() => scrollToSection(section.key)}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  flexShrink: 0,
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: isActive ? '30px 20px 0px' : '30px 0px 32px',
                  width: '360px',
                  height: '91px',
                  cursor: 'pointer',
                  rowGap: isActive ? '29px' : '0',
                  zIndex: idx + 1,
                }}
              >
                <span
                  style={{
                    flexShrink: 0,
                    textAlign: 'center',
                    lineHeight: '29px',
                    letterSpacing: 0,
                    color: isActive ? '#0068EB' : '#1D2233',
                    fontFamily: FONT_FAMILY,
                    fontSize: '24px',
                    fontWeight: 700,
                  }}
                >
                  {section.label}
                </span>
                {isActive && (
                  <div
                    style={{
                      flexShrink: 0,
                      background: '#0068EB',
                      width: '100px',
                      height: '3px',
                    }}
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* 占位，防止吸顶时内容跳动 */}
      {tabBarFixed && <div style={{ height: '91px' }} />}

      {/* ======================= Sections ======================= */}
      <div
        style={{
          width: '100%',
          maxWidth: '1440px',
          margin: '0 auto',
          padding: '60px 0 100px',
          boxSizing: 'border-box',
          display: 'flex',
          flexDirection: 'column',
          rowGap: '80px',
        }}
      >
        {SECTIONS.map((section) => (
          <div
            key={section.key}
            ref={(el) => { sectionRefs.current[section.key] = el; }}
            data-section-key={section.key}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              rowGap: '40px',
              width: '100%',
            }}
          >
            {/* 区域标题 */}
            <div style={{ display: 'flex', alignItems: 'center', columnGap: '12px' }}>
              <div
                style={{
                  width: '4px',
                  height: '24px',
                  background: '#0D99FF',
                  borderRadius: '2px',
                }}
              />
              <h2
                style={{
                  margin: 0,
                  fontFamily: FONT_FAMILY,
                  fontSize: '28px',
                  fontWeight: 400,
                  lineHeight: '40px',
                  color: '#1D2233',
                }}
              >
                {section.label}
              </h2>
            </div>

            {/* 卡片网格 */}
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '30px',
                width: '100%',
              }}
            >
              {section.items.map((item) => (
                <SolutionCard key={item.title} item={item} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SolutionsPage;
