import React from 'react';

import styles from './index.module.scss';

const Component = () => {
  return (
    <div className={styles.mainContainer}>
      <div className={styles.headerContainer}>
        <p className={styles.mainHeading3}>
          <span className={styles.mainHeading}>&nbsp;</span>
          <span className={styles.mainHeading2}>超过 60 万+</span>
          <span className={styles.mainHeading}>&nbsp;门店选择思迅！</span>
        </p>
        <p className={styles.subheading}>
          国内一流行业软件开发，在收银系统方面拥有行业领先的品牌影响力，思迅 品牌及行业产品上百次获得政府及行业荣誉
        </p>
      </div>
      <div className={styles.contentSection}>
        <div className={styles.group2}>
          <img src="../image/mpw3826h-x9mzmjh.svg" className={styles.frame147} />
          <p className={styles.achievementText}>
            国内首批
            <br />
            国家级高新技术企业
          </p>
        </div>
        <div className={styles.group2}>
          <img src="../image/mpw3826h-8ib9epx.svg" className={styles.frame147} />
          <p className={styles.achievementText}>
            “专精特新”
            <br />
            中小企业
          </p>
        </div>
        <div className={styles.group22}>
          <img src="../image/mpw3826h-m4t4du2.svg" className={styles.frame147} />
          <p className={styles.achievementText}>
            广东省
            <br />
            重点商标
          </p>
        </div>
        <div className={styles.group22}>
          <img src="../image/mpw3826h-93haf6s.svg" className={styles.frame147} />
          <p className={styles.achievementText}>
            深圳市
            <br />
            “双软”企业
          </p>
        </div>
        <div className={styles.group23}>
          <div className={styles.frame1472}>
            <img src="../image/mpw3826h-f5blp0r.svg" className={styles.union} />
            <p className={styles.achievementText2}>股票代码：838758</p>
          </div>
          <p className={styles.achievementText}>
            2016 年<br />
            挂牌新三板
          </p>
        </div>
        <div className={styles.group24}>
          <img src="../image/mpw3826h-096b78z.svg" className={styles.frame147} />
          <p className={styles.achievementText3}>
            2017 年<br />
            入选新三板创新层
          </p>
        </div>
        <div className={styles.group25}>
          <img src="../image/mpw3826h-31y54bl.svg" className={styles.frame147} />
          <p className={styles.achievementText4}>
            数十项
            <br />
            国家级发明专利
          </p>
        </div>
        <div className={styles.group26}>
          <img src="../image/mpw3826h-2sfww1d.svg" className={styles.frame147} />
          <p className={styles.achievementText5}>
            连续 10 年荣获
            <br />
            3A 企业信用等级证书
          </p>
        </div>
      </div>
    </div>
  );
}

export default Component;
