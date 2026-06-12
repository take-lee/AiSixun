import { useState } from 'react';

/* ===========================================================
 * 行业解决方案 组件
 * - 对应 Figma: "Main Container" (537_5563) 及其子组件
 * - Title: "行业" (#1D2233) + "解决方案" (#0068eb)
 * - Tab: 圆角胶囊背景 (Rectangle 28/Default 灰色底), 激活态蓝色实心
 * - Container (默认): hero 图 + 毛玻璃信息条 (title + 业态标签)
 * - Main Container (hover): 白底卡片 + 详情布局 + 蓝色描边 + 蓝色阴影
 * - Category (按钮): 默认描边白, hover 蓝底白字
 * - Additional Info Container: 每一个产品为超链接
 * - Popup Overlay: 3 行马卡龙色标签云, 左右虚化, 第1/3行反向缓慢滚动
 * - Frame 48: 小卡片 hover 时切换到 Frame 48 (带阴影)
 * =========================================================== */

// ---------------------- 字体 ----------------------
const FONT_FAMILY =
  '"Noto Sans SC", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", SimHei, Arial, Helvetica, sans-serif';

// ---------------------- 马卡龙配色（与业态一致，小卡片底色） ----------------------
// 每一个业态名 -> { 底色, 文字色, 边框色, 圆点色 }
const MACARON_COLORS: Record<string, { bg: string; text: string; border: string; dot: string }> = {
  // --- 综合商超零售 ---
  '大型综合超市': { bg: '#F5E6FF', text: '#7A3DA1', border: '#E4C8F5', dot: '#B37ADB' },
  '百货商城': { bg: '#FFE9E4', text: '#C6573A', border: '#F5C8BC', dot: '#E08A6E' },
  '乡镇综合卖场': { bg: '#E8F0FF', text: '#3D63C2', border: '#C8D7F5', dot: '#6A8DE0' },
  '母婴生活馆': { bg: '#FFF4D9', text: '#A8791F', border: '#F2DFA3', dot: '#D4AC52' },
  '中型连锁商超': { bg: '#E4F7EF', text: '#2E7D5A', border: '#B6E3CE', dot: '#5FB593' },
  '美业/服务': { bg: '#FFE8F2', text: '#B23A78', border: '#F2BED9', dot: '#D975AA' },
  '生鲜超市': { bg: '#E4F7EF', text: '#2E7D5A', border: '#B6E3CE', dot: '#5FB593' },
  '烘焙茶饮': { bg: '#FFF4D9', text: '#A8791F', border: '#F2DFA3', dot: '#D4AC52' },
  '美食广场': { bg: '#F5E6FF', text: '#7A3DA1', border: '#E4C8F5', dot: '#B37ADB' },
  '母婴美妆': { bg: '#FFE9E4', text: '#C6573A', border: '#F5C8BC', dot: '#E08A6E' },
  '大型连锁正餐': { bg: '#E8F0FF', text: '#3D63C2', border: '#C8D7F5', dot: '#6A8DE0' },
  '休闲食品': { bg: '#FFF4D9', text: '#A8791F', border: '#F2DFA3', dot: '#D4AC52' },
  '美食城档口': { bg: '#FFE8F2', text: '#B23A78', border: '#F2BED9', dot: '#D975AA' },
  '零食便利': { bg: '#E4F7EF', text: '#2E7D5A', border: '#B6E3CE', dot: '#5FB593' },
  '火锅烧烤': { bg: '#FFE9E4', text: '#C6573A', border: '#F5C8BC', dot: '#E08A6E' },
  '蛋糕烘焙连锁': { bg: '#F5E6FF', text: '#7A3DA1', border: '#E4C8F5', dot: '#B37ADB' },
  // --- 垂直专卖行业 ---
  '烟酒行': { bg: '#E8E8F7', text: '#4A4A8C', border: '#C9C9E4', dot: '#7E7EB5' },
  '服装店': { bg: '#FFE9E4', text: '#C6573A', border: '#F5C8BC', dot: '#E08A6E' },
  '数码通讯': { bg: '#E8F0FF', text: '#3D63C2', border: '#C8D7F5', dot: '#6A8DE0' },
  '家居建材': { bg: '#FFF4D9', text: '#A8791F', border: '#F2DFA3', dot: '#D4AC52' },
  '书店': { bg: '#E4F7EF', text: '#2E7D5A', border: '#B6E3CE', dot: '#5FB593' },
  '鲜花礼品': { bg: '#FFE8F2', text: '#B23A78', border: '#F2BED9', dot: '#D975AA' },
  '宠物': { bg: '#FFE9E4', text: '#C6573A', border: '#F5C8BC', dot: '#E08A6E' },
  '汽车美容': { bg: '#E8F0FF', text: '#3D63C2', border: '#C8D7F5', dot: '#6A8DE0' },
  '加油站': { bg: '#FFF4D9', text: '#A8791F', border: '#F2DFA3', dot: '#D4AC52' },
  '文体办公': { bg: '#E4F7EF', text: '#2E7D5A', border: '#B6E3CE', dot: '#5FB593' },
  '医药': { bg: '#FFE8F2', text: '#B23A78', border: '#F2BED9', dot: '#D975AA' },
  // --- 餐饮全业态 ---
  '中餐酒楼': { bg: '#FFE9E4', text: '#C6573A', border: '#F5C8BC', dot: '#E08A6E' },
  '快餐连锁': { bg: '#F5E6FF', text: '#7A3DA1', border: '#E4C8F5', dot: '#B37ADB' },
  '精品咖啡': { bg: '#E8F0FF', text: '#3D63C2', border: '#C8D7F5', dot: '#6A8DE0' },
  '茶饮连锁': { bg: '#FFF4D9', text: '#A8791F', border: '#F2DFA3', dot: '#D4AC52' },
  '面包烘焙': { bg: '#FFE8F2', text: '#B23A78', border: '#F2BED9', dot: '#D975AA' },
  '麻辣烫': { bg: '#FFE9E4', text: '#C6573A', border: '#F5C8BC', dot: '#E08A6E' },
  '特色正餐': { bg: '#E4F7EF', text: '#2E7D5A', border: '#B6E3CE', dot: '#5FB593' },
  '宴会餐厅': { bg: '#E8F0FF', text: '#3D63C2', border: '#C8D7F5', dot: '#6A8DE0' },
  '大排档': { bg: '#F5E6FF', text: '#7A3DA1', border: '#E4C8F5', dot: '#B37ADB' },
  // --- O2O 全域配套 ---
  '线上商城': { bg: '#E8F0FF', text: '#3D63C2', border: '#C8D7F5', dot: '#6A8DE0' },
  '外卖配送': { bg: '#FFE9E4', text: '#C6573A', border: '#F5C8BC', dot: '#E08A6E' },
  '会员营销': { bg: '#F5E6FF', text: '#7A3DA1', border: '#E4C8F5', dot: '#B37ADB' },
  '全渠道零售': { bg: '#E4F7EF', text: '#2E7D5A', border: '#B6E3CE', dot: '#5FB593' },
  '小程序商城': { bg: '#FFF4D9', text: '#A8791F', border: '#F2DFA3', dot: '#D4AC52' },
  '直播带货': { bg: '#FFE8F2', text: '#B23A78', border: '#F2BED9', dot: '#D975AA' },
  '美团外卖': { bg: '#FFE9E4', text: '#C6573A', border: '#F5C8BC', dot: '#E08A6E' },
  '饿了么': { bg: '#E4F7EF', text: '#2E7D5A', border: '#B6E3CE', dot: '#5FB593' },
  '会员积分': { bg: '#E8F0FF', text: '#3D63C2', border: '#C8D7F5', dot: '#6A8DE0' },
  '私域商城': { bg: '#F5E6FF', text: '#7A3DA1', border: '#E4C8F5', dot: '#B37ADB' },
  '视频号直播': { bg: '#FFF4D9', text: '#A8791F', border: '#F2DFA3', dot: '#D4AC52' },
  '抖音小店': { bg: '#FFE8F2', text: '#B23A78', border: '#F2BED9', dot: '#D975AA' },
  '多平台聚合': { bg: '#E4F7EF', text: '#2E7D5A', border: '#B6E3CE', dot: '#5FB593' },
  '快手小店': { bg: '#FFE9E4', text: '#C6573A', border: '#F5C8BC', dot: '#E08A6E' },
  '分销小程序': { bg: '#E8F0FF', text: '#3D63C2', border: '#C8D7F5', dot: '#6A8DE0' },
  '优惠券': { bg: '#F5E6FF', text: '#7A3DA1', border: '#E4C8F5', dot: '#B37ADB' },
  // --- 卡片内的业态 ---
  '购物中心': { bg: '#FFE9E4', text: '#C6573A', border: '#F5C8BC', dot: '#E08A6E' },
  '大型仓储超市': { bg: '#E8F0FF', text: '#3D63C2', border: '#C8D7F5', dot: '#6A8DE0' },
  '多业态百货综合体': { bg: '#FFF4D9', text: '#A8791F', border: '#F2DFA3', dot: '#D4AC52' },
  '大型连锁商超': { bg: '#E4F7EF', text: '#2E7D5A', border: '#B6E3CE', dot: '#5FB593' },
  '品牌连锁便利': { bg: '#F5E6FF', text: '#7A3DA1', border: '#E4C8F5', dot: '#B37ADB' },
  '社区日用超市': { bg: '#FFE9E4', text: '#C6573A', border: '#F5C8BC', dot: '#E08A6E' },
  '便民小店': { bg: '#E8F0FF', text: '#3D63C2', border: '#C8D7F5', dot: '#6A8DE0' },
  '小型连锁': { bg: '#FFF4D9', text: '#A8791F', border: '#F2DFA3', dot: '#D4AC52' },
  '联营专柜结算': { bg: '#E4F7EF', text: '#2E7D5A', border: '#B6E3CE', dot: '#5FB593' },
  '果蔬店': { bg: '#FFE9E4', text: '#C6573A', border: '#F5C8BC', dot: '#E08A6E' },
  '农贸批发市场': { bg: '#E8F0FF', text: '#3D63C2', border: '#C8D7F5', dot: '#6A8DE0' },
  '前店后场生鲜门店': { bg: '#FFF4D9', text: '#A8791F', border: '#F2DFA3', dot: '#D4AC52' },
  '零食特卖店': { bg: '#F5E6FF', text: '#7A3DA1', border: '#E4C8F5', dot: '#B37ADB' },
};

