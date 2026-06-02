import React from 'react';

import styles from './index.module.scss';

const Component = () => {
  return (
    <div className={styles.inputRow}>
      <p className={styles.inputPlaceholder}>请输入你的问题</p>
      <div className={styles.autoWrapper}>
        <img src="../image/mpunnnln-ypdee1r.png" className={styles.send} />
      </div>
    </div>
  );
}

export default Component;
