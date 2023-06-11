import { logout } from '@/apis/auth';

Page({
  data: {
    userInfo: {},
    dataList: [],
    memberEndTime: '',
  },
  outlogin() {
    wx.showModal({
      title: '确定退出当前账号',
      cancelText: '取消',
      confirmText: '确定',
      success: (e) => {
        logout();
        wx.removeStorage({
          key: 'token',
        });
        wx.removeStorage({
          key: 'userInfo',
        });
        wx.navigateBack();
      },
    });
  },
  onLoad: function () {
    wx.getStorage({
      key: 'userInfo',
      success: (e) => {
        this.setData({
          userInfo: e.data,
          memberEndTime: e.data?.memberEndTime.split(' ')[0],
        });
      },
    });
  },
  phoneCall: function () {
    wx.makePhoneCall({
      phoneNumber: '18883350586',
    });
  },
  onReady: function () {
    // 页面首次渲染完毕时执行
  },
  onHide: function () {
    // 页面从前台变为后台时执行
  },
  onUnload: function () {
    // 页面销毁时执行
  },
  onPullDownRefresh: function () {
    // 触发下拉刷新时执行
  },
  onReachBottom: function () {
    // 页面触底时执行
  },
  onShareAppMessage: function () {
    // 页面被用户分享时执行
  },
  onPageScroll: function () {
    // 页面滚动时执行
  },
  onResize: function () {
    // 页面尺寸变化时执行
  },
  // 自由数据
  customData: {
    hi: 'MINA',
  },
});
