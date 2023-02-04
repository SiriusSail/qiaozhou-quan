import React, { useMemo, useState } from 'react';
import { View, Text } from 'remax/wechat';
import { Tabs, Card, Row, Col, Button, Tag, Space } from 'anna-remax-ui';
import styles from './index.less';
import classnames from 'classnames';
import Image from '@/components/image';
import userInfoStores from '@/stores/userInfo';
import AutoList from '@/components/autoList';
import { updateCampus } from '@/apis/usercoupon';
import LoginPlugin from '@/plugins/loginPlugin';
import type { CampusItem } from '@/apis/usercoupon';
const { TabContent } = Tabs;

const BagItem: React.FC<CampusItem> = (props) => {
  console.log(props);
  return (
    <Card
      style={{ padding: '10rpx 0', margin: '20rpx 0' }}
      contentStyle={{ padding: '0 20rpx' }}
      shadow
      title={
        <View className={styles['bag-item-title']}>
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
                  满2000可用
                </View>
                <View className={styles['bag-item-down']}>
                  有效期至 {item.effectiveTime}
                </View>
              </Col>
              <Col span={6}>
                <View className={styles['bag-item-right']}>
                  {item.status === 1 ? (
                    <Button type='primary' danger>
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
      <View className={styles['bag-item']}>
        <Row>
          <Col span={7} className={styles['bag-item-left']}>
            <View
              className={classnames(
                styles['bag-item-up'],
                styles['font-size-80']
              )}>
              ￥500
            </View>
            <View className={styles['bag-item-down']}>
              <Tag color='red'>店铺优惠券</Tag>
            </View>
          </Col>
          <Col span={11}>
            <View
              className={classnames(
                styles['bag-item-up'],
                styles['font-size-60']
              )}>
              满2000可用
            </View>
            <View className={styles['bag-item-down']}>
              有效期至 2022.11.29 23:59
            </View>
          </Col>
          <Col span={6}>
            <View className={styles['bag-item-right']}>
              <Button type='primary' danger>
                使用
              </Button>
            </View>
          </Col>
        </Row>
      </View>
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
            <Text className={styles.total}>7</Text>
          </View>
        ),
      },
      {
        key: '2',
        title: '已使用',
      },
    ];
  }, []);
  return (
    <LoginPlugin>
      <Tabs onTabClick={({ key }) => setStatus(key)} activeKey={status}>
        {tabs.map((tab) => (
          <TabContent key={tab.key} tab={tab.title} />
        ))}
      </Tabs>
      <AutoList<CampusItem>
        getList={(params) => {
          return updateCampus({
            ...params,
            // userId: userInfo?.id,
            status,
          });
        }}
        renderItem={(res) => {
          return <BagItem {...res} />;
        }}
      />
    </LoginPlugin>
  );
};

export default Index;
