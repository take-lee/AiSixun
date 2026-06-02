import React from 'react';

import styles from './index.module.scss';

const Component = () => {
  return (
    <div className={styles.productCard}>
      <div className={styles.rectangle47} />
      <div className={styles.productInfo}>
        <div className={styles.productIcon}>
          <img
            src="../image/mpuxr5j0-96bbz0o.svg"
            className={styles.cartUndefinedGlyphUn}
          />
        </div>
        <p className={styles.productTitle}>大中型商超</p>
        <p className={styles.productSubtitle}>大型、中型连锁商超、综合商业零售</p>
        <div className={styles.trialButtonContainer}>
          <p className={styles.trialButton}>免费试用</p>
        </div>
      </div>
    </div>
  );
}

export default Component;
