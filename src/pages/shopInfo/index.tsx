import React from 'react';
import { View, navigateTo } from 'remax/wechat';
import styles from './index.less';
import BottomButton from '@/components/bottomButton';
import Image from '@/components/image';
import LoginLayout from '@/layout/loginLayout';
import { getMerchantByUserId } from '@/apis/merchant';
import { Cell } from 'anna-remax-ui';
import { useRequest } from 'ahooks';
import user from '@/stores/userInfo';
import { usePageEvent } from 'remax/macro';

const Index = () => {
  const { userInfo } = user.useContainer();
  const { data, run } = useRequest(() => getMerchantByUserId(userInfo!.id), {
    manual: !userInfo?.id,
  });

  usePageEvent('onShow', () => {
    !!data && run();
  });
  return (
    <LoginLayout>
      <View className={styles.setting}>
        <Cell label='店铺头像'>
          {<Image src={data?.merAvatarurl} height='40rpx' width='40rpx' />}
        </Cell>
        <Cell label='店铺名称'>{data?.merName}</Cell>
        <Cell label='联系人'>{data?.merPerson}</Cell>
        <Cell label='区域'>
          {data?.list?.map((item) => item.campusName).join(',')}
        </Cell>
        <Cell label='联系电话'>{data?.merPersonTel}</Cell>
        <Cell label='店铺地址'>{data?.merAddress}</Cell>
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
    </LoginLayout>
  );
};
export default Index;
