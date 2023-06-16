import React, { useRef, useState, useMemo } from 'react';
import {
  View,
  showShareMenu,
  Button,
  navigateTo,
  showModal,
  startPullDownRefresh,
} from 'remax/wechat';
import { Icon, Space, Grid, Card, Tag } from 'anna-remax-ui';
import BackImage from '@/components/backImage';
import NoticeBar from '@/components/notice-bar';
import storage from '@/utils/storage';
import styles from './index.less';
import userInfoStores from '@/stores/userInfo';
import enums from '@/stores/enums';
import RedEnvelope from '@/components/redEnvelope';
import Banner from '@/components/banner';
import AutoList from '@/components/autoList';
import ModailSelect from '@/components/modailSelect';
import { getActivityListByUserId } from '@/apis/activity';
import type { ActivetyUser } from '@/apis/activity';
import { useRequest } from 'ahooks';
import Native from '@/components/native';
import { receiveCoupon } from '@/apis/usercoupon';
import type { ActivetyAmountInfo } from '@/apis/activity';
import { usePageEvent } from 'remax/macro';
import invitationShare from '@/utils/invitationShare';
import IconFont from '@/components/iconfont';
import dayjs from 'dayjs';

const Item = (props: ActivetyUser) => {
  const { userInfo, share } = userInfoStores.useContainer();
  const [getNum, setGetNum] = useState(0);

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
      onSuccess: (e) => {
        setGetNum(1);
      },
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
            <BackImage
              height='120rpx'
              width='120rpx'
              preview={false}
              style={{ borderRadius: '10rpx' }}
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
          <View className={styles.browse}>
            {props?.type === 1 &&
              `已领取: ${parseInt(props.getNum || 0) + getNum}`}
          </View>
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
        {(!props.pics || props.pics.length === 0) &&
        props.couponStatus === 1 ? (
          <Grid data={props.list} columns={3} gutter={16}>
            {(col) => (
              <RedEnvelope
                receive={() => receive(col)}
                couponName={props.actContent}
                {...col}
              />
            )}
          </Grid>
        ) : (
          <>
            <Grid data={props.pics} columns={3} gutter={12}>
              {(col) => (
                <BackImage
                  preview={props.pics}
                  style={{ margin: '6px 0', borderRadius: '10rpx' }}
                  src={col}
                  height='30vw'
                  width='100%'
                />
              )}
            </Grid>
            {props.couponStatus === 1 && (
              <>
                <RedEnvelope
                  receive={() => receive(props.list[0])}
                  couponName={props.actContent}
                  {...props.list[0]}>
                  <Space style={{ marginTop: '10rpx', width: '100%' }}>
                    <IconFont name='qz-hongbao' color='red' />
                    点击领取红包
                  </Space>
                </RedEnvelope>
              </>
            )}
          </>
        )}
      </View>
    </Card>
  );
};

const Index = () => {
  const { userInfo, share } = userInfoStores.useContainer();
  const campuRef = useRef(storage.get('campu'));
  const merchantNumber = useRef(dayjs().diff('2022-10-1', 'd') * 7);
  const [campu, setCampu] = useState(storage.get('campu'));

  const { campus, getCampusPage } = enums.useContainer();
  usePageEvent('onLoad', () => {
    showShareMenu({
      withShareTicket: true,
      menus: ['shareAppMessage', 'shareTimeline'],
    });
  });

  usePageEvent('onShow', () => {
    const storageCampu = storage.get('campu');
    if (storageCampu && campuRef.current !== storageCampu) {
      campuRef.current = storageCampu;
      setCampu(storageCampu);
      startPullDownRefresh();
    }
  });

  usePageEvent('onShareAppMessage', (res) => {
    if (res.from === 'button' && share.current) {
      // 来自页面内转发按钮
      return invitationShare(share.current);
    }
    return invitationShare();
  });

  return (
    <View>
      <View className={styles.top}>
        <Native>
          <ModailSelect
            title='选择校区'
            onSelect={(val, item, { close }) => {
              close();
              campuRef.current = val!;
              setCampu(val!);
              storage.set('campu', val);
              startPullDownRefresh();
            }}
            value={campuRef.current!}
            initOpen={!campuRef.current}
            options={campus?.data || []}
            onClick={getCampusPage}
            buttonRender={() => (
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
      <NoticeBar title='通知'>
        平台已入驻 {merchantNumber.current}家；用户已突破10000+
      </NoticeBar>
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
                if (!campuRef.current) {
                  return Promise.resolve({ records: [], current: 1 });
                }
                return getActivityListByUserId({
                  ...params,
                  userId: userInfo?.id,
                  campusId: campuRef.current,
                });
              }}
              renderItem={(res) => {
                return <Item key={res.merchantId} {...res} />;
              }}
            />
          );
        }, [userInfo?.id])}
      </View>
    </View>
  );
};

export default Index;
