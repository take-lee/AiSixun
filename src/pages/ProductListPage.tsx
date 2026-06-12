import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const FONT_FAMILY =
  '"Noto Sans SC", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", SimHei, Arial, Helvetica, sans-serif';

// =============================
// 类型与数据（按 Figma 列分组）
// =============================

interface Product {
  title: string;
  desc: string;
  link: string;
}

interface CategoryData {
  id: string;
  label: string;
  title: string;
  columns: Product[][];
}

const categories: CategoryData[] = [
  {
    id: 'supermarket',
    label: '商超百货',
    title: '商超百货：Ai 赋能商超全渠道数字化收银',
    columns: [
      [
        { title: '商云 | 智选', desc: '中小商超 SaaS 轻量化管理', link: '/products/shangyun-zhixuan' },
        { title: '商锐', desc: '复合型商超一体化管理', link: '/products/shangrui' },
        { title: '汇客 | 零售', desc: '小微零食社区店收银', link: '/products/huike-retail' },
      ],
      [
        { title: '思迅商旗', desc: '大中型连锁商超管理', link: '/products/sixun-shangqi' },
        { title: '商云', desc: '经典大中型商超系统', link: '/products/shangyun' },
        { title: '天店·星锐', desc: '中大型生鲜商超管理', link: '/products/tiandian-xingrui' },
      ],
      [
        { title: '商慧', desc: '新零售多业态卖场方案', link: '/products/shanghui' },
        { title: '天店·星云', desc: '连锁商超 SaaS 管理', link: '/products/tiandian-xingyun' },
      ],
    ],
  },
  {
    id: 'fresh',
    label: '生鲜零售',
    title: '生鲜零售：Ai 智能称重与生鲜全链路管理',
    columns: [
      [{ title: 'eShop 小象', desc: '生鲜果蔬门店专用', link: '/products/eshop-xiaoxiang' }],
      [{ title: 'eShop 小牛', desc: '生鲜便利连锁管控', link: '/products/eshop-xiaoniu' }],
    ],
  },
  {
    id: 'specialty',
    label: '专卖便利',
    title: '专卖便利：SaaS 轻量收银与精准会员营销',
    columns: [
      [
        { title: 'eShop 考拉', desc: '母婴门店专属系统', link: '/products/eshop-kaola' },
        { title: '天店·星耀', desc: '零食美妆专卖管理', link: '/products/tiandian-xingyao' },
      ],
      [
        { title: 'eShop 商业 5', desc: '全品类专卖连锁管理', link: '/products/eshop-shangye-5' },
        { title: '服装之星', desc: '服饰鞋帽门店管理', link: '/products/fuzhuang-zhixing' },
      ],
      [
        { title: 'e 店通', desc: '全品类精品专卖店管理', link: '/products/edian-tong' },
        { title: '医药之星', desc: '连锁药店合规管理', link: '/products/yiyao-zhixing' },
      ],
    ],
  },
  {
    id: 'catering',
    label: '餐饮娱乐',
    title: '餐饮娱乐：扫码点餐与后厨协同智能收银',
    columns: [
      [
        { title: '美食家汇食客', desc: '连锁餐饮云端管控', link: '/products/meishijia-huishike' },
        { title: '汇客 | 餐饮', desc: '小微餐饮店收银', link: '/products/huike-canyin' },
      ],
      [{ title: '食通天', desc: '中餐酒楼收银管理', link: '/products/shitongtian' }],
      [{ title: '美食家 3', desc: '连锁餐企数智经营', link: '/products/meishijia-3' }],
    ],
  },
  {
    id: 'bakery',
    label: '烘焙茶饮',
    title: '烘焙茶饮：配方BOM管理与效期智能预警',
    columns: [[{ title: '烘焙 e 家', desc: '烘焙蛋糕门店管控', link: '/products/hongbei-ejia' }]],
  },
  {
    id: 'o2o',
    label: 'O2O全域',
    title: 'O2O全域：全域订单聚合与全渠道数据互通',
    columns: [
      [
        { title: '微商店', desc: '门店私域线上商城', link: '/products/weishangdian' },
        { title: '移动 POS', desc: '随身移动营业收银', link: '/products/yidong-pos' },
        { title: 'sixunPay', desc: '门店一站式聚合收款', link: '/products/sixunpay' },
        { title: '商云管家', desc: '手机远程管理门店', link: '/products/shangyun-guanjia' },
      ],
      [
        { title: '微小店', desc: '小微门店小程序开店', link: '/products/weixiaodian' },
        { title: '微 POS', desc: '移动收银开单结算', link: '/products/weipos' },
        { title: '自助收银', desc: '门店无人自助结账', link: '/products/zizhu-shouyin' },
        { title: '商云助手', desc: '移动端实时管店', link: '/products/shangyun-zhushou' },
      ],
      [
        { title: '微餐厅', desc: '餐饮扫码点餐外卖', link: '/products/weicanting' },
        { title: '安卓海狮 POS', desc: '安卓收银一体机', link: '/products/anzuo-haishi-pos' },
        { title: '智管家', desc: '门店移动办公管控', link: '/products/zhiguanjia' },
        { title: '店 e 宝', desc: '外勤随时随地开单', link: '/products/dian-ebao' },
      ],
    ],
  },
];

