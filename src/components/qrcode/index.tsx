import React, { useEffect } from 'react';
import { View } from 'remax/one';
import { Canvas } from 'remax/wechat';
import styles from './index.less';
import wxbarcode from 'wxbarcode';

const Index = ({
  code,
  width = 450,
  height = 450,
}: {
  code: string;
  width?: number;
  height?: number;
}) => {
  useEffect(() => {
    setTimeout(() => {
      wxbarcode.qrcode(
        'qrcodeMini',
        `http://www.chqheiyou.com/qrcode/check/id=${code}`,
        width,
        height
      );
    }, 500);
  }, [code, width, height]);
  return (
    <View className={styles.qrcode}>
      <Canvas style={{ height: height - 30, width }} canvasId='qrcodeMini' />
      <View>{code.toLocaleUpperCase()}</View>
    </View>
  );
};
export default Index;
