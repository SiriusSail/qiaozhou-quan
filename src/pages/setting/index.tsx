import React from 'react';
import { View, navigateTo } from 'remax/wechat';
import styles from './index.less';
import Block from '@/components/block';
import { Cell, Button } from 'anna-remax-ui';

const Index = () => {
  return (
    <View className={styles.setting}>
      <Cell label='用户协议' arrow>
        点击查看
      </Cell>
      <Cell label='隐私权政策' arrow />
      <Cell label='会员服务协议' arrow />
      <Cell label='商户服务协议' arrow />
      <Cell label='企业资质' arrow />
      <Cell label='联系客服' arrow />
      <Cell label='切换用户' arrow />

      <Block contentStyle={{ padding: '0 30rpx' }}>
        <Button type='primary' size='large' danger square block>
          退出登陆
        </Button>
      </Block>
    </View>
  );
};
export default Index;
