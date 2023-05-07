import React, { useMemo, useState, useRef } from 'react';
import {
  navigateTo,
  showModal,
  showShareMenu,
  createSelectorQuery,
  getSystemInfo,
  View,
} from 'remax/wechat';
import styles from './index.less';
import Favorable from '@/components/favorable';
import BackImage from '@/components/backImage';
import { Space, Card, Tag, Popup } from 'anna-remax-ui';
import type { Find } from '@/apis/goods';
import { useControllableValue } from 'ahooks';
import Iconfont from '@/components/iconfont';
import FormItem from '@/components/formItem';
import currency from 'currency.js';

const Item: React.FC<
  Find & {
    value?: string;
    type?: 'see' | 'edit';
    onChange?: (string: string) => void;
  }
> = ({ onChange, type, ...item }) => {
  const [value, setValue] = useControllableValue({
    ...item,
    onChange,
  });
  const [open, setOpen] = useState(false);
  return (
    <Card
      key={item.goodsId}
      cover={
        <View className={styles.imageContainer}>
          <BackImage
            preview={false}
            src={item.cover}
            style={{ borderRadius: '10rpx' }}
            width='160'
            height='160'
          />
        </View>
      }
      direction='horizontal'>
      <View className={styles.card}>
        <View
          className={styles.top}
          onTap={() => {
            navigateTo({
              url: `/pages/productPages/productEdit/index?id=${item.goodsId}`,
            });
          }}>
          <View>{item.goodsName}</View>
        </View>
        <View className={styles.content}>
          <View className={styles.overNum}>
            <View>{item.remarks}</View>
          </View>
        </View>
        <View className={styles.content}>
          <View
            onTap={() => {
              navigateTo({
                url: `/pages/productPages/productEdit/index?id=${item.goodsId}`,
              });
            }}>
            {item.tags?.split(',').map((tagItem) => (
              <Tag key={tagItem}>{tagItem}</Tag>
            ))}
          </View>
        </View>
        {type === 'edit' && (
          <View className={styles.foot}>
            <Favorable color='#fa8c16' favorable={item.price} />
            <View>
              <Space size={20}>
                {parseInt(value?.value) > 0 && (
                  <View
                    onTap={() => {
                      const val = parseInt(value?.value || 0) - 1;
                      if (val <= 0) {
                        setValue(undefined);
                        return;
                      }
                      setValue({
                        ...item,
                        value: parseInt(value?.value || 0) - 1,
                      });
                    }}>
                    <Iconfont name='qz-jianshao' size={42} color='#fa8c16' />
                  </View>
                )}
                {parseInt(value?.value) > 0 && <View>{value?.value}</View>}
                <View
                  onTap={() => {
                    if (
                      parseInt(value?.value || 0) + 1 >
                      parseInt(item.overNum || 0)
                    ) {
                      return;
                    }
                    setValue({
                      ...item,
                      value: parseInt(value?.value || 0) + 1,
                    });
                  }}>
                  <Iconfont name='qz-jiahao2fill' size={42} color='#fa8c16' />
                </View>
              </Space>
            </View>
          </View>
        )}
        {type === 'see' && (
          <View className={styles.foot}>
            <Space>
              <Favorable color='#fa8c16' favorable={item.price} />
              <View>×</View>
              <View>{item.number}</View>
            </Space>

            <View>
              <Favorable
                color='#fa8c16'
                favorable={currency(item.price).multiply(item.number).toJSON()}
              />
            </View>
          </View>
        )}
      </View>
      <Popup
        open={open}
        onClose={() => {
          setOpen(false);
        }}>
        <View style={{ padding: '20px' }}></View>
      </Popup>
    </Card>
  );
};

const Index: React.FC<{
  data: Find[];
  type?: 'see' | 'edit';
}> = ({ data, type = 'edit' }) => {
  return (
    <View>
      {data.map((item) => {
        return (
          <FormItem key={item.goodsId} name={item.goodsId}>
            <Item type={type} {...item} />
          </FormItem>
        );
      })}
    </View>
  );
};
export default Index;