const DEFAULT_COLOR = { bg: '#F0F2F5', text: '#1D2233', border: '#D9D9D9', dot: '#9AA0AD' };
const getTagColor = (name: string) => MACARON_COLORS[name] || DEFAULT_COLOR;

// ---------------------- 卡片 icon（SVG, 方便后期替换, 命名类似 mynauiCart） ----------------------
/* Icon: 购物车 / 商超 (替换源： Figma mq4xejld-e0mh5an / mynauiCart) */
const IconCartSVG = () => (
  <svg viewBox="0 0 36 36" width="36" height="36" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
    {/* 背景圆 */}
    <rect width="36" height="36" rx="12" fill="#D9D9D9" />
    {/* 购物车轮廓 */}
    <path
      d="M10 12h3.2l2.4 12h11.6l2.4-8H13.2"
      stroke="#1D2233"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <circle cx="16" cy="28" r="1.8" fill="#1D2233" />
    <circle cx="25" cy="28" r="1.8" fill="#1D2233" />
  </svg>
);

/* Icon: 便利店 / 门店 (替换源： Figma mynauiStore) */
const IconStoreSVG = () => (
  <svg viewBox="0 0 36 36" width="36" height="36" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
    <rect width="36" height="36" rx="12" fill="#D9D9D9" />
    <path
      d="M9 15l2-5h14l2 5M9 15v13h18V15M9 15h18M13 28v-6M23 28v-6M18 28v-6"
      stroke="#1D2233"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

/* Icon: 生鲜蔬菜 (替换源： Figma mynauiVeggie) */
const IconVegSVG = () => (
  <svg viewBox="0 0 36 36" width="36" height="36" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
    <rect width="36" height="36" rx="12" fill="#D9D9D9" />
    <path
      d="M8 22c0-6 4-11 10-11 4 0 7 3 7 7s-3 7-7 7H13c-3 0-5-1-5-3z"
      stroke="#1D2233"
      strokeWidth="2"
      strokeLinejoin="round"
    />
    <path d="M17 13c2-4 5-5 7-5" stroke="#1D2233" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

/* Icon: 小旗帜 (用于 popup 标签云, 替换源： popupSymbol icon) */
const IconFlagSVG = ({ color = '#1D2233' }: { color?: string }) => (
  <svg viewBox="0 0 40 40" width="40" height="40" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
    <path
      d="M12 8h18l-2 6 2 6H12v12"
      stroke={color}
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

// ---------------------- 数据 ----------------------
interface SolutionCard {
  title: string;
  // 默认态：2 行, 每行 3 个 (5 个时也可)；实际上 Figma 每行 3 个 + 第 2 行 2~3 个
  row1Tags: string[];
  row2Tags: string[];
  products: { name: string; href: string }[]; // 每个产品带链接
  heroGradient: string; // hero 图渐变色，替代表位图
  icon: React.ReactNode; // 替换源: mynauiCart
}

interface SolutionTab {
  key: string;
  label: string;
  cards: SolutionCard[];
  cloudRow1: string[];
  cloudRow2: string[];
  cloudRow3: string[];
}

const TABS: SolutionTab[] = [
  {
    key: 'retail',
    label: '综合商超零售',
    cards: [
      {
        title: '大型连锁商超 / 百货卖场',
        row1Tags: ['大型综合超市', '购物中心', '大型仓储超市'],
        row2Tags: ['多业态百货综合体', '大型连锁商超'],
        products: [
          { name: '思迅商旗', href: '#/product/sx-flagship' },
          { name: '商汇', href: '#/product/sx-hui' },
          { name: 'eShop 商业 5', href: '#/product/eshop-5' },
        ],
        heroGradient: 'linear-gradient(135deg, #BFD8FF 0%, #FFD9B3 60%, #FFC7D6 100%)',
        icon: <IconCartSVG />,
      },
      {
        title: '社区商超 / 连锁便利店',
        row1Tags: ['品牌连锁便利', '社区日用超市', '便民小店'],
        row2Tags: ['乡镇综合卖场', '小型连锁', '联营专柜结算'],
        products: [
          { name: '商云', href: '#/product/sx-cloud' },
          { name: '思迅天店', href: '#/product/sx-tiandian' },
          { name: 'eShop 小象', href: '#/product/eshop-xiaoxiang' },
        ],
        heroGradient: 'linear-gradient(135deg, #C7E8FF 0%, #FFE0C2 55%, #FFD0D0 100%)',
        icon: <IconStoreSVG />,
      },
      {
        title: '生鲜农贸 / 零食门店',
        row1Tags: ['生鲜超市', '果蔬店', '农贸批发市场'],
        row2Tags: ['前店后场生鲜门店', '零食特卖店'],
        products: [
          { name: '思迅秤心管家', href: '#/product/sx-scale' },
          { name: '天店·星锐', href: '#/product/tiandian-xingrui' },
          { name: '商锐', href: '#/product/sx-rui' },
        ],
        heroGradient: 'linear-gradient(135deg, #BFE6FF 0%, #FFD7BA 60%, #FFBFCF 100%)',
        icon: <IconVegSVG />,
      },
    ],
    cloudRow1: ['大型综合超市', '百货商城', '乡镇综合卖场', '母婴生活馆', '中型连锁商超', '美业/服务'],
    cloudRow2: ['生鲜超市', '烘焙茶饮', '美食广场', '母婴美妆', '大型连锁正餐', '休闲食品'],
    cloudRow3: ['美食城档口', '母婴生活馆', '零食便利', '火锅烧烤', '中型连锁商超', '蛋糕烘焙连锁'],
  },
  {
    key: 'specialty',
    label: '垂直专卖行业',
    cards: [
      {
        title: '烟酒 / 医药专卖',
        row1Tags: ['烟酒行', '医药', '便利店专卖'],
        row2Tags: ['连锁药店', '品牌烟酒行', '社区药房'],
        products: [
          { name: '商云专卖版', href: '#/product/sx-cloud-spec' },
          { name: '思迅天店', href: '#/product/sx-tiandian' },
          { name: '医药专卖系统', href: '#/product/sx-med' },
        ],
        heroGradient: 'linear-gradient(135deg, #C9D4FF 0%, #FFE0C2 60%, #E8D9FF 100%)',
        icon: <IconCartSVG />,
      },
      {
        title: '服饰 / 母婴 / 精品',
        row1Tags: ['母婴店', '服装店', '饰品'],
        row2Tags: ['鲜花礼品', '宠物', '家居建材'],
        products: [
          { name: '商锐专卖版', href: '#/product/sx-rui-spec' },
          { name: '天店·星云', href: '#/product/tiandian-xingyun' },
          { name: 'eshop 服装版', href: '#/product/eshop-cloth' },
        ],
        heroGradient: 'linear-gradient(135deg, #FFCFE4 0%, #FFE7C9 60%, #D8E4FF 100%)',
        icon: <IconStoreSVG />,
      },
      {
        title: '数码 / 家居 / 文体',
        row1Tags: ['数码通讯', '家居建材', '书店'],
        row2Tags: ['文体办公', '数码配件', '家电连锁'],
        products: [
          { name: '商锐', href: '#/product/sx-rui' },
          { name: '天店·星耀', href: '#/product/tiandian-xingyao' },
          { name: 'eshop 数码版', href: '#/product/eshop-digital' },
        ],
        heroGradient: 'linear-gradient(135deg, #B8D8FF 0%, #FFDCBA 60%, #FFD1E0 100%)',
        icon: <IconVegSVG />,
      },
    ],
    cloudRow1: ['烟酒行', '母婴店', '服装店', '饰品', '数码通讯', '家居建材'],
    cloudRow2: ['书店', '鲜花礼品', '宠物', '汽车美容', '加油站', '文体办公'],
    cloudRow3: ['医药', '数码配件', '家电连锁', '品牌烟酒', '连锁药店', '社区药房'],
  },
  {
    key: 'food',
    label: '餐饮全业态',
    cards: [
      {
        title: '中餐 / 火锅 / 烧烤',
        row1Tags: ['中餐酒楼', '火锅烧烤', '特色正餐'],
        row2Tags: ['连锁正餐', '宴会餐厅', '大排档'],
        products: [
          { name: '美食家 3', href: '#/product/meishijia-3' },
          { name: '思迅食通天', href: '#/product/sx-shitongtian' },
          { name: '天店·餐饮版', href: '#/product/tiandian-food' },
        ],
        heroGradient: 'linear-gradient(135deg, #FFD6B8 0%, #FFE0B0 60%, #FFC8C8 100%)',
        icon: <IconCartSVG />,
      },
      {
        title: '烘焙 / 咖啡 / 甜品',
        row1Tags: ['烘焙茶饮', '咖啡甜品', '蛋糕烘焙连锁'],
        row2Tags: ['精品咖啡', '茶饮连锁', '面包烘焙'],
        products: [
          { name: '烘焙之星', href: '#/product/bake-star' },
          { name: '思迅咖啡通', href: '#/product/sx-coffee' },
          { name: '天店·星锐', href: '#/product/tiandian-xingrui' },
        ],
        heroGradient: 'linear-gradient(135deg, #FFE4C4 0%, #FFE9B0 60%, #FFC9D6 100%)',
        icon: <IconStoreSVG />,
      },
      {
        title: '快餐 / 美食广场 / 小吃',
        row1Tags: ['快餐连锁', '美食广场', '小吃'],
        row2Tags: ['休闲食品', '美食城档口', '麻辣烫'],
        products: [
          { name: '美食家 3', href: '#/product/meishijia-3' },
          { name: '食通天 8', href: '#/product/shitongtian-8' },
          { name: '天店·小吃版', href: '#/product/tiandian-snack' },
        ],
        heroGradient: 'linear-gradient(135deg, #FFDDBC 0%, #FFD2E0 60%, #D8E4FF 100%)',
        icon: <IconVegSVG />,
      },
    ],
    cloudRow1: ['中餐酒楼', '快餐连锁', '火锅烧烤', '烘焙茶饮', '咖啡甜品', '美食广场'],
    cloudRow2: ['小吃', '休闲食品', '美食城档口', '蛋糕烘焙连锁', '精品咖啡', '茶饮连锁'],
    cloudRow3: ['面包烘焙', '麻辣烫', '特色正餐', '连锁正餐', '宴会餐厅', '大排档'],
  },
  {
    key: 'o2o',
    label: 'O2O全域配套',
    cards: [
      {
        title: '线上商城 / 小程序',
        row1Tags: ['线上商城', '小程序商城', '私域商城'],
        row2Tags: ['H5 商城', '会员小程序', '分销小程序'],
        products: [
          { name: '思迅微商店', href: '#/product/sx-weishop' },
          { name: '小程序商城', href: '#/product/mini-shop' },
          { name: 'O2O 商城', href: '#/product/o2o-shop' },
        ],
        heroGradient: 'linear-gradient(135deg, #B8D8FF 0%, #C8E8FF 60%, #D8E4FF 100%)',
        icon: <IconCartSVG />,
      },
      {
        title: '外卖配送 / 会员营销',
        row1Tags: ['外卖配送', '会员营销', '美团外卖'],
        row2Tags: ['饿了么', '会员积分', '优惠券'],
        products: [
          { name: '外卖管家', href: '#/product/waimai-guanjia' },
          { name: '会员营销系统', href: '#/product/member-marketing' },
          { name: '思迅商圈', href: '#/product/sx-shangquan' },
        ],
        heroGradient: 'linear-gradient(135deg, #FFD1D1 0%, #FFE0B0 60%, #D8E4FF 100%)',
        icon: <IconStoreSVG />,
      },
      {
        title: '直播带货 / 全渠道',
        row1Tags: ['全渠道零售', '直播带货', '视频号直播'],
        row2Tags: ['抖音小店', '快手小店', '多平台聚合'],
        products: [
          { name: '全渠道零售', href: '#/product/omnichannel' },
          { name: '直播通', href: '#/product/live-pass' },
          { name: 'O2O 平台版', href: '#/product/o2o-platform' },
        ],
        heroGradient: 'linear-gradient(135deg, #D8E4FF 0%, #FFCFE4 60%, #FFE4C4 100%)',
        icon: <IconVegSVG />,
      },
    ],
    cloudRow1: ['线上商城', '外卖配送', '会员营销', '全渠道零售', '小程序商城', '直播带货'],
    cloudRow2: ['美团外卖', '饿了么', '会员积分', '私域商城', '视频号直播', '抖音小店'],
    cloudRow3: ['H5 商城', '多平台聚合', '快手小店', '分销小程序', '会员小程序', '优惠券'],
  },
];

// ---------------------- 子组件：业态小标签（带业态链接，可跳转到对应业态详情页，已按 Figma 需求移除小方块指示器） ----------------------
// 替换源：Figma Tag Item / Tag Group - Rectangle 28/Default
// 小方块指示器逻辑保留在 MACARON_COLORS 中，便于未来按需开启（在 children 中再加 <span> 色块即可）
const CategoryTag: React.FC<{ name: string; href?: string }> = ({ name, href }) => {
  return (
    <a
      // link：点击后跳转到对应业态详情页（后期替换为真实路由，例如 /category/{slug}）
      href={href ?? `#/category/${encodeURIComponent(name)}`}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        border: '1px solid #D9D9D9',
        borderRadius: '8px',
        padding: '9px 16px',
        background: '#FFFFFF',
        whiteSpace: 'nowrap',
        textDecoration: 'none',
        cursor: 'pointer',
        flexShrink: 0,
      }}
    >
      <p
        style={{
          margin: 0,
          lineHeight: '23px',
          letterSpacing: 0,
          color: '#1D2233',
          fontFamily: FONT_FAMILY,
          fontSize: '16px',
          whiteSpace: 'nowrap',
        }}
      >
        {name}
      </p>
    </a>
  );
};

// ---------------------- 子组件：Category 按钮（了解详情 / 免费试用） ----------------------
// 默认：白底色 + 灰色描边；hover：蓝色底 #0D99FF + 白色字
const CategoryButton: React.FC<{
  label: string;
  type: 'outline' | 'primary-outline'; // 了解详情 (outline) / 免费试用 (primary-outline)
  href?: string;
}> = ({ label, type, href = '#' }) => {
  const [hovered, setHovered] = useState(false);
  const isPrimary = type === 'primary-outline';
  const style: React.CSSProperties = hovered
    ? {
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        columnGap: '10px',
        border: '1px solid #0D99FF',
        borderRadius: '8px',
        background: '#0D99FF',
        padding: '13px 29px',
        height: '56px',
        cursor: 'pointer',
        color: '#FFFFFF',
        fontFamily: FONT_FAMILY,
        fontSize: '20px',
        lineHeight: '29px',
        transition: 'all 200ms ease',
        textDecoration: 'none',
      }
    : {
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        columnGap: '10px',
        border: isPrimary ? '1px solid #0D99FF' : '1px solid #D9D9D9',
        borderRadius: '8px',
        background: '#FFFFFF',
        padding: '13px 29px',
        height: '56px',
        cursor: 'pointer',
        color: isPrimary ? '#0D99FF' : '#1D2233',
        fontFamily: FONT_FAMILY,
        fontSize: '20px',
        lineHeight: '29px',
        transition: 'all 200ms ease',
        textDecoration: 'none',
      };

  return (
    <a href={href} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)} style={style}>
      {label}
    </a>
  );
};

