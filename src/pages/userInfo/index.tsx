import React, { useState } from 'react';
import { View, navigateTo } from 'remax/wechat';
import styles from './index.less';
import BottomButton from '@/components/bottomButton';
import LoginLayout from '@/layout/loginLayout';
import Image from '@/components/image';
import userInfoStores from '@/stores/userInfo';
import { Cell, Popup, Space, ImageUpload } from 'anna-remax-ui';
import { useAppEvent } from 'remax/macro';

const Index = () => {
  const { userInfo, getUserInfo } = userInfoStores.useContainer();

  useAppEvent('onShow', () => {
    getUserInfo();
  });

  return (
    <LoginLayout>
      <View className={styles.setting}>
        <Cell label='头像'>
          <Image
            height='50'
            width='50'
            style={{
              overflow: 'hidden',
              borderRadius: '50%',
            }}
            src={userInfo?.avatarurl || '/images/test/nouser.jpg'}
          />
        </Cell>
        <Cell label='昵称'>{userInfo?.nickname}</Cell>
        <Cell label='手机号'>{userInfo?.mobile}</Cell>
        <Cell label='区域'>区域</Cell>
        {/* <Cell label='地址'>环球大厦</Cell> */}
        <BottomButton
          size='large'
          onTap={() => {
            navigateTo({
              url: '/pages/userIdea/index',
            });
          }}
          type='primary'
          shape='square'
          block>
          修改信息
        </BottomButton>
      </View>
    </LoginLayout>
  );
};
export default Index;
