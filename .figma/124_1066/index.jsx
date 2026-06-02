import React from 'react';

import styles from './index.module.scss';

const Component = () => {
  return (
    <div className={styles.bannerDetail}>
      <div className={styles.bannerContainer}>
        <div className={styles.bg}>
          <div className={styles.frame85}>
            <p className={styles.bannerTitleText}>商云|智选 领航思迅 SaaS2.0</p>
            <p className={styles.bannerContentText}>解锁多元场景，降本提效</p>
          </div>
          <div className={styles.categoriesContainer}>
            <div className={styles.category}>
              <p className={styles.buttonText}>了解产品</p>
            </div>
            <div className={styles.category2}>
              <p className={styles.buttonText2}>免费试用</p>
            </div>
          </div>
        </div>
        <div className={styles.bg2}>
          <div className={styles.frame852}>
            <p className={styles.bannerTitleText}>数字零售 · 智启未来</p>
            <p className={styles.bannerContentText2}>
              25年深耕零售数字化，为超过80万门店提供智能收银、门店管理、供应链协同一站式解决方案
            </p>
          </div>
          <div className={styles.categoriesContainer2}>
            <div className={styles.category}>
              <p className={styles.buttonText}>了解产品</p>
            </div>
            <div className={styles.category2}>
              <p className={styles.buttonText2}>免费试用</p>
            </div>
          </div>
        </div>
        <div className={styles.bg3}>
          <div className={styles.frame853}>
            <p className={styles.bannerTitleText}>中国零售与餐饮数字化平台</p>
            <p className={styles.bannerContentText3}>
              Ai&nbsp;&nbsp;智能· SaaS云 · 连锁 · 全渠道 · 数据智能
            </p>
          </div>
          <div className={styles.categoriesContainer2}>
            <div className={styles.category}>
              <p className={styles.buttonText}>了解产品</p>
            </div>
            <div className={styles.category2}>
              <p className={styles.buttonText2}>免费试用</p>
            </div>
          </div>
        </div>
        <div className={styles.bg4}>
          <div className={styles.frame853}>
            <p className={styles.bannerTitleText}>Ai 驱动的零售餐饮增长引擎</p>
            <p className={styles.bannerContentText3}>
              AI重塑零售底座，让每一笔交易都算数
            </p>
          </div>
          <div className={styles.categoriesContainer2}>
            <div className={styles.category}>
              <p className={styles.buttonText}>了解产品</p>
            </div>
            <div className={styles.category2}>
              <p className={styles.buttonText2}>免费试用</p>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.autoWrapper}>
        <div className={styles.paginationDots}>
          <div className={styles.paginationDot} />
          <div className={styles.paginationDot2} />
          <div className={styles.paginationDot2} />
          <div className={styles.paginationDot2} />
        </div>
        <img src="../image/mpqe31b1-9apwty7.svg" className={styles.play} />
      </div>
    </div>
  );
}

export default Component;
