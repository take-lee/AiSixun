import React from 'react';

import styles from './index.module.scss';

const Component = () => {
  return (
    <div className={styles.supportTextContainer}>
      <p className={styles.supportHeading}>如何购买</p>
      <div className={styles.frame120}>
        <p className={styles.supportLinks}>
          销售热线：400-777-9977
          <br />
          销售留言
        </p>
        <div className={styles.frame121}>
          <div className={styles.group18}>
            <div className={styles.rectangle58} />
            <p className={styles.text}>您的手机号</p>
          </div>
          <div className={styles.group20}>
            <div className={styles.rectangle58} />
            <p className={styles.text2}>店铺类型</p>
          </div>
          <div className={styles.group19}>
            <div className={styles.rectangle58} />
            <p className={styles.text3}>店铺所在省份城市</p>
            <img src="../image/mpw1rib5-glxmyc2.svg" className={styles.arrowIcon} />
          </div>
          <div className={styles.group21}>
            <div className={styles.rectangle582} />
            <p className={styles.text4}>提交</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Component;
