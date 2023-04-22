import React from 'react';
import { View } from 'remax/wechat';
import './index.less';
import type { GenericEvent } from 'remax/wechat';
import { Button } from 'anna-remax-ui';
import type { ButtonProps } from 'anna-remax-ui/esm/button';

interface ButtonPropsType extends ButtonProps {
  border?: boolean;
  noHeight?: boolean;
  label?: string;
  onChange?: (v: string, e: GenericEvent) => void;
}

export const BottomButton: React.FC<ButtonPropsType> = (props) => {
  return (
    <View className='bottom-button'>
      {!props.noHeight && <View className='bottom-button-height'></View>}
      <View className='bottom-button-content'>
        <Button look='orange' {...props} />
      </View>
    </View>
  );
};

export default BottomButton;
