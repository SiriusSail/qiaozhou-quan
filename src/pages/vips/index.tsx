import React, { useState, useRef } from 'react';
import {
  View,
  navigateTo,
  requestPayment,
  showModal,
  showToast,
} from 'remax/wechat';
import styles from './index.less';
import Image from '@/components/image';
import Block from '@/components/block';
import userInfoStores from '@/stores/userInfo';
import { Row, Col, Grid, Button, Icon } from 'anna-remax-ui';
import { pay } from '@/apis/payment';
import Amount from '@/components/amount';
import UserCard from '@/components/userCard';
import Agreement from '@/components/agreement';
import LoginLayout from '@/layout/loginLayout';
import { usePageEvent } from 'remax/macro';
import { useRequest } from 'ahooks';
import classnames from 'classnames';

type CardProps = {
  title: string;
  amount: string;
  text: string;
  isHover?: string;
  onTap?: (amount: string) => void;
  params?: any;
};

type TagItemProps = {
  onTap?: () => void;
  text?: React.ReactNode;
  title?: string;
  icon?: string;
};

const TagItem: React.FC<TagItemProps> = ({ text, icon, title, onTap }) => {
  return (
    <Col span={8}>
      <View onTap={onTap}>
        <View className={styles['tag-image']}>
          <Icon type={icon} size='60rpx' color='#f9d46c' />
        </View>
        <View className={styles['body-title']}>{title}</View>
        <View className={styles['body-text']}>{text}</View>
      </View>
    </Col>
  );
};
const Item = ({ onTap, title, amount, text, isHover }: CardProps) => {
  return (
    <View
      className={classnames(styles.card, {
        'card-hover': isHover,
      })}>
      <View onTap={() => onTap?.(amount)}>
        <View className={styles['card-title']}>{title}</View>
        <View className={styles['card-amount']}>
          <Amount color='#fa8c16' amount={amount} />
        </View>
        <View className={styles['card-text']}>{text}</View>
      </View>
    </View>
  );
};

const Index = () => {
  const { userInfo, getUserInfo } = userInfoStores.useContainer();
  usePageEvent('onShow', getUserInfo);

  const [amount, setAmount] = useState('0.01');

  const { run, loading } = useRequest(
    () => {
      const params = data.current.find(
        (item) => item.amount === amount
      )?.params;
      return pay({
        amount,
        ...params,
        userId: userInfo!.id,
      }).then((res) => {
        requestPayment({
          timeStamp: res.timeStamp,
          nonceStr: res.nonceStr,
          package: res.packageValue,
          signType: res.signType,
          paySign: res.paySign,
          success: () => {
            showToast({
              title: '支付成功',
            });
            getUserInfo();
          },
          fail: () => {
            showModal({
              title: '错误',
              content: ' 支付失败, 请重试',
              showCancel: false,
            });
          },
        });
      });
    },
    {
      manual: true,
    }
  );
  const data = useRef<CardProps[]>([
    {
      title: '日会员卡',
      amount: '0.99',
      text: '试用一天到期自动续费',
      params: {
        memberType: 'DAY',
      },
    },
    {
      title: '周会员卡',
      amount: '2.99',
      text: '续费7天',
      params: {
        memberType: 'WEEK',
      },
    },
    {
      title: '月会员卡',
      amount: '9.9',
      text: '续费31天',
      params: {
        memberType: 'MONTH',
      },
    },
  ]);
  return (
    <LoginLayout>
      <View className={styles.my}>
        <UserCard />
        <Block title='开通会员' contentStyle={{ padding: '0 30rpx' }}>
          <Grid data={data.current} columns={3} gutter={[16]}>
            {(props) => (
              <Item
                {...props}
                onTap={setAmount}
                isHover={amount === props.amount}
              />
            )}
          </Grid>
          <View className={styles.br} />
          <Button
            loading={loading}
            onTap={run}
            size='large'
            block
            look='orange'>
            同意协议并立即支付开通会员
          </Button>
          <View className={styles.br} />
          <View>
            开通会员前请务必仔细阅读
            <Agreement type='会员服务协议' />
            规则
          </View>
          <View className={styles.br} />
          <View className={styles.footer}>
            <View className={styles.content}>我的专属权益</View>
          </View>
          <Row gutter={16}>
            <TagItem
              icon='redpacket'
              text='享受到店消费优惠'
              title='每天领红包'
            />
            <TagItem icon='emoji' text='开启财富之路' title='区域代理' />
            <TagItem icon='friend' text='月月有奖励' title='邀新奖励' />
          </Row>
        </Block>
      </View>
    </LoginLayout>
  );
};
export default Index;
