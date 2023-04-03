import React, { useState } from 'react';
import { View, showModal, showShareMenu } from 'remax/wechat';
import styles from './index.less';
import Block from '@/components/block';
import BottomButton from '@/components/bottomButton';
import BackImage from '@/components/backImage';
import RedEnvelope from '@/components/redEnvelope';
import { getActivityListByMerchantId } from '@/apis/activity';
import type { ActivityInfo, ActivetyAmountInfo } from '@/apis/activity';
import classnames from 'classnames';
import { receiveCoupon } from '@/apis/usercoupon';
import user from '@/stores/userInfo';
import { Space, Card, Grid, Icon, Tag, Popup } from 'anna-remax-ui';
import { useRequest } from 'ahooks';
import './global.less';
import { useQuery } from 'remax';
import { createContainer } from 'unstated-next';
import { usePageEvent } from 'remax/macro';
import avatarSrc from '@/components/userCard/images/avatar.jpg';
import Qrcode from '@/components/qrcode';
import invitationShare from '@/utils/invitationShare';

const Store = createContainer(() => {
  const { id } = useQuery<{ id: string }>();
  console.log(id);
  const { userInfo } = user.useContainer();
  const { data } = useRequest(
    () => getActivityListByMerchantId(id, userInfo?.id),
    {
      refreshDeps: [userInfo?.id],
    }
  );

  const { runAsync: receive, loading } = useRequest(
    (params: ActivetyAmountInfo) => {
      return receiveCoupon({
        ...params,
        merNo: data?.merNo,
        merchantId: id,
        userId: userInfo?.id,
      });
    },
    {
      manual: true,
      onError: (e) => {
        showModal({
          showCancel: false,
          title: '提示',
          content: e.message,
        });
      },
    }
  );
  return {
    data,
    id,
    receive,
  };
});

const Item = (props: ActivityInfo) => {
  const { receive } = Store.useContainer();
  return (
    <Card
      style={{ padding: '0 0 20rpx' }}
      shadow={true}
      cover={
        <Card
          title={props.actDescribe}
          description={props.description}
          extra={
            props?.type === 1 && (
              <View className={styles['cover-extra']}>
                {props?.pickUpStatus ? (
                  <Tag color='yellow'>{props.pickUpStatus}</Tag>
                ) : (
                  <Tag color='red'>未领取</Tag>
                )}
              </View>
            )
          }
          direction='horizontal'>
          <View className={styles.coverRow}>
            <div></div>
          </View>
        </Card>
      }>
      {props?.type === 2 ? (
        <Grid data={props.pics} columns={3} gutter={16}>
          {(col) => (
            <BackImage
              preview={props.pics}
              style={{ margin: '6px 0', borderRadius: '10rpx' }}
              src={col}
              height='30vw'
              width='100%'
            />
          )}
        </Grid>
      ) : (
        <Grid data={props.list} columns={3} gutter={16}>
          {(col) => (
            <RedEnvelope
              receive={() => receive(col)}
              couponName={props.actContent}
              {...col}
            />
          )}
        </Grid>
      )}
    </Card>
  );
};

const Shop = () => {
  const { data, id } = Store.useContainer();
  const { userInfo } = user.useContainer();
  const [show, setShow] = useState(false);
  const [openQr, setOpenQr] = useState(false);
  usePageEvent('onLoad', () => {
    showShareMenu({
      withShareTicket: true,
      menus: ['shareAppMessage', 'shareTimeline'],
    });
  });
  usePageEvent('onShareAppMessage', () => {
    return invitationShare({
      title: data?.merchantName,
      imageUrl: data?.doorPhoto,
    });
  });
  return (
    <View className={classnames(styles.shop, 'shop')}>
      <View
        className={styles.back}
        style={{ backgroundImage: `url(${data?.doorPhoto})` }}
      />
      <View className={styles.info}>
        <View className={styles.content}>
          <Space direction='vertical'>
            <View className={styles.title}>{data?.merchantName}</View>
            <View
              onTap={() => setShow(!show)}
              className={classnames({
                [styles.description]: !show,
              })}>
              店铺简介：{data?.merDescribe || '暂无简介'}
            </View>
            <View>联系电话：{data?.merPersonTel || '-'}</View>
            <View>
              地址：{data?.merchantAddress} <Icon type='location' />
            </View>
          </Space>
        </View>
      </View>
      <Block title='店铺活动'>
        <View className={styles.welfare}>
          {data?.activityListResList?.map((item) => (
            <Item key={item.actId} {...item} />
          ))}
        </View>
      </Block>
      {id === userInfo?.merchantId && (
        <BottomButton
          size='large'
          onTap={() => {
            setOpenQr(true);
          }}
          type='primary'
          shape='square'
          block>
          查看店铺二维码
        </BottomButton>
      )}
      <Popup
        open={openQr}
        onClose={() => {
          setOpenQr(false);
        }}>
        <View
          style={{
            padding: '80px',
          }}>
          {openQr && (
            <Qrcode
              url={`https://www.chqheiyou.com/qrcode/shop?id=${id}`}
              logo={avatarSrc}
              logoSize={80}
            />
          )}
        </View>
      </Popup>
    </View>
  );
};

const Index = () => {
  return (
    <Store.Provider>
      <Shop />
    </Store.Provider>
  );
};
export default Index;
