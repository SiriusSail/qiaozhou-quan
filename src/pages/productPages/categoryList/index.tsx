import React from 'react';
import { View, navigateTo } from 'remax/wechat';
import { Cell } from 'anna-remax-ui';
import styles from './index.less';
import userInfoStores from '@/stores/userInfo';
import { findGoodsCategoryList } from '@/apis/category';
import type { CategoryInfo } from '@/apis/category';
import BottomButton from '@/components/bottomButton';
import { usePageEvent } from 'remax/macro';
import { useRequest } from 'ahooks';

const Index = () => {
  const { userInfo } = userInfoStores.useContainer();

  const { data, run } = useRequest(
    () => {
      if (!userInfo?.merchantId) return Promise.resolve([] as CategoryInfo[]);
      return findGoodsCategoryList(userInfo?.merchantId);
    },
    {
      refreshDeps: [userInfo],
      manual: true,
    }
  );

  usePageEvent('onShow', () => {
    run();
  });

  return (
    <View className={styles.bag}>
      {data?.map((item) => {
        return (
          <Cell
            key={item.id}
            label={item.name}
            onTap={() => {
              navigateTo({
                url: `/pages/productPages/categoryEdit/index?${Object.entries(
                  item
                )
                  .map(([key, item]) => `${key}=${item}`)
                  .join('&')}`,
              });
            }}
            arrow
          />
        );
      })}
      <BottomButton
        size='large'
        onTap={() => {
          navigateTo({
            url: '/pages/productPages/categoryEdit/index',
          });
        }}
        type='primary'
        shape='square'
        block>
        添加分类
      </BottomButton>
    </View>
  );
};

export default Index;
