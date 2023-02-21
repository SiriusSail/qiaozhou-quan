import React from 'react';
import { View } from 'remax/wechat';
import styles from './index.less';
import LoginLayout from '@/layout/loginLayout';
import { Space } from 'anna-remax-ui';
import Qrcode from '@/components/qrcode';
import { useQuery } from 'remax';

const Index = () => {
  const { id } = useQuery<{ id: string }>();
  return (
    <LoginLayout>
      <View>
        <Qrcode
          text={id}
          url={`https://www.chqheiyou.com/qrcode/check?id=${id}`}
        />
        <View className={styles['voucher-tip']}>请到店内消费</View>
        <View className={styles['voucher-body']}>
          <Space direction='vertical' size={15}>
            <View className={styles['voucher-title']}>消费红包使用规则</View>
            <View>1. 本优惠券仅限到店使用</View>
            <View>2. 本优惠券仅限本人到使用</View>
            <View>3. 本优惠券不与店铺其他活动同享</View>
            <View>4. 本优惠券仅限到店消费结算抵扣使用</View>
            <View>5. 本优惠券最终解释权归本店所有</View>
          </Space>
        </View>
      </View>
    </LoginLayout>
  );
};
export default Index;
