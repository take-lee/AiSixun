import React from 'react';

import styles from './index.module.scss';

const Component = () => {
  return (
    <div className={styles.productsTextContaine}>
      <p className={styles.productsHeading}>其他产品线</p>
      <p className={styles.productsLinks}>
        eShop
        <br />
        天店
      </p>
    </div>
  );
}

export default Component;
