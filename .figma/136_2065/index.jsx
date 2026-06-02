import React from 'react';

import styles from './index.module.scss';

const Component = () => {
  return (
    <div className={styles.aboutUsTextContainer}>
      <p className={styles.aboutUsHeading}>关于思迅</p>
      <p className={styles.aboutUsLinks}>
        思迅介绍
        <br />
        企业文化
        <br />
        用户使用协议
        <br />
        个人隐私政策
      </p>
    </div>
  );
}

export default Component;
