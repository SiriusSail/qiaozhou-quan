import React from 'react';
import { View } from 'remax/wechat';
import { Row, Col, Button, Tag } from 'anna-remax-ui';
import styles from './index.less';
import classnames from 'classnames';
import type { CampusVoucherItem } from '@/apis/usercoupon';

const Index = (item: CampusVoucherItem) => {
  console.log(item);
  return (
    <View className={styles['bag-item']}>
      <Row>
        <Col span={7} className={styles['bag-item-left']}>
          <View
            className={classnames(
              styles['bag-item-up'],
              styles['font-size-80']
            )}>
            {item.favorable}
          </View>
          <View className={styles['bag-item-down']}>
            <Tag color='red'>{item.couponName}</Tag>
          </View>
        </Col>
        <Col span={11}>
          <View
            className={classnames(
              styles['bag-item-up'],
              styles['font-size-60']
            )}>
            任意消费可用
          </View>
          <View className={styles['bag-item-down']}>
            有效期至 {item.effectiveTime}
          </View>
        </Col>
        <Col span={6}>
          <View className={styles['bag-item-right']}>
            {item.status === 0 ? (
              <Button disabled={true} type='primary' danger>
                已使用
              </Button>
            ) : (
              <Button type='primary' danger>
                使用
              </Button>
            )}
          </View>
        </Col>
      </Row>
    </View>
  );
};
export default Index;
