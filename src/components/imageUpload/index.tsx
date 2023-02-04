import React, { useState, useRef, useEffect } from 'react';
import { Grid } from 'anna-remax-ui';
import ImageUpload from '@/components/image-upload';
import { View } from 'remax/wechat';
import styles from './index.less';
import type { ImageUploadProps } from 'anna-remax-ui/esm/image-upload';

interface NewImageUploadProps extends ImageUploadProps {
  label?: string;
}

export const Img: React.FC<NewImageUploadProps> = ({ label, ...props }) => {
  return (
    <View className={styles.image}>
      <Grid
        columns={1}
        gutter={[16, 16]}
        data={[<View>{label}</View>, <ImageUpload {...props} />]}>
        {(col) => col}
      </Grid>
    </View>
  );
};

export default Img;
