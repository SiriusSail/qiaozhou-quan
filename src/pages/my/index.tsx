import React, { useState, useCallback } from 'react';
import {
  View,
  navigateTo,
  getSetting,
  openSetting,
  requestSubscribeMessage,
  showModal,
  Button,
} from 'remax/wechat';
import styles from './index.less';
import Image from '@/components/image';
import userInfoStores from '@/stores/userInfo';
import { Popup } from 'anna-remax-ui';
import UserCard from '@/components/userCard';
import { usePageEvent } from 'remax/macro';
import Painter from '@/components/painter';
import Iconfont from '@/components/iconfont';
import Shadow from '@/components/shadow';

type TagItemProps = {
  onTap?: () => void;
  text?: React.ReactNode;
  image?: string;
  size?: number;
  icon?: string;
  disable?: boolean;
  iconColor?: string;
  access?: string;
};

const TagItem: React.FC<TagItemProps> = ({
  text,
  icon,
  access,
  image,
  size = 60,
  disable,
  onTap,
  iconColor = '#666',
}) => {
  const { menuList } = userInfoStores.useContainer();
  if (access && !menuList?.find((item) => item.id === access)) return <></>;
  return (
    <View className={styles.item}>
      <View className={styles['item-content']}>
        <View
          onTap={(e) => {
            if (disable) {
              return;
            }
            onTap?.(e);
          }}>
          <View className={styles['tag-image']}>
            {icon ? (
              <Iconfont
                name={icon as any}
                size={size}
                color={disable ? '#797979' : iconColor}
              />
            ) : (
              <Image height='100rpx' width='100rpx' src={image} />
            )}
          </View>
          <View className={styles['body-text']}>{text}</View>
        </View>
      </View>
    </View>
  );
};

const Friend = () => {
  const { userInfo, valiLogin } = userInfoStores.useContainer();
  const [voucher, setVoucher] = useState(false);
  return (
    <>
      <TagItem
        icon='qz-yaoqingjiangli'
        text='邀新奖励'
        iconColor='#03c9e8'
        onTap={() => valiLogin() && setVoucher(true)}
      />
      <Popup
        closeable={false}
        style={{ background: 'transparent' }}
        open={voucher}
        onClose={async () => {
          setVoucher(false);
        }}>
        <View id='friend' className={styles['friend-content']}>
          <Painter
            show={voucher}
            imgDraw={{
              height: '960rpx',
              width: '540rpx',
              background:
                'https://www.chqheiyou.com/uploads/f540cb87cd9844d2b5fc2b4e7139cdd9.jpg',
              views: [
                {
                  type: 'qrcode',
                  content: `https://www.chqheiyou.com/qrcode/index?invitationCode=${userInfo?.invitationCode}`,
                  css: {
                    width: '190rpx',
                    height: '190rpx',
                    left: '175rpx',
                    top: '383rpx',
                  },
                },
              ],
            }}
          />
        </View>
      </Popup>
    </>
  );
};

