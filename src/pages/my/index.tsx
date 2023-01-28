import React from 'react';
import { View, navigateTo } from 'remax/wechat';
import styles from './index.less';
import Image from '@/components/image';
import Block from '@/components/block';
import { Card, Tag, Row, Col } from 'anna-remax-ui';

type TagItemProps = {
  onTap?: () => void;
  text?: React.ReactNode;
  image?: string | React.ReactNode;
};

const TagItem: React.FC<TagItemProps> = ({
  text,
  image = '/images/test/123.jpg',
  onTap,
}) => {
  return (
    <Col span={6}>
      <View onTap={onTap}>
        <View className={styles['tag-image']}>
          {typeof image === 'string' ? (
            <Image height='100rpx' width='100rpx' src={image} />
          ) : (
            image
          )}
        </View>
        <View className={styles['body-text']}>{text}</View>
      </View>
    </Col>
  );
};

const Index = () => {
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
          title='淡彩'
          description={
            <View className={styles['info-title']}>
              <View>
                <Tag color='#000000'>VPI</Tag>
              </View>
              <View>花边-蕾丝花边-睫毛花边</View>
            </View>
          }
          cover={
            <Image
              height='160rpx'
              width='160rpx'
              style={{ overflow: 'hidden', borderRadius: '50%' }}
              src='/images/test/123.jpg'
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
            <TagItem text='个人中心' />
            <TagItem text='个人中心' />
            <TagItem text='个人中心' />
          </Row>
        </Block>
        <Block title='商家服务'>
          <Row gutter={16}>
            <TagItem
              text='活动管理'
              onTap={() =>
                navigateTo({
                  url: '/pages/activity/index',
                })
              }
            />
            <TagItem text='个人中心' />
          </Row>
        </Block>
        <Block title='其他服务'>
          <Row gutter={16}>
            <TagItem
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
