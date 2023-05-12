import React, { useMemo, useRef, useState, useCallback } from 'react';
import {
  View,
  navigateBack,
  showToast,
  showModal,
  makePhoneCall,
} from 'remax/wechat';
import styles from './index.less';
import { useQuery } from 'remax';
import { useRequest } from 'ahooks';
import { findGoodsListByMerchantId } from '@/apis/goods';
import type { Find } from '@/apis/goods';
import { Cell, Button, Space, Input } from 'anna-remax-ui';
import { usePageEvent } from 'remax/macro';
import GoodsList from '@/components/goodsList';
import Favorable from '@/components/favorable';
import Form, { useForm, Field } from 'rc-field-form';
import Block from '@/components/block';
import currency from 'currency.js';
import user from '@/stores/userInfo';
import {
  findOrderInfoByOrderId,
  cancelOrder,
  completeOrder,
} from '@/apis/order';
// import { decideGoodsOverNum } from '@/apis/goods';
import dayjs from 'dayjs';

const statusColor: Record<string, string> = {
  进行中: '#fa8c16',
  已完成: '#52c41a',
};

const Index = () => {
  const { orderId } = useQuery();
  const { userInfo } = user.useContainer();

  const [form] = useForm();

  const { data: orderData } = useRequest(
    () => {
      return findOrderInfoByOrderId(orderId);
    },
    {
      manual: !orderId,
    }
  );
  const { run: complete, loading: completeLoading } = useRequest(
    () => {
      return completeOrder(orderId);
    },
    {
      manual: true,
      onSuccess: () => {
        showToast({
          title: '操作成功',
          duration: 2000,
          icon: 'success',
        });
        setTimeout(() => {
          navigateBack();
        }, 2000);
      },
    }
  );
  const { data: merchant } = useRequest(
    async () => {
      if (!orderData?.merchantId) return;
      return findGoodsListByMerchantId(orderData?.merchantId as string);
    },
    {
      refreshDeps: [orderData],
    }
  );
  const { run: cancel, loading: cancelLoading } = useRequest(cancelOrder, {
    manual: true,
    onSuccess: () => {
      showToast({
        title: '操作成功',
        duration: 2000,
        icon: 'success',
      });
      setTimeout(() => {
        navigateBack();
      }, 2000);
    },
  });

  const isMerchant =
    userInfo?.merchantId && userInfo?.merchantId === orderData?.merchantId;

  return (
    <Form form={form}>
      <Field name='couponId' />
      <View className={styles.my}>
        {/* {isMerchant ? (
          <Block title='用户信息'>
            <Cell icon='shop' label='用户昵称'>
              {orderData?.merName}
            </Cell>
            <Cell
              icon='phone'
              onTap={() => {
                if (!merchant?.merPersonTel) return;
                makePhoneCall({
                  phoneNumber: merchant.merPersonTel,
                });
              }}
              label='电话'>
              {merchant?.merPersonTel}
            </Cell>
          </Block>
        ) : ( */}
        <Block title='店铺信息'>
          <Cell icon='shop' label='店铺'>
            {orderData?.merName}
          </Cell>
          <Cell icon='location' label='地址'>
            {merchant?.merAddress}
          </Cell>
          <Cell
            icon='phone'
            onTap={() => {
              if (!merchant?.merPersonTel) return;
              makePhoneCall({
                phoneNumber: merchant.merPersonTel,
              });
            }}
            label='电话'>
            {merchant?.merPersonTel}
          </Cell>
        </Block>
        {/* )} */}
        <Block
          title={
            <View className={styles['order-title']}>
              <View>订单信息</View>
              <View
                style={{ color: statusColor[orderData?.statusDesc] || '#999' }}>
                {orderData?.statusDesc}
              </View>
            </View>
          }>
          <Cell icon='order' label='取餐号'>
            <View className={styles.picknum}>{orderData?.pickNum}</View>
          </Cell>
          <Cell icon='countdown' label='取餐时间'>
            {dayjs(orderData?.departTime).format('MM-DD HH:mm')}
          </Cell>
          <View className={styles['order-list']}>
            {
              <GoodsList
                type='see'
                data={(orderData?.wxOrderGoodsDetailResList || []) as any}
              />
            }
          </View>
          <Cell icon='sort' label='小计'>
            <Favorable
              color='#fa8c16'
              favorable={currency(orderData?.payMoney || 0)
                .add(orderData?.couponMoney || 0)
                .toJSON()}
            />
          </Cell>
          {orderData?.remarks && (
            <Cell icon='text' label='备注'>
              {orderData?.remarks}
            </Cell>
          )}
          {orderData?.couponMoney && (
            <Cell icon='ticket' label='优惠券' border={false}>
              <Favorable color='#fa8c16' favorable={orderData?.couponMoney} />
            </Cell>
          )}
          <Cell icon='countdown' label='下单时间'>
            {dayjs(orderData?.createTime).format('MM-DD HH:mm')}
          </Cell>
        </Block>
        {isMerchant && orderData?.statusDesc === '进行中' && (
          <Button
            block
            danger
            ghost
            loading={cancelLoading}
            size='large'
            onTap={() => {
              showModal({
                title: '取消原因',
                cancelText: '返回',
                placeholderText: '请输入取消原因',
                editable: true,
                confirmColor: '#ff4d4f',
                confirmText: '确定',
                success: (e) => {
                  console.log(e);
                  if (e.confirm) {
                    cancel({
                      cancelRemarks: e.content || '暂无原因',
                      orderId,
                    });
                  }
                },
              });
            }}
            shape='square'>
            取消订单
          </Button>
        )}
        <View style={{ height: '300rpx' }} />
        <View className={styles['shopping-cart']}>
          <Space>
            <View>
              合计
              <Favorable color='#fa8c16' favorable={orderData?.payMoney} />
            </View>
            {isMerchant &&
              (orderData?.statusDesc === '进行中' ? (
                <Button
                  look='orange'
                  onTap={complete}
                  loading={completeLoading}>
                  完成订单
                </Button>
              ) : (
                //   :orderData?.statusDesc === '已完成':(<Button look='orange' onTap={onSubmit} loading={placeLoading}>
                //   完成订单
                // </Button>)
                ''
              ))}
          </Space>
        </View>
      </View>
    </Form>
  );
};
export default Index;
