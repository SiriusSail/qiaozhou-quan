import React from 'react';
import { View, showModal } from 'remax/wechat';
import styles from './index.less';
import Block from '@/components/block';
import RedEnvelope from '@/components/redEnvelope';
import { getActivityListByMerchantId } from '@/apis/activity';
import type { ActivityInfo, ActivetyAmountInfo } from '@/apis/activity';
import { receiveCoupon } from '@/apis/usercoupon';
import user from '@/stores/userInfo';
import { Space, Card, Grid, Icon } from 'anna-remax-ui';
import { useRequest } from 'ahooks';
import { useQuery } from 'remax';
import { createContainer } from 'unstated-next';

const Store = createContainer(() => {
  const { id } = useQuery<{ id: string }>();
  const { data } = useRequest(() => getActivityListByMerchantId(id));
  const { userInfo } = user.useContainer();

  const { runAsync: receive, loading } = useRequest(
    (params: ActivetyAmountInfo) => {
      return receiveCoupon({
        ...params,
        merNo: data?.merNo,
        merchantId: id,
        userId: userInfo?.id,
      });
    },
    {
      manual: true,
      onError: (e) => {
        showModal({
          showCancel: false,
          title: '提示',
          content: e.message,
        });
      },
    }
  );
  return {
    data,
    receive,
  };
});

const Item = (props: ActivityInfo) => {
  const { receive } = Store.useContainer();
  return (
    <Card
      style={{ padding: '20rpx 0', margin: '30rpx 0' }}
      shadow={true}
      cover={
        <Card
          title={props.actContent}
          description={props.description}
          extra={
            <View className={styles['cover-extra']}>
              {props?.pickUpStatus || '未领取'}
            </View>
          }
          direction='horizontal'>
          <View className={styles.coverRow}>
            <div></div>
          </View>
        </Card>
      }>
      <Grid data={props.list} columns={3} gutter={16}>
        {(col, index) => (
          <RedEnvelope
            receive={() => receive(col)}
            couponName={props.actContent}
            {...col}
          />
        )}
      </Grid>
    </Card>
  );
};

const Shop = () => {
  const { data } = Store.useContainer();
  return (
    <View className={styles.shop}>
      <View
        className={styles.back}
        style={{ backgroundImage: `url(${data?.doorPhoto})` }}
      />
      <View className={styles.info}>
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

const Index = () => {
  return (
    <Store.Provider>
      <Shop />
    </Store.Provider>
  );
};
export default Index;
