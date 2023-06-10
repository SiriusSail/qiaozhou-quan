import React, { useState, useRef, useEffect, useCallback } from 'react';
import { View, navigateTo, createSelectorQuery } from 'remax/wechat';
import styles from './index.less';
import Image from '@/components/image';
import Block from '@/components/block';
import userInfoStores from '@/stores/userInfo';
import { Tag, Row, Col, Icon, Popup, Space } from 'anna-remax-ui';
import UserCard from '@/components/userCard';
import { usePageEvent } from 'remax/macro';
import BackImage from '@/components/backImage';
import Qrcode from '@/components/qrcode';
import Currency from 'currency.js';

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
  // 二维码大小
  const sizeRef = useRef<string>();
  // 位置
  const fixed = useRef({
    left: '',
    top: '',
  });
  const updateSize = useCallback(() => {
    return new Promise((reslove, reject) => {
      const query = createSelectorQuery();
      // 调整图片位置修改 这个参数就好
      const sizePower = 0.6;
      // left 自适应
      // 顶部百分比位置
      const topPower = 0.2;

      query
        .select('#friend')
        .boundingClientRect(function (rect) {
          const width = new Currency(rect.width, {
            precision: 0,
            symbol: '',
          }).multiply(2);
          const size = width.multiply(sizePower).format();
          const left = width.subtract(size).divide(2).format();
          const top = width.multiply(topPower).format();
          sizeRef.current = new Currency(size, {
            precision: 0,
            symbol: '',
          })
            .subtract(40)
            .format();
          fixed.current = {
            left,
            top,
          };
          reslove();
        })
        .exec();
    });
  }, []);
  useEffect(() => {
    updateSize();
  }, [updateSize]);
  console.log(sizeRef.current);
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
          await updateSize();
          console.log(sizeRef.current, voucher);
          setVoucher(false);
        }}>
        <View id='friend' className={styles['friend-content']}>
          <BackImage
            src='https://www.chqheiyou.com/uploads/9a665cbfb7194279b88c2dbd956ccc7f.jpg'
            width='50vh'
            height='80vh'
            preview={false}
          />
          <View
            className={styles.qrcode}
            style={{
              width: sizeRef.current + 'rpx',
              height: sizeRef.current + 'rpx',
              top: fixed.current.top + 'rpx',
              left: fixed.current.left + 'rpx',
            }}>
            {voucher && (
              <Qrcode
                url={`https://www.chqheiyou.com/qrcode/index?invitationCode=${userInfo?.invitationCode}`}
                logoSize={parseInt(sizeRef.current || '')}
                height={parseInt(sizeRef.current || '')}
                width={parseInt(sizeRef.current || '')}
              />
            )}
          </View>
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
              url: '/pages/myPages/vips/index',
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
                  url: '/pages/myPages/vips/index',
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
              icon='ticketMoney'
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
                        url: `/pages/shopPages/staff/index`,
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
              iconColor='#E8813E'
              icon='settings'
              text='设置'
              onTap={() =>
                navigateTo({
                  url: '/pages/myPages/setting/index',
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
