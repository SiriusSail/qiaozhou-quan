import { createContainer } from 'unstated-next';
import useApi from '@/apis';
import storage from '@/utils/storage';
import { navigateTo, showModal } from 'remax/wechat';
import { useRequest } from 'ahooks';
import dayjs from 'dayjs';
import { useMemo, useRef, useCallback } from 'react';
import { getMerchantByUserId } from '@/apis/merchant';
import type { MerchantApplyParams } from '@/apis/merchant';

type ShareType = {
  /**
   * 	转发标题	当前小程序名称
   */
  title?: string;
  /**
   * 	转发路径	当前页面 path ，必须是以 / 开头的完整路径
   */
  path?: string;
  /**
   * 	自定义图片路径，可以是本地文件路径、代码包文件路径或者网络图片路径。支持 PNG 及JPG。显示图片长宽比是 5:4。	使用默认截图	1.5.0
   */
  imageUrl?: string;
  /**
   * 	如果该参数存在，则以 resolve 结果为准，如果三秒内不 resolve，分享会使用上面传入的默认参数		2.12.0
   */
  promise?: Promise<any>;
};

export default createContainer(() => {
  const { data: userInfo, run: getUserInfo } = useRequest(
    () => {
      if (storage.get('token')) {
        return useApi.userInfo();
      } else {
        return Promise.resolve(undefined);
      }
    },
    {
      manual: !storage.get('token'),
    }
  );
  const isVip = useMemo(
    () => dayjs(userInfo?.memberEndTime).diff(dayjs()) > 0,
    [userInfo]
  );

  const share = useRef<ShareType>();

  const { data: merchant, run: getMerchant } = useRequest(
    () => {
      if (!userInfo!.id) {
        return Promise.resolve({} as MerchantApplyParams);
      }
      return getMerchantByUserId(userInfo!.id);
    },
    {
      manual: !userInfo?.id,
      refreshDeps: [userInfo?.id],
    }
  );

  const valiLoading = useCallback((props?: { isHideModal: boolean }) => {
    const token = storage.get('token');
    if (!token) {
      if (!props?.isHideModal) {
        showModal({
          title: '提示',
          content: '您尚未登录',
          confirmText: '去登陆',
          success: (e) => {
            if (e.confirm) {
              navigateTo({
                url: '/pages/login/index',
              });
            }
          },
        });
      }
      return false;
    }
    return true;
  }, []);

  const valiVip = useCallback(
    ({ isHideModal, content }: { isHideModal?: boolean; content?: string }) => {
      if (!valiLoading()) return false;
      if (isVip) return true;
      if (!isHideModal) {
        showModal({
          title: '提示',
          content,
          confirmText: '去充值',
          success: (e) => {
            if (e.confirm) {
              navigateTo({
                url: '/pages/vips/index',
              });
            }
          },
        });
      }
      return false;
    },
    [isVip, valiLoading]
  );

  return {
    userInfo,
    isVip,
    valiLoading,
    valiVip,
    merchant,
    share,
    getUserInfo,
    getMerchant,
  };
});
