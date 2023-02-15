import { createContainer } from 'unstated-next';
import useApi from '@/apis';
import storage from '@/utils/storage';
import { useRequest } from 'ahooks';
import dayjs from 'dayjs';
import { useMemo, useEffect } from 'react';
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

  return {
    userInfo,
    isVip,
    merchant,
    getUserInfo,
    getMerchant,
  };
});
