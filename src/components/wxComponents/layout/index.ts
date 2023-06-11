Component({
  options: {
    multipleSlots: true, // 在组件定义时的选项中启用多slot支持
  },
  data: {
    token: wx.getStorageSync('token'),
  },
  methods: {
    tologin() {
      wx.navigateTo({
        url: '/pages/login/index',
      });
    },
  },
  pageLifetimes: {
    show: function () {
      const token = wx.getStorageSync('token');
      this.setData({
        token,
      });
    },
  },
});
