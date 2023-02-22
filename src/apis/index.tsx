import Request from './request';
import storage from '@/utils/storage';
import { showModal } from 'remax/wechat';
import { navigateBack, uploadFile, navigateTo } from 'remax/wechat';
import { baseUrl } from '@/consts/index';

export const { request, interceptors } = new Request({
  baseUrl,
});

interceptors.request.use((options) => {
  const token = storage.get('token') || '';
  options.data = options.data || {};
  options.header = options.header || {};
  if (token) {
    options.header['Authorization'] = `BearerApp ${token}`;
  }

  if (options.dataType !== 'json') {
    options.header['content-type'] = 'application/x-www-form-urlencoded';
  }

  options.data = {
    ...options.data,
  };
  console.log('request', options);
  options.data.doctorId || delete options.data.doctorId;
  options.data = {
    ...options.data,
  };
  return options;
});

interceptors.response.use(
  async (
    {
      statusCode,
      data,
      data: { code = 200, message = '网络请求错误' } = {},
      ...agr
    },
    config,
    isHideError
  ) => {
    if (code === 401) {
      storage.del('token');
    }
    if (code === 407) {
      showModal({
        title: '提示',
        content: data?.message || '您不是会员',
        confirmText: '去充值',
        success: (e) => {
          if (e.confirm) {
            navigateTo({
              url: '/pages/vpis/index',
            });
          }
        },
      });
    }
    console.log('response', data);
    if (code === 200) {
      data.data = data.data || { ...data };
    } else {
      return Promise.reject(data);
    }
    return Promise.resolve(data.data);
  }
);

export type LoginReq = {
  avatarurl?: string;
  city?: string;
  code?: string;
  country?: string;
  mobile?: string;
  nickname?: string;
  province?: string;
};

export type Banner = {
  /**
   * id
   */
  id: string;
  /**
   * 跳转链接
   */
  jumpLink: string;
  /**
   * 标题
   */
  title: string;
  /**
   * 轮播图url
   */
  url: string;
};

const apis = {
  // 登录
  login: (data: LoginReq) => {
    return request<string>({
      method: 'POST',
      url: '/wx/api/auth/wxClickLogin',
      data,
      dataType: 'json',
    }).then((response) => {
      storage.set('token', response);
      navigateBack();
      return response;
    });
  },
  // 获取用户信息
  userInfo: () => {
    return request<API.UserInfo>({
      method: 'GET',
      url: '/wx/api/auth/info',
    });
  },
  findIndexBannerList: () => {
    return request<Banner[]>({
      method: 'GET',
      url: '/wx/api/index/findIndexBannerList',
    });
  },
  uploadFile: (path: string) => {
    const token = storage.get('token') || '';
    return uploadFile({
      url: `${baseUrl}/wx/api/file/upload`,
      filePath: path,
      name: 'file',
      header: {
        Authorization: `BearerApp ${token}`,
      },
    }).then((res) => {
      return JSON.parse(res.data);
    });
  },
};

export default apis;
