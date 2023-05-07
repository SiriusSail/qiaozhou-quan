import React, { useRef, useState, useMemo } from 'react';
import {
  View,
  showShareMenu,
  Button,
  navigateTo,
  showModal,
  startPullDownRefresh,
} from 'remax/wechat';
import { Icon, Space, Grid, Card, Tag, Popup } from 'anna-remax-ui';
import BackImage from '@/components/backImage';
import storage from '@/utils/storage';
import styles from './index.less';
import userInfoStores from '@/stores/userInfo';
import enums from '@/stores/enums';
import AutoList from '@/components/autoList';
import ModailSelect from '@/components/modailSelect';
import { getFindMerchantList } from '@/apis/merchant';
import type { Merchant } from '@/apis/merchant';
import { updateCampus } from '@/apis/user';
import Native from '@/components/native';
import { usePageEvent } from 'remax/macro';
import invitationShare from '@/utils/invitationShare';

const Item = (props: Merchant) => {
  return (
    <Card
      style={{
        padding: '20rpx 20rpx 20rpx',
        margin: 0,
        borderRadius: 0,
        borderBottom: '1px solid #e2e2e2',
      }}
      onTap={() => {
        navigateTo({
          url: `/pages/shop/index?id=${props.id}`,
        });
      }}
      direction='horizontal'
      cover={
        <BackImage
          height='160rpx'
          width='160rpx'
          preview={false}
          style={{ borderRadius: '10rpx' }}
          src={props.merAvatarurl || '/images/test/nouser.jpg'}
        />
      }>
      <View className={styles.column}>
        <View className={styles.row}>
          <View className={styles.title}>{props.merName}</View>
          <View className={styles.to}>进店点餐</View>
        </View>
        <Space>
          <View>月销量:</View>
          <View>{props.sellNum || 0}</View>
          <View>份</View>
        </Space>
        <View className={styles.row}>
          <View className={styles.description}>
            店铺简介：{props.merDescribe || '暂无简介'}
          </View>
        </View>
      </View>
    </Card>
  );
};

const Index = () => {
  const { userInfo, share } = userInfoStores.useContainer();
  const campuRef = useRef(storage.get('campu'));
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
              userInfo?.id &&
                updateCampus({ userId: userInfo?.id, campusId: val });
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
      {/* <NoticeBar title='温馨提示'> 这里是通知信息栏</NoticeBar> */}
      <View className={styles.body}>
        {useMemo(() => {
          return (
            <AutoList<Merchant>
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
                return getFindMerchantList({
                  ...params,
                  userId: userInfo?.id,
                  campusId: campuRef.current,
                });
              }}
              renderItem={(res) => {
                return <Item key={res.id} {...res} />;
              }}
            />
          );
        }, [userInfo?.id])}
      </View>
    </View>
  );
};

export default Index;
