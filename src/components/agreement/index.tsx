import React, { useState } from 'react';
import { View } from 'remax/one';
import { Popup } from 'anna-remax-ui';
import styles from './index.less';
import Priacy from './priacy';
import Merchant from './merchant';
import UserInfo from './userInfo';
import Vip from './vip';

const agreementNodes = {
  隐私协议: <Priacy />,
  平台商户服务规范: <Merchant />,
  用户服务协议: <UserInfo />,
  会员服务协议: <Vip />,
};

export interface Props {
  type: keyof typeof agreementNodes;
  textRender?: (text: string) => React.ReactNode;
}
const Index = ({ type, textRender }: Props) => {
  const [show, setShow] = useState(false);
  const close = () => {
    setShow(false);
  };
  return (
    <View className={styles.agreement}>
      <View onTap={() => setShow(true)}>
        {textRender?.(type) || (
          <View className={styles.text}>{`《${type}》`}</View>
        )}
      </View>
      <Popup position='bottom' closeable open={show} onClose={close}>
        <View className={styles.content}>{agreementNodes[type]}</View>
      </Popup>
    </View>
  );
};
export default Index;
