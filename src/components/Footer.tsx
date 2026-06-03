import { useState, useEffect } from 'react';

// 链接数据配置 - 方便后期替换
const aboutUsLinks = [
  { label: '思迅介绍', url: '#' }, // TODO: 替换为实际链接
  { label: '企业文化', url: '#' }, // TODO: 替换为实际链接
  { label: '用户使用协议', url: '#' }, // TODO: 替换为实际链接
  { label: '个人隐私政策', url: '#' }, // TODO: 替换为实际链接
];

const productsLinks = [
  { label: 'eShop', url: '#' }, // TODO: 替换为实际链接
  { label: '天店', url: '#' }, // TODO: 替换为实际链接
];

const solutionsLinks = [
  { label: '思迅总部', url: '#' }, // TODO: 替换为实际链接
  { label: '分支机构', url: '#' }, // TODO: 替换为实际链接
  { label: '渠道联系', url: '#' }, // TODO: 替换为实际链接
];

// 中国省份数据
const provinces = [
  '北京市', '天津市', '上海市', '重庆市', '河北省', '山西省', '辽宁省', '吉林省', 
  '黑龙江省', '江苏省', '浙江省', '安徽省', '福建省', '江西省', '山东省', '河南省', 
  '湖北省', '湖南省', '广东省', '海南省', '四川省', '贵州省', '云南省', '陕西省', 
  '甘肃省', '青海省', '台湾省', '内蒙古自治区', '广西壮族自治区', '西藏自治区', 
  '宁夏回族自治区', '新疆维吾尔自治区', '香港特别行政区', '澳门特别行政区'
];