// ---------------------- 主组件 ----------------------
const IndustrySolutions: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);
  const tab = TABS[activeTab];

  return (
    <section
      style={{
        width: '100%',
        background: 'linear-gradient(180deg, #D9E8FFB2 0%, #D9E8FF00 100%)',
        padding: '120px 0 100px',
        boxSizing: 'border-box',
      }}
    >
      <div
        style={{
          width: '1440px',
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          rowGap: '60px',
        }}
      >
        {/* ============== Title: 行业(黑) + 解决方案(蓝 #0068eb) ============== */}
        <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
          <h2
            style={{
              margin: 0,
              lineHeight: '67px',
              letterSpacing: 0,
              color: '#000000',
              fontFamily: FONT_FAMILY,
              fontSize: '56px',
              fontWeight: 700,
            }}
          >
            <span style={{ color: '#1D2233' }}>行业</span>
            <span style={{ color: '#0068eb' }}>解决方案</span>
          </h2>
        </div>

        {/* ============== Tab 组件（Rectangle 28/Default 灰色底 + 激活态蓝色胶囊） ============== */}
        <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              borderRadius: '36px',
              background: '#D6E6F0',
              minWidth: '761px',
              height: '56px',
              padding: '0px',
              boxSizing: 'border-box',
            }}
          >
            {TABS.map((t, idx) => {
              const isActive = idx === activeTab;
              return (
                <div
                  key={t.key}
                  onClick={() => setActiveTab(idx)}
                  onMouseEnter={() => setActiveTab(idx)}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    columnGap: '10px',
                    borderRadius: '38px',
                    background: isActive ? '#0D99FF' : 'transparent',
                    padding: isActive ? '16px 30px' : '16px 30px',
                    cursor: 'pointer',
                    transition: 'background 200ms ease, color 200ms ease',
                    userSelect: 'none',
                  }}
                >
                  <span
                    style={{
                      lineHeight: '24px',
                      letterSpacing: 0,
                      color: isActive ? '#FFFFFF' : '#1D2233',
                      fontFamily: FONT_FAMILY,
                      fontSize: '20px',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {t.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* ============== 3 张卡片 (Container → Main Container hover 切换) ============== */}
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            alignSelf: 'stretch',
            justifyContent: 'center',
            columnGap: '30px',
          }}
        >
          {tab.cards.map((card, idx) => (
            <SolutionCardView key={`${tab.key}-card-${idx}`} card={card} />
          ))}
        </div>

        {/* ============== Popup Overlay：3 行标签云（左右虚化 + 滚动） ============== */}
        <PopupOverlay tab={tab} />
      </div>
    </section>
  );
};

