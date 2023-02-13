import * as React from 'react';
import { View } from 'remax/one';
import { Space } from 'anna-remax-ui';
import styles from './index.less';

export interface Props {
  color?: string;
  size?: number;
  amount?: string | number;
}
const Index = ({ color, size = 40, amount }: Props) => {
  return (
    <View className={styles.amount}>
      <Space size={3}>
        <View style={{ fontSize: `${size / 2}rpx`, color }}>￥</View>
        <View style={{ fontSize: `${size}rpx`, color, fontWeight: 600 }}>
          {amount}
        </View>
      </Space>
    </View>
  );
};
export default Index;
