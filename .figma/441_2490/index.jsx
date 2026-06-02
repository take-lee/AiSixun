import React from 'react';

import styles from './index.module.scss';

const Component = () => {
  return (
    <div className={styles.mainContainer}>
      <div className={styles.productDetails}>
        <div className={styles.productInfo}>
          <div className={styles.productIcon}>
            <img
              src="../image/mpw8wwce-1aotbpl.svg"
              className={styles.cartUndefinedGlyphUn}
            />
          </div>
          <p className={styles.productTitle}>大中型商超</p>
        </div>
        <p className={styles.productSubtitle}>大型、中型连锁商超、综合商业零售</p>
        <div className={styles.learnMoreContainer}>
          <p className={styles.learnMoreText}>了解更多</p>
          <div className={styles.autoWrapper}>
            <img src="../image/mpw8wwce-kbgd41z.png" className={styles.arrowIcon} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Component;
