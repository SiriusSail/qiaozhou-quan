import React from 'react';
import { View } from 'remax/wechat';
import styles from './index.less';
import type { ViewProps } from 'remax/wechat';
import classNames from 'classnames';
import { previewImage } from 'remax/wechat';

interface ImagePropsType extends ViewProps {
  width?: string;
  height?: string;
  preview?: false | string[];
  src?: string;
}

export const Img: React.FC<ImagePropsType> = ({
  width,
  height,
  className,
  style,
  src,
  preview = [src],
  ...props
}) => {
  const handleClickImage = () => {
    if (!src || preview === false) return;
    console.log(
      src.replace(/_s/g, ''),
      preview.filter((item) => !!item).map((item) => item!.replace(/s_/g, ''))
    );
    previewImage({
      urls: preview
        .filter((item) => !!item)
        .map((item) => item!.replace(/s_/g, '')),
      current: src.replace(/s_/g, ''),
      enablesavephoto: true,
      enableShowPhotoDownload: true,
    });
  };
  return (
    <View
      onClick={handleClickImage}
      className={classNames(styles.back, className)}
      style={{ backgroundImage: `url(${src})`, height, width, ...style }}
      {...props}
    />
  );
};

export default Img;
