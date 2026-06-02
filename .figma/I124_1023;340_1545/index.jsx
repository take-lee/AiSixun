import React from 'react';

import styles from './index.module.scss';

const Component = () => {
  return (
    <div className={styles.inputRow}>
      <p className={styles.inputPlaceholder}>请输入你的问题</p>
      <div className={styles.autoWrapper}>
        <div className={styles.send}>
          <div className={styles.spinnerIcon} />
        </div>
      </div>
    </div>
  );
}

export default Component;
