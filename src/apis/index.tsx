import Request from './request';
import storage from '@/utils/storage';
import { navigateBack } from 'remax/wechat';

export const { request, interceptors } = new Request({
  baseUrl: 'http://www.chqheiyou.com:9001',
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
    if (code === 400) {
      storage.del('token');
    }
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
};

export default apis;
