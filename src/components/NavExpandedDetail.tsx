import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// 产品中心下拉导航 nav_expanded_detail
// Figma: 573_2381
// 左侧：6 个行业分类 Tab（选中态带 4px 蓝色竖条）
// 右侧：行业描述 + 产品卡片区（每行 3 张卡，共 3 行）

interface Category {
  label: string;
  desc: string;
  products: Product[];
}

interface Product {
  title: string;
  desc: string;
  link: string;
}

const categories: Category[] = [
  {
    label: '商超百货',
    desc: '全品类综合零售、大中型超市、百货商场、综合社区超市，兼顾单店 & 区域连锁',
    products: [
      { title: '商云 | 智选', desc: '中小商超 SaaS 轻量化管理', link: '/products/shangyun-zhixuan' },
      { title: '商锐', desc: '复合型商超一体化管理', link: '/products/shangrui' },
      { title: '汇客 | 零售', desc: '小微零食社区店收银', link: '/products/huike-lingshou' },
      { title: '思迅商旗', desc: '大中型连锁商超管理', link: '/products/sixun-shangqi' },
      { title: '商云', desc: '经典大中型商超系统', link: '/products/shangyun' },
      { title: '天店·星锐', desc: '中大型生鲜商超管理', link: '/products/tiandian-xingrui' },
      { title: '商慧', desc: '新零售多业态卖场方案', link: '/products/shanghui' },
      { title: '天店·星云', desc: '连锁商超 SaaS 管理', link: '/products/tiandian-xingyun' },
    ],
  },
  {
    label: '生鲜零售',
    desc: '连锁生鲜品牌店、菜场店中店，覆盖称重、分拣、加工一体化流程',
    products: [
      { title: '天店·星锐', desc: '中大型生鲜商超管理', link: '/products/tiandian-xingrui' },
      { title: '商云 | 智选', desc: '中小商超 SaaS 轻量化管理', link: '/products/shangyun-zhixuan' },
      { title: '汇客 | 零售', desc: '小微零食社区店收银', link: '/products/huike-lingshou' },
      { title: '思迅商旗', desc: '大中型连锁商超管理', link: '/products/sixun-shangqi' },
      { title: '商慧', desc: '新零售多业态卖场方案', link: '/products/shanghui' },
    ],
  },
  {
    label: '专卖便利',
    desc: '连锁便利店、烟酒专卖、母婴玩具、服装鞋帽、数码通讯等专业零售',
    products: [
      { title: '商云 | 智选', desc: '中小商超 SaaS 轻量化管理', link: '/products/shangyun-zhixuan' },
      { title: '汇客 | 零售', desc: '小微零食社区店收银', link: '/products/huike-lingshou' },
      { title: '天店·星云', desc: '连锁商超 SaaS 管理', link: '/products/tiandian-xingyun' },
      { title: '商锐', desc: '复合型商超一体化管理', link: '/products/shangrui' },
    ],
  },
  {
    label: '餐饮娱乐',
    desc: '正餐酒楼、快餐连锁、火锅店、咖啡厅、酒吧 KTV，前后台一体化',
    products: [
      { title: '思迅美食家', desc: '正餐酒楼一体化管理', link: '/products/meishijia' },
      { title: '思迅快餐王', desc: '快餐连锁高效收银', link: '/products/kuaicanwang' },
      { title: '天店·餐饮', desc: '餐饮 SaaS 云端管理', link: '/products/tiandian-canyin' },
    ],
  },
  {
    label: '烘焙茶饮',
    desc: '烘焙坊、茶饮奶茶、甜品店，支持中央工厂 + 多门店调拨',
    products: [
      { title: '思迅烘焙', desc: '烘焙坊全流程管理', link: '/products/hongbei' },
      { title: '天店·茶饮', desc: '茶饮奶茶连锁管理', link: '/products/tiandian-chayin' },
      { title: '商云 | 智选', desc: '中小商超 SaaS 轻量化管理', link: '/products/shangyun-zhixuan' },
    ],
  },
  {
    label: 'O2O全域',
    desc: '小程序商城、外卖平台对接、会员营销、私域运营、线上线下一体化',
    products: [
      { title: '思迅小店', desc: '小程序商城快速搭建', link: '/products/xiaodian' },
      { title: '思迅会员', desc: '会员营销与私域运营', link: '/products/huiyuan' },
      { title: '商慧', desc: '新零售多业态卖场方案', link: '/products/shanghui' },
      { title: '天店·星云', desc: '连锁商超 SaaS 管理', link: '/products/tiandian-xingyun' },
    ],
  },
];

interface NavExpandedDetailProps {
  onNavigate?: () => void;
}

const fontFamily =
  '"Noto Sans SC", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", SimHei, Arial, Helvetica, sans-serif';

