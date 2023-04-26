import React, { useState } from 'react';
import { View, navigateTo } from 'remax/wechat';
import styles from './index.less';
import { Tabs, Card, Col, Icon, Popup, Space, Button } from 'anna-remax-ui';
import { orderPage } from '@/apis/order';
import type { ResOrder } from '@/apis/order';
import AutoList from '@/components/autoList';
import BackImage from '@/components/backImage';
import Favorable from '@/components/favorable';

const { TabContent } = Tabs;

const statusColor: Record<string, string> = {
  进行中: '#fa8c16',
  已完成: '#52c41a',
};

const BagItem: React.FC<ResOrder> = (props) => {
  console.log(props);
  return (
    <View className={styles.card}>
      <Card
        title={
          <View
            onTap={() => {
              navigateTo({
                url: `/pages/orderInfo/index?orderId=${props.orderId}`,
              });
            }}>
            <Space className={styles.title}>
              <View>{props.merName}</View>
              <Icon type='right' />
            </Space>
          </View>
        }
        extra={
          <View
            className={styles.coverExtra}
            style={{ color: statusColor[props.statusDesc] || '#999' }}>
            {props.statusDesc}
          </View>
        }
        cover={
          <View className={styles.imageContainer}>
            <BackImage
              style={{ borderRadius: '5rpx' }}
              height='120rpx'
              width='120rpx'
              src={props.merAvatarurl}
              preview={false}
            />
          </View>
        }
        direction='horizontal'
        foot={
          <View className={styles['good-foot']}>
            <View className={styles.favorable}>
              应付: <Favorable favorable={props.payMoney} />
            </View>
            <Button
              plain
              hairline
              onTap={() =>
                navigateTo({
                  url: `/pages/shop/index?id=${props.merchantId}`,
                })
              }>
              再来一单
            </Button>
          </View>
        }>
        <View className={styles.content}>
          {props.wxOrderGoodsDetailResList?.map((item) => {
            return (
              <View key={item.goodsId} className={styles['good-content']}>
                <View>{item.goodsName}</View>
                <View>×{item.number}</View>
              </View>
            );
          })}
        </View>
      </Card>
    </View>
  );
};

const tabs = [
  {
    key: '',
    title: '全部订单',
  },
  {
    key: '2',
    title: '进行中',
  },
  {
    key: '3',
    title: '已完成',
  },
  {
    key: '4',
    title: '已取消',
  },
];

const Index = () => {
  const [status, setStatus] = useState('');
  return (
    <View className={styles.my}>
      <Tabs activeKey={status} onTabClick={({ key }) => setStatus(key)}>
        {tabs.map((tab) => (
          <TabContent key={tab.key} tab={tab.title} />
        ))}
      </Tabs>
      <AutoList<ResOrder>
        loadingTip={
          <View
            style={{
              padding: '50rpx',
              textAlign: 'center',
            }}>
            加载中~
          </View>
        }
        getList={(params) => {
          return orderPage({
            ...params,
            status: !status ? undefined : status,
          });
        }}
        renderItem={(res, index) => {
          return <BagItem key={index} {...res} />;
        }}
      />
    </View>
  );
};
export default Index;
