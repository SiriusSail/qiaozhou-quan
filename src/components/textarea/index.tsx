import React, { useCallback } from 'react';
import { View, Textarea } from 'remax/wechat';
import './index.less';
import type { TextareaProps, GenericEvent } from 'remax/wechat';
import classNames from 'classnames';

interface TextareaPropsType extends TextareaProps {
  border?: boolean;
  label?: string;
  onChange?: (v: string, e: GenericEvent) => void;
}

export const TextareaExtend: React.FC<TextareaPropsType> = ({
  label,
  onChange,
  className,
  border = true,
  ...props
}) => {
  const onInput = useCallback(
    (event: GenericEvent) => {
      onChange?.(event?.detail?.value, event);
    },
    [onChange]
  );

  return (
    <View className='anna-cell'>
      <View className='anna-cell-container'>
        <View
          className='anna-cell-container-main'
          style={{ flexDirection: 'column', width: '100%' }}>
          <View className='anna-cell-container-main-left anna-cell-container-main-left-input'>
            <View className='anna-cell-container-main-left-label'>
              <View className='anna-cell-container-main-left-label-value'>
                {label}
              </View>
            </View>
          </View>
          <View className='anna-cell-container-main-right'>
            <View className='anna-cell-container-main-right-value'>
              <View className='anna-input-container'>
                <Textarea
                  className={classNames(
                    {
                      'anna-textarea-border': border,
                    },
                    'anna-textarea'
                  )}
                  onInput={onInput}
                  {...props}
                />
              </View>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default TextareaExtend;
