import React, { useState } from 'react';
import { View } from 'remax/wechat';
import { usePageEvent } from 'remax/macro';
import storage from '@/utils/storage';
import { navigateTo } from 'remax/wechat';
import { Icon, Button } from 'anna-remax-ui';

const style: React.CSSProperties = {
  position: 'fixed',
  display: 'flex',
  height: '100%',
  padding: '30rpx',
  width: '100%',
  left: 0,
  top: 0,
  paddingTop: '100rpx',
  flexDirection: 'column',
  justifyContent: 'space-around',
  alignItems: 'center',
};
const Index: React.FC = ({ children }) => {
  const [token, setToken] = useState(storage.get('token'));
  usePageEvent('onShow', () => {
    setToken(storage.get('token'));
  });
  if (!token) {
    return (
      <View style={style}>
        <View style={{ textAlign: 'center' }}>
          <Icon type='discover' size='100' color='orange' />
          <View style={{ paddingTop: '30rpx' }}>您暂未登录</View>
        </View>
        <Button
          onTap={() => {
            navigateTo({
              url: '/pages/login/index',
            });
          }}
          size='large'
          block
          look='orange'>
          去登陆
        </Button>
      </View>
    );
  }
  return <View>{children}</View>;
};
export default Index;
