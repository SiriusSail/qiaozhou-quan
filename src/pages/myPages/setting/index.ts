import { campusPage } from '@/apis/campus';
import { publishInfoPage } from '@/apis/infoPublish';
import useApi from '@/apis';
import { pay } from '@/apis/payment';

Page({
  data: {
    userInfo: {},
    dataList: [],
    memberEndTime: '',
  },
  updataUserInfo() {
    useApi.userInfo().then((e) => {
      wx.setStorage({
        key: 'userInfo',
        data: e,
      });
      this.setData({
        userInfo: e,
        memberEndTime: e?.memberEndTime.split(' ')[0],
      });
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
