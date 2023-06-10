import React, { useRef } from 'react';
import {
  View,
  navigateTo,
  getMenuButtonBoundingClientRect,
} from 'remax/wechat';
import styles from './index.less';
import userInfoStores from '@/stores/userInfo';
import IconFont from '@/components/iconfont';
import avatarSrc from './images/avatar.jpg';
import dayjs from 'dayjs';
import BackImage from '@/components/backImage';

const Index: React.FC<{ showSetting?: boolean }> = ({ showSetting = true }) => {
  const { userInfo, isVip } = userInfoStores.useContainer();
  const menuOption = useRef(getMenuButtonBoundingClientRect());
  return (
    <View className={styles.info}>
      {showSetting && (
        <View
          className={styles.icon}
          style={{ top: menuOption.current.top * 2 + 'rpx' }}
          onTap={() =>
            navigateTo({
              url: '/pages/myPages/setting/index',
            })
          }>
          <IconFont name='qz-shezhi' size={37} color='#797979' />
        </View>
      )}
      <View className={styles.body}>
        <View
          className={styles.avatar}
          onTap={() =>
            navigateTo({
              url: '/pages/userInfo/index',
            })
          }>
          <BackImage
            preview={false}
            height='110rpx'
            width='110rpx'
            style={{ overflow: 'hidden', borderRadius: '50%' }}
            src={userInfo?.avatarurl || avatarSrc}
          />
          {isVip && (
            <View className={styles['huiyuan-icon']}>
              <IconFont name='qz-huiyuan2' size={26} color='#AE8421' />
            </View>
          )}
        </View>
        <View className={styles.content}>
          <View className={styles.name}>
            {!userInfo?.userNo ? (
              '请登录或注册您的账号'
            ) : (
              <View
                onTap={() =>
                  navigateTo({
                    url: '/pages/userInfo/index',
                  })
                }>
                {userInfo?.nickname === '微信用户'
                  ? userInfo?.userNo
                  : userInfo?.nickname}
              </View>
            )}
          </View>
          {userInfo?.memberEndTime && isVip && (
            <View
              className={styles.vip}
              onTap={() =>
                navigateTo({
                  url: '/pages/myPages/vips/index',
                })
              }>
              <View></View>
              <View>
                {'会员有效期至: ' +
                  dayjs(userInfo.memberEndTime).format('YYYY-MM-DD')}
              </View>
            </View>
          )}
        </View>
      </View>
    </View>
  );
};
export default Index;
