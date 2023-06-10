import React, { useState, useRef, useCallback } from 'react';
import {
  View,
  switchTab,
  navigateTo,
  scanCode,
  showModal,
  // openSetting,
  // getSetting,
} from 'remax/wechat';
import { useQuery } from 'remax';
import { Result, Button, Input, Icon, Space } from 'anna-remax-ui';
import { useRequest } from 'ahooks';
import { coupon } from '@/apis/usercoupon';
import userInfoStores from '@/stores/userInfo';
import styles from './index.less';
import LoginLayout from '@/layout/loginLayout';
import { usePageEvent } from 'remax/macro';

const Index: React.SFC = () => {
  const { id } = useQuery();
  const couponNoRef = useRef(id);
  const [data, setData] = useState<API.PropsType>();
  const { userInfo } = userInfoStores.useContainer();

  const { loading, run } = useRequest(
    () => {
      if (!couponNoRef.current) return Promise.resolve(undefined);
      // return {
      //   data: '',
      //   success: true,
      // };
      return coupon({
        userId: userInfo?.id,
        couponNo: couponNoRef.current,
      }).then((res) => {
        console.log(res);
        return {
          data: res,
          success: true,
        };
      });
    },
    {
      manual: !userInfo?.id || !couponNoRef.current,
      refreshDeps: [userInfo?.id],
      onError: (e) => {
        setData(e as any as API.PropsType);
        if (e?.code === '401') {
          navigateTo({
            url: '/pages/login/index',
          });
        }
      },
      onSuccess: (e) => {
        setData(e as any as API.PropsType);
      },
    }
  );

  usePageEvent('onShow', () => {
    if (data?.code === 401 && couponNoRef.current) {
      run();
    }
  });

  const openCamera = useCallback(() => {
    scanCode({
      scanType: ['qrCode'],
      success: (res) => {
        if (res.result.includes('/qrcode/check')) {
          const [, id] = res.result.split('id=');
          couponNoRef.current = id;
          run();
        } else {
          showModal({
            title: '提示',
            content: '二维码信息错误',
            showCancel: false,
          });
        }
      },
    });
  }, [run]);

  console.log(data);
  return (
    <LoginLayout>
      <Result
        height='1000px'
        status={data?.success ? 'success' : 'error'}
        title={couponNoRef.current && (loading ? '正在核销' : data?.message)}
        icon={
          !couponNoRef.current ? (
            <View />
          ) : loading ? (
            {
              name: 'loading',
              color: '#E8813E',
            }
          ) : undefined
        }
        subTitle={
          couponNoRef.current ? `核销优惠卷：${couponNoRef.current}` : undefined
        }
        extra={
          <View>
            {data?.success || loading ? (
              <Space>
                <Button
                  onTap={() =>
                    switchTab({
                      url: `/pages/index/index`,
                    })
                  }>
                  回到首页
                </Button>
                <Button
                  type='primary'
                  onTap={() => {
                    couponNoRef.current = '';
                    setData(undefined);
                  }}>
                  继续核销
                </Button>
              </Space>
            ) : (
              <View className={styles.content}>
                <Space>
                  <Button
                    style={{ padding: '0' }}
                    ghost
                    onTap={() => {
                      openCamera();
                      // getSetting({
                      //   success: (res) => {
                      //     if (res.authSetting['scope.camera']) {
                      //       openCamera();
                      //     } else {
                      //       openSetting({
                      //         success: (res) => {
                      //           if (res.authSetting['scope.camera']) {
                      //             openCamera();
                      //           } else {
                      //             showModal({
                      //               title: '提示',
                      //               content: '摄像头权限获取失败',
                      //               confirmText: '去充值',
                      //               showCancel: false,
                      //             });
                      //           }
                      //         },
                      //       });
                      //     }
                      //   },
                      // });
                    }}>
                    <Icon type='scan' size='40' />
                  </Button>
                  <Input
                    className={styles.input}
                    placeholder='请输入优惠卷码'
                    border={false}
                    value={couponNoRef.current}
                    onChange={(v: any) => {
                      console.log(v);
                      couponNoRef.current = v.target.value;
                    }}
                    extra={
                      <Button onTap={run} type='primary' size='small'>
                        核销
                      </Button>
                    }
                  />
                </Space>
              </View>
            )}
          </View>
        }
      />
    </LoginLayout>
  );
};

export default Index;
