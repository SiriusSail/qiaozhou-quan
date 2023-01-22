import React, { useState, useMemo } from 'react';
import { View, Text, Image } from 'remax/wechat';
import styles from './index.css';

const Index = () => {
  const [b] = useState(1);
  const data = useMemo(() => {
    return b;
  }, [b]);
  return (
    <View key='123' className={styles.app}>
      <View className={styles.header}>
        <Image
          src='https://gw.alipayobjects.com/mdn/rms_b5fcc5/afts/img/A*OGyZSI087zkAAAAAAAAAAABkARQnAQ'
          className={styles.logo}
        />
        <View className={styles.text}></View>
        编辑 <Text className={styles.path}> {data}</Text>
        开始
      </View>
    </View>
  );
};

export default Index;
