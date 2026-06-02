import React from 'react';

import styles from './index.module.scss';

const Component = () => {
  return (
    <div className={styles.popupRow}>
      <div className={styles.popupSymbolInfo}>
        <div className={styles.popupSymbolIcon} />
        <p className={styles.popupSymbolPart1}>思迅商云POS</p>
      </div>
      <div className={styles.popupSymbolInfo2}>
        <div className={styles.popupSymbolIcon} />
        <p className={styles.popupSymbolPart1}>生鲜超市</p>
      </div>
      <div className={styles.popupSymbolInfo2}>
        <div className={styles.popupSymbolIcon} />
        <p className={styles.popupSymbolPart1}>烘焙熟食</p>
      </div>
      <div className={styles.popupSymbolInfo2}>
        <div className={styles.popupSymbolIcon} />
        <p className={styles.popupSymbolPart1}>美食广场</p>
      </div>
      <div className={styles.popupSymbolInfo2}>
        <div className={styles.popupSymbolIcon} />
        <p className={styles.popupSymbolPart1}>母婴美妆</p>
      </div>
      <div className={styles.popupSymbolInfo3}>
        <div className={styles.popupSymbolIcon} />
        <p className={styles.popupSymbolPart1}>母婴生活馆</p>
      </div>
      <div className={styles.popupSymbolInfo2}>
        <div className={styles.popupSymbolIcon} />
        <p className={styles.popupSymbolPart1}>休闲食品</p>
      </div>
      <div className={styles.popupSymbolInfo2}>
        <div className={styles.popupSymbolIcon} />
        <p className={styles.popupSymbolPart1}>休闲食品</p>
      </div>
    </div>
  );
}

export default Component;
