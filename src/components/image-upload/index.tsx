import React, { useCallback, useRef, useMemo } from 'react';
import { View } from 'remax/one';
import { previewImage, chooseMedia, showToast } from 'remax/wechat';
import { sync, to, deepClone } from 'anna-remax-ui/esm/_util';
import Icon from 'anna-remax-ui/esm/icon';
import { urlPath } from '@/consts/index';
import classnames from 'classnames';
import addimage from '@/components/avatarUpload/images/addimage.png';
import apis from '@/apis/index';
import { useControllableValue } from 'ahooks';
import './index.less';
import BackImage from '@/components/backImage';

export interface ImageUploadProps {
  // files?: DataItem[];
  value?: string[];
  defaultValue?: string[];
  className?: string;
  multiple?: boolean;
  columns?: number;
  sizeType?: string[];
  sourceType?: string[];
  style?: React.CSSProperties;
  imageStyle?: React.CSSProperties;
  deletable?: boolean;
  disabled?: boolean;
  maxCount?: number;
  width?: number;
  height?: number;
  children?: React.ReactNode;
  onChange?: (e: string[]) => void;
}

const initFiles: any[] = [];

const ImageUpload = ({
  value = initFiles,
  defaultValue = initFiles,
  onChange: _onChange,
  multiple,
  sizeType,
  sourceType,
  style,
  imageStyle,
  columns = 3,
  height,
  width = 129,
  deletable = true,
  disabled,
  maxCount = 99,
  className,
  children,
}: ImageUploadProps) => {
  const imaStyle = useRef({
    height: height ? height + 'rpx' : 64 / columns + 'vw',
    ...imageStyle,
  });
  const addSize = useRef(height ? height * 0.6 + 'rpx' : 36 / columns + 'vw');
  const gridTemplateColumns = useMemo(() => {
    const a = [];
    for (let i = 0; i < columns; i++) {
      a.push('1fr');
    }
    return a.join(' ');
  }, [columns]);
  const [files, setFiles] = useControllableValue<string[]>(
    {
      // value,
      defaultValue,
      onChange: _onChange,
    },
    {
      defaultValue: [],
    }
  );

  const onChange = useCallback(
    (v: string[]) => {
      setFiles(v);
    },
    [setFiles]
  );

  const handleClickImage = (index: number) => {
    const current = index as any as string;
    previewImage({
      urls: files as string[],
      current,
      enablesavephoto: true,
      enableShowPhotoDownload: true,
    });
  };

  const handleDelete = useCallback(
    (e: any, index: number) => {
      e.stopPropagation();
      const newValue = deepClone(files);
      newValue.splice(index, 1);
      onChange?.(newValue);
    },
    [files, onChange]
  );

  const handleAdd = useCallback(async () => {
    if (disabled) {
      return;
    }
    const addNumber = maxCount - (files?.length || 0);
    const params: any = {
      count: addNumber,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
    };

    if (multiple) {
      params.multiple = true;
      params.count = 99;
    } else {
      params.multiple = false;
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
    const newFiles = targetFiles.slice(0, addNumber);

    const resMap = newFiles.map((item: any) =>
      apis.uploadFile(item.tempFilePath).then((res: any) => {
        const resUrl = (res.data || res.message) as string;
        const [, src] = resUrl.split('/home/data/upload/');
        const url = `${urlPath}${src}`;
        console.log(url);
        return url;
      })
    );

    Promise.all(resMap)
      .then((res) => {
        onChange?.(files.concat(res));
      })
      .catch(() => {
        showToast({
          title: '上传失败',
          icon: 'error',
        });
      });
  }, [disabled, files, multiple, onChange, maxCount, sizeType, sourceType]);

  return (
    <View
      className={classnames('image-upload', className)}
      style={{
        gridTemplateColumns,
      }}>
      {files?.map?.((item, index: number) => (
        <View
          key={item}
          className='image-upload-item'
          style={imaStyle.current}
          onTap={() => handleClickImage(index)}>
          {deletable ? (
            <View className='image-upload-item-delete'>
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
          <BackImage preview={false} style={imaStyle.current} src={item} />
        </View>
      ))}
      {!maxCount || !files || files.length < maxCount ? (
        <View
          onTap={handleAdd}
          style={imaStyle.current}
          className='image-upload-add'>
          {children ?? (
            <BackImage
              preview={false}
              src={addimage}
              height={addSize.current}
              width={addSize.current}
            />
          )}
        </View>
      ) : null}
    </View>
  );
};

export default ImageUpload;
