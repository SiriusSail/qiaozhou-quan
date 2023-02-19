import React, { useState, useMemo } from 'react';
import { View, Swiper, SwiperItem, navigateTo, showModal } from 'remax/wechat';
import { Icon, Space, Grid, Card } from 'anna-remax-ui';
import Image from '@/components/image';
import storage from '@/utils/storage';
import styles from './index.less';
import userInfoStores from '@/stores/userInfo';
import apis from '@/apis/index';
import enums from '@/stores/enums';
import RedEnvelope from '@/components/redEnvelope';
import Banner from '@/components/banner';
import AutoList from '@/components/autoList';
import ModailSelect from '@/components/modailSelect';
import { getActivityListByUserId } from '@/apis/activity';
import type { ActivetyUser } from '@/apis/activity';
import { updateCampus } from '@/apis/user';
import { useRequest } from 'ahooks';
import Native from '@/components/native';
import { receiveCoupon } from '@/apis/usercoupon';
import type { ActivetyAmountInfo } from '@/apis/activity';

const Item = (props: ActivetyUser) => {
  const { userInfo } = userInfoStores.useContainer();

  const { runAsync: receive, loading } = useRequest(
    (params: ActivetyAmountInfo) => {
      return receiveCoupon({
        ...params,
        merNo: props?.merNo,
        merchantId: props.merchantId,
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

  return (
    <Card
      style={{ padding: '20rpx 0', margin: '30rpx 0' }}
      shadow={true}
      cover={
        <Card
          onTap={() => {
            navigateTo({
              url: `/pages/shop/index?id=${props.merchantId}`,
            });
          }}
          title={
            <View className={styles['card-title']}>{props.merchantName}</View>
          }
          description={props.merDescribe || '暂无简介'}
          // extra={<View className={styles.coverExtra}>🏖</View>}
          cover={
            <Image
              height='180rpx'
              width='180rpx'
              src={props.merAvatarurl || '/images/test/nouser.jpg'}
            />
          }
          direction='horizontal'>
          {/* <View className={styles.coverRow}>
            <div>{props?.merDescribe || '暂无简介'}</div>
          </View> */}
        </Card>
      }
      foot={
        <View className={styles['card-footer']}>
          <Space>
            <Icon type='forward' size='40px' />
          </Space>
        </View>
      }>
      <View className={styles.envelopes}>
        <Grid data={props.list} columns={3} gutter={16}>
          {(col) => (
            <RedEnvelope
              receive={() => receive(col)}
              couponName={props.actContent}
              {...col}
            />
          )}
        </Grid>
      </View>
    </Card>
  );
};

const Index = () => {
  const { userInfo } = userInfoStores.useContainer();
  const [campu, setCampu] = useState(storage.get('campu'));

  const { campus, getCampusPage } = enums.useContainer();
  return (
    <View>
      <View className={styles.top}>
        <Native>
          <ModailSelect
            title='选择校区'
            onSelect={(val, item, { close }) => {
              close();
              setCampu(val!);
              storage.set('campu', val);
              userInfo?.id &&
                updateCampus({ userId: userInfo?.id, campusId: val });
            }}
            initOpen={!campu}
            options={campus?.data || []}
            onClick={getCampusPage}
            buttonRender={(val, valueData) => (
              <Space>
                <Icon type='location' size='36px' />
                <View>
                  {campus?.data.find((item) => item.key === campu)?.value ||
                    '请选择校区'}
                </View>
              </Space>
            )}
          />
        </Native>
      </View>
      <Banner />
      {/* <NoticeBar title='温馨提示'> 这里是通知信息栏</NoticeBar> */}
      <View className={styles.body}>
        {useMemo(() => {
          return (
            <AutoList<ActivetyUser>
              loadingTip={
                <View
                  style={{
                    padding: '50rpx',
                    textAlign: 'center',
                  }}>
                  店家正在赶来…
                </View>
              }
              getList={(params) => {
                if (!campu) {
                  return Promise.resolve({ records: [], current: 1 });
                }
                return getActivityListByUserId({
                  ...params,
                  userId: userInfo?.id,
                  campusId: campu,
                });
              }}
              renderItem={(res, index) => {
                return <Item key={index} {...res} />;
              }}
            />
          );
        }, [campu, userInfo?.id])}
      </View>
    </View>
  );
};

export default Index;
