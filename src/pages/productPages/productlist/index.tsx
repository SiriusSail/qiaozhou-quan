import React, { useState } from 'react';
import { View, navigateTo, showModal } from 'remax/wechat';
import { Card, Popup, Cell, Tag } from 'anna-remax-ui';
import styles from './index.less';
import BackImage from '@/components/backImage';
import { goodsPage } from '@/apis/goods';
import type { Find } from '@/apis/goods';
import BottomButton from '@/components/bottomButton';
import ProductMenu from '@/components/productMenu';
import { usePageEvent } from 'remax/macro';
import { useRequest } from 'ahooks';

const GoodsList: React.FC<{
  data: Find[];
}> = (props) => {
  return (
    <View>
      {props.data.map((item) => {
        return (
          <Card
            key={item.goodsId}
            title={item.goodsName}
            description={
              <View
                onTap={() => {
                  navigateTo({
                    url: `/pages/productPages/productEdit/index?id=${item.goodsId}`,
                  });
                }}>
                {item.tags?.split(',').map((tagItem) => (
                  <Tag>{tagItem}</Tag>
                ))}
              </View>
            }
            extra={
              <View className={styles.extra}>
                <Tag color={item.statusDesc === '上架' ? 'green' : 'yellow'}>
                  {item.statusDesc}
                </Tag>
                <View className={styles.overNum}>剩余：{item.overNum} 份</View>
              </View>
            }
            cover={
              <View className={styles.imageContainer}>
                <BackImage src={item.cover} width='120' height='120' />
              </View>
            }
            direction='horizontal'>
            <View
              className={styles.remarks}
              onTap={() => {
                navigateTo({
                  url: `/pages/productPages/productEdit/index?id=${item.goodsId}`,
                });
              }}>
              {item.remarks}
            </View>
          </Card>
        );
      })}
    </View>
  );
};

const Index = () => {
  const [show, setShow] = useState(false);

  const { data, run } = useRequest(() => {
    return goodsPage();
  });

  usePageEvent('onShow', () => {
    run();
  });

  return (
    <View className={styles.product}>
      <ProductMenu
        hideCart
        // render={(d) => <GoodsList data={d} />}
        data={data || []}
      />
      <BottomButton
        size='large'
        noHeight
        onTap={() => {
          if (
            (data?.map((item) => item.goodsListResList).flat().length || 0) > 30
          ) {
            showModal({
              title: '提示',
              content: '目前在最多添加30个商品，后续会陆续开放店铺请持续关注',
              showCancel: false,
              confirmText: '确定',
            });
            return;
          }
          setShow(true);
        }}
        type='primary'
        shape='square'
        block>
        添加商品
      </BottomButton>
      <Popup
        position='bottom'
        title='选择分类'
        open={show}
        onClose={() => {
          setShow(false);
        }}>
        {data?.map((item) => (
          <Cell
            key={item.categoryId}
            label={item.categoryName}
            onTap={() => {
              navigateTo({
                url: `/pages/productPages/productEdit/index?categoryId=${item.categoryId}`,
              });
            }}
            arrow
          />
        ))}

        <Cell
          label='添加分类'
          onTap={() => {
            navigateTo({
              url: '/pages/productPages/categoryList/index',
            });
          }}
          arrow
        />
      </Popup>
    </View>
  );
};

export default Index;
