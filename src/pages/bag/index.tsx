import React, { useMemo, useState, useCallback } from 'react';
import {
  View,
  navigateTo,
  startPullDownRefresh,
  navigateBack,
} from 'remax/wechat';
import { Tabs, Card, Space } from 'anna-remax-ui';
import styles from './index.less';
import Image from '@/components/image';
import userInfoStores from '@/stores/userInfo';
import AutoList from '@/components/autoList';
import { updateCampus } from '@/apis/usercoupon';
import Voucher from '@/components/voucher';
import type { CampusItem, CampusVoucherItem } from '@/apis/usercoupon';
import { usePageEvent } from 'remax/macro';
import { useQuery } from 'remax';
import storage from '@/utils/storage';
const { TabContent } = Tabs;

const BagItem: React.FC<CampusItem> = (props) => {
  console.log(props);
  const { merchantId } = useQuery<{ merchantId: string }>();
  const tap = useCallback(
    (e: CampusVoucherItem) => {
      if (merchantId) {
        storage.set('coupon', JSON.stringify(e));
        navigateBack();
        return;
      }
      navigateTo({
        url: `/pages/voucher/index?id=${e.couponNo}`,
      });
    },
    [merchantId]
  );
  return (
    <Card
      style={{ padding: '10rpx 0', margin: '20rpx 0' }}
      contentStyle={{ padding: '0 20rpx' }}
      shadow
      title={
        <View
          onTap={() => {
            if (merchantId) {
              return;
            }
            navigateTo({
              url: `/pages/shop/index?id=${props.merchantId}`,
            });
          }}
          className={styles['bag-item-title']}>
          <Space>
            <Image
              src={props.merAvatarurl || undefined}
              width='40rpx'
              height='40rpx'
            />
            <View>{props.merchantName}</View>
          </Space>
        </View>
      }>
      {props?.list?.map((item) => {
        return <Voucher onTap={() => tap(item)} type='see' {...item} />;
      })}
    </Card>
  );
};

const Index = () => {
  const [status, setStatus] = useState('1');
  const { merchantId } = useQuery<{ merchantId: string }>();
  const { userInfo } = userInfoStores.useContainer();

  const tabs = useMemo(() => {
    return [
      {
        key: '1',
        title: (
          <View className={styles.tab}>
            未使用
            {/* <Text className={styles.total}>7</Text> */}
          </View>
        ),
      },
      {
        key: '2',
        title: '已使用',
      },
    ];
  }, []);
  usePageEvent('onShow', () => {
    startPullDownRefresh();
  });
  return (
    <View className={styles.bag}>
      <Tabs onTabClick={({ key }) => setStatus(key)} activeKey={status}>
        {tabs.map((tab) => (
          <TabContent key={tab.key} tab={tab.title} />
        ))}
      </Tabs>

      {useMemo(() => {
        return (
          <AutoList<CampusItem>
            loadingTip={
              <View
                style={{
                  padding: '50rpx',
                  textAlign: 'center',
                }}>
                正在查找您的红包～
              </View>
            }
            getList={(params) => {
              if (!userInfo?.id) {
                return Promise.resolve({ records: [], current: 1 });
              }
              return updateCampus({
                ...params,
                merchantId,
                userId: userInfo?.id,
                status,
              });
            }}
            renderItem={(res, index) => {
              return <BagItem key={index} {...res} />;
            }}
          />
        );
      }, [merchantId, status, userInfo?.id])}
    </View>
  );
};

export default Index;
