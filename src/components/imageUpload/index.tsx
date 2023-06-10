import React from 'react';
import { Row, Col } from 'anna-remax-ui';
import ImageUpload from '@/components/image-upload';
import { View, Text } from 'remax/wechat';
import styles from './index.less';
import type { ImageUploadProps } from 'anna-remax-ui/esm/image-upload';

interface NewImageUploadProps extends ImageUploadProps {
  label?: string;
  columns?: number;
}

export const Img: React.FC<NewImageUploadProps> = ({
  label,
  maxCount,
  ...props
}) => {
  return (
    <View className={styles.image}>
      <Row gutter={16}>
        <Col span={24}>
          <View className={styles.label}>
            {label}{' '}
            <Text style={{ fontSize: '22rpx', color: '#999999' }}>
              (最多{maxCount}张)
            </Text>
          </View>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={24}>
          <ImageUpload maxCount={maxCount} {...props} />
        </Col>
      </Row>
    </View>
  );
};

export default Img;
