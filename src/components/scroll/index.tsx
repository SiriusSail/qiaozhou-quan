// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import Visible from './native';
import React from 'react';
import { View } from 'remax/wechat';

interface Props {
  className?: string;
  merchantId?: string;
  /**
   * 优化性能
   */
  data?: any;
}

const Index = ({ className, merchantId, data }: Props) => (
  <Visible data={data} merchantId={merchantId} class-name={className}></Visible>
);
export default Index;
