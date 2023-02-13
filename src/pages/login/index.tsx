import React, { useMemo } from 'react';
import { View, showToast, login, getUserInfo } from 'remax/wechat';
import { Button, Icon } from 'anna-remax-ui';
import userInfo from '@/stores/userInfo';
import { bindPhone } from '@/apis/auth';
import apis from '@/apis';

const style: React.CSSProperties = {
  position: 'fixed',
  display: 'flex',
  height: '100%',
  padding: '30rpx',
  width: '100%',
  left: 0,
  top: 0,
  paddingTop: '100rpx',
  flexDirection: 'column',
  justifyContent: 'space-around',
  alignItems: 'center',
};

const Index = () => {
  const { getUserInfo: getUser } = userInfo.useContainer();
  return (
    <View style={style}>
      <View style={{ textAlign: 'center' }}>
        <Icon type='discover' size='100' color='#07C160' />
        <View style={{ paddingTop: '30rpx' }}>
          申请获得您的头像、微信名字、以及手机号进行一键登录
        </View>
      </View>
      <Button
        look='secure'
        size='large'
        block
        open-type='getPhoneNumber'
        wechat-bindgetphonenumber={(e: any) => {
          console.log(e);
          bindPhone({ code: e?.detail?.code })
            .then((mobile) => {
              login({
                success(data: any) {
                  if (data.code) {
                    getUserInfo({
                      //获取用户微信信息
                      success: (res) => {
                        if (res.encryptedData && res.iv) {
                          console.log(res);
                          apis
                            .login({
                              mobile,
                              code: data.code,
                              avatarurl: res.userInfo.avatarUrl,
                              nickname: res.userInfo.nickName,
                            })
                            .then((res) => {
                              getUser();
                              return res;
                            });
                        }
                      },
                    });
                  }
                },
              });
            })
            .catch(() => {
              showToast({
                title: '手机号获取失败',
              });
            });
        }}>
        微信一键登录
      </Button>
    </View>
  );
};

export default Index;
