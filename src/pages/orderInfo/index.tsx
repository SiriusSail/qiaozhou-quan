import React, { useState, useRef, useEffect, useCallback } from 'react';
import { View, navigateTo, createSelectorQuery } from 'remax/wechat';
import styles from './index.less';
import userInfoStores from '@/stores/userInfo';
import { usePageEvent } from 'remax/macro';

const Index = () => {
  const { getUserInfo } = userInfoStores.useContainer();
  usePageEvent('onShow', () => {
    getUserInfo();
  });
  // 点击成为商家
  return <View className={styles.my}>123123123</View>;
};
export default Index;
