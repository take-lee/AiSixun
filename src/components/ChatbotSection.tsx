import { useState } from 'react';
import { useResponsive } from '../hooks/useResponsive';

interface Message {
  id: number;
  type: string;
  text: string;
  isLoading?: boolean;
  hasData?: boolean;
}

const ChatbotSection = () => {
  const [inputValue, setInputValue] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      type: 'ai',
      text: '你好，我是思迅Ai助手，可以查询销售、库存、会员分析，试试问我什么？',
    },
  ]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const { r, isMobile, isTablet, width } = useResponsive();

  const handleSend = () => {
    if (!inputValue.trim() || isProcessing) return;

    const userMessage: Message = {
      id: Date.now(),
      type: 'user',
      text: inputValue.trim(),
    };
    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsProcessing(true);

    setTimeout(() => {
      const loadingMessage: Message = {
        id: Date.now() + 1,
        type: 'ai',
        text: '请稍候，正在为您查询',
        isLoading: true,
      };
      setMessages((prev) => [...prev, loadingMessage]);

      setTimeout(() => {
        const aiResponse: Message = {
          id: Date.now() + 2,
          type: 'ai',
          text: '',
          hasData: true,
        };
        setMessages((prev) => {
          const updated = prev.filter((m) => !m.isLoading);
          return [...updated, aiResponse];
        });
        setIsProcessing(false);
      }, 2000);
    }, 500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !isProcessing) {
      handleSend();
    }
  };

  const toggleProcessing = () => {
    setIsProcessing((prev) => !prev);
  };

  // 响应式尺寸
  const sectionPaddingX = r('12px', '16px', '40px', '100px', '240px');
  const sectionPaddingY = r('40px', '50px', '80px', '110px', '140px');
  const titleFontSize = r('24px', '30px', '36px', '44px', '48px');
  const titleLineHeight = r('30px', '38px', '46px', '54px', '58px');
  const descFontSize = r('13px', '15px', '18px', '22px', '24px');
  const itemFontSize = r('15px', '17px', '20px', '22px', '24px');
  const itemDescFont = r('12px', '13px', '14px', '15px', '16px');
  const chatFontSize = r('13px', '14px', '15px', '16px', '16px');
  const buttonFontSize = r('13px', '14px', '15px', '18px', '20px');
  const buttonHeight = r('40px', '44px', '48px', '54px', '56px');

  // 小屏幕改为垂直布局
  const isVerticalLayout = isMobile || isTablet || width < 1280;

  // 左侧宽度
  const leftWidth = isVerticalLayout ? '100%' : r('320px', '380px', '440px', '500px', '551px');
  // 右侧聊天窗口宽度
  const chatWindowWidth = isVerticalLayout
    ? '100%'
    : Math.max(320, Math.min(746, width - (width > 1440 ? 1030 : width > 1024 ? 600 : 400)));
  const chatWindowHeight = r('460px', '500px', '520px', '550px', '560px');
  const chatHeaderFontSize = r('18px', '20px', '22px', '23px', '24px');

  const inputRowStyle = {
    display: 'flex' as const,
    flexShrink: 0,
    alignItems: 'center',
    alignSelf: 'stretch' as const,
    justifyContent: 'space-between' as const,
    borderRadius: '28px',
    background: (isHovered || isFocused) ? '#ffffff' : '#f5f6f7',
    border: (isHovered || isFocused) ? '1px solid #0d99ff' : '1px solid #d9d9d9',
    padding: `9px 9px 9px ${r('14px', '16px', '18px', '19px', '19px')}`,
    minHeight: r('48px', '50px', '52px', '54px', '56px'),
    boxSizing: 'border-box' as const,
    transition: 'all 0.2s ease',
    pointerEvents: isProcessing ? ('none' as const) : ('auto' as const),
    opacity: isProcessing ? 0.7 : 1,
  };

  return (
    <section style={{
      display: 'flex',
      flexDirection: isVerticalLayout ? 'column' : 'row',
      alignItems: isVerticalLayout ? 'center' : 'flex-start',
      justifyContent: 'space-between',
      backgroundImage: 'linear-gradient(180deg, #d9e8ff 0%, #d9e8ff66 100%)',
      padding: `${sectionPaddingY} ${sectionPaddingX}`,
      width: '100%',
      minHeight: 'auto',
      boxSizing: 'border-box',
      gap: r('30px', '40px', '50px', '60px', '0px'),
    }}>
      {/* 左侧内容 */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        flexShrink: 0,
        alignItems: 'flex-start',
        width: leftWidth,
        maxWidth: '100%',
      }}>
        <div style={{
          display: 'inline-flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          alignSelf: 'stretch',
          padding: '4px 0px',
          rowGap: '20px',
        }}>
          <h2 style={{
            flexShrink: 0,
            padding: '10px 0px',
            overflow: 'hidden',
            lineHeight: titleLineHeight,
            letterSpacing: 0,
            fontFamily: '"Noto Sans SC", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", SimHei, Arial, Helvetica, sans-serif',
            fontSize: titleFontSize,
            fontWeight: 700,
            margin: 0,
          }}>
            <span style={{ color: '#0068eb' }}>Ai 驱动</span>
            <span style={{ color: '#1d2233' }}> 零售数智化</span>
          </h2>
          <p style={{
            flexShrink: 0,
            lineHeight: '1.3',
            letterSpacing: 0,
            color: '#000000',
            fontFamily: '"Noto Sans SC", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", SimHei, Arial, Helvetica, sans-serif',
            fontSize: descFontSize,
            margin: 0,
          }}>
            Ai 驱动零售全链路智能化-智能推荐、库存预警
          </p>
        </div>

        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          alignSelf: 'stretch',
          marginTop: r('25px', '30px', '40px', '45px', '50px'),
          rowGap: r('12px', '15px', '18px', '20px', '20px'),
        }}>
          {[
            { icon: './image/mpw6pn7j-8khgrmv.svg', title: 'Ai 会员分析', desc: '功能介绍说明文字' },
            { icon: './image/mpw6pn7j-8khgrmv.svg', title: 'Ai 智能客服', desc: '功能介绍说明文字' },
            { icon: './image/mpw6pn7j-8khgrmv.svg', title: 'Ai 数据洞察', desc: '功能介绍说明文字' },
          ].map((item, idx) => (
            <div key={idx} style={{ width: '100%' }}>
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                columnGap: '16px',
              }}>
                <img
                  src={item.icon}
                  alt=""
                  style={{
                    flexShrink: 0,
                    borderRadius: '8px',
                    width: r('20px', '22px', '24px', '24px', '24px'),
                    height: r('20px', '22px', '24px', '24px', '24px'),
                  }}
                />
                <p style={{
                  flexShrink: 0,
                  lineHeight: '1.2',
                  letterSpacing: 0,
                  color: '#000000',
                  fontFamily: '"Noto Sans SC", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", SimHei, Arial, Helvetica, sans-serif',
                  fontSize: itemFontSize,
                  fontWeight: 500,
                  margin: 0,
                }}>
                  {item.title}
                </p>
              </div>
              <p style={{
                opacity: 0.6,
                margin: '3px 0 0',
                padding: `0 ${r('20px', '25px', '30px', '34px', '40px')}`,
                lineHeight: '1.2',
                letterSpacing: 0,
                color: '#000000',
                fontFamily: '"Noto Sans SC", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", SimHei, Arial, Helvetica, sans-serif',
                fontSize: itemDescFont,
              }}>
                {item.desc}
              </p>
            </div>
          ))}
        </div>

        <div style={{
          display: 'inline-flex',
          alignItems: 'flex-start',
          alignSelf: 'stretch',
          columnGap: r('15px', '18px', '22px', '26px', '30px'),
          marginTop: r('25px', '30px', '35px', '38px', '40px'),
          flexWrap: 'wrap',
        }}>
          <div style={{
            display: 'inline-flex',
            flexShrink: 0,
            alignItems: 'center',
            justifyContent: 'center',
            columnGap: '10px',
            borderRadius: '8px',
            background: '#0d99ff',
            padding: `0 ${r('16px', '20px', '24px', '28px', '30px')}`,
            height: buttonHeight,
            cursor: 'pointer',
          }}>
            <span style={{
              flexShrink: 0,
              lineHeight: '1.2',
              letterSpacing: 0,
              color: '#ffffff',
              fontFamily: '"Noto Sans SC", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", SimHei, Arial, Helvetica, sans-serif',
              fontSize: buttonFontSize,
            }}>
              了解产品
            </span>
          </div>
          <div style={{
            display: 'inline-flex',
            flexShrink: 0,
            alignItems: 'center',
            justifyContent: 'center',
            columnGap: '10px',
            border: '1px solid #0d99ff',
            borderRadius: '8px',
            background: '#ffffff',
            padding: `0 ${r('16px', '20px', '24px', '28px', '30px')}`,
            height: buttonHeight,
            cursor: 'pointer',
          }}>
            <span style={{
              flexShrink: 0,
              lineHeight: '1.2',
              letterSpacing: 0,
              color: '#0d99ff',
              fontFamily: '"Noto Sans SC", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", SimHei, Arial, Helvetica, sans-serif',
              fontSize: buttonFontSize,
            }}>
              免费试用
            </span>
          </div>
        </div>
      </div>

      {/* 右侧对话窗口 */}
      <div style={{
        display: 'flex',
        flex: isVerticalLayout ? 'none' : '1',
        alignItems: 'center',
        justifyContent: 'center',
        width: isVerticalLayout ? '100%' : 'auto',
        overflow: 'hidden',
      }}>
        <div style={{
          position: 'relative' as const,
          width: isVerticalLayout ? '100%' : `${chatWindowWidth}px`,
          maxWidth: '100%',
          height: chatWindowHeight,
        }}>
          {/* 彩色流体渐变边框 */}
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            borderRadius: '32px',
            padding: '2px',
            background: 'linear-gradient(60deg, #0d63ff, #3c81ff, #1debdd, #0cdb2f, #e3e086, #d426ff)',
            backgroundSize: '400% 400%',
            animation: 'gradientBorder 4s ease infinite',
            zIndex: 1,
          }} />

          {/* 主容器 */}
          <div style={{
            position: 'absolute',
            top: '2px',
            left: '2px',
            right: '2px',
            bottom: '2px',
            borderRadius: '30px',
            background: '#ffffff',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            overflow: 'hidden',
            zIndex: 2,
          }}>
            {/* 头部区域 */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              alignSelf: 'stretch',
              borderRadius: '31px 31px 0px 0px',
              paddingTop: '17px',
              rowGap: '17px',
            }}>
              <div style={{
                display: 'flex',
                flexShrink: 0,
                alignItems: 'center',
                alignSelf: 'stretch',
                justifyContent: 'space-between',
                marginRight: r('15px', '20px', '25px', '28px', '29px'),
                marginLeft: r('15px', '20px', '25px', '28px', '29px'),
              }}>
                <div style={{
                  display: 'inline-flex',
                  flexShrink: 0,
                  alignItems: 'center',
                  columnGap: '10px',
                }}>
                  <img
                    src="./image/mpw6yo5s-ljq553d.svg"
                    alt=""
                    style={{
                      flexShrink: 0,
                      width: r('24px', '26px', '28px', '30px', '32px'),
                      height: r('24px', '26px', '28px', '30px', '32px'),
                    }}
                  />
                  <p style={{
                    flexShrink: 0,
                    lineHeight: '1.2',
                    letterSpacing: 0,
                    color: '#1d2233',
                    fontFamily: '"Noto Sans SC", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", SimHei, Arial, Helvetica, sans-serif',
                    fontSize: chatHeaderFontSize,
                    fontWeight: 700,
                    margin: 0,
                  }}>
                    思迅智能助手
                  </p>
                </div>
                {/* Sound Wave Circle */}
                <div style={{
                  display: 'flex',
                  flexShrink: 0,
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '9px 5px 9px 4px',
                  width: r('30px', '32px', '34px', '35px', '36px'),
                  minWidth: r('30px', '32px', '34px', '35px', '36px'),
                  height: r('30px', '32px', '34px', '35px', '36px'),
                  overflow: 'hidden',
                }}>
                  {[0, 1, 2, 3, 4, 5].map((i) => (
                    <div key={i} style={{
                      borderRadius: '1px',
                      background: '#0d99ff',
                      width: '2px',
                      height: r('6px', '7px', '8px', '9px', '10px'),
                      animation: `soundWave${i} 0.8s ease-in-out infinite`,
                      animationDelay: `${i * 0.1}s`,
                    }} />
                  ))}
                </div>
              </div>
              {/* 分割线 */}
              <div style={{
                flexShrink: 0,
                background: '#d9d9d9',
                width: '100%',
                height: '1px',
              }} />
            </div>

            {/* 消息区域 */}
            <div style={{
              flex: 1,
              overflowY: 'auto',
              overflowX: 'hidden',
              alignSelf: 'stretch',
              display: 'flex',
              flexDirection: 'column',
              paddingRight: r('8px', '12px', '18px', '25px', '29px'),
              paddingTop: '10px',
            }}>
              {messages.map((message) => (
                message.type === 'ai' ? (
                  <div key={message.id} style={{
                    display: 'inline-flex',
                    alignItems: 'flex-start',
                    alignSelf: 'stretch',
                    columnGap: '10px',
                    margin: message.id === 1 ? `${r('15px', '20px', '25px', '28px', '30px')} ${r('15px', '20px', '25px', '28px', '29px')} 0 ${r('15px', '20px', '25px', '28px', '29px')}` : `0 ${r('15px', '20px', '25px', '28px', '29px')} 0 ${r('15px', '20px', '25px', '28px', '29px')}`,
                  }}>
                    <div style={{
                      display: 'flex',
                      flexShrink: 0,
                      alignItems: 'flex-start',
                      columnGap: '10px',
                      borderRadius: '8px',
                      background: '#0d99ff',
                      padding: '4px',
                    }}>
                      <img
                        src={message.isLoading ? './image/mpw6yxkj-wx09331.svg' : message.hasData ? './image/mpw6yxkj-wx09331.svg' : './image/mpw6yxkj-wx09331.svg'}
                        alt=""
                        style={{
                          flexShrink: 0,
                          width: r('18px', '20px', '22px', '23px', '24px'),
                          height: r('18px', '20px', '22px', '23px', '24px'),
                        }}
                      />
                    </div>
                    {message.hasData ? (
                      <div style={{
                        display: 'inline-flex',
                        flexDirection: 'column',
                        flexShrink: 0,
                        alignItems: 'flex-start',
                        alignSelf: 'stretch',
                        justifyContent: 'center',
                        borderRadius: '8px',
                        background: '#0d99ff29',
                        padding: '14px',
                        rowGap: '10px',
                      }}>
                        <p style={{
                          flexShrink: 0,
                          lineHeight: '1.4',
                          letterSpacing: 0,
                          color: '#1d2233',
                          fontFamily: '"Noto Sans SC", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", SimHei, Arial, Helvetica, sans-serif',
                          fontSize: chatFontSize,
                          margin: 0,
                        }}>
                          今日门店销售概况
                        </p>
                        <div style={{
                          display: 'inline-flex',
                          flexShrink: 0,
                          alignItems: 'flex-start',
                          alignSelf: 'stretch',
                          columnGap: '10px',
                          marginRight: '22px',
                          flexWrap: 'wrap',
                        }}>
                          {[
                            { label: '今日销售额', value: '¥286,430.00' },
                            { label: '客单价', value: '¥86.50' },
                          ].map((item, idx) => (
                            <div key={idx} style={{
                              display: 'inline-flex',
                              flexDirection: 'column',
                              flexShrink: 0,
                              alignItems: 'flex-start',
                              borderRadius: '8px',
                              background: '#ffffff',
                              padding: '10px',
                              rowGap: '10px',
                            }}>
                              <p style={{
                                flexShrink: 0,
                                opacity: 0.6,
                                lineHeight: '1.4',
                                letterSpacing: 0,
                                color: '#000000',
                                fontFamily: '"Noto Sans SC", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", SimHei, Arial, Helvetica, sans-serif',
                                fontSize: r('11px', '12px', '13px', '14px', '14px'),
                                margin: 0,
                              }}>
                                {item.label}
                              </p>
                              <p style={{
                                flexShrink: 0,
                                lineHeight: '1.4',
                                letterSpacing: 0,
                                color: '#0d99ff',
                                fontFamily: '"Noto Sans SC", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", SimHei, Arial, Helvetica, sans-serif',
                                fontSize: r('14px', '16px', '17px', '19px', '20px'),
                                fontWeight: 700,
                                margin: 0,
                              }}>
                                {item.value}
                              </p>
                            </div>
                          ))}
                        </div>
                        <p style={{
                          flexShrink: 0,
                          lineHeight: '1.4',
                          letterSpacing: 0,
                          color: '#000000',
                          fontFamily: '"Noto Sans SC", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", SimHei, Arial, Helvetica, sans-serif',
                          fontSize: chatFontSize,
                          margin: 0,
                        }}>
                          <span style={{ color: '#1d2233' }}>较昨日&nbsp;</span>
                          <span style={{ color: '#03b438' }}>↑12.3%</span>
                          <span style={{ color: '#1d2233' }}>，其中 3 号店表现最佳</span>
                        </p>
                      </div>
                    ) : message.isLoading ? (
                      <div style={{
                        display: 'inline-flex',
                        flexShrink: 0,
                        alignItems: 'center',
                        alignSelf: 'stretch',
                        columnGap: '10px',
                        borderRadius: '8px',
                        background: '#0d99ff29',
                        padding: '14px',
                      }}>
                        <p style={{
                          flexShrink: 0,
                          lineHeight: '1.4',
                          letterSpacing: 0,
                          color: '#0d99ff',
                          fontFamily: '"Noto Sans SC", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", SimHei, Arial, Helvetica, sans-serif',
                          fontSize: chatFontSize,
                          margin: 0,
                        }}>
                          {message.text}
                        </p>
                        <div style={{
                          display: 'flex',
                          flexShrink: 0,
                          alignItems: 'flex-start',
                          justifyContent: 'center',
                          columnGap: '4px',
                          paddingTop: '10px',
                          paddingBottom: '10px',
                          width: '24px',
                        }}>
                          {[0, 1, 2].map((i) => (
                            <div key={i} style={{
                              flexShrink: 0,
                              borderRadius: '50%',
                              background: '#0d99ff',
                              width: '4px',
                              height: '4px',
                              animation: `loadingDots${i} 1s infinite`,
                            }} />
                          ))}
                        </div>
                      </div>
                    ) : (
                      <div style={{
                        display: 'flex',
                        flexShrink: 0,
                        alignItems: 'center',
                        justifyContent: 'center',
                        columnGap: '10px',
                        borderRadius: '8px',
                        background: '#0d99ff33',
                        padding: '14px',
                      }}>
                        <p style={{
                          flexShrink: 0,
                          lineHeight: '1.4',
                          color: '#000000',
                          fontFamily: '"Noto Sans SC", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", SimHei, Arial, Helvetica, sans-serif',
                          fontSize: chatFontSize,
                          margin: 0,
                        }}>
                          {message.text}
                        </p>
                      </div>
                    )}
                  </div>
                ) : (
                  <div key={message.id} style={{
                    display: 'inline-flex',
                    alignItems: 'flex-start',
                    alignSelf: 'stretch',
                    justifyContent: 'flex-end',
                    columnGap: '14px',
                    marginTop: '20px',
                    marginLeft: r('40px', '50px', '60px', '70px', '80px'),
                    marginRight: r('10px', '15px', '20px', '25px', '29px'),
                  }}>
                    <div style={{
                      display: 'inline-flex',
                      flexShrink: 0,
                      alignItems: 'center',
                      justifyContent: 'center',
                      columnGap: '10px',
                      borderRadius: '8px',
                      background: '#0d99ff',
                      padding: '14px',
                    }}>
                      <p style={{
                        flexShrink: 0,
                        lineHeight: '1.4',
                        letterSpacing: 0,
                        color: '#ffffff',
                        fontFamily: '"Noto Sans SC", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", SimHei, Arial, Helvetica, sans-serif',
                        fontSize: chatFontSize,
                        margin: 0,
                      }}>
                        {message.text}
                      </p>
                    </div>
                    <img
                      src="./image/mpul3t6y-x3y7nnm.png"
                      alt="用户头像"
                      style={{
                        flexShrink: 0,
                        borderRadius: '8px',
                        width: r('24px', '26px', '28px', '30px', '32px'),
                        height: r('24px', '26px', '28px', '30px', '32px'),
                      }}
                    />
                  </div>
                )
              ))}
            </div>

            {/* 输入区域 */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              alignSelf: 'stretch',
              marginTop: '0px',
              borderRadius: '0px 0px 31px 31px',
              padding: `${r('15px', '18px', '22px', '26px', '30px')} ${r('12px', '16px', '20px', '25px', '29px')}`,
              rowGap: '10px',
            }}>
              <div style={inputRowStyle}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                <p style={{
                  flexShrink: 0,
                  opacity: 0.4,
                  lineHeight: '1.2',
                  letterSpacing: 0,
                  color: '#000000',
                  fontFamily: '"Noto Sans SC", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", SimHei, Arial, Helvetica, sans-serif',
                  fontSize: chatFontSize,
                  margin: 0,
                }}>
                  {inputValue || '请输入你的问题'}
                </p>
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => setIsFocused(false)}
                  style={{
                    position: 'absolute',
                    width: '60%',
                    height: '40px',
                    left: '30px',
                    opacity: 0,
                    border: 'none',
                    background: 'transparent',
                    outline: 'none',
                    fontSize: chatFontSize,
                  }}
                />
                <div style={{
                  position: 'relative',
                  flexShrink: 0,
                  width: r('28px', '30px', '33px', '35px', '36px'),
                  height: r('28px', '30px', '33px', '35px', '36px'),
                  cursor: 'pointer',
                  pointerEvents: 'auto',
                }} onClick={isProcessing ? toggleProcessing : handleSend}>
                  <img
                    src="./image/mpw6zbz2-hxcn2ch.png"
                    alt="发送"
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                      borderRadius: '50%',
                      transform: 'rotate(-90deg)',
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 关键帧动画 */}
      <style dangerouslySetInnerHTML={{
        __html: `
        @keyframes gradientBorder {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes soundWave0 { 0%, 100% { transform: scaleY(0.6); } 50% { transform: scaleY(1); } }
        @keyframes soundWave1 { 0%, 100% { transform: scaleY(0.7); } 50% { transform: scaleY(1.3); } }
        @keyframes soundWave2 { 0%, 100% { transform: scaleY(0.5); } 50% { transform: scaleY(1.4); } }
        @keyframes soundWave3 { 0%, 100% { transform: scaleY(0.8); } 50% { transform: scaleY(1.1); } }
        @keyframes soundWave4 { 0%, 100% { transform: scaleY(0.7); } 50% { transform: scaleY(1.2); } }
        @keyframes soundWave5 { 0%, 100% { transform: scaleY(0.5); } 50% { transform: scaleY(1.3); } }
        @keyframes loadingDots0 { 0%, 60%, 100% { transform: translateY(0); } 30% { transform: translateY(-4px); } }
        @keyframes loadingDots1 { 0%, 60%, 100% { transform: translateY(0); } 30% { transform: translateY(-4px); } }
        @keyframes loadingDots2 { 0%, 60%, 100% { transform: translateY(0); } 30% { transform: translateY(-4px); } }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: rgba(0, 0, 0, 0.2); border-radius: 3px; }
        ::-webkit-scrollbar-thumb:hover { background: rgba(0, 0, 0, 0.3); }
      `}} />
    </section>
  );
};

export default ChatbotSection;
