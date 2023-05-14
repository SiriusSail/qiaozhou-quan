// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import Visible from './native';
import React from 'react';
import { View } from 'remax/wechat';

interface Props {
  className?: string;
  /**
   * 优化性能
   */
  data?: any;
}

const Index = ({ className, data }: Props) => (
  <Visible data={data} class-name={className}></Visible>
);
export default Index;
