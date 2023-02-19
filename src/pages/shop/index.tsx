import React, { useState, useCallback } from 'react';
import { View, navigateTo, showModal } from 'remax/wechat';
import styles from './index.less';
import Image from '@/components/image';
import Block from '@/components/block';
import Voucher from '@/components/voucher';
import { getActivityListByMerchantId } from '@/apis/activity';
import type { ActivityInfo, ActivetyAmountInfo } from '@/apis/activity';
import { receiveCoupon } from '@/apis/usercoupon';
import user from '@/stores/userInfo';
import { Space, Card, Grid, Popup, Icon } from 'anna-remax-ui';
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

const RenderGridItem = (props: ActivetyAmountInfo) => {
  const [show, setShow] = useState(false);
  const [voucher, setVoucher] = useState(false);
  const { valiVip } = user.useContainer();
  const { receive } = Store.useContainer();
  const showPopup = useCallback(() => {
    if (valiVip({ content: 'VIP用户才可以领取' })) {
      setShow(true);
    }
  }, [valiVip]);
  return (
    <>
      <View className={styles['demo-grid-item']} onTap={showPopup}>
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
              receive(props)
                .then?.(() => {
                  setShow(false);
                  setVoucher(true);
                })
                .catch(() => {
                  setShow(false);
                });
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
          <Voucher couponNo={props.activityId} {...props} type='new' />
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
          <RenderGridItem couponName={props.actContent} {...col} />
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
