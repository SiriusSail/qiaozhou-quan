import React, { useMemo } from 'react';
import { View, getUserProfile, login, getUserInfo } from 'remax/wechat';
import { Button } from 'anna-remax-ui';
import userInfo from '@/stores/userInfo';
import apis from '@/apis';

const Index = () => {
  const { getUserInfo: getUser } = userInfo.useContainer();
  return (
    <View>
      <Button
        look='secure'
        open-type='getPhoneNumber'
        wechat-bindgetphonenumber={(e) => {
          // getPhoneNumber (e) {
          console.log(e);
          // }
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
                          mobile: '17353134974',
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
        }}>
        微信一键登录
      </Button>
    </View>
  );
};

export default Index;
