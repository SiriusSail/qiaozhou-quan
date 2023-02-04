import React from 'react';
import { View, navigateTo } from 'remax/wechat';
import styles from './index.less';
import Image from '@/components/image';
import Iconfont from '@/components/iconfont';
import Block from '@/components/block';
import userInfoStores from '@/stores/userInfo';
import { Space, Card, Grid, Col, Icon } from 'anna-remax-ui';
import IconFont from '@/components/iconfont';

const renderGridItem = (col: any, index?: number) => (
  <View className={styles['demo-grid-item']}>
    <Iconfont name='qz-hongbao' size={200} />
  </View>
);

const Item = () => {
  return (
    <Card
      style={{ padding: '20rpx 0', margin: '30rpx 0' }}
      shadow={true}
      cover={
        <Card
          description='阳光正好，带上好心情到店吃饭！'
          extra={<View className={styles.coverExtra}>未领取</View>}
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
  const { userInfo } = userInfoStores.useContainer();
  return (
    <View className={styles.shop}>
      <View
        className={styles.back}
        style={{ backgroundImage: `url(${'/images/test/123.jpg'})` }}
      />
      <View className={styles.info}>
        <View className={styles.absolute}>
          <View className={styles.content}>
            <Space direction='vertical'>
              <View className={styles.title}>乡村基(解放碑店)</View>
              <View>店铺简介：好好吃饭好好睡觉</View>
              <View>联系电话：112331233</View>
              <View>
                地址：解放碑环球大厦 <Icon type='location' />
              </View>
            </Space>
          </View>
        </View>
      </View>
      <Block title='店铺活动'>
        <Item />
      </Block>
    </View>
  );
};
export default Index;
