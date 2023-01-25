import {
  setStorageSync,
  getStorageSync,
  removeStorageSync,
  clearStorageSync,
} from 'remax/wechat';

type keys =
  | 'token'
  | 'openId'
  | 'iv'
  | 'encryptedData'
  | 'refferalAuth'
  | 'ca'
  | 'userType' // 用户类型 转诊用户类型 referral
  | 'PAGE_PATIENT_KEY' // 转诊选择的就诊人
  | 'PAGE_REFERRAL_KEY'; // 转诊

interface Storage {
  get: {
    (key: keys | string): string | null;
    (key: 'doctorId'): string | null;
  };
  set: {
    (
      key: 'doctorId' | 'oldPath' | 'username' | 'password' | 'refferalAuth',
      value: string | undefined
    ): void;
  };
  del: {
    (
      key:
        | keys
        | 'userInfo'
        | 'username'
        | 'baseUrl'
        | 'password'
        | 'oldPath'
        | 'VOICE'
        | 'PIC'
        | 'inputContent'
        | 'ca'
        | 'doctorId'
    ): void;
  };
  clear: () => void;
}

const storage: Storage = {
  get: (key: any) => getStorageSync(key),
  set: (key: any, value: any) => {
    setStorageSync(key, value);
  },
  del: (key) => removeStorageSync(key),
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
