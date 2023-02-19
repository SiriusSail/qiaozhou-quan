import { createContainer } from 'unstated-next';
import useApi from '@/apis';
import storage from '@/utils/storage';
import { navigateTo, showModal } from 'remax/wechat';
import { useRequest } from 'ahooks';
import dayjs from 'dayjs';
import { useMemo, useEffect, useCallback } from 'react';
import { getMerchantByUserId } from '@/apis/merchant';
import type { MerchantApplyParams } from '@/apis/merchant';

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
    getUserInfo,
    getMerchant,
  };
});
