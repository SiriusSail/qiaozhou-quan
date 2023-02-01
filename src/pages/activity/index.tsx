import React from 'react';
import { View, navigateTo } from 'remax/wechat';
import styles from './index.less';
import BottomButton from '@/components/bottomButton';
import { getActivityListByUserId } from '@/apis/activity';
import LoginPlugin from '@/plugins/loginPlugin';
import { Tabs, Cell, Space } from 'anna-remax-ui';
import userInfoStores from '@/stores/userInfo';
import AutoList from '@/components/autoList';

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
  const { userInfo } = userInfoStores.useContainer();
  return (
    <LoginPlugin>
      <View className={styles.setting}>
        <Tabs onTabClick={({ key }) => setStateKey(key)} activeKey={stateKey}>
          {tabs.map((tab) => (
            <TabContent key={tab.key} tab={tab.title} />
          ))}
        </Tabs>
        {userInfo?.id && (
          <AutoList
            getList={(params) => {
              return getActivityListByUserId({
                ...params,
                userId: userInfo?.id,
              });
            }}
            renderItem={(res) => {
              return <View>123123</View>;
            }}
          />
        )}
        <BottomButton
          size='large'
          onTap={() => {
            navigateTo({ url: '/pages/activitySetting/index' });
          }}
          type='primary'
          shape='square'
          block>
          创建活动
        </BottomButton>
      </View>
    </LoginPlugin>
  );
};
export default Index;
