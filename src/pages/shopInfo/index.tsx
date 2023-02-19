import React from 'react';
import { View, navigateTo } from 'remax/wechat';
import styles from './index.less';
import BottomButton from '@/components/bottomButton';
import Block from '@/components/block';
import Image from '@/components/image';
import LoginLayout from '@/layout/loginLayout';
import { Cell, ImageUpload } from 'anna-remax-ui';
import user from '@/stores/userInfo';
import { usePageEvent } from 'remax/macro';

const Index = () => {
  const { merchant: data, getMerchant } = user.useContainer();

  usePageEvent('onShow', () => {
    !!data && getMerchant();
  });

  return (
    <LoginLayout>
      <View className={styles.setting}>
        <Cell label='店铺头像'>
          {<Image src={data?.merAvatarUrl} height='40rpx' width='40rpx' />}
        </Cell>
        <Cell label='店铺名称'>{data?.merName}</Cell>
        <Cell label='联系人'>{data?.merPerson}</Cell>
        <Cell label='区域'>
          {data?.list?.map((item) => item.campusName).join(',')}
        </Cell>
        <Cell label='联系电话'>{data?.merPersonTel}</Cell>
        <Cell label='店铺地址'>{data?.merAddress}</Cell>
        <Cell label='审核状态'>{data?.examineStatus}</Cell>
        <Block contentStyle={{ padding: '0 30rpx' }} title='门头照'>
          <ImageUpload
            files={[data?.doorPhotoUrl || '']}
            deletable={false}
            disabled={true}
            maxCount={1}
            sizeType={['compressed']}
          />
        </Block>
        <Block contentStyle={{ padding: '0 30rpx' }} title='店铺相关照片'>
          <ImageUpload
            files={data?.fileUrl || []}
            deletable={false}
            disabled={true}
            maxCount={data?.fileUrl?.length}
            sizeType={['compressed']}
          />
        </Block>
        <Block contentStyle={{ padding: '0 30rpx' }} title='店铺资质上传'>
          <ImageUpload
            files={data?.aptitudeUrl || []}
            deletable={false}
            disabled={true}
            maxCount={data?.aptitudeUrl?.length}
            sizeType={['compressed']}
          />
        </Block>
        <BottomButton
          size='large'
          disabled={data?.examine === 2}
          onTap={() => {
            navigateTo({
              url: '/pages/shopIdea/index',
            });
          }}
          type='primary'
          shape='square'
          block>
          {data?.examine === 3 ? '重新申请' : '修改信息'}
        </BottomButton>
      </View>
    </LoginLayout>
  );
};
export default Index;
