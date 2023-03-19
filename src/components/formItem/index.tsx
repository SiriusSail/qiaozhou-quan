import React from 'react';
import { FieldProps } from 'rc-field-form/es/Field';
import { Field } from 'rc-field-form';
import { View } from 'remax/wechat';
import styles from './index.less';

const index = ({
  children,
  padding = 230,
  ...fieldProps
}: {
  children: React.ReactElement;
  padding?: number;
} & FieldProps) => {
  return (
    <View>
      <Field validateTrigger={'onChange'} trigger={'onChange'} {...fieldProps}>
        {children}
      </Field>
      <Field validateTrigger={'onChange'} trigger={'onChange'} {...fieldProps}>
        {(props, { errors }) => {
          return (
            <View>
              <View>
                {errors[0] && (
                  <View
                    style={{ paddingLeft: padding + 'rpx' }}
                    className={styles.error}>
                    {errors[0].includes('is required')
                      ? children?.props?.label
                        ? `请输入${children?.props?.label}`
                        : '此项是必填的'
                      : errors[0]}
                  </View>
                )}
              </View>
            </View>
          );
        }}
      </Field>
    </View>
  );
};
export default index;