const Index = () => {
  const { userInfo, getUserInfo, isVip, isMerchant, valiLogin } =
    userInfoStores.useContainer();
  usePageEvent('onShow', () => {
    getUserInfo();
  });
  // 点击成为商家
  const handleMechart = () => {
    if (valiLogin()) {
      navigateTo({
        url: '/pages/shopPages/shopApply/index',
      });
    }
  };

  const subscribeMessage = useCallback(() => {
    requestSubscribeMessage({
      tmplIds: ['ty2IsUqnNeCCFhVBSp-eMb7XxEZutIGYw-sFYKcHjTw'],
      async success(e) {
        if (e['ty2IsUqnNeCCFhVBSp-eMb7XxEZutIGYw-sFYKcHjTw'] === 'reject') {
          showModal({
            title: '提示',
            content: '您需要允许消息通知才能及时获得用户下单信息',
            cancelText: '不接收',
            confirmColor: '#ff4d4f',
            confirmText: '重试',
            success: (e) => {
              if (!e.confirm) {
                navigateTo({
                  url: `/pages/productPages/productList/index`,
                });
              }
            },
          });
          return;
        }
        navigateTo({
          url: `/pages/productPages/productList/index`,
        });
      },
    });
  }, []);
  return (
    <View
      className={styles.my}
      style={{
        backgroundImage:
          'url(https://www.chqheiyou.com/uploads/198d822acf73422f803290b7b405f00e.png)',
      }}>
      <View style={{ overflowY: 'auto', overflowX: 'hidden' }}>
        <UserCard />
        {isVip || (
          <View
            className={styles.vip}
            onTap={() =>
              navigateTo({
                url: '/pages/myPages/vips/index',
              })
            }>
            <View className={styles['vip-left']}>
              <Iconfont name='qz-huiyuan2' color='#D8C8C3' />
              <View>会员</View>
            </View>
            <View className={styles['vip-center']}>
              开通会员，获取更多惊喜权益
            </View>
            <View className={styles['vip-right']}>
              <Button
                style={{
                  padding: 0,
                  background: '#EAD1A1',
                  color: '#5D450C',
                  width: '166rpx',
                  height: '56rpx',
                  lineHeight: '56rpx',
                  borderRadius: '28rpx',
                }}>
                立即开通
              </Button>
            </View>
          </View>
        )}
        <View className={styles.body}>
          <View className={styles.title}>我的服务</View>
          <Shadow addstyle='padding: 10rpx 0'>
            <View className={styles.row}>
              <TagItem
                iconColor='#E8813E'
                onTap={() =>
                  navigateTo({
                    url: '/pages/myPages/vips/index',
                  })
                }
                icon='qz-huiyuan3'
                text='会员中心'
              />
              <TagItem
                iconColor='#F65C60'
                size={50}
                onTap={() =>
                  navigateTo({
                    url: '/pages/bag/index',
                  })
                }
                icon='qz-gerenzhongxin-hongbao'
                text='我的红包'
              />
              <TagItem
                iconColor='#EAD1A1'
                size={50}
                onTap={() =>
                  navigateTo({
                    url: '/pages/shopPages/shopInteractive/index',
                  })
                }
                icon='qz-dianpu1'
                text='商家动态'
              />
              {!isMerchant && (
                <TagItem
                  iconColor='#F65C60'
                  onTap={handleMechart}
                  icon='qz-jiamengguanli'
                  text='商家入驻'
                />
              )}
            </View>
          </Shadow>
          <Shadow addstyle='padding: 20rpx 0'>
            <View className={styles.row}>
              <TagItem
                iconColor='#F65C60'
                disable={!isMerchant}
                onTap={() =>
                  navigateTo({
                    url: '/pages/shopPages/shopOrder/index',
                  })
                }
                icon='qz-dingdan2'
                text='店铺订单'
              />
              <TagItem
                iconColor='#F65C60'
                disable={!isMerchant}
                onTap={() =>
                  navigateTo({
                    url: '/pages/check/index',
                  })
                }
                icon='qz-youhuiquan'
                text='核销优惠券'
              />
              <TagItem
                iconColor='#F65C60'
                disable={!isMerchant}
                onTap={() =>
                  navigateTo({
                    url: '/pages/shopPages/shopInfo/index',
                  })
                }
                icon='qz-shangdian'
                text='店铺管理'
              />
              <TagItem
                iconColor='#E8813E'
                disable={!isMerchant}
                onTap={() =>
                  navigateTo({
                    url: '/pages/activityPages/activitySetting/index',
                  })
                }
                icon='qz-huodongguanli'
                text='活动管理'
              />

              <TagItem
                iconColor='#E8813E'
                disable={!isMerchant}
                onTap={() =>
                  navigateTo({
                    url: `/pages/shopPages/staff/index`,
                  })
                }
                icon='qz-yuangongguanli'
                text='员工管理'
              />
              <TagItem
                iconColor='#E8813E'
                disable={!isMerchant}
                onTap={() => {
                  getSetting({
                    withSubscriptions: true,
                    success(res) {
                      if (res.subscriptionsSetting.mainSwitch) {
                        // 用户打开了订阅消息总开关
                        console.log(
                          res,
                          res.subscriptionsSetting.itemSettings,
                          'res.subscriptionsSetting.itemSettings'
                        );
                        if (res.subscriptionsSetting.itemSettings) {
                          // 用户同意总是保持是否推送消息的选择, 这里表示以后不会再拉起推送消息的授权
                          const moIdState =
                            res.subscriptionsSetting.itemSettings[
                              'ty2IsUqnNeCCFhVBSp-eMb7XxEZutIGYw-sFYKcHjTw'
                            ]; // 用户同意的消息模板id
                          if (moIdState === 'reject') {
                            console.log('拒绝了消息推送');
                            subscribeMessage();
                            return;
                          }
                          navigateTo({
                            url: `/pages/productPages/productList/index`,
                          });
                        } else {
                          subscribeMessage();
                        }
                      } else {
                        openSetting({
                          withSubscriptions: true,
                        });
                      }
                    },
                    fail: (err) => {
                      console.log(err.errMsg);
                    },
                  });
                }}
                icon='qz-shangpin'
                text='商品管理'
              />
              <TagItem
                iconColor='#E8813E'
                disable={!isMerchant}
                onTap={() =>
                  navigateTo({
                    url: '/pages/shopPages/shopRecruit/index',
                  })
                }
                icon='qz-gongzuozhengrenzheng'
                text='发布招聘'
              />
              <TagItem
                iconColor='#E8813E'
                disable={!isMerchant}
                onTap={() =>
                  navigateTo({
                    // url: '/pages/shopPages/shopRelease/index',
                    url: '/pages/shopPages/myReleaseList/index',
                  })
                }
                icon='qz-fabu'
                text='店铺动态'
              />
            </View>
          </Shadow>
          <Shadow addstyle='padding: 20rpx 0'>
            <View className={styles.row}>
              <Friend />
            </View>
          </Shadow>
        </View>
      </View>
    </View>
  );
};
export default Index;
