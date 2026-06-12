import { useState } from 'react';

const FONT_FAMILY =
  '"Noto Sans SC", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", SimHei, Arial, Helvetica, sans-serif';

// =============================
// Section Container —— 开启数字化新征程
// 对应 Figma 537_6651 / 677_3329
// =============================
const ChatbotSection = () => {
  const [trialHover, setTrialHover] = useState(false);
  const [demoHover, setDemoHover] = useState(false);

  return (
    <section
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        background: '#F3F5F7',
        padding: '120px 240px',
        width: '100%',
        maxWidth: 1920,
        rowGap: 40,
        margin: '0 auto',
        boxSizing: 'border-box',
      }}
    >
      {/* ---- mainHeading3：开启数字化 新征程 ---- */}
      <h2
        style={{
          flexShrink: 0,
          lineHeight: '67px',
          letterSpacing: 0,
          color: '#000000',
          fontFamily: FONT_FAMILY,
          fontSize: 56,
          fontWeight: 700,
          margin: 0,
          textAlign: 'center',
        }}
      >
        <span style={{ color: '#1D2233' }}>开启数字化</span>
        <span style={{ color: '#0068EB' }}>新征程</span>
      </h2>

      {/* ---- subheading ---- */}
      <p
        style={{
          flexShrink: 0,
          lineHeight: '34px',
          letterSpacing: 0,
          color: '#1D2233',
          fontFamily: FONT_FAMILY,
          fontSize: 28,
          margin: 0,
          textAlign: 'center',
        }}
      >
        专业服务团队 · 7*12 小时服务 · 一对一定制专属行业解决方案
      </p>

      {/* ---- Frame 31：双按钮区 ---- */}
      <div
        style={{
          display: 'flex',
          flexShrink: 0,
          alignItems: 'flex-start',
          alignSelf: 'stretch',
          justifyContent: 'center',
          gap: 30,
          minWidth: 310,
          height: 56,
        }}
      >
        {/* ====== 免费试用按钮 ======
            TODO: 替换为实际跳转链接 —— 如 /trial 或外部试用页面
            当前使用 <a> 包裹以支持链接跳转，如无需跳转可改为 <button> */}
        <a
          href="/trial"
          onMouseEnter={() => setTrialHover(true)}
          onMouseLeave={() => setTrialHover(false)}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            columnGap: 10,
            borderRadius: 8,
            background: trialHover ? '#0068EB' : '#0D99FF',
            padding: '14px 30px',
            height: 56,
            textDecoration: 'none',
            cursor: 'pointer',
            transition: 'background-color 200ms ease',
          }}
        >
          <span
            style={{
              flexShrink: 0,
              lineHeight: '29px',
              letterSpacing: 0,
              color: '#FFFFFF',
              fontFamily: FONT_FAMILY,
              fontSize: 20,
            }}
          >
            免费试用
          </span>
        </a>

        {/* ====== 预约演示按钮 ======
            TODO: 替换为实际跳转链接 —— 如 /demo 或外部预约页面
            当前使用 <a> 包裹以支持链接跳转，如无需跳转可改为 <button> */}
        <a
          href="/demo"
          onMouseEnter={() => setDemoHover(true)}
          onMouseLeave={() => setDemoHover(false)}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            columnGap: 10,
            border: '1px solid #0D99FF',
            borderRadius: 8,
            background: demoHover ? '#0D99FF' : '#FFFFFF',
            padding: '13px 29px',
            height: 56,
            textDecoration: 'none',
            cursor: 'pointer',
            transition: 'all 200ms ease',
          }}
        >
          <span
            style={{
              flexShrink: 0,
              lineHeight: '29px',
              letterSpacing: 0,
              color: demoHover ? '#FFFFFF' : '#0D99FF',
              fontFamily: FONT_FAMILY,
              fontSize: 20,
              transition: 'color 200ms ease',
            }}
          >
            预约演示
          </span>
        </a>
      </div>
    </section>
  );
};

export default ChatbotSection;
