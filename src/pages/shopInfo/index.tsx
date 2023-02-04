import React, { useState } from 'react';
import { View, navigateTo } from 'remax/wechat';
import styles from './index.less';
import BottomButton from '@/components/bottomButton';
import LoginPlugin from '@/plugins/loginPlugin';
import Block from '@/components/block';
import { Cell, Popup, Space, ImageUpload } from 'anna-remax-ui';

const Index = () => {
  return (
    <LoginPlugin>
      <View className={styles.setting}>
        <Cell label='店铺名称'>点击查看</Cell>
        <Cell label='经营类别'>金额</Cell>
        <Cell label='区域选择'>红包个数</Cell>
        <Cell label='联系人'>同时拥有个数</Cell>
        <Cell label='联系电话'>同时拥有个数</Cell>
        <Cell label='店铺地址'>同时拥有个数</Cell>
        <Cell label='资质证件'>同时拥有个数</Cell>
        <Block title='资质证件及店铺照片上传'>
          <View style={{ padding: '0 20px' }}>
            <ImageUpload
              files={['/images/test/123.jpg']}
              multiple
              deletable={false}
              maxCount={1}
            />
          </View>
        </Block>
        <BottomButton
          size='large'
          onTap={() => {
            navigateTo({
              url: '/pages/shopIdea/index',
            });
          }}
          type='primary'
          shape='square'
          block>
          修改信息
        </BottomButton>
      </View>
    </LoginPlugin>
  );
};
export default Index;
