import React, { useState, useRef, useEffect, useCallback } from 'react';
import { View } from 'remax/one';
import Image from '@/components/image';
import { previewImage, chooseMedia } from 'remax/wechat';
import { sync, to, deepClone } from 'anna-remax-ui/esm/_util';
import { getPrefixCls } from 'anna-remax-ui/esm/common';
import Icon from 'anna-remax-ui/esm/icon';
import apis from '@/apis/index';
import classnames from 'classnames';
import { useControllableValue } from 'ahooks';
import { urlPath } from '@/consts/index';

const prefixCls = getPrefixCls('avatar-upload');

// files?: DataItem[];
export interface ImageUploadProps {
  // files?: DataItem[];
  value?: string;
  defaultValue?: string;
  className?: string;
  multiple?: boolean;
  sizeType?: string[];
  sourceType?: string[];
  deletable?: boolean;
  disabled?: boolean;
  children?: React.ReactNode;
  onChange?: (e: string) => void;
}

const ImageUpload = ({
  value,
  onChange: _onChange,
  multiple,
  defaultValue,
  sizeType,
  sourceType,
  disabled,
  className,
}: ImageUploadProps) => {
  const [files, setFiles] = useControllableValue<string>({
    value,
    defaultValue,
    onChange: _onChange,
  });

  const onChange = useCallback(
    (v: string) => {
      setFiles(v);
    },
    [setFiles]
  );

  const handleClickImage = () => {
    previewImage({
      urls: [files],
      current: '0',
      enablesavephoto: true,
      enableShowPhotoDownload: true,
    });
  };

  const handleAdd = async () => {
    if (disabled) {
      return;
    }
    const params: any = {
      count: 1,
    };
    if (sizeType) {
      params.sizeType = sizeType;
    }
    if (sourceType) {
      params.sourceType = sourceType;
    }
    const [errc, resc] = await to(sync(chooseMedia, params));
    if (errc) {
      return;
    }
    const targetFiles = resc.filePaths ? resc.filePaths[0] : resc.tempFiles[0];
    apis.uploadFile(targetFiles.tempFilePath).then((res) => {
      const resUrl = (res.data || res.message) as string;
      const [, src] = resUrl.split('/home/data/upload/');
      const url = `${urlPath}${src}`;
      onChange?.(url);
    });
  };
  return (
    <View className={classnames(prefixCls, className)}>
      {files ? (
        <View
          key={files}
          className={`${prefixCls}-item`}
          onTap={() => (disabled ? handleClickImage() : handleAdd())}>
          <Image mode='widthFix' height='50rpx' width='50rpx' src={files} />
        </View>
      ) : (
        <View onTap={handleAdd}>
          <View className={`${prefixCls}-add`}>
            <Icon type='add' size='48px' color='#BABEC6' />
          </View>
        </View>
      )}
    </View>
  );
};

export default ImageUpload;
