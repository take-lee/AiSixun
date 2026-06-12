import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// 解决方案下拉导航 Main container
// Figma: 598_3950
// 左侧：4 个分组 Tab（综合商超零售 / 垂直专卖行业 / 餐饮全业态 / O2O全域配套）
// 右侧：当前分组下的 8 个行业卡片（2 列 × 4 行）

interface Industry {
  title: string;
  desc: string;
  link: string;
}

interface SolutionGroup {
  label: string;
  industries: Industry[];
}

const solutionGroups: SolutionGroup[] = [
  {
    label: '综合商超零售',
    industries: [
      { title: '商超', desc: '集团多仓WMS、业财税一体化、多区域总部管控、高并发收银、全链路数据打通', link: '/solutions/shangchao' },
      { title: '大卖场', desc: '集团多仓WMS、业财税一体化、多区域总部管控、高并发收银、全链路数据打通', link: '/solutions/damaichang' },
      { title: '社区超市', desc: '集团多仓WMS、业财税一体化、多区域总部管控、高并发收银、全链路数据打通', link: '/solutions/shequ' },
      { title: '便利店', desc: '集团多仓WMS、业财税一体化、多区域总部管控、高并发收银、全链路数据打通', link: '/solutions/bianlidian' },
      { title: '生鲜果蔬', desc: '集团多仓WMS、业财税一体化、多区域总部管控、高并发收银、全链路数据打通', link: '/solutions/shengxian' },
      { title: '农贸市场', desc: '集团多仓WMS、业财税一体化、多区域总部管控、高并发收银、全链路数据打通', link: '/solutions/nongmao' },
      { title: '熟食卤味', desc: '集团多仓WMS、业财税一体化、多区域总部管控、高并发收银、全链路数据打通', link: '/solutions/shushi' },
      { title: '零食专卖', desc: '集团多仓WMS、业财税一体化、多区域总部管控、高并发收银、全链路数据打通', link: '/solutions/lingshi' },
    ],
  },
  {
    label: '垂直专卖行业',
    industries: [
      { title: '烟酒专卖', desc: '专卖行业的精品店与连锁店解决方案，支持批次管理、会员营销', link: '/solutions/yanjiu' },
      { title: '母婴玩具', desc: '母婴玩具专卖与连锁，支持 SKU 管理、组合装、促销活动', link: '/solutions/muying' },
      { title: '服装鞋帽', desc: '服装专卖，支持颜色/尺码多维度、门店调拨、会员价', link: '/solutions/fuzhuang' },
      { title: '数码通讯', desc: '手机数码与通讯零售，支持 IMEI 序列号、以旧换新', link: '/solutions/shuma' },
      { title: '家居建材', desc: '家居建材与家居广场，支持家装套餐、送货安装', link: '/solutions/jiaju' },
      { title: '文体办公', desc: '文体办公、办公用品批发与零售', link: '/solutions/wenti' },
      { title: '鲜花礼品', desc: '鲜花店、礼品店，支持节日套餐、会员营销', link: '/solutions/xianhua' },
      { title: '宠物用品', desc: '宠物店、宠物用品，支持服务预约、会员积分', link: '/solutions/chongwu' },
    ],
  },
  {
    label: '餐饮全业态',
    industries: [
      { title: '正餐酒楼', desc: '包厢管理、点餐出单、厨打、结账一体化', link: '/solutions/zhengcan' },
      { title: '快餐连锁', desc: '快餐品牌连锁，支持堂食、外带、外卖聚合', link: '/solutions/kuaican' },
      { title: '火锅连锁', desc: '火锅品牌连锁，支持锅底管理、自助点餐', link: '/solutions/huoguo' },
      { title: '烘焙茶饮', desc: '烘焙坊、茶饮奶茶，配方管理、中央工厂', link: '/solutions/hongbei' },
      { title: '咖啡厅', desc: '精品咖啡、连锁咖啡馆，支持扫码点单', link: '/solutions/kafei' },
      { title: '酒吧 KTV', desc: '酒吧、KTV，支持夜场消费、套餐房态', link: '/solutions/jiuba' },
      { title: '酒店', desc: '酒店前台管理、房态管理、消费账单一站式', link: '/solutions/jiudian' },
      { title: '美食广场', desc: '美食广场档口、统一收银、档口分账', link: '/solutions/meishi' },
    ],
  },
  {
    label: 'O2O全域配套',
    industries: [
      { title: '小程序商城', desc: '小程序商城与会员营销无缝对接，支持门店自提、外卖配送', link: '/solutions/xiaochengxu' },
      { title: '外卖平台', desc: '饿了么/美团外卖平台对接，统一订单管理', link: '/solutions/waimai' },
      { title: '会员营销', desc: '会员积分、储值、券包、等级体系', link: '/solutions/huiyuan' },
      { title: '私域运营', desc: '企业微信、社群营销、导购提成', link: '/solutions/siyu' },
      { title: '扫码购', desc: '顾客自助扫码支付、免排队', link: '/solutions/saomagou' },
      { title: '拼团秒杀', desc: '线上拼团、秒杀、限时特价', link: '/solutions/pintuan' },
      { title: '配送调度', desc: '同城配送调度、达达/顺丰同城对接', link: '/solutions/peisong' },
      { title: '全渠道库存', desc: '线上线下库存实时同步、全渠道一盘货', link: '/solutions/ququdao' },
    ],
  },
];

