import React from 'react';
import { View, Image } from 'remax/wechat';
import styles from './index.less';
import type { ImageProps } from 'remax/wechat';
import classNames from 'classnames';

interface ImagePropsType extends ImageProps {
  width?: string;
  height?: string;
}

export const Img: React.FC<ImagePropsType> = ({
  width,
  height,
  className,
  src = '/images/discover.png',
  ...props
}) => {
  return (
    <View className={styles['image-container']} style={{ height, width }}>
      <Image
        className={classNames(className, styles.image)}
        src={src}
        {...props}
      />
    </View>
  );
};

export default Img;
