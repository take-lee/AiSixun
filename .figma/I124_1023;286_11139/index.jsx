import React from 'react';

import styles from './index.module.scss';

const Component = () => {
  return (
    <div className={styles.messageRow}>
      <div className={styles.iconContainer}>
        <img
          src="../image/mputk86z-qln45yp.svg"
          className={styles.chatSparkleUndefined}
        />
      </div>
      <div className={styles.messageTextContainer}>
        <p className={styles.messageText}>请稍候，正在为您查询</p>
        <div className={styles.frame140}>
          <div className={styles.ellipse2} />
          <div className={styles.ellipse3} />
          <div className={styles.ellipse4} />
        </div>
      </div>
    </div>
  );
}

export default Component;