// =============================
// 产品卡片组件
// =============================

const ProductCard = ({ product }: { product: Product }) => {
  const [hovered, setHovered] = useState(false);
  const navigate = useNavigate();

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => navigate(product.link)}
      style={{
        display: 'flex',
        alignItems: 'flex-start',
        columnGap: '10px',
        borderRadius: '16px',
        padding: '20px',
        width: '350px',
        height: '106px',
        cursor: 'pointer',
        transition: 'all 200ms ease',
        boxSizing: 'border-box',
        border: hovered ? '1px solid #0d99ff' : '1px solid transparent',
        backgroundColor: hovered ? '#ffffff' : 'transparent',
        boxShadow: hovered ? '0px 4px 20px 0px rgba(0,104,235,0.1)' : 'none',
      }}
    >
      {/* Frame 3 图标背景 */}
      <div
        style={{
          display: 'flex',
          flexShrink: 0,
          alignItems: 'flex-start',
          columnGap: '10px',
          borderRadius: '16px',
          backgroundColor: '#0d99ff',
          padding: '4px',
          width: '48px',
          height: '48px',
          boxSizing: 'border-box',
        }}
      >
        <img
          src="/image/nav-product-icon.svg"
          alt=""
          style={{
            width: '40px',
            height: '40px',
            flexShrink: 0,
            overflow: 'hidden',
          }}
        />
      </div>
      {/* 产品名 + 描述 */}
      <div
        style={{
          display: 'inline-flex',
          flexDirection: 'column',
          flexShrink: 0,
          alignItems: 'center',
          rowGap: '10px',
        }}
      >
        <span
          style={{
            fontFamily: FONT_FAMILY,
            fontSize: '20px',
            fontWeight: 700,
            letterSpacing: 0,
            color: '#1d2233',
            alignSelf: 'stretch',
          }}
        >
          {product.title}
        </span>
        <span
          style={{
            fontFamily: FONT_FAMILY,
            fontSize: '16px',
            opacity: 0.6,
            color: '#1d2233',
            width: '252px',
            overflow: 'hidden',
            display: '-webkit-box',
            WebkitLineClamp: 1,
            WebkitBoxOrient: 'vertical',
          }}
        >
          {product.desc}
        </span>
      </div>
    </div>
  );
};

// =============================
// 分类产品区块渲染
// =============================

