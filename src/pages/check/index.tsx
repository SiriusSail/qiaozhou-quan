import React, { useState } from 'react';
import { View, redirectTo } from 'remax/one';
import { useQuery } from 'remax';
import { Result, Button, SearchBar } from 'anna-remax-ui';
import { useRequest } from 'ahooks';
import { coupon } from '@/apis/usercoupon';
import userInfoStores from '@/stores/userInfo';
import LoginLayout from '@/layout/loginLayout';

const Index: React.SFC = () => {
  const { id } = useQuery();
  const [couponNo, setCouponNo] = useState(id);
  const [data, setData] = useState<API.PropsType>();
  console.log(id);
  const { userInfo, getUserInfo, isVip } = userInfoStores.useContainer();

  const { loading, run } = useRequest(
    () =>
      coupon({
        userId: userInfo?.id,
        couponNo,
      }),
    {
      manual: !userInfo?.id,
      refreshDeps: [userInfo?.id],
      onError: (e) => {
        setData(e as any as API.PropsType);
      },
      onSuccess: (e) => {
        console.log(e, 22222);
      },
    }
  );
  console.log(data);
  return (
    <LoginLayout>
      <Result
        height='1000px'
        status={data?.success ? 'success' : 'error'}
        title={
          loading
            ? '正在核销'
            : data?.success
            ? '核销成功'
            : data?.message || '核销失败'
        }
        icon={
          loading
            ? {
                name: 'loading',
                color: '#fa8c16',
              }
            : undefined
        }
        subTitle={`核销优惠卷：${id}`}
        extra={
          <View>
            {data?.success || loading ? (
              <Button
                onTap={() =>
                  redirectTo({
                    url: '/pages/index/index',
                  })
                }>
                回到首页
              </Button>
            ) : (
              <View>
                <SearchBar
                  placeholder='手动核销'
                  actionName='核销'
                  value={couponNo}
                  onInput={(v: any) => setCouponNo(v)}
                  onClear={() => setCouponNo('')}
                  onActionClick={() => run()}
                />
              </View>
            )}
          </View>
        }
      />
    </LoginLayout>
  );
};

export default Index;
