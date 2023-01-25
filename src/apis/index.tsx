import Request from './request';
import storage from '@/utils/storage';
import { showToast, navigateTo, getUserInfo } from 'remax/wechat';
import { redirectTo } from 'remax/one';
// import { getCurrentPages } from 'remax';

export const { request, interceptors } = new Request({
  baseUrl: 'http://' + 'www.chqheiyou.com:9001/',
});

interceptors.request.use((options) => {
  const token = storage.get('token') || '';
  options.data = options.data || {};
  options.header = options.header || {};
  options.header['Authorization'] = `Bearer ${token}`;
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
    { statusCode, data, data: { code = 0, msg = '网络请求错误' } = {}, ...agr },
    config,
    isHideError
  ) => {
    // if (code === 999) {
    //   await login().then(({ code }) => apis.login.request({ code }));
    // }
    // 如果状态码是998 那么就跳转到登录页面
    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    // const path = getCurrentPages();
    // if (code >= 998) {
    //   let oldPath = 'pages/index/index';
    //   storage.clear();
    //   // await login().then(({ code }) => apis.login.request({ code }));
    //   if (
    //     path[0]?.route !== 'pages/login/index' &&
    //     path[0]?.route !== 'pages/setEnvironment/index'
    //   ) {
    //     oldPath = path[0]?.route;
    //     const query = path[0]?.query;
    //     const queryStr = Object.keys(query)
    //       .map((res) => res + '=' + query[res])
    //       .join('&');
    //     storage.set('oldPath', oldPath + (queryStr ? '?' + queryStr : ''));
    //     await redirectTo({ url: '/pages/login/index' });
    //   }
    // }
    if (data.code === 410) {
      await redirectTo({ url: '/pages/superviseError/index' });
    }
    if (code === 0) {
      data.data = data.data || { ...data };
    } else {
      return Promise.reject(data);
    }
    return Promise.resolve(data);
  }
);

export type ListResType<T> = {
  recordList: T;
  pageCount?: number;
  totalCount: number;
  numPerPage: number;
  currentPage: number;
  beginIndex?: number;
  beginPageIndex?: number;
};

type PrescriptionType = {
  name: string;
  hisCode: string;
  platformCode: string;
};
type aliFileType = {
  file: string;
  fileLast: 'mp3' | 'png' | 'jpg';
};

type DrugstoresType = {
  hospitalCode: string;
  hospitalName: string;
  storages: StoragesType[];
};
type StoragesType = {
  storage: string;
  storageName: string;
};

// 鉴权
const authorize = createApiHooks(
  ({
    code,
    iv = storage.get('iv') || '',
    encryptedData = storage.get('encryptedData') || '',
  }: {
    code?: string;
    encryptedData?: string;
    iv?: string;
  }) =>
    request<{ login_access_token: string }>({
      method: 'POST',
      url: '/api/doctor/user/doctorAccount/login/authorization',
      data: {
        code,
        iv,
        encryptedData,
        hisId,
        platformId,
      },
    }).then((response) => {
      storage.set('encryptedData', encryptedData);
      storage.set('iv', iv);
      const token = response.data.login_access_token;
      storage.set('token', token);
      Sentry.setUser({ token });
      return response;
    })
);

const apis = {
  // 登录
  login: createApiHooks(
    ({
      username,
      password,
      valiDate,
    }: {
      username?: string;
      password?: string;
      valiDate?: boolean;
    }) => {
      return new Promise<{ data: LoginUserDataType }>((resolve, reject) => {
        // eslint-disable-next-line no-undef
        wx.login({
          success(data: any) {
            if (data.code) {
              //发起网络请求
              // wx.request({
              //   url: 'https://test.com/onLogin',
              //   data: {
              //     code: res.code
              //   }
              // });
              getUserInfo({
                //获取用户微信信息
                success: (res) => {
                  if (res.encryptedData && res.iv) {
                    authorize
                      .request({
                        code: data.code,
                        iv: res.iv,
                        encryptedData: res.encryptedData,
                      })
                      .then(() => {
                        console.log('valiDate', valiDate);
                        if (valiDate) {
                          return Promise.resolve({
                            data: {} as LoginUserDataType,
                          });
                        }
                        return request<LoginUserDataType>({
                          method: 'POST',
                          url: '/api/doctor/user/doctorAccount/v2/login',
                          data: {
                            username: username || storage.get('username'),
                            password: Encrypt(password),
                          },
                        }).then((response) => {
                          storage.set('username', username);
                          const data = {
                            ...response.data.doctor,
                            doctorUserId: response.data.doctorUserId,
                            userType: response.data.doctor.userType,
                          };
                          storage.set('userInfo', data);
                          return response;
                        });
                      })
                      .then((res) => {
                        resolve(res);
                      })
                      .catch(reject);
                  } else {
                    reject(res);
                  }
                },
                fail: (e) => {
                  console.log(e);
                  reject(e);
                },
              });
            }
          },
        });
      });
    }
  ),
};

export default apis;
