import { createContainer } from 'unstated-next';
import useApi from '@/apis';
import storage from '@/utils/storage';
import { useRequest } from 'ahooks';
import dayjs from 'dayjs';
import { useMemo } from 'react';

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

  return {
    userInfo,
    isVip,
    getUserInfo,
  };
});