// 对应省份的城市数据
const citiesData: Record<string, string[]> = {
  '北京市': ['东城区', '西城区', '朝阳区', '丰台区', '石景山区', '海淀区', '门头沟区', '房山区', '通州区', '顺义区', '昌平区', '大兴区', '怀柔区', '平谷区', '密云区', '延庆区'],
  '天津市': ['和平区', '河东区', '河西区', '南开区', '河北区', '红桥区', '东丽区', '西青区', '津南区', '北辰区', '武清区', '宝坻区', '滨海新区', '宁河区', '静海区', '蓟州区'],
  '上海市': ['黄浦区', '徐汇区', '长宁区', '静安区', '普陀区', '虹口区', '杨浦区', '闵行区', '宝山区', '嘉定区', '浦东新区', '金山区', '松江区', '青浦区', '奉贤区', '崇明区'],
  '重庆市': ['万州区', '涪陵区', '渝中区', '大渡口区', '江北区', '沙坪坝区', '九龙坡区', '南岸区', '北碚区', '綦江区', '大足区', '渝北区', '巴南区', '黔江区', '长寿区', '江津区', '合川区', '永川区', '南川区', '璧山区', '铜梁区', '潼南区', '荣昌区', '开州区', '梁平区', '武隆区'],
  '河北省': ['石家庄市', '唐山市', '秦皇岛市', '邯郸市', '邢台市', '保定市', '张家口市', '承德市', '沧州市', '廊坊市', '衡水市'],
  '山西省': ['太原市', '大同市', '阳泉市', '长治市', '晋城市', '朔州市', '晋中市', '运城市', '忻州市', '临汾市', '吕梁市'],
  '辽宁省': ['沈阳市', '大连市', '鞍山市', '抚顺市', '本溪市', '丹东市', '锦州市', '营口市', '阜新市', '辽阳市', '盘锦市', '铁岭市', '朝阳市', '葫芦岛市'],
  '吉林省': ['长春市', '吉林市', '四平市', '辽源市', '通化市', '白山市', '松原市', '白城市', '延边朝鲜族自治州'],
  '黑龙江省': ['哈尔滨市', '齐齐哈尔市', '鸡西市', '鹤岗市', '双鸭山市', '大庆市', '伊春市', '佳木斯市', '七台河市', '牡丹江市', '黑河市', '绥化市', '大兴安岭地区'],
  '江苏省': ['南京市', '无锡市', '徐州市', '常州市', '苏州市', '南通市', '连云港市', '淮安市', '盐城市', '扬州市', '镇江市', '泰州市', '宿迁市'],
  '浙江省': ['杭州市', '宁波市', '温州市', '嘉兴市', '湖州市', '绍兴市', '金华市', '衢州市', '舟山市', '台州市', '丽水市'],
  '安徽省': ['合肥市', '芜湖市', '蚌埠市', '淮南市', '马鞍山市', '淮北市', '铜陵市', '安庆市', '黄山市', '滁州市', '阜阳市', '宿州市', '六安市', '亳州市', '池州市', '宣城市'],
  '福建省': ['福州市', '厦门市', '莆田市', '三明市', '泉州市', '漳州市', '南平市', '龙岩市', '宁德市'],
  '江西省': ['南昌市', '景德镇市', '萍乡市', '九江市', '新余市', '鹰潭市', '赣州市', '吉安市', '宜春市', '抚州市', '上饶市'],
  '山东省': ['济南市', '青岛市', '淄博市', '枣庄市', '东营市', '烟台市', '潍坊市', '济宁市', '泰安市', '威海市', '日照市', '临沂市', '德州市', '聊城市', '滨州市', '菏泽市'],
  '河南省': ['郑州市', '开封市', '洛阳市', '平顶山市', '安阳市', '鹤壁市', '新乡市', '焦作市', '濮阳市', '许昌市', '漯河市', '三门峡市', '南阳市', '商丘市', '信阳市', '周口市', '驻马店市', '济源市'],
  '湖北省': ['武汉市', '黄石市', '十堰市', '宜昌市', '襄阳市', '鄂州市', '荆门市', '孝感市', '荆州市', '黄冈市', '咸宁市', '随州市', '恩施土家族苗族自治州', '仙桃市', '潜江市', '天门市', '神农架林区'],
  '湖南省': ['长沙市', '株洲市', '湘潭市', '衡阳市', '邵阳市', '岳阳市', '常德市', '张家界市', '益阳市', '郴州市', '永州市', '怀化市', '娄底市', '湘西土家族苗族自治州'],
  '广东省': ['广州市', '韶关市', '深圳市', '珠海市', '汕头市', '佛山市', '江门市', '湛江市', '茂名市', '肇庆市', '惠州市', '梅州市', '汕尾市', '河源市', '阳江市', '清远市', '东莞市', '中山市', '潮州市', '揭阳市', '云浮市'],
  '海南省': ['海口市', '三亚市', '三沙市', '儋州市', '五指山市', '琼海市', '文昌市', '万宁市', '东方市', '定安县', '屯昌县', '澄迈县', '临高县', '白沙黎族自治县', '昌江黎族自治县', '乐东黎族自治县', '陵水黎族自治县', '保亭黎族苗族自治县', '琼中黎族苗族自治县'],
  '四川省': ['成都市', '自贡市', '攀枝花市', '泸州市', '德阳市', '绵阳市', '广元市', '遂宁市', '内江市', '乐山市', '南充市', '眉山市', '宜宾市', '广安市', '达州市', '雅安市', '巴中市', '资阳市', '阿坝藏族羌族自治州', '甘孜藏族自治州', '凉山彝族自治州'],
  '贵州省': ['贵阳市', '六盘水市', '遵义市', '安顺市', '毕节市', '铜仁市', '黔西南布依族苗族自治州', '黔东南苗族侗族自治州', '黔南布依族苗族自治州'],
  '云南省': ['昆明市', '曲靖市', '玉溪市', '保山市', '昭通市', '丽江市', '普洱市', '临沧市', '楚雄彝族自治州', '红河哈尼族彝族自治州', '文山壮族苗族自治州', '西双版纳傣族自治州', '大理白族自治州', '德宏傣族景颇族自治州', '怒江傈僳族自治州', '迪庆藏族自治州'],
  '陕西省': ['西安市', '铜川市', '宝鸡市', '咸阳市', '渭南市', '延安市', '汉中市', '榆林市', '安康市', '商洛市'],
  '甘肃省': ['兰州市', '嘉峪关市', '金昌市', '白银市', '天水市', '武威市', '张掖市', '平凉市', '酒泉市', '庆阳市', '定西市', '陇南市', '临夏回族自治州', '甘南藏族自治州'],
  '青海省': ['西宁市', '海东市', '海北藏族自治州', '黄南藏族自治州', '海南藏族自治州', '果洛藏族自治州', '玉树藏族自治州', '海西蒙古族藏族自治州'],
  '台湾省': ['台北市', '新北市', '桃园市', '台中市', '台南市', '高雄市', '基隆市', '新竹市', '嘉义市', '新竹县', '苗栗县', '彰化县', '南投县', '云林县', '嘉义县', '屏东县', '宜兰县', '花莲县', '台东县', '澎湖县', '金门县', '连江县'],
  '内蒙古自治区': ['呼和浩特市', '包头市', '乌海市', '赤峰市', '通辽市', '鄂尔多斯市', '呼伦贝尔市', '巴彦淖尔市', '乌兰察布市', '兴安盟', '锡林郭勒盟', '阿拉善盟'],
  '广西壮族自治区': ['南宁市', '柳州市', '桂林市', '梧州市', '北海市', '防城港市', '钦州市', '贵港市', '玉林市', '百色市', '贺州市', '河池市', '来宾市', '崇左市'],
  '西藏自治区': ['拉萨市', '日喀则市', '昌都市', '林芝市', '山南市', '那曲市', '阿里地区'],
  '宁夏回族自治区': ['银川市', '石嘴山市', '吴忠市', '固原市', '中卫市'],
  '新疆维吾尔自治区': ['乌鲁木齐市', '克拉玛依市', '吐鲁番市', '哈密市', '昌吉回族自治州', '博尔塔拉蒙古自治州', '巴音郭楞蒙古自治州', '阿克苏地区', '克孜勒苏柯尔克孜自治州', '喀什地区', '和田地区', '伊犁哈萨克自治州', '塔城地区', '阿勒泰地区', '石河子市', '阿拉尔市', '图木舒克市', '五家渠市', '北屯市', '铁门关市', '双河市', '可克达拉市', '昆玉市', '胡杨河市'],
  '香港特别行政区': ['香港岛', '九龙半岛', '新界'],
  '澳门特别行政区': ['澳门半岛', '氹仔', '路环']
};

