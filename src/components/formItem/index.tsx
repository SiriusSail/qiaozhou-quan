import React, { useState, useRef, useMemo, useCallback } from 'react';
import { FieldProps } from 'rc-field-form/es/Field';
import { Field } from 'rc-field-form';
import { useRequest } from 'ahooks';
import type { FormInstance } from 'rc-field-form';
import { View } from 'remax/wechat';
import styles from './index.less';

const Index = ({
  children,
  validateTrigger = 'onChange',
  padding = 230,
  ...fieldProps
}: {
  children: React.ReactElement;
  padding?: number;
} & FieldProps) => {
  const formRef = useRef<FormInstance>();
  const timeout = useRef<any>();
  const [key, setKey] = useState(new Date().getTime());
  const [defaultValue, setDefaultValue] = useState<string>();
  const [errorText, setErrorText] = useState<string>();
  const value = useRef<any>();
  const Dom = useMemo(() => {
    return React.cloneElement(children, {
      value: value.current,
      defaultValue: defaultValue,
      key,
      onChange: (e: any) => {
        const val = e?.target ? e?.target?.value : e;
        value.current = val;
        if (fieldProps.name) {
          formRef.current?.setFieldValue(fieldProps.name, val);
          formRef.current?.validateFields([fieldProps.name]);
        }
      },
    });
  }, [children, fieldProps.name, key, defaultValue]);

  return (
    <View>
      <Field shouldUpdate={false}>
        {(_, __, form) => {
          formRef.current = form;
          return '';
        }}
      </Field>
      <Field trigger={'onChange'} {...fieldProps} />
      {Dom}
      <Field
        validateTrigger={validateTrigger}
        trigger={'onChange'}
        {...fieldProps}>
        {(props, { errors }) => {
          if (value.current !== props.value) {
            value.current = props.value;
            setDefaultValue(props.value);
            setKey(new Date().getTime());
          }
          if (timeout.current) {
            clearTimeout(timeout.current);
          }
          timeout.current = setTimeout(() => {
            setKey(key);
            if (!errors[0]) {
              setErrorText('');
              return;
            }
            setErrorText(
              errors[0]?.includes('is required')
                ? children?.props?.label
                  ? `请输入${children?.props?.label}`
                  : '此项是必填的'
                : errors[0]
            );
            clearTimeout(timeout.current);
            timeout.current = null;
          }, 500);
          return '';
        }}
      </Field>
      <View
        style={{
          display: errorText ? 'block' : 'none',
          paddingLeft: padding + 'rpx',
        }}
        className={styles.error}>
        {errorText}
      </View>
    </View>
  );
};
export default Index;
