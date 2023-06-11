import React from 'react';
import { View, navigateTo } from 'remax/wechat';
import styles from './index.less';
import BottomButton from '@/components/bottomButton';
import Block from '@/components/block';
import BackImage from '@/components/backImage';
import LoginLayout from '@/layout/loginLayout';
import { Cell, ImageUpload } from 'anna-remax-ui';
import user from '@/stores/userInfo';
import { usePageEvent } from 'remax/macro';
import enums from '@/stores/enums';

const Index = () => {
  const { merchant: data, getMerchant } = user.useContainer();

  const { getCampusPage, getMerchantType, campus, merchantType } =
    enums.useContainer();

  usePageEvent('onShow', () => {
    getMerchantType();
    !!data && getMerchant();
  });

  return (
    <LoginLayout>
      <View className={styles.setting}>
        <Cell label='店铺名称'>{data?.merName}</Cell>
        <Cell label='店铺头像'>
          {
            <BackImage
              src={data?.merAvatarUrl}
              style={{ display: 'inline-block' }}
              height='40rpx'
              width='40rpx'
            />
          }
        </Cell>
        <Cell label='经营类目'>
          {merchantType?.data.find((item) => item.key === data?.merType)
            ?.value || '-'}
        </Cell>
        <Cell label='联系人'>{data?.merPerson}</Cell>
        <Cell label='区域'>
          {data?.list?.map((item) => item.campusName).join(',')}
        </Cell>
        <Cell label='联系电话'>{data?.merPersonTel}</Cell>
        <Cell label='店铺地址'>{data?.merAddress}</Cell>
        <Cell label='营业开始时间'>{data?.businessStartTime}</Cell>
        <Cell label='营业结束时间'>{data?.businessEndTime}</Cell>
        <Cell label='最低订单价'>{data?.businessEndTime}</Cell>
        <Cell label='审核状态'>{data?.examineStatus}</Cell>
        <Cell label='店铺简介'>{data?.merDescribe}</Cell>
        <Cell label='支付方式'>{data?.payType === 1 ? '线上' : '线下'}</Cell>
        <Cell label='是否营业'>{data?.status === 1 ? '是' : '否'}</Cell>
        <Block contentStyle={{ padding: '0 30rpx' }} title='门头照'>
          <ImageUpload
            files={[data?.doorPhoto || '']}
            deletable={false}
            disabled={true}
            maxCount={1}
            sizeType={['compressed']}
          />
        </Block>
        {/* <Block contentStyle={{ padding: '0 30rpx' }} title='店铺相关照片'>
          <ImageUpload
            files={data?.fileUrl || []}
            deletable={false}
            disabled={true}
            maxCount={data?.fileUrl?.length}
            sizeType={['compressed']}
          />
        </Block> */}
        <Block contentStyle={{ padding: '0 30rpx' }} title='店铺资质'>
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
            if (data?.examine === 3) {
              navigateTo({
                url: '/pages/shopApply/index?isReApply=1',
              });
            } else {
              navigateTo({
                url: '/pages/shopPages/shopEdit/index',
              });
            }
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
