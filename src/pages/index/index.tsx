import React, { useState, useMemo } from 'react';
import { View, Swiper, SwiperItem, navigateTo } from 'remax/wechat';
import { Icon, Space, Grid, Card } from 'anna-remax-ui';
import NoticeBar from '@/components/notice-bar';
import Image from '@/components/image';
import storage from '@/utils/storage';
import styles from './index.less';
import userInfoStores from '@/stores/userInfo';
import apis from '@/apis/index';
import enums from '@/stores/enums';
import Iconfont from '@/components/iconfont';
import AutoList from '@/components/autoList';
import ModailSelect from '@/components/modailSelect';
import { getActivityListByUserId } from '@/apis/activity';
import type { ActivetyUser } from '@/apis/activity';
import LoginLayout from '@/layout/loginLayout';
import { updateCampus } from '@/apis/user';
import { useRequest } from 'ahooks';
import Native from '@/components/native';

const RenderGridItem = (props: { activityId: string; favorable: 3.5 }) => (
  <View className={styles['demo-grid-item']}>
    {/* <Iconfont name='qz-hongbao' size={200} /> */}
    <Image height='205rpx' width='164rpx' src={'/images/hongbao.png'} />
  </View>
);

const Item = (props: ActivetyUser) => {
  return (
    <Card
      style={{ padding: '20rpx 0', margin: '30rpx 0' }}
      shadow={true}
      cover={
        <Card
          onTap={() => {
            navigateTo({
              url: `/pages/shop/index?id=${props.merchantId}`,
            });
          }}
          title={
            <View className={styles['card-title']}>{props.merchantName}</View>
          }
          description={props.merDescribe || '暂无简介'}
          // extra={<View className={styles.coverExtra}>🏖</View>}
          cover={
            <Image
              height='180rpx'
              width='180rpx'
              src={props.merAvatarurl || '/images/test/nouser.jpg'}
            />
          }
          direction='horizontal'>
          {/* <View className={styles.coverRow}>
            <div>{props?.merDescribe || '暂无简介'}</div>
          </View> */}
        </Card>
      }
      foot={
        <View className={styles['card-footer']}>
          <Space>
            <Icon type='forward' size='40px' />
          </Space>
        </View>
      }>
      <View className={styles.envelopes}>
        <Grid data={props.list} columns={3} gutter={16}>
          {(col) => <RenderGridItem {...col} />}
        </Grid>
      </View>
    </Card>
  );
};

const Index = () => {
  const { userInfo } = userInfoStores.useContainer();
  const [campu, setCampu] = useState(storage.get('campu'));

  const { campus, getCampusPage } = enums.useContainer();
  const { data: banner } = useRequest(apis.findIndexBannerList);

  // usePageEvent('onShow', () => {
  //   // if (!campus?.data || campus?.data.length <= 0) {
  //   //   return;
  //   // }
  //   getCampusPage();
  // });
  console.log(banner);
  return (
    <View className={styles.app}>
      <View className={styles.top}>
        <Native>
          <ModailSelect
            title='选择校区'
            onSelect={(val, item, { close }) => {
              close();
              setCampu(val!);
              storage.set('campu', val);
              userInfo?.id &&
                updateCampus({ userId: userInfo?.id, campusId: val });
            }}
            initOpen={!campu}
            options={campus?.data || []}
            onClick={getCampusPage}
            buttonRender={(val, valueData) => (
              <Space>
                <Icon type='location' size='36px' />
                <View>
                  {campus?.data.find((item) => item.key === campu)?.value ||
                    '请选择校区'}
                </View>
              </Space>
            )}
          />
        </Native>
      </View>
      <View className={styles.body}>
        <Swiper indicatorDots={true} autoplay={true} interval={5000}>
          <SwiperItem className={styles['seiper-item']}>
            <View>推广图1</View>
          </SwiperItem>
          <SwiperItem className={styles['seiper-item']}>
            <View>推广图2</View>
          </SwiperItem>
          <SwiperItem className={styles['seiper-item']}>
            <View>推广图3</View>
          </SwiperItem>
        </Swiper>
        {/* <NoticeBar title='温馨提示'> 这里是通知信息栏</NoticeBar> */}
        {useMemo(() => {
          return (
            <AutoList<ActivetyUser>
              getList={(params) => {
                if (!campu) {
                  return Promise.resolve({ records: [], current: 1 });
                }
                return getActivityListByUserId({
                  ...params,
                  userId: userInfo?.id,
                  campusId: campu,
                });
              }}
              renderItem={(res, index) => {
                return <Item key={index} {...res} />;
              }}
            />
          );
        }, [campu, userInfo?.id])}
      </View>
    </View>
  );
};

export default Index;