const CategorySection = ({
  category,
  index,
  setRef,
}: {
  category: CategoryData;
  index: number;
  setRef: (el: HTMLDivElement | null, idx: number) => void;
}) => {
  const isBakery = category.id === 'bakery';

  return (
    <div
      ref={(el) => setRef(el, index)}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        alignSelf: 'stretch',
        rowGap: '20px',
        padding: '30px 0px',
        paddingBottom: index === categories.length - 1 ? '40px' : '30px',
      }}
    >
      {/* Department Product Description */}
      <p
        style={{
          flexShrink: 0,
          opacity: 0.6,
          lineHeight: '29px',
          letterSpacing: 0,
          color: '#1d2233',
          fontFamily: FONT_FAMILY,
          fontSize: '20px',
        }}
      >
        {category.title}
      </p>

      {/* 分割线 */}
      <div
        style={{
          flexShrink: 0,
          background: '#d9d9d9',
          width: '1110px',
          height: '2px',
        }}
      />

      {/* 产品列表 */}
      {isBakery ? (
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-start',
            columnGap: '10px',
            padding: '20px',
            width: '1100px',
          }}
        >
          <ProductCard product={category.columns[0][0]} />
        </div>
      ) : (
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-start',
            alignSelf: 'stretch',
            justifyContent: 'space-between',
            minWidth: '1110px',
          }}
        >
          {category.columns.map((col, ci) => (
            <div
              key={ci}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                alignSelf: 'stretch',
              }}
            >
              {col.map((p, pi) => (
                <div
                  key={p.title}
                  style={{ marginTop: pi === 0 ? 0 : '20px' }}
                >
                  <ProductCard product={p} />
                </div>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// =============================
// 主页面
// =============================

const ProductListPage = () => {
  const [activeNav, setActiveNav] = useState(0);
  const [buttonHovered, setButtonHovered] = useState(false);

  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);
  const navigate = useNavigate();

  // 滚动：联动高亮
  useEffect(() => {
    const handleScroll = () => {
      const triggerY = window.scrollY + 120;
      let current = 0;
      for (let i = 0; i < sectionRefs.current.length; i++) {
        const ref = sectionRefs.current[i];
        if (ref) {
          const offsetTop = ref.getBoundingClientRect().top + window.scrollY;
          if (triggerY >= offsetTop) {
            current = i;
          }
        }
      }
      setActiveNav(current);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (index: number) => {
    const ref = sectionRefs.current[index];
    if (ref) {
      const offsetTop = ref.getBoundingClientRect().top + window.scrollY - 120;
      window.scrollTo({ top: offsetTop, behavior: 'smooth' });
      setActiveNav(index);
    }
  };

  const setSectionRef = (el: HTMLDivElement | null, idx: number) => {
    sectionRefs.current[idx] = el;
  };

  return (
    <div style={{ width: '100%', paddingTop: '100px' }}>
      {/* ====== Hero Section Frame ====== */}
      <section
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#f5f6f7',
          width: '100%',
          height: '420px',
          rowGap: '40px',
        }}
      >
        {/* Banner Section Frame */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            rowGap: '20px',
          }}
        >
          <p
            style={{
              padding: '10px 0',
              overflow: 'hidden',
              lineHeight: '70px',
              letterSpacing: 0,
              color: '#1d2233',
              fontFamily: FONT_FAMILY,
              fontSize: '48px',
              fontWeight: 700,
            }}
          >
            全业态 AI 收银系统
          </p>
          <p
            style={{
              width: '1107px',
              textAlign: 'center',
              lineHeight: '40px',
              letterSpacing: 0,
              color: '#1d2233',
              fontFamily: FONT_FAMILY,
              fontSize: '24px',
            }}
          >
            26 年深耕零售数字化，为超过 60
            万门店提供智能收银、门店管理、供应链协同一站式解决方案
          </p>
        </div>

        {/* Categories Container / CTA 按钮 */}
        <div
          onMouseEnter={() => setButtonHovered(true)}
          onMouseLeave={() => setButtonHovered(false)}
          onClick={() => navigate('/contact')}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            columnGap: '10px',
            border: '1px solid #0d99ff',
            borderRadius: '8px',
            background: buttonHovered ? '#0d99ff' : '#ffffff',
            padding: '13px 29px',
            width: '180px',
            height: '56px',
            cursor: 'pointer',
            transition: 'all 200ms ease',
          }}
        >
          <p
            style={{
              lineHeight: '29px',
              letterSpacing: 0,
              color: buttonHovered ? '#ffffff' : '#0d99ff',
              fontFamily: FONT_FAMILY,
              fontSize: '20px',
              margin: 0,
            }}
          >
            申请免费试用
          </p>
        </div>
      </section>

      {/* ====== Main Content: 左侧导航 + 右侧产品列表 ====== */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          width: '100%',
          minWidth: '1440px',
          margin: '0 auto',
          boxSizing: 'border-box',
        }}
      >
        {/* 左侧导航 —— 使用 sticky 实现固定 */}
        <div style={{ width: '300px', flexShrink: 0 }}>
          <aside
            style={{
              width: '300px',
              position: 'sticky',
              top: '100px',
              height: 'fit-content',
              padding: '0',
              zIndex: 10,
            }}
          >
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
              }}
            >
              {categories.map((cat, i) => {
                const isActive = activeNav === i;
                return (
                  <div
                    key={cat.id}
                    onClick={() => handleNavClick(i)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      alignSelf: 'stretch',
                      columnGap: '26px',
                      padding: '15px 0px 15px 30px',
                      cursor: 'pointer',
                      backgroundColor: isActive
                        ? 'rgba(13,153,255,0.16)'
                        : 'transparent',
                      transition: 'background-color 200ms ease',
                      position: 'relative',
                    }}
                  >
                    {isActive && (
                      <div
                        style={{
                          position: 'absolute',
                          left: 0,
                          top: '50%',
                          transform: 'translateY(-50%)',
                          width: '4px',
                          height: '40px',
                          backgroundColor: '#0d99ff',
                          flexShrink: 0,
                          borderRadius: '0 2px 2px 0',
                        }}
                      />
                    )}
                    <span
                      style={{
                        fontFamily: FONT_FAMILY,
                        fontSize: '18px',
                        lineHeight: '26px',
                        color: '#1d2233',
                        fontWeight: isActive ? 700 : 400,
                        transition: 'font-weight 200ms ease',
                      }}
                    >
                      {cat.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </aside>
        </div>

        {/* Frame 31 - 右侧产品列表 */}
        <main
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            width: '1140px',
            flexShrink: 0,
            padding: '0px 0px 60px 30px',
            rowGap: '30px',
            boxSizing: 'border-box',
          }}
        >
          {categories.map((cat, i) => (
            <CategorySection
              key={cat.id}
              category={cat}
              index={i}
              setRef={setSectionRef}
            />
          ))}
        </main>
      </div>
    </div>
  );
};

export default ProductListPage;
