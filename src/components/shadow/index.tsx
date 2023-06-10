// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import Visible from './native';
import React from 'react';
import { View } from 'remax/wechat';

interface Props {
  children?: React.ReactNode;
  top?: React.ReactNode;
  arrow?: boolean;
  addstyle?: string;
  contentstyle?: string;
  className?: string;
  label?: React.ReactNode;
}

const Index = ({
  label,
  children,
  top,
  arrow,
  addstyle,
  contentstyle,
  className,
}: Props) => (
  <Visible
    arrow={arrow}
    addstyle={addstyle}
    contentstyle={contentstyle}
    className={className}>
    {children}
    <View slot='label'>{label}</View>
    <View slot='top'>{top}</View>
  </Visible>
);
export default Index;
