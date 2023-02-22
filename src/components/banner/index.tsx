import React from 'react';
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

  if (!banner || banner.length === 0) {
    <Swiper
      indicatorDots={true}
      autoplay={true}
      style={{ height: '50vw' }}
      interval={5000}>
      <SwiperItem className={styles['seiper-item']}>
        <View
          className={styles['banner-src']}
          style={{ backgroundImage: `url(/images/banner.png)` }}
        />
      </SwiperItem>
    </Swiper>;
  }

  return (
    <Swiper
      indicatorDots={true}
      autoplay={true}
      style={{ height: '50vw' }}
      interval={5000}>
      {banner?.map((item) => (
        <SwiperItem className={styles['seiper-item']}>
          <View
            className={styles['banner-src']}
            style={{ backgroundImage: `url(${item?.url})` }}
          />
        </SwiperItem>
      ))}
    </Swiper>
  );
};
export default Index;