// ---------------------- 卡片：默认 Container 与 hover Main Container 切换 ----------------------
const SolutionCardView: React.FC<{ card: SolutionCard }> = ({ card }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: 'relative',
        width: '460px',
        height: '447px',
        borderRadius: '16px',
        overflow: 'hidden',
        transition: 'box-shadow 300ms ease',
        boxShadow: hovered ? '0px 8px 30px 0px #0068eb1a' : '0px 4px 20px 0px rgba(160,163,170,0.15)',
        background: '#D9D9D9',
        flexShrink: 0,
      }}
    >
      {/* ---------- 默认态：Container（hero + tagContainer 信息条，宽度与背景一致） ---------- */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'flex-end',
          borderRadius: '16px',
          background: card.heroGradient,
          paddingTop: '160px',
          rowGap: '10px',
          opacity: hovered ? 0 : 1,
          transition: 'opacity 300ms ease',
        }}
      >
        {/* tagContainer：圆角 16px / 透明磨砂玻璃 / 宽度与卡片背景一致，不是全高覆盖 */}
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
            rowGap: '16px',
            backdropFilter: 'blur(5px)',
            margin: '0',
          }}
        >
          {/* 顶部：icon + title */}
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              columnGap: '10px',
              alignSelf: 'stretch',
            }}
          >
            {/* Icon Container (SVG, 替换源: mynauiCart) */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                columnGap: '10px',
                borderRadius: '12px',
                background: '#D9D9D9',
                padding: '6px',
                flexShrink: 0,
              }}
            >
              {card.icon}
            </div>
            <p
              style={{
                margin: 0,
                flexShrink: 0,
                lineHeight: '41px',
                letterSpacing: 0,
                color: '#1D2233',
                fontFamily: FONT_FAMILY,
                fontSize: '28px',
                fontWeight: 700,
                whiteSpace: 'nowrap',
              }}
            >
              {card.title}
            </p>
          </div>

          {/* 标签组 1 */}
          <div
            style={{
              display: 'flex',
              flexShrink: 0,
              alignItems: 'center',
              columnGap: '16px',
              width: '400px',
            }}
          >
            {card.row1Tags.map((t) => (
              <CategoryTag key={`r1-${t}`} name={t} />
            ))}
          </div>

          {/* 标签组 2 */}
          <div
            style={{
              display: 'flex',
              flexShrink: 0,
              alignItems: 'center',
              columnGap: '16px',
              width: '400px',
            }}
          >
            {card.row2Tags.map((t) => (
              <CategoryTag key={`r2-${t}`} name={t} />
            ))}
          </div>
        </div>
      </div>

      {/* ---------- hover 态：Main Container（整卡渐变背景 + 底部磨砂玻璃信息条，宽度与背景一致，高度不完全覆盖） ---------- */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'flex-end',
          borderRadius: '16px',
          background: card.heroGradient,
          opacity: hovered ? 1 : 0,
          pointerEvents: hovered ? 'auto' : 'none',
          transition: 'opacity 300ms ease',
        }}
      >
        {/* 信息条：透明磨砂玻璃，宽度与卡片背景对齐，圆角 16，不覆盖全高 */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            justifyContent: 'center',
            alignSelf: 'stretch',
            borderRadius: '16px',
            background: 'rgba(255,255,255,0.7)',
            padding: '30px',
            rowGap: '20px',
            backdropFilter: 'blur(5px)',
            boxSizing: 'border-box',
          }}
        >
          {/* 顶部：icon + title */}
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              columnGap: '10px',
              alignSelf: 'stretch',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                columnGap: '10px',
                borderRadius: '12px',
                background: '#D9D9D9',
                padding: '6px',
                flexShrink: 0,
              }}
            >
              {card.icon}
            </div>
            <p
              style={{
                margin: 0,
                flexShrink: 0,
                lineHeight: '41px',
                letterSpacing: 0,
                color: '#1D2233',
                fontFamily: FONT_FAMILY,
                fontSize: '28px',
                fontWeight: 700,
                whiteSpace: 'nowrap',
              }}
            >
              {card.title}
            </p>
          </div>

          {/* 标签组 1 */}
          <div
            style={{
              display: 'flex',
              flexShrink: 0,
              alignItems: 'center',
              columnGap: '16px',
              width: '400px',
            }}
          >
            {card.row1Tags.map((t) => (
              <CategoryTag key={`hr1-${t}`} name={t} />
            ))}
          </div>

          {/* 标签组 2 */}
          <div
            style={{
              display: 'flex',
              flexShrink: 0,
              alignItems: 'center',
              columnGap: '16px',
              width: '400px',
            }}
          >
            {card.row2Tags.map((t) => (
              <CategoryTag key={`hr2-${t}`} name={t} />
            ))}
          </div>

          {/* 分隔线 */}
          <div
            style={{
              flexShrink: 0,
              background: '#D9D9D9',
              width: '400px',
              height: '1px',
            }}
          />

          {/* Additional Info Container：适配产品（每一个都带链接） + 双按钮 */}
          <div
            style={{
              display: 'inline-flex',
              flexDirection: 'column',
              flexShrink: 0,
              alignItems: 'flex-start',
              alignSelf: 'stretch',
              rowGap: '30px',
            }}
          >
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
                  margin: 0,
                  flexShrink: 0,
                  lineHeight: '29px',
                  letterSpacing: 0,
                  color: '#1D2233',
                  fontFamily: FONT_FAMILY,
                  fontSize: '20px',
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
                {card.products.map((p) => (
                  <a
                    key={p.name}
                    href={p.href}
                    style={{
                      lineHeight: '29px',
                      letterSpacing: 0,
                      color: '#0D99FF',
                      fontFamily: FONT_FAMILY,
                      fontSize: '20px',
                      textDecoration: 'none',
                    }}
                  >
                    {p.name}
                  </a>
                ))}
              </div>
            </div>

            {/* 双按钮 (Category)：默认描边, hover 蓝底白字 */}
            <div
              style={{
                display: 'inline-flex',
                flexShrink: 0,
                alignItems: 'center',
                alignSelf: 'stretch',
                columnGap: '30px',
              }}
            >
              <CategoryButton label="了解详情" type="outline" href="#/detail" />
              <CategoryButton label="免费试用" type="primary-outline" href="#/trial" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ---------------------- Popup Overlay：3 行标签云，左右虚化 + 第 1/3 行向右缓动 + 第 2 行向左缓动 ----------------------
