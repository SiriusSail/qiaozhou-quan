// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import Visible from './painter/painter';
import React from 'react';
import Image from '@/components/Image';
import { View } from 'remax/wechat';
import { useState, useEffect } from 'react';
import {
  showLoading,
  hideLoading,
  saveImageToPhotosAlbum,
  showToast,
  getSetting,
} from 'remax/wechat';
import { Button, Icon } from 'anna-remax-ui';

type Image = {
  type: 'image';
  url: string;
  css?: React.CSSProperties;
};
type Qrcode = {
  type: 'qrcode';
  content: string;
  css?: React.CSSProperties;
};
type Text = {
  type: 'text';
  text: string;
  css?: React.CSSProperties;
};

type ImgDraw = {
  width: string;
  height: string;
  background: string;
  views: (Image | Text | Qrcode)[];
};

interface Props {
  imgDraw?: ImgDraw;
  show: boolean;
}

const Index = ({ imgDraw, show }: Props) => {
  const [src, setSrc] = useState();
  useEffect(() => {
    if (show === true && !src) {
      showLoading();
    }
  }, [show, src]);
  return (
    <View style={{ position: 'relative' }}>
      <Image src={src} width={imgDraw?.width} height={imgDraw?.height} />
      <View
        style={{
          paddingTop: '20rpx',
          justifyContent: 'space-around',
          display: 'flex',
        }}>
        <Button
          onTap={() => {
            showLoading({
              title: '正在保存...',
              mask: true,
            });
            saveImageToPhotosAlbum({
              filePath: src,
              success: (res) => {
                showToast({
                  title: '保存成功',
                  icon: 'none',
                });
              },
              fail: (res) => {
                getSetting({
                  success: (res) => {
                    const authSetting = res.authSetting;
                  },
                });
                setTimeout(() => {
                  hideLoading();
                }, 300);
              },
            });
          }}
          style={{ width: '400rpx' }}
          look='orange'>
          保存到相册
          <Icon style={{ paddingLeft: '10rpx' }} type='down' color='#fff' />
        </Button>
        {/* <Button style={{ width: '200rpx' }} look='secure'>
          分享
          <Icon style={{ paddingLeft: '10rpx' }} type='forward' color='#fff' />
        </Button> */}
      </View>
      <View
        style={{
          position: 'absolute',
          top: -99999,
        }}>
        {(show || src) && (
          <Visible
            palette={imgDraw}
            bindimgOK={(e: any) => {
              hideLoading();
              console.log(e);
              setSrc(e.detail.path);
            }}
          />
        )}
      </View>
    </View>
  );
};
export default Index;
