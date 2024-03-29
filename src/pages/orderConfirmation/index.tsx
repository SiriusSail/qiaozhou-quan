import React, { useMemo, useRef, useState, useCallback } from 'react';
import {
  View,
  navigateTo,
  redirectTo,
  Picker,
  makePhoneCall,
  requestSubscribeMessage,
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
import { placeOrder } from '@/apis/order';
// import { decideGoodsOverNum } from '@/apis/goods';
import storage from '@/utils/storage';
import dayjs from 'dayjs';

const Index = () => {
  const { merchantId } = useQuery();
  const [coupon, setCoupon] = useState<any>();
  // const [remarks, setRemarks] = useState<string>();

  const [form] = useForm();
  const selectData = useRef(storage.get('orderCache')[merchantId || '']);

  // 获取商家商品
  const { data: goodsInfo } = useRequest(
    () => {
      return findGoodsListByMerchantId(merchantId as string);
    },
    {
      manual: !merchantId,
    }
  );

  // 获取商品信息
  const selectGoods = useMemo(() => {
    return (goodsInfo?.goodsCategoryListResList
      ?.map((item) => item.goodsListResList)
      .flat()
      .map((item) => {
        const find = selectData.current[item!.goodsId];
        return {
          ...item,
          value: (find as any)?.value,
          number: (find as any)?.value,
        };
      })
      .filter(
        (item) => item.number > 0 //.find((sItem) => item?.goodsId === sItem?.goodsId)
      ) || []) as Find[];
  }, [goodsInfo?.goodsCategoryListResList]);

  const { run: place, loading: placeLoading } = useRequest(
    () => {
      const { couponId, remarks, departTime } = form.getFieldsValue();
      const placeOrderGoodsReqList = selectGoods.map((item) => ({
        goodsId: item.goodsId,
        number: item.number,
        price: item.price,
      }));
      return placeOrder({
        couponId,
        remarks,
        placeOrderGoodsReqList,
        departTime,
        merchantId,
      });
    },
    {
      manual: true,
      onSuccess: (e) => {
        const orderCache = storage.get('orderCache');
        delete orderCache[merchantId || ''];
        storage.set('orderCache', orderCache);
        storage.del('coupon');
        redirectTo({
          url: `/pages/success/index?orderId=${e}`,
        });
      },
    }
  );

  const tal = useMemo(() => {
    return selectGoods.reduce((a, b) => {
      return currency((b as any)?.number || 0)
        .multiply((b as any)?.price || 0)
        .add(a)
        .toJSON();
    }, 0);
  }, [selectGoods]);
  usePageEvent('onShow', (e) => {
    const cou = storage.get('coupon');

    if (cou) {
      try {
        const c = JSON.parse(cou);
        setCoupon(c);
        form.setFieldsValue({
          couponId: c.couponId,
        });
      } catch (error) {
        console.log(error);
      }
    }
    // storage.del('coupon');
  });
  usePageEvent('onUnload', (e) => {
    storage.del('coupon');
  });

  const onSubmit = useCallback(() => {
    requestSubscribeMessage({
      tmplIds: ['ty2IsUqnNeCCFhVBSp-eMb7XxEZutIGYw-sFYKcHjTw'],
      async success() {
        place();
      },
      async fail() {
        place();
      },
    });
  }, [place]);

  const favorable = useMemo(() => {
    const favor = currency(tal)
      .subtract(coupon?.favorable || 0)
      .toJSON();
    return favor > 0 ? favor : 0;
  }, [coupon?.favorable, tal]);
  return (
    <Form form={form}>
      <Field name='couponId' />
      <View className={styles.my}>
        <Block title='店铺信息'>
          <Cell icon='shop' label='店铺'>
            {goodsInfo?.merName}
          </Cell>
          <Cell icon='location' label='地址'>
            {goodsInfo?.merAddress}
          </Cell>
          <Cell
            icon='phone'
            label='电话'
            onTap={() => {
              if (!goodsInfo?.merPersonTel) return;
              makePhoneCall({
                phoneNumber: goodsInfo.merPersonTel,
              });
            }}>
            {goodsInfo?.merPersonTel}
          </Cell>
        </Block>
        <Block title='订单信息'>
          <View className={styles['order-list']}>
            {<GoodsList type='see' data={selectGoods} />}
          </View>
          <Cell icon='sort' label='小计'>
            <Favorable color='#E8813E' favorable={tal} />
          </Cell>
          <Cell icon='sort' label='取餐时间'>
            <Field
              name='departTime'
              initialValue={dayjs().add(45, 'm').format('HH:mm')}
              normalize={(e) => e.detail.value}>
              <Picker mode='time' className={styles.picker}>
                <Field name='departTime'>{({ value }) => value}</Field>
              </Picker>
            </Field>
          </Cell>
          <Field name='remarks'>
            <Input
              icon='text'
              label='备注'
              placeholder='请填写口味，偏好等要求'
            />
          </Field>
          <Cell
            icon='ticket'
            label='优惠券'
            border={false}
            arrow
            onTap={() => {
              navigateTo({
                url: `/pages/bag/index?merchantId=${merchantId}`,
              });
            }}>
            {coupon ? (
              <Space>
                <View>{coupon.couponName}</View>
                <Favorable color='#E8813E' favorable={coupon.favorable} />
              </Space>
            ) : (
              '请选择优惠券'
            )}
          </Cell>
        </Block>
        <View style={{ height: '300rpx' }} />
        <View className={styles['shopping-cart']}>
          <Space>
            <View>
              合计
              <Favorable color='#E8813E' favorable={favorable} />
            </View>
            <Button look='orange' onTap={onSubmit} loading={placeLoading}>
              确定下单
            </Button>
          </Space>
        </View>
      </View>
    </Form>
  );
};
export default Index;
