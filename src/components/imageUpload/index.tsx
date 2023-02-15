import React, { useState, useRef, useEffect } from 'react';
import { Row, Col } from 'anna-remax-ui';
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
      <Row gutter={16}>
        <Col span={24}>{label}</Col>
      </Row>
      <Row gutter={16}>
        <Col span={24}>
          <ImageUpload {...props} />
        </Col>
      </Row>
    </View>
  );
};

export default Img;
