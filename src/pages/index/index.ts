import { campusPage } from '@/apis/campus';
import apis from '@/apis/index';
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
    selectType: typeImages[0].value,
    dataList: [],
    params: {
      campuId: wx.getStorageSync('campu'),
      type: typeImages[0].value,
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
      selectType,
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
    console.log(e);
    this.setData({
      dataList: e.detail.list,
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
  // 事件响应函数
  viewTap: function () {
    this.setData(
      {
        text: 'Set some data for updating view.',
      },
      function () {
        // this is setData callback
      }
    );
  },
  // 自由数据
  customData: {
    hi: 'MINA',
  },
});
