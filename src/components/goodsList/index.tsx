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
import Block from '@/components/block';
import Favorable from '@/components/favorable';
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
import { useQuery } from 'remax';
import { createContainer } from 'unstated-next';
import { usePageEvent } from 'remax/macro';
import avatarSrc from '@/components/userCard/images/avatar.jpg';
import Qrcode from '@/components/qrcode';
import invitationShare from '@/utils/invitationShare';
import { findGoodsListByMerchantId } from '@/apis/goods';
import type { Find } from '@/apis/goods';
import ProductMenu from '@/components/productMenu';
import { useControllableValue } from 'ahooks';
import Iconfont from '@/components/iconfont';
import FormItem from '@/components/formItem';

const Item: React.FC<
  Find & {
    value?: string;
    onChange?: (string: string) => void;
  }
> = ({ onChange, ...item }) => {
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
        <View className={styles.foot}>
          <Favorable color='#fa8c16' favorable={item.price} />
          <View>
            <Space>
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
                  <Iconfont name='qz-jianshao' size={32} color='#fa8c16' />
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
                <Iconfont name='qz-jiahao2fill' size={32} color='#fa8c16' />
              </View>
            </Space>
          </View>
        </View>
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
}> = (props) => {
  return (
    <View>
      {props.data.map((item) => {
        return (
          <FormItem key={item.goodsId} name={item.goodsId}>
            <Item {...item} />
          </FormItem>
        );
      })}
    </View>
  );
};
export default Index;
