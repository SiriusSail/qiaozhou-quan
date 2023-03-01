import React, { useState, useRef, useEffect } from 'react';
import { Picker } from 'anna-remax-ui';
import { View } from 'remax/wechat';
import type { PickerProps } from 'anna-remax-ui/esm/picker';

export const Img: React.FC<PickerProps> = ({
  value: _value,
  onChange,
  ...props
}) => {
  const [value, setValue] = useState(_value);
  const valueRef = useRef(_value);
  useEffect(() => {
    if (valueRef.current !== _value) {
      setValue(_value);
    }
  }, [_value]);
  return (
    <View className='anna-picker'>
      <Picker
        value={value}
        onChange={(v) => {
          valueRef.current = v.key;
          setValue(v.key);
          onChange?.(v.key);
        }}
        {...props}
      />
    </View>
  );
};

export default Img;
