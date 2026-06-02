import React from 'react';

import styles from './index.module.scss';

const Component = () => {
  return (
    <div className={styles.cardContent}>
      <div className={styles.cardDescriptionConta}>
        <div className={styles.title}>
          <img src="../image/mpqmbkeu-cd8dzni.svg" className={styles.icon} />
          <p className={styles.cardTitle}>数字门店</p>
        </div>
        <p className={styles.cardDescription}>数字零售·智启未来</p>
      </div>
      <div className={styles.cat}>
        <p className={styles.learnMoreText}>了解更多</p>
        <div className={styles.autoWrapper}>
          <img src="../image/mpqmbkeu-ifsg0i8.png" className={styles.arrowIcon} />
        </div>
      </div>
    </div>
  );
}

export default Component;
