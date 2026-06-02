import React from 'react';

import styles from './index.module.scss';

const Component = () => {
  return (
    <div className={styles.contactInfo}>
      <p className={styles.hotline}>热线：400-777-9977</p>
      <p className={styles.hotline}>股票代码：838758</p>
      <p className={styles.hotline}>石基信息成员企业</p>
      <div className={styles.en}>
        <p className={styles.hotline}>EN</p>
      </div>
    </div>
  );
}

export default Component;
