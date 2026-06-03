import { useState } from 'react';

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

  const handleSend = () => {
    if (!inputValue.trim() || isProcessing) return;

    const userMessage = {
      id: Date.now(),
      type: 'user',
      text: inputValue.trim(),
    };
    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsProcessing(true);

    setTimeout(() => {
      const loadingMessage = {
        id: Date.now() + 1,
        type: 'ai',
        text: '请稍候，正在为您查询',
        isLoading: true,
      };
      setMessages((prev) => [...prev, loadingMessage]);

      setTimeout(() => {
        const aiResponse = {
          id: Date.now() + 2,
          type: 'ai',
          text: '',
          hasData: true,
        };
        setMessages((prev) => {
          const updated = prev.filter(m => !m.isLoading);
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
    setIsProcessing(prev => !prev);
  };

  const inputRowStyle = {
    display: 'flex',
    flexShrink: 0,
    alignItems: 'center',
    alignSelf: 'stretch',
    justifyContent: 'space-between',
    borderRadius: '28px',
    background: (isHovered || isFocused) ? '#ffffff' : '#f5f6f7',
    border: (isHovered || isFocused) ? '1px solid #0d99ff' : '1px solid #d9d9d9',
    padding: '9px 9px 9px 19px',
    minWidth: '684px',
    height: '56px',
    boxSizing: 'border-box' as const,
    transition: 'all 0.2s ease',
    pointerEvents: isProcessing ? ('none' as const) : ('auto' as const),
    opacity: isProcessing ? 0.7 : 1,
  };

  return (
    <section style={{
      display: 'flex',
      alignItems: 'flex-start',
      justifyContent: 'space-between',
      backgroundImage: 'linear-gradient(180deg, #d9e8ff 0%, #d9e8ff66 100%)',
      padding: '140px 240px',
      width: '1920px',
      height: '838px',
      boxSizing: 'border-box',
    }}>
      {/* 左侧内容 */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        flexShrink: 0,
        alignItems: 'flex-start',
        width: '551px',
        height: '534px',
      }}>
        <div style={{
          display: 'inline-flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          alignSelf: 'stretch',
          padding: '4px 30px',
          rowGap: '20px',
        }}>
          <h2 style={{
            flexShrink: 0,
            padding: '10px 0px',
            overflow: 'hidden',
            lineHeight: '58px',
            letterSpacing: 0,
            fontFamily: '"Noto Sans SC", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", SimHei, Arial, Helvetica, sans-serif',
            fontSize: '48px',
            fontWeight: 700,
            margin: 0,
          }}>
            <span style={{ color: '#0068eb' }}>Ai 驱动</span>
            <span style={{ color: '#1d2233' }}>零售数智化</span>
          </h2>
          <p style={{
            flexShrink: 0,
            lineHeight: '29px',
            letterSpacing: 0,
            color: '#000000',
            fontFamily: '"Noto Sans SC", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", SimHei, Arial, Helvetica, sans-serif',
            fontSize: '24px',
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
          marginTop: '50px',
          marginRight: '279px',
        }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            alignSelf: 'stretch',
            columnGap: '16px',
            marginRight: '48px',
            paddingRight: '30px',
            paddingLeft: '30px',
          }}>
            <img
              src=".figma/image/mpw6pn7j-8khgrmv.svg"
              alt=""
              style={{
                flexShrink: 0,
                borderRadius: '8px',
                width: '24px',
                height: '24px',
                overflow: 'hidden',
              }}
            />
            <p style={{
              flexShrink: 0,
              lineHeight: '29px',
              letterSpacing: 0,
              color: '#000000',
              fontFamily: '"Noto Sans SC", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", SimHei, Arial, Helvetica, sans-serif',
              fontSize: '24px',
              fontWeight: 500,
              margin: 0,
            }}>
              Ai 会员分析
            </p>
          </div>
          <p style={{
            opacity: 0.6,
            margin: '3px 0px 0px',
            padding: '10px 72px',
            lineHeight: '19px',
            letterSpacing: 0,
            color: '#000000',
            fontFamily: '"Noto Sans SC", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", SimHei, Arial, Helvetica, sans-serif',
            fontSize: '16px',
          }}>
            功能介绍说明文字
          </p>
        </div>

        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          alignSelf: 'stretch',
          marginTop: '20px',
          marginRight: '279px',
        }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            alignSelf: 'stretch',
            columnGap: '16px',
            marginRight: '48px',
            paddingRight: '30px',
            paddingLeft: '30px',
          }}>
            <img
              src=".figma/image/mpw6pn7j-8khgrmv.svg"
              alt=""
              style={{
                flexShrink: 0,
                borderRadius: '8px',
                width: '24px',
                height: '24px',
                overflow: 'hidden',
              }}
            />
            <p style={{
              flexShrink: 0,
              lineHeight: '29px',
              letterSpacing: 0,
              color: '#000000',
              fontFamily: '"Noto Sans SC", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", SimHei, Arial, Helvetica, sans-serif',
              fontSize: '24px',
              fontWeight: 500,
              margin: 0,
            }}>
              Ai 智能客服
            </p>
          </div>
          <p style={{
            opacity: 0.6,
            margin: '3px 0px 0px',
            padding: '10px 72px',
            lineHeight: '19px',
            letterSpacing: 0,
            color: '#000000',
            fontFamily: '"Noto Sans SC", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", SimHei, Arial, Helvetica, sans-serif',
            fontSize: '16px',
          }}>
            功能介绍说明文字
          </p>
        </div>

        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          alignSelf: 'stretch',
          marginTop: '20px',
          marginRight: '279px',
        }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            alignSelf: 'stretch',
            columnGap: '16px',
            marginRight: '43px',
            paddingRight: '30px',
            paddingLeft: '30px',
          }}>
            <img
              src=".figma/image/mpw6pn7j-8khgrmv.svg"
              alt=""
              style={{
                flexShrink: 0,
                borderRadius: '8px',
                width: '24px',
                height: '24px',
                overflow: 'hidden',
              }}
            />
            <p style={{
              flexShrink: 0,
              lineHeight: '29px',
              letterSpacing: 0,
              color: '#000000',
              fontFamily: '"Noto Sans SC", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", SimHei, Arial, Helvetica, sans-serif',
              fontSize: '24px',
              fontWeight: 500,
              margin: 0,
            }}>
              Ai 数据洞察
            </p>
          </div>
          <p style={{
            opacity: 0.6,
            margin: '3px 0px 0px',
            padding: '10px 72px',
            lineHeight: '19px',
            letterSpacing: 0,
            color: '#000000',
            fontFamily: '"Noto Sans SC", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", SimHei, Arial, Helvetica, sans-serif',
            fontSize: '16px',
          }}>
            功能介绍说明文字
          </p>
        </div>

        <div style={{
          display: 'inline-flex',
          alignItems: 'flex-start',
          alignSelf: 'stretch',
          columnGap: '30px',
          marginTop: '40px',
          marginRight: '181px',
          paddingRight: '30px',
          paddingLeft: '30px',
        }}>
          <div style={{
            display: 'inline-flex',
            flexShrink: 0,
            alignItems: 'center',
            justifyContent: 'center',
            columnGap: '10px',
            borderRadius: '8px',
            background: '#0d99ff',
            padding: '14px 30px',
            height: '56px',
          }}>
            <span style={{
              flexShrink: 0,
              lineHeight: '24px',
              letterSpacing: 0,
              color: '#ffffff',
              fontFamily: '"Noto Sans SC", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", SimHei, Arial, Helvetica, sans-serif',
              fontSize: '20px',
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
            padding: '13px 29px',
            height: '56px',
          }}>
            <span style={{
              flexShrink: 0,
              lineHeight: '24px',
              letterSpacing: 0,
              color: '#0d99ff',
              fontFamily: '"Noto Sans SC", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", SimHei, Arial, Helvetica, sans-serif',
              fontSize: '20px',
            }}>
              免费试用
            </span>
          </div>
        </div>
      </div>

      {/* 右侧对话窗口 */}
      <div style={{
        display: 'flex',
        flexShrink: 0,
        alignItems: 'center',
        width: '744px',
        height: 'auto',
        overflow: 'hidden',
      }}>
        <div style={{
          position: 'relative',
          width: '746px',
          height: '560px',
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
            {/* 内层容器 */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              flexGrow: 1,
              alignItems: 'flex-start',
              borderRadius: '32px',
              padding: '1px',
              width: '100%',
              height: '100%',
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
                  marginRight: '29px',
                  marginLeft: '29px',
                  minWidth: '684px',
                }}>
                  <div style={{
                    display: 'inline-flex',
                    flexShrink: 0,
                    alignItems: 'center',
                    columnGap: '10px',
                  }}>
                    <img
                      src=".figma/image/mpw6yo5s-ljq553d.svg"
                      alt=""
                      style={{
                        flexShrink: 0,
                        width: '32px',
                        height: '32px',
                        overflow: 'hidden',
                      }}
                    />
                    <p style={{
                      flexShrink: 0,
                      lineHeight: '29px',
                      letterSpacing: 0,
                      color: '#1d2233',
                      fontFamily: '"Noto Sans SC", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", SimHei, Arial, Helvetica, sans-serif',
                      fontSize: '24px',
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
                    width: '36px',
                    minWidth: '36px',
                    height: '36px',
                    overflow: 'hidden',
                  }}>
                    <div style={{
                      borderRadius: '1px',
                      background: '#0d99ff',
                      width: '2px',
                      height: '10px',
                      animation: 'soundWave1 0.8s ease-in-out infinite',
                    }} />
                    <div style={{
                      borderRadius: '1px',
                      background: '#0d99ff',
                      width: '2px',
                      height: '14px',
                      animation: 'soundWave2 0.8s ease-in-out infinite',
                      animationDelay: '0.1s',
                    }} />
                    <div style={{
                      borderRadius: '1px',
                      background: '#0d99ff',
                      width: '2px',
                      height: '18px',
                      animation: 'soundWave3 0.8s ease-in-out infinite',
                      animationDelay: '0.2s',
                    }} />
                    <div style={{
                      borderRadius: '1px',
                      background: '#0d99ff',
                      width: '2px',
                      height: '12px',
                      animation: 'soundWave4 0.8s ease-in-out infinite',
                      animationDelay: '0.3s',
                    }} />
                    <div style={{
                      borderRadius: '1px',
                      background: '#0d99ff',
                      width: '2px',
                      height: '8px',
                      animation: 'soundWave5 0.8s ease-in-out infinite',
                      animationDelay: '0.4s',
                    }} />
                    <div style={{
                      borderRadius: '1px',
                      background: '#0d99ff',
                      width: '2px',
                      height: '4px',
                      animation: 'soundWave6 0.8s ease-in-out infinite',
                      animationDelay: '0.5s',
                    }} />
                  </div>
                </div>
                {/* 分割线 */}
                <div style={{
                  flexShrink: 0,
                  background: '#d9d9d9',
                  width: '742px',
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
                paddingRight:'29px',
              }}>
                {messages.map((message) => (
                  message.type === 'ai' ? (
                    <div key={message.id} style={{
                      display: 'inline-flex',
                      alignItems: 'flex-start',
                      alignSelf: 'stretch',
                      columnGap: '10px',
                      margin: message.id === 1 ? '30px 251px 0px 29px' : '0px 251px 0px 29px',
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
                          src={message.isLoading ? '.figma/image/mpw6yxkj-wx09331.svg' : message.hasData ? '.figma/image/mpw6yxkj-wx09331.svg' : '.figma/image/mpw6yxkj-wx09331.svg'}
                          alt=""
                          style={{
                            flexShrink: 0,
                            width: '24px',
                            height: '24px',
                            overflow: 'hidden',
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
                            lineHeight: '24px',
                            letterSpacing: 0,
                            color: '#1d2233',
                            fontFamily: '"Noto Sans SC", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", SimHei, Arial, Helvetica, sans-serif',
                            fontSize: '16px',
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
                          }}>
                            <div style={{
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
                                lineHeight: '24px',
                                letterSpacing: 0,
                                color: '#000000',
                                fontFamily: '"Noto Sans SC", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", SimHei, Arial, Helvetica, sans-serif',
                                fontSize: '14px',
                                margin: 0,
                              }}>
                                今日销售额
                              </p>
                              <p style={{
                                flexShrink: 0,
                                lineHeight: '24px',
                                letterSpacing: 0,
                                color: '#0d99ff',
                                fontFamily: '"Noto Sans SC", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", SimHei, Arial, Helvetica, sans-serif',
                                fontSize: '20px',
                                fontWeight: 700,
                                margin: 0,
                              }}>
                                ¥286,430.00
                              </p>
                            </div>
                            <div style={{
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
                                lineHeight: '24px',
                                letterSpacing: 0,
                                color: '#000000',
                                fontFamily: '"Noto Sans SC", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", SimHei, Arial, Helvetica, sans-serif',
                                fontSize: '14px',
                                margin: 0,
                              }}>
                                客单价
                              </p>
                              <p style={{
                                flexShrink: 0,
                                lineHeight: '24px',
                                letterSpacing: 0,
                                color: '#0d99ff',
                                fontFamily: '"Noto Sans SC", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", SimHei, Arial, Helvetica, sans-serif',
                                fontSize: '20px',
                                fontWeight: 700,
                                margin: 0,
                              }}>
                                ¥86.50
                              </p>
                            </div>
                          </div>
                          <p style={{
                            flexShrink: 0,
                            lineHeight: '24px',
                            letterSpacing: 0,
                            color: '#000000',
                            fontFamily: '"Noto Sans SC", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", SimHei, Arial, Helvetica, sans-serif',
                            fontSize: '16px',
                            margin: 0,
                          }}>
                            <span style={{
                              lineHeight: '24px',
                              letterSpacing: 0,
                              color: '#1d2233',
                              fontFamily: '"Noto Sans SC", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", SimHei, Arial, Helvetica, sans-serif',
                              fontSize: '16px',
                            }}>较昨日&nbsp;</span>
                            <span style={{
                              lineHeight: '24px',
                              letterSpacing: 0,
                              color: '#03b438',
                              fontFamily: '"Noto Sans SC", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", SimHei, Arial, Helvetica, sans-serif',
                              fontSize: '16px',
                            }}>↑12.3%</span>
                            <span style={{
                              lineHeight: '24px',
                              letterSpacing: 0,
                              color: '#1d2233',
                              fontFamily: '"Noto Sans SC", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", SimHei, Arial, Helvetica, sans-serif',
                              fontSize: '16px',
                            }}>，其中 3 号店表现最佳</span>
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
                            lineHeight: '24px',
                            letterSpacing: 0,
                            color: '#0d99ff',
                            fontFamily: '"Noto Sans SC", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", SimHei, Arial, Helvetica, sans-serif',
                            fontSize: '16px',
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
                            <div style={{
                              flexShrink: 0,
                              borderRadius: '50%',
                              background: '#0d99ff',
                              width: '4px',
                              height: '4px',
                              animation: 'loadingDots1 1s infinite',
                            }} />
                            <div style={{
                              flexShrink: 0,
                              opacity: 0.7,
                              borderRadius: '50%',
                              background: '#0d99ff',
                              width: '4px',
                              height: '4px',
                              animation: 'loadingDots2 1s infinite',
                              animationDelay: '0.2s',
                            }} />
                            <div style={{
                              flexShrink: 0,
                              opacity: 0.5,
                              borderRadius: '50%',
                              background: '#0d99ff',
                              width: '4px',
                              height: '4px',
                              animation: 'loadingDots3 1s infinite',
                              animationDelay: '0.4s',
                            }} />
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
                            width: '392px',
                            textAlign: 'justify',
                            lineHeight: '24px',
                            letterSpacing: 0,
                            color: '#000000',
                            fontFamily: '"Noto Sans SC", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", SimHei, Arial, Helvetica, sans-serif',
                            fontSize: '16px',
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
                      marginLeft: '386px',
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
                          lineHeight: '24px',
                          letterSpacing: 0,
                          color: '#ffffff',
                          fontFamily: '"Noto Sans SC", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", SimHei, Arial, Helvetica, sans-serif',
                          fontSize: '16px',
                          margin: 0,
                        }}>
                          {message.text}
                        </p>
                      </div>
                      <img
                        src="./.figma/image/mpul3t6y-x3y7nnm.png"
                        alt="用户头像"
                        style={{
                          flexShrink: 0,
                          borderRadius: '8px',
                          width: '32px',
                          height: '32px',
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
                padding: '30px 29px 29px',
                rowGap: '10px',
              }}>
                <div style={inputRowStyle}
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                >
                  <p style={{
                    flexShrink: 0,
                    opacity: 0.4,
                    lineHeight: '19px',
                    letterSpacing: 0,
                    color: '#000000',
                    fontFamily: '"Noto Sans SC", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", SimHei, Arial, Helvetica, sans-serif',
                    fontSize: '16px',
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
                      width: '600px',
                      height: '56px',
                      left: '50px',
                      opacity: 0,
                      border: 'none',
                      background: 'transparent',
                      outline: 'none',
                      fontSize: '16px',
                    }}
                  />
                  <div style={{
                    position: 'relative',
                    flexShrink: 0,
                    width: '36px',
                    height: '36px',
                    cursor: isProcessing ? 'pointer' : 'pointer',
                    pointerEvents: 'auto',
                  }} onClick={isProcessing ? toggleProcessing : handleSend}>
                    {isProcessing ? (
                      <img
                        src=".figma/image/mpw6zbz2-hxcn2ch.png"
                        alt="暂停"
                        style={{
                          position: 'absolute',
                          top: '1px',
                          left: '1px',
                          borderRadius: '18px',
                          width: '36px',
                          height: '36px',
                          overflow: 'hidden',
                          transform: 'rotate(-90deg)',
                        }}
                      />
                    ) : (
                      <img
                        src=".figma/image/mpw6zbz2-hxcn2ch.png"
                        alt="发送"
                        style={{
                          position: 'absolute',
                          top: '1px',
                          left: '1px',
                          borderRadius: '18px',
                          width: '36px',
                          height: '36px',
                          overflow: 'hidden',
                          transform: 'rotate(-90deg)',
                        }}
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 关键帧动画 */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes gradientBorder {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
        @keyframes soundWave1 {
          0%, 100% {
            transform: scaleY(0.6);
          }
          50% {
            transform: scaleY(1);
          }
        }
        @keyframes soundWave2 {
          0%, 100% {
            transform: scaleY(0.7);
          }
          50% {
            transform: scaleY(1.3);
          }
        }
        @keyframes soundWave3 {
          0%, 100% {
            transform: scaleY(0.5);
          }
          50% {
            transform: scaleY(1.4);
          }
        }
        @keyframes soundWave4 {
          0%, 100% {
            transform: scaleY(0.8);
          }
          50% {
            transform: scaleY(1.1);
          }
        }
        @keyframes soundWave5 {
          0%, 100% {
            transform: scaleY(0.7);
          }
          50% {
            transform: scaleY(1.2);
          }
        }
        @keyframes soundWave6 {
          0%, 100% {
            transform: scaleY(0.5);
          }
          50% {
            transform: scaleY(1.3);
          }
        }
        @keyframes loadingDots1 {
          0%, 60%, 100% {
            transform: translateY(0);
          }
          30% {
            transform: translateY(-4px);
          }
        }
        @keyframes loadingDots2 {
          0%, 60%, 100% {
            transform: translateY(0);
          }
          30% {
            transform: translateY(-4px);
          }
        }
        @keyframes loadingDots3 {
          0%, 60%, 100% {
            transform: translateY(0);
          }
          30% {
            transform: translateY(-4px);
          }
        }
        ::-webkit-scrollbar {
          width: 6px;
        }
        ::-webkit-scrollbar-track {
          background: transparent;
        }
        ::-webkit-scrollbar-thumb {
          background: rgba(0, 0, 0, 0.2);
          border-radius: 3px;
        }
        ::-webkit-scrollbar-thumb:hover {
          background: rgba(0, 0, 0, 0.3);
        }
      `}} />
    </section>
  );
};

export default ChatbotSection;
