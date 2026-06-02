import React from 'react';

import styles from './index.module.scss';

const Component = () => {
  return (
    <div className={styles.popupSymbolInfo}>
      <div className={styles.popupSymbolIcon} />
      <p className={styles.popupSymbolPart1}>休闲食品</p>
    </div>
  );
}

export default Component;
