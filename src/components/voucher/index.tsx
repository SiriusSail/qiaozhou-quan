import React, { useCallback } from 'react';
import { View, navigateTo, redirectTo, switchTab } from 'remax/wechat';
import { Row, Col, Button, Tag, Space } from 'anna-remax-ui';
import styles from './index.less';
import classnames from 'classnames';
import dayjs from 'dayjs';
import type { CampusVoucherItem } from '@/apis/usercoupon';

const Index = (
  item: CampusVoucherItem & {
    type: 'new' | 'see';
    onClose?: () => void;
    onTap: () => void;
  }
) => {
  const toVoucher = useCallback(() => {
    if (item?.onTap) return item?.onTap?.();
    navigateTo({
      url: `/pages/voucher/index?id=${item.couponNo}`,
    });
  }, [item]);
  return (
    <Row className={styles['bag-item']}>
      <Col span={8} className={styles['bag-item-left']}>
        <View
          className={classnames(styles['bag-item-up'], styles['font-size-80'])}>
          <Space size={0}>
            <View className={styles.unit}>￥</View>
            <View>{(item.favorable * 1).toFixed(2)}</View>
          </Space>
        </View>
        <View className={styles['bag-item-down']}>
          <Tag color='red'>{item.couponName || '随机红包'}</Tag>
        </View>
      </Col>
      <Col span={10}>
        <View
          className={classnames(styles['bag-item-up'], styles['font-size-60'])}>
          任意消费可用
        </View>
        <View className={styles['bag-item-down']}>
          {item.effectiveTime
            ? `有效期至 ${dayjs(item.effectiveTime).format('YYYY-MM-DD')}`
            : '今日有效'}
        </View>
      </Col>
      <Col span={6}>
        <View className={styles['bag-item-right']}>
          {item.type === 'new' ? (
            <Button
              type='primary'
              onTap={() => {
                item.onClose?.();
                navigateTo({
                  url: `/pages/bag/index`,
                });
              }}
              danger>
              去使用
            </Button>
          ) : item.status === 2 ? (
            <Button disabled={true} type='primary' danger>
              已使用
            </Button>
          ) : item.status === 1 ? (
            <Button type='primary' onTap={toVoucher} danger>
              使用
            </Button>
          ) : (
            <Button type='primary' disabled={true} danger>
              已过期
            </Button>
          )}
        </View>
      </Col>
    </Row>
  );
};
export default Index;
