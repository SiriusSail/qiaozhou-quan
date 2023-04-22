import React from 'react';
import { View } from 'remax/wechat';
import styles from './index.less';
import { Space } from 'anna-remax-ui';

const Index: React.FC<{
  uniSize?: number;
  favorableSize?: number;
  color?: string;
  favorable: string | number;
}> = ({ uniSize = 20, favorableSize = 30, color = '#333', favorable }) => {
  return (
    <Space size={0}>
      <View
        style={{ fontSize: `${uniSize}rpx`, color }}
        className={styles.unit}>
        ￥
      </View>
      <View
        className={styles.favorable}
        style={{ fontSize: `${favorableSize}rpx`, color }}>
        {parseInt(favorable).toFixed(2)}
      </View>
    </Space>
  );
};
export default Index;
