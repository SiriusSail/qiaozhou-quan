import React, { useState, useRef, useEffect, useCallback } from 'react';
import { View } from 'remax/one';
import Image from '@/components/image';
import { previewImage, chooseMedia } from 'remax/wechat';
import { sync, to, deepClone } from 'anna-remax-ui/esm/_util';
import { getPrefixCls } from 'anna-remax-ui/esm/common';
import Icon from 'anna-remax-ui/esm/icon';
import apis from '@/apis/index';
import classnames from 'classnames';

const prefixCls = getPrefixCls('avatar-upload');

export interface ImageProps {
  key: string;
  url: string;
}

export type DataItem = (ImageProps & { tempFilePath?: string }) | string;

export interface ImageUploadProps {
  // files?: DataItem[];
  value?: DataItem;
  className?: string;
  multiple?: boolean;
  multipleCount?: number;
  sizeType?: string[];
  sourceType?: string[];
  disabled?: boolean;
  children?: React.ReactNode;
  onChange?: (e: DataItem) => void;
}

const initFiles: any = undefined;

const ImageUpload = (props: ImageUploadProps) => {
  const {
    value: _value = initFiles,
    onChange: _onChange,
    multiple,
    multipleCount,
    sizeType,
    sourceType,
    disabled,
    className,
  } = props;

  const [files, setFiles] = useState(_value);
  const filesRef = useRef(JSON.stringify(_value));
  useEffect(() => {
    if (filesRef.current !== JSON.stringify(_value)) {
      filesRef.current = JSON.stringify(_value);
      setFiles(_value);
    }
  }, [_value]);

  const onChange = useCallback(
    (v: DataItem) => {
      filesRef.current = JSON.stringify(v);
      setFiles(v);
      _onChange?.(v);
    },
    [_onChange]
  );

  const handleClickImage = () => {
    let urls = files;
    const current = '0';
    if (typeof files !== 'string') {
      urls = (files as ImageProps).url || (files as any).tempFilePath;
    }
    previewImage({
      urls: [urls],
      current,
      enablesavephoto: true,
      enableShowPhotoDownload: true,
    });
  };

  const handleAdd = async () => {
    if (disabled) {
      return;
    }
    const params: any = {};
    if (multiple) {
      params.multiple = true;
      params.count = 99;
    }
    if (multipleCount) {
      params.count = multipleCount;
    }
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
      onChange?.({ ...targetFiles, url: res.data });
    });
  };
  return (
    <View className={classnames(prefixCls, className)}>
      {files ? (
        <View
          key={(files as ImageProps).key}
          className={`${prefixCls}-item`}
          onTap={() => (disabled ? handleClickImage() : handleAdd())}>
          <Image
            mode='widthFix'
            height='50rpx'
            width='50rpx'
            src={
              (files as any).tempFilePath ||
              (files as ImageProps).url ||
              (files as string)
            }
          />
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
