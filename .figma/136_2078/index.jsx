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
          <div className={styles.inputBox}>
            <div className={styles.buttonBackground} />
            <p className={styles.phoneNumber}>您的手机号</p>
          </div>
          <div className={styles.inputBox2}>
            <div className={styles.buttonBackground} />
            <p className={styles.phoneNumber2}>店铺类型</p>
          </div>
          <div className={styles.container}>
            <div className={styles.dropdownBackground} />
            <p className={styles.dropdownLabel}>店铺所在省份城市</p>
            <img src="../image/mpw2e8q1-clzbj3u.svg" className={styles.arrowIcon} />
          </div>
          <div className={styles.submit}>
            <div className={styles.buttonBackground2} />
            <p className={styles.buttonText}>提交</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Component;
