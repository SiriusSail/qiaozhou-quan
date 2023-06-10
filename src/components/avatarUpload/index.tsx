import React, { useState, useRef, useEffect, useCallback } from 'react';
import { View } from 'remax/one';
import {
  previewImage,
  chooseMedia,
  showLoading,
  hideLoading,
} from 'remax/wechat';
import { sync, to } from 'anna-remax-ui/esm/_util';
import apis from '@/apis/index';
import classnames from 'classnames';
import { useControllableValue } from 'ahooks';
import { urlPath } from '@/consts/index';
import cameraSrc from './images/camera.png';
import addimage from './images/addimage.png';
import './index.less';
import BackImage from '@/components/backImage';

// files?: DataItem[];
export interface ImageUploadProps {
  // files?: DataItem[];
  value?: string;
  defaultValue?: string;
  size?: string | number;
  className?: string;
  multiple?: boolean;
  sizeType?: string[];
  style?: React.CSSProperties;
  sourceType?: string[];
  deletable?: boolean;
  disabled?: boolean;
  children?: React.ReactNode;
  icon?: React.ReactNode;
  onChange?: (e: string) => void;
}

const ImageUpload = ({
  value,
  onChange: _onChange,
  multiple,
  size = 50,
  defaultValue,
  style,
  sizeType,
  icon,
  sourceType,
  disabled,
  className,
}: ImageUploadProps) => {
  const sizeRef = useRef(size + 'rpx');
  const defaultIcon = useRef(
    <BackImage
      preview={false}
      className='avatar-upload-add-icon'
      src={cameraSrc}
      height={size / 3 + 'rpx'}
      width={size / 3 + 'rpx'}
    />
  );

  const [files, setFiles] = useControllableValue<string>({
    // value,
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

    showLoading();
    apis
      .uploadFile(targetFiles.tempFilePath)
      .then((res) => {
        const resUrl = (res.data || res.message) as string;
        const [, src] = resUrl.split('/home/data/upload/');
        const url = `${urlPath}${src}`;
        onChange?.(url);
        hideLoading();
      })
      .catch((res) => {
        hideLoading();
      });
  };
  return (
    <View
      className={classnames('avatar-upload', className)}
      style={{ borderRadius: '50%', border: '2rpx solid #E8813E', ...style }}>
      {files ? (
        <BackImage
          height={sizeRef.current}
          width={sizeRef.current}
          preview={[files]}
          style={{
            borderRadius: '50%',
            border: '2rpx solid #E8813E',
            ...style,
          }}
          onTap={() => (disabled ? undefined : handleAdd())}
          src={files}
        />
      ) : (
        <View
          onTap={handleAdd}
          style={{ height: sizeRef.current, width: sizeRef.current, ...style }}
          className='avatar-upload-add'>
          <BackImage
            preview={false}
            src={addimage}
            height={size / 2 + 'rpx'}
            width={size / 2 + 'rpx'}
          />
          {icon === undefined ? defaultIcon.current : icon}
        </View>
      )}
    </View>
  );
};

export default ImageUpload;
