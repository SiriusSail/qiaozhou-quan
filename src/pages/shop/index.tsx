import React, { useState } from 'react';
import { View, navigateTo } from 'remax/wechat';
import styles from './index.less';
import Image from '@/components/image';
import Iconfont from '@/components/iconfont';
import Block from '@/components/block';
import Voucher from '@/components/voucher';
import userInfoStores from '@/stores/userInfo';
import { Space, Card, Grid, Popup, Icon } from 'anna-remax-ui';

const RenderGridItem = (col: any) => {
  const [show, setShow] = useState(false);
  const [voucher, setVoucher] = useState(false);
  return (
    <View>
      <View className={styles['demo-grid-item']} onTap={() => setShow(true)}>
        <Iconfont name='qz-hongbao' size={200} />
      </View>
      <Popup
        closeable={false}
        style={{ background: 'transparent' }}
        open={show}
        onClose={() => {
          setShow(false);
        }}>
        <View className={styles['popup-content']}>
          <View
            className={styles['change-size']}
            onTap={() => {
              setShow(false);
              setVoucher(true);
            }}>
            <Iconfont name='qz-hongbao' size={600} />
          </View>
        </View>
      </Popup>
      <Popup
        closeable={false}
        style={{ background: 'transparent' }}
        open={voucher}
        onClose={() => {
          setVoucher(false);
        }}>
        <View className={styles['voucher-content']}>
          <View className={styles['voucher-title']}>恭喜您获得了</View>
          <Voucher />
        </View>
      </Popup>
    </View>
  );
};

const Item = () => {
  return (
    <Card
      style={{ padding: '20rpx 0', margin: '30rpx 0' }}
      shadow={true}
      cover={
        <Card
          title={'现金红包'}
          description='阳光正好，带上好心情到店吃饭！'
          extra={<View className={styles.coverExtra}>未领取</View>}
          direction='horizontal'>
          <View className={styles.coverRow}>
            <div></div>
          </View>
        </Card>
      }>
      <View className={styles.envelopes}>
        <Grid data={['1', '2', '3']} columns={3} gutter={16}>
          {(col, index) => <RenderGridItem {...col} />}
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
        <View className={styles.welfare}>
          <Item />
        </View>
      </Block>
    </View>
  );
};
export default Index;
