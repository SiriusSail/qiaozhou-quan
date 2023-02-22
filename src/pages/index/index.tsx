import React, { useRef, useState, useMemo } from 'react';
import {
  View,
  showShareMenu,
  Button,
  navigateTo,
  showModal,
} from 'remax/wechat';
import { Icon, Space, Grid, Card, Tag } from 'anna-remax-ui';
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
import { usePageEvent } from 'remax/macro';

const Item = (props: ActivetyUser) => {
  const { userInfo, share } = userInfoStores.useContainer();

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
  const url = useRef(`/pages/shop/index?id=${props.merchantId}`);

  return (
    <Card
      style={{ padding: '20rpx 0', margin: '30rpx 0' }}
      shadow={true}
      cover={
        <Card
          onTap={() => {
            navigateTo({
              url: url.current,
            });
          }}
          title={
            <View className={styles['card-title']}>{props.merchantName}</View>
          }
          description={
            <View className={styles.description}>
              {props.actDescribe || '暂无简介'}
            </View>
          }
          extra={
            props.pickUpStatus === '已领取' ? (
              <Tag color='yellow'>{props.pickUpStatus}</Tag>
            ) : (
              ''
            )
          }
          cover={
            <Image
              height='120rpx'
              width='120rpx'
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
          <View className={styles.browse}>领取量: {props.getNum}</View>
          <Space>
            <Button
              openType='share'
              className={styles.share}
              onTap={() => {
                share.current = {
                  title: props.merchantName,
                  imageUrl: props.doorPhoto || props.merAvatarurl,
                  path: url.current,
                };
              }}>
              <Icon type='forward' size='40px' />
            </Button>
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
  const { userInfo, share } = userInfoStores.useContainer();
  const [campu, setCampu] = useState(storage.get('campu'));

  const { campus, getCampusPage } = enums.useContainer();
  usePageEvent('onLoad', () => {
    showShareMenu({
      withShareTicket: true,
      menus: ['shareAppMessage', 'shareTimeline'],
    });
  });

  usePageEvent('onShareAppMessage', (res) => {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target);
      return share.current || {};
    }
    return {};
  });
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
                <View className={styles['campus-text']}>
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
