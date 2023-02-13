import React from 'react';
import { View, redirectTo, showModal } from 'remax/wechat';
import styles from './index.less';
import Block from '@/components/block';
import { makePhoneCall } from 'remax/wechat';
import LoginLayout from '@/layout/loginLayout';
import { logout } from '@/apis/auth';
import { useRequest } from 'ahooks';
import userInfoStores from '@/stores/userInfo';
import { Cell, Button } from 'anna-remax-ui';
import Agreement from '@/components/agreement';
import storage from '@/utils/storage';

const Index = () => {
  const { loading, run } = useRequest(logout, { manual: true });
  const { getUserInfo } = userInfoStores.useContainer();

  return (
    <LoginLayout>
      <View className={styles.setting}>
        <Cell label='用户协议' arrow>
          <Agreement type='用户服务协议' textRender={() => '点击查看'} />
        </Cell>
        <Cell label='隐私权政策' arrow>
          <Agreement type='隐私协议' textRender={() => '点击查看'} />
        </Cell>
        <Cell label='商户服务协议' arrow>
          <Agreement type='平台商户服务规范' textRender={() => '点击查看'} />
        </Cell>
        <Cell label='会员服务协议' arrow>
          <Agreement type='会员服务协议' textRender={() => '点击查看'} />
        </Cell>
        <Cell
          label='联系客服'
          arrow
          onTap={() => {
            makePhoneCall({
              phoneNumber: '18883350586',
            });
          }}></Cell>
        {/* <Cell label='切换用户' arrow /> */}

        <Block contentStyle={{ padding: '0 30rpx' }}>
          <Button
            type='primary'
            size='large'
            loading={loading}
            danger
            square
            block
            onTap={() => {
              showModal({
                title: '确定退出当前账号',
                cancelText: '取消',
                confirmText: '确定',
                success: () => {
                  run();
                  storage.del('token');
                  getUserInfo();
                  redirectTo({
                    url: '/pages/index/index',
                  });
                },
              });
            }}>
            退出登陆
          </Button>
        </Block>
      </View>
    </LoginLayout>
  );
};
export default Index;
