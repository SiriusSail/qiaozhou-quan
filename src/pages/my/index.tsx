import React from 'react';
import { View, navigateTo, showModal } from 'remax/wechat';
import styles from './index.less';
import Image from '@/components/image';
import Block from '@/components/block';
import userInfoStores from '@/stores/userInfo';
import { Tag, Row, Col, Icon } from 'anna-remax-ui';
import UserCard from '@/components/userCard';
import { usePageEvent } from 'remax/macro';

type TagItemProps = {
  onTap?: () => void;
  text?: React.ReactNode;
  image?: string;
  icon?: string;
  iconColor?: string;
};

const TagItem: React.FC<TagItemProps> = ({
  text,
  icon,
  image,
  onTap,
  iconColor = '#666',
}) => {
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

const Index = () => {
  const { userInfo, getUserInfo, isVip, merchant, valiVip } =
    userInfoStores.useContainer();
  usePageEvent('onShow', getUserInfo);
  // 点击成为商家
  const handleMechart = () => {
    if (valiVip({ content: '您未成为会员，需开通才能成为商家' })) {
      navigateTo({
        url: '/pages/shopApply/index',
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
          </Row>
        </Block>
        <Block title='商家服务'>
          <Row gutter={16}>
            {userInfo?.roleName === '商家' ? (
              <>
                <TagItem
                  iconColor='#e65656'
                  icon='form'
                  text='商家信息'
                  onTap={() =>
                    navigateTo({
                      url: '/pages/shopInfo/index',
                    })
                  }
                />
                <TagItem
                  iconColor='#e65656'
                  icon='shop'
                  text='我的店铺'
                  onTap={() =>
                    navigateTo({
                      url: `/pages/shop/index?id=${userInfo?.merchantId}`,
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

            {merchant?.examine === 1 ? (
              <TagItem
                iconColor='#e65656'
                text='添加活动'
                icon='activity'
                onTap={() =>
                  navigateTo({
                    url: '/pages/activitySetting/index',
                  })
                }
              />
            ) : (
              <View />
            )}
          </Row>
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
          </Row>
        </Block>
      </View>
    </View>
  );
};
export default Index;
