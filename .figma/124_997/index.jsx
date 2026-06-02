import React from 'react';

import styles from './index.module.scss';

const Component = () => {
  return (
    <div className={styles.chatbotSection}>
      <div className={styles.group13}>
        <div className={styles.frame85}>
          <p className={styles.bannerTitleText3}>
            <span className={styles.bannerTitleText}>Ai 驱动</span>
            <span className={styles.bannerTitleText2}>零售数智化</span>
          </p>
          <p className={styles.bannerContentText}>
            Ai 驱动零售全链路智能化-智能推荐、库存预警
          </p>
        </div>
        <div className={styles.group9}>
          <div className={styles.frame62}>
            <img
              src="../image/mpw6pe35-h16441g.svg"
              className={styles.archiveUndefined}
            />
            <p className={styles.text}>Ai 会员分析</p>
          </div>
          <p className={styles.text2}>功能介绍说明文字</p>
        </div>
        <div className={styles.group10}>
          <div className={styles.frame62}>
            <img
              src="../image/mpw6pe35-h16441g.svg"
              className={styles.archiveUndefined}
            />
            <p className={styles.text}>Ai 智能客服</p>
          </div>
          <p className={styles.text2}>功能介绍说明文字</p>
        </div>
        <div className={styles.group11}>
          <div className={styles.frame622}>
            <img
              src="../image/mpw6pe35-h16441g.svg"
              className={styles.archiveUndefined}
            />
            <p className={styles.text}>Ai&nbsp;&nbsp;数据洞察</p>
          </div>
          <p className={styles.text2}>功能介绍说明文字</p>
        </div>
        <div className={styles.frame111}>
          <div className={styles.cAt}>
            <p className={styles.buttonText}>了解产品</p>
          </div>
          <div className={styles.cAt2}>
            <p className={styles.buttonText2}>免费试用</p>
          </div>
        </div>
      </div>
      <div className={styles.backgroundShape2}>
        <div className={styles.backgroundShape}>
          <div className={styles.container}>
            <div className={styles.content}>
              <div className={styles.header}>
                <img
                  src="../image/mpw6pe35-rslg5m0.svg"
                  className={styles.chatSparkleUndefined}
                />
                <p className={styles.headerText}>思迅智能助手</p>
              </div>
              <div className={styles.soundWaveCircle}>
                <div className={styles.bar} />
                <div className={styles.bar2} />
                <div className={styles.bar3} />
                <div className={styles.bar4} />
                <div className={styles.bar5} />
                <div className={styles.bar6} />
              </div>
            </div>
            <div className={styles.divider} />
          </div>
          <div className={styles.messageRow}>
            <div className={styles.iconContainer}>
              <img
                src="../image/mpw6pe35-fdc9n30.svg"
                className={styles.chatSparkleUndefined2}
              />
            </div>
            <div className={styles.messageTextContainer}>
              <p className={styles.messageText}>
                你好，我是思迅Ai助手，可以查询销售、库存、会员分析，试试问我什么？
              </p>
            </div>
          </div>
          <div className={styles.messageInputContaine}>
            <div className={styles.inputRow}>
              <p className={styles.inputPlaceholder}>请输入你的问题</p>
              <div className={styles.autoWrapper}>
                <img src="../image/mpw6pe35-omop6b8.png" className={styles.send} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Component;
