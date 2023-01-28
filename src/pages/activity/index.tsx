import React from 'react';
import { View, navigateTo } from 'remax/wechat';
import styles from './index.less';
import Image from '@/components/image';
import Block from '@/components/block';
import { Tabs, Cell, Space, Col } from 'anna-remax-ui';

const tabs = [
  {
    key: '0',
    title: '进行中',
  },
  {
    key: '1',
    title: '已过期',
  },
];

const { TabContent } = Tabs;

const Index = () => {
  const [stateKey, setStateKey] = React.useState('0');
  return (
    <View className={styles.setting}>
      <Tabs onTabClick={({ key }) => setStateKey(key)} activeKey={stateKey}>
        {tabs.map((tab) => (
          <TabContent key={tab.key} tab={tab.title}>
            <Cell
              onTap={() => {
                navigateTo({ url: '/pages/activitySetting/index' });
              }}
              label='现金红包'
              description={
                <Space>
                  <View>Here is the description</View>
                  <View>2023-01-34</View>
                </Space>
              }>
              1888¥
            </Cell>
            <Cell
              label='现金红包'
              description={
                <Space>
                  <View>Here is the description</View>
                  <View>2023-01-34</View>
                </Space>
              }>
              1888¥
            </Cell>
            <Cell
              label='现金红包'
              description={
                <Space>
                  <View>Here is the description</View>
                  <View>2023-01-34</View>
                </Space>
              }>
              1888¥
            </Cell>
          </TabContent>
        ))}
      </Tabs>
    </View>
  );
};
export default Index;
