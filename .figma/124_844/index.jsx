import React from 'react';

import styles from './index.module.scss';

const Component = () => {
  return (
    <div className={styles.popupSymbolInfo}>
      <div className={styles.popupSymbolIcon} />
      <p className={styles.popupSymbolPart1}>生鲜超市</p>
    </div>
  );
}

export default Component;
