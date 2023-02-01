import { createContainer } from 'unstated-next';
import useApi from '@/apis';
import storage from '@/utils/storage';
import { useRequest } from 'ahooks';

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

  return {
    userInfo,
    getUserInfo,
  };
});
