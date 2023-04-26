import React, { useRef } from 'react';
import { Textarea, View } from 'remax/wechat';
import BottomButton from '@/components/bottomButton';
import storage from '@/utils/storage';

const Index = () => {
  const val = useRef(storage.get('remarks') || '');
  return (
    <View>
      <Textarea
        value={val.current}
        onInput={(e) => {
          val.current = e.detail.value;
        }}
        maxlength={50}
        placeholder='请输入口味，偏好等要求'
      />
      <BottomButton
        onTap={() => {
          storage.set('remarks', val.current);
        }}>
        完成
      </BottomButton>
    </View>
  );
};
export default Index;
