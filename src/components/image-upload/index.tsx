import React, { useState, useRef, useEffect, useCallback } from 'react';
import { View, Image } from 'remax/one';
import { previewImage, chooseMedia, uploadFile } from 'remax/wechat';
import { sync, to, deepClone } from 'anna-remax-ui/esm/_util';
import { getPrefixCls } from 'anna-remax-ui/esm/common';
import Icon from 'anna-remax-ui/esm/icon';
import { baseUrl } from '@/consts/index';
import classnames from 'classnames';
import apis from '@/apis/index';

const prefixCls = getPrefixCls('image-upload');

export interface ImageProps {
  key: string;
  url: string;
}

export type DataItem = ImageProps | string;

export interface ImageUploadProps {
  // files?: DataItem[];
  value?: DataItem[];
  className?: string;
  multiple?: boolean;
  multipleCount?: number;
  sizeType?: string[];
  sourceType?: string[];
  deletable?: boolean;
  disabled?: boolean;
  maxCount?: number;
  children?: React.ReactNode;
  onChange?: (e: DataItem[]) => void;
}

const initFiles: any[] = [];

const ImageUpload = ({
  value: _value = initFiles,
  onChange: _onChange,
  multiple,
  multipleCount,
  sizeType,
  sourceType,
  deletable = true,
  disabled,
  maxCount,
  className,
  children,
}: ImageUploadProps) => {
  const [files, setFiles] = useState(_value);
  const filesRef = useRef(JSON.stringify(_value));
  useEffect(() => {
    console.log(filesRef.current, JSON.stringify(_value));
    if (filesRef.current !== JSON.stringify(_value)) {
      filesRef.current = JSON.stringify(_value);
      setFiles(_value);
    }
  }, [_value]);

  const onChange = useCallback(
    (v: DataItem[]) => {
      console.log(v);
      filesRef.current = JSON.stringify(v);
      setFiles(v);
      _onChange?.(v);
    },
    [_onChange]
  );

  const handleClickImage = (index: number) => {
    let urls = files;
    const current = index as any as string;
    if (typeof files[index] !== 'string') {
      urls = files?.map?.(
        (i) => (i as ImageProps).url || (i as any).tempFilePath
      );
    }
    previewImage({
      urls: urls as string[],
      current,
      enablesavephoto: true,
      enableShowPhotoDownload: true,
    });
  };

  const handleDelete = useCallback(
    (e: any, index: number) => {
      e.stopPropagation();
      let newValue = deepClone(files);
      newValue.splice(index, 1);
      newValue = newValue.map((item: DataItem, index: number) => {
        const newItem = item;
        if (typeof newItem === 'string') {
          return newItem;
        }
        (newItem as ImageProps).key = String(index);
        return newItem;
      });
      onChange?.(newValue);
    },
    [files, onChange]
  );

  const handleAdd = useCallback(async () => {
    if (disabled) {
      return;
    }
    const params: any = {};
    if (multiple) {
      params.multiple = true;
      params.count = 99;
    } else {
      params.multiple = false;
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
    const targetFiles = resc.filePaths
      ? resc.filePaths.map((i: any) => i)
      : resc.tempFiles?.map?.((i: any) => i);

    targetFiles.forEach((item: any) =>
      apis.uploadFile(item.tempFilePath).then((res) => {
        const newFiles = files.concat({ ...item, url: res.data });
        onChange?.(newFiles);
      })
    );
  }, [
    disabled,
    files,
    multiple,
    multipleCount,
    onChange,
    sizeType,
    sourceType,
  ]);

  return (
    <View className={classnames(prefixCls, className)}>
      {files?.map?.((item: DataItem, index: number) => (
        <View
          key={(item as ImageProps)?.key || index}
          className={`${prefixCls}-item`}
          onTap={() => handleClickImage(index)}>
          {deletable ? (
            <View className={`${prefixCls}-item-delete`}>
              <View
                style={{ height: '24px' }}
                onTap={(e) => {
                  handleDelete(e, index);
                }}>
                <Icon
                  type='close'
                  size='24px'
                  color='#FDFFFD'
                  style={{
                    width: '24px',
                    height: '24px',
                    verticalAlign: 'text-top',
                  }}
                />
              </View>
            </View>
          ) : null}
          <Image
            mode='widthFix'
            src={
              (item as any)?.tempFilePath ||
              (item as ImageProps)?.url ||
              (item as string)
            }
          />
        </View>
      ))}
      {!maxCount || files.length < maxCount ? (
        <View onTap={handleAdd}>
          {children ?? (
            <View className={`${prefixCls}-add`}>
              <Icon type='add' size='48px' color='#BABEC6' />
            </View>
          )}
        </View>
      ) : null}
    </View>
  );
};

export default ImageUpload;
