import React, { useState } from 'react';
import { View, navigateBack } from 'remax/wechat';
import styles from './index.less';
import BottomButton from '@/components/bottomButton';
import Block from '@/components/block';
import { Cell, Popup, Space } from 'anna-remax-ui';

const Index = () => {
  const [show1, setShow1] = useState(false);
  const [show2, setShow2] = useState(false);
  return (
    <View className={styles.setting}>
      <Block title='活动内容'>
        <Cell label='活动类型'>点击查看</Cell>
        <Cell label='金额'>金额</Cell>
        <Cell label='红包个数'>红包个数</Cell>
        <Cell label='同时拥有个数'>同时拥有个数</Cell>
        <Cell onTap={() => setShow1(true)} label='优惠券使用规则'>
          <View>优惠券使用规则</View>
        </Cell>
        <Cell onTap={() => setShow2(true)} label='活动文案阐述'>
          <View>活动文案阐述</View>
        </Cell>
      </Block>

      <Block title='活动数据'>
        <Cell label='优惠券已领取'>
          <Space>
            <View>优惠券已领取</View>
            <View>张</View>
          </Space>
        </Cell>
        <Cell label='优惠券已使用'>
          <Space>
            <View>优惠券已使用</View>
            <View>张</View>
          </Space>
        </Cell>
        <Cell label='优惠券未使用'>
          <Space>
            <View>优惠券未使用</View>
            <View>张</View>
          </Space>
        </Cell>
        <Cell label='优惠券总曝光'>
          <Space>
            <View>优惠券总曝光</View>
            <View>张</View>
          </Space>
        </Cell>
      </Block>
      <BottomButton
        type='default'
        onTap={() => navigateBack()}
        size='large'
        danger
        square
        block>
        返回
      </BottomButton>

      <Popup
        position='bottom'
        title='优惠券使用规则'
        open={show1}
        closeable={true}
        onClose={() => {
          setShow1(false);
        }}>
        <View
          style={{
            height: '400px',
            padding: '0 24px',
          }}>
          优惠券使用规则
        </View>
      </Popup>
      <Popup
        position='bottom'
        title='活动文案'
        open={show2}
        closeable={true}
        onClose={() => {
          setShow2(false);
        }}>
        <View
          style={{
            height: '400px',
            padding: '0 24px',
          }}>
          活动文案阐述
        </View>
      </Popup>
    </View>
  );
};
export default Index;
