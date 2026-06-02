import React from 'react';

import styles from './index.module.scss';

const Component = () => {
  return (
    <div className={styles.solutionsTextContain}>
      <p className={styles.solutionsHeading}>联系思迅</p>
      <p className={styles.solutionsLinks}>
        思迅总部
        <br />
        分支机构
        <br />
        渠道联系
      </p>
    </div>
  );
}

export default Component;
