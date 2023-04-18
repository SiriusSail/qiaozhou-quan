import React, { useMemo, useState } from 'react';
import { View, Text, navigateTo, startPullDownRefresh } from 'remax/wechat';
import { Tabs, Card, Popup, Cell, Button, Tag, Space } from 'anna-remax-ui';
import styles from './index.less';
import Image from '@/components/image';
import userInfoStores from '@/stores/userInfo';
import AutoList from '@/components/autoList';
import { findGoodsListByMerchantId } from '@/apis/goods';
import type { FindGoods } from '@/apis/goods';
import Voucher from '@/components/voucher';
import BottomButton from '@/components/bottomButton';
import type { CampusItem } from '@/apis/usercoupon';
import { usePageEvent } from 'remax/macro';
import { useRequest } from 'ahooks';
const { TabContent } = Tabs;

const BagItem: React.FC<CampusItem> = (props) => {
  return (
    <Card
      style={{ padding: '10rpx 0', margin: '20rpx 0' }}
      contentStyle={{ padding: '0 20rpx' }}
      shadow
      title={
        <View
          onTap={() =>
            navigateTo({
              url: `/pages/shop/index?id=${props.merchantId}`,
            })
          }
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
        return <Voucher type='see' {...item} />;
      })}
    </Card>
  );
};

const Index = () => {
  const [stateKey, setStateKey] = useState('1');
  const [show, setShow] = useState(false);
  const { userInfo } = userInfoStores.useContainer();

  const { data } = useRequest(
    () => {
      if (!userInfo?.merchantId) return Promise.resolve({} as FindGoods);
      return findGoodsListByMerchantId(userInfo?.merchantId);
    },
    {
      refreshDeps: [userInfo],
    }
  );

  return (
    <View className={styles.bag}>
      <Tabs
        onTabClick={({ key }) => setStateKey(key)}
        activeKey={stateKey}
        direction='vertical'>
        {data?.goodsCategoryListResList?.map((tab) => (
          <TabContent key={tab.categoryId} tab={tab.categoryName}>
            <Card>
              <View>123123</View>
            </Card>
          </TabContent>
        ))}
      </Tabs>
      <BottomButton
        size='large'
        onTap={() => {
          setShow(true);
          // navigateTo({
          //   url: '/pages/productPages/edit/index',
          // });
        }}
        type='primary'
        shape='square'
        block>
        添加商品
      </BottomButton>
      <Popup
        position='bottom'
        title='选择分类'
        open={show}
        onClose={() => {
          setShow(false);
        }}>
        <Cell
          label='添加分类'
          onTap={() => {
            navigateTo({
              url: '/pages/productPages/categoryList/index',
            });
          }}
          arrow
        />
      </Popup>
    </View>
  );
};

export default Index;