const NavExpandedDetail = ({ onNavigate }: NavExpandedDetailProps) => {
  const [activeCategory, setActiveCategory] = useState(0);
  const [hoverViewAll, setHoverViewAll] = useState(false);
  const navigate = useNavigate();

  const activeProducts = categories[activeCategory].products;
  const rows: Product[][] = [];
  for (let i = 0; i < activeProducts.length; i += 3) {
    rows.push(activeProducts.slice(i, i + 3));
  }

  const handleViewAll = () => {
    if (onNavigate) onNavigate();
    navigate('/products');
  };

  const handleProductClick = (link: string) => {
    if (onNavigate) onNavigate();
    navigate(link);
  };

  return (
    <div
      style={{
        width: '100%',
        maxWidth: '1920px',
        margin: '0 auto',
        height: '620px',
        backgroundColor: 'rgba(255,255,255,0.9)',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        overflow: 'hidden',
        boxSizing: 'border-box',
        borderTop: '1px solid #d9d9d9',
        boxShadow: '0px 8px 30px 0px rgba(29,34,51,0.15)',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'flex-start',
          alignSelf: 'stretch',
          justifyContent: 'space-between',
          paddingRight: '240px',
          paddingLeft: 0,
        }}
      >
        {/* 左侧：分类 Tab 区（宽 540px） */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            paddingBottom: '20px',
            paddingLeft: '240px',
            width: '540px',
            minWidth: '540px',
            height: '620px',
            backgroundImage: 'linear-gradient(90deg, #ffffff 0%, #f5f6f7 100%)',
            boxSizing: 'border-box',
          }}
        >
          {/* 分类 Tab */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              alignSelf: 'stretch',
            }}
          >
            {categories.map((cat, i) => {
              const isActive = activeCategory === i;
              const isLast = i === categories.length - 1;
              return (
                <div
                  key={cat.label}
                  onMouseEnter={() => setActiveCategory(i)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    alignSelf: 'stretch',
                    columnGap: '26px',
                    padding: isActive
                      ? '10px 0'
                      : isLast
                        ? '15px 197px 19px 30px'
                        : '15px 198px 19px 30px',
                    cursor: 'pointer',
                    backgroundColor: isActive ? 'rgba(13,153,255,0.16)' : 'transparent',
                    transition: 'background-color 200ms ease',
                  }}
                >
                  {isActive && (
                    <div
                      style={{
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
                      fontFamily,
                      fontSize: '18px',
                      lineHeight: '26px',
                      color: '#1d2233',
                      fontWeight: 400,
                      transition: 'font-weight 200ms ease',
                      padding: isActive ? '0 0 4px' : '0',
                    }}
                  >
                    {cat.label}
                  </span>
                </div>
              );
            })}
          </div>

          {/* 查看所有产品 */}
          <div
            onMouseEnter={() => setHoverViewAll(true)}
            onMouseLeave={() => setHoverViewAll(false)}
            onClick={handleViewAll}
            style={{
              display: 'flex',
              alignItems: 'center',
              alignSelf: 'stretch',
              justifyContent: 'space-between',
              padding: '15px 100px 14px 30px',
              minWidth: '300px',
              cursor: 'pointer',
            }}
          >
            <span
              style={{
                fontFamily,
                fontSize: '18px',
                lineHeight: '26px',
                color: hoverViewAll ? '#0d99ff' : '#1d2233',
                transition: 'color 200ms ease',
                padding: '2px 0px',
              }}
            >
              查看所有产品
            </span>
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              style={{
                flexShrink: 0,
                //marginTop: '15px',
                transition: 'transform 200ms ease',
                transform: hoverViewAll ? 'translateX(4px)' : 'translateX(0)',
              }}
            >
              <path
                d="M5.52486 3.40383C5.72013 3.20857 6.03663 3.20857 6.2319 3.40383L10.4751 7.64602C10.6703 7.84128 10.6703 8.15878 10.4751 8.35403L6.2319 12.5962C6.03664 12.7914 5.72012 12.7914 5.52486 12.5962C5.32961 12.401 5.32964 12.0844 5.52486 11.8892L9.41256 7.99954L5.52486 4.11086C5.3296 3.9156 5.3296 3.59909 5.52486 3.40383Z"
                fill={hoverViewAll ? '#0d99ff' : '#1d2233'}
              />
            </svg>
          </div>
        </div>

        {/* 右侧：行业描述 + 产品卡片区 (Frame 251) */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            marginTop: '25px',
            rowGap: '25px',
            width: '1110px',
            height: '561px',
          }}
        >
          {/* 行业描述文字 */}
          <p
            style={{
              fontFamily,
              fontSize: '18px',
              lineHeight: '26px',
              color: '#1d2233',
              opacity: 0.6,
              marginLeft:'16px',
              alignSelf: 'stretch',
            }}
          >
            {categories[activeCategory].desc}
          </p>

          <div
            style={{
              alignSelf: 'stretch',
              height: '1px',
              backgroundColor: '#d9d9d9',
              marginLeft:'16px'
            }}
          />

          {/* 产品卡片 (Frame 168) */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              alignSelf: 'stretch',
              height: '457px',
            }}
          >
            {rows.map((rowItems, rowIdx) => (
              <div
                key={rowIdx}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  alignSelf: 'stretch',
                  justifyContent: 'flex-start',
                  marginTop: rowIdx === 0 ? 0 : '20px',
                  paddingRight: 0,
                  paddingLeft: 0,
                }}
              >
                {rowItems.map((product) => (
                  <ProductCard
                    key={product.title}
                    product={product}
                    onClick={() => handleProductClick(product.link)}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

/* Frame 160 产品卡片 */
const ProductCard = ({
  product,
  onClick,
}: {
  product: Product;
  onClick: () => void;
}) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'inline-flex',
        alignItems: 'flex-start',
        columnGap: '20px',
        borderRadius: '16px',
        padding: hovered ? '19px' : '20px',
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
      {/* Frame 3 图标 - 使用 nav-product-icon.svg，后期可按产品替换 */}
      <div
        style={{
          display: 'flex',
          flexShrink: 0,
          alignItems: 'flex-start',
          columnGap: '20px',
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
            fontFamily,
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
            fontFamily,
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

export default NavExpandedDetail;
