// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import Visible from './native';
import React from 'react';
import { View } from 'remax/wechat';

interface Props {
  className?: string;
  merchantId?: string;
  hideCart?: boolean;
  openScroll?: boolean;
  /**
   * 优化性能
   */
  data?: any;
}

const Index = ({
  className,
  merchantId,
  hideCart,
  openScroll = true,
  data,
}: Props) => (
  <Visible
    data={data}
    hideCart={hideCart}
    openScroll={openScroll}
    merchantId={merchantId}
    class-name={className}></Visible>
);
export default Index;
