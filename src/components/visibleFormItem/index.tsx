import React from 'react';
import { FieldProps } from 'rc-field-form/es/Field';
import { Field } from 'rc-field-form';
import { View } from 'remax/wechat';

const index = ({
  children,
  name,
}: {
  children: React.ReactNode | React.ReactNode[];
  name: string;
} & Omit<FieldProps, 'children'>) => {
  return (
    <View>
      <Field
        shouldUpdate={(prevValues, nextValues) => {
          if (prevValues[name] === nextValues[name]) {
            return false;
          }
          return true;
        }}>
        {(props, { errors }) => {
          console.log(props);
          if (props.value[name]) {
            return children;
          }
          return <></>;
        }}
      </Field>
    </View>
  );
};
export default index;
