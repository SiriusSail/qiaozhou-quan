import {
  setStorageSync,
  getStorageSync,
  removeStorageSync,
  clearStorageSync,
} from 'remax/wechat';

type Keys =
  /**
   * 登录token
   */
  | 'token'
  /**
   * 旧的url
   */
  | 'oldPath'
  /**
   * 校区
   */
  | 'campu'
  /**
   * 我得邀请码
   */
  | 'invitationCode'
  /**
   * 被邀请，我被谁邀请
   */
  | 'invitedCode'
  /**
   * 备注信息
   */
  | 'remarks'
  /**
   * 优惠券
   */
  | 'coupon';

interface Storage {
  get: {
    (key: Keys): string | null;
    /**
     * 订单缓存
     */
    (key: 'orderCache'): Record<string, Record<string, string>>;
    /**
     * 订单缓存
     */
    (key: 'userInfo'): API.UserInfo;
  };
  set: {
    (key: Keys, value: string | undefined): void;
    (key: 'orderCache', data: Record<string, Record<string, string>>): void;
    (key: 'userInfo', data: API.UserInfo | undefined): void;
  };
  del: {
    (key: Keys): void;
    (key: 'orderCache'): void;
    (key: 'userInfo'): void;
  };
  clear: () => void;
}

const storage: Storage = {
  get: (key: any) => getStorageSync(key),
  set: (key: any, value: any) => {
    setStorageSync(key, value);
  },
  del: (key: any) => removeStorageSync(key),
  clear: () => {
    const username = getStorageSync('username');
    const baseUrl = getStorageSync('baseUrl');
    // const password = getStorageSync('password');
    clearStorageSync();
    setStorageSync('username', username);
    setStorageSync('baseUrl', baseUrl);
    // setStorageSync('password', password);
  },
};

export default storage;
