// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import Visible from './native';
import React from 'react';
import { View } from 'remax/wechat';

interface Props {
  onVisible?: () => void;
  onHidden?: () => void;
  className?: string;
  list?: any[];
  children?: React.ReactNode;
  /**
   * 优化性能
   */
  perf?: boolean;
  height?: number;
}

const Index = ({
  children,
  className,
  onHidden,
  onVisible,
  height,
  list,
  perf,
}: Props) => (
  <Visible
    perf={perf}
    list={list}
    class-name={className}
    bindvisible={onVisible}
    height={height}
    bindhidden={onHidden}>
    {children || <View style={{ height: '1px', width: '1px' }} />}
  </Visible>
);
export default Index;
