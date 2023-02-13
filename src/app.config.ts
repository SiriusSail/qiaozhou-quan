import { AppConfig } from 'remax/wechat';

const config: AppConfig = {
  pages: [
    'pages/index/index', // 首页
    'pages/login/index', // 登录
    'pages/activity/index', // 活动管理
    'pages/activityDetails/index', // 活动详情
    'pages/activitySetting/index', // 活动活动设置
    'pages/my/index', // 我的
    'pages/bag/index', // 福利袋
    'pages/setting/index', // 设置
    'pages/shop/index', // 店铺
    'pages/shopInfo/index', // 商家信息
    'pages/shopIdea/index', // 商家修改
    'pages/shopApply/index', // 商家申请
    'pages/userIdea/index', // 修改认证信息
    'pages/userInfo/index', // 认证信息
    'pages/vips/index', // 会员中心
    'pages/voucher/index', // 红包二维码
    'pages/qrcodeEntrance/index', // 扫码入口
    'pages/check/index', // 扫码入口
  ],
  window: {
    navigationBarTitleText: '抢券小程序',
    navigationBarBackgroundColor: '#fff',
    navigationBarTextStyle: 'black',
    backgroundColor: '#fff',
  },
  tabBar: {
    color: '#BEBEBE',
    selectedColor: '#2780D9',
    backgroundColor: '#FFFFFF',
    borderStyle: 'white',
    list: [
      {
        pagePath: 'pages/index/index',
        iconPath: './images/jz@2x.png',
        selectedIconPath: './images/jzxz@2x.png',
        text: '商家',
      },
      {
        pagePath: 'pages/bag/index',
        iconPath: './images/jz@2x.png',
        selectedIconPath: './images/jzxz@2x.png',
        text: '福利袋',
      },
      {
        pagePath: 'pages/my/index',
        iconPath: './images/hz@2x.png',
        selectedIconPath: './images/hzxz@2x.png',
        text: '我得',
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
  },
  requiredBackgroundModes: ['chooseAddress', 'chooseLocation'],
  requiredPrivateInfos: ['chooseAddress', 'chooseLocation'],
  lazyCodeLoading: 'requiredComponents',
};

export default config;
