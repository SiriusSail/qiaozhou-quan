import storage from '@/utils/storage';
import getCurrentPageUrl from '@/utils/getCurrentPageUrl';

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

const index = (v: ShareType = {}) => {
  const invitationCode = storage.get('invitationCode');

  const { path = getCurrentPageUrl().url, ...data } = v || {};
  const config = {
    ...data,
    path: path?.includes('invitationCode')
      ? path
      : `${path}${
          path?.includes('?') ? '&invitationCode=' : '?invitationCode='
        }${invitationCode}`,
  };
  console.log(config);
  return config;
};

export default index;
