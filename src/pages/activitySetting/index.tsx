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
  return <View className={styles.setting}>123123</View>;
};
export default Index;
