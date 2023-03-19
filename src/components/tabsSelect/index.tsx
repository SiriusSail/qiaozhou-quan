import React from 'react';
import { View } from 'remax/wechat';
import { Tabs } from 'anna-remax-ui';
import { useControllableValue } from 'ahooks';
import type { TabContentProps as AnnaTabContentProps } from 'anna-remax-ui/esm/tabs';

interface TabContentProps
  extends Omit<AnnaTabContentProps, 'onTabClick' | 'activeKey'> {
  value?: string;
  defaultValue?: string;
  onChange?: (val: string) => void;
}

const Index = ({
  value,
  defaultValue,
  onChange,
  ...props
}: TabContentProps) => {
  const [activeKey, setActiveKey] = useControllableValue({
    value,
    defaultValue,
    onChange,
  });
  return (
    <Tabs
      activeKey={activeKey}
      onTabClick={({ key }) => setActiveKey(key)}
      {...props}
      children={[props.children].flat()}
    />
  );
};
export const TabContent = Tabs.TabContent;
export default Index;
