import React from 'react';

import styles from './index.module.scss';

const Component = () => {
  return (
    <div className={styles.paginationDot}>
      <div className={styles.cardBackground} />
      <div className={styles.cardContent}>
        <div className={styles.cardDescriptionConta}>
          <div className={styles.title}>
            <img src="../image/mpw9fkch-af1kxmk.svg" className={styles.icon} />
            <p className={styles.cardTitle}>数字门店</p>
          </div>
          <p className={styles.cardDescription}>数字零售·智启未来</p>
        </div>
        <div className={styles.learnMoreContainer}>
          <p className={styles.learnMoreText}>了解更多</p>
          <div className={styles.autoWrapper}>
            <img src="../image/mpw9fkch-r8ydtwt.png" className={styles.arrowIcon} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Component;
