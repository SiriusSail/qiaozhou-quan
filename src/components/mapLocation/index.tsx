import React, { useState, useRef, useEffect } from 'react';
import { FieldProps } from 'rc-field-form/es/Field';
import { Field } from 'rc-field-form';
import { View, navigateTo } from 'remax/wechat';
import { Space, Icon } from 'anna-remax-ui';
import { usePageEvent, requirePlugin } from 'remax/macro';
const chooseLocation = requirePlugin('chooseLocation');

const key = '4FOBZ-PGU6S-PMNOS-6L4QG-XIIHQ-EWBGX'; //使用在腾讯位置服务申请的key
const referer = '饕餮校园'; //调用插件的app的名称
const category = '大学,小区';

type Location = {
  address: string;
  city: string;
  district: string;
  latitude: number;
  longitude: number;
  name: string;
  province: string;
};

type MapLocationProps = {
  placeholder?: string;
  value?: string;
  className?: string;
  icon?: string;
  disabled?: boolean;
  onChange?: (e: string) => void;
  onSelect?: (e: Location) => void;
};

const Index = ({
  placeholder = '请选择位置',
  value: _value,
  onChange,
  onSelect,
  icon,
  disabled,
}: MapLocationProps) => {
  const [value, setValue] = useState(_value);
  const valueRef = useRef(JSON.stringify(_value));
  useEffect(() => {
    if (valueRef.current !== JSON.stringify(_value)) {
      valueRef.current = JSON.stringify(_value);
      setValue(_value);
    }
  }, [_value]);
  usePageEvent('onShow', () => {
    const location = chooseLocation.getLocation() as Location;
    if (!location) {
      return;
    }
    valueRef.current = JSON.stringify(location?.address);
    setValue(location?.address);
    onChange?.(location?.address);
    onSelect?.(location);
  });
  usePageEvent('onUnload', () => {
    chooseLocation.setLocation(null);
  });
  return (
    <View
      onTap={() => {
        navigateTo({
          url:
            'plugin://chooseLocation/index?key=' +
            key +
            '&referer=' +
            referer +
            '&category=' +
            category,
        });
      }}>
      <Space>
        <View>
          {value ? (
            value
          ) : (
            <View className='anna-form-value-placeholder'>{placeholder}</View>
          )}
        </View>
        <Icon type='location' size='36px' />
      </Space>
    </View>
  );
};
export default Index;
