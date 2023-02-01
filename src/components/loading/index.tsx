import React from 'react';
import { View } from 'remax/one';
import styles from './index.module.less';

export interface Props {
  /**
   * 加载中的文本内容
   * @default 加载中
   */
  content?: string;
}

const Index = ({ content = '加载中' }: Props) => {
  return <View>loading</View>;
};

export default Index;
