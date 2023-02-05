import React from 'react';
import { View, navigateTo } from 'remax/wechat';
import styles from './index.less';
import Image from '@/components/image';
import Block from '@/components/block';
import userInfoStores from '@/stores/userInfo';
import { Card, Tag, Row, Col, Icon } from 'anna-remax-ui';
import IconFont from '@/components/iconfont';

type TagItemProps = {
  onTap?: () => void;
  text?: React.ReactNode;
  image?: string;
  icon?: string;
};

const TagItem: React.FC<TagItemProps> = ({
  text,
  icon,
  image = '/images/test/123.jpg',
  onTap,
}) => {
  return (
    <Col span={6}>
      <View onTap={onTap}>
        <View className={styles['tag-image']}>
          {icon ? (
            <Icon type={icon} size='60rpx' color='#666' />
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
  const { userInfo } = userInfoStores.useContainer();
  return (
    <View className={styles.my}>
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
              <View>
                {userInfo ? (
                  <IconFont size={60} color='red' name='qz-tipvip' />
                ) : (
                  <Tag color='#000000'>点击登录/注册</Tag>
                )}
              </View>
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
      <View className={styles.title}>
        <View>开通会员获，获得更多惊喜权益</View>
        <Tag color='yellow'>开通会员</Tag>
      </View>
      <View className={styles.body}>
        <Block title='我的账户'>
          <Row gutter={16}>
            <TagItem
              onTap={() =>
                navigateTo({
                  url: '/pages/userInfo/index',
                })
              }
              icon='vipcard'
              text='个人认证'
            />
            <TagItem
              onTap={() =>
                navigateTo({
                  url: '/pages/activitySetting/index',
                })
              }
              icon='vip'
              text='会员中心'
            />
          </Row>
        </Block>
        <Block title='商家服务'>
          <Row gutter={16}>
            <TagItem
              text='添加活动'
              icon='activity'
              onTap={() =>
                navigateTo({
                  url: '/pages/activitySetting/index',
                })
              }
            />
            {userInfo?.roleName === '商家' ? (
              <TagItem
                icon='shop'
                text='商家信息'
                onTap={() =>
                  navigateTo({
                    url: '/pages/shopInfo/index',
                  })
                }
              />
            ) : (
              <TagItem
                icon='shop'
                text='成为商家'
                onTap={() =>
                  navigateTo({
                    url: '/pages/shopApply/index',
                  })
                }
              />
            )}
          </Row>
        </Block>
        <Block title='其他服务'>
          <Row gutter={16}>
            <TagItem
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
