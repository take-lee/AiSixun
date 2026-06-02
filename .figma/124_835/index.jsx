import React from 'react';

import styles from './index.module.scss';

const Component = () => {
  return (
    <div className={styles.container}>
      <p className={styles.title}>探索行业解决方案</p>
      <img src="../image/mpuu4vb4-fd9il3q.svg" className={styles.popupOverlay} />
      <div className={styles.productList}>
        <div className={styles.productInfo}>
          <div className={styles.autoWrapper}>
            <div className={styles.productIcon}>
              <img
                src="../image/mpuu4vb4-fplhqmc.svg"
                className={styles.cartUndefinedGlyphUn}
              />
            </div>
            <p className={styles.productTitle}>大中型商超</p>
          </div>
          <p className={styles.productSubtitle}>大型、中型连锁商超、综合商业零售</p>
          <div className={styles.trialButtonContainer}>
            <p className={styles.trialButton}>免费试用</p>
          </div>
        </div>
        <div className={styles.productInfo2}>
          <div className={styles.autoWrapper2}>
            <div className={styles.productIcon}>
              <img
                src="../image/mpuu4vb4-fplhqmc.svg"
                className={styles.cartUndefinedGlyphUn}
              />
            </div>
            <p className={styles.productTitle}>便利连锁</p>
          </div>
          <p className={styles.productSubtitle}>连锁便利店、社区超市</p>
          <div className={styles.trialButtonContainer2}>
            <p className={styles.trialButton}>免费试用</p>
          </div>
        </div>
        <div className={styles.productInfo3}>
          <div className={styles.autoWrapper3}>
            <div className={styles.productIcon}>
              <img
                src="../image/mpuu4vb4-fplhqmc.svg"
                className={styles.cartUndefinedGlyphUn}
              />
            </div>
            <p className={styles.productTitle}>小微门店</p>
          </div>
          <p className={styles.productSubtitle}>零食店、便利店、社区店、服装店</p>
          <div className={styles.trialButtonContainer3}>
            <p className={styles.trialButton}>免费试用</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Component;
