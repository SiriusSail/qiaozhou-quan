import React, { useState, useRef, useEffect } from 'react';
import { ImageUpload, Grid } from 'anna-remax-ui';
import { View } from 'remax/wechat';
import styles from './index.less';
import type { ImageUploadProps } from 'anna-remax-ui/esm/image-upload';

interface NewImageUploadProps extends ImageUploadProps {
  value?: ImageUploadProps['files'];
  label?: string;
}

export const Img: React.FC<NewImageUploadProps> = ({
  value: _value,
  onChange,
  label,
  ...props
}) => {
  const [files, setFiles] = useState(_value);
  const filesRef = useRef(_value);
  useEffect(() => {
    if (filesRef.current !== _value) {
      setFiles(_value);
    }
  }, [_value]);
  return (
    <View className={styles.image}>
      <Grid
        columns={1}
        gutter={[16, 16]}
        data={[
          <View>{label}</View>,
          <ImageUpload
            files={files}
            onChange={(v) => {
              console.log(v);
              filesRef.current = v;
              setFiles(v);
              onChange?.(v);
            }}
            {...props}
          />,
        ]}>
        {(col) => col}
      </Grid>
    </View>
  );
};

export default Img;
