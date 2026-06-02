import React from 'react';

import styles from './index.module.scss';

const Component = () => {
  return (
    <div className={styles.dropdownBackground}>
      <p className={styles.dropdownLabel}>店铺所在省份城市</p>
      <img src="../image/mpw2hn24-ukfgxph.svg" className={styles.arrowIcon} />
    </div>
  );
}

export default Component;
