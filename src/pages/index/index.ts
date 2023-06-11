import { campusPage } from '@/apis/campus';
import apis from '@/apis/index';
import { getPhone, getAddress } from '@/apis/infoPublish';
import { valiVip } from '@/utils/index';
import { publishInfoPage } from '@/apis/infoPublish';

const typeImages = [
  {
    image: '/images/list-type/shop.png',
    imageActive: '/images/list-type/shop-active.png',
    color: '#FF993A',
    label: '店铺转让',
    value: '1',
  },
  {
    image: '/images/list-type/microwave.png',
    imageActive: '/images/list-type/microwave-active.png',
    color: '#8D93FC',
    label: '二手设备',
    value: '2',
  },
  {
    image: '/images/list-type/cart.png',
    imageActive: '/images/list-type/cart-active.png',
    color: '#FD8172',
    label: '供应采购',
    value: '3',
  },
  {
    image: '/images/list-type/join.png',
    imageActive: '/images/list-type/join-active.png',
    color: '#FD8172',
    label: '招商加盟',
    value: '4',
  },
];

const camputList = [] as any;
Page({
  data: {
    menuOption: wx.getMenuButtonBoundingClientRect(),
    campuList: camputList,
    campuId: wx.getStorageSync('campu'),
    banner: [],
    typeImages,
    request: publishInfoPage,
    selectType: '',
    dataList: [],
    params: {
      campuId: wx.getStorageSync('campu'),
      type: '',
    },
  },
  // 更新页面参数
  updataParams() {
    this.setData({
      params: {
        campuId: this.data.campuId,
        type: this.data.selectType,
      },
    });
  },
  // 修改选择类型
  check: function (e) {
    const selectType = e.currentTarget.dataset.value;
    this.setData({
      selectType: selectType === this.data.selectType ? '' : selectType,
    });
    this.updataParams();
  },
  // 修改校区
  updataCampuId: function (e) {
    this.setData({
      campuId: e.detail,
    });
    this.updataParams();
    wx.setStorage({
      key: 'campu',
      data: e.detail,
    });
  },
  updateList(e) {
    this.setData({
      dataList: e.detail.list,
    });
  },
  toinfo() {
    if (
      valiVip({
        content: '需要成为vip后才可以发布动态',
      })
    ) {
      wx.navigateTo({
        url: `/pages/shopPages/shopRelease/index`,
        // url: '/pages/myReleaseList/index',
      });
    }
  },

  phoneCall: function (e) {
    const id = e.currentTarget.dataset.value;
    getPhone(id).then((res) => {
      wx.makePhoneCall({
        phoneNumber: res,
      });
    });
  },

  address: function (e) {
    const id = e.currentTarget.dataset.value;
    getAddress(id).then((res) => {
      console.log(res);
      wx.showActionSheet({
        alertText: res,
        itemList: ['复制地址'],
        success: function (res) {
          console.log(res, '成功');
          wx.getClipboardData({
            //这个api是把拿到的数据放到电脑系统中的
            success: function (res) {
              wx.showToast({
                title: '地址已复制到剪切板',
                icon: 'none',
                duration: 2000,
              });
            },
          });
        },
        fail: function (res) {
          console.log(res, '失败');
          wx.showToast({
            title: res.errMsg,
            icon: 'none',
            duration: 2000,
          });
        },
      });
    });
  },
  onLoad: function () {
    campusPage().then((res) => {
      this.setData({
        campuList: res.map((item) => ({
          value: item.id,
          label: item.campusName,
        })),
      });
    });

    apis.findIndexBannerList().then((res) => {
      this.setData({
        banner: res?.filter((item) => !!item.url) || [],
      });
    });
    // 页面创建时执行
  },
  onShow: function () {
    // 页面出现在前台时执行
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
  onTabItemTap(item) {
    // tab 点击时执行
    console.log(item.index);
    console.log(item.pagePath);
    console.log(item.text);
  },
});