const PopupOverlay: React.FC<{ tab: SolutionTab }> = ({ tab }) => {
  // 复制两份用于无缝循环
  const animStyle = `
    @keyframes rowSlideLeft {
      0%   { transform: translateX(0); }
      100% { transform: translateX(-50%); }
    }
    @keyframes rowSlideRight {
      0%   { transform: translateX(-50%); }
      100% { transform: translateX(0); }
    }
  `;

  const renderRow = (items: string[], key: string, direction: 'left' | 'right', duration: number) => {
    const doubled = [...items, ...items];
    return (
      <div
        key={key}
        style={{
          position: 'relative',
          width: '100%',
          overflow: 'hidden',
          padding: '10px 0',
          maskImage:
            'linear-gradient(to right, transparent 0, rgba(0,0,0,1) 120px, rgba(0,0,0,1) calc(100% - 120px), transparent 100%)',
          WebkitMaskImage:
            'linear-gradient(to right, transparent 0, rgba(0,0,0,1) 120px, rgba(0,0,0,1) calc(100% - 120px), transparent 100%)',
        }}
      >
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            columnGap: '20px',
            flexWrap: 'nowrap',
            animation:
              direction === 'left'
                ? `rowSlideLeft ${duration}s linear infinite`
                : `rowSlideRight ${duration}s linear infinite`,
            willChange: 'transform',
          }}
        >
          {doubled.map((name, i) => (
            <SmallCard key={`${key}-${name}-${i}`} name={name} />
          ))}
        </div>
      </div>
    );
  };

  return (
    <>
      <style>{animStyle}</style>
      <div
        style={{
          width: '1440px',
          minHeight: '262px',
          padding: '20px 0',
          boxSizing: 'border-box',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'stretch',
          rowGap: '12px',
        }}
      >
        {/* 第 1 行：向右缓动 */}
        {renderRow(tab.cloudRow1, 'r1', 'right', 45)}
        {/* 中间：向左缓动 */}
        {renderRow(tab.cloudRow2, 'r2', 'left', 55)}
        {/* 第 3 行：向右缓动 */}
        {renderRow(tab.cloudRow3, 'r3', 'right', 50)}
      </div>
    </>
  );
};

