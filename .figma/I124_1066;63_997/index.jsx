import React from 'react';

import styles from './index.module.scss';

const Component = () => {
  return (
    <div className={styles.paginationDots}>
      <div className={styles.paginationDot} />
      <div className={styles.paginationDot2} />
      <div className={styles.paginationDot2} />
      <div className={styles.paginationDot2} />
    </div>
  );
}

export default Component;
