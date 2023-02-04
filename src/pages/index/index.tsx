import React, { useState, useMemo } from 'react';
import { View, Swiper, SwiperItem } from 'remax/wechat';
import { Icon, Space, Grid, Card } from 'anna-remax-ui';
import NoticeBar from '@/components/notice-bar';
import Image from '@/components/image';
import styles from './index.less';
import userInfoStores from '@/stores/userInfo';
import enums from '@/stores/enums';
import Iconfont from '@/components/iconfont';
import AutoList from '@/components/autoList';
import ModailSelect from '@/components/modailSelect';
import { getActivityListByUserId } from '@/apis/activity';
import { usePageEvent } from 'remax/macro';

const renderGridItem = (col: any, index?: number) => (
  <View className={styles['demo-grid-item']}>
    <Iconfont name='qz-hongbao' size={200} />
  </View>
);

const Item = () => {
  return (
    <Card
      style={{ padding: '20rpx 0', margin: '30rpx 0' }}
      shadow={true}
      cover={
        <Card
          title={<View className={styles['card-title']}>肯德基</View>}
          description='阳光正好，带上好心情到店吃饭！'
          extra={<View className={styles.coverExtra}>🏖</View>}
          cover={
            <Image
              height='180rpx'
              width='180rpx'
              src='/images/test/nouser.jpg'
            />
          }
          direction='horizontal'>
          <View className={styles.coverRow}>
            <div></div>
          </View>
        </Card>
      }
      foot={
        <View className={styles['card-footer']}>
          <Space>
            <Icon type='like' size='40px' />
            <Icon type='favor' size='40px' />
            <Icon type='comment' size='40px' />
          </Space>
        </View>
      }>
      <View className={styles.envelopes}>
        <Grid data={['1', '2', '3']} columns={3} gutter={16}>
          {renderGridItem}
        </Grid>
      </View>
    </Card>
  );
};

const Index = () => {
  const { userInfo } = userInfoStores.useContainer();

  const { campus, getCampusPage } = enums.useContainer();

  const [selectCampus, setSelectCampus] = useState<API.OptionsType>();

  const thenCampus = useMemo(() => {
    return selectCampus || campus?.data?.[0];
  }, [campus?.data, selectCampus]);

  usePageEvent('onShow', () => {
    if (!campus?.data || campus?.data.length <= 0) {
      return;
    }
    getCampusPage();
  });
  return (
    <View className={styles.app}>
      <View className={styles.top}>
        <ModailSelect
          title='选择校区'
          onSelect={(val, item, { close }) => {
            close();
            setSelectCampus(item);
          }}
          options={campus?.data || []}
          onClick={getCampusPage}
          button={(val, valueData) => (
            <Space>
              <Icon type='location' size='36px' />
              <View>{valueData?.value || campus?.data?.[0].value}</View>
            </Space>
          )}
        />
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
        <NoticeBar title='温馨提示'> 这里是通知信息栏</NoticeBar>
        <AutoList
          getList={(params) => {
            if (!thenCampus?.key) {
              return Promise.resolve({ records: [], current: 1 });
            }
            return getActivityListByUserId({
              ...params,
              userId: userInfo?.id,
              campusId: thenCampus?.key,
            });
          }}
          renderItem={(res) => {
            console.log(res, 123123);
            return <Item />;
          }}
        />

        <Item />
        <Item />
        <Item />
      </View>
    </View>
  );
};

export default Index;
