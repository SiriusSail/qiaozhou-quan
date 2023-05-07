import React, { useState, useRef, useEffect, useCallback } from 'react';
import { View, navigateTo, createSelectorQuery } from 'remax/wechat';
import styles from './index.less';
import Image from '@/components/image';
import Block from '@/components/block';
import userInfoStores from '@/stores/userInfo';
import { Tag, Row, Col, Icon, Popup, Space } from 'anna-remax-ui';
import UserCard from '@/components/userCard';
import { usePageEvent } from 'remax/macro';
import Painter from '@/components/painter';

type TagItemProps = {
  onTap?: () => void;
  text?: React.ReactNode;
  image?: string;
  icon?: string;
  iconColor?: string;
  access?: string;
};

const TagItem: React.FC<TagItemProps> = ({
  text,
  icon,
  access,
  image,
  onTap,
  iconColor = '#666',
}) => {
  const { menuList } = userInfoStores.useContainer();
  if (access && !menuList?.find((item) => item.id === access)) return <></>;
  return (
    <Col span={6}>
      <View onTap={onTap}>
        <View className={styles['tag-image']}>
          {icon ? (
            <Icon type={icon} size='60rpx' color={iconColor} />
          ) : (
            <Image height='100rpx' width='100rpx' src={image} />
          )}
        </View>
        <View className={styles['body-text']}>{text}</View>
      </View>
    </Col>
  );
};

const Friend = () => {
  const { userInfo, valiLoading } = userInfoStores.useContainer();
  const [voucher, setVoucher] = useState(false);
  return (
    <>
      <TagItem
        icon='friend'
        text='邀新奖励'
        iconColor='#03c9e8'
        onTap={() => valiLoading() && setVoucher(true)}
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
  const { userInfo, getUserInfo, isVip, isMerchant, valiLoading } =
    userInfoStores.useContainer();
  usePageEvent('onShow', () => {
    getUserInfo();
  });
  // 点击成为商家
  const handleMechart = () => {
    if (valiLoading()) {
      navigateTo({
        url: '/pages/shopPages/shopApply/index',
      });
    }
  };
  return (
    <View className={styles.my}>
      <UserCard />
      {isVip || (
        <View
          className={styles.title}
          onTap={() =>
            navigateTo({
              url: '/pages/vips/index',
            })
          }>
          <View>开通会员获，获得更多惊喜权益</View>
          <Tag color='yellow'>开通会员</Tag>
        </View>
      )}
      <View className={styles.body}>
        <Block title='我的账户'>
          <Row gutter={16}>
            <TagItem
              iconColor='#41de87'
              onTap={() =>
                navigateTo({
                  url: '/pages/userInfo/index',
                })
              }
              icon='vipcard'
              text='个人认证'
            />
            <TagItem
              iconColor='#e91e63'
              onTap={() =>
                navigateTo({
                  url: '/pages/vips/index',
                })
              }
              icon='vip'
              text='会员中心'
            />
            <TagItem
              iconColor='#e91e63'
              onTap={() =>
                navigateTo({
                  url: '/pages/bag/index',
                })
              }
              icon='redpacket'
              text='我的红包'
            />
          </Row>
        </Block>
        <Block title='商家服务'>
          <Space direction='vertical' size={32}>
            <Row gutter={16}>
              {isMerchant ? (
                <>
                  <TagItem
                    iconColor='#e65656'
                    icon='form'
                    access='5000'
                    text='店铺信息'
                    onTap={() =>
                      navigateTo({
                        url: '/pages/shopPages/shopInfo/index',
                      })
                    }
                  />
                </>
              ) : (
                <TagItem
                  iconColor='#e65656'
                  icon='shop'
                  text='商家入驻'
                  onTap={handleMechart}
                />
              )}

              {isMerchant ? (
                <>
                  <TagItem
                    iconColor='#e65656'
                    icon='shop'
                    text='进入店铺'
                    onTap={() =>
                      navigateTo({
                        url: `/pages/shop/index?id=${userInfo?.merchantId}`,
                      })
                    }
                  />
                  <TagItem
                    iconColor='#e65656'
                    text='活动管理'
                    access='2000'
                    icon='activity'
                    onTap={() =>
                      navigateTo({
                        url: '/pages/activityPages/activitySetting/index',
                      })
                    }
                  />
                  <TagItem
                    iconColor='#e65656'
                    text='核销优惠券'
                    access='3000'
                    icon='ticket'
                    onTap={() =>
                      navigateTo({
                        url: '/pages/check/index',
                      })
                    }
                  />
                </>
              ) : (
                <View />
              )}
            </Row>
            {isMerchant ? (
              <Row gutter={16}>
                <>
                  <TagItem
                    iconColor='#e65656'
                    icon='profile'
                    text='员工管理'
                    access='4000'
                    onTap={() =>
                      navigateTo({
                        url: `/pages/shopPages/staff/index`,
                      })
                    }
                  />
                  <TagItem
                    iconColor='#e65656'
                    icon='sort'
                    text='商品管理'
                    // access='4000'
                    onTap={() =>
                      navigateTo({
                        url: `/pages/productPages/productList/index`,
                      })
                    }
                  />
                  <TagItem
                    iconColor='#e65656'
                    icon='text'
                    text='店铺订单'
                    // access='4000'
                    onTap={() =>
                      navigateTo({
                        url: `/pages/shopPages/shopOrder/index`,
                      })
                    }
                  />
                </>
              </Row>
            ) : undefined}
          </Space>
        </Block>
        <Block title='其他服务'>
          <Row gutter={16}>
            <TagItem
              iconColor='#fa8c16'
              icon='settings'
              text='设置'
              onTap={() =>
                navigateTo({
                  url: '/pages/setting/index',
                })
              }
            />
            <Friend />
          </Row>
        </Block>
      </View>
    </View>
  );
};
export default Index;
