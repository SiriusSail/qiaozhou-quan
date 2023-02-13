import {
  setStorageSync,
  getStorageSync,
  removeStorageSync,
  clearStorageSync,
} from 'remax/wechat';

type Keys = 'token' | 'oldPath' | 'campu';

interface Storage {
  get: {
    (key: Keys | string): string | null;
    (key: Keys): string | null;
  };
  set: {
    (key: Keys, value: string | undefined): void;
  };
  del: {
    (key: Keys): void;
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
