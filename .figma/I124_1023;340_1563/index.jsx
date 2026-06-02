import React from 'react';

import styles from './index.module.scss';

const Component = () => {
  return (
    <div className={styles.inputRow}>
      <p className={styles.inputPlaceholder}>请输入你的问题</p>
      <div className={styles.autoWrapper}>
        <img src="../image/mputmo6a-mh6pw8k.png" className={styles.send} />
      </div>
    </div>
  );
}

export default Component;