// 链接组件 - 支持悬停变蓝效果
const FooterLink = ({ label, url }: { label: string; url: string }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <a
      href={url}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        display: 'block',
        lineHeight: '40px',
        letterSpacing: 0,
        color: isHovered ? '#0d99ff' : '#1d2233',
        fontFamily: '"Noto Sans SC", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", SimHei, Arial, Helvetica, sans-serif',
        fontSize: '16px',
        textDecoration: 'none',
        transition: 'color 0.2s ease',
      }}
    >
      {label}
    </a>
  );
};

const Footer = () => {
  // 表单状态
  const [phone, setPhone] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [shopType, setShopType] = useState('');
  const [shopTypeError, setShopTypeError] = useState('');
  const [selectedProvince, setSelectedProvince] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [showProvinceDropdown, setShowProvinceDropdown] = useState(false);
  const [showCityDropdown, setShowCityDropdown] = useState(false);
  const [hoveredPhone, setHoveredPhone] = useState(false);
  const [focusedPhone, setFocusedPhone] = useState(false);
  const [hoveredShopType, setHoveredShopType] = useState(false);
  const [focusedShopType, setFocusedShopType] = useState(false);
  const [hoveredCity, setHoveredCity] = useState(false);
  const [isFormComplete, setIsFormComplete] = useState(false);

  // 检查表单是否完整
  useEffect(() => {
    const phoneValid = phone && /^1[3-9]\d{9}$/.test(phone);
    const shopTypeValid = shopType && !/^\d+$/.test(shopType);
    const cityValid = selectedProvince && selectedCity;
    
    setIsFormComplete(!!(phoneValid && shopTypeValid && cityValid));
  }, [phone, shopType, selectedProvince, selectedCity]);

  // 手机号验证
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPhone(value);
    setPhoneError('');
  };

  const validatePhone = () => {
    const phoneRegex = /^1[3-9]\d{9}$/;
    if (phone && !phoneRegex.test(phone)) {
      setPhoneError('请输入正确的手机号');
    }
  };

  // 店铺类型验证
  const handleShopTypeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setShopType(value);
    setShopTypeError('');
  };

  const validateShopType = () => {
    const isOnlyDigits = /^\d+$/.test(shopType);
    if (shopType && isOnlyDigits) {
      setShopTypeError('禁止输入纯数字组合');
    }
  };

  // 省份选择
  const handleProvinceSelect = (province: string) => {
    setSelectedProvince(province);
    setSelectedCity('');
    setShowProvinceDropdown(false);
    setShowCityDropdown(true);
  };

  // 城市选择
  const handleCitySelect = (city: string) => {
    setSelectedCity(city);
    setShowCityDropdown(false);
  };

  // 点击外部关闭下拉菜单
  const handleClickOutside = (e: React.MouseEvent) => {
    if (!(e.target as HTMLElement).closest('.dropdown-container')) {
      setShowProvinceDropdown(false);
      setShowCityDropdown(false);
    }
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start',
      width: '100%',
      maxWidth: '1920px',
      margin: '0 auto',
    }} onClick={handleClickOutside}>
      {/* 信息容器 */}
      <div style={{
        display: 'inline-flex',
        flexShrink: 0,
        alignItems: 'flex-start',
        alignSelf: 'stretch',
        justifyContent: 'center',
        columnGap: '20px',
        background: '#f4f5f6',
        padding: '120px 240px 60px',
        boxSizing: 'border-box',
      }}>
        {/* 关于思迅 */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          flexShrink: 0,
          alignItems: 'flex-start',
          paddingRight: '20px',
          paddingLeft: '20px',
          rowGap: '40px',
        }}>
          <p style={{
            flexShrink: 0,
            alignSelf: 'stretch',
            letterSpacing: 0,
            color: '#1d2233',
            fontFamily: '"Noto Sans SC", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", SimHei, Arial, Helvetica, sans-serif',
            fontSize: '24px',
            fontWeight: '500',
            margin: 0,
          }}>
            关于思迅
          </p>
          <div>
            {aboutUsLinks.map((link, index) => (
              <FooterLink key={index} label={link.label} url={link.url} />
            ))}
          </div>
        </div>

        {/* 其他产品线 */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          flexShrink: 0,
          alignItems: 'flex-start',
          padding: '0px 40px 169px 20px',
          rowGap: '40px',
        }}>
          <p style={{
            flexShrink: 0,
            alignSelf: 'stretch',
            letterSpacing: 0,
            color: '#1d2233',
            fontFamily: '"Noto Sans SC", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", SimHei, Arial, Helvetica, sans-serif',
            fontSize: '24px',
            fontWeight: '500',
            margin: 0,
          }}>
            其他产品线
          </p>
          <div style={{ alignSelf: 'stretch' }}>
            {productsLinks.map((link, index) => (
              <FooterLink key={index} label={link.label} url={link.url} />
            ))}
          </div>
        </div>

        {/* 联系思迅 */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          flexShrink: 0,
          alignItems: 'flex-start',
          padding: '0px 64px 49px 20px',
          rowGap: '40px',
        }}>
          <p style={{
            flexShrink: 0,
            lineHeight: '29px',
            letterSpacing: 0,
            color: '#1d2233',
            fontFamily: '"Noto Sans SC", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", SimHei, Arial, Helvetica, sans-serif',
            fontSize: '24px',
            fontWeight: '500',
            margin: 0,
          }}>
            联系思迅
          </p>
          <div style={{ alignSelf: 'stretch' }}>
            {solutionsLinks.map((link, index) => (
              <FooterLink key={index} label={link.label} url={link.url} />
            ))}
          </div>
        </div>

        {/* 如何购买 */}
        <div style={{
          display: 'inline-flex',
          flexDirection: 'column',
          flexShrink: 0,
          alignItems: 'flex-start',
          paddingRight: '20px',
          paddingLeft: '20px',
          rowGap: '40px',
        }}>
          <p style={{
            flexShrink: 0,
            lineHeight: '29px',
            letterSpacing: 0,
            color: '#1d2233',
            fontFamily: '"Noto Sans SC", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", SimHei, Arial, Helvetica, sans-serif',
            fontSize: '24px',
            fontWeight: '500',
            margin: 0,
          }}>
            如何购买
          </p>
          <div style={{
            display: 'inline-flex',
            flexDirection: 'column',
            flexShrink: 0,
            alignItems: 'flex-start',
            alignSelf: 'stretch',
            rowGap: '20px',
          }}>
            <div style={{
              flexShrink: 0,
              width: '187px',
              lineHeight: '40px',
              letterSpacing: 0,
              color: '#000000',
              fontFamily: '"Noto Sans SC", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", SimHei, Arial, Helvetica, sans-serif',
              fontSize: '16px',
            }}>
              销售热线：400-777-9977<br />
              销售留言
            </div>
            
            {/* 表单 */}
            <div style={{
              display: 'inline-flex',
              flexDirection: 'column',
              flexShrink: 0,
              alignItems: 'flex-start',
              alignSelf: 'stretch',
              rowGap: '10px',
            }}>
              {/* Group 18 - 手机号输入框 */}
              <div style={{
                position: 'relative',
                flexShrink: 0,
                width: '228px',
                height: '40px',
              }} className="dropdown-container">
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  borderRadius: '8px',
                  background: (hoveredPhone || focusedPhone) ? '#ffffff' : '#d3d7de',
                  border: (hoveredPhone || focusedPhone) ? '1px solid #0d99ff' : 'none',
                  width: '228px',
                  height: '40px',
                  boxSizing: 'border-box',
                  transition: 'all 0.2s ease',
                  opacity: (hoveredPhone || focusedPhone) ? 1 : 0.7,
                }}
                  onMouseEnter={() => setHoveredPhone(true)}
                  onMouseLeave={() => setHoveredPhone(false)}
                />
                <input
                  type="text"
                  value={phone}
                  onChange={handlePhoneChange}
                  onBlur={() => {
                    validatePhone();
                    setFocusedPhone(false);
                  }}
                  onFocus={() => setFocusedPhone(true)}
                  placeholder="您的手机号"
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    padding: '0 10px',
                    border: 'none',
                    borderRadius: '8px',
                    background: 'transparent',
                    opacity: phone ? 1 : 0.6,
                    letterSpacing: 0,
                    color: '#000000',
                    fontFamily: '"Noto Sans SC", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", SimHei, Arial, Helvetica, sans-serif',
                    fontSize: '16px',
                    outline: 'none',
                    boxSizing: 'border-box',
                  }}
                />
              </div>
              {phoneError && (
                <p style={{
                  color: '#ff0000',
                  fontSize: '12px',
                  margin: '0',
                  marginTop: '-5px',
                }}>
                  {phoneError}
                </p>
              )}
              
              {/* Group 20 - 店铺类型输入框 */}
              <div style={{
                position: 'relative',
                flexShrink: 0,
                width: '228px',
                height: '40px',
              }} className="dropdown-container">
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  borderRadius: '8px',
                  background: (hoveredShopType || focusedShopType) ? '#ffffff' : '#d3d7de',
                  border: (hoveredShopType || focusedShopType) ? '1px solid #0d99ff' : 'none',
                  width: '228px',
                  height: '40px',
                  boxSizing: 'border-box',
                  transition: 'all 0.2s ease',
                  opacity: (hoveredShopType || focusedShopType) ? 1 : 0.7,
                }}
                  onMouseEnter={() => setHoveredShopType(true)}
                  onMouseLeave={() => setHoveredShopType(false)}
                />
                <input
                  type="text"
                  value={shopType}
                  onChange={handleShopTypeChange}
                  onBlur={() => {
                    validateShopType();
                    setFocusedShopType(false);
                  }}
                  onFocus={() => setFocusedShopType(true)}
                  placeholder="店铺类型"
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    padding: '0 10px',
                    border: 'none',
                    borderRadius: '8px',
                    background: 'transparent',
                    opacity: shopType ? 1 : 0.6,
                    letterSpacing: 0,
                    color: '#000000',
                    fontFamily: '"Noto Sans SC", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", SimHei, Arial, Helvetica, sans-serif',
                    fontSize: '16px',
                    outline: 'none',
                    boxSizing: 'border-box',
                  }}
                />
              </div>
              {shopTypeError && (
                <p style={{
                  color: '#ff0000',
                  fontSize: '12px',
                  margin: '0',
                  marginTop: '-5px',
                }}>
                  {shopTypeError}
                </p>
              )}
              
              {/* Group 19 - 省份城市选择框 */}
              <div style={{
                position: 'relative',
                flexShrink: 0,
                width: '228px',
                height: '40px',
              }} className="dropdown-container">
                <div
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    borderRadius: '8px',
                    background: hoveredCity ? '#ffffff' : '#d3d7de',
                    border: hoveredCity ? '1px solid #0d99ff' : 'none',
                    width: '228px',
                    height: '40px',
                    boxSizing: 'border-box',
                    transition: 'all 0.2s ease',
                    cursor: 'pointer',
                    opacity: hoveredCity ? 1 : 0.7,
                  }}
                  onMouseEnter={() => setHoveredCity(true)}
                  onMouseLeave={() => setHoveredCity(false)}
                  onClick={() => {
                    setShowProvinceDropdown(!showProvinceDropdown);
                    setShowCityDropdown(false);
                  }}
                >
                  <p style={{
                    position: 'absolute',
                    top: 0,
                    left: '10px',
                    opacity: (selectedProvince && selectedCity) ? 1 : 0.6,
                    width: '180px',
                    height: '40px',
                    lineHeight: '40px',
                    letterSpacing: 0,
                    color: '#000000',
                    fontFamily: '"Noto Sans SC", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", SimHei, Arial, Helvetica, sans-serif',
                    fontSize: '16px',
                    margin: 0,
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}>
                    {selectedProvince && selectedCity ? `${selectedProvince} ${selectedCity}` : '店铺所在省份城市'}
                  </p>
                </div>
                <img
                  src=".figma/image/mpw1s00i-u8nhqlk.svg"
                  style={{
                    position: 'absolute',
                    top: '12px',
                    left: '196px',
                    width: '16px',
                    height: '17px',
                    transform: showProvinceDropdown || showCityDropdown ? 'rotate(180deg)' : 'rotate(0deg)',
                    transition: 'transform 0.2s ease',
                    pointerEvents: 'none',
                  }}
                  alt=""
                />
                
                {/* 省份下拉菜单 */}
                {showProvinceDropdown && (
                  <div style={{
                    position: 'absolute',
                    top: '45px',
                    left: 0,
                    width: '228px',
                    background: '#ffffff',
                    border: '1px solid #f5f6f7',
                    borderRadius: '8px',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                    zIndex: 1000,
                    maxHeight: '200px',
                    overflowY: 'auto',
                  }}>
                    {provinces.map((province, index) => (
                      <div
                        key={province}
                        onClick={() => handleProvinceSelect(province)}
                        style={{
                          padding: '8px 12px',
                          cursor: 'pointer',
                          borderBottom: index === provinces.length - 1 ? 'none' : '1px solid #f0f0f0',
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = '#f5f6f7';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = '#ffffff';
                        }}
                      >
                        {province}
                      </div>
                    ))}
                  </div>
                )}
                
                {/* 城市下拉菜单 */}
                {showCityDropdown && selectedProvince && (
                  <div style={{
                    position: 'absolute',
                    top: '45px',
                    left: 0,
                    width: '228px',
                    background: '#ffffff',
                    border: '1px solid #f5f6f7',
                    borderRadius: '8px',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                    zIndex: 1000,
                    maxHeight: '200px',
                    overflowY: 'auto',
                  }}>
                    {citiesData[selectedProvince]?.map((city, index) => (
                      <div
                        key={city}
                        onClick={() => handleCitySelect(city)}
                        style={{
                          padding: '8px 12px',
                          cursor: 'pointer',
                          borderBottom: index === (citiesData[selectedProvince]?.length || 0) - 1 ? 'none' : '1px solid #f0f0f0',
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = '#f5f6f7';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = '#ffffff';
                        }}
                      >
                        {city}
                      </div>
                    ))}
                  </div>
                )}
              </div>
              
              {/* Group 21 - 提交按钮 */}
              <div style={{
                position: 'relative',
                flexShrink: 0,
                width: '100px',
                height: '40px',
              }}>
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  opacity: isFormComplete ? 1 : 0.6,
                  borderRadius: '8px',
                  background: isFormComplete ? '#0d99ff' : '#1d2233',
                  width: '100px',
                  height: '40px',
                  boxSizing: 'border-box',
                  transition: 'all 0.3s ease',
                }} />
                <p style={{
                  position: 'absolute',
                  top: '11px',
                  left: '34px',
                  opacity: isFormComplete ? 1 : 0.7,
                  width: '32px',
                  height: '19px',
                  lineHeight: '19px',
                  letterSpacing: 0,
                  color: '#ffffff',
                  fontFamily: '"Noto Sans SC", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", SimHei, Arial, Helvetica, sans-serif',
                  fontSize: '16px',
                  margin: 0,
                  transition: 'opacity 0.3s ease',
                }}>
                  提交
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 社交媒体 */}
        <div style={{
          display: 'inline-flex',
          flexShrink: 0,
          alignItems: 'flex-start',
          justifyContent: 'flex-end',
          columnGap: '60px',
          padding: '20px 0px 20px 44px',
        }}>
          {/* 官方公众号 */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            flexShrink: 0,
            alignItems: 'center',
          }}>
            <p style={{
              lineHeight: '24px',
              letterSpacing: 0,
              color: '#1d2233',
              fontFamily: '"Noto Sans SC", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", SimHei, Arial, Helvetica, sans-serif',
              fontSize: '20px',
              fontWeight: '500',
              margin: 0,
            }}>
              关注官方公众号
            </p>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              columnGap: '10px',
              marginTop: '15px',
              borderRadius: '8px',
              background: '#ffffff',
              padding: '7px',
              width: '144px',
              height: '144px',
              boxSizing: 'border-box',
            }}>
              <img
                src=".figma/image/mpw1rbtk-s5recnr.png"
                style={{
                  flexShrink: 0,
                  width: '128px',
                  height: '128px',
                }}
                alt=""
              />
            </div>
          </div>

          {/* 微信视频号 */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            flexShrink: 0,
            alignItems: 'center',
          }}>
            <p style={{
              lineHeight: '24px',
              letterSpacing: 0,
              color: '#1d2233',
              fontFamily: '"Noto Sans SC", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", SimHei, Arial, Helvetica, sans-serif',
              fontSize: '20px',
              fontWeight: '500',
              margin: 0,
            }}>
              关注微信视频号
            </p>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              alignSelf: 'stretch',
              justifyContent: 'center',
              columnGap: '10px',
              marginTop: '15px',
              borderRadius: '8px',
              background: '#ffffff',
              padding: '7px',
              boxSizing: 'border-box',
            }}>
              <img
                src=".figma/image/mpw1rbtk-mj4mlxj.png"
                style={{
                  flexShrink: 0,
                  width: '130px',
                  height: '130px',
                }}
                alt=""
              />
            </div>
          </div>

          {/* 官方抖音号 */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            flexShrink: 0,
            alignItems: 'center',
          }}>
            <p style={{
              lineHeight: '24px',
              letterSpacing: 0,
              color: '#1d2233',
              fontFamily: '"Noto Sans SC", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", SimHei, Arial, Helvetica, sans-serif',
              fontSize: '20px',
              fontWeight: '500',
              margin: 0,
            }}>
              关注官方抖音号
            </p>
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              alignSelf: 'stretch',
              justifyContent: 'center',
              marginTop: '15px',
              borderRadius: '8px',
              background: '#ffffff',
              padding: '7px 7px 9px',
              rowGap: '10px',
              boxSizing: 'border-box',
            }}>
              <img
                src=".figma/image/mpw1rbtk-90n2blm.png"
                style={{
                  flexShrink: 0,
                  width: '130px',
                  height: '128px',
                }}
                alt=""
              />
            </div>
          </div>
        </div>
      </div>

      {/* 底部版权 */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        flexShrink: 0,
        alignItems: 'center',
        alignSelf: 'stretch',
        justifyContent: 'center',
        background: '#f4f5f6',
        padding: '30px 0px',
        rowGap: '10px',
        boxSizing: 'border-box',
      }}>
        <p style={{
          flexShrink: 0,
          lineHeight: '17px',
          letterSpacing: 0,
          color: '#000000',
          fontFamily: '"Noto Sans SC", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", SimHei, Arial, Helvetica, sans-serif',
          fontSize: '14px',
          margin: 0,
        }}>
          深圳市思迅软件股份有限公司 版权所有
        </p>
        <p style={{
          flexShrink: 0,
          lineHeight: '17px',
          letterSpacing: 0,
          color: '#000000',
          fontFamily: '"Noto Sans SC", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", SimHei, Arial, Helvetica, sans-serif',
          fontSize: '14px',
          margin: 0,
        }}>
          Copyright 2026 www.sixun.com.cn All Rights Reserved.{' '}
          <span style={{
            letterSpacing: 0,
            color: '#000000',
            fontFamily: '"Noto Sans SC", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", SimHei, Arial, Helvetica, sans-serif',
            fontSize: '14px',
            textDecoration: 'underline',
          }}>
            粤ICP备14033072号
          </span>
        </p>
      </div>
    </div>
  );
};

export default Footer;
