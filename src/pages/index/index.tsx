import React, { useState, useMemo } from 'react';
import { View, Text, Swiper, SwiperItem } from 'remax/wechat';
import { Icon, Space, Grid, Card } from 'anna-remax-ui';
import NoticeBar from '@/components/notice-bar';
import Image from '@/components/image';
import styles from './index.less';

const renderGridItem = (col: any, index?: number) => (
  <View className={styles['demo-grid-item']}>红包{col}</View>
);

const Item = () => {
  return (
    <Card
      style={{ padding: '20rpx 0', margin: '30rpx 0' }}
      shadow={true}
      cover={
        <Card
          title={<View className={styles['card-title']}>肯德基</View>}
          description='阳光正好，带上好心情到店吃饭！'
          extra={<View className={styles.coverExtra}>🏖</View>}
          cover={
            <Image height='180rpx' width='180rpx' src='/images/test/123.jpg' />
          }
          direction='horizontal'>
          <View className={styles.coverRow}>
            <div></div>
          </View>
        </Card>
      }
      foot={
        <View className={styles['card-footer']}>
          <Space>
            <Icon type='like' size='40px' />
            <Icon type='favor' size='40px' />
            <Icon type='comment' size='40px' />
          </Space>
        </View>
      }>
      <View className={styles.envelopes}>
        <Grid data={['1', '2', '3']} columns={3} gutter={16}>
          {renderGridItem}
        </Grid>
      </View>
    </Card>
  );
};

const Index = () => {
  const [b] = useState(1);
  const data = useMemo(() => {
    return b;
  }, [b]);
  return (
    <View className={styles.app}>
      <View className={styles.top}>
        <Space>
          <Icon type='location' size='36px' />
          <View>工商大学</View>
        </Space>
      </View>
      <View className={styles.body}>
        <Swiper indicatorDots={true} autoplay={true} interval={5000}>
          <SwiperItem className={styles['seiper-item']}>
            <View>推广图1</View>
          </SwiperItem>
          <SwiperItem className={styles['seiper-item']}>
            <View>推广图2</View>
          </SwiperItem>
          <SwiperItem className={styles['seiper-item']}>
            <View>推广图3</View>
          </SwiperItem>
        </Swiper>
        <NoticeBar title='温馨提示'> 这里是通知信息栏</NoticeBar>
        <Item />
        <Item />
        <Item />
        <Item />
      </View>
    </View>
  );
};

export default Index;
