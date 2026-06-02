import React from 'react';

import styles from './index.module.scss';

const Component = () => {
  return (
    <div className={styles.cat}>
      <p className={styles.learnMoreText}>了解更多</p>
      <div className={styles.autoWrapper}>
        <img src="../image/mpqmss5h-3f069uv.png" className={styles.arrowIcon} />
      </div>
    </div>
  );
}

export default Component;
