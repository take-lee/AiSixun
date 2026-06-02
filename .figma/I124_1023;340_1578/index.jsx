import React from 'react';

import styles from './index.module.scss';

const Component = () => {
  return (
    <div className={styles.messageRow}>
      <div className={styles.iconContainer}>
        <img
          src="../image/mputm86a-h6g3d3r.svg"
          className={styles.chatSparkleUndefined}
        />
      </div>
      <div className={styles.messageTextContainer}>
        <p className={styles.messageText}>今日门店销售概况</p>
        <div className={styles.frame143}>
          <div className={styles.frame141}>
            <p className={styles.text}>今日销售额</p>
            <p className={styles.a28643000}>￥286,430.00</p>
          </div>
          <div className={styles.frame141}>
            <p className={styles.text}>客单价</p>
            <p className={styles.a28643000}>￥86.50</p>
          </div>
        </div>
        <p className={styles.messageText4}>
          <span className={styles.messageText2}>较昨日&nbsp;</span>
          <span className={styles.messageText3}>↑12.3%</span>
          <span className={styles.messageText2}>，其中 3 号店表现最佳</span>
        </p>
      </div>
    </div>
  );
}

export default Component;
