import { AppConfig } from 'remax/wechat';

const config: AppConfig = {
  pages: [
    'pages/index/index', // 首页
    'pages/login/index', // 登录
    'pages/my/index', // 我的
    // 'pages/bag/index', // 福利袋
    // 'pages/shop/index', // 店铺
    // 'pages/shopList/index', // 店铺列表
    'pages/userEdit/index', // 修改认证信息
    'pages/order/index', // 订单列表
    'pages/orderInfo/index', // 订单详情
    // 'pages/orderConfirmation/index', // 订单确认
    'pages/productInfo/index', // 订单详情
    // 'pages/remarks/index', // 填写备注页面
    'pages/userInfo/index', // 认证信息
    'pages/voucher/index', // 红包二维码
    'pages/success/index', // 下单成功
    'pages/myReleaseList/index', // 我发布的信息
    'pages/qrcodeEntrance/index', // 扫码入口
    'pages/check/index', // 扫码入口
  ],
  subpackages: [
    {
      root: 'pages/myPages',
      pages: [
        'vips/index', // 会员中心
        'setting/index', // 设置
      ],
    },
    {
      root: 'pages/shopPages',
      pages: [
        'shopInfo/index', // 商家信息
        'shopEdit/index', // 商家修改
        'shopOrder/index', // 商家订单
        'shopApply/index', // 商家申请
        'shopRecruit/index', // 发布招聘
        'shopRelease/index', // 发布信息
        'staff/index', // 员工管理
        'staffEdit/index', // 修改员工
      ],
    },
    {
      root: 'pages/activityPages',
      pages: [
        'activitySetting/index', // 活动活动设置
      ],
    },
    {
      root: 'pages/productPages',
      pages: [
        'productList/index', // 商品列表
        'productEdit/index', // 添加修改商品
        'categoryList/index', // 商品分类管理
        'categoryEdit/index', // 商品分类修改
      ],
    },
  ],
  window: {
    navigationBarTitleText: '抢券小程序',
    navigationBarBackgroundColor: '#E8813E',
    navigationBarTextStyle: 'white',
    backgroundColor: '#fff',
  },
  tabBar: {
    color: '#666666',
    selectedColor: '#E8813E',
    backgroundColor: '#FFFFFF',
    borderStyle: 'white',
    list: [
      {
        pagePath: 'pages/index/index',
        iconPath: './images/index0.png',
        selectedIconPath: './images/index.png',
        text: '首页',
      },
      // {
      //   pagePath: 'pages/shopList/index',
      //   iconPath: './images/shop0.png',
      //   selectedIconPath: './images/shop.png',
      //   text: '点餐',
      // },
      {
        pagePath: 'pages/order/index',
        iconPath: './images/text0.png',
        selectedIconPath: './images/text.png',
        text: '订单',
      },
      {
        pagePath: 'pages/my/index',
        iconPath: './images/my0.png',
        selectedIconPath: './images/my.png',
        text: '我的',
      },
    ],
  },
  plugins: {
    chooseLocation: {
      version: '1.0.10',
      provider: 'wx76a9a06e5b4e693e',
    },
  },
  permission: {
    'scope.userLocation': {
      desc: '你的位置信息将用于小程序定位',
    },
    // 'scope.camera': {
    //   desc: '使用您的相机扫码核销优惠券',
    // },
  },
  requiredBackgroundModes: ['chooseAddress', 'chooseLocation'],
  requiredPrivateInfos: ['chooseAddress', 'chooseLocation'],
  lazyCodeLoading: 'requiredComponents',
};

export default config;
