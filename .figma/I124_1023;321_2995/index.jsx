import React from 'react';

import styles from './index.module.scss';

const Component = () => {
  return (
    <div className={styles.soundWaveCircle}>
      <div className={styles.bar} />
      <div className={styles.bar2} />
      <div className={styles.bar3} />
      <div className={styles.bar4} />
      <div className={styles.bar5} />
      <div className={styles.bar6} />
    </div>
  );
}

export default Component;
