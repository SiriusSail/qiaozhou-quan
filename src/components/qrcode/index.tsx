import React, { useEffect } from 'react';
import { View } from 'remax/one';
import { Canvas } from 'remax/wechat';
import styles from './index.less';
import wxbarcode from './utils/index';

const Index = ({
  url,
  width = 450,
  height = 450,
  text,
  logo,
  logoSize,
}: {
  text?: string;
  logo?: string;
  url: string;
  logoSize?: number;
  width?: number;
  height?: number;
}) => {
  useEffect(() => {
    setTimeout(() => {
      wxbarcode.qrcode('qrcodeMini', url, width, height, logo, logoSize);
    }, 500);
  }, [width, height, logo, logoSize, url]);
  return (
    <View className={styles.qrcode}>
      <Canvas style={{ height: height, width }} canvasId='qrcodeMini' />
      {text && <View>{text.toLocaleUpperCase()}</View>}
    </View>
  );
};
export default Index;
