import React, { useMemo, useState } from 'react';
import { View, Text, navigateTo, startPullDownRefresh } from 'remax/wechat';
import { Tabs, Card, Row, Col, Button, Tag, Space } from 'anna-remax-ui';
import styles from './index.less';
import classnames from 'classnames';
import Image from '@/components/image';
import userInfoStores from '@/stores/userInfo';
import AutoList from '@/components/autoList';
import { updateCampus } from '@/apis/usercoupon';
import LoginLayout from '@/layout/loginLayout';
import type { CampusItem } from '@/apis/usercoupon';
import { usePageEvent } from 'remax/macro';
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
              url: `/pages/shop/index?id=${props.couponNo}`,
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
        return (
          <View className={styles['bag-item']}>
            <Row>
              <Col span={7} className={styles['bag-item-left']}>
                <View
                  className={classnames(
                    styles['bag-item-up'],
                    styles['font-size-80']
                  )}>
                  {item.favorable}
                </View>
                <View className={styles['bag-item-down']}>
                  <Tag color='red'>{item.couponName}</Tag>
                </View>
              </Col>
              <Col span={11}>
                <View
                  className={classnames(
                    styles['bag-item-up'],
                    styles['font-size-60']
                  )}>
                  无使用门槛
                </View>
                <View className={styles['bag-item-down']}>
                  有效期至 {item.effectiveTime}
                </View>
              </Col>
              <Col span={6}>
                <View className={styles['bag-item-right']}>
                  {item.status === 1 ? (
                    <Button
                      type='primary'
                      danger
                      onTap={() => {
                        navigateTo({
                          url: `/pages/voucher/index?id=${item.couponId}`,
                        });
                      }}>
                      使用
                    </Button>
                  ) : (
                    <Button disabled={true} type='primary' danger>
                      已使用
                    </Button>
                  )}
                </View>
              </Col>
            </Row>
          </View>
        );
      })}
    </Card>
  );
};

const Index = () => {
  const [status, setStatus] = useState('1');
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
    <View>
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
                userId: userInfo?.id,
                status,
              });
            }}
            renderItem={(res, index) => {
              return <BagItem key={index} {...res} />;
            }}
          />
        );
      }, [status, userInfo?.id])}
    </View>
  );
};

export default Index;
