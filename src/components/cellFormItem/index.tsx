import React from 'react';
import { FieldProps } from 'rc-field-form/es/Field';

import FormItem from '@/components/formItem';
import { Cell } from 'anna-remax-ui';
import type { ItemProps } from 'anna-remax-ui/esm/cell';

const Index = ({
  children,
  cellProps,
  ...fieldProps
}: {
  children: React.ReactElement;
  padding?: number;
  cellProps: ItemProps;
} & FieldProps) => {
  return (
    <FormItem {...fieldProps}>
      <Cell {...cellProps}>{children}</Cell>
    </FormItem>
  );
};
export default Index;
