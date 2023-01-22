import React, { useMemo } from 'react';
import { View, Text, Image } from 'remax/wechat';
import { Tabs, Card } from 'anna-remax-ui';
import styles from './index.css';
const { TabContent } = Tabs;

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
          <Card>
            <View className={styles.tabContent}>{`${
              tab.key === '1' ? '待报价' : tab.title
            } content`}</View>
          </Card>
        </TabContent>
      ))}
    </Tabs>
  );
};

export default Index;
