import dayjs from 'dayjs';
// 验证是否为手机号
export function checkTelephone(telephone: string) {
  const reg = /^[1][3456789][0-9]{9}$/;
  if (!reg.test(telephone)) {
    return false;
  } else {
    return true;
  }
}

export const valiLogin = (isHideModal = false) => {
  const token = wx.getStorageSync('token');
  if (!token) {
    if (!isHideModal) {
      wx.showModal({
        title: '提示',
        content: '您尚未登录',
        confirmText: '去登陆',
        success: (e) => {
          if (e.confirm) {
            wx.navigateTo({
              url: '/pages/login/index',
            });
          }
        },
      });
    }
    return false;
  }
  return true;
};

export const valiVip = ({
  isHideModal,
  content,
}: {
  isHideModal?: boolean;
  content?: string;
}) => {
  if (!valiLogin()) return false;
  const userInfo = wx.getStorageSync('userInfo');
  const isvip = dayjs(userInfo?.memberEndTime).diff(dayjs()) > 0;
  if (isvip) return true;
  if (!isHideModal) {
    wx.showModal({
      title: '提示',
      content,
      confirmText: '去充值',
      success: (e) => {
        if (e.confirm) {
          wx.navigateTo({
            url: '/pages/myPages/vips/index',
          });
        }
      },
    });
  }
  return false;
};
