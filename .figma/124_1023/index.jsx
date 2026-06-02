import React from 'react';

import styles from './index.module.scss';

const Component = () => {
  return (
    <div className={styles.backgroundShape2}>
      <div className={styles.backgroundShape}>
        <div className={styles.container}>
          <div className={styles.content}>
            <div className={styles.header}>
              <img
                src="../image/mpw73xzs-y4iubh1.svg"
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
              src="../image/mpw73xzs-3z2kdow.svg"
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
              <img src="../image/mpw73xzs-1u0r14e.png" className={styles.send} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Component;
