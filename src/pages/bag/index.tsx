import React, { useMemo } from 'react';
import { View, Text } from 'remax/wechat';
import { Tabs, Card, Row, Col, Button, Tag, Space } from 'anna-remax-ui';
import styles from './index.less';
import classnames from 'classnames';
import Image from '@/components/image';
const { TabContent } = Tabs;

const BagItem: React.FC = () => {
  return (
    <Card
      style={{ padding: '10rpx 0', margin: '20rpx 0' }}
      contentStyle={{ padding: '0 20rpx' }}
      shadow
      title={
        <View className={styles['bag-item-title']}>
          <Space>
            <Image src='/images/test/123.jpg' width='40rpx' height='40rpx' />
            <View>肯德基</View>
          </Space>
        </View>
      }>
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
  const [stateKey, setStateKey] = React.useState('0');

  const tabs = useMemo(() => {
    return [
      {
        key: '0',
        title: '全部',
      },
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
      {
        key: '3',
        title: '已过期',
      },
    ];
  }, []);
  return (
    <Tabs onTabClick={({ key }) => setStateKey(key)} activeKey={stateKey}>
      {tabs.map((tab) => (
        <TabContent key={tab.key} tab={tab.title}>
          <BagItem />
          <BagItem />
          <BagItem />
        </TabContent>
      ))}
    </Tabs>
  );
};

export default Index;