const fontFamily =
  '"Noto Sans SC", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", SimHei, Arial, Helvetica, sans-serif';

interface SolutionDropdownProps {
  onNavigate?: () => void;
}

const SolutionDropdown = ({ onNavigate }: SolutionDropdownProps) => {
  const [activeGroup, setActiveGroup] = useState(0);
  const [hoverViewAll, setHoverViewAll] = useState(false);
  const navigate = useNavigate();

  const activeIndustries = solutionGroups[activeGroup].industries;
  const rows: Industry[][] = [];
  for (let i = 0; i < activeIndustries.length; i += 2) {
    rows.push(activeIndustries.slice(i, i + 2));
  }

  const handleViewAll = () => {
    if (onNavigate) onNavigate();
    navigate('/solutions');
  };

  const handleIndustryClick = (link: string) => {
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
            {solutionGroups.map((group, i) => {
              const isActive = activeGroup === i;
              const isLast = i === solutionGroups.length - 1;
              return (
                <div
                  key={group.label}
                  onMouseEnter={() => setActiveGroup(i)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    alignSelf: 'stretch',
                    columnGap: '26px',
                    padding: isActive
                      ? '10px 0'
                      : isLast
                        ? '15px 161px 19px 30px'
                        : '15px 162px 19px 30px',
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
                    {group.label}
                  </span>
                </div>
              );
            })}
          </div>

          {/* 查看所有方案 */}
          <div
            onMouseEnter={() => setHoverViewAll(true)}
            onMouseLeave={() => setHoverViewAll(false)}
            onClick={handleViewAll}
            style={{
              display: 'flex',
              alignItems: 'center',
              alignSelf: 'stretch',
              justifyContent: 'space-between',
              padding: '15px 100px 15px 30px',
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
              查看所有方案
            </span>
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              style={{
                flexShrink: 0,
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

        {/* 右侧：行业卡片区 (Content container) */}
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
                {rowItems.map((ind) => (
                  <IndustryCard
                    key={ind.title}
                    industry={ind}
                    onClick={() => handleIndustryClick(ind.link)}
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

/* Industry 行业卡片 */
const IndustryCard = ({
  industry,
  onClick,
}: {
  industry: Industry;
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
        width: '540px',
        height: '106px',
        cursor: 'pointer',
        transition: 'all 200ms ease',
        boxSizing: 'border-box',
        border: hovered ? '1px solid #0d99ff' : '1px solid transparent',
        backgroundColor: hovered ? '#ffffff' : 'transparent',
        boxShadow: hovered ? '0px 4px 20px 0px rgba(0,104,235,0.1)' : 'none',
      }}
    >
      {/* Frame 3 图标 - 使用 nav-product-icon.svg，后期可按行业替换 */}
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
      {/* 行业名 + 描述 */}
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
          {industry.title}
        </span>
        <span
          style={{
            fontFamily,
            fontSize: '16px',
            opacity: 0.6,
            color: '#1d2233',
            width: '422px',
            whiteSpace: 'nowrap',       // 强制单行
            overflow: 'hidden',         // 隐藏溢出
            textOverflow: 'ellipsis',   // 显示省略号
            display: '-webkit-box',
            WebkitLineClamp: 1,
            WebkitBoxOrient: 'vertical',

          }}
        >
          {industry.desc}
        </span>
      </div>
    </div>
  );
};

export default SolutionDropdown;
