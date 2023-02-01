import React from 'react';
import { View } from 'remax/wechat';
import { Icon } from 'anna-remax-ui';

const style: React.CSSProperties = {
  display: 'flex',
  height: '500rpx',
  padding: '30rpx',
  width: '100%',
  paddingTop: '60rpx',
  flexDirection: 'column',
  justifyContent: 'space-around',
  alignItems: 'center',
};
const Index: React.FC<{ title?: React.ReactNode }> = ({ title }) => {
  return (
    <View style={style}>
      <View style={{ textAlign: 'center' }}>
        <Icon type='discover' size='100' color='orange' />
        <View style={{ paddingTop: '30rpx', fontSize: '24rpx' }}>{title}</View>
      </View>
    </View>
  );
};
export default Index;
