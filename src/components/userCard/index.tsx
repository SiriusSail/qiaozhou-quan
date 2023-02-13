import React from 'react';
import { View, navigateTo } from 'remax/wechat';
import styles from './index.less';
import Image from '@/components/image';
import userInfoStores from '@/stores/userInfo';
import { Card, Tag, Space } from 'anna-remax-ui';
import IconFont from '@/components/iconfont';
import dayjs from 'dayjs';

const Index = () => {
  const { userInfo, isVip } = userInfoStores.useContainer();

  return (
    <View className={styles.info}>
      <Card
        style={{
          backgroundColor: '#ffe7a3',
          padding: '30rpx 30rpx 10rpx',
          borderBottomRightRadius: 0,
          borderBottomLeftRadius: 0,
        }}
        title={userInfo?.nickname || '请登录或注册您的账号'}
        description={
          <View className={styles['info-title']}>
            <Space>
              <View>
                {userInfo ? (
                  <IconFont
                    size={60}
                    color={isVip ? 'red' : '#ccc'}
                    name='qz-tipvip'
                  />
                ) : (
                  <Tag
                    color='#000000'
                    onTap={() => {
                      navigateTo({
                        url: '/pages/login/index',
                      });
                    }}>
                    点击登录/注册
                  </Tag>
                )}
              </View>
              {userInfo?.memberEndTime && isVip && (
                <View>
                  {'有效期至: ' +
                    dayjs(userInfo.memberEndTime).format('YYYY-MM-DD')}
                </View>
              )}
            </Space>
            <View className={styles['info-browse']}>暂时没什么可以看</View>
          </View>
        }
        cover={
          <Image
            height='160rpx'
            width='160rpx'
            style={{ overflow: 'hidden', borderRadius: '50%' }}
            src={userInfo?.avatarurl || '/images/test/nouser.jpg'}
          />
        }
        direction='horizontal'
      />
    </View>
  );
};
export default Index;