// ---------------------- Popup 小卡片（Frame 48 hover 切换） ----------------------
const SmallCard: React.FC<{ name: string }> = ({ name }) => {
  const [hovered, setHovered] = useState(false);
  const c = getTagColor(name);
  // 默认态 popupSymbol：圆角 16, #D3ECFF 背景 + icon + 文字
  // Frame 48 hover：加阴影 + 深色底/强调色（保持马卡龙色，背景略深一点并加阴影）
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        columnGap: '12px',
        borderRadius: '16px',
        background: hovered ? c.bg : c.bg, // 马卡龙底色与业态一致
        padding: '10px 20px',
        height: '56px',
        boxSizing: 'border-box',
        whiteSpace: 'nowrap',
        boxShadow: hovered ? '0px 2px 8px 0px rgba(13, 153, 255, 0.18)' : 'none',
        transform: hovered ? 'translateY(-2px)' : 'translateY(0)',
        border: `1px solid ${hovered ? c.border : 'transparent'}`,
        transition: 'all 200ms ease',
        cursor: 'pointer',
        flexShrink: 0,
      }}
    >
      {/* popupSymbol 图标 (SVG, 替换源：mq4xnkiw-jshyjf2 / picture) */}
      <span
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '40px',
          height: '40px',
          borderRadius: '8px',
          background: 'rgba(255,255,255,0.7)',
          overflow: 'hidden',
          flexShrink: 0,
        }}
      >
        <IconFlagSVG color={c.text} />
      </span>
      <p
        style={{
          margin: 0,
          lineHeight: '29px',
          letterSpacing: 0,
          color: hovered ? c.text : c.text,
          fontFamily: FONT_FAMILY,
          fontSize: '20px',
          fontWeight: hovered ? 500 : 400,
          whiteSpace: 'nowrap',
        }}
      >
        {name}
      </p>
    </div>
  );
};

export default IndustrySolutions;
