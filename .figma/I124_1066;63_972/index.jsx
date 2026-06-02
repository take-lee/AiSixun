import React from 'react';

import styles from './index.module.scss';

const Component = () => {
  return (
    <div className={styles.bg}>
      <div className={styles.frame85}>
        <p className={styles.bannerTitleText}>商云|智选 领航思迅 SaaS2.0</p>
        <p className={styles.bannerContentText}>解锁多元场景，降本提效</p>
      </div>
      <div className={styles.categoriesContainer}>
        <div className={styles.category}>
          <p className={styles.buttonText}>了解产品</p>
        </div>
        <div className={styles.category2}>
          <p className={styles.buttonText2}>免费试用</p>
        </div>
      </div>
    </div>
  );
}

export default Component;
