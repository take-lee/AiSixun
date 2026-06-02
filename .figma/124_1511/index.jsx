import React from 'react';

import styles from './index.module.scss';

const Component = () => {
  return (
    <div className={styles.date}>
      <div className={styles.stat}>
        <p className={styles.value}>25年+</p>
        <p className={styles.label}>行业深耕</p>
      </div>
      <div className={styles.stat2}>
        <p className={styles.value2}>300+</p>
        <p className={styles.label}>城市覆盖</p>
      </div>
      <div className={styles.stat3}>
        <p className={styles.value}>2000+</p>
        <p className={styles.label}>合作伙伴</p>
      </div>
      <div className={styles.stat2}>
        <p className={styles.value2}>60万+</p>
        <p className={styles.label}>服务门店数量</p>
      </div>
    </div>
  );
}

export default Component;
