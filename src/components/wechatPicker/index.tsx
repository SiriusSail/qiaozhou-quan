import React, { useState, useRef, useEffect } from 'react';
import { Picker } from 'remax/wechat';
import type { PickerProps } from 'remax/wechat';

export const Img: React.FC<
  PickerProps & {
    placeholder?: string;
  }
> = ({ value: _value, onChange, placeholder = '请选择时间', ...props }) => {
  const [value, setValue] = useState(_value);
  const valueRef = useRef(_value);
  useEffect(() => {
    if (valueRef.current !== _value) {
      setValue(_value);
    }
  }, [_value]);
  return (
    <Picker {...props} onChange={(e) => setValue(e.detail.value)}>
      {value || placeholder}
    </Picker>
  );
};

export default Img;
