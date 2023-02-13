import React, { useState } from 'react';
import { View, navigateTo } from 'remax/wechat';
import styles from './index.less';
import Iconfont from '@/components/iconfont';
import Image from '@/components/image';
import Block from '@/components/block';
import Voucher from '@/components/voucher';
import { getActivityListByMerchantId } from '@/apis/activity';
import type { ActivityInfo, ActivetyAmountInfo } from '@/apis/activity';
import LoginLayout from '@/layout/loginLayout';
import { Space, Card, Grid, Popup, Icon } from 'anna-remax-ui';
import { useRequest } from 'ahooks';
import { useQuery } from 'remax';

const RenderGridItem = (props: ActivetyAmountInfo) => {
  const [show, setShow] = useState(false);
  const [voucher, setVoucher] = useState(false);
  return (
    <>
      <View className={styles['demo-grid-item']} onTap={() => setShow(true)}>
        <Image height='205rpx' width='164rpx' src={'/images/hongbao.png'} />
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
            <Image height='410rpx' width='328rpx' src={'/images/hongbao.png'} />
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
          <Voucher {...props} type='new' />
        </View>
      </Popup>
    </>
  );
};

const Item = (props: ActivityInfo) => {
  return (
    <Card
      style={{ padding: '20rpx 0', margin: '30rpx 0' }}
      shadow={true}
      cover={
        <Card
          title={props.actContent}
          description={props.description}
          extra={
            <View className={styles.coverExtra}>
              {props?.pickUpStatus || '未领取'}
            </View>
          }
          direction='horizontal'>
          <View className={styles.coverRow}>
            <div></div>
          </View>
        </Card>
      }>
      <View className={styles.envelopes}>
        <Grid data={props.list} columns={3} gutter={16}>
          {(col, index) => <RenderGridItem {...col} />}
        </Grid>
      </View>
    </Card>
  );
};

const Index = () => {
  const { id } = useQuery<{ id: string }>();

  const { data } = useRequest(() => getActivityListByMerchantId(id));
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
              <View className={styles.title}>{data?.merchantName}</View>
              <View>店铺简介：{data?.merDescribe || '暂无简介'}</View>
              <View>联系电话：{data?.merchantName || '-'}</View>
              <View>
                地址：{data?.merchantAddress} <Icon type='location' />
              </View>
            </Space>
          </View>
        </View>
      </View>
      <Block title='店铺活动'>
        <View className={styles.welfare}>
          {data?.activityListResList.map((item) => (
            <Item key={item.actId} {...item} />
          ))}
        </View>
      </Block>
    </View>
  );
};
export default Index;
