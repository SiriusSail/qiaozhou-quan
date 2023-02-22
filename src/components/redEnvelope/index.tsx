import React, { useState, useCallback } from 'react';
import { View } from 'remax/wechat';
import styles from './index.less';
import Image from '@/components/image';
import Voucher from '@/components/voucher';
import type { ActivetyAmountInfo } from '@/apis/activity';
import user from '@/stores/userInfo';
import { Popup } from 'anna-remax-ui';

interface Props extends ActivetyAmountInfo {
  receive: () => Promise<any>;
}

const Index = (props: Props) => {
  const [show, setShow] = useState(false);
  const [voucher, setVoucher] = useState(false);
  const { valiVip } = user.useContainer();
  const showPopup = useCallback(() => {
    if (valiVip({ content: 'VIP用户才可以领取' })) {
      setShow(true);
    }
  }, [valiVip]);
  return (
    <View>
      <View className={styles['demo-grid-item']} onTap={showPopup}>
        <Image height='205rpx' width='164rpx' src={'/images/hongbao.png'} />
      </View>
      <Popup
        closeable={false}
        style={{ background: 'transparent' }}
        open={show}
        onClose={() => {
          setShow(false);
        }}>
        <View className={styles['popup-content']}>
          <View
            className={styles['change-size']}
            onTap={() => {
              props
                ?.receive()
                .then?.(() => {
                  setShow(false);
                  setVoucher(true);
                })
                .catch(() => {
                  setShow(false);
                });
            }}>
            <Image height='410rpx' width='328rpx' src={'/images/hongbao.png'} />
          </View>
        </View>
      </Popup>
      <Popup
        closeable={false}
        style={{ background: 'transparent' }}
        open={voucher}
        onClose={() => {
          setVoucher(false);
        }}>
        <View className={styles['voucher-content']}>
          <View className={styles['voucher-title']}>恭喜您获得了</View>
          <Voucher {...props} type='new' />
        </View>
      </Popup>
    </View>
  );
};
export default Index;
