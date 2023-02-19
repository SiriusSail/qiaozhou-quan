import React, { useState, useCallback } from 'react';
import { View, Swiper, SwiperItem } from 'remax/wechat';
import styles from './index.less';
import apis from '@/apis/index';
import { useRequest } from 'ahooks';

const Index = () => {
  const { data: banner } = useRequest(() =>
    apis.findIndexBannerList().then((res) => {
      return res.filter((item) => !!item.url);
    })
  );

  return (
    <Swiper indicatorDots={true} autoplay={true} interval={5000}>
      {banner?.map((item) => (
        <SwiperItem className={styles['seiper-item']}>
          <View
            className={styles['banner-src']}
            style={{ backgroundImage: `url(${item?.url})` }}
          />
        </SwiperItem>
      ))}
      <SwiperItem className={styles['seiper-item']}>
        <View
          className={styles['banner-src']}
          style={{ backgroundImage: `url('/images/test/nouser.jpg')` }}
        />
      </SwiperItem>
      <SwiperItem className={styles['seiper-item']}>
        <View
          className={styles['banner-src']}
          style={{ backgroundImage: `url('/images/test/nouser.jpg')` }}
        />
      </SwiperItem>
    </Swiper>
  );
};
export default Index;
