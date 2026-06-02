import React from 'react';

import styles from './index.module.scss';

const Component = () => {
  return (
    <div className={styles.mainFrame}>
      <div className={styles.informationContainer}>
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
        <div className={styles.productsTextContaine}>
          <p className={styles.aboutUsHeading}>其他产品线</p>
          <p className={styles.productsLinks}>
            eShop
            <br />
            天店
          </p>
        </div>
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
        <div className={styles.supportTextContainer}>
          <p className={styles.solutionsHeading}>如何购买</p>
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
                <img
                  src="../image/mpw1rbte-skc74z9.svg"
                  className={styles.arrowIcon}
                />
              </div>
              <div className={styles.group21}>
                <div className={styles.rectangle582} />
                <p className={styles.text4}>提交</p>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.contactInfoContainer}>
          <div className={styles.socialMediaContainer}>
            <p className={styles.followUsText}>关注官方公众号</p>
            <div className={styles.qRCodeContainer}>
              <img src="../image/mpw1rbtk-s5recnr.png" className={styles.scan11} />
            </div>
          </div>
          <div className={styles.socialMediaContainer2}>
            <p className={styles.followUsText}>关注微信视频号</p>
            <div className={styles.frame126}>
              <img src="../image/mpw1rbtk-mj4mlxj.png" className={styles.scan21} />
            </div>
          </div>
          <div className={styles.socialMediaContainer3}>
            <p className={styles.followUsText}>关注官方抖音号</p>
            <div className={styles.container}>
              <img src="../image/mpw1rbtk-90n2blm.png" className={styles.scan31} />
            </div>
          </div>
        </div>
      </div>
      <div className={styles.footerContainer}>
        <p className={styles.footerCopyrightText}>
          深圳市思迅软件股份有限公司 版权所有
        </p>
        <p className={styles.footerDisclaimerText3}>
          <span className={styles.footerDisclaimerText}>
            Copyright 2026 www.sixun.com.cn AII Rights Reserved.&nbsp;
          </span>
          <span className={styles.footerDisclaimerText2}>粤ICP备14033072号</span>
        </p>
      </div>
    </div>
  );
}

export default Component;
